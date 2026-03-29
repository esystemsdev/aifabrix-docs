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
├── docs/                          # User-facing docs + Jekyll source (single source for the static site)
│   ├── getting-started/
│   ├── background/
│   ├── architecture/
│   ├── user-guides/
│   └── api/
├── api-docs/                      # API reference (Document360 api-docs lane; .md + .yaml like docs/)
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

**Local `aifabrix-d360`:** This repo depends on the sibling package via `file:../aifabrix-d360` in `package.json`. After you change **aifabrix-d360**, run `npm run build` there, then `npm install` in **aifabrix-docs** if the link needs refreshing. Copy `env.example` to `.env` for local and Document360 sync variables (do not commit `.env`).

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
npm run validate          # Validate YAML under docs/ and api-docs/
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

The sync tool (`scripts/sync-document360.ts`) uses **`aifabrix-d360`** with two possible **targets** on one API token:

| Target | Local path | Use | npm script |
|--------|------------|-----|------------|
| `docs` | `./docs` | User documentation project version (e.g. slug `v1`) | `npm run sync-document360` or `npm run sync-document360:docs` |
| `api-docs` | `./api-docs` | API reference project version (e.g. slug `v1-api`) | `npm run sync-document360:api-docs` (sets `SYNC_SOURCE_PATH=./api-docs`) |

Set **project version UUIDs** from Document360 `GET /v2/ProjectVersions` in `.env`: `DOCUMENT360_PROJECT_VERSION_ID_DOCS` and `DOCUMENT360_PROJECT_VERSION_ID_API_DOCS`, or use optional slug vars `DOCUMENT360_VERSION_SLUG_DOCS` / `DOCUMENT360_VERSION_SLUG_API_DOCS` if UUIDs are omitted. SQLite state defaults to **`./data/sync-docs.db`** vs **`./data/sync-api-docs.db`** per target unless **`DATABASE_PATH`** overrides both.

The first **`api-docs`** run creates the category/article tree in that version (parallel to `docs`, not mixed into the user-docs version).

```bash
# User-docs lane (default)
npm run sync-document360

# API-docs lane
npm run sync-document360:api-docs
```

For **reverse sync** or **watch**, use the **same** target, **`SYNC_SOURCE_PATH`**, and database file as forward sync for that lane (e.g. `./docs` for user docs, `./api-docs` for API; see **aifabrix-d360** CLI: `node ../aifabrix-d360/dist/index.js watch docs|api-docs`).

**Smoke test without pushing to Document360:** set `MOCK_MODE=true` and dummy `DOCUMENT360_API_TOKEN` / `DOCUMENT360_PROJECT_ID` per **aifabrix-d360** behavior.

**Document360 Article SEO:** The sync pushes **Meta title** and **Meta description** to Document360 from each article’s YAML. Use the top-level `title` and `description` in section YAML files under **`docs/`** or **`api-docs/`** (e.g. `docs/overview/overview.yaml`). Optional `meta_title` sets the browser/SERP title (recommended 50–60 chars); if omitted, `title` is used. Keep `description` concise (~150–160 chars) for best use as the Meta description. Run the appropriate sync script after content changes.

**Windows:** Inline `SYNC_SOURCE_PATH=...` in npm scripts may not work in `cmd.exe`; set `SYNC_SOURCE_PATH` in `.env` or use a tool such as `cross-env` if you need cross-shell support.

## 📝 How It Works

### 1. Single Source of Truth

- **`docs/`** — Customer-facing guides and site content; powers **Jekyll** and syncs to Document360 **`docs`** by default
- **`api-docs/`** — API reference only; validated with the same YAML rules; syncs to Document360 **`api-docs`** (not part of the Jekyll site in the current pipeline)
- **Pure markdown files** — No frontmatter; each `.md` has a sibling `.yaml` metadata file
- **TypeScript build pipeline** — Validates **`docs/`** and **`api-docs/`** metadata; processes **`docs/`** for the static site

### 2. Build Pipeline

The TypeScript build process:

1. **Validate YAML** - Ensures metadata under **`docs/`** and **`api-docs/`** is properly structured
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
$font-color3: #171b25;  /* eSystems Blue */
$bg-color2: #171b25;    /* eSystems Primary Blue */
$hover-color: #171b25;  /* Hover color */
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
npm run validate          # Validate YAML under docs/ and api-docs/
npm run generate-nav      # Generate navigation files
npm run merge-metadata    # Merge YAML into markdown
npm run build-jekyll      # Build Jekyll site
npm run deploy            # Deploy to GitHub Pages
```

### Document360 Sync (Separate Process)

```bash
npm run sync-document360              # docs target (user documentation version)
npm run sync-document360:api-docs     # api-docs target (API reference version)
```

Requires `.env` (see `env.example`): `DOCUMENT360_API_TOKEN`, `DOCUMENT360_PROJECT_ID`, and version IDs or slugs for each lane you use. Optional: `DOCUMENT360_BASE_URL`, `DATABASE_PATH`, `MOCK_MODE=true` for local smoke tests.

## 🔗 Links

- **Live Site**: <https://docs-dev.aifabrix.ai/>
- **GitHub Repository**: <https://github.com/esystemsdev/aifabrix-docs>
- **Jekyll Documentation**: <https://jekyllrb.com/docs/>

---

**Maintained by**: eSystems Nordic Oy  
**Last Updated**: 2024-01-15
