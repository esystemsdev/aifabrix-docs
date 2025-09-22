# AI Fabrix Documentation

Welcome to the AI Fabrix documentation hub. This repository contains customer-facing documentation for the AI Fabrix platform with automated deployment to GitHub Pages.

## 🚀 Features

- **Jekyll Integration**: Direct integration with Jekyll static site generator
- **GitHub Actions**: Automated deployment on file changes
- **Document360 Sync**: Optional sync to Document360 platform
- **Brand Assets**: eSystems brand integration
- **Single Source**: Edit files in `/docs/` only - no sync needed

## 📁 Directory Structure

```yaml
aifabrix-docs/
├── docs/                          # Documentation files (edit here - single source)
│   ├── getting-started/
│   ├── background/
│   ├── architecture/
│   ├── user-guides/
│   └── api/
├── site/                          # Jekyll site configuration
│   ├── _config.yml                # Jekyll configuration (reads from ../docs)
│   ├── _data/                     # Jekyll data files
│   ├── assets/images/             # Brand assets
│   └── _includes/                 # Jekyll templates
├── temp/                          # Temporary files and migration scripts
├── sync-docs.ps1                  # PowerShell sync script for Document360
├── sync-docs.sh                   # Bash sync script for Document360
└── package.json                   # Node.js dependencies (minimal)
```

## 🛠️ Setup

### 1. Install Dependencies

```bash
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
# Start Jekyll development server (requires Ruby)
cd site && bundle exec jekyll serve --livereload

# Or use GitHub Actions for testing (no local setup needed)
git add . && git commit -m "Test changes" && git push origin main
```

### Build for Production

```bash
# Build Jekyll site (requires Ruby)
cd site && bundle exec jekyll build

# Or use GitHub Actions for automatic deployment
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

- **Edit files in `/docs/`** - This is your only documentation location
- **Jekyll reads directly** from `/docs/` directory
- **No sync needed** - Jekyll handles everything

### 2. Jekyll Configuration

Jekyll is configured to:

- Read documentation from `/docs/` collection
- Generate navigation automatically
- Build static site for GitHub Pages

### 3. GitHub Actions

The system includes automated deployment:

- **Trigger**: Push to `main`/`master` branch
- **Process**:
  1. Build Jekyll site
  2. Deploy to GitHub Pages
- **Path**: `https://esystemsdev.github.io/aifabrix-docs/`

## 📋 File Operations

### Adding New Documentation

1. Add `.md` file to appropriate `docs/` subdirectory
2. Jekyll automatically:
   - Processes the file
   - Updates navigation
   - Includes in site build

### Updating Brand Assets

1. Update files in `site/assets/images/`
2. Changes are immediately available in the site

### Deleting Files

1. Delete file from `docs/` directory
2. Jekyll automatically:
   - Removes from site
   - Updates navigation

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
2. **Navigation not updating**: Check file structure in `/docs/`
3. **Brand assets not showing**: Check `site/assets/images/` directory

### Debug Mode

```bash
# Run Jekyll with verbose output
cd site && bundle exec jekyll serve --verbose
```

## 📚 Documentation Structure

The system expects this structure in `docs/`:

```yaml
docs/
├── getting-started/
│   ├── quick-deploy.md
│   └── installation.md
├── background/
│   ├── platform-overview.md
│   └── architecture-overview.md
├── architecture/
│   ├── miso-controller.md
│   └── portal-architecture.md
├── user-guides/
│   └── portal-usage.md
└── api/
    └── miso-api.md
```

## 🔗 Links

- **Live Site**: <https://esystemsdev.github.io/aifabrix-docs/>
- **GitHub Repository**: <https://github.com/esystemsdev/aifabrix-docs>
- **Jekyll Documentation**: <https://jekyllrb.com/docs/>

---

**Maintained by**: eSystems Nordic Oy  
**Last Updated**: 2024-01-15
