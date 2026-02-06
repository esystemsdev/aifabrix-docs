# V1 Documentation Structure Backup

**Date**: 2026-02-02  
**Branch**: feature/docs-structure-v2  
**Purpose**: Complete backup of V1 documentation structure before V2 migration

## Contents Backed Up

### 1. Documentation Source Files (`docs/` directory)
All V1 documentation directories and files:
- `core-components/` - Core platform components
- `customer-success/` - Customer success content
- `deployment-operations/` - Deployment and operations
- `enterprise-features/` - Enterprise features
- `evaluation/` - Evaluation guide
- `modules-documentation/` - Modules documentation
- `overview/` - Platform overview
- `resources/` - Support resources
- `roadmap/` - Product roadmap
- `use-cases/` - Use cases
- `index.md` and `index.yaml` - Main index files
- `navigation.yaml` - Main navigation file

**Total**: 104 files

### 2. Site Navigation Configuration
- `site/_data/navigation.yml` → `navigation-site.yml`
  - Contains all V1 navigation paths and structure
  - Used by Jekyll to generate site navigation

### 3. Generated Documentation Files
- `site/_docs/` → `site-docs-v1/`
  - Generated documentation files from build process
  - Contains processed markdown files with merged metadata

**Total Files Backed Up**: 170 files

## V1 Structure Reference

```
docs/
├── overview/
├── evaluation/
├── core-components/
├── enterprise-features/
├── use-cases/
├── deployment-operations/
├── customer-success/
├── roadmap/
├── modules-documentation/
└── resources/
```

## Notes

- All V1 content is preserved in this backup folder
- Navigation configuration is preserved for reference
- Generated files are preserved for comparison
- This backup can be used to restore V1 structure if needed
- V2 migration will replace all V1 content

## Restoration

To restore V1 structure:
1. Copy directories from `docs-backup-v1/` back to `docs/`
2. Restore `navigation-site.yml` to `site/_data/navigation.yml`
3. Restore `site-docs-v1/` to `site/_docs/` if needed
