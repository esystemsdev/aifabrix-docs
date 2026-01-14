#!/usr/bin/env ts-node

/**
 * Document360 Sync Script
 * 
 * This script handles synchronization of documentation to Document360 platform.
 * It uses the AifabrixD360 class which provides automatic Mermaid diagram processing,
 * incremental sync, change detection, and comprehensive error handling.
 * 
 * NOTE: This is a separate process from the main build pipeline.
 * Run this independently when you need to sync to Document360.
 * 
 * Features:
 * - Automatic Mermaid diagram rendering and upload
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
 * - Detailed statistics (created/updated/skipped/deleted/failed)
 * 
 * Usage: 
 *   npm run sync-document360                 # Live sync
 * 
 * Environment Variables:
 *   DOCUMENT360_API_TOKEN  - API authentication token (required)
 *   DOCUMENT360_PROJECT_ID - Target project ID (required)
 *   DOCUMENT360_BASE_URL   - API base URL (default: https://apihub.document360.io)
 *   SYNC_SOURCE_PATH       - Source path for docs (default: ./docs)
 *   SYNC_DRY_RUN           - Set to 'true' for dry-run mode (optional)
 *   DATABASE_PATH          - SQLite database path (default: ./sync.db)
 *   LOG_LEVEL              - Logging level (default: info)
 * 
 * Note: The AifabrixD360 class automatically reads configuration from environment
 * variables. See the aifabrix-d360 README for full configuration options.
 */

import * as dotenv from 'dotenv';
import { AifabrixD360 } from 'aifabrix-d360';

// Load environment variables from .env file
dotenv.config();

/**
 * Validates required environment variables
 */
function validateEnvironment(): void {
    if (!process.env.DOCUMENT360_API_TOKEN) {
        throw new Error('Document360 API token not found. Check your .env file and ensure DOCUMENT360_API_TOKEN is set.');
    }
    
    if (!process.env.DOCUMENT360_PROJECT_ID) {
        throw new Error('Document360 Project ID not found. Check your .env file and ensure DOCUMENT360_PROJECT_ID is set.');
    }
}

/**
 * Main sync function using AifabrixD360 class
 * This provides automatic Mermaid processing, incremental sync, and comprehensive error handling
 */
export async function syncToDocument360(): Promise<void> {
    console.log(`🔄 Starting Document360 sync...\n`);
    
    try {
        // Validate environment variables
        validateEnvironment();
        
        const baseUrl = process.env.DOCUMENT360_BASE_URL || 'https://apihub.document360.io';
        const sourcePath = process.env.SYNC_SOURCE_PATH || './docs';
        const databasePath = process.env.DATABASE_PATH || './sync.db';
        const logLevel = process.env.LOG_LEVEL || 'info';
        
        console.log(`🔑 Using Document360 API: ${baseUrl}`);
        console.log(`🔑 Project ID: ${process.env.DOCUMENT360_PROJECT_ID}`);
        console.log(`📁 Source path: ${sourcePath}`);
        console.log(`💾 Database path: ${databasePath}\n`);
        
        // Create AifabrixD360 instance
        // Configuration is loaded from environment variables automatically via ConfigManager
        // We only override what's not set via environment variables
        const sync = new AifabrixD360({
            document360: {
                apiToken: process.env.DOCUMENT360_API_TOKEN!,
                projectId: process.env.DOCUMENT360_PROJECT_ID!,
                baseUrl: baseUrl,
                timeout: 30000,
            },
            sync: {
                sourcePath: sourcePath,
                dryRun: process.env.SYNC_DRY_RUN === 'true', // Read from env var
                batchSize: 10,
                retryAttempts: 3,
                retryDelay: 1000,
                publishArticles: true,
            },
            database: {
                path: databasePath,
                backupEnabled: false,
                backupInterval: 3600000, // 1 hour (not used if backupEnabled is false)
            },
            logging: {
                level: logLevel as 'debug' | 'info' | 'warn' | 'error',
                console: true,
            },
        });
        
        // Log dry-run status if enabled
        if (process.env.SYNC_DRY_RUN === 'true') {
            console.log('🔍 DRY-RUN mode is enabled (via SYNC_DRY_RUN environment variable)');
            console.log('   Note: Some API calls may still occur to check existing state\n');
        }
        
        // Run sync (automatically handles Mermaid processing, incremental sync, etc.)
        await sync.sync();
        
        // Get and display statistics
        const stats = await sync.getStats();
        
        console.log('\n' + '='.repeat(60));
        console.log('📊 Sync Summary:');
        if (stats) {
            console.log(`   Total files processed: ${stats.totalFiles || 'N/A'}`);
            console.log(`   Articles created: ${stats.createdArticles || 0}`);
            console.log(`   Articles updated: ${stats.updatedArticles || 0}`);
            console.log(`   Articles deleted: ${stats.deletedArticles || 0}`);
            console.log(`   Articles skipped: ${stats.skippedArticles || 0}`);
            console.log(`   Errors: ${stats.errors || 0}`);
        }
        console.log('='.repeat(60) + '\n');
        
        // Cleanup
        sync.cleanup();
        
        console.log(`✅ Document360 sync completed successfully`);
        console.log(`   ✨ Mermaid diagrams were automatically processed and uploaded`);
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`\n❌ Document360 sync failed: ${errorMessage}\n`);
        throw new Error(`Document360 sync failed: ${errorMessage}`);
    }
}

// Run sync if called directly
if (require.main === module) {
    syncToDocument360().catch(console.error);
}
