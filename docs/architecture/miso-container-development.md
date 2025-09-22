---
layout: doc
title: Miso Container Development Guide
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
      - text: Miso Container Development Guide
        url: /docs/architecture/miso-container-development/
      - text: Portal Architecture
        url: /docs/architecture/portal-architecture/
      - text: Security Authentication
        url: /docs/architecture/security-authentication/
---

# Miso Container Development Guide

## Overview

This guide provides comprehensive information for developers working with the Miso container, including development setup, architecture patterns, coding standards, testing strategies, and deployment workflows.

## Development Environment Setup

### Prerequisites

- **Go 1.21+**: Programming language
- **Docker**: Container runtime
- **Docker Compose**: Local development orchestration
- **PostgreSQL 14+**: Database
- **Redis 6+**: Cache and session store
- **Azure CLI**: Azure integration
- **Git**: Version control

### Local Development Setup

#### 1. Clone Repository

```bash
git clone https://github.com/esystemsdev/aifabrix-miso.git
cd aifabrix-miso
```

#### 2. Environment Configuration

Create `.env` file for local development:

```bash
# Database Configuration
DATABASE_URL=postgresql://miso:miso@localhost:5432/miso_dev
DATABASE_POOL_SIZE=10
DATABASE_TIMEOUT=30s

# Redis Configuration
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=
REDIS_DB=0

# Azure Configuration
AZURE_CLIENT_ID=your-dev-client-id
AZURE_CLIENT_SECRET=your-dev-client-secret
AZURE_TENANT_ID=your-dev-tenant-id
AZURE_SUBSCRIPTION_ID=your-dev-subscription-id

# Key Vault Configuration
KEY_VAULT_URL=https://your-dev-keyvault.vault.azure.net/
KEY_VAULT_CLIENT_ID=your-keyvault-client-id
KEY_VAULT_CLIENT_SECRET=your-keyvault-client-secret

# Application Configuration
APP_NAME=miso-controller
APP_VERSION=1.0.0-dev
ENVIRONMENT=development
LOG_LEVEL=debug
PORT=8080

# Development Features
ENABLE_DEBUG_ENDPOINTS=true
ENABLE_PPROF=true
PPROF_PORT=6060
```

#### 3. Start Development Services

```bash
# Start PostgreSQL and Redis
docker-compose up -d postgres redis

# Run database migrations
go run cmd/migrate/main.go up

# Start the application
go run cmd/server/main.go
```

#### 4. Verify Setup

```bash
# Check health endpoint
curl http://localhost:8080/health

# Check debug endpoints
curl http://localhost:6060/debug/pprof/
```

## Project Structure

```
aifabrix-miso/
├── cmd/                    # Application entry points
│   ├── server/            # Main server application
│   ├── migrate/           # Database migration tool
│   └── cli/               # Command-line interface
├── internal/              # Private application code
│   ├── api/              # API handlers and middleware
│   ├── auth/             # Authentication and authorization
│   ├── config/           # Configuration management
│   ├── database/         # Database layer
│   ├── models/           # Data models
│   ├── services/         # Business logic services
│   └── utils/            # Utility functions
├── pkg/                   # Public library code
│   ├── client/           # Client libraries
│   ├── types/            # Public types
│   └── utils/            # Public utilities
├── api/                   # API specifications
│   ├── openapi/          # OpenAPI specifications
│   └── proto/            # Protocol buffer definitions
├── deployments/           # Deployment configurations
│   ├── docker/           # Docker configurations
│   ├── kubernetes/       # Kubernetes manifests
│   └── helm/             # Helm charts
├── scripts/               # Build and deployment scripts
├── tests/                 # Test files
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
├── docs/                  # Documentation
├── .github/               # GitHub workflows
├── go.mod                 # Go module definition
├── go.sum                 # Go module checksums
├── Dockerfile             # Container image definition
├── docker-compose.yml     # Local development orchestration
└── Makefile               # Build automation
```

## Architecture Patterns

### Clean Architecture

The Miso container follows clean architecture principles:

```mermaid
graph TB
    A[API Layer] --> B[Business Logic Layer]
    B --> C[Data Access Layer]
    C --> D[External Services Layer]
    
    A1[HTTP Handlers] --> A
    A2[Middleware] --> A
    A3[Validation] --> A
    
    B1[Services] --> B
    B2[Use Cases] --> B
    B3[Domain Models] --> B
    
    C1[Repositories] --> C
    C2[Database] --> C
    C3[Cache] --> C
    
    D1[Azure Services] --> D
    D2[External APIs] --> D
    D3[Message Queues] --> D
```

### Dependency Injection

```go
// Example dependency injection
type Container struct {
    config     *config.Config
    db         *database.DB
    redis      *redis.Client
    keyVault   *keyvault.Client
    logger     *logger.Logger
    metrics    *metrics.Metrics
}

func NewContainer(cfg *config.Config) (*Container, error) {
    // Initialize dependencies
    db, err := database.New(cfg.Database)
    if err != nil {
        return nil, err
    }
    
    redis, err := redis.New(cfg.Redis)
    if err != nil {
        return nil, err
    }
    
    keyVault, err := keyvault.New(cfg.KeyVault)
    if err != nil {
        return nil, err
    }
    
    logger := logger.New(cfg.Logging)
    metrics := metrics.New(cfg.Metrics)
    
    return &Container{
        config:    cfg,
        db:        db,
        redis:     redis,
        keyVault:  keyVault,
        logger:    logger,
        metrics:   metrics,
    }, nil
}
```

### Repository Pattern

```go
// Repository interface
type ApplicationRepository interface {
    Create(ctx context.Context, app *models.Application) error
    GetByID(ctx context.Context, id string) (*models.Application, error)
    List(ctx context.Context, filter *models.ApplicationFilter) ([]*models.Application, error)
    Update(ctx context.Context, app *models.Application) error
    Delete(ctx context.Context, id string) error
}

// Repository implementation
type applicationRepository struct {
    db     *database.DB
    logger *logger.Logger
}

func NewApplicationRepository(db *database.DB, logger *logger.Logger) ApplicationRepository {
    return &applicationRepository{
        db:     db,
        logger: logger,
    }
}

func (r *applicationRepository) Create(ctx context.Context, app *models.Application) error {
    query := `
        INSERT INTO applications (id, name, description, status, environment, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `
    
    _, err := r.db.ExecContext(ctx, query, 
        app.ID, app.Name, app.Description, app.Status, 
        app.Environment, app.CreatedAt, app.UpdatedAt)
    
    if err != nil {
        r.logger.Error("Failed to create application", 
            "error", err, "application_id", app.ID)
        return err
    }
    
    return nil
}
```

## Coding Standards

### Go Code Style

#### 1. Package Organization

```go
// Package declaration
package services

// Imports grouped by type
import (
    "context"
    "time"
    
    "github.com/gin-gonic/gin"
    "github.com/go-redis/redis/v8"
    
    "github.com/esystemsdev/aifabrix-miso/internal/models"
    "github.com/esystemsdev/aifabrix-miso/internal/repositories"
)
```

#### 2. Function Naming

```go
// Public functions use PascalCase
func CreateApplication(ctx context.Context, req *CreateApplicationRequest) (*Application, error) {
    // Implementation
}

// Private functions use camelCase
func validateApplicationRequest(req *CreateApplicationRequest) error {
    // Implementation
}
```

#### 3. Error Handling

```go
// Always handle errors explicitly
func (s *ApplicationService) CreateApplication(ctx context.Context, req *CreateApplicationRequest) (*Application, error) {
    // Validate request
    if err := validateApplicationRequest(req); err != nil {
        return nil, fmt.Errorf("validation failed: %w", err)
    }
    
    // Create application model
    app := &models.Application{
        ID:          generateID(),
        Name:        req.Name,
        Description: req.Description,
        Status:      models.StatusActive,
        Environment: req.Environment,
        CreatedAt:   time.Now(),
        UpdatedAt:   time.Now(),
    }
    
    // Save to database
    if err := s.repo.Create(ctx, app); err != nil {
        s.logger.Error("Failed to create application", 
            "error", err, "application_id", app.ID)
        return nil, fmt.Errorf("failed to create application: %w", err)
    }
    
    return app, nil
}
```

#### 4. Context Usage

```go
// Always pass context as first parameter
func (s *ApplicationService) GetApplication(ctx context.Context, id string) (*Application, error) {
    // Check context cancellation
    select {
    case <-ctx.Done():
        return nil, ctx.Err()
    default:
    }
    
    // Use context for database operations
    app, err := s.repo.GetByID(ctx, id)
    if err != nil {
        return nil, err
    }
    
    return app, nil
}
```

### API Design Standards

#### 1. RESTful Endpoints

```go
// RESTful endpoint design
func (h *ApplicationHandler) SetupRoutes(r *gin.RouterGroup) {
    applications := r.Group("/applications")
    {
        applications.GET("", h.ListApplications)           // GET /api/v1/applications
        applications.POST("", h.CreateApplication)        // POST /api/v1/applications
        applications.GET("/:id", h.GetApplication)        // GET /api/v1/applications/:id
        applications.PUT("/:id", h.UpdateApplication)     // PUT /api/v1/applications/:id
        applications.DELETE("/:id", h.DeleteApplication)  // DELETE /api/v1/applications/:id
    }
}
```

#### 2. Request/Response Models

```go
// Request models
type CreateApplicationRequest struct {
    Name        string                 `json:"name" validate:"required,min=1,max=100"`
    Description string                 `json:"description" validate:"max=500"`
    Environment string                 `json:"environment" validate:"required,oneof=development testing production"`
    Configuration *ApplicationConfig   `json:"configuration" validate:"required"`
}

type ApplicationConfig struct {
    Image               string            `json:"image" validate:"required"`
    Replicas           int               `json:"replicas" validate:"min=1,max=10"`
    Resources          *ResourceConfig   `json:"resources" validate:"required"`
    EnvironmentVars    map[string]string `json:"environment_variables"`
}

// Response models
type ApplicationResponse struct {
    ID          string                 `json:"id"`
    Name        string                 `json:"name"`
    Description string                 `json:"description"`
    Status      string                 `json:"status"`
    Environment string                 `json:"environment"`
    CreatedAt   time.Time              `json:"created_at"`
    UpdatedAt   time.Time              `json:"updated_at"`
    Owner       *UserResponse          `json:"owner"`
    Configuration *ApplicationConfig   `json:"configuration"`
}
```

#### 3. Middleware Usage

```go
// Authentication middleware
func AuthMiddleware(authService *auth.Service) gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.JSON(401, gin.H{"error": "Authorization header required"})
            c.Abort()
            return
        }
        
        // Validate token
        user, err := authService.ValidateToken(c.Request.Context(), token)
        if err != nil {
            c.JSON(401, gin.H{"error": "Invalid token"})
            c.Abort()
            return
        }
        
        // Set user in context
        c.Set("user", user)
        c.Next()
    }
}

// Logging middleware
func LoggingMiddleware(logger *logger.Logger) gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()
        
        c.Next()
        
        duration := time.Since(start)
        logger.Info("HTTP request",
            "method", c.Request.Method,
            "path", c.Request.URL.Path,
            "status", c.Writer.Status(),
            "duration", duration,
            "user_id", c.GetString("user_id"),
        )
    }
}
```

## Testing Strategies

### Unit Testing

#### 1. Test Structure

```go
func TestApplicationService_CreateApplication(t *testing.T) {
    // Arrange
    mockRepo := &mocks.ApplicationRepository{}
    mockLogger := &mocks.Logger{}
    service := NewApplicationService(mockRepo, mockLogger)
    
    req := &CreateApplicationRequest{
        Name:        "test-app",
        Description: "Test application",
        Environment: "development",
        Configuration: &ApplicationConfig{
            Image:    "test-app:latest",
            Replicas: 1,
            Resources: &ResourceConfig{
                CPU:    "100m",
                Memory: "128Mi",
            },
        },
    }
    
    // Act
    result, err := service.CreateApplication(context.Background(), req)
    
    // Assert
    assert.NoError(t, err)
    assert.NotNil(t, result)
    assert.Equal(t, "test-app", result.Name)
    assert.Equal(t, "development", result.Environment)
    
    // Verify mock calls
    mockRepo.AssertCalled(t, "Create", mock.Anything, mock.Anything)
}
```

#### 2. Test Coverage

```bash
# Run tests with coverage
go test -coverprofile=coverage.out ./...

# Generate coverage report
go tool cover -html=coverage.out -o coverage.html

# Check coverage percentage
go tool cover -func=coverage.out
```

### Integration Testing

#### 1. Test Database Setup

```go
func TestApplicationRepository_Integration(t *testing.T) {
    // Setup test database
    db := setupTestDB(t)
    defer cleanupTestDB(t, db)
    
    repo := NewApplicationRepository(db, logger.New())
    
    // Test repository methods
    app := &models.Application{
        ID:          "test-app-1",
        Name:        "Test Application",
        Description: "Test Description",
        Status:      models.StatusActive,
        Environment: "testing",
        CreatedAt:   time.Now(),
        UpdatedAt:   time.Now(),
    }
    
    // Test Create
    err := repo.Create(context.Background(), app)
    assert.NoError(t, err)
    
    // Test GetByID
    retrieved, err := repo.GetByID(context.Background(), app.ID)
    assert.NoError(t, err)
    assert.Equal(t, app.Name, retrieved.Name)
}
```

#### 2. Test Containers

```go
func TestWithTestContainers(t *testing.T) {
    // Start PostgreSQL container
    postgresContainer, err := postgres.RunContainer(ctx,
        testcontainers.WithImage("postgres:14"),
        postgres.WithDatabase("testdb"),
        postgres.WithUsername("testuser"),
        postgres.WithPassword("testpass"),
    )
    require.NoError(t, err)
    defer postgresContainer.Terminate(ctx)
    
    // Get connection string
    connStr, err := postgresContainer.ConnectionString(ctx)
    require.NoError(t, err)
    
    // Test with real database
    db, err := database.New(connStr)
    require.NoError(t, err)
    
    // Run tests
    testApplicationRepository(t, db)
}
```

### End-to-End Testing

#### 1. API Testing

```go
func TestApplicationAPI_E2E(t *testing.T) {
    // Start test server
    server := startTestServer(t)
    defer server.Close()
    
    // Test API endpoints
    t.Run("CreateApplication", func(t *testing.T) {
        req := &CreateApplicationRequest{
            Name:        "e2e-test-app",
            Description: "E2E test application",
            Environment: "testing",
            Configuration: &ApplicationConfig{
                Image:    "e2e-test:latest",
                Replicas: 1,
                Resources: &ResourceConfig{
                    CPU:    "100m",
                    Memory: "128Mi",
                },
            },
        }
        
        resp, err := server.Post("/api/v1/applications", req)
        require.NoError(t, err)
        require.Equal(t, 201, resp.StatusCode)
        
        var app ApplicationResponse
        err = json.Unmarshal(resp.Body, &app)
        require.NoError(t, err)
        require.Equal(t, "e2e-test-app", app.Name)
    })
}
```

## Development Workflow

### Git Workflow

#### 1. Feature Branch Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push branch
git push origin feature/new-feature

# Create pull request
gh pr create --title "Add new feature" --body "Description of changes"
```

#### 2. Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build process or auxiliary tool changes

### Code Review Process

#### 1. Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No breaking changes (or properly documented)
- [ ] Security considerations addressed
- [ ] Performance impact assessed

#### 2. Review Guidelines

- Focus on code quality and maintainability
- Check for security vulnerabilities
- Verify test coverage
- Ensure proper error handling
- Validate API design consistency

### Continuous Integration

#### 1. GitHub Actions Workflow

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      
      redis:
        image: redis:6
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Go
      uses: actions/setup-go@v3
      with:
        go-version: 1.21
    
    - name: Install dependencies
      run: go mod download
    
    - name: Run tests
      run: go test -v ./...
    
    - name: Run linting
      run: |
        go vet ./...
        golangci-lint run
    
    - name: Check formatting
      run: gofmt -s -d .
    
    - name: Generate coverage report
      run: go test -coverprofile=coverage.out ./...
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage.out
```

## Performance Optimization

### Profiling

#### 1. CPU Profiling

```go
// Enable CPU profiling
import _ "net/http/pprof"

func main() {
    // Start pprof server
    go func() {
        log.Println(http.ListenAndServe("localhost:6060", nil))
    }()
    
    // Your application code
}
```

#### 2. Memory Profiling

```go
// Memory profiling
import "runtime/pprof"

func profileMemory() {
    f, err := os.Create("mem.prof")
    if err != nil {
        log.Fatal(err)
    }
    defer f.Close()
    
    runtime.GC()
    pprof.WriteHeapProfile(f)
}
```

### Database Optimization

#### 1. Connection Pooling

```go
// Database connection pool configuration
func NewDB(dsn string) (*sql.DB, error) {
    db, err := sql.Open("postgres", dsn)
    if err != nil {
        return nil, err
    }
    
    // Configure connection pool
    db.SetMaxOpenConns(25)
    db.SetMaxIdleConns(5)
    db.SetConnMaxLifetime(5 * time.Minute)
    
    return db, nil
}
```

#### 2. Query Optimization

```go
// Use prepared statements
func (r *applicationRepository) GetByID(ctx context.Context, id string) (*models.Application, error) {
    stmt, err := r.db.PrepareContext(ctx, `
        SELECT id, name, description, status, environment, created_at, updated_at
        FROM applications
        WHERE id = $1
    `)
    if err != nil {
        return nil, err
    }
    defer stmt.Close()
    
    var app models.Application
    err = stmt.QueryRowContext(ctx, id).Scan(
        &app.ID, &app.Name, &app.Description, &app.Status,
        &app.Environment, &app.CreatedAt, &app.UpdatedAt,
    )
    
    if err != nil {
        return nil, err
    }
    
    return &app, nil
}
```

## Security Best Practices

### Input Validation

```go
// Input validation
func validateApplicationRequest(req *CreateApplicationRequest) error {
    if req.Name == "" {
        return errors.New("name is required")
    }
    
    if len(req.Name) > 100 {
        return errors.New("name too long")
    }
    
    if req.Environment != "development" && req.Environment != "testing" && req.Environment != "production" {
        return errors.New("invalid environment")
    }
    
    return nil
}
```

### SQL Injection Prevention

```go
// Use parameterized queries
func (r *applicationRepository) GetByName(ctx context.Context, name string) (*models.Application, error) {
    query := `SELECT id, name, description, status, environment, created_at, updated_at
              FROM applications
              WHERE name = $1`
    
    var app models.Application
    err := r.db.QueryRowContext(ctx, query, name).Scan(
        &app.ID, &app.Name, &app.Description, &app.Status,
        &app.Environment, &app.CreatedAt, &app.UpdatedAt,
    )
    
    if err != nil {
        return nil, err
    }
    
    return &app, nil
}
```

### Secret Management

```go
// Use Azure Key Vault for secrets
func (s *ApplicationService) getSecret(ctx context.Context, secretName string) (string, error) {
    secret, err := s.keyVault.GetSecret(ctx, secretName)
    if err != nil {
        return "", fmt.Errorf("failed to get secret %s: %w", secretName, err)
    }
    
    return *secret.Value, nil
}
```

## Deployment

### Docker Build

```dockerfile
# Multi-stage build
FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o miso-controller cmd/server/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/

COPY --from=builder /app/miso-controller .
COPY --from=builder /app/config ./config

EXPOSE 8080
CMD ["./miso-controller"]
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: miso-controller
spec:
  replicas: 3
  selector:
    matchLabels:
      app: miso-controller
  template:
    metadata:
      labels:
        app: miso-controller
    spec:
      containers:
      - name: miso-controller
        image: your-registry/miso-controller:latest
        ports:
        - containerPort: 8080
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: miso-secrets
              key: database-url
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: miso-secrets
              key: redis-url
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
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

## References

- [Go Documentation](https://golang.org/doc/)
- [Go Best Practices](https://github.com/golang/go/wiki/CodeReviewComments)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Testing in Go](https://golang.org/doc/tutorial/add-a-test)
- [Go Testing Best Practices](https://github.com/golang/go/wiki/TestComments)
