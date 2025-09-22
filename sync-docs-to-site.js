const fs = require('fs');
const path = require('path');

const DOCS_SOURCE = 'docs';
const DOCS_TARGET = 'site/_docs';

// Function to copy directory recursively
function copyDirectory(src, dest) {
    // Create destination directory if it doesn't exist
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const items = fs.readdirSync(src);
    
    items.forEach(item => {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        const stat = fs.statSync(srcPath);
        
        if (stat.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

// Function to sync docs to site
function syncDocsToSite() {
    console.log('🔄 Syncing docs to site directory...');
    
    try {
        // Remove existing _docs directory
        if (fs.existsSync(DOCS_TARGET)) {
            fs.rmSync(DOCS_TARGET, { recursive: true, force: true });
        }
        
        // Copy docs to site/_docs
        copyDirectory(DOCS_SOURCE, DOCS_TARGET);
        
        console.log('✅ Docs synced successfully!');
        console.log(`📁 Source: ${DOCS_SOURCE}`);
        console.log(`📁 Target: ${DOCS_TARGET}`);
        
    } catch (error) {
        console.error('❌ Error syncing docs:', error.message);
        process.exit(1);
    }
}

// Run the sync
if (require.main === module) {
    syncDocsToSite();
}

module.exports = { syncDocsToSite, copyDirectory };
