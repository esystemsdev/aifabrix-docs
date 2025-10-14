#!/usr/bin/env ts-node

/**
 * Main Navigation Generation Script
 * 
 * Automatically generates the main site navigation (site/_data/navigation.yml)
 * from individual section navigation files (docs/[section]/navigation.yaml).
 * 
 * This ensures the main navigation stays in sync with the actual content
 * structure without manual intervention.
 * 
 * Usage: npm run generate-main-nav
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const DOCS_DIR = 'docs';
const SITE_NAV_FILE = 'site/_data/navigation.yml';

interface NavigationItem {
    title: string;
    url: string;
    order?: number;
}

interface SectionNavigation {
    title: string;
    description?: string;
    items: NavigationItem[];
}

interface MainNavigationItem {
    text: string;
    url: string;
    submenu?: MainNavigationItem[];
}

/**
 * Get the display name for a section
 */
function getSectionDisplayName(sectionName: string): string {
    const displayNames: Record<string, string> = {
        'overview': 'Overview',
        'evaluation': 'Evaluation Guide',
        'core-components': 'Core Components',
        'enterprise-features': 'Enterprise Features',
        'use-cases': 'Use Cases',
        'deployment-operations': 'Deployment & Operations',
        'customer-success': 'Customer Success',
        'modules-documentation': 'Modules & Documentation',
        'roadmap': 'Roadmap',
        'resources': 'Resources'
    };
    
    return displayNames[sectionName] || sectionName.charAt(0).toUpperCase() + sectionName.slice(1).replace(/-/g, ' ');
}

/**
 * Read and parse a section navigation file
 */
function readSectionNavigation(sectionPath: string): SectionNavigation | null {
    const navFile = path.join(sectionPath, 'navigation.yaml');
    
    if (!fs.existsSync(navFile)) {
        console.warn(`⚠️  Warning: Navigation file not found: ${navFile}`);
        return null;
    }
    
    try {
        const content = fs.readFileSync(navFile, 'utf8');
        const data = yaml.load(content) as SectionNavigation;
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn(`⚠️  Warning: Could not parse ${navFile}: ${errorMessage}`);
        return null;
    }
}

/**
 * Convert section navigation items to main navigation format
 */
function convertToMainNavigationItems(items: NavigationItem[], sectionName: string): MainNavigationItem[] {
    return items.map(item => ({
        text: item.title,
        url: `/docs/${sectionName}/${item.url}/`
    }));
}

/**
 * Generate the main navigation structure
 */
function generateMainNavigation(): MainNavigationItem[] {
    const mainNav: MainNavigationItem[] = [
        {
            text: 'Home',
            url: '/'
        }
    ];
    
    // Define the order of sections
    const sectionOrder = [
        'overview',
        'evaluation', 
        'core-components',
        'enterprise-features',
        'use-cases',
        'deployment-operations',
        'customer-success',
        'modules-documentation',
        'roadmap',
        'resources'
    ];
    
    for (const sectionName of sectionOrder) {
        const sectionPath = path.join(DOCS_DIR, sectionName);
        
        if (!fs.existsSync(sectionPath)) {
            console.warn(`⚠️  Warning: Section directory not found: ${sectionPath}`);
            continue;
        }
        
        const sectionNav = readSectionNavigation(sectionPath);
        
        if (!sectionNav || !sectionNav.items || sectionNav.items.length === 0) {
            console.warn(`⚠️  Warning: No navigation items found for section: ${sectionName}`);
            continue;
        }
        
        // Get the first item as the main section URL
        const firstItem = sectionNav.items[0];
        const sectionDisplayName = getSectionDisplayName(sectionName);
        
        // Create main navigation item
        const mainNavItem: MainNavigationItem = {
            text: sectionDisplayName,
            url: `/docs/${sectionName}/${firstItem.url}/`,
            submenu: convertToMainNavigationItems(sectionNav.items, sectionName)
        };
        
        mainNav.push(mainNavItem);
        console.log(`✅ Added section: ${sectionDisplayName} (${sectionNav.items.length} items)`);
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
    console.log('🧭 Generating main site navigation...\n');
    
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
