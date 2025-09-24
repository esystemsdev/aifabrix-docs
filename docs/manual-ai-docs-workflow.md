
# Manual AI Documentation Generation Workflow

## Overview

This workflow describes the manual process for generating customer-facing documentation using AI analysis of internal source repositories. The process ensures quality, consistency, and customer safety while maintaining technical accuracy.

## Prerequisites

- Access to source repositories (aifabrix-miso, esystems-token-service, Flowise, etc.)
- Cursor IDE with AI documentation generation rules
- Understanding of target audience and documentation standards
- Access to Document360 for final synchronization

## Workflow Steps

### Step 1: Change Detection and Analysis

#### 1.1 Monitor Source Repositories

```bash
# Check for recent changes in source repositories
cd ../aifabrix-miso
git log --oneline --since="1 week ago" -- docs/

cd ../esystems-token-service  
git log --oneline --since="1 week ago" -- docs/

cd ../Flowise
git log --oneline --since="1 week ago" -- packages/server/src/aifabrix/docs/
```

#### 1.2 Identify Customer-Facing Changes

- **New Documentation**: Check for new files in customer-facing directories
- **Modified Content**: Review changes to existing customer-facing documentation
- **Architecture Changes**: Look for system design or component updates
- **API Changes**: Identify new endpoints, schema changes, or authentication updates
- **User Guide Updates**: Find changes to user workflows or procedures

#### 1.3 Exclude Internal Content

**Skip these directories:**

- `docs/plans/` - Internal project plans
- `docs/development/` - Internal development specs
- `docs/reports/` - Internal validation reports
- Internal implementation details
- Project management documentation

### Step 2: Source Content Analysis

#### 2.1 Use Repository Analysis Prompt

```yaml
Analyze the following source repository documentation:

Repository: aifabrix-miso
Path: docs/architecture/miso-controller.md
Content: [paste source content]

Instructions:
1. Identify customer-facing information
2. Flag internal content to exclude
3. Extract key information for documentation generation
4. Identify target audience
5. Suggest documentation structure and metadata
```

#### 2.2 Extract Key Information

- **Technical Details**: Architecture, components, integrations
- **User Procedures**: Step-by-step guides, workflows
- **API Information**: Endpoints, authentication, examples
- **Security Details**: Authentication, RBAC, compliance
- **Configuration**: Setup, deployment, configuration

#### 2.3 Determine Target Audience

- **Executive**: High-level overview, business value, strategic information
- **Architect**: System design, technical architecture, integration patterns
- **Developer**: APIs, code examples, technical implementation
- **User**: Step-by-step guides, workflows, troubleshooting
- **Security**: Authentication, compliance, security controls

### Step 3: AI Content Generation

#### 3.1 Select Appropriate Generation Prompt

Choose based on documentation type:

- **Architecture Documentation**: Use architecture documentation prompt
- **User Guides**: Use user guide generation prompt
- **API Documentation**: Use API documentation prompt
- **Security Documentation**: Use security documentation prompt

#### 3.2 Generate Customer-Facing Content

```yaml
Generate customer-facing documentation:

Source Repository: aifabrix-miso
Source File: docs/architecture/miso-controller.md
Target Audience: architect, developer
Documentation Type: architecture

Source Content: [paste analyzed content]

Instructions:
1. Transform to customer-safe language
2. Remove internal references
3. Maintain technical accuracy
4. Create YAML metadata
```

#### 3.3 Create YAML Metadata

Ensure all required fields are present:

```yaml
title: "Clear, descriptive title"
meta_title: "SEO-optimized title"
description: "Brief summary for search"
slug: "url-friendly-slug"
status: "draft"
tags: ["relevant", "keywords"]
labels: ["category", "labels"]
related_articles: ["related-doc-1", "related-doc-2"]

repository:
  name: "aifabrix-docs"
  path: "docs/architecture/miso-controller.md"
  type: "architecture"
  audience: ["architect", "developer"]

content:
  source_file: "docs/architecture/miso-controller.md"
  last_updated: "2024-01-15T10:30:00Z"
  version: "1.0.0"
  owner: "product-team"
  reviewer: "architecture-team"

seo:
  keywords: ["AI Fabrix", "architecture", "miso", "controller"]
  canonical_url: "https://docs.aifabrix.ai/architecture/miso-controller"
  og_image: "images/miso-controller-preview.png"

document360:
  category: "Architecture"
  visibility: "public"
  searchable: true
  featured: true
  order: 10
```

### Step 4: Content Validation

#### 4.1 Use Content Validation Prompt

```yaml
Validate generated documentation:

Generated Content: [paste generated content]
YAML Metadata: [paste YAML metadata]
Source: aifabrix-miso

Validation Checklist:
1. Technical Accuracy
2. Customer Safety
3. Structure and Quality
4. YAML Metadata
5. Consistency
```

#### 4.2 Manual Review Checklist

- [ ] **Technical Accuracy**: Information is correct and up-to-date
- [ ] **Customer Safety**: No internal references or sensitive information
- [ ] **Language Quality**: Clear, actionable, customer-appropriate
- [ ] **Structure**: Follows established documentation patterns
- [ ] **Metadata**: Complete YAML file with all required fields
- [ ] **Consistency**: Terminology matches other documentation
- [ ] **Cross-References**: Proper linking to related documentation

#### 4.3 Common Issues to Check

- **Internal References**: Replace with customer-safe placeholders
- **Missing Context**: Add appropriate background information
- **Inconsistent Terminology**: Use established customer-facing terms
- **Incomplete Examples**: Ensure examples are complete and working
- **Missing Metadata**: Complete all required YAML fields

### Step 5: Documentation Update

#### 5.1 Update Master Documentation

```bash
# Create or update documentation file
cp generated-content.md docs/architecture/miso-controller.md

# Create or update YAML metadata
cp generated-metadata.yaml docs/architecture/miso-controller.yaml
```

#### 5.2 Version Control

```bash
# Commit changes with descriptive message
git add docs/architecture/miso-controller.md docs/architecture/miso-controller.yaml
git commit -m "docs: Update Miso Controller architecture documentation

- Generated from aifabrix-miso source documentation
- Customer-safe content with proper metadata
- Reviewed and validated for accuracy and safety"
```

#### 5.3 Update Documentation Index

Update `docs/repository-documentation-index.yaml` to reflect new or updated documentation.

### Step 6: Quality Assurance

#### 6.1 Use QA Prompt

```yaml
Perform quality assurance review:

Document: docs/architecture/miso-controller.md
Content: [paste final content]
Metadata: [paste final YAML]

QA Checklist:
1. Content Quality
2. Customer Safety
3. Structure and Organization
4. Metadata Completeness
5. Integration
```

#### 6.2 Final Validation

- [ ] **Content Quality**: Clear, actionable, appropriate depth
- [ ] **Customer Safety**: No sensitive information, customer-appropriate examples
- [ ] **Structure**: Logical organization, proper headings, complete cross-references
- [ ] **Metadata**: All required fields, appropriate audience targeting
- [ ] **Integration**: Proper linking, consistent terminology, ready for sync

### Step 7: Document360 Synchronization

#### 7.1 Prepare for Sync

```bash
# Ensure all files are committed
git status

# Run sync script (when ready)
./sync-docs.sh --dry-run  # Test first
./sync-docs.sh            # Actual sync
```

#### 7.2 Monitor Sync Results

- Check sync logs for any errors
- Verify content appears correctly in Document360
- Test search and navigation functionality
- Confirm metadata is properly applied

## Workflow Examples

### Example 1: New Architecture Documentation

```yaml
1. Detect: New file in aifabrix-miso/docs/architecture/security-authentication.md
2. Analyze: Extract security architecture information
3. Generate: Create customer-facing security documentation
4. Validate: Check for customer safety and technical accuracy
5. Update: Add to docs/security/authentication.md
6. Sync: Publish to Document360
```

### Example 2: Updated User Guide

```yaml
1. Detect: Modified aifabrix-miso/docs/user-guides/portal-usage.md
2. Analyze: Identify changes to user workflows
3. Generate: Update customer-facing user guide
4. Validate: Ensure changes are customer-appropriate
5. Update: Replace existing docs/user-guides/portal-usage.md
6. Sync: Update in Document360
```

### Example 3: New API Documentation

```yaml
1. Detect: New API endpoints in esystems-token-service
2. Analyze: Extract API reference information
3. Generate: Create comprehensive API documentation
4. Validate: Check examples and authentication details
5. Update: Add to docs/api/token-service.md
6. Sync: Publish to Document360
```

## Troubleshooting

### Common Issues

- **Internal References**: Use find/replace to remove internal IDs and references
- **Missing Context**: Add appropriate background information for customer understanding
- **Inconsistent Structure**: Follow established documentation patterns
- **Incomplete Metadata**: Ensure all required YAML fields are present

### Validation Failures

- **Technical Inaccuracy**: Review source content and regenerate
- **Customer Safety Issues**: Remove or replace sensitive information
- **Structure Problems**: Follow established documentation patterns
- **Metadata Issues**: Complete missing or incorrect YAML fields

## Future Automation

### Phase 2: Automated CI/CD

- **GitHub Actions**: Automated change detection and generation
- **Approval Workflow**: Structured human validation process
- **Quality Gates**: Automated checks for content quality and safety
- **Document360 Integration**: Seamless synchronization pipeline

### Phase 3: Advanced AI Features

- **Cross-Repository Intelligence**: Merge information from multiple sources
- **Context-Aware Generation**: Understand relationships between documentation
- **Automated Quality Scoring**: AI-powered content quality assessment
- **Predictive Updates**: Anticipate documentation needs based on code changes

## Best Practices

1. **Always validate** generated content for customer safety and technical accuracy
2. **Maintain consistency** in terminology and structure across all documentation
3. **Use established patterns** for documentation structure and metadata
4. **Test examples** to ensure they work as described
5. **Keep source references** in YAML metadata for traceability
6. **Review cross-references** to ensure proper linking between documents
7. **Monitor sync results** to ensure successful publication to Document360

Remember: This is a manual process initially. Focus on quality and consistency. Once stable, we'll automate the workflow with CI/CD integration.