#!/usr/bin/env ts-node

/**
 * GitHub Pages Deployment Script
 * 
 * Deploys the built Jekyll site to GitHub Pages.
 * This script handles the deployment process for GitHub Pages,
 * including proper configuration and error handling.
 * 
 * Usage: npm run deploy
 */

import { execSync } from 'child_process';
import * as fs from 'fs';

const OUTPUT_DIR = '_site';

/**
 * Deploys the site to GitHub Pages
 */
export async function deployToGitHubPages(): Promise<void> {
    console.log(`🚀 Deploying to GitHub Pages...`);
    
    try {
        // Check if output directory exists
        if (!fs.existsSync(OUTPUT_DIR)) {
            throw new Error(`Build output directory ${OUTPUT_DIR} does not exist. Run build first.`);
        }
        
        // Check if we're in a git repository
        try {
            execSync('git status', { stdio: 'pipe' });
        } catch (error) {
            throw new Error('Not in a git repository. Cannot deploy to GitHub Pages.');
        }
        
        // Check if we're on the correct branch
        const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
        console.log(`📍 Current branch: ${currentBranch}`);
        
        // Add and commit changes
        console.log(`📝 Committing changes...`);
        execSync('git add .', { stdio: 'inherit' });
        
        try {
            execSync('git commit -m "docs: Update documentation build"', { stdio: 'inherit' });
        } catch (error) {
            console.log(`ℹ️  No changes to commit`);
        }
        
        // Push to GitHub
        console.log(`⬆️  Pushing to GitHub...`);
        execSync(`git push origin ${currentBranch}`, { stdio: 'inherit' });
        
        console.log(`✅ Deployment completed successfully`);
        console.log(`🌐 Site should be available at: https://docs-dev.aifabrix.ai/`);
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Deployment failed: ${errorMessage}`);
    }
}

// Run deployment if called directly
if (require.main === module) {
    deployToGitHubPages().catch(console.error);
}
