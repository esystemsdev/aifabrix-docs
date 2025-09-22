---
layout: doc
title: Miso Container API Reference
date: 2024-01-15T00:00:00.000Z
toc: true
audience: ["developer", "architect"]
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
      - text: Miso Container Troubleshooting
        url: /docs/architecture/miso-container-troubleshooting/
      - text: Miso Container Security
        url: /docs/architecture/miso-container-security/
      - text: Miso Container Monitoring & Logging
        url: /docs/architecture/miso-container-monitoring/
      - text: Miso Container API Reference
        url: /docs/architecture/miso-container-api/
      - text: Portal Architecture
        url: /docs/architecture/portal-architecture/
      - text: Security Authentication
        url: /docs/architecture/security-authentication/
---

# Miso Container API Reference

## Overview

The Miso Container API provides comprehensive programmatic access to the AI Fabrix platform, enabling you to manage applications, deployments, environments, and monitoring through RESTful endpoints.

## Base URL

All API endpoints are relative to your Miso instance:

```bash
https://your-miso-instance.com/api
```

## Authentication

### OIDC Authentication

The Miso Container API uses OpenID Connect (OIDC) for secure authentication.

#### Obtain Access Token

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

#### Response

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "api"
}
```

#### Using Access Tokens

Include the access token in the Authorization header for all API requests:

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://your-miso-instance.com/api/v1/applications"
```

### JWT Token Validation

```bash
# Validate JWT token
curl -X POST "https://your-miso-instance.com/auth/validate" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "YOUR_JWT_TOKEN"
  }'
```

## API Endpoints

### Applications API

#### List Applications

```bash
GET /api/v1/applications
```

**Parameters:**

- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 20)
- `status` (optional): Filter by application status
- `environment` (optional): Filter by environment

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://your-miso-instance.com/api/v1/applications?page=1&limit=10&status=active"
```

**Example Response:**

```json
{
  "data": [
    {
      "id": "app-123",
      "name": "my-application",
      "description": "My application description",
      "status": "active",
      "environment": "production",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z",
      "owner": {
        "id": "user-456",
        "name": "John Doe",
        "email": "john.doe@company.com"
      },
      "deployments": {
        "total": 5,
        "latest": {
          "id": "deploy-789",
          "status": "success",
          "created_at": "2024-01-15T10:30:00Z"
        }
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### Get Application

```bash
GET /api/v1/applications/{application_id}
```

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://your-miso-instance.com/api/v1/applications/app-123"
```

**Example Response:**

```json
{
  "id": "app-123",
  "name": "my-application",
  "description": "My application description",
  "status": "active",
  "environment": "production",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z",
  "owner": {
    "id": "user-456",
    "name": "John Doe",
    "email": "john.doe@company.com"
  },
  "configuration": {
    "image": "my-app:latest",
    "replicas": 3,
    "resources": {
      "cpu": "500m",
      "memory": "1Gi"
    },
    "environment_variables": {
      "NODE_ENV": "production",
      "API_URL": "https://api.company.com"
    }
  },
  "deployments": [
    {
      "id": "deploy-789",
      "status": "success",
      "created_at": "2024-01-15T10:30:00Z",
      "image": "my-app:v1.2.3"
    }
  ]
}
```

#### Create Application

```bash
POST /api/v1/applications
```

**Request Body:**

```json
{
  "name": "my-new-application",
  "description": "My new application description",
  "environment": "production",
  "configuration": {
    "image": "my-app:latest",
    "replicas": 3,
    "resources": {
      "cpu": "500m",
      "memory": "1Gi"
    },
    "environment_variables": {
      "NODE_ENV": "production",
      "API_URL": "https://api.company.com"
    }
  }
}
```

**Example Request:**

```bash
curl -X POST "https://your-miso-instance.com/api/v1/applications" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-new-application",
    "description": "My new application description",
    "environment": "production",
    "configuration": {
      "image": "my-app:latest",
      "replicas": 3,
      "resources": {
        "cpu": "500m",
        "memory": "1Gi"
      },
      "environment_variables": {
        "NODE_ENV": "production",
        "API_URL": "https://api.company.com"
      }
    }
  }'
```

**Example Response:**

```json
{
  "id": "app-124",
  "name": "my-new-application",
  "description": "My new application description",
  "status": "creating",
  "environment": "production",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z",
  "owner": {
    "id": "user-456",
    "name": "John Doe",
    "email": "john.doe@company.com"
  }
}
```

#### Update Application

```bash
PUT /api/v1/applications/{application_id}
```

**Request Body:**

```json
{
  "name": "my-updated-application",
  "description": "My updated application description",
  "configuration": {
    "image": "my-app:v1.3.0",
    "replicas": 5,
    "resources": {
      "cpu": "1000m",
      "memory": "2Gi"
    },
    "environment_variables": {
      "NODE_ENV": "production",
      "API_URL": "https://api.company.com",
      "NEW_FEATURE": "enabled"
    }
  }
}
```

#### Delete Application

```bash
DELETE /api/v1/applications/{application_id}
```

**Example Request:**

```bash
curl -X DELETE "https://your-miso-instance.com/api/v1/applications/app-123" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Example Response:**

```json
{
  "message": "Application deleted successfully",
  "id": "app-123"
}
```

### Deployments API

#### List Deployments

```bash
GET /api/v1/applications/{application_id}/deployments
```

**Parameters:**

- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 20)
- `status` (optional): Filter by deployment status

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://your-miso-instance.com/api/v1/applications/app-123/deployments"
```

**Example Response:**

```json
{
  "data": [
    {
      "id": "deploy-789",
      "application_id": "app-123",
      "status": "success",
      "image": "my-app:v1.2.3",
      "created_at": "2024-01-15T10:30:00Z",
      "completed_at": "2024-01-15T10:35:00Z",
      "duration": 300,
      "logs": "https://your-miso-instance.com/api/v1/deployments/deploy-789/logs"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "pages": 1
  }
}
```

#### Create Deployment

```bash
POST /api/v1/applications/{application_id}/deployments
```

**Request Body:**

```json
{
  "image": "my-app:v1.3.0",
  "environment": "production",
  "configuration": {
    "replicas": 3,
    "resources": {
      "cpu": "500m",
      "memory": "1Gi"
    },
    "environment_variables": {
      "NODE_ENV": "production",
      "API_URL": "https://api.company.com"
    }
  }
}
```

#### Get Deployment

```bash
GET /api/v1/deployments/{deployment_id}
```

#### Get Deployment Logs

```bash
GET /api/v1/deployments/{deployment_id}/logs
```

**Parameters:**

- `lines` (optional): Number of log lines to return (default: 100)
- `follow` (optional): Follow logs in real-time (default: false)

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://your-miso-instance.com/api/v1/deployments/deploy-789/logs?lines=50"
```

**Example Response:**

```json
{
  "logs": [
    {
      "timestamp": "2024-01-15T10:30:00Z",
      "level": "info",
      "message": "Starting deployment",
      "source": "miso-controller"
    },
    {
      "timestamp": "2024-01-15T10:30:05Z",
      "level": "info",
      "message": "Pulling image my-app:v1.2.3",
      "source": "docker"
    },
    {
      "timestamp": "2024-01-15T10:30:10Z",
      "level": "info",
      "message": "Image pulled successfully",
      "source": "docker"
    },
    {
      "timestamp": "2024-01-15T10:30:15Z",
      "level": "info",
      "message": "Starting containers",
      "source": "miso-controller"
    },
    {
      "timestamp": "2024-01-15T10:30:20Z",
      "level": "info",
      "message": "Deployment completed successfully",
      "source": "miso-controller"
    }
  ]
}
```

### Environments API

#### List Environments

```bash
GET /api/v1/environments
```

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://your-miso-instance.com/api/v1/environments"
```

**Example Response:**

```json
{
  "data": [
    {
      "id": "env-dev",
      "name": "Development",
      "description": "Development environment",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z",
      "applications": {
        "total": 5,
        "active": 3
      }
    },
    {
      "id": "env-prod",
      "name": "Production",
      "description": "Production environment",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z",
      "applications": {
        "total": 10,
        "active": 8
      }
    }
  ]
}
```

#### Get Environment

```bash
GET /api/v1/environments/{environment_id}
```

### Users API

#### List Users

```bash
GET /api/v1/users
```

**Parameters:**

- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 20)
- `role` (optional): Filter by user role

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://your-miso-instance.com/api/v1/users?role=admin"
```

**Example Response:**

```json
{
  "data": [
    {
      "id": "user-456",
      "name": "John Doe",
      "email": "john.doe@company.com",
      "role": "admin",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z",
      "last_login": "2024-01-15T09:00:00Z",
      "permissions": [
        "miso:read",
        "miso:write",
        "miso:delete",
        "miso:admin"
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "pages": 1
  }
}
```

#### Get User

```bash
GET /api/v1/users/{user_id}
```

#### Update User

```bash
PUT /api/v1/users/{user_id}
```

**Request Body:**

```json
{
  "name": "John Updated Doe",
  "role": "developer",
  "permissions": [
    "miso:read",
    "miso:write"
  ]
}
```

### Monitoring API

#### Get Metrics

```bash
GET /api/v1/metrics
```

**Parameters:**

- `metric` (optional): Specific metric name
- `time_range` (optional): Time range for metrics (default: 1h)
- `aggregation` (optional): Aggregation function (default: avg)

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://your-miso-instance.com/api/v1/metrics?metric=http_requests_total&time_range=24h"
```

**Example Response:**

```json
{
  "metric": "http_requests_total",
  "time_range": "24h",
  "data": [
    {
      "timestamp": "2024-01-15T10:00:00Z",
      "value": 1500,
      "labels": {
        "method": "GET",
        "endpoint": "/api/v1/applications",
        "status": "200"
      }
    },
    {
      "timestamp": "2024-01-15T10:05:00Z",
      "value": 1600,
      "labels": {
        "method": "GET",
        "endpoint": "/api/v1/applications",
        "status": "200"
      }
    }
  ]
}
```

#### Get Health Status

```bash
GET /api/v1/health
```

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://your-miso-instance.com/api/v1/health"
```

**Example Response:**

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "checks": {
    "database": {
      "status": "healthy",
      "response_time": "5ms"
    },
    "redis": {
      "status": "healthy",
      "response_time": "2ms"
    },
    "keyvault": {
      "status": "healthy",
      "response_time": "10ms"
    }
  }
}
```

## Error Handling

### Error Response Format

All API errors follow a consistent format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "name",
        "message": "Name is required"
      }
    ],
    "timestamp": "2024-01-15T10:30:00Z",
    "request_id": "req-123456"
  }
}
```

### HTTP Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict
- `422 Unprocessable Entity`: Validation error
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: Service temporarily unavailable

### Common Error Codes

- `VALIDATION_ERROR`: Request validation failed
- `AUTHENTICATION_ERROR`: Authentication failed
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `RESOURCE_NOT_FOUND`: Resource not found
- `RESOURCE_CONFLICT`: Resource conflict
- `RATE_LIMIT_EXCEEDED`: Rate limit exceeded
- `SERVICE_UNAVAILABLE`: Service unavailable
- `INTERNAL_ERROR`: Internal server error

## Rate Limiting

### Rate Limit Headers

```bash
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642248600
X-RateLimit-Window: 60
```

### Rate Limit Response

When rate limit is exceeded:

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded",
    "details": {
      "limit": 1000,
      "remaining": 0,
      "reset_time": "2024-01-15T11:00:00Z"
    }
  }
}
```

## Pagination

### Pagination Parameters

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

### Pagination Response

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5,
    "has_next": true,
    "has_prev": false
  }
}
```

## Filtering and Sorting

### Filtering

Use query parameters to filter results:

```bash
GET /api/v1/applications?status=active&environment=production
```

### Sorting

Use `sort` parameter for sorting:

```bash
GET /api/v1/applications?sort=created_at:desc
GET /api/v1/applications?sort=name:asc
```

## Webhooks

### Webhook Configuration

```bash
POST /api/v1/webhooks
```

**Request Body:**

```json
{
  "url": "https://your-webhook.com/events",
  "events": ["application.created", "deployment.completed"],
  "secret": "your-webhook-secret"
}
```

### Webhook Payload

```json
{
  "event": "application.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": "app-123",
    "name": "my-application",
    "status": "active"
  }
}
```

## SDK Examples

### Python SDK

```python
from miso_client import MisoClient

# Initialize client
client = MisoClient(
    base_url="https://your-miso-instance.com",
    client_id="your-client-id",
    client_secret="your-client-secret"
)

# List applications
applications = client.applications.list()

# Create application
app = client.applications.create({
    "name": "my-app",
    "environment": "production",
    "configuration": {
        "image": "my-app:latest",
        "replicas": 3
    }
})

# Deploy application
deployment = client.deployments.create(app.id, {
    "image": "my-app:v1.2.3"
})
```

### JavaScript SDK

```javascript
const MisoClient = require('miso-client');

// Initialize client
const client = new MisoClient({
  baseUrl: 'https://your-miso-instance.com',
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret'
});

// List applications
const applications = await client.applications.list();

// Create application
const app = await client.applications.create({
  name: 'my-app',
  environment: 'production',
  configuration: {
    image: 'my-app:latest',
    replicas: 3
  }
});

// Deploy application
const deployment = await client.deployments.create(app.id, {
  image: 'my-app:v1.2.3'
});
```

## References

- [OpenAPI Specification](https://swagger.io/specification/)
- [OIDC Authentication](https://openid.net/connect/)
- [JWT Tokens](https://jwt.io/)
- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [Rate Limiting](https://cloud.google.com/architecture/rate-limiting-strategies-techniques)
