---
layout: doc
title: Miso Container Troubleshooting
date: 2024-01-15T00:00:00.000Z
toc: true
audience: ["developer", "operations", "support"]
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
      - text: Portal Architecture
        url: /docs/architecture/portal-architecture/
      - text: Security Authentication
        url: /docs/architecture/security-authentication/
---

# Miso Container Troubleshooting

## Overview

This guide provides comprehensive troubleshooting steps for common issues with the Miso container, including deployment problems, configuration issues, performance problems, and integration failures.

## Quick Diagnostics

### Health Check Commands

```bash
# Basic health check
curl -f http://localhost:8080/health

# Detailed health check
curl -f http://localhost:8080/health/detailed

# Readiness check
curl -f http://localhost:8080/ready

# Liveness check
curl -f http://localhost:8080/live
```

### Container Status Check

```bash
# Check container status
docker ps | grep miso

# Check container logs
docker logs miso-controller --tail 100

# Check container resource usage
docker stats miso-controller

# Check container configuration
docker inspect miso-controller
```

## Common Issues and Solutions

### 1. Container Won't Start

#### Symptoms
- Container exits immediately after starting
- Container status shows "Exited" with non-zero exit code
- No logs generated

#### Diagnosis Steps

```bash
# Check container logs
docker logs miso-controller

# Check environment variables
docker exec miso-controller env | grep -E "AZURE_|KEY_VAULT_|DATABASE_"

# Check container configuration
docker inspect miso-controller | jq '.[0].Config.Env'

# Check resource limits
docker inspect miso-controller | jq '.[0].HostConfig.Memory'
```

#### Common Causes and Solutions

**Missing Required Environment Variables**

```bash
# Verify all required environment variables are set
REQUIRED_VARS="AZURE_CLIENT_ID AZURE_CLIENT_SECRET AZURE_TENANT_ID KEY_VAULT_URL"
for var in $REQUIRED_VARS; do
    if [ -z "${!var}" ]; then
        echo "ERROR: $var is not set"
    fi
done
```

**Solution**: Set all required environment variables in your deployment configuration.

**Insufficient Resources**

```bash
# Check available memory
free -h

# Check available disk space
df -h

# Check CPU usage
top
```

**Solution**: Increase resource limits or free up system resources.

**Configuration File Issues**

```bash
# Validate configuration file syntax
docker run --rm -v $(pwd)/config:/app/config miso:latest config-validate

# Check file permissions
ls -la config/
```

**Solution**: Fix configuration file syntax and ensure proper file permissions.

### 2. Authentication Failures

#### Symptoms
- 401 Unauthorized errors
- Authentication timeout errors
- "Invalid credentials" messages in logs

#### Diagnosis Steps

```bash
# Test Azure authentication
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Check Key Vault access
az keyvault secret list --vault-name your-keyvault

# Test OIDC configuration
curl -X POST http://localhost:8080/auth/token \
  -H "Content-Type: application/json" \
  -d '{"client_id":"test","client_secret":"test"}'
```

#### Common Causes and Solutions

**Invalid Azure Credentials**

```bash
# Verify Azure credentials
az account show --subscription $AZURE_SUBSCRIPTION_ID

# Check credential expiration
az ad sp credential list --id $AZURE_CLIENT_ID
```

**Solution**: Update Azure credentials and ensure they have proper permissions.

**Key Vault Access Issues**

```bash
# Check Key Vault permissions
az keyvault show --name your-keyvault --query "properties.accessPolicies"

# Test Key Vault connectivity
curl -H "Authorization: Bearer $ACCESS_TOKEN" \
  https://your-keyvault.vault.azure.net/secrets
```

**Solution**: Grant proper Key Vault permissions to the service principal.

**OIDC Configuration Issues**

```bash
# Validate OIDC issuer
curl -s $OIDC_ISSUER/.well-known/openid_configuration | jq .

# Check OIDC client configuration
curl -X GET http://localhost:8080/config/oidc
```

**Solution**: Verify OIDC issuer URL and client configuration.

### 3. Database Connection Issues

#### Symptoms
- Database connection timeout errors
- "Connection refused" errors
- Database query failures

#### Diagnosis Steps

```bash
# Test database connectivity
docker exec miso-controller pg_isready -h $DATABASE_HOST -p 5432

# Check database configuration
curl -X GET http://localhost:8080/health/database

# Test database connection
docker exec miso-controller psql $DATABASE_URL -c "SELECT 1"
```

#### Common Causes and Solutions

**Database Server Unavailable**

```bash
# Check database server status
docker ps | grep postgres
# or
kubectl get pods | grep postgres
```

**Solution**: Restart database server or check database server logs.

**Network Connectivity Issues**

```bash
# Test network connectivity
docker exec miso-controller ping $DATABASE_HOST

# Check DNS resolution
docker exec miso-controller nslookup $DATABASE_HOST

# Test port connectivity
docker exec miso-controller telnet $DATABASE_HOST 5432
```

**Solution**: Fix network connectivity or DNS resolution issues.

**Authentication Issues**

```bash
# Test database authentication
docker exec miso-controller psql $DATABASE_URL -c "SELECT current_user"
```

**Solution**: Verify database credentials and user permissions.

### 4. Performance Issues

#### Symptoms
- Slow response times
- High memory usage
- High CPU usage
- Timeout errors

#### Diagnosis Steps

```bash
# Check container resource usage
docker stats miso-controller

# Check application metrics
curl http://localhost:9090/metrics

# Check slow queries
docker exec miso-controller psql $DATABASE_URL -c "
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10"
```

#### Common Causes and Solutions

**Memory Leaks**

```bash
# Check memory usage over time
docker exec miso-controller cat /proc/meminfo

# Check garbage collection
curl http://localhost:8080/debug/pprof/heap
```

**Solution**: Restart container or investigate memory leak in application code.

**Database Performance Issues**

```bash
# Check database performance
docker exec miso-controller psql $DATABASE_URL -c "
SELECT * FROM pg_stat_activity 
WHERE state = 'active'"

# Check slow queries
docker exec miso-controller psql $DATABASE_URL -c "
SELECT query, mean_time, calls 
FROM pg_stat_statements 
WHERE mean_time > 1000"
```

**Solution**: Optimize database queries or increase database resources.

**Network Latency**

```bash
# Test network latency
docker exec miso-controller ping -c 10 $DATABASE_HOST

# Check network throughput
docker exec miso-controller iperf3 -c $DATABASE_HOST
```

**Solution**: Optimize network configuration or move resources closer together.

### 5. Integration Failures

#### Symptoms
- External API call failures
- Webhook delivery failures
- Service discovery issues

#### Diagnosis Steps

```bash
# Test external API connectivity
docker exec miso-controller curl -I https://api.external-service.com

# Check service discovery
docker exec miso-controller nslookup external-service

# Test webhook delivery
curl -X POST http://localhost:8080/webhooks/test \
  -H "Content-Type: application/json" \
  -d '{"url":"https://your-webhook.com/test"}'
```

#### Common Causes and Solutions

**External Service Unavailable**

```bash
# Check external service status
curl -I https://api.external-service.com/health

# Test with different endpoints
curl -I https://api.external-service.com/api/v1/status
```

**Solution**: Check external service status or implement retry logic.

**Network Connectivity Issues**

```bash
# Test outbound connectivity
docker exec miso-controller curl -I https://httpbin.org/status/200

# Check firewall rules
iptables -L OUTPUT
```

**Solution**: Fix network connectivity or update firewall rules.

**Authentication Issues with External Services**

```bash
# Test API authentication
curl -H "Authorization: Bearer $API_TOKEN" \
  https://api.external-service.com/v1/test
```

**Solution**: Verify API tokens and authentication configuration.

## Advanced Troubleshooting

### Log Analysis

#### Structured Log Analysis

```bash
# Filter error logs
docker logs miso-controller 2>&1 | grep -i error

# Filter warning logs
docker logs miso-controller 2>&1 | grep -i warning

# Analyze log patterns
docker logs miso-controller 2>&1 | grep -E "(ERROR|WARN|FATAL)" | \
  awk '{print $4}' | sort | uniq -c | sort -nr
```

#### JSON Log Analysis

```bash
# Parse JSON logs
docker logs miso-controller 2>&1 | jq -r '.level + ": " + .message'

# Filter by log level
docker logs miso-controller 2>&1 | jq -r 'select(.level == "ERROR") | .message'

# Analyze error patterns
docker logs miso-controller 2>&1 | jq -r 'select(.level == "ERROR") | .error' | \
  sort | uniq -c | sort -nr
```

### Performance Profiling

#### CPU Profiling

```bash
# Enable CPU profiling
curl http://localhost:6060/debug/pprof/profile?seconds=30 > cpu.prof

# Analyze CPU profile
go tool pprof cpu.prof
```

#### Memory Profiling

```bash
# Enable memory profiling
curl http://localhost:6060/debug/pprof/heap > heap.prof

# Analyze memory profile
go tool pprof heap.prof
```

#### Goroutine Analysis

```bash
# Get goroutine dump
curl http://localhost:6060/debug/pprof/goroutine > goroutine.prof

# Analyze goroutines
go tool pprof goroutine.prof
```

### Network Troubleshooting

#### Network Connectivity Tests

```bash
# Test DNS resolution
docker exec miso-controller nslookup your-service.com

# Test port connectivity
docker exec miso-controller nc -zv your-service.com 443

# Test HTTP connectivity
docker exec miso-controller curl -I https://your-service.com
```

#### Network Performance Analysis

```bash
# Test network latency
docker exec miso-controller ping -c 10 your-service.com

# Test network throughput
docker exec miso-controller iperf3 -c your-service.com

# Monitor network traffic
docker exec miso-controller netstat -i
```

## Monitoring and Alerting

### Health Check Monitoring

```bash
# Set up health check monitoring
while true; do
    if ! curl -f http://localhost:8080/health; then
        echo "Health check failed at $(date)"
        # Send alert
    fi
    sleep 30
done
```

### Metrics Monitoring

```bash
# Monitor key metrics
curl http://localhost:9090/metrics | grep -E "(http_requests_total|memory_usage|cpu_usage)"

# Set up Prometheus alerts
# Example alert rules:
# - alert: HighErrorRate
#   expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
#   for: 5m
#   labels:
#     severity: warning
#   annotations:
#     summary: "High error rate detected"
```

### Log Monitoring

```bash
# Monitor error logs
tail -f /var/log/miso-controller.log | grep -i error

# Set up log-based alerts
# Example: Alert on ERROR level logs
grep -i "ERROR" /var/log/miso-controller.log | \
  while read line; do
    echo "ERROR detected: $line"
    # Send alert
  done
```

## Recovery Procedures

### Container Recovery

```bash
# Restart container
docker restart miso-controller

# Recreate container
docker stop miso-controller
docker rm miso-controller
docker run -d --name miso-controller miso:latest

# Rollback to previous version
docker stop miso-controller
docker run -d --name miso-controller miso:previous-version
```

### Database Recovery

```bash
# Restart database
docker restart postgres

# Restore from backup
docker exec postgres pg_restore -d miso /backup/miso_backup.sql

# Recreate database
docker exec postgres dropdb miso
docker exec postgres createdb miso
docker exec postgres psql miso < /backup/miso_schema.sql
```

### Configuration Recovery

```bash
# Restore configuration from backup
cp /backup/config/miso-config.yaml /app/config/

# Reset to default configuration
docker exec miso-controller cp /app/config/miso-config.default.yaml /app/config/miso-config.yaml

# Restart with new configuration
docker restart miso-controller
```

## Prevention Strategies

### 1. Proactive Monitoring

- Set up comprehensive health checks
- Monitor key performance metrics
- Implement log-based alerting
- Use distributed tracing

### 2. Configuration Management

- Version control all configuration
- Test configuration changes
- Use configuration validation
- Implement configuration drift detection

### 3. Resource Management

- Set appropriate resource limits
- Monitor resource usage
- Implement auto-scaling
- Plan for capacity growth

### 4. Security Hardening

- Regular security updates
- Vulnerability scanning
- Access control reviews
- Security monitoring

## Support Resources

### Documentation

- [Miso Container Deployment](./miso-container-deployment.md)
- [Miso Container Configuration](./miso-container-configuration.md)
- [Miso Controller Architecture](./miso-controller.md)

### Tools

- **Docker**: Container management and debugging
- **Kubernetes**: Container orchestration and monitoring
- **Prometheus**: Metrics collection and alerting
- **Grafana**: Metrics visualization and dashboards
- **ELK Stack**: Log aggregation and analysis

### Community Support

- **GitHub Issues**: Report bugs and request features
- **Documentation**: Comprehensive guides and references
- **Community Forum**: Ask questions and share solutions

## References

- [Docker Troubleshooting Guide](https://docs.docker.com/config/troubleshooting/)
- [Kubernetes Troubleshooting](https://kubernetes.io/docs/tasks/debug-application-cluster/)
- [Prometheus Monitoring](https://prometheus.io/docs/guides/go-application/)
- [PostgreSQL Troubleshooting](https://www.postgresql.org/docs/current/runtime-config-logging.html)
- [Redis Troubleshooting](https://redis.io/docs/manual/admin/)
