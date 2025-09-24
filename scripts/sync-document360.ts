#!/usr/bin/env ts-node

/**
 * Document360 Sync Script
 * 
 * This script handles synchronization of documentation to Document360 platform.
 * It reads YAML metadata files and markdown content files and syncs them
 * to the Document360 API.
 * 
 * NOTE: This is a separate process from the main build pipeline.
 * Run this independently when you need to sync to Document360.
 * 
 * Features:
 * - Reads .yaml metadata files for Document360 configuration
 * - Reads .md content files
 * - Syncs to Document360 API
 * - Handles authentication and error handling
 * - Supports incremental sync
 * 
 * Usage: npm run sync-document360
 * 
 * TODO: Implement Document360 API integration
 * - Set up Document360 API credentials
 * - Implement authentication
 * - Create API client for Document360
 * - Handle file upload and metadata sync
 * - Implement error handling and retry logic
 * - Add support for incremental sync
 * - Add support for file deletion
 * - Add support for category management
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const DOCS_DIR = 'docs';

interface Document360Config {
    apiKey: string;
    baseUrl: string;
    categoryId: string;
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
 * Loads Document360 configuration
 */
function loadDocument360Config(): Document360Config {
    // TODO: Load from environment variables or config file
    const config: Document360Config = {
        apiKey: process.env.DOCUMENT360_API_KEY || '',
        baseUrl: process.env.DOCUMENT360_BASE_URL || 'https://api.document360.io',
        categoryId: process.env.DOCUMENT360_CATEGORY_ID || ''
    };
    
    if (!config.apiKey) {
        throw new Error('Document360 API key not found. Set DOCUMENT360_API_KEY environment variable.');
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
                        console.warn(`⚠️  Warning: Could not parse ${filePath}: ${error.message}`);
                    }
                }
            }
        }
    }
    
    walkDir(DOCS_DIR);
    return filesToSync;
}

/**
 * Syncs a single file to Document360
 */
async function syncFileToDocument360(
    config: Document360Config,
    fileInfo: { yamlPath: string; markdownPath: string; metadata: YamlMetadata }
): Promise<void> {
    // TODO: Implement Document360 API sync
    console.log(`📄 Would sync: ${fileInfo.markdownPath}`);
    console.log(`   Title: ${fileInfo.metadata.title}`);
    console.log(`   Category: ${fileInfo.metadata.document360?.category || 'default'}`);
    console.log(`   Visibility: ${fileInfo.metadata.document360?.visibility || 'public'}`);
}

/**
 * Main sync function
 */
export async function syncToDocument360(): Promise<void> {
    console.log(`🔄 Starting Document360 sync...`);
    
    try {
        // Load configuration
        const config = loadDocument360Config();
        console.log(`🔑 Using Document360 API: ${config.baseUrl}`);
        
        // Scan for files to sync
        const filesToSync = scanFilesForSync();
        console.log(`📄 Found ${filesToSync.length} files to sync`);
        
        if (filesToSync.length === 0) {
            console.log(`ℹ️  No files found with Document360 metadata`);
            return;
        }
        
        // Sync each file
        for (const fileInfo of filesToSync) {
            await syncFileToDocument360(config, fileInfo);
        }
        
        console.log(`✅ Document360 sync completed successfully`);
        
    } catch (error) {
        throw new Error(`Document360 sync failed: ${error.message}`);
    }
}

// Run sync if called directly
if (require.main === module) {
    syncToDocument360().catch(console.error);
}
