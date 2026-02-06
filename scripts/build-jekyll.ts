#!/usr/bin/env ts-node

/**
 * Jekyll Build Script
 * 
 * Builds the Jekyll site from the processed markdown files.
 * This script handles the Jekyll build process and ensures proper
 * configuration for GitHub Pages deployment.
 * 
 * Usage: npm run build-jekyll
 */

import { execSync } from 'child_process';

const SITE_DIR = 'site';
const OUTPUT_DIR = '_site';

/**
 * Builds the Jekyll site
 */
export async function buildJekyllSite(): Promise<void> {
    console.log(`🏗️  Building Jekyll site...`);
    
    try {
        // Change to site directory
        process.chdir(SITE_DIR);
        
        // Install Jekyll dependencies if needed
        console.log(`📦 Installing Jekyll dependencies...`);
        // Configure bundler to use local vendor/bundle directory to avoid permission issues
        try {
            execSync('bundle config set --local path vendor/bundle', { stdio: 'inherit' });
        } catch (error) {
            // If config fails, try without --local flag
            execSync('bundle config set path vendor/bundle', { stdio: 'inherit' });
        }
        execSync('bundle install', { 
            stdio: 'inherit',
            env: {
                ...process.env,
                BUNDLE_PATH: 'vendor/bundle'
            }
        });
        
        // Build Jekyll site
        console.log(`🔨 Running Jekyll build...`);
        execSync(`bundle exec jekyll build --destination ../${OUTPUT_DIR}`, { 
            stdio: 'inherit',
            env: {
                ...process.env,
                JEKYLL_ENV: 'production'
            }
        });
        
        // Change back to root directory
        process.chdir('..');
        
        console.log(`✅ Jekyll build completed successfully`);
        
    } catch (error) {
        // Change back to root directory on error
        process.chdir('..');
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Jekyll build failed: ${errorMessage}`);
    }
}

// Run build if called directly
if (require.main === module) {
    buildJekyllSite().catch(console.error);
}
