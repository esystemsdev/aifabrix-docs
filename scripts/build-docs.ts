#!/usr/bin/env ts-node

/**
 * AI Fabrix Documentation Build Orchestrator
 * 
 * This script orchestrates the entire documentation build process:
 * 1. Validate YAML files
 * 2. Generate navigation files
 * 3. Merge metadata into markdown for Jekyll
 * 4. Build Jekyll site
 * 5. Deploy to GitHub Pages
 * 
 * Usage: npm run build-docs
 */

import { validateYamlFiles } from './validate-yaml';
import { generateNavigationFiles } from './generate-navigation';
import { mergeMetadataToMarkdown } from './merge-metadata';
import { buildJekyllSite } from './build-jekyll';
import { deployToGitHubPages } from './deploy';

async function main() {
    console.log('🚀 Starting AI Fabrix Documentation Build Process...\n');
    
    try {
        // Step 1: Validate all YAML files
        console.log('📋 Step 1: Validating YAML files...');
        await validateYamlFiles();
        console.log('✅ YAML validation completed\n');
        
        // Step 2: Generate navigation files for each folder
        console.log('🧭 Step 2: Generating navigation files...');
        await generateNavigationFiles();
        console.log('✅ Navigation generation completed\n');
        
        // Step 3: Merge YAML metadata into markdown files for Jekyll
        console.log('🔗 Step 3: Merging metadata into markdown...');
        await mergeMetadataToMarkdown();
        console.log('✅ Metadata merge completed\n');
        
        // Step 4: Build Jekyll site
        console.log('🏗️  Step 4: Building Jekyll site...');
        await buildJekyllSite();
        console.log('✅ Jekyll build completed\n');
        
        // Step 5: Deploy to GitHub Pages
        console.log('🚀 Step 5: Deploying to GitHub Pages...');
        await deployToGitHubPages();
        console.log('✅ Deployment completed\n');
        
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
