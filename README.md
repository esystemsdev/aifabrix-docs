# AI Fabrix Documentation

This repository contains the documentation for AI Fabrix, an enterprise AI platform with Azure-native ISO27k compliance. The documentation is automatically synchronized with Document360 for publication.

## 📁 Repository Structure

```yaml
aifabrix-docs/
├── docs/                           # Main documentation content
│   ├── getting-started/            # Getting started guides
│   ├── architecture/               # Architecture documentation
│   ├── security/                   # Security and compliance docs
│   ├── api/                        # API specifications
│   └── ...
├── .github/workflows/              # GitHub Actions workflows
│   └── sync-docs.yml              # Automated sync workflow
├── sync-docs.sh                   # Bash sync script
├── sync-docs.ps1                  # PowerShell sync script
├── env.example                    # Environment configuration template
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites

1. **aifabrix-d360 Package**: Ensure the `aifabrix-d360` package is installed in the parent directory:

   ```bash
   C:\git\esystemsdev\aifabrix-d360\
   ```

2. **Environment Configuration**: Copy the environment template and configure:

   ```bash
   cp env.example .env
   # Edit .env with your Document360 credentials
   ```

3. **Document360 Access**: You need:
   - Document360 API Token
   - Document360 Project ID
   - Appropriate permissions for the project

### Manual Sync

#### Using Bash (Linux/macOS/WSL)

```bash
# Normal sync
./sync-docs.sh

# Dry run (test without changes)
./sync-docs.sh --dry-run

# Verbose output
./sync-docs.sh --verbose

# Skip images
./sync-docs.sh --no-images
```

#### Using PowerShell (Windows)

```powershell
# Normal sync
.\sync-docs.ps1

# Dry run (test without changes)
.\sync-docs.ps1 -DryRun

# Verbose output
.\sync-docs.ps1 -Verbose

# Skip images
.\sync-docs.ps1 -NoImages
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```bash
# Required
DOCUMENT360_API_TOKEN=your_api_token_here
DOCUMENT360_PROJECT_ID=your_project_id_here

# Optional
DOCUMENT360_BASE_URL=https://api.document360.com
SYNC_SOURCE_PATH=./docs
SYNC_BATCH_SIZE=10
SYNC_RETRY_ATTEMPTS=3
SYNC_RETRY_DELAY=1000
LOG_LEVEL=info
LOG_CONSOLE=true
```

### GitHub Secrets

For automated syncing, configure these secrets in your GitHub repository:

- `DOCUMENT360_API_TOKEN`: Your Document360 API token
- `DOCUMENT360_PROJECT_ID`: Your Document360 project ID
- `DOCUMENT360_BASE_URL`: Document360 API base URL (optional)

## 📝 Documentation Structure

### YAML + Markdown Separation

We use a separated approach where:

- **Content**: Stored in `.md` files
- **Metadata**: Stored in corresponding `.yaml` files

Example:

```yaml
docs/
├── getting-started/
│   ├── installation.md          # Content
│   ├── installation.yaml         # Metadata
│   ├── quickstart.md
│   └── quickstart.yaml
```

### YAML Metadata Structure

```yaml
# Document360 Fields
title: "Installation Guide"
meta_title: "AI Fabrix Installation Guide"
description: "Complete guide to installing AI Fabrix platform"
slug: "installation-guide"
status: "published"
tags: ["installation", "getting-started", "setup"]
labels: ["beginner", "essential"]
related_articles: ["quickstart", "configuration"]

# Repository Context
repository:
  name: "aifabrix-docs"
  path: "docs/getting-started/installation.md"
  type: "user-guide"
  audience: ["developer", "architect"]

# Content Management
content:
  source_file: "docs/getting-started/installation.md"
  last_updated: "2024-01-15T10:30:00Z"
  version: "2.1.0"
  owner: "platform-team"
  reviewer: "security-team"

# SEO Configuration
seo:
  keywords: ["AI Fabrix", "installation", "setup", "enterprise AI"]
  canonical_url: "https://docs.aifabrix.com/installation"
  og_image: "images/installation-preview.png"

# Image Mappings
images:
  - local_path: "./images/architecture-diagram.png"
    alt_text: "AI Fabrix Architecture Diagram"
    caption: "High-level architecture overview"
```

## 🤖 Automated Sync

### GitHub Actions Workflow

The repository includes a GitHub Actions workflow that automatically syncs documentation:

- **Triggers**:
  - Push to main/master branch
  - Changes to docs/, *.md, or*.yaml files
  - Manual workflow dispatch
- **Pull Requests**: Runs in dry-run mode for validation
- **Reports**: Generates sync reports and comments on PRs

### Workflow Features

- ✅ **Dry Run for PRs**: Validates changes without syncing
- ✅ **Change Detection**: Only syncs when documentation changes
- ✅ **Error Handling**: Comprehensive error reporting
- ✅ **Artifact Upload**: Sync reports saved as artifacts
- ✅ **PR Comments**: Automatic feedback on pull requests

## 📊 Monitoring and Reports

### Sync Reports

Each sync generates a detailed report including:

- Configuration used
- Files processed
- Success/failure status
- Performance metrics
- Error details (if any)

### Logging

The sync process provides detailed logging:

- **INFO**: General progress information
- **SUCCESS**: Successful operations
- **WARNING**: Non-critical issues
- **ERROR**: Critical failures

## 🔍 Troubleshooting

### Common Issues

1. **Binary Not Found**

   ```yaml
   Error: aifabrix-d360 binary not found
   ```

   - Ensure the `aifabrix-d360` package is installed in the parent directory
   - Check the binary path in the sync script

2. **Authentication Failed**

   ```yaml
   Error: DOCUMENT360_API_TOKEN is required
   ```

   - Verify your `.env` file contains valid credentials
   - Check Document360 API token permissions

3. **Documentation Structure Issues**

   ```yaml
   Warning: No YAML metadata files found
   ```

   - Consider creating `.yaml` files for better metadata management
   - Check file paths and permissions

### Debug Mode

Enable verbose output for detailed debugging:

```bash
./sync-docs.sh --verbose
```

## 🔒 Security

### API Token Security

- Store API tokens in `.env` files (not committed to git)
- Use GitHub Secrets for automated workflows
- Rotate tokens regularly
- Use least-privilege access

### Content Validation

- All content is validated before sync
- YAML metadata is checked for required fields
- File permissions are verified
- External URLs are filtered

## 📚 Documentation Standards

### Writing Guidelines

1. **Clear Structure**: Use consistent headings and organization
2. **Code Examples**: Include working, copy-pastable examples
3. **Validation Steps**: Provide ways to verify success
4. **Troubleshooting**: Include common issues and solutions
5. **Audience Awareness**: Tailor content to the target audience

### Metadata Requirements

- **Title**: Clear, descriptive title
- **Description**: Concise summary (150-160 characters)
- **Tags**: Relevant keywords for searchability
- **Status**: Published or draft
- **Audience**: Target user types

## 🤝 Contributing

### Adding New Documentation

1. Create content in `.md` file
2. Create corresponding `.yaml` metadata file
3. Follow the documentation standards
4. Test locally with dry-run mode
5. Submit pull request

### Updating Existing Documentation

1. Edit the `.md` file
2. Update metadata in `.yaml` file if needed
3. Test changes with dry-run
4. Submit pull request

### Review Process

- All changes trigger automated validation
- PRs run in dry-run mode for safety
- Manual review required for publication
- Sync reports provide detailed feedback

## 📞 Support

For issues with:

- **Documentation Content**: Contact the platform team
- **Sync Process**: Check troubleshooting section
- **API Issues**: Contact Document360 support
- **Technical Problems**: Create an issue in this repository

## 📄 License

This documentation is part of the AI Fabrix project. See the main project repository for license information.
