#!/usr/bin/env ts-node

/**
 * Document360 Sync Script
 *
 * Runs a forward sync from this repo’s markdown + YAML into Document360 via the
 * local `aifabrix-d360` package (`AifabrixD360`). Separate from the Jekyll build.
 *
 * Local roots: **`./docs`** (user documentation, default `SYNC_SOURCE_PATH`) vs
 * **`./api-docs`** (API reference). Use **`npm run sync-document360:api-docs`**, which
 * sets `SYNC_SOURCE_PATH=./api-docs` for that run.
 *
 * Sync target (which Document360 project version lane to use):
 * - Default: `docs` (user documentation version). Same as `new AifabrixD360()` with
 *   no `syncTarget` / env `SYNC_TARGET` unset.
 * - `api-docs`: API documentation version (separate main/public version in D360).
 *
 * Resolve order for target: first CLI argument `docs` | `api-docs`, else
 * `SYNC_TARGET=api-docs` selects api-docs; otherwise `docs`.
 *
 * SQLite state: aifabrix-d360 uses `./data/sync-docs.db` vs `./data/sync-api-docs.db`
 * by target unless `DATABASE_PATH` is set (single DB for all lanes).
 *
 * Usage:
 *   npm run sync-document360              # docs lane
 *   npm run sync-document360:api-docs     # api-docs lane + ./api-docs
 *   ts-node scripts/sync-document360.ts api-docs
 *
 * Reverse sync / watch: use the same target and DB as forward sync for that lane
 * (see aifabrix-d360 CLI: `node …/dist/index.js watch docs|api-docs`).
 *
 * Safe smoke test: `MOCK_MODE=true` plus placeholder token/project (see `env.example`).
 */

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { AifabrixD360, type AifabrixD360Config, type SyncTargetId } from 'aifabrix-d360';

dotenv.config();

function ensureDatabaseDirectory(syncTarget: SyncTargetId, explicitDb: string | undefined): void {
    const dbFile =
        explicitDb && explicitDb.length > 0
            ? explicitDb
            : syncTarget === 'docs'
              ? './data/sync-docs.db'
              : './data/sync-api-docs.db';
    fs.mkdirSync(path.dirname(path.resolve(process.cwd(), dbFile)), { recursive: true });
}

function resolveSyncTargetFromArgv(): SyncTargetId | undefined {
    const pos = process.argv.slice(2).find((a): a is SyncTargetId => a === 'docs' || a === 'api-docs');
    return pos;
}

/** Effective sync target: CLI arg overrides env `SYNC_TARGET`. */
export function resolveSyncTarget(): SyncTargetId {
    const fromArgv = resolveSyncTargetFromArgv();
    if (fromArgv) return fromArgv;
    if (process.env.SYNC_TARGET === 'api-docs') return 'api-docs';
    return 'docs';
}

function validateEnvironment(): void {
    const mock = process.env.MOCK_MODE === 'true';
    if (!mock && !process.env.DOCUMENT360_API_TOKEN) {
        throw new Error(
            'Document360 API token not found. Set DOCUMENT360_API_TOKEN in .env or use MOCK_MODE=true for a dry API mock.'
        );
    }
    if (!mock && !process.env.DOCUMENT360_PROJECT_ID) {
        throw new Error('Document360 Project ID not found. Set DOCUMENT360_PROJECT_ID in .env.');
    }
}

export async function syncToDocument360(syncTarget?: SyncTargetId): Promise<void> {
    const target = syncTarget ?? resolveSyncTarget();
    console.log(`🔄 Starting Document360 sync (target: ${target})...\n`);

    try {
        validateEnvironment();

        const baseUrl = process.env.DOCUMENT360_BASE_URL || 'https://apihub.document360.io';
        const sourcePath = process.env.SYNC_SOURCE_PATH || './docs';
        const logLevel = process.env.LOG_LEVEL || 'info';
        const explicitDb = process.env.DATABASE_PATH?.trim();

        console.log(`🔑 Using Document360 API: ${baseUrl}`);
        console.log(`🔑 Project ID: ${process.env.DOCUMENT360_PROJECT_ID || '(mock)'}`);
        console.log(`📁 Source path: ${sourcePath}`);
        console.log(
            `💾 Database: ${explicitDb && explicitDb.length > 0 ? explicitDb : './data/sync-docs.db | ./data/sync-api-docs.db (by target)'}\n`
        );

        const databasePartial: Partial<AifabrixD360Config['database']> = {
            backupEnabled: false,
            backupInterval: 3600000,
            ...(explicitDb && explicitDb.length > 0 ? { path: explicitDb } : {}),
        };

        ensureDatabaseDirectory(target, explicitDb);

        const sync = new AifabrixD360({
            syncTarget: target,
            document360: {
                apiToken: process.env.DOCUMENT360_API_TOKEN || '',
                projectId: process.env.DOCUMENT360_PROJECT_ID || '',
                baseUrl,
                timeout: 120000,
            },
            sync: {
                sourcePath,
                dryRun: process.env.SYNC_DRY_RUN === 'true',
                batchSize: 10,
                retryAttempts: 3,
                retryDelay: 1000,
                publishArticles: true,
            },
            database: databasePartial,
            logging: {
                level: logLevel as 'debug' | 'info' | 'warn' | 'error',
                console: true,
            },
        } as Partial<AifabrixD360Config>);

        if (process.env.SYNC_DRY_RUN === 'true') {
            console.log('🔍 DRY-RUN mode is enabled (via SYNC_DRY_RUN environment variable)');
            console.log('   Note: Some API calls may still occur to check existing state\n');
        }

        await sync.sync();

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

        sync.cleanup();

        console.log(`✅ Document360 sync completed successfully (target: ${target})`);
        console.log(`   ✨ Mermaid diagrams were automatically processed and uploaded`);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`\n❌ Document360 sync failed: ${errorMessage}\n`);
        throw new Error(`Document360 sync failed: ${errorMessage}`);
    }
}

if (require.main === module) {
    syncToDocument360().catch(console.error);
}
