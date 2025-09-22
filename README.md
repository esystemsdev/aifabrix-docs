# AI Fabrix Documentation

Welcome to the AI Fabrix documentation hub. This repository contains customer-facing documentation for the AI Fabrix platform with automated deployment to GitHub Pages.

## 🚀 Features

- **Jekyll Integration**: Direct integration with Jekyll static site generator
- **GitHub Actions**: Automated deployment on file changes
- **Document360 Sync**: Optional sync to Document360 platform
- **Brand Assets**: eSystems brand integration
- **Single Source**: Edit files in `site/_docs/` only - no sync needed
- **Auto Navigation**: Automatic navigation generation from YAML metadata
- **YAML Metadata**: Separated metadata from markdown content

## 📁 Directory Structure

```yaml
aifabrix-docs/
├── docs/                          # Documentation source files (edit here - single source)
│   ├── getting-started/
│   ├── background/
│   ├── architecture/
│   ├── user-guides/
│   └── api/
├── site/                          # Jekyll site configuration
│   ├── _config.yml                # Jekyll configuration
│   ├── _data/                     # Jekyll data files
│   ├── assets/images/             # Brand assets
│   ├── _includes/                 # Jekyll templates
│   └── _site/                     # Generated HTML files (auto-generated)
├── temp/                          # Temporary files and migration scripts
├── generate-navigation.js         # Auto-generate navigation from YAML files
├── fix-yaml-structure.js          # Fix YAML metadata structure
├── sync-docs.ps1                  # PowerShell sync script for Document360
├── sync-docs.sh                   # Bash sync script for Document360
└── package.json                   # Node.js dependencies
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
# Generate navigation and start Jekyll development server
npm run setup-docs
cd site && bundle exec jekyll serve --livereload

# Or use GitHub Actions for testing (no local setup needed)
git add . && git commit -m "Test changes" && git push origin main
```

### Build for Production

```bash
# Generate navigation and build Jekyll site
npm run setup-docs
cd site && bundle exec jekyll build

# Or use GitHub Actions for automatic deployment (includes navigation generation)
git add . && git commit -m "Update documentation" && git push origin main
```

### Document360 Sync

```bash
# PowerShell (Windows)
.\sync-docs.ps1

# Bash (Linux/macOS)
./sync-docs.sh

# With options
.\sync-docs.ps1 -DryRun -Verbose
./sync-docs.sh --dry-run --verbose
```

## 📝 How It Works

### 1. Single Source of Truth

- **Edit files in `site/_docs/`** - This is your only documentation location
- **Jekyll reads directly** from `site/_docs/` directory
- **No sync needed** - Jekyll handles everything
- **YAML metadata** - Each `.md` file has a corresponding `.yaml` file for metadata

### 2. Jekyll Configuration

Jekyll is configured to:

- Read documentation from `site/_docs/` collection
- Use YAML metadata for navigation and SEO
- Build static site for GitHub Pages

### 3. GitHub Actions

The system includes automated deployment:

- **Trigger**: Push to `main`/`master` branch
- **Process**:
  1. Install Node.js dependencies
  2. Generate navigation from YAML files
  3. Build Jekyll site
  4. Deploy to GitHub Pages
- **Path**: `https://esystemsdev.github.io/aifabrix-docs/`

## 📋 File Operations

### Adding New Documentation

1. Add `.md` file to appropriate `site/_docs/` subdirectory
2. Add corresponding `.yaml` file with metadata
3. Run `npm run setup-docs` to:
   - Fix YAML structure
   - Generate navigation
   - Update site

### Updating Brand Assets

1. Update files in `site/assets/images/`
2. Changes are immediately available in the site

### Deleting Files

1. Delete `.md` and `.yaml` files from `site/_docs/` directory
2. Run `npm run setup-docs` to update navigation

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
url: "https://esystemsdev.github.io/aifabrix-docs/"
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

1. **Jekyll build fails**: Run `cd site && bundle install`
2. **Navigation not updating**: Run `npm run setup-docs`
3. **YAML structure issues**: Run `npm run fix-yaml`
4. **Brand assets not showing**: Check `site/assets/images/` directory

### Debug Mode

```bash
# Run Jekyll with verbose output
cd site && bundle exec jekyll serve --verbose
```

## 📚 Documentation Structure

The system expects this structure in `site/_docs/`:

```yaml
site/_docs/
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

## 🤖 Automation Scripts

### Navigation Management

```bash
# Generate navigation from all YAML files
npm run generate-nav

# Fix all YAML files with correct structure
npm run fix-yaml

# Run both scripts (recommended)
npm run setup-docs
```

### Environment Configuration

The navigation generation supports environment variables for different deployment scenarios:

```bash
# Default (GitHub Pages with /aifabrix-docs baseurl)
npm run generate-nav

# Custom domain (e.g., docs.aifabrix.ai)
npm run generate-nav:custom

# Custom baseurl via environment variable
JEKYLL_BASEURL=/custom-path npm run generate-nav

# Custom domain via environment variable
CUSTOM_DOMAIN=https://docs.aifabrix.ai npm run generate-nav
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `JEKYLL_BASEURL` | `/aifabrix-docs` | Base URL path for the site |
| `CUSTOM_DOMAIN` | `https://esystemsdev.github.io` | Custom domain for the site |
| `BASEURL` | `/aifabrix-docs` | Alternative to JEKYLL_BASEURL |
| `JEKYLL_URL` | `https://esystemsdev.github.io` | Alternative to CUSTOM_DOMAIN |

### Available Scripts

| Script | Purpose | When to Use |
|--------|---------|-------------|
| `npm run setup-docs` | Fix YAML + Generate navigation | Before development, after adding files |
| `npm run fix-yaml` | Fix YAML metadata structure | When YAML files have issues |
| `npm run generate-nav` | Generate navigation only | When only navigation needs updating |
| `npm run jekyll-serve` | Start development server | For local testing |
| `npm run jekyll-build` | Build production site | For production builds |

## 🔗 Links

- **Live Site**: <https://esystemsdev.github.io/aifabrix-docs/>
- **GitHub Repository**: <https://github.com/esystemsdev/aifabrix-docs>
- **Jekyll Documentation**: <https://jekyllrb.com/docs/>

---

**Maintained by**: eSystems Nordic Oy  
**Last Updated**: 2024-01-15
# Trigger deployment
