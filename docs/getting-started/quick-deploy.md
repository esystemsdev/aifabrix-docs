
# Quick Deploy Guide

## Overview

Deploy your first AI Fabrix application in just 5 minutes! This guide will walk you through deploying Flowise (workflow builder) or OpenWebUI (chat interface) using GitHub Actions.

## What You'll Accomplish

- Deploy Flowise (workflow builder) or OpenWebUI (chat interface)
- Set up CI/CD with GitHub Actions
- Access your application through the AI Fabrix portal
- Understand the basic deployment workflow

## Prerequisites

- GitHub account
- Azure subscription (provided by your organization)
- Basic Git knowledge
- 5 minutes of your time

## Step-by-Step Deployment

### Step 1: Fork the Application Repository

Choose one of these applications to deploy:

**Option A: Deploy Flowise (Workflow Builder)**

```bash
# Fork the Flowise repository
https://github.com/esystemsdev/flowise-template
```

**Option B: Deploy OpenWebUI (Chat Interface)**

```bash
# Fork the OpenWebUI repository
https://github.com/esystemsdev/openwebui-template
```

### Step 2: Configure GitHub Secrets

In your forked repository, go to **Settings > Secrets and variables > Actions** and add:

```bash
# Required secrets (provided by your organization)
APP_CLIENT_ID=your-client-id
APP_TENANT_ID=your-tenant-id
APP_ENVIRONMENT_ID=your-environment-id
APP_SUBSCRIPTION_ID=your-subscription-id
MISO_API_URL=https://your-miso-instance.com
```

### Step 3: Update Application Configuration

Edit `app-schema.json` in your repository:

```json
{
  "key": "my-first-app",
  "displayName": "My First Application",
  "description": "My first AI Fabrix application",
  "type": "webapp",
  "image": "flowiseai/flowise:latest",
  "registryMode": "public",
  "port": 3000,
  "requiresDatabase": true,
  "requiresRedis": false,
  "requiresStorage": true
}
```

### Step 4: Deploy via GitHub Actions

1. **Push your changes** to the `main` branch
2. **Go to Actions tab** in your repository
3. **Watch the deployment** - it will take 3-5 minutes
4. **Get your application URL** from the deployment logs

### Step 5: Access Your Application

1. **Open the AI Fabrix portal** (provided by your organization)
2. **Navigate to Applications** section
3. **Click on your application** to access it
4. **Start using your application!**

## Success

You've successfully deployed your first AI Fabrix application! Here's what happened:

- ✅ **Infrastructure**: Azure resources were automatically provisioned
- ✅ **Application**: Your application was deployed and configured
- ✅ **Access**: You can now access it through the portal
- ✅ **CI/CD**: Future changes will automatically deploy

## Making Changes

To update your application:

1. **Make changes** to your code
2. **Commit and push** to the `main` branch
3. **GitHub Actions** will automatically deploy the changes
4. **Your application** will be updated in minutes

## Application Options

### Flowise (Workflow Builder)

**What is Flowise?**
Flowise is a visual workflow builder that lets you create AI workflows without coding. Perfect for building chatbots, automation workflows, and AI-powered applications.

**Key Features:**

- Visual workflow builder
- Pre-built AI components
- Database integration
- File storage support
- User authentication

**Use Cases:**

- Building chatbots
- Creating automation workflows
- Developing AI-powered applications
- Prototyping AI solutions

### OpenWebUI (Chat Interface)

**What is OpenWebUI?**
OpenWebUI is a modern chat interface for AI models. It provides a clean, intuitive interface for interacting with various AI models and services.

**Key Features:**

- Modern chat interface
- Multiple AI model support
- File upload and processing
- User management
- Custom themes

**Use Cases:**

- AI chat applications
- Customer support bots
- AI-powered assistants
- Model testing and evaluation

## Configuration Options

### Basic Configuration

Both applications use the same basic configuration structure:

```json
{
  "key": "my-flowise-app",
  "displayName": "My Flowise Application",
  "description": "A workflow builder for AI automation",
  "type": "webapp",
  "image": "flowiseai/flowise:latest",
  "registryMode": "public",
  "port": 3000,
  "requiresDatabase": true,
  "requiresRedis": false,
  "requiresStorage": true
}
```

### Environment-Specific Configuration

Configure different settings for dev/test/production environments:

```json
{
  "environments": {
    "dev": {
      "image": "flowiseai/flowise:dev",
      "configuration": [
        {
          "name": "NODE_ENV",
          "value": "development",
          "location": "variable"
        },
        {
          "name": "LOG_LEVEL",
          "value": "debug",
          "location": "variable"
        }
      ]
    },
    "pro": {
      "image": "flowiseai/flowise:latest",
      "configuration": [
        {
          "name": "NODE_ENV",
          "value": "production",
          "location": "variable"
        },
        {
          "name": "LOG_LEVEL",
          "value": "warn",
          "location": "variable"
        }
      ]
    }
  }
}
```

## Troubleshooting

### Common Issues

**Deployment Failed**

- Check GitHub Actions logs for error details
- Verify all secrets are correctly configured
- Ensure your application schema is valid

**Can't Access Application**

- Verify you have the correct permissions
- Check if the application is still deploying
- Contact your administrator for access issues

**Configuration Errors**

- Validate your `app-schema.json` against the schema
- Check that all required fields are present
- Ensure image references are correct

### Getting Support

- **Check logs**: GitHub Actions logs show detailed error information
- **Troubleshooting guide**: [User Guides > Troubleshooting](troubleshooting.md)
- **Contact support**: Reach out to your organization's AI Fabrix administrator

## Best Practices

### Security

- **Use provided secrets**: Only use the secrets provided by your organization
- **Don't share secrets**: Never commit secrets to your repository
- **Follow access policies**: Respect your organization's access control policies

### Development

- **Test locally first**: Test your application locally before deploying
- **Use appropriate environments**: Use dev for testing, production for live use
- **Monitor deployments**: Watch deployment logs for any issues
- **Keep configurations simple**: Start with basic configurations and add complexity gradually

### Operations

- **Monitor application health**: Check application status regularly
- **Update regularly**: Keep your application images up to date
- **Clean up unused resources**: Remove applications you no longer need
- **Document changes**: Keep track of configuration changes

## Next Steps

Now that you've deployed your first application:

1. **[First Application Guide](first-application.md)** - Learn more about application configuration
2. **[Portal Usage Guide](../user-guides/portal-usage.md)** - Navigate the AI Fabrix portal
3. **[Architecture Overview](../architecture/miso-controller.md)** - Understand the system architecture
4. **[Security Authentication](../architecture/security-authentication.md)** - Learn about the security model

## Related Documentation

- [Application Schema](../developer-guides/application-schema.md) - Detailed configuration options
- [GitHub Actions](../developer-guides/github-actions.md) - Advanced CI/CD workflows
- [Troubleshooting](../user-guides/troubleshooting.md) - Common issues and solutions

---

**Congratulations!** You've successfully deployed your first AI Fabrix application. The platform handled all the complex Azure infrastructure setup automatically, letting you focus on your application.
