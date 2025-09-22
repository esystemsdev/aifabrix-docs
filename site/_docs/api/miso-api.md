---
layout: doc
title: Miso Api
date: 2024-01-15T00:00:00.000Z
toc: true
custom_links:
  - text: API Documentation
    url: /docs/api/
    submenu:
      - text: Miso API
        url: /docs/api/miso-api/
---

# AI Fabrix Miso API

## Overview

The AI Fabrix Miso API provides programmatic access to the AI Fabrix platform, enabling you to manage applications, deployments, environments, and monitoring through RESTful endpoints. This API is designed for developers who need to integrate AI Fabrix functionality into their workflows.

## Quick Start

### Base URL

All API endpoints are relative to your Miso instance:

```bash
https://your-miso-instance.com/api
```

### Authentication

AI Fabrix uses OpenID Connect (OIDC) for secure authentication. You'll need to obtain an access token before making API calls.

```bash
curl -X POST "https://your-miso-instance.com/auth/token" \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "your-client-id",
    "client_secret": "your-client-secret",
    "grant_type": "client_credentials",
    "scope": "api"
  }'
```

### Using Access Tokens

Include the access token in the Authorization header for all API requests:

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://your-miso-instance.com/api/applications"
```

## API Documentation

### 📋 Complete API Reference

For the complete API documentation with all endpoints, request/response schemas, and examples, see our interactive OpenAPI specification:

**[View OpenAPI Documentation →](https://your-miso-instance.com/api/docs)**

The OpenAPI documentation provides:

- **Interactive API Explorer** - Test endpoints directly in your browser
- **Complete Endpoint Reference** - All available endpoints with parameters
- **Request/Response Schemas** - Detailed data models and examples
- **Authentication Guide** - Step-by-step authentication setup
- **SDK Generation** - Download client libraries for your preferred language

### 🔗 API Endpoints Overview

The Miso API is organized into the following main areas:

#### Applications API

- **List Applications** - Retrieve all applications in your environment
- **Create Application** - Deploy a new application to AI Fabrix
- **Update Application** - Modify application configuration
- **Delete Application** - Remove an application from the platform

#### Deployments API

- **List Deployments** - Get deployment history for an application
- **Deploy Application** - Trigger a new deployment
- **Get Deployment Status** - Monitor deployment progress

#### Environments API

- **List Environments** - Get all available environments (dev, test, prod)
- **Get Environment Details** - Retrieve environment status and resources

#### Monitoring API

- **Application Metrics** - Retrieve performance metrics
- **Application Logs** - Access application logs
- **Health Checks** - Monitor application health status

#### Configuration API

- **Get Configuration** - Retrieve application configuration settings
- **Update Configuration** - Modify application configuration

#### Access Control API

- **User Roles** - Get roles and permissions for the current user
- **Application Access** - Manage application access control

## SDK Integration

### AI Fabrix SDK

The AI Fabrix SDK provides a convenient way to interact with the API:

```javascript
import { AIFabrixClient } from 'aifabrix-miso-sdk';

const client = new AIFabrixClient({
  baseUrl: 'https://your-miso-instance.com',
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret'
});

// List applications
const applications = await client.applications.list();

// Deploy application
const deployment = await client.applications.deploy('my-app', {
  image: 'myapp:latest',
  environment: 'dev'
});
```

### SDK Downloads

Download the SDK for your preferred language from the OpenAPI documentation:

- **JavaScript/TypeScript** - `aifabrix-miso-sdk`
- **Python** - `aifabrix-miso-python`
- **C#** - `aifabrix-miso-dotnet`
- **Java** - `aifabrix-miso-java`

## Common Use Cases

### 1. Deploy a New Application

```bash
# Get access token
TOKEN=$(curl -s -X POST "https://your-miso-instance.com/auth/token" \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "your-client-id",
    "client_secret": "your-client-secret",
    "grant_type": "client_credentials",
    "scope": "api"
  }' | jq -r '.access_token')

# Create application
curl -X POST "https://your-miso-instance.com/api/applications" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "my-app",
    "displayName": "My Application",
    "type": "webapp",
    "image": "myapp:latest",
    "port": 3000
  }'
```

### 2. Monitor Application Health

```bash
# Check application health
curl -H "Authorization: Bearer $TOKEN" \
  "https://your-miso-instance.com/api/applications/my-app/health"
```

### 3. Retrieve Application Logs

```bash
# Get recent logs
curl -H "Authorization: Bearer $TOKEN" \
  "https://your-miso-instance.com/api/applications/my-app/logs?limit=50"
```

## Error Handling

All API errors follow a consistent format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "displayName",
        "message": "Display name is required"
      }
    ],
    "timestamp": "2024-01-01T12:00:00Z",
    "requestId": "req-123456"
  }
}
```

### Common Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `VALIDATION_ERROR` | Request validation failed | 400 |
| `UNAUTHORIZED` | Authentication required | 401 |
| `FORBIDDEN` | Insufficient permissions | 403 |
| `NOT_FOUND` | Resource not found | 404 |
| `CONFLICT` | Resource conflict | 409 |
| `INTERNAL_ERROR` | Server error | 500 |

## Rate Limiting

API requests are rate-limited to ensure fair usage:

- **Standard Rate Limit**: 1000 requests per hour per client
- **Burst Limit**: 100 requests per minute
- **Rate Limit Headers**: Included in all responses

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1640995200
```

## Getting Help

### Documentation Resources

- **[OpenAPI Documentation](https://your-miso-instance.com/api/docs)** - Complete interactive API reference
- **[Authentication Guide](authentication.md)** - Detailed authentication methods
- **[Getting Started Guide](../getting-started/quick-deploy.md)** - Quick deployment tutorial
- **[Portal Usage Guide](../user-guides/portal-usage.md)** - Using the web interface

### Support

- **API Issues**: Check our [troubleshooting guide](../troubleshooting.md)
- **Technical Support**: Contact support through the AI Fabrix portal
- **Feature Requests**: Submit through the AI Fabrix community forum

---

**Ready to get started?** Visit our [OpenAPI Documentation](https://your-miso-instance.com/api/docs) to explore the complete API reference and start building with AI Fabrix.
