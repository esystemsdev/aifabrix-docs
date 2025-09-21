#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const DOCS_DIR = './docs';
const REPO_ROOT = '.';
const OUTPUT_FILE = './site-data.json';

// Helper function to convert filename to title
function filenameToTitle(filename) {
    return filename
        .replace(/\.md$/, '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}

// Helper function to read YAML frontmatter
function readYamlMetadata(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/);
        
        if (yamlMatch) {
            const yamlContent = yamlMatch[1];
            // Simple YAML parsing for basic fields
            const metadata = {};
            yamlContent.split('\n').forEach(line => {
                const match = line.match(/^(\w+):\s*(.+)$/);
                if (match) {
                    const [, key, value] = match;
                    metadata[key] = value.replace(/^["']|["']$/g, ''); // Remove quotes
                }
            });
            return metadata;
        }
    } catch (error) {
        console.warn(`Could not read metadata from ${filePath}:`, error.message);
    }
    return {};
}

// Function to scan directory for markdown files
function scanDirectory(dirPath, basePath = '') {
    const items = [];
    
    try {
        const files = fs.readdirSync(dirPath);
        
        files.forEach(file => {
            const fullPath = path.join(dirPath, file);
            const relativePath = path.join(basePath, file);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                // Recursively scan subdirectories
                const subItems = scanDirectory(fullPath, relativePath);
                items.push(...subItems);
            } else if (file.endsWith('.md')) {
                // Read YAML metadata if available
                const yamlPath = fullPath.replace('.md', '.yaml');
                let metadata = {};
                
                if (fs.existsSync(yamlPath)) {
                    metadata = readYamlMetadata(yamlPath);
                }
                
                items.push({
                    path: relativePath,
                    title: metadata.title || filenameToTitle(file),
                    description: metadata.description || '',
                    audience: metadata.audience || '',
                    version: metadata.version || 'stable',
                    lastModified: stat.mtime.toISOString().split('T')[0]
                });
            }
        });
    } catch (error) {
        console.warn(`Could not scan directory ${dirPath}:`, error.message);
    }
    
    return items;
}

// Function to categorize files by directory
function categorizeFiles(files) {
    const categories = {
        'getting-started': [],
        'background': [],
        'architecture': [],
        'user-guides': [],
        'api': []
    };
    
    files.forEach(file => {
        const dir = file.path.split('/')[1]; // Get the first directory after 'docs/'
        
        if (categories[dir]) {
            categories[dir].push(file);
        }
    });
    
    return categories;
}

// Main function to generate site data
function generateSiteData() {
    console.log('🔍 Scanning documentation files...');
    
    // Scan docs directory
    const docsFiles = scanDirectory(DOCS_DIR, 'docs');
    const categorizedDocs = categorizeFiles(docsFiles);
    
    // Scan repository root for markdown files
    const repoFiles = scanDirectory(REPO_ROOT, '')
        .filter(file => file.path.endsWith('.md') && !file.path.startsWith('docs/'))
        .map(file => ({
            ...file,
            path: file.path.replace(/^\.\//, '') // Remove leading ./
        }));
    
    // Generate site data structure
    const siteData = {
        site: {
            title: "AI Fabrix Documentation",
            subtitle: "Enterprise AI platform with Azure-native ISO27k compliance",
            lastUpdated: new Date().toISOString().split('T')[0],
            repository: "esystemsdev/aifabrix-docs",
            commit: process.env.GITHUB_SHA || "latest"
        },
        navigation: {
            "getting-started": {
                title: "Getting Started",
                items: categorizedDocs['getting-started'].map(file => ({
                    path: file.path,
                    title: file.title
                }))
            },
            "background": {
                title: "Platform Overview",
                items: categorizedDocs['background'].map(file => ({
                    path: file.path,
                    title: file.title
                }))
            },
            "architecture": {
                title: "Architecture",
                items: categorizedDocs['architecture'].map(file => ({
                    path: file.path,
                    title: file.title
                }))
            },
            "user-guides": {
                title: "User Guides",
                items: categorizedDocs['user-guides'].map(file => ({
                    path: file.path,
                    title: file.title
                }))
            },
            "api": {
                title: "API Documentation",
                items: categorizedDocs['api'].map(file => ({
                    path: file.path,
                    title: file.title
                }))
            }
        },
        files: {
            docs: docsFiles.map(file => ({
                path: file.path,
                title: file.title,
                description: file.description,
                audience: file.audience,
                version: file.version,
                lastModified: file.lastModified
            })),
            repository: repoFiles.map(file => ({
                path: file.path,
                title: file.title,
                description: file.description,
                lastModified: file.lastModified
            }))
        }
    };
    
    // Write site data to file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(siteData, null, 2));
    
    console.log(`✅ Generated site data with:`);
    console.log(`   - ${docsFiles.length} documentation files`);
    console.log(`   - ${repoFiles.length} repository files`);
    console.log(`   - ${Object.values(categorizedDocs).flat().length} navigation items`);
    console.log(`📄 Site data written to ${OUTPUT_FILE}`);
}

// Run the generator
if (require.main === module) {
    generateSiteData();
}

module.exports = { generateSiteData };
