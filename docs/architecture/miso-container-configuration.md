---
layout: doc
title: Miso Container Configuration
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
      - text: Miso Container Configuration
        url: /docs/architecture/miso-container-configuration/
      - text: Portal Architecture
        url: /docs/architecture/portal-architecture/
      - text: Security Authentication
        url: /docs/architecture/security-authentication/
---

# Miso Container Configuration

## Overview

This guide covers comprehensive configuration options for the Miso container, including environment variables, configuration files, security settings, and integration parameters.

## Configuration Methods

### 1. Environment Variables (Primary)

Environment variables are the primary configuration method for the Miso container.

#### Core Configuration

```bash
# Azure Integration
AZURE_CLIENT_ID=your-azure-client-id
AZURE_CLIENT_SECRET=your-azure-client-secret
AZURE_TENANT_ID=your-azure-tenant-id
AZURE_SUBSCRIPTION_ID=your-subscription-id

# Key Vault Configuration
KEY_VAULT_URL=https://your-keyvault.vault.azure.net/
KEY_VAULT_CLIENT_ID=your-keyvault-client-id
KEY_VAULT_CLIENT_SECRET=your-keyvault-client-secret

# Container Registry
ACR_LOGIN_SERVER=your-acr.azurecr.io
ACR_USERNAME=your-acr-username
ACR_PASSWORD=your-acr-password
```

#### Application Settings

```bash
# Application Configuration
APP_NAME=miso-controller
APP_VERSION=1.0.0
ENVIRONMENT=production
LOG_LEVEL=info
PORT=8080

# Database Configuration
DATABASE_URL=postgresql://user:password@host:5432/miso
DATABASE_POOL_SIZE=10
DATABASE_TIMEOUT=30s

# Cache Configuration
REDIS_URL=redis://redis-host:6379
REDIS_PASSWORD=your-redis-password
REDIS_DB=0
```

### 2. Configuration Files

For complex configurations, use YAML or JSON configuration files.

#### YAML Configuration

```yaml
# config/miso-config.yaml
azure:
  client_id: "${AZURE_CLIENT_ID}"
  client_secret: "${AZURE_CLIENT_SECRET}"
  tenant_id: "${AZURE_TENANT_ID}"
  subscription_id: "${AZURE_SUBSCRIPTION_ID}"

key_vault:
  url: "${KEY_VAULT_URL}"
  client_id: "${KEY_VAULT_CLIENT_ID}"
  client_secret: "${KEY_VAULT_CLIENT_SECRET}"

database:
  url: "${DATABASE_URL}"
  pool_size: 10
  timeout: "30s"
  ssl_mode: "require"

cache:
  redis_url: "${REDIS_URL}"
  redis_password: "${REDIS_PASSWORD}"
  redis_db: 0
  ttl: "1h"

security:
  jwt_secret: "${JWT_SECRET}"
  jwt_expiry: "24h"
  cors_origins:
    - "https://yourdomain.com"
    - "https://app.yourdomain.com"

monitoring:
  enable_metrics: true
  metrics_port: 9090
  metrics_path: "/metrics"
  enable_tracing: true
  tracing_endpoint: "https://your-tracing-endpoint.com"

logging:
  level: "info"
  format: "json"
  output: "stdout"
  rotation_size: "100MB"
  retention_days: 30
```

#### JSON Configuration

```json
{
  "azure": {
    "client_id": "${AZURE_CLIENT_ID}",
    "client_secret": "${AZURE_CLIENT_SECRET}",
    "tenant_id": "${AZURE_TENANT_ID}",
    "subscription_id": "${AZURE_SUBSCRIPTION_ID}"
  },
  "key_vault": {
    "url": "${KEY_VAULT_URL}",
    "client_id": "${KEY_VAULT_CLIENT_ID}",
    "client_secret": "${KEY_VAULT_CLIENT_SECRET}"
  },
  "database": {
    "url": "${DATABASE_URL}",
    "pool_size": 10,
    "timeout": "30s",
    "ssl_mode": "require"
  },
  "cache": {
    "redis_url": "${REDIS_URL}",
    "redis_password": "${REDIS_PASSWORD}",
    "redis_db": 0,
    "ttl": "1h"
  },
  "security": {
    "jwt_secret": "${JWT_SECRET}",
    "jwt_expiry": "24h",
    "cors_origins": [
      "https://yourdomain.com",
      "https://app.yourdomain.com"
    ]
  },
  "monitoring": {
    "enable_metrics": true,
    "metrics_port": 9090,
    "metrics_path": "/metrics",
    "enable_tracing": true,
    "tracing_endpoint": "https://your-tracing-endpoint.com"
  },
  "logging": {
    "level": "info",
    "format": "json",
    "output": "stdout",
    "rotation_size": "100MB",
    "retention_days": 30
  }
}
```

## Security Configuration

### Authentication & Authorization

```bash
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRY=24h
JWT_ISSUER=miso-controller
JWT_AUDIENCE=aifabrix-platform

# OIDC Configuration
OIDC_CLIENT_ID=your-oidc-client-id
OIDC_CLIENT_SECRET=your-oidc-client-secret
OIDC_ISSUER=https://your-tenant.b2clogin.com/your-tenant.onmicrosoft.com/v2.0/
OIDC_REDIRECT_URL=https://your-miso-instance.com/auth/callback

# RBAC Configuration
ENABLE_RBAC=true
RBAC_POLICY_FILE=/app/config/rbac-policies.yaml
DEFAULT_ROLE=viewer
ADMIN_ROLE=admin
```

### Network Security

```bash
# CORS Configuration
CORS_ORIGINS=https://yourdomain.com,https://app.yourdomain.com
CORS_METHODS=GET,POST,PUT,DELETE,OPTIONS
CORS_HEADERS=Content-Type,Authorization,X-Requested-With
CORS_CREDENTIALS=true

# Rate Limiting
ENABLE_RATE_LIMITING=true
RATE_LIMIT_REQUESTS_PER_MINUTE=1000
RATE_LIMIT_BURST_SIZE=100
RATE_LIMIT_WINDOW_SIZE=60s

# IP Filtering
ALLOWED_IPS=10.0.0.0/8,172.16.0.0/12,192.168.0.0/16
BLOCKED_IPS=0.0.0.0/0
ENABLE_GEO_BLOCKING=false
BLOCKED_COUNTRIES=CN,RU,IR
```

### SSL/TLS Configuration

```bash
# SSL Configuration
ENABLE_SSL=true
SSL_CERT_PATH=/app/certs/tls.crt
SSL_KEY_PATH=/app/certs/tls.key
SSL_CIPHER_SUITES=TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
SSL_MIN_VERSION=TLS1.2
SSL_MAX_VERSION=TLS1.3

# HSTS Configuration
ENABLE_HSTS=true
HSTS_MAX_AGE=31536000
HSTS_INCLUDE_SUBDOMAINS=true
HSTS_PRELOAD=true
```

## Database Configuration

### PostgreSQL Configuration

```bash
# Database Connection
DATABASE_URL=postgresql://username:password@host:5432/miso
DATABASE_POOL_SIZE=10
DATABASE_MAX_CONNECTIONS=100
DATABASE_TIMEOUT=30s
DATABASE_SSL_MODE=require

# Connection Pool Settings
DATABASE_MIN_IDLE_CONNECTIONS=2
DATABASE_MAX_IDLE_CONNECTIONS=10
DATABASE_CONNECTION_LIFETIME=1h
DATABASE_IDLE_TIMEOUT=30m

# Migration Settings
DATABASE_MIGRATIONS_PATH=/app/migrations
DATABASE_MIGRATIONS_TABLE=schema_migrations
AUTO_MIGRATE=true
```

### Redis Configuration

```bash
# Redis Connection
REDIS_URL=redis://username:password@host:6379
REDIS_PASSWORD=your-redis-password
REDIS_DB=0
REDIS_POOL_SIZE=10
REDIS_TIMEOUT=5s

# Cache Settings
CACHE_DEFAULT_TTL=1h
CACHE_MAX_SIZE=1000
CACHE_CLEANUP_INTERVAL=10m

# Session Store
SESSION_STORE_TYPE=redis
SESSION_TTL=24h
SESSION_CLEANUP_INTERVAL=1h
```

## Monitoring & Observability

### Metrics Configuration

```bash
# Prometheus Metrics
ENABLE_METRICS=true
METRICS_PORT=9090
METRICS_PATH=/metrics
METRICS_INTERVAL=15s

# Custom Metrics
ENABLE_CUSTOM_METRICS=true
METRICS_NAMESPACE=miso_controller
METRICS_SUBSYSTEM=api

# Health Check Metrics
HEALTH_CHECK_INTERVAL=30s
HEALTH_CHECK_TIMEOUT=5s
HEALTH_CHECK_RETRIES=3
```

### Logging Configuration

```bash
# Logging Settings
LOG_LEVEL=info
LOG_FORMAT=json
LOG_OUTPUT=stdout
LOG_TIMESTAMP=true
LOG_CALLER=true

# Log Rotation
LOG_ROTATION_SIZE=100MB
LOG_ROTATION_MAX_FILES=10
LOG_RETENTION_DAYS=30
LOG_COMPRESSION=true

# Structured Logging
LOG_FIELDS=timestamp,level,message,service,version,environment
LOG_SAMPLING_RATE=1.0
LOG_SAMPLING_BURST=100
```

### Tracing Configuration

```bash
# OpenTelemetry Tracing
ENABLE_TRACING=true
TRACING_ENDPOINT=https://your-tracing-endpoint.com
TRACING_SAMPLING_RATE=0.1
TRACING_SAMPLING_BURST=100

# Trace Context
TRACE_CONTEXT_PROPAGATION=true
TRACE_BAGGAGE_ENABLED=true
TRACE_MAX_BAGGAGE_SIZE=8192
```

## Integration Configuration

### Azure Services Integration

```bash
# Azure Resource Manager
AZURE_RESOURCE_GROUP=your-resource-group
AZURE_LOCATION=eastus
AZURE_TAGS=environment=production,service=miso

# Azure Storage
AZURE_STORAGE_ACCOUNT=yourstorageaccount
AZURE_STORAGE_KEY=your-storage-key
AZURE_STORAGE_CONTAINER=miso-data

# Azure Service Bus
AZURE_SERVICE_BUS_CONNECTION_STRING=your-service-bus-connection
AZURE_SERVICE_BUS_QUEUE_NAME=miso-events
AZURE_SERVICE_BUS_TOPIC_NAME=miso-notifications
```

### External API Integration

```bash
# External APIs
EXTERNAL_API_TIMEOUT=30s
EXTERNAL_API_RETRIES=3
EXTERNAL_API_RETRY_DELAY=1s
EXTERNAL_API_RETRY_BACKOFF=2

# Webhook Configuration
WEBHOOK_ENDPOINTS=https://your-webhook.com/events
WEBHOOK_TIMEOUT=10s
WEBHOOK_RETRIES=3
WEBHOOK_SECRET=your-webhook-secret
```

## Performance Configuration

### Resource Limits

```bash
# Memory Configuration
MAX_MEMORY_USAGE=4GB
MEMORY_WARNING_THRESHOLD=80%
MEMORY_CRITICAL_THRESHOLD=95%

# CPU Configuration
MAX_CPU_USAGE=80%
CPU_WARNING_THRESHOLD=70%
CPU_CRITICAL_THRESHOLD=90%

# Garbage Collection
GC_TARGET_PERCENTAGE=80
GC_MAX_PAUSE_TIME=100ms
```

### Caching Configuration

```bash
# Application Cache
CACHE_ENABLED=true
CACHE_SIZE=1000
CACHE_TTL=1h
CACHE_CLEANUP_INTERVAL=10m

# Query Cache
QUERY_CACHE_ENABLED=true
QUERY_CACHE_SIZE=500
QUERY_CACHE_TTL=30m
QUERY_CACHE_MAX_SIZE=10MB
```

## Environment-Specific Configurations

### Development Environment

```bash
# Development Settings
ENVIRONMENT=development
LOG_LEVEL=debug
ENABLE_DEBUG_ENDPOINTS=true
ENABLE_PPROF=true
PPROF_PORT=6060

# Development Database
DATABASE_URL=postgresql://dev:dev@localhost:5432/miso_dev
REDIS_URL=redis://localhost:6379

# Development CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:8080,http://localhost:4200
```

### Testing Environment

```bash
# Testing Settings
ENVIRONMENT=testing
LOG_LEVEL=info
ENABLE_DEBUG_ENDPOINTS=false
ENABLE_METRICS=true

# Testing Database
DATABASE_URL=postgresql://test:test@test-db:5432/miso_test
REDIS_URL=redis://test-redis:6379

# Testing CORS
CORS_ORIGINS=https://test-miso.yourdomain.com
```

### Production Environment

```bash
# Production Settings
ENVIRONMENT=production
LOG_LEVEL=warn
ENABLE_DEBUG_ENDPOINTS=false
ENABLE_METRICS=true
ENABLE_TRACING=true

# Production Database
DATABASE_URL=postgresql://prod:secure-password@prod-db:5432/miso_prod
REDIS_URL=redis://prod-redis:6379

# Production CORS
CORS_ORIGINS=https://miso.yourdomain.com
ENABLE_RATE_LIMITING=true
ENABLE_IP_FILTERING=true
```

## Configuration Validation

### Startup Validation

The Miso container performs comprehensive configuration validation at startup:

```bash
# Required Environment Variables
REQUIRED_ENV_VARS=AZURE_CLIENT_ID,AZURE_CLIENT_SECRET,AZURE_TENANT_ID,KEY_VAULT_URL

# Configuration Validation
VALIDATE_CONFIG=true
CONFIG_VALIDATION_TIMEOUT=30s
CONFIG_VALIDATION_RETRIES=3
```

### Health Check Configuration

```bash
# Health Check Settings
HEALTH_CHECK_ENABLED=true
HEALTH_CHECK_INTERVAL=30s
HEALTH_CHECK_TIMEOUT=5s
HEALTH_CHECK_RETRIES=3

# Health Check Endpoints
HEALTH_CHECK_ENDPOINTS=/health,/ready,/live
HEALTH_CHECK_DEPENDENCIES=database,redis,keyvault
```

## Configuration Management Best Practices

### 1. Secret Management

- **Never store secrets in environment variables** in production
- Use Azure Key Vault for all sensitive configuration
- Rotate secrets regularly
- Use managed identities where possible

### 2. Configuration Versioning

- Version all configuration files
- Use configuration templates for different environments
- Document all configuration changes
- Test configuration changes in non-production first

### 3. Environment Separation

- Use separate configuration for each environment
- Never share secrets between environments
- Use different Azure subscriptions for different environments
- Implement proper access controls

### 4. Monitoring Configuration

- Monitor configuration changes
- Alert on configuration validation failures
- Log configuration loading and validation
- Track configuration drift

## Troubleshooting Configuration Issues

### Common Configuration Problems

#### Missing Environment Variables

```bash
# Check required environment variables
docker exec miso-controller env | grep -E "AZURE_|KEY_VAULT_|DATABASE_"

# Validate configuration
curl -X GET http://localhost:8080/config/validate
```

#### Database Connection Issues

```bash
# Test database connectivity
docker exec miso-controller pg_isready -h $DATABASE_HOST -p 5432

# Check database configuration
curl -X GET http://localhost:8080/health/database
```

#### Key Vault Access Issues

```bash
# Test Key Vault connectivity
docker exec miso-controller curl -H "Authorization: Bearer $ACCESS_TOKEN" \
  https://your-keyvault.vault.azure.net/secrets

# Check Key Vault configuration
curl -X GET http://localhost:8080/health/keyvault
```

## References

- [Azure Key Vault Documentation](https://docs.microsoft.com/en-us/azure/key-vault/)
- [Azure Container Apps Configuration](https://docs.microsoft.com/en-us/azure/container-apps/configuration)
- [Docker Environment Variables](https://docs.docker.com/compose/environment-variables/)
- [Miso Container Deployment](./miso-container-deployment.md)
- [Miso Controller Architecture](./miso-controller.md)
