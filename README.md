# AI Fabrix Documentation

Welcome to the AI Fabrix documentation hub. This repository contains customer-facing documentation for the AI Fabrix platform.

## 🚀 GitHub Pages Setup

This repository is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` or `master` branch.

### 📋 Prerequisites

1. **GitHub Pages enabled** in repository settings
2. **Actions permissions** enabled for Pages deployment
3. **Source set to GitHub Actions** in Pages settings

### 🔧 Configuration Steps

1. Go to **Settings** → **Pages** in your GitHub repository
2. Under **Source**, select **GitHub Actions**
3. The workflow will automatically deploy when you push changes

### 📁 Documentation Structure

```
docs/
├── index.md                    # Main documentation index
├── background/                 # Platform background information
│   ├── platform-overview.md
│   ├── architecture-overview.md
│   └── ...
├── getting-started/           # Getting started guides
│   ├── installation.md
│   └── quick-deploy.md
├── architecture/              # Architecture documentation
│   ├── miso-controller.md
│   ├── portal-architecture.md
│   └── security-authentication.md
├── user-guides/               # User guides
│   └── portal-usage.md
├── api/                       # API documentation
│   ├── miso-api.md
│   ├── api-overview.md
│   └── authentication.md
└── *.yaml                     # YAML metadata files
```

### 🔄 Workflow

The GitHub Pages workflow (`github-pages.yml`) will:

1. **Validate** documentation structure
2. **Build** a static site with navigation
3. **Deploy** to GitHub Pages automatically

### 📊 Repository Status

| Repository | Status | Description |
|------------|--------|-------------|
| **aifabrix-docs** | ✅ Complete | Main documentation hub |
| **aifabrix-miso** | 🔄 Pending | Core platform (~50 files) |
| **aifabrix-core** | 🔄 Pending | Enterprise Flowise (~30 files) |
| **openwebui-template** | 🔄 Pending | UI/UX (~10 files) |
| **flowise-template** | 🔄 Pending | Templates (~5 files) |
| **aifabrix-plugins** | 🔄 Pending | SDK (~5 files) |
| **aifabrix-mori** | 🔒 Internal | Backend services (~20 files) |

### 🛠️ Development

To add new documentation:

1. Create `.md` files in the appropriate `docs/` subdirectory
2. Create corresponding `.yaml` metadata files
3. Follow the markdown formatting rules (MD040, MD036, MD022, MD031, MD032)
4. Push changes to trigger automatic deployment

### 📝 Document360 Sync

**Note**: Document360 sync workflows have been **disabled** for GitHub Pages deployment. The workflows are available as `.disabled` files if needed later:

- `.github/workflows/sync-docs.yml.disabled`
- `.github/workflows/sync-documentation.yml.disabled`

### 🔗 Links

- **Live Site**: [GitHub Pages URL will appear here after first deployment]
- **Repository**: [GitHub Repository URL]
- **Issues**: [GitHub Issues URL]

---

**Last Updated**: $(date)  
**Repository**: ${{ github.repository }}  
**Commit**: ${{ github.sha }}