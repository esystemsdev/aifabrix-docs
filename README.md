# AI Fabrix Documentation

Welcome to the AI Fabrix documentation hub. This repository contains customer-facing documentation for the AI Fabrix platform with automated deployment to GitHub Pages.

## 🚀 Features

- **TypeScript Build Pipeline**: Complete CI/CD pipeline with TypeScript scripts
- **Jekyll Integration**: Direct integration with Jekyll static site generator
- **GitHub Actions**: Automated deployment on file changes
- **Document360 Sync**: Separate process for Document360 synchronization
- **Brand Assets**: eSystems brand integration
- **Single Source**: Edit files in `docs/` only - single source of truth
- **Auto Navigation**: Automatic navigation generation from YAML metadata
- **YAML Metadata**: Separated metadata from markdown content
- **Pure Markdown**: Clean markdown files without frontmatter

## 📁 Directory Structure

```yaml
aifabrix-docs/
├── docs/                          # Documentation source files (edit here - single source of truth)
│   ├── getting-started/
│   ├── background/
│   ├── architecture/
│   ├── user-guides/
│   └── api/
├── site/                          # Jekyll site configuration
│   ├── _config.yml                # Jekyll configuration
│   ├── _data/                     # Jekyll data files (navigation, etc.)
│   ├── assets/images/             # Brand assets
│   ├── _includes/                 # Jekyll templates
│   └── _site/                     # Generated HTML files (auto-generated)
├── scripts/                       # TypeScript build scripts
│   ├── build-docs.ts              # Main build orchestrator
│   ├── validate-yaml.ts           # YAML validation
│   ├── generate-navigation.ts     # Navigation generation
│   ├── merge-metadata.ts          # Merge YAML into markdown
│   ├── build-jekyll.ts            # Jekyll build
│   ├── deploy.ts                  # GitHub Pages deployment
│   └── sync-document360.ts        # Document360 sync (separate process)
├── temp/                          # Temporary files and migration scripts
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Node.js dependencies and scripts
```

## 🛠️ Setup

### 1. Install Dependencies

```bash
# Install Node.js dependencies (for navigation scripts)
npm install

# Install Ruby dependencies (for Jekyll)
cd site
bundle install
cd ..
```

### 2. Configure Brand Assets

Copy your eSystems brand assets to `site/assets/images/`:

- Favicons from `02 - Favicon/` folder
- Logos from `01 - Logo/` folder

## 🚀 Usage

### Development Mode

```bash
# Install dependencies
npm install
cd site && bundle install && cd ..

# Start development server (automatically runs build pipeline)
npm run dev

# Or run individual steps
npm run validate          # Validate YAML files
npm run generate-nav      # Generate navigation
npm run merge-metadata    # Merge YAML into markdown
npm run build-jekyll      # Build Jekyll site
```

### Build for Production

```bash
# Complete build pipeline (recommended)
npm run build-docs

# Or run individual steps
npm run validate
npm run generate-nav
npm run merge-metadata
npm run build-jekyll
npm run deploy
```

### Document360 Sync (Separate Process)

```bash
# Sync to Document360 (requires API credentials)
npm run sync-document360

# Or use the PowerShell script (if available)
.\temp\sync-docs.ps1
```

## 📝 How It Works

### 1. Single Source of Truth

- **Edit files in `docs/`** - This is your only documentation location
- **Pure markdown files** - No frontmatter, clean content only
- **Separate YAML metadata** - Each `.md` file has a corresponding `.yaml` file
- **TypeScript build pipeline** - Processes and builds everything automatically

### 2. Build Pipeline

The TypeScript build process:

1. **Validate YAML** - Ensures all metadata files are properly structured
2. **Generate Navigation** - Creates navigation files for each folder
3. **Merge Metadata** - Combines YAML metadata into markdown frontmatter for Jekyll
4. **Build Jekyll** - Generates static site from processed files
5. **Deploy** - Pushes to GitHub Pages

### 3. GitHub Actions

The system includes automated deployment:

- **Trigger**: Push to `main`/`master` branch
- **Process**:
  1. Install Node.js and Ruby dependencies
  2. Run complete TypeScript build pipeline
  3. Build Jekyll site
  4. Deploy to GitHub Pages
- **Path**: `https://docs-dev.aifabrix.ai/`

## 📋 File Operations

### Adding New Documentation

1. Add `.md` file to appropriate `docs/` subdirectory
2. Add corresponding `.yaml` file with metadata
3. Run `npm run build-docs` to process and build

### Updating Brand Assets

1. Update files in `site/assets/images/`
2. Changes are immediately available in the site

### Deleting Files

1. Delete `.md` and `.yaml` files from `docs/` directory
2. Run `npm run build-docs` to update navigation and rebuild

## 🎨 Customization

### Brand Colors

Update `site/assets/scss/base/_variable.scss`:

```scss
$font-color3: #1E3A8A;  /* eSystems Blue */
$bg-color2: #1E3A8A;    /* eSystems Primary Blue */
$hover-color: #1E3A8A;  /* Hover color */
```

### Site Configuration

Update `site/_config.yml`:

```yaml
title: "AI Fabrix Documentation"
description: "AI Fabrix - Enterprise AI platform with Azure-native ISO27k compliance"
url: "https://docs-dev.aifabrix.ai/"
```

## 📊 Repository Status

| Repository | Status | Description |
|------------|--------|-------------|
| **aifabrix-docs** | ✅ Complete | Main documentation hub |
| **aifabrix-miso** | 🔄 Pending | Core platform (~50 files) |
| **aifabrix-core** | 🔄 Pending | Enterprise Flowise (~30 files) |
| **openwebui-template** | 🔄 Pending | UI/UX (~10 files) |
| **flowise-template** | 🔄 Pending | Templates (~5 files) |
| **aifabrix-plugins** | 🔄 Pending | SDK (~5 files) |
| **aifabrix-mori** | 🔒 Internal | Backend services (~20 files) |

## 🐛 Troubleshooting

### Common Issues

1. **TypeScript build fails**: Run `npm install` to ensure dependencies are installed
2. **YAML validation errors**: Check YAML syntax and required fields
3. **Navigation not updating**: Run `npm run generate-nav`
4. **Jekyll build fails**: Run `cd site && bundle install`
5. **Brand assets not showing**: Check `site/assets/images/` directory

### Debug Mode

```bash
# Run individual build steps with verbose output
npm run validate
npm run generate-nav
npm run merge-metadata
npm run build-jekyll

# Run Jekyll with verbose output
cd site && bundle exec jekyll serve --verbose
```

## 📚 Documentation Structure

The system expects this structure in `docs/`:

```yaml
docs/
├── getting-started/
│   ├── quick-deploy.md
│   ├── quick-deploy.yaml
│   ├── installation.md
│   └── installation.yaml
├── background/
│   ├── platform-overview.md
│   ├── platform-overview.yaml
│   ├── architecture-overview.md
│   └── architecture-overview.yaml
├── architecture/
│   ├── miso-controller.md
│   ├── miso-controller.yaml
│   ├── portal-architecture.md
│   └── portal-architecture.yaml
├── user-guides/
│   ├── portal-usage.md
│   └── portal-usage.yaml
└── api/
    ├── miso-api.md
    └── miso-api.yaml
```

### File Requirements

- **Markdown files**: Pure content, no frontmatter
- **YAML files**: Complete metadata for each markdown file
- **Navigation files**: Auto-generated `navigation.yaml` in each folder

## 🤖 Automation Scripts

### TypeScript Build Pipeline

```bash
# Complete build process (recommended)
npm run build-docs

# Individual steps
npm run validate          # Validate YAML files
npm run generate-nav      # Generate navigation files
npm run merge-metadata    # Merge YAML into markdown
npm run build-jekyll      # Build Jekyll site
npm run deploy            # Deploy to GitHub Pages
```

### Document360 Sync (Separate Process)

```bash
# Sync to Document360
npm run sync-document360

# Requires environment variables:
# DOCUMENT360_API_TOKEN
# DOCUMENT360_PROJECT_ID
# DOCUMENT360_BASE_URL (optional)
```

## 🔗 Links

- **Live Site**: <https://docs-dev.aifabrix.ai/>
- **GitHub Repository**: <https://github.com/esystemsdev/aifabrix-docs>
- **Jekyll Documentation**: <https://jekyllrb.com/docs/>

---

**Maintained by**: eSystems Nordic Oy  
**Last Updated**: 2024-01-15
# Trigger deployment
