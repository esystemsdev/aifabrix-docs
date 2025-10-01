# Quick Deploy Guide

Get AI Fabrix up and running quickly with this streamlined deployment guide.

## Prerequisites

Before deploying AI Fabrix, ensure you have:

- **Azure Subscription**: Active Azure subscription with appropriate permissions
- **Azure CLI**: Latest version of Azure CLI installed
- **kubectl**: Kubernetes command-line tool
- **Docker**: Docker installed for local development (optional)

## Quick Start

### 1. Azure Setup

```bash
# Login to Azure
az login

# Set your subscription
az account set --subscription "your-subscription-id"

# Create resource group
az group create --name aifabrix-rg --location eastus
```

### 2. Deploy AI Fabrix

```bash
# Clone the repository
git clone https://github.com/aifabrix/aifabrix-platform.git
cd aifabrix-platform

# Deploy using Azure Bicep
az deployment group create \
  --resource-group aifabrix-rg \
  --template-file main.bicep \
  --parameters @parameters.json
```

### 3. Verify Deployment

```bash
# Check deployment status
az deployment group show --resource-group aifabrix-rg --name main

# Get AKS credentials
az aks get-credentials --resource-group aifabrix-rg --name aifabrix-aks

# Verify pods are running
kubectl get pods -n aifabrix
```

## Next Steps

Once deployed, explore:
- [Core Components](../core-components/) for technical details
- [Enterprise Features](../enterprise-features/) for advanced configuration
- [Customer Success](../customer-success/) for best practices


