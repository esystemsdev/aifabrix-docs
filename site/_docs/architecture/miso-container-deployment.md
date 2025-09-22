---
layout: doc
title: Miso Container Deployment
date: 2024-01-15T00:00:00.000Z
toc: true
audience: ["developer", "operations", "architect"]
custom_links:
  - text: Architecture
    url: /docs/architecture/
    submenu:
      - text: Miso Controller
        url: /docs/architecture/miso-controller/
      - text: Miso Container Deployment
        url: /docs/architecture/miso-container-deployment/
      - text: Portal Architecture
        url: /docs/architecture/portal-architecture/
      - text: Security Authentication
        url: /docs/architecture/security-authentication/
---

# Miso Container Deployment

## Overview

The Miso container is the core orchestration component of AI Fabrix, providing enterprise-grade deployment automation, authentication, and governance. This guide covers deploying the Miso container in various environments and configurations.

## Prerequisites

### System Requirements

- **CPU**: Minimum 2 cores, recommended 4+ cores
- **Memory**: Minimum 4GB RAM, recommended 8GB+ RAM
- **Storage**: Minimum 20GB available disk space
- **Network**: Outbound HTTPS access to Azure services

### Azure Prerequisites

- **Azure Subscription**: Active subscription with appropriate permissions
- **Azure Container Registry (ACR)**: For storing Miso container images
- **Azure Key Vault**: For secure configuration management
- **Azure Virtual Network**: For secure networking (production environments)

### Required Permissions

- **Azure RBAC**: Contributor role on target resource groups
- **ACR Access**: Pull permissions for container images
- **Key Vault Access**: Read permissions for secrets and certificates

## Deployment Methods

### 1. Azure Container Apps (Recommended)

Azure Container Apps provides managed container orchestration with built-in scaling and security features.

#### Quick Deploy with Azure CLI

```bash
# Create resource group
az group create --name aifabrix-miso-rg --location eastus

# Create Container Apps environment
az containerapp env create \
  --name aifabrix-miso-env \
  --resource-group aifabrix-miso-rg \
  --location eastus

# Deploy Miso container
az containerapp create \
  --name miso-controller \
  --resource-group aifabrix-miso-rg \
  --environment aifabrix-miso-env \
  --image your-acr.azurecr.io/miso:latest \
  --target-port 8080 \
  --ingress external \
  --env-vars \
    AZURE_CLIENT_ID=your-client-id \
    AZURE_CLIENT_SECRET=your-client-secret \
    AZURE_TENANT_ID=your-tenant-id \
    KEY_VAULT_URL=https://your-keyvault.vault.azure.net/
```

#### Environment Variables

```bash
# Required Configuration
AZURE_CLIENT_ID=your-azure-client-id
AZURE_CLIENT_SECRET=your-azure-client-secret
AZURE_TENANT_ID=your-azure-tenant-id
KEY_VAULT_URL=https://your-keyvault.vault.azure.net/

# Optional Configuration
LOG_LEVEL=info
PORT=8080
ENVIRONMENT=production
ACR_LOGIN_SERVER=your-acr.azurecr.io
```

### 2. Azure Kubernetes Service (AKS)

For enterprise environments requiring advanced orchestration features.

#### Helm Chart Deployment

```bash
# Add AI Fabrix Helm repository
helm repo add aifabrix https://charts.aifabrix.com
helm repo update

# Install Miso controller
helm install miso-controller aifabrix/miso \
  --namespace aifabrix-system \
  --create-namespace \
  --set image.repository=your-acr.azurecr.io/miso \
  --set image.tag=latest \
  --set azure.clientId=your-client-id \
  --set azure.clientSecret=your-client-secret \
  --set azure.tenantId=your-tenant-id \
  --set keyVault.url=https://your-keyvault.vault.azure.net/
```

#### Kubernetes Manifests

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: miso-controller
  namespace: aifabrix-system
spec:
  replicas: 2
  selector:
    matchLabels:
      app: miso-controller
  template:
    metadata:
      labels:
        app: miso-controller
    spec:
      containers:
      - name: miso
        image: your-acr.azurecr.io/miso:latest
        ports:
        - containerPort: 8080
        env:
        - name: AZURE_CLIENT_ID
          valueFrom:
            secretKeyRef:
              name: miso-secrets
              key: client-id
        - name: AZURE_CLIENT_SECRET
          valueFrom:
            secretKeyRef:
              name: miso-secrets
              key: client-secret
        - name: AZURE_TENANT_ID
          valueFrom:
            secretKeyRef:
              name: miso-secrets
              key: tenant-id
        - name: KEY_VAULT_URL
          value: "https://your-keyvault.vault.azure.net/"
        resources:
          requests:
            memory: "2Gi"
            cpu: "500m"
          limits:
            memory: "4Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
```

### 3. Docker Compose (Development)

For local development and testing environments.

```yaml
version: '3.8'
services:
  miso-controller:
    image: your-acr.azurecr.io/miso:latest
    ports:
      - "8080:8080"
    environment:
      - AZURE_CLIENT_ID=${AZURE_CLIENT_ID}
      - AZURE_CLIENT_SECRET=${AZURE_CLIENT_SECRET}
      - AZURE_TENANT_ID=${AZURE_TENANT_ID}
      - KEY_VAULT_URL=${KEY_VAULT_URL}
      - LOG_LEVEL=debug
      - ENVIRONMENT=development
    volumes:
      - ./config:/app/config:ro
      - ./logs:/app/logs
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## Configuration

### Environment-Specific Settings

#### Development Environment

```bash
ENVIRONMENT=development
LOG_LEVEL=debug
ENABLE_DEBUG_ENDPOINTS=true
CORS_ORIGINS=http://localhost:3000,http://localhost:8080
```

#### Testing Environment

```bash
ENVIRONMENT=testing
LOG_LEVEL=info
ENABLE_DEBUG_ENDPOINTS=false
CORS_ORIGINS=https://test-miso.yourdomain.com
```

#### Production Environment

```bash
ENVIRONMENT=production
LOG_LEVEL=warn
ENABLE_DEBUG_ENDPOINTS=false
CORS_ORIGINS=https://miso.yourdomain.com
ENABLE_METRICS=true
ENABLE_TRACING=true
```

### Security Configuration

#### Azure Key Vault Integration

```bash
# Key Vault Configuration
KEY_VAULT_URL=https://your-keyvault.vault.azure.net/
KEY_VAULT_CLIENT_ID=your-keyvault-client-id
KEY_VAULT_CLIENT_SECRET=your-keyvault-client-secret

# Certificate Configuration
SSL_CERT_NAME=miso-ssl-cert
SSL_KEY_NAME=miso-ssl-key
```

#### Network Security

```bash
# Network Configuration
ALLOWED_IPS=10.0.0.0/8,172.16.0.0/12,192.168.0.0/16
BLOCKED_IPS=0.0.0.0/0
ENABLE_RATE_LIMITING=true
RATE_LIMIT_REQUESTS_PER_MINUTE=1000
```

## Health Checks and Monitoring

### Health Check Endpoints

```bash
# Basic health check
curl http://localhost:8080/health

# Detailed health check
curl http://localhost:8080/health/detailed

# Readiness check
curl http://localhost:8080/ready
```

### Monitoring Configuration

```bash
# Metrics Configuration
ENABLE_METRICS=true
METRICS_PORT=9090
METRICS_PATH=/metrics

# Logging Configuration
LOG_FORMAT=json
LOG_OUTPUT=stdout
LOG_ROTATION_SIZE=100MB
LOG_RETENTION_DAYS=30
```

## Troubleshooting

### Common Issues

#### Container Won't Start

```bash
# Check container logs
docker logs miso-controller

# Check environment variables
docker exec miso-controller env | grep AZURE

# Verify Azure connectivity
docker exec miso-controller curl -I https://management.azure.com/
```

#### Authentication Failures

```bash
# Verify Azure credentials
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Check Key Vault access
az keyvault secret list --vault-name your-keyvault
```

#### Network Connectivity Issues

```bash
# Test DNS resolution
docker exec miso-controller nslookup your-keyvault.vault.azure.net

# Test HTTPS connectivity
docker exec miso-controller curl -v https://your-keyvault.vault.azure.net/
```

### Performance Optimization

#### Resource Limits

```yaml
resources:
  requests:
    memory: "2Gi"
    cpu: "500m"
  limits:
    memory: "4Gi"
    cpu: "1000m"
```

#### Scaling Configuration

```bash
# Horizontal scaling
MIN_REPLICAS=2
MAX_REPLICAS=10
TARGET_CPU_UTILIZATION=70
TARGET_MEMORY_UTILIZATION=80
```

## Validation

### Deployment Verification

```bash
# Check container status
docker ps | grep miso

# Verify health endpoints
curl -f http://localhost:8080/health

# Check logs for errors
docker logs miso-controller | grep ERROR

# Verify Azure connectivity
curl -H "Authorization: Bearer $ACCESS_TOKEN" \
  https://management.azure.com/subscriptions/$SUBSCRIPTION_ID/resourceGroups
```

### Integration Testing

```bash
# Test API endpoints
curl -X GET http://localhost:8080/api/v1/applications

# Test authentication flow
curl -X POST http://localhost:8080/auth/token \
  -H "Content-Type: application/json" \
  -d '{"client_id":"test","client_secret":"test"}'
```

## Next Steps

After successful deployment:

1. **Configure Monitoring**: Set up Azure Monitor and Application Insights
2. **Set Up Backup**: Configure automated backups for configuration and state
3. **Security Hardening**: Implement additional security measures
4. **Load Testing**: Validate performance under expected load
5. **Documentation**: Update your organization's deployment documentation

## References

- [Azure Container Apps Documentation](https://docs.microsoft.com/en-us/azure/container-apps/)
- [Azure Kubernetes Service Documentation](https://docs.microsoft.com/en-us/azure/aks/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [AI Fabrix Architecture Overview](../background/architecture-overview.md)
- [Miso Controller Architecture](./miso-controller.md)
