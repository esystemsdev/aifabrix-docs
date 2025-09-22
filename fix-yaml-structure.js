const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Configuration
const DOCS_DIR = 'site/_docs';

// Required YAML structure template
const getYamlTemplate = (title, description, category = 'general') => {
    const baseTemplate = {
        title: title,
        description: description,
        audience: ["end-user", "admin"],
        version: "stable",
        owner: "product-team",
        last_reviewed: new Date().toISOString().split('T')[0],
        layout: "doc",
        date: new Date().toISOString(),
        toc: true,
        custom_links: [],
        seo: {
            keywords: ["AI Fabrix", category],
            canonical_url: `https://docs.aifabrix.ai/${category}`,
            og_image: `images/${category}-${title.toLowerCase().replace(/\s+/g, '-')}.png`
        },
        document360: {
            category: category,
            visibility: "public",
            searchable: true,
            featured: false,
            order: 1
        }
    };

    return baseTemplate;
};

// Generate custom_links based on file path
function generateCustomLinks(filePath) {
    const relativePath = filePath.replace('site/_docs/', '').replace('.yaml', '').replace(/\\/g, '/');
    const pathParts = relativePath.split('/');
    
    const customLinks = [];
    
    // Add main section link
    if (pathParts.length > 0) {
        const mainSection = pathParts[0];
        const mainSectionName = mainSection.charAt(0).toUpperCase() + mainSection.slice(1).replace(/-/g, ' ');
        
        customLinks.push({
            text: mainSectionName,
            url: `/docs/${mainSection}/`,
            submenu: []
        });
    }
    
    return customLinks;
}

// Fix a single YAML file
function fixYamlFile(filePath) {
    try {
        const yamlContent = fs.readFileSync(filePath, 'utf8');
        const data = yaml.load(yamlContent);
        
        if (!data) {
            console.warn(`⚠️  Warning: Empty YAML file: ${filePath}`);
            return false;
        }

        // Extract title and description
        const title = data.title || 'Untitled Document';
        const description = data.description || 'Documentation for AI Fabrix platform';
        
        // Determine category from file path
        const relativePath = filePath.replace('site/_docs/', '').replace('.yaml', '');
        const pathParts = relativePath.split('/');
        const category = pathParts[0] || 'general';
        
        // Create new structure
        const newData = getYamlTemplate(title, description, category);
        
        // Preserve existing data where possible
        if (data.audience) newData.audience = data.audience;
        if (data.version) newData.version = data.version;
        if (data.owner) newData.owner = data.owner;
        if (data.last_reviewed) newData.last_reviewed = data.last_reviewed;
        if (data.toc !== undefined) newData.toc = data.toc;
        
        // Always generate custom_links from file path
        newData.custom_links = generateCustomLinks(filePath);
        
        // Preserve SEO data if it exists
        if (data.seo) {
            newData.seo = { ...newData.seo, ...data.seo };
        }
        
        // Preserve Document360 data if it exists
        if (data.document360) {
            newData.document360 = { ...newData.document360, ...data.document360 };
        }
        
        // Write the fixed YAML file
        const newYamlContent = yaml.dump(newData, {
            indent: 2,
            lineWidth: -1,
            noRefs: true,
            sortKeys: false
        });
        
        fs.writeFileSync(filePath, newYamlContent);
        return true;
        
    } catch (error) {
        console.error(`❌ Error fixing ${filePath}: ${error.message}`);
        return false;
    }
}

// Scan and fix all YAML files
function fixAllYamlFiles() {
    console.log('🔧 Fixing YAML file structures...');
    
    let fixedCount = 0;
    let errorCount = 0;
    
    function scanDirectory(dir) {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const item of items) {
            const fullPath = path.join(dir, item.name);
            
            if (item.isDirectory()) {
                scanDirectory(fullPath);
            } else if (item.isFile() && item.name.endsWith('.yaml') && item.name !== 'navigation.yaml') {
                console.log(`📝 Processing: ${fullPath}`);
                if (fixYamlFile(fullPath)) {
                    fixedCount++;
                } else {
                    errorCount++;
                }
            }
        }
    }
    
    scanDirectory(DOCS_DIR);
    
    console.log(`\n✅ YAML structure fix completed!`);
    console.log(`📄 Files fixed: ${fixedCount}`);
    console.log(`❌ Files with errors: ${errorCount}`);
}

// Run the script
if (require.main === module) {
    fixAllYamlFiles();
}

module.exports = { fixAllYamlFiles, fixYamlFile, generateCustomLinks };
