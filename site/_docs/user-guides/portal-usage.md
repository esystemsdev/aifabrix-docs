---
layout: doc
title: "Portal Usage"
date: 2024-01-15
toc: true
---

# Portal Usage Guide

## Overview

The AI Fabrix portal provides a centralized interface for managing your AI applications, environments, and access. This guide will help you navigate the portal effectively and make the most of your AI Fabrix deployment.

## Getting Started

### Accessing the Portal

1. **Open your browser** and navigate to the AI Fabrix portal URL provided by your organization
2. **Sign in** with your Azure AD credentials
3. **Verify your permissions** - you should see applications you have access to

### Portal Interface Overview

The AI Fabrix portal is organized into several main sections:

- **Dashboard** - Overview of your applications and environments
- **Applications** - Manage and access deployed applications
- **Environments** - View and manage dev/test/production environments
- **Settings** - Configure your preferences and access
- **Help** - Documentation and support resources

## Dashboard

### Overview Cards

The dashboard provides quick access to:

- **My Applications** - Applications you have access to
- **Recent Activity** - Recent deployments and changes
- **Environment Status** - Health status of dev/test/production environments
- **Quick Actions** - Common tasks and shortcuts

### Application Status

Each application shows:

- **Status** - Running, Stopped, Deploying, Error
- **Environment** - dev, test, or production
- **Last Updated** - When the application was last deployed
- **Health** - Application health status

## Applications

### Application List

View all applications you have access to:

- **Application Name** - Click to access the application
- **Environment** - dev, test, or production
- **Status** - Current application status
- **Last Updated** - When last deployed
- **Actions** - Quick actions menu

### Application Details

Click on an application to view detailed information:

#### Overview Tab

- **Application Information** - Name, description, type
- **Configuration** - Current configuration settings
- **Environment Variables** - Environment-specific settings
- **Health Status** - Application health and performance

#### Logs Tab

- **Application Logs** - Real-time application logs
- **Deployment Logs** - Deployment history and logs
- **Error Logs** - Error messages and stack traces
- **Log Filtering** - Filter logs by level, time, or content

#### Settings Tab

- **Configuration** - Application configuration settings
- **Environment Variables** - Environment-specific variables
- **Access Control** - User roles and permissions
- **Monitoring** - Health checks and monitoring settings

### Accessing Applications

#### Direct Access

1. **Click on the application name** in the applications list
2. **Click "Open Application"** button
3. **Application opens** in a new tab

#### External Access

1. **Copy the application URL** from the application details
2. **Share the URL** with other users
3. **Users with access** can open the application directly

## Environments

### Environment Overview

View the status of all environments:

- **Development (dev)** - Development environment
- **Test (test)** - Testing environment
- **Production (production)** - Production environment

### Environment Details

Each environment shows:

- **Status** - Environment health status
- **Applications** - Applications deployed in this environment
- **Resources** - Azure resources and their status
- **Access** - Users with access to this environment

### Environment Management

#### Viewing Environment Resources

1. **Click on an environment** to view details
2. **See resource status** - Azure resources and their health
3. **Monitor performance** - Resource usage and performance metrics

#### Managing Environment Access

1. **Go to environment settings**
2. **View user access** - Users with access to this environment
3. **Request access changes** - Contact administrator for access changes

## Settings

### User Preferences

Configure your portal experience:

- **Theme** - Light or dark theme
- **Language** - Portal language preference
- **Notifications** - Email and portal notifications
- **Time Zone** - Display time zone

### Access Management

View and manage your access:

- **My Roles** - Roles assigned to you
- **My Applications** - Applications you have access to
- **My Environments** - Environments you can access
- **Permission Requests** - Request additional permissions

## Monitoring and Logs

### Application Monitoring

Monitor your applications:

- **Health Status** - Real-time application health
- **Performance Metrics** - CPU, memory, and response times
- **Error Rates** - Application errors and exceptions
- **User Activity** - User access and activity logs

### Log Management

View and manage logs:

- **Real-time Logs** - Live application logs
- **Log History** - Historical log data
- **Log Search** - Search logs by content, time, or level
- **Log Export** - Export logs for analysis

### Alerts and Notifications

Configure alerts for:

- **Application Errors** - Get notified of application errors
- **Performance Issues** - Alert on performance degradation
- **Deployment Status** - Notify on deployment success/failure
- **Access Changes** - Alert on permission changes

## Access Control

### Understanding Roles

AI Fabrix uses role-based access control:

- **Admin** - Full access to applications and environments
- **Developer** - Access to development and testing environments
- **User** - Access to specific applications
- **Viewer** - Read-only access to applications and logs

### Requesting Access

To request access to applications or environments:

1. **Go to Settings > Access Management**
2. **Click "Request Access"**
3. **Select application or environment**
4. **Specify required role**
5. **Submit request** - Administrator will review and approve

### Managing Access

If you're an administrator:

1. **Go to Settings > Access Management**
2. **View pending requests**
3. **Approve or deny requests**
4. **Manage user roles and permissions**

## Troubleshooting

### Common Issues

#### Can't Access Portal

- **Check URL** - Ensure you're using the correct portal URL
- **Verify credentials** - Sign in with correct Azure AD account
- **Check permissions** - Ensure you have portal access
- **Contact administrator** - Request access if needed

#### Can't Access Application

- **Check application status** - Ensure application is running
- **Verify permissions** - Ensure you have access to the application
- **Check environment** - Ensure you're accessing the correct environment
- **Review logs** - Check application logs for errors

#### Portal Performance Issues

- **Clear browser cache** - Clear browser cache and cookies
- **Try different browser** - Test with different browser
- **Check network** - Ensure stable internet connection
- **Contact support** - Report performance issues

### Getting Help

#### Self-Service Resources

- **Documentation** - Check this documentation for answers
- **FAQ** - Review frequently asked questions
- **Troubleshooting Guide** - Common issues and solutions

#### Contact Support

- **Portal Help** - Use the help section in the portal
- **Email Support** - Contact support via email
- **Administrator** - Contact your organization's administrator

## Best Practices

### Security

- **Use strong passwords** - Follow your organization's password policy
- **Sign out when done** - Always sign out when finished
- **Report suspicious activity** - Contact administrator immediately
- **Keep access current** - Request access changes as needed

### Performance

- **Monitor resource usage** - Keep an eye on application performance
- **Use appropriate environments** - Use dev for testing, production for live use
- **Clean up unused resources** - Remove applications you no longer need
- **Follow deployment guidelines** - Use proper deployment procedures

### Collaboration

- **Share access appropriately** - Only share with authorized users
- **Document configurations** - Keep track of application settings
- **Coordinate deployments** - Work with team members on changes
- **Report issues promptly** - Help maintain system health

## Related Documentation

- [Quick Deploy Guide](../getting-started/quick-deploy.md) - Deploy your first application
- [First Application Guide](../getting-started/first-application.md) - Detailed application setup
- [Architecture Overview](../architecture/miso-controller.md) - System architecture
- [Security Authentication](../architecture/security-authentication.md) - Security model
