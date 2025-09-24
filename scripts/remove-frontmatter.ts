#!/usr/bin/env ts-node

/**
 * Remove Frontmatter Script
 * 
 * Removes frontmatter from all markdown files in the docs directory
 * to ensure pure markdown content with separate YAML metadata files.
 */

import * as fs from 'fs';
import * as path from 'path';

const DOCS_DIR = 'docs';

interface FileInfo {
    path: string;
    hasFrontmatter: boolean;
    frontmatterLines: number;
}

/**
 * Removes frontmatter from a markdown file
 */
function removeFrontmatterFromFile(filePath: string): FileInfo {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        
        // Check if file has frontmatter
        if (!lines[0] || lines[0].trim() !== '---') {
            return {
                path: filePath,
                hasFrontmatter: false,
                frontmatterLines: 0
            };
        }
        
        // Find the end of frontmatter (second ---)
        let frontmatterEnd = -1;
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '---') {
                frontmatterEnd = i;
                break;
            }
        }
        
        if (frontmatterEnd === -1) {
            console.warn(`⚠️  ${filePath} has malformed frontmatter`);
            return {
                path: filePath,
                hasFrontmatter: true,
                frontmatterLines: 0
            };
        }
        
        // Remove frontmatter (lines 0 to frontmatterEnd inclusive)
        const contentWithoutFrontmatter = lines.slice(frontmatterEnd + 1).join('\n');
        
        // Write back to file
        fs.writeFileSync(filePath, contentWithoutFrontmatter, 'utf8');
        
        return {
            path: filePath,
            hasFrontmatter: true,
            frontmatterLines: frontmatterEnd + 1
        };
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}: ${error}`);
        return {
            path: filePath,
            hasFrontmatter: false,
            frontmatterLines: 0
        };
    }
}

/**
 * Recursively scan directory for markdown files
 */
function scanForMarkdownFiles(dir: string): string[] {
    const markdownFiles: string[] = [];
    
    function walkDir(currentDir: string) {
        const files = fs.readdirSync(currentDir);
        
        for (const file of files) {
            const filePath = path.join(currentDir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                walkDir(filePath);
            } else if (file.endsWith('.md')) {
                markdownFiles.push(filePath);
            }
        }
    }
    
    walkDir(dir);
    return markdownFiles;
}

/**
 * Main function to remove frontmatter from all markdown files
 */
function removeFrontmatterFromAllFiles(): void {
    console.log('🔧 Removing frontmatter from all markdown files...');
    
    const markdownFiles = scanForMarkdownFiles(DOCS_DIR);
    console.log(`📄 Found ${markdownFiles.length} markdown files to process`);
    
    let processedCount = 0;
    let removedCount = 0;
    let totalLinesRemoved = 0;
    
    for (const filePath of markdownFiles) {
        const result = removeFrontmatterFromFile(filePath);
        processedCount++;
        
        if (result.hasFrontmatter) {
            removedCount++;
            totalLinesRemoved += result.frontmatterLines;
            console.log(`✅ Removed ${result.frontmatterLines} lines of frontmatter from ${filePath}`);
        } else {
            console.log(`ℹ️  ${filePath} has no frontmatter`);
        }
    }
    
    console.log(`\n📊 Frontmatter removal completed!`);
    console.log(`📄 Files processed: ${processedCount}`);
    console.log(`🗑️  Files with frontmatter removed: ${removedCount}`);
    console.log(`📝 Total lines removed: ${totalLinesRemoved}`);
}

// Run the script
if (require.main === module) {
    removeFrontmatterFromAllFiles();
}

export { removeFrontmatterFromAllFiles, removeFrontmatterFromFile };
