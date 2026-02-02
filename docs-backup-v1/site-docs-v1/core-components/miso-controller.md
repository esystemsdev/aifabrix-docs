---
title: Miso Controller
description: Enterprise AI orchestration platform for managing AI workloads and resources
audience:
  - admin
  - developer
  - end-user
version: stable
owner: platform-team
last_reviewed: '2025-01-15'
date: '2025-01-15'
toc: true
custom_links:
  - text: Core Components
    url: /docs/core-components/
    submenu:
      - text: Miso Controller
        url: /docs/core-components/miso-controller/
  - text: Enterprise Features
    url: /docs/enterprise-features/
  - text: Deployment & Operations
    url: /docs/deployment-operations/
seo:
  keywords:
    - AI Fabrix
    - Miso Controller
    - AI orchestration
    - enterprise AI
    - workload management
  canonical_url: https://docs.aifabrix.ai/core-components/miso-controller
  og_image: images/miso-controller.png
document360:
  category: Core Components
  visibility: public
  searchable: true
  featured: true
  order: 1
layout: doc
---

# Miso Controller

The Miso Controller is the core orchestration platform that manages AI workloads, resources, and services across the AI Fabrix ecosystem.

## Overview

Miso Controller serves as the central nervous system for AI Fabrix, providing:

- **Workload Orchestration**: Manages AI model deployment and execution
- **Resource Management**: Allocates and monitors compute resources
- **Service Discovery**: Enables communication between platform components
- **Security Controls**: Implements enterprise-grade security policies

## Key Features

### Enterprise AI Orchestration

- **Multi-Model Support**: Deploy and manage various AI models
- **Auto-Scaling**: Automatically adjust resources based on demand
- **Load Balancing**: Distribute workloads across available resources
- **Health Monitoring**: Continuous monitoring of AI services

### Security & Compliance

- **Access Control**: Role-based access to AI resources
- **Audit Logging**: Comprehensive logging for compliance
- **Data Protection**: Secure handling of sensitive data
- **Compliance Framework**: Built-in ISO27001 compliance controls

## Architecture

Miso Controller is built on:

- **Azure Kubernetes Service (AKS)**: Container orchestration
- **Azure Container Registry**: Secure container storage
- **Azure Key Vault**: Secrets and key management
- **Azure Monitor**: Observability and monitoring

## Integration

Miso Controller integrates with:

- **AI Fabrix Core**: Core platform services
- **Flowise**: Workflow automation
- **OpenWebUI**: User interface components
- **External Systems**: Enterprise applications and data sources

## Getting Started

To work with Miso Controller, see our [Deployment & Operations](../deployment-operations/) guide for setup and configuration.


