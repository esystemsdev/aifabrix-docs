
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
