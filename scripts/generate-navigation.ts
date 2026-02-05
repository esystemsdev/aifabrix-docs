#!/usr/bin/env ts-node

/**
 * Navigation Generation Script
 * 
 * Scans each folder in the docs directory and generates navigation.yaml files
 * that define the sidebar navigation for that section.
 * 
 * Features:
 * - Auto-detects .md files in each folder
 * - Reads metadata from corresponding .yaml files
 * - Generates navigation.yaml for each folder
 * - Allows manual reordering of navigation items
 * 
 * Usage: npm run generate-nav
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const DOCS_DIR = 'docs';

interface NavigationItem {
    title: string;
    url: string;
    order?: number;
}

interface NavigationConfig {
    title: string;
    description?: string;
    items: NavigationItem[];
}

interface YamlMetadata {
    title: string;
    description?: string;
    order?: number;
    [key: string]: any;
}

/**
 * Scans a directory for markdown files and their corresponding YAML metadata
 */
function scanFolderForDocs(folderPath: string): NavigationItem[] {
    const items: NavigationItem[] = [];
    
    try {
        const files = fs.readdirSync(folderPath);
        
        for (const file of files) {
            if (file.endsWith('.md')) {
                const baseName = file.replace('.md', '');
                const yamlFile = path.join(folderPath, `${baseName}.yaml`);
                
                if (fs.existsSync(yamlFile)) {
                    try {
                        const yamlContent = fs.readFileSync(yamlFile, 'utf8');
                        const metadata = yaml.load(yamlContent) as YamlMetadata;
                        
                        if (metadata && metadata.title) {
                            items.push({
                                title: metadata.title,
                                url: baseName,
                                order: metadata.order || 999 // Default order for items without explicit order
                            });
                        }
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    console.warn(`⚠️  Warning: Could not parse ${yamlFile}: ${errorMessage}`);
                }
                }
            }
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn(`⚠️  Warning: Could not scan folder ${folderPath}: ${errorMessage}`);
    }
    
    // Sort by order, then by title
    return items.sort((a, b) => {
        if (a.order !== b.order) {
            return (a.order || 999) - (b.order || 999);
        }
        return a.title.localeCompare(b.title);
    });
}

/**
 * Generates navigation.yaml for a specific folder
 */
function generateNavigationForFolder(folderPath: string): void {
    const folderName = path.basename(folderPath);
    const navigationFile = path.join(folderPath, 'navigation.yaml');
    
    // Scan for documents first
    const items = scanFolderForDocs(folderPath);
    
    // Skip empty directories (V1 remnants)
    if (items.length === 0) {
        console.log(`⏭️  Skipping empty directory: ${folderName}`);
        return;
    }
    
    // Get folder title from first YAML file or use folder name
    let folderTitle = folderName.charAt(0).toUpperCase() + folderName.slice(1).replace(/-/g, ' ');
    
    // Try to get title from first YAML file
    try {
        const files = fs.readdirSync(folderPath);
        for (const file of files) {
            if (file.endsWith('.yaml') && file !== 'navigation.yaml') {
                const yamlContent = fs.readFileSync(path.join(folderPath, file), 'utf8');
                const metadata = yaml.load(yamlContent) as YamlMetadata;
                if (metadata && metadata.title) {
                    // Extract section title from first document
                    folderTitle = metadata.title.split(' - ')[0] || metadata.title.split(': ')[0] || folderTitle;
                    break;
                }
            }
        }
    } catch (error) {
        // Use default title
    }
    
    const navigationConfig: NavigationConfig = {
        title: folderTitle,
        description: `Navigation for ${folderTitle} section`,
        items: items
    };
    
    // Generate YAML content
    const yamlContent = yaml.dump(navigationConfig, {
        indent: 2,
        lineWidth: -1,
        noRefs: true,
        sortKeys: false
    });
    
    // Write navigation file
    fs.writeFileSync(navigationFile, yamlContent, 'utf8');
    console.log(`✅ Generated navigation for ${folderName}: ${items.length} items`);
}

/**
 * Main navigation generation function
 */
export async function generateNavigationFiles(): Promise<void> {
    console.log(`🔍 Scanning folders in ${DOCS_DIR}...`);
    
    try {
        const folders = fs.readdirSync(DOCS_DIR, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => path.join(DOCS_DIR, dirent.name));
        
        console.log(`📁 Found ${folders.length} folders to process`);
        
        for (const folder of folders) {
            generateNavigationForFolder(folder);
        }
        
        console.log(`\n📊 Navigation generation completed for ${folders.length} folders`);
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Navigation generation failed: ${errorMessage}`);
    }
}

// Run generation if called directly
if (require.main === module) {
    generateNavigationFiles().catch(console.error);
}
