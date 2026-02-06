#!/usr/bin/env ts-node

/**
 * Main Navigation Generation Script (V2)
 * 
 * Automatically generates the main site navigation (site/_data/navigation.yml)
 * from YAML metadata files in each section directory.
 * 
 * V2 Structure:
 * - Each section has a single .md file and corresponding .yaml metadata file
 * - Order is determined by the `document360.order` field in YAML metadata
 * - Navigation is generated directly from YAML metadata, not from navigation.yaml files
 * 
 * Usage: npm run generate-main-nav
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const DOCS_DIR = 'docs';
const SITE_NAV_FILE = 'site/_data/navigation.yml';

interface YamlMetadata {
    title: string;
    description?: string;
    document360?: {
        order?: number;
        category?: string;
    };
    custom_links?: Array<{
        text: string;
        url: string;
    }>;
    [key: string]: any;
}

interface MainNavigationItem {
    text: string;
    url: string;
    submenu?: MainNavigationItem[];
}

/**
 * Get section metadata from YAML file
 */
function getSectionMetadata(sectionPath: string): { metadata: YamlMetadata; order: number } | null {
    try {
        const files = fs.readdirSync(sectionPath);
        
        // Find the YAML metadata file (should be one per section in V2)
        for (const file of files) {
            if (file.endsWith('.yaml') && file !== 'navigation.yaml') {
                const yamlPath = path.join(sectionPath, file);
                const yamlContent = fs.readFileSync(yamlPath, 'utf8');
                const metadata = yaml.load(yamlContent) as YamlMetadata;
                
                if (metadata && metadata.title) {
                    const order = metadata.document360?.order || 999;
                    return { metadata, order };
                }
            }
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn(`⚠️  Warning: Could not read metadata from ${sectionPath}: ${errorMessage}`);
    }
    
    return null;
}

/**
 * Generate the main navigation structure from V2 YAML metadata files
 */
function generateMainNavigation(): MainNavigationItem[] {
    const mainNav: MainNavigationItem[] = [
        {
            text: 'Home',
            url: '/'
        }
    ];
    
    // Collect all sections with their metadata
    const sections: Array<{
        name: string;
        path: string;
        metadata: YamlMetadata;
        order: number;
    }> = [];
    
    try {
        const folders = fs.readdirSync(DOCS_DIR, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => ({
                name: dirent.name,
                path: path.join(DOCS_DIR, dirent.name)
            }));
        
        for (const folder of folders) {
            const sectionData = getSectionMetadata(folder.path);
            
            if (sectionData) {
                sections.push({
                    name: folder.name,
                    path: folder.path,
                    metadata: sectionData.metadata,
                    order: sectionData.order
                });
            } else {
                console.warn(`⚠️  Warning: No metadata found for section: ${folder.name}`);
            }
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to scan sections: ${errorMessage}`);
    }
    
    // Sort sections by order
    sections.sort((a, b) => a.order - b.order);
    
    // Build navigation items
    for (const section of sections) {
        // Find the markdown file to generate URL
        const files = fs.readdirSync(section.path);
        const markdownFile = files.find(f => f.endsWith('.md'));
        
        if (!markdownFile) {
            console.warn(`⚠️  Warning: No markdown file found in ${section.path}`);
            continue;
        }
        
        // Generate URL - for V2, use simplified URL if filename matches section name
        const baseName = markdownFile.replace('.md', '');
        const sectionUrl = baseName === section.name 
            ? `/docs/${section.name}/`
            : `/docs/${section.name}/${baseName}/`;
        
        // Build submenu from custom_links if available, otherwise just the main item
        const submenu: MainNavigationItem[] = [];
        
        // Add main section item to submenu
        submenu.push({
            text: section.metadata.title,
            url: sectionUrl
        });
        
        // Add custom_links to submenu if they exist
        if (section.metadata.custom_links && Array.isArray(section.metadata.custom_links)) {
            for (const link of section.metadata.custom_links) {
                // Skip self-reference
                if (link.url === sectionUrl || link.url === `/docs/${section.name}/`) {
                    continue;
                }
                submenu.push({
                    text: link.text,
                    url: link.url
                });
            }
        }
        
        // Create main navigation item
        const mainNavItem: MainNavigationItem = {
            text: section.metadata.title,
            url: sectionUrl
        };
        
        // Only add submenu if there are multiple items
        if (submenu.length > 1) {
            mainNavItem.submenu = submenu;
        }
        
        mainNav.push(mainNavItem);
        console.log(`✅ Added section: ${section.metadata.title} (order: ${section.order})`);
    }
    
    return mainNav;
}

/**
 * Write the main navigation to the site navigation file
 */
function writeMainNavigation(navigation: MainNavigationItem[]): void {
    try {
        // Ensure the directory exists
        const navDir = path.dirname(SITE_NAV_FILE);
        if (!fs.existsSync(navDir)) {
            fs.mkdirSync(navDir, { recursive: true });
        }
        
        // Convert to YAML format
        const yamlContent = yaml.dump(navigation, {
            indent: 2,
            lineWidth: -1,
            noRefs: true,
            sortKeys: false
        });
        
        // Write to file
        fs.writeFileSync(SITE_NAV_FILE, yamlContent, 'utf8');
        console.log(`✅ Main navigation written to: ${SITE_NAV_FILE}`);
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to write main navigation: ${errorMessage}`);
    }
}

/**
 * Main function to generate main navigation
 */
export async function generateMainNavigationFile(): Promise<void> {
    console.log('🧭 Generating main site navigation (V2)...\n');
    
    try {
        // Generate the navigation structure
        const mainNavigation = generateMainNavigation();
        
        // Write to file
        writeMainNavigation(mainNavigation);
        
        console.log(`\n📊 Main navigation generation completed successfully!`);
        console.log(`📁 Generated ${mainNavigation.length} main navigation items`);
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Main navigation generation failed: ${errorMessage}`);
    }
}

// Run generation if called directly
if (require.main === module) {
    generateMainNavigationFile()
        .then(() => {
            console.log('✅ Main navigation generation completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Main navigation generation failed:', error.message);
            process.exit(1);
        });
}
