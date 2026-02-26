#!/usr/bin/env ts-node

/**
 * YAML Validation Script
 * 
 * Validates all .yaml files in the docs directory to ensure they have:
 * - Required fields (title, description, audience, etc.)
 * - Proper structure
 * - Valid values
 * 
 * Usage: npm run validate
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const DOCS_DIR = 'docs';

// Required fields for YAML metadata files
const REQUIRED_FIELDS = [
    'title',
    'description', 
    'audience',
    'version',
    'owner',
    'last_reviewed',
    'layout'
];

// Valid values for specific fields
const VALID_AUDIENCES = ['end-user', 'admin', 'developer', 'architect', 'security', 'executive', 'procurement'];
const VALID_VERSIONS = ['stable', 'beta', 'alpha', 'deprecated'];
const VALID_LAYOUTS = ['doc', 'page', 'default'];

// Document360 Article SEO recommendations (warnings only)
const META_TITLE_MAX_LENGTH = 70;
const META_DESCRIPTION_RECOMMENDED_MAX = 160;

interface YamlMetadata {
    title?: string;
    description?: string;
    meta_title?: string;
    audience?: string[];
    version?: string;
    owner?: string;
    last_reviewed?: string;
    layout?: string;
    [key: string]: any;
}

/**
 * Validates a single YAML file
 */
function validateYamlFile(filePath: string): { valid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = yaml.load(content) as YamlMetadata;
        
        if (!data) {
            errors.push('File is empty or invalid YAML');
            return { valid: false, errors, warnings };
        }
        
        // Check required fields
        for (const field of REQUIRED_FIELDS) {
            if (!data[field]) {
                errors.push(`Missing required field: ${field}`);
            }
        }
        
        // Validate specific fields
        if (data.audience && Array.isArray(data.audience)) {
            for (const audience of data.audience) {
                if (!VALID_AUDIENCES.includes(audience)) {
                    errors.push(`Invalid audience value: ${audience}. Valid values: ${VALID_AUDIENCES.join(', ')}`);
                }
            }
        }
        
        if (data.version && !VALID_VERSIONS.includes(data.version)) {
            errors.push(`Invalid version: ${data.version}. Valid values: ${VALID_VERSIONS.join(', ')}`);
        }
        
        if (data.layout && !VALID_LAYOUTS.includes(data.layout)) {
            errors.push(`Invalid layout: ${data.layout}. Valid values: ${VALID_LAYOUTS.join(', ')}`);
        }
        
        // Validate date format
        if (data.last_reviewed && !/^\d{4}-\d{2}-\d{2}$/.test(data.last_reviewed)) {
            errors.push(`Invalid date format for last_reviewed: ${data.last_reviewed}. Expected YYYY-MM-DD`);
        }

        // Optional SEO warnings (Document360 Article SEO) — do not fail validation
        if (data.description && data.description.length > META_DESCRIPTION_RECOMMENDED_MAX) {
            warnings.push(`SEO: description exceeds ${META_DESCRIPTION_RECOMMENDED_MAX} chars (${data.description.length}); recommended for Meta description`);
        }
        if (data.meta_title && data.meta_title.length > META_TITLE_MAX_LENGTH) {
            warnings.push(`SEO: meta_title exceeds ${META_TITLE_MAX_LENGTH} chars (${data.meta_title.length}); may be truncated in search results`);
        }
        
        return { valid: errors.length === 0, errors, warnings };
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { valid: false, errors: [`YAML parsing error: ${errorMessage}`], warnings: [] };
    }
}

/**
 * Recursively scans directory for YAML files
 */
function scanForYamlFiles(dir: string): string[] {
    const yamlFiles: string[] = [];
    
    function walkDir(currentDir: string) {
        const files = fs.readdirSync(currentDir);
        
        for (const file of files) {
            const filePath = path.join(currentDir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                walkDir(filePath);
            } else if (file.endsWith('.yaml') && file !== 'navigation.yaml') {
                yamlFiles.push(filePath);
            }
        }
    }
    
    walkDir(dir);
    return yamlFiles;
}

/**
 * Main validation function
 */
export async function validateYamlFiles(): Promise<void> {
    console.log(`🔍 Scanning for YAML files in ${DOCS_DIR}...`);
    
    const yamlFiles = scanForYamlFiles(DOCS_DIR);
    console.log(`📄 Found ${yamlFiles.length} YAML files to validate`);
    
    let validCount = 0;
    let errorCount = 0;
    
    for (const filePath of yamlFiles) {
        const result = validateYamlFile(filePath);
        
        if (result.valid) {
            console.log(`✅ ${filePath}`);
            if (result.warnings.length > 0) {
                result.warnings.forEach(w => console.log(`   ⚠ ${w}`));
            }
            validCount++;
        } else {
            console.log(`❌ ${filePath}`);
            result.errors.forEach(error => console.log(`   - ${error}`));
            result.warnings.forEach(w => console.log(`   ⚠ ${w}`));
            errorCount++;
        }
    }
    
    console.log(`\n📊 Validation Summary:`);
    console.log(`   ✅ Valid files: ${validCount}`);
    console.log(`   ❌ Invalid files: ${errorCount}`);
    
    if (errorCount > 0) {
        throw new Error(`Validation failed: ${errorCount} files have errors`);
    }
}

// Run validation if called directly
if (require.main === module) {
    validateYamlFiles().catch(console.error);
}
