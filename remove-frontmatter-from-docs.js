const fs = require('fs');
const path = require('path');

const DOCS_DIR = 'docs';

// Function to remove frontmatter from a markdown file
function removeFrontmatterFromFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check if file has frontmatter
        if (!content.startsWith('---')) {
            console.log(`✅ ${filePath} has no frontmatter`);
            return;
        }
        
        // Find the end of frontmatter (second ---)
        const lines = content.split('\n');
        let frontmatterEnd = -1;
        
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '---') {
                frontmatterEnd = i;
                break;
            }
        }
        
        if (frontmatterEnd === -1) {
            console.log(`⚠️  ${filePath} has malformed frontmatter`);
            return;
        }
        
        // Remove frontmatter (lines 0 to frontmatterEnd inclusive)
        const contentWithoutFrontmatter = lines.slice(frontmatterEnd + 1).join('\n');
        
        // Write back to file
        fs.writeFileSync(filePath, contentWithoutFrontmatter);
        console.log(`✅ Removed frontmatter from ${filePath}`);
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}: ${error.message}`);
    }
}

// Function to process all markdown files
function removeFrontmatterFromAllFiles() {
    console.log('🔧 Removing frontmatter from all markdown files...');
    
    function walkDirectory(dir) {
        const files = fs.readdirSync(dir);
        
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                walkDirectory(filePath);
            } else if (file.endsWith('.md')) {
                removeFrontmatterFromFile(filePath);
            }
        });
    }
    
    walkDirectory(DOCS_DIR);
    console.log('✅ Frontmatter removal completed!');
}

// Run the script
if (require.main === module) {
    removeFrontmatterFromAllFiles();
}

module.exports = { removeFrontmatterFromFile, removeFrontmatterFromAllFiles };
