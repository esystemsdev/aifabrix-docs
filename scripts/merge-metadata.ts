#!/usr/bin/env ts-node

/**
 * Metadata Merge Script
 * 
 * Merges YAML metadata files into markdown files to create Jekyll-compatible
 * files with frontmatter. This allows Jekyll to process the markdown while
 * keeping the original YAML files separate for Document360 sync.
 * 
 * Process:
 * 1. Reads .yaml metadata files
 * 2. Merges metadata into corresponding .md files as frontmatter
 * 3. Preserves original .yaml files for Document360
 * 4. Creates Jekyll-compatible files in site/_docs/
 * 
 * Usage: npm run merge-metadata
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const DOCS_DIR = 'docs';
const SITE_DOCS_DIR = 'site/_docs';

interface YamlMetadata {
    title: string;
    description: string;
    audience: string[];
    version: string;
    owner: string;
    last_reviewed: string;
    layout: string;
    toc?: boolean;
    custom_links?: any[];
    seo?: any;
    document360?: any;
    [key: string]: any;
}

/**
 * Merges YAML metadata into markdown file
 */
function mergeMetadataToMarkdownFile(yamlPath: string): void {
    try {
        const markdownPath = yamlPath.replace('.yaml', '.md');
        
        // Check if both files exist
        if (!fs.existsSync(markdownPath)) {
            console.log(`⚠️  Warning: No corresponding markdown file for ${yamlPath}`);
            return;
        }
        
        // Read YAML metadata
        const yamlContent = fs.readFileSync(yamlPath, 'utf8');
        const metadata = yaml.load(yamlContent) as YamlMetadata;
        
        if (!metadata) {
            console.log(`⚠️  Warning: Empty YAML file: ${yamlPath}`);
            return;
        }
        
        // Read markdown content
        const markdownContent = fs.readFileSync(markdownPath, 'utf8');
        
        // Extract content after existing frontmatter (if any)
        let contentAfterFrontmatter = markdownContent;
        if (markdownContent.startsWith('---')) {
            const parts = markdownContent.split('---');
            if (parts.length >= 3) {
                contentAfterFrontmatter = parts.slice(2).join('---').trim();
            }
        }
        
        // Create frontmatter from YAML metadata
        const frontmatter = yaml.dump(metadata, {
            indent: 2,
            lineWidth: -1,
            noRefs: true,
            sortKeys: false
        });
        
        // Combine frontmatter with content
        const mergedContent = `---\n${frontmatter}---\n\n${contentAfterFrontmatter}`;
        
        // Create target directory structure
        const relativePath = path.relative(DOCS_DIR, markdownPath);
        const targetPath = path.join(SITE_DOCS_DIR, relativePath);
        const targetDir = path.dirname(targetPath);
        
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        
        // Write merged file to site/_docs
        fs.writeFileSync(targetPath, mergedContent, 'utf8');
        console.log(`✅ Merged metadata into ${relativePath}`);
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`❌ Error merging ${yamlPath}: ${errorMessage}`);
    }
}

/**
 * Recursively processes all YAML files in the docs directory
 */
function processYamlFiles(dir: string): void {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            processYamlFiles(filePath);
        } else if (file.endsWith('.yaml') && file !== 'navigation.yaml') {
            mergeMetadataToMarkdownFile(filePath);
        }
    }
}

/**
 * Main merge function
 */
export async function mergeMetadataToMarkdown(): Promise<void> {
    console.log(`🔗 Merging YAML metadata into markdown files...`);
    
    // Ensure site/_docs directory exists
    if (!fs.existsSync(SITE_DOCS_DIR)) {
        fs.mkdirSync(SITE_DOCS_DIR, { recursive: true });
    }
    
    // Process all YAML files
    processYamlFiles(DOCS_DIR);
    
    console.log(`✅ Metadata merge completed`);
}

// Run merge if called directly
if (require.main === module) {
    mergeMetadataToMarkdown().catch(console.error);
}
