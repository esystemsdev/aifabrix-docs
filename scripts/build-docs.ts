#!/usr/bin/env ts-node

/**
 * AI Fabrix Documentation Build Orchestrator
 * 
 * This script orchestrates the entire documentation build process:
 * 1. Validate YAML files
 * 2. Generate navigation files for each section
 * 3. Generate main site navigation
 * 4. Merge metadata into markdown for Jekyll
 * 5. Build Jekyll site
 * 6. Deploy to GitHub Pages
 * 
 * Usage: npm run build-docs
 */

import { validateYamlFiles } from './validate-yaml';
import { generateNavigationFiles } from './generate-navigation';
import { generateMainNavigationFile } from './generate-main-navigation';
import { mergeMetadataToMarkdown } from './merge-metadata';
import { buildJekyllSite } from './build-jekyll';
import { deployToGitHubPages } from './deploy';
import { spawnSync } from 'child_process';
import * as path from 'path';

async function main() {
    console.log('🚀 Starting AI Fabrix Documentation Build Process...\n');
    
    try {
        // Step 1: Validate all YAML files
        console.log('📋 Step 1: Validating YAML files...');
        await validateYamlFiles();
        console.log('✅ YAML validation completed\n');

        if (process.env.AIFABRIX_WORK && process.env.AIFABRIX_WORK.trim() !== '') {
            console.log('🔗 Step 1b: docs-sync (anchors + Cursor nav, AIFABRIX_WORK set)...');
            const root = path.resolve(__dirname, '..');
            const r = spawnSync(
                process.platform === 'win32' ? 'npm.cmd' : 'npm',
                ['run', 'docs-sync'],
                { cwd: root, stdio: 'inherit', env: process.env },
            );
            if (r.status !== 0) {
                throw new Error('docs-sync failed');
            }
            console.log('✅ docs-sync completed\n');
        } else {
            console.log('⏭️  Step 1b: Skipping docs-sync (set AIFABRIX_WORK to run anchor validation + persona + Cursor nav)\n');
        }
        
        // Step 2: Generate navigation files for each folder
        console.log('🧭 Step 2: Generating navigation files...');
        await generateNavigationFiles();
        console.log('✅ Navigation generation completed\n');
        
        // Step 3: Generate main site navigation
        console.log('🧭 Step 3: Generating main site navigation...');
        await generateMainNavigationFile();
        console.log('✅ Main navigation generation completed\n');
        
        // Step 4: Merge YAML metadata into markdown files for Jekyll
        console.log('🔗 Step 4: Merging metadata into markdown...');
        await mergeMetadataToMarkdown();
        console.log('✅ Metadata merge completed\n');
        
        // Step 5: Build Jekyll site
        console.log('🏗️  Step 5: Building Jekyll site...');
        await buildJekyllSite();
        console.log('✅ Jekyll build completed\n');
        
        // Step 6: Deploy to GitHub Pages (only if not in GitHub Actions)
        if (!process.env.GITHUB_ACTIONS) {
            console.log('🚀 Step 6: Deploying to GitHub Pages...');
            await deployToGitHubPages();
            console.log('✅ Deployment completed\n');
        } else {
            console.log('🚀 Step 6: Skipping deployment (running in GitHub Actions)\n');
        }
        
        console.log('🎉 Documentation build process completed successfully!');
        
    } catch (error) {
        console.error('❌ Build process failed:', error);
        process.exit(1);
    }
}

// Run the build process
if (require.main === module) {
    main();
}

export { main as buildDocs };
