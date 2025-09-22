const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Configuration
const DOCS_DIR = 'site/_docs';
const NAVIGATION_FILE = 'site/_data/navigation.yml';

// Read all YAML files and generate navigation
function generateNavigation() {
    console.log('🔍 Scanning YAML files for navigation generation...');
    
    const navigation = [];

    // Define the main navigation structure based on directory structure
    const mainSections = {
        'getting-started': {
            text: 'Getting Started',
            url: '/docs/getting-started/quick-deploy/',
            submenu: []
        },
        'background': {
            text: 'Platform Overview',
            url: '/docs/background/platform-overview/',
            submenu: []
        },
        'architecture': {
            text: 'Architecture',
            url: '/docs/architecture/miso-controller/',
            submenu: []
        },
        'miso-controller': {
            text: 'Miso Controller',
            url: '/docs/miso-controller/overview/',
            submenu: []
        },
        'flowise': {
            text: 'Flowise',
            url: '/docs/flowise/overview/',
            submenu: []
        },
        'openwebui': {
            text: 'OpenWebUI',
            url: '/docs/openwebui/overview/',
            submenu: []
        },
        'user-guides': {
            text: 'User Guides',
            url: '/docs/user-guides/',
            submenu: []
        },
        'api': {
            text: 'API Reference',
            url: '/docs/api/miso-api/',
            submenu: []
        },
        'support': {
            text: 'Support',
            url: '/docs/support/',
            submenu: []
        }
    };

    // Scan all YAML files
    function scanDirectory(dir, sectionKey = null) {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const item of items) {
            const fullPath = path.join(dir, item.name);
            
            if (item.isDirectory()) {
                // Recursively scan subdirectories
                const subSectionKey = item.name;
                scanDirectory(fullPath, subSectionKey);
            } else if (item.isFile() && item.name.endsWith('.yaml') && item.name !== 'navigation.yaml') {
                try {
                    const yamlContent = fs.readFileSync(fullPath, 'utf8');
                    const data = yaml.load(yamlContent);
                    
                    if (data && data.title) {
                        // Extract relative path from site/_docs
                        const relativePath = fullPath.replace('site\\_docs\\', '').replace('site/_docs/', '').replace('.yaml', '').replace(/\\/g, '/');
                        const url = `/docs/${relativePath}/`;
                        
                        // Determine which main section this belongs to
                        const pathParts = relativePath.split('/');
                        const mainSection = pathParts[0];
                        
                        if (mainSections[mainSection]) {
                            // Add to main section submenu
                            const menuItem = {
                                text: data.title,
                                url: url
                            };
                            
                            // Check if it's a subdirectory item
                            if (pathParts.length > 1) {
                                const subDir = pathParts[1];
                                
                                // Find or create subdirectory group
                                let subGroup = mainSections[mainSection].submenu.find(item => 
                                    item.text === subDir.charAt(0).toUpperCase() + subDir.slice(1).replace(/-/g, ' ')
                                );
                                
                                if (!subGroup) {
                                    subGroup = {
                                        text: subDir.charAt(0).toUpperCase() + subDir.slice(1).replace(/-/g, ' '),
                                        submenu: []
                                    };
                                    mainSections[mainSection].submenu.push(subGroup);
                                }
                                
                                subGroup.submenu.push(menuItem);
                            } else {
                                mainSections[mainSection].submenu.push(menuItem);
                            }
                        }
                    }
                } catch (error) {
                    console.warn(`⚠️  Warning: Could not parse ${fullPath}: ${error.message}`);
                }
            }
        }
    }

    // Add Home link
    navigation.push({
        text: "Home",
        url: "/"
    });

    // Scan the docs directory
    scanDirectory(DOCS_DIR);

    // Add all main sections to navigation
    Object.values(mainSections).forEach(section => {
        if (section.submenu.length > 0) {
            navigation.push(section);
        }
    });

    // Write the navigation file
    const yamlContent = yaml.dump(navigation, {
        indent: 2,
        lineWidth: -1,
        noRefs: true,
        sortKeys: false
    });

    fs.writeFileSync(NAVIGATION_FILE, yamlContent);
    
    console.log(`✅ Navigation generated successfully!`);
    console.log(`📁 Main sections: ${navigation.length - 1}`);
    
    // Count total items
    let totalItems = 0;
    navigation.forEach(section => {
        if (section.submenu) {
            totalItems += section.submenu.length;
            section.submenu.forEach(sub => {
                if (sub.submenu) {
                    totalItems += sub.submenu.length;
                }
            });
        }
    });
    
    console.log(`📄 Total navigation items: ${totalItems}`);
    console.log(`📝 Navigation file: ${NAVIGATION_FILE}`);
}

// Run the script
if (require.main === module) {
    generateNavigation();
}

module.exports = { generateNavigation };