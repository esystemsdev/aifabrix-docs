---
title: Installation Guide
description: Step-by-step guide to install AI Fabrix enterprise AI platform on Azure infrastructure
audience:
  - end-user
  - admin
version: stable
owner: platform-team
last_reviewed: '2024-01-15'
date: '2025-09-24T15:42:29.874Z'
toc: true
custom_links:
  - text: Getting Started
    url: /docs/getting-started/
    submenu:
      - text: Installation Guide
        url: /docs/getting-started/installation/
      - text: Quick Deploy Guide
        url: /docs/getting-started/quick-deploy/
  - text: Platform Overview
    url: /docs/background/
    submenu:
      - text: Architecture Overview
        url: /docs/background/architecture-overview/
      - text: Competitive Advantages
        url: /docs/background/competitive-advantages/
      - text: Compliance Requirements
        url: /docs/background/compliance-requirements/
      - text: Deployment Models
        url: /docs/background/deployment-models/
      - text: Integration Capabilities
        url: /docs/background/integration-capabilities/
      - text: Modules Overview
        url: /docs/background/modules-overview/
      - text: Platform Overview
        url: /docs/background/platform-overview/
      - text: Target Audience
        url: /docs/background/target-audience/
      - text: Technology Stack
        url: /docs/background/technology-stack/
      - text: Use Cases
        url: /docs/background/use-cases/
  - text: Architecture
    url: /docs/architecture/
    submenu:
      - text: Miso Controller Architecture
        url: /docs/architecture/miso-controller/
      - text: Portal Architecture
        url: /docs/architecture/portal-architecture/
      - text: Security Authentication
        url: /docs/architecture/security-authentication/
  - text: User Guides
    url: /docs/user-guides/
    submenu:
      - text: Portal Usage Guide
        url: /docs/user-guides/portal-usage/
  - text: API Reference
    url: /docs/api/
    submenu:
      - text: AI Fabrix Miso API
        url: /docs/api/miso-api/
seo:
  keywords:
    - AI Fabrix
    - installation
    - Azure
    - setup
    - enterprise AI
    - deployment
  canonical_url: https://docs.aifabrix.ai/installation
  og_image: images/installation-preview.png
document360:
  category: Getting Started
  visibility: public
  searchable: true
  featured: true
  order: 1
layout: doc
---


# Installation Guide

This guide provides step-by-step instructions for installing AI Fabrix on your Azure infrastructure.

## Prerequisites

Before installing AI Fabrix, ensure you have:

- Azure subscription with appropriate permissions
- Azure CLI installed and configured
- Docker Desktop (for local development)
- Git installed
- Minimum 8GB RAM and 4 CPU cores

## Installation Methods

### Method 1: Azure Marketplace (Recommended)

1. **Navigate to Azure Marketplace**
   - Go to the Azure Portal
   - Search for "AI Fabrix"
   - Select the official AI Fabrix offering

2. **Configure Installation**
   - Choose your Azure subscription
   - Select resource group
   - Configure instance size (minimum: Standard_D4s_v3)
   - Set admin credentials

3. **Deploy**
   - Review configuration
   - Click "Create" to start deployment
   - Wait for deployment to complete (15-20 minutes)

### Method 2: Manual Installation

1. **Clone Repository**

   ```bash
   git clone https://github.com/esystemsdev/aifabrix-miso.git
   cd aifabrix-miso
   ```

2. **Configure Environment**

   ```bash
   cp .env.example .env
   # Edit .env with your Azure credentials
   ```

3. **Run Installation Script**

   ```bash
   ./scripts/install.sh
   ```

## Post-Installation

### Verify Installation

1. **Check Service Status**

   ```bash
   kubectl get pods -n aifabrix
   ```

2. **Access Web Interface**
   - Open browser to `https://your-domain.com`
   - Login with admin credentials
   - Verify all modules are running

3. **Run Health Check**

   ```bash
   ./scripts/health-check.sh
   ```

## Configuration

### Basic Configuration

1. **Update Admin Password**
   - Access admin panel
   - Navigate to Security settings
   - Change default password

2. **Configure SSL Certificate**
   - Upload your SSL certificate
   - Update domain configuration
   - Restart services

3. **Set Up Monitoring**
   - Configure Azure Monitor
   - Set up alerting rules
   - Enable log collection

## Troubleshooting

### Common Issues

**Issue**: Services not starting

- **Solution**: Check resource limits and Azure quotas
- **Command**: `kubectl describe pods -n aifabrix`

**Issue**: SSL certificate errors

- **Solution**: Verify certificate format and domain match
- **Command**: `openssl x509 -in certificate.crt -text -noout`

**Issue**: Database connection failed

- **Solution**: Check Azure SQL firewall rules
- **Command**: `az sql server firewall-rule list --resource-group <rg> --server <server>`

## Next Steps

After successful installation:

1. [Configure Platform Settings](configuration.md)
2. [Set Up User Access](user-management.md)
3. [Import Sample Data](sample-data.md)
4. [Configure Monitoring](monitoring.md)

## Support

If you encounter issues:

1. Check the [Troubleshooting Guide](../troubleshooting.md)
2. Review [FAQ](../faq.md)
3. Contact support: <support@aifabrix.ai>
4. Create an issue: [GitHub Issues](https://github.com/esystemsdev/aifabrix-miso/issues)
