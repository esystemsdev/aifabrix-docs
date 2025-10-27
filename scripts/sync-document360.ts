#!/usr/bin/env ts-node

/**
 * Document360 Sync Script
 * 
 * This script handles synchronization of documentation to Document360 platform.
 * It reads YAML metadata files and markdown content files and syncs them
 * to the Document360 API using the aifabrix-d360 client.
 * 
 * NOTE: This is a separate process from the main build pipeline.
 * Run this independently when you need to sync to Document360.
 * 
 * Features:
 * - Reads .yaml metadata files for Document360 configuration
 * - Reads .md content files
 * - Syncs to Document360 API with full CRUD operations
 * - Auto-creates missing categories
 * - Supports both category names and direct category IDs
 * - Incremental sync - updates existing articles instead of duplicating
 * - Content change detection - skips unchanged articles
 * - Automatic deletion of orphaned articles (removed local files)
 * - Retry logic with exponential backoff for transient failures
 * - Comprehensive error handling and reporting
 * - Dry-run mode for testing without making actual changes
 * - Detailed statistics (created/updated/skipped/deleted/failed)
 * 
 * Usage: 
 *   npm run sync-document360                 # Live sync
 *   SYNC_DRY_RUN=true npm run sync-document360  # Dry-run mode
 * 
 * Environment Variables:
 *   DOCUMENT360_API_TOKEN  - API authentication token (required)
 *   DOCUMENT360_PROJECT_ID - Target project ID (required)
 *   DOCUMENT360_BASE_URL   - API base URL (default: https://apihub.document360.io)
 *   SYNC_DRY_RUN          - Set to 'true' for dry-run mode (optional)
 */

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { Document360Client } from 'aifabrix-d360';
import type { 
  CreateArticleRequest,
  CreateCategoryRequest,
  UpdateArticleRequest,
  Document360Article
} from 'aifabrix-d360';

// Load environment variables from .env file
dotenv.config();

const DOCS_DIR = 'docs';

interface Document360Config {
    apiToken: string;
    baseUrl: string;
    projectId: string;
    [key: string]: any;
}

interface YamlMetadata {
    title: string;
    description: string;
    document360?: {
        category?: string;
        visibility?: string;
        searchable?: boolean;
        featured?: boolean;
        order?: number;
        category_id?: string;
        published?: boolean;
    };
    [key: string]: any;
}

/**
 * Loads Document360 configuration from .env file
 */
function loadDocument360Config(): Document360Config {
    const config: Document360Config = {
        apiToken: process.env.DOCUMENT360_API_TOKEN || '',
        baseUrl: process.env.DOCUMENT360_BASE_URL || 'https://apihub.document360.io',
        projectId: process.env.DOCUMENT360_PROJECT_ID || ''
    };
    
    if (!config.apiToken) {
        throw new Error('Document360 API token not found. Check your .env file and ensure DOCUMENT360_API_TOKEN is set.');
    }
    
    if (!config.projectId) {
        throw new Error('Document360 Project ID not found. Check your .env file and ensure DOCUMENT360_PROJECT_ID is set.');
    }
    
    return config;
}

/**
 * Scans for files to sync to Document360
 */
function scanFilesForSync(): Array<{ yamlPath: string; markdownPath: string; metadata: YamlMetadata }> {
    const filesToSync: Array<{ yamlPath: string; markdownPath: string; metadata: YamlMetadata }> = [];
    
    function walkDir(dir: string) {
        const files = fs.readdirSync(dir);
        
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                walkDir(filePath);
            } else if (file.endsWith('.yaml') && file !== 'navigation.yaml') {
                const markdownPath = filePath.replace('.yaml', '.md');
                
                if (fs.existsSync(markdownPath)) {
                    try {
                        const yamlContent = fs.readFileSync(filePath, 'utf8');
                        const metadata = yaml.load(yamlContent) as YamlMetadata;
                        
                        if (metadata && metadata.document360) {
                            filesToSync.push({
                                yamlPath: filePath,
                                markdownPath: markdownPath,
                                metadata: metadata
                            });
                        }
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : String(error);
                        console.warn(`⚠️  Warning: Could not parse ${filePath}: ${errorMessage}`);
                    }
                }
            }
        }
    }
    
    walkDir(DOCS_DIR);
    return filesToSync;
}

/**
 * Creates Document360 API client
 */
function createDocument360Client(config: Document360Config): Document360Client {
    return new Document360Client({
        apiToken: config.apiToken,
        projectId: config.projectId,
        baseUrl: config.baseUrl,
        timeout: 30000
    }, false); // false = not mock mode
}

/**
 * Fetches all categories from Document360 and builds a name→ID map
 */
async function getCategoryMap(client: Document360Client): Promise<Map<string, string>> {
    console.log('📂 Fetching existing categories from Document360...');
    
    try {
        const categories = await client.listCategories();
        
        const map = new Map<string, string>();
        for (const category of categories) {
            map.set(category.name, category.id);
            console.log(`   Found: ${category.name} (${category.id})`);
        }
        
        console.log(`✅ Loaded ${map.size} categories\n`);
        return map;
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn(`⚠️  Warning: Could not fetch categories: ${errorMessage}`);
        console.warn('   Starting with empty category map\n');
        return new Map();
    }
}

/**
 * Fetches all articles from Document360 and builds maps for incremental sync
 * Returns both title→article and path→article maps
 */
async function getArticleMaps(client: Document360Client): Promise<{
    titleMap: Map<string, Document360Article>;
    remoteArticles: Set<string>;
}> {
    console.log('📄 Fetching existing articles from Document360...');
    
    try {
        const articles = await client.listArticles();
        
        const titleMap = new Map<string, Document360Article>();
        const remoteArticles = new Set<string>();
        
        for (const article of articles) {
            titleMap.set(article.title, article);
            remoteArticles.add(article.id);
            console.log(`   Found: ${article.title} (${article.id})`);
        }
        
        console.log(`✅ Loaded ${titleMap.size} articles\n`);
        return { titleMap, remoteArticles };
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn(`⚠️  Warning: Could not fetch articles: ${errorMessage}`);
        console.warn('   Starting with empty article maps\n');
        return {
            titleMap: new Map(),
            remoteArticles: new Set()
        };
    }
}

/**
 * Retry wrapper for API calls with exponential backoff
 * Implements retry logic for transient failures
 */
async function retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    initialDelay: number = 1000,
    operationName: string = 'API call'
): Promise<T> {
    let lastError: Error | undefined;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
            
            if (attempt === maxRetries) {
                break; // Don't delay on the last attempt
            }
            
            // Calculate delay with exponential backoff
            const delay = initialDelay * Math.pow(2, attempt - 1);
            console.log(`   ⚠️  ${operationName} failed (attempt ${attempt}/${maxRetries}), retrying in ${delay}ms...`);
            console.log(`      Error: ${lastError.message}`);
            
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    // All retries exhausted
    throw new Error(`${operationName} failed after ${maxRetries} attempts: ${lastError?.message}`);
}

/**
 * Ensures a category exists - creates it if necessary
 * Returns the category ID
 */
async function ensureCategoryExists(
    client: Document360Client,
    categoryMap: Map<string, string>,
    categoryName: string
): Promise<string> {
    
    // Check if we already have the ID cached
    if (categoryMap.has(categoryName)) {
        return categoryMap.get(categoryName)!;
    }
    
    // Not found - need to create it
    console.log(`   📁 Creating new category: ${categoryName}`);
    
    try {
        const request: CreateCategoryRequest = {
            name: categoryName,
            description: `Auto-created category for ${categoryName}`
        };
        
        const newCategory = await client.createCategory(request);
        
        // Cache the ID for next time
        categoryMap.set(categoryName, newCategory.id);
        console.log(`   ✅ Created category ID: ${newCategory.id}`);
        
        return newCategory.id;
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to create category '${categoryName}': ${errorMessage}`);
    }
}

/**
 * Syncs a single file to Document360 (with incremental sync support)
 * Detects if article exists and updates it, or creates new if not found
 */
async function syncFileToDocument360(
    client: Document360Client,
    categoryMap: Map<string, string>,
    articleMap: Map<string, Document360Article>,
    syncedArticles: Set<string>,
    fileInfo: { yamlPath: string; markdownPath: string; metadata: YamlMetadata }
): Promise<{ operation: 'created' | 'updated' | 'skipped' }> {
    
    try {
        console.log(`📄 Syncing: ${fileInfo.markdownPath}`);
        console.log(`   Title: ${fileInfo.metadata.title}`);
        
        // Read the markdown content
        const content = fs.readFileSync(fileInfo.markdownPath, 'utf8');
        
        // Determine category ID (flexible approach)
        let categoryId: string;
        
        if (fileInfo.metadata.document360?.category_id) {
            // Option 1: Direct category_id provided
            console.log(`   Using provided category_id: ${fileInfo.metadata.document360.category_id}`);
            categoryId = fileInfo.metadata.document360.category_id;
        } else {
            // Option 2: Look up or create by category name
            const categoryName = fileInfo.metadata.document360?.category || 'Uncategorized';
            console.log(`   Category: ${categoryName}`);
            categoryId = await ensureCategoryExists(client, categoryMap, categoryName);
        }
        
        // Check if article already exists
        const existingArticle = articleMap.get(fileInfo.metadata.title);
        
        // Check if dry-run mode
        if (process.env.SYNC_DRY_RUN === 'true') {
            if (existingArticle) {
                console.log('   🔍 DRY-RUN: Would update existing article');
                console.log(`   Existing article ID: ${existingArticle.id}`);
            } else {
                console.log('   🔍 DRY-RUN: Would create new article');
            }
            console.log(`   Category ID: ${categoryId}`);
            console.log(`   Content length: ${content.length} characters\n`);
            return { operation: 'skipped' };
        }
        
        const status = fileInfo.metadata.document360?.published !== false ? 'published' : 'draft';
        
        if (existingArticle) {
            // Article exists - check if update is needed
            const needsUpdate = 
                existingArticle.content !== content ||
                existingArticle.status !== status ||
                existingArticle.meta_description !== fileInfo.metadata.description;
            
            if (!needsUpdate) {
                console.log(`   ⏭️  No changes detected, skipping\n`);
                syncedArticles.add(existingArticle.id);
                return { operation: 'skipped' };
            }
            
            // Update the existing article with retry logic
            console.log(`   📝 Updating existing article ID: ${existingArticle.id}`);
            
            const updateRequest: UpdateArticleRequest = {
                title: fileInfo.metadata.title,
                content: content,
                status: status,
                meta_description: fileInfo.metadata.description
            };
            
            await retryWithBackoff(
                () => client.updateArticle(existingArticle.id, updateRequest),
                3,
                1000,
                `Update article "${fileInfo.metadata.title}"`
            );
            
            syncedArticles.add(existingArticle.id);
            console.log(`   ✅ Updated article ID: ${existingArticle.id}\n`);
            return { operation: 'updated' };
            
        } else {
            // Article doesn't exist - create it with retry logic
            console.log(`   ➕ Creating new article`);
            
            const createRequest: CreateArticleRequest = {
                title: fileInfo.metadata.title,
                content: content,
                category_id: categoryId,
                status: status,
                meta_description: fileInfo.metadata.description
            };
            
            const article = await retryWithBackoff(
                () => client.createArticle(createRequest),
                3,
                1000,
                `Create article "${fileInfo.metadata.title}"`
            );
            
            syncedArticles.add(article.id);
            console.log(`   ✅ Created article ID: ${article.id}\n`);
            return { operation: 'created' };
        }
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`   ❌ Failed: ${errorMessage}\n`);
        throw error; // Re-throw so we can track it in summary
    }
}

/**
 * Deletes orphaned articles that no longer have corresponding local files
 * Only deletes articles that were not synced during this run
 */
async function deleteOrphanedArticles(
    client: Document360Client,
    remoteArticles: Set<string>,
    syncedArticles: Set<string>
): Promise<number> {
    
    // Find articles that exist remotely but weren't synced (orphaned)
    const orphanedArticles = Array.from(remoteArticles).filter(id => !syncedArticles.has(id));
    
    if (orphanedArticles.length === 0) {
        console.log('✅ No orphaned articles to delete\n');
        return 0;
    }
    
    console.log(`🗑️  Found ${orphanedArticles.length} orphaned articles to delete\n`);
    
    // Check if dry-run mode
    if (process.env.SYNC_DRY_RUN === 'true') {
        console.log('🔍 DRY-RUN: Would delete the following articles:');
        orphanedArticles.forEach(id => console.log(`   - ${id}`));
        console.log('');
        return orphanedArticles.length;
    }
    
    let deletedCount = 0;
    const deleteErrors: Array<{ id: string; error: string }> = [];
    
    for (const articleId of orphanedArticles) {
        try {
            console.log(`🗑️  Deleting orphaned article: ${articleId}`);
            
            await retryWithBackoff(
                () => client.deleteArticle(articleId),
                3,
                1000,
                `Delete article ${articleId}`
            );
            
            deletedCount++;
            console.log(`   ✅ Deleted\n`);
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`   ❌ Failed to delete: ${errorMessage}\n`);
            deleteErrors.push({ id: articleId, error: errorMessage });
        }
    }
    
    if (deleteErrors.length > 0) {
        console.warn(`⚠️  Failed to delete ${deleteErrors.length} articles:`);
        deleteErrors.forEach(e => console.warn(`   - ${e.id}: ${e.error}`));
        console.log('');
    }
    
    return deletedCount;
}

/**
 * Main sync function
 */
export async function syncToDocument360(): Promise<void> {
    console.log(`🔄 Starting Document360 sync...\n`);
    
    try {
        // Load configuration
        const config = loadDocument360Config();
        console.log(`🔑 Using Document360 API: ${config.baseUrl}`);
        console.log(`🔑 Project ID: ${config.projectId}\n`);
        
        // Create API client
        const client = createDocument360Client(config);
        
        // Fetch existing categories and build map
        const categoryMap = await getCategoryMap(client);
        
        // Fetch existing articles for incremental sync
        const { titleMap: articleMap, remoteArticles } = await getArticleMaps(client);
        
        // Track which articles were synced in this run
        const syncedArticles = new Set<string>();
        
        // Scan for files to sync
        const filesToSync = scanFilesForSync();
        console.log(`📄 Found ${filesToSync.length} files to sync\n`);
        
        if (filesToSync.length === 0) {
            console.log(`ℹ️  No files found with Document360 metadata`);
            return;
        }
        
        // Check dry-run mode
        if (process.env.SYNC_DRY_RUN === 'true') {
            console.log('🔍 Running in DRY-RUN mode - no actual changes will be made\n');
        }
        
        // Track detailed stats
        let createdCount = 0;
        let updatedCount = 0;
        let skippedCount = 0;
        let errorCount = 0;
        const errors: Array<{ file: string; error: string }> = [];
        
        // Sync each file
        for (const fileInfo of filesToSync) {
            try {
                const result = await syncFileToDocument360(
                    client, 
                    categoryMap, 
                    articleMap, 
                    syncedArticles, 
                    fileInfo
                );
                
                if (result.operation === 'created') {
                    createdCount++;
                } else if (result.operation === 'updated') {
                    updatedCount++;
                } else if (result.operation === 'skipped') {
                    skippedCount++;
                }
            } catch (error) {
                errorCount++;
                errors.push({
                    file: fileInfo.markdownPath,
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
        
        // Handle deletion of orphaned articles
        let deletedCount = 0;
        if (remoteArticles.size > 0) {
            deletedCount = await deleteOrphanedArticles(client, remoteArticles, syncedArticles);
        }
        
        // Show summary
        console.log('\n' + '='.repeat(60));
        console.log('📊 Sync Summary:');
        console.log(`   Total files: ${filesToSync.length}`);
        console.log(`   ➕ Created: ${createdCount}`);
        console.log(`   📝 Updated: ${updatedCount}`);
        console.log(`   ⏭️  Skipped: ${skippedCount}`);
        console.log(`   🗑️  Deleted: ${deletedCount}`);
        console.log(`   ❌ Failed: ${errorCount}`);
        
        if (errors.length > 0) {
            console.log('\n❌ Errors:');
            errors.forEach(e => {
                console.log(`   ${e.file}`);
                console.log(`      → ${e.error}`);
            });
        }
        
        console.log('='.repeat(60) + '\n');
        
        if (errorCount > 0) {
            throw new Error(`Sync completed with ${errorCount} error(s)`);
        }
        
        console.log(`✅ Document360 sync completed successfully`);
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Document360 sync failed: ${errorMessage}`);
    }
}

// Run sync if called directly
if (require.main === module) {
    syncToDocument360().catch(console.error);
}
