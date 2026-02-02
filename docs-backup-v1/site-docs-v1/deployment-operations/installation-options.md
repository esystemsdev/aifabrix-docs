---
title: Installation Options
description: Guided two-stage deployment model for AI Fabrix with enterprise control and security
audience:
  - admin
  - developer
  - end-user
version: stable
owner: platform-team
last_reviewed: '2025-01-15'
date: '2025-01-15'
toc: true
table_of_contents:
  - 'Stage 1: Minimal Deployment (Installer + Miso Bootstrap)'
  - 'Stage 2: Full Miso Controller Environment'
  - 'Environment Deployment: Dev → Test → Prod'
  - Application & Container Management
  - Installation Flow Diagram
  - Key Takeaway
custom_links:
  - text: Deployment & Operations
    url: /docs/deployment-operations/
    submenu:
      - text: Deployment & Operations Overview
        url: /docs/deployment-operations/overview/
      - text: Installation Options
        url: /docs/deployment-operations/installation-options/
      - text: Infrastructure Sizing & Scaling
        url: /docs/deployment-operations/infrastructure-sizing-scaling/
      - text: Subscription Tiers
        url: /docs/deployment-operations/subscription-tiers/
      - text: Support & SLAs
        url: /docs/deployment-operations/support-slas/
      - text: Exit Path & Open Foundation
        url: /docs/deployment-operations/exit-path-open-foundation/
seo:
  keywords:
    - AI Fabrix
    - installation
    - deployment
    - Miso
    - Azure
    - bootstrap
    - DevOps
  canonical_url: https://docs.aifabrix.ai/deployment-operations/installation-options
  og_image: images/installation-options.png
document360:
  category: Deployment & Operations
  visibility: public
  searchable: true
  featured: true
  order: 2
layout: doc
---

# Installation Options

AI Fabrix provides a **guided, two-stage deployment model** that balances simplicity with enterprise control.
All deployments run inside the customer's Azure tenant, with resources secured through **private networking, Azure Key Vault, and Entra ID** integration.

## Table of Contents

1. [Stage 1: Minimal Deployment (Installer + Miso Bootstrap)](#stage-1-minimal-deployment-installer--miso-bootstrap)
2. [Stage 2: Full Miso Controller Environment](#stage-2-full-miso-controller-environment)
3. [Environment Deployment: Dev → Test → Prod](#environment-deployment-dev--test--prod)
4. [Application & Container Management](#application--container-management)
5. [Key Takeaway](#key-takeaway)

## Stage 1: Minimal Deployment (Installer + Miso Bootstrap)

The first step installs a **lightweight Fabrix installer** and a minimal Miso controller.
This bootstrap environment establishes the secure foundation, including:

- Networking (VNet, private endpoints, DNS)
- Secrets management (Azure Key Vault)
- Authentication (Entra ID SSO)
- Access to the enterprise management interface

This provides a ready entry point for managing subsequent deployments.

## Stage 2: Full Miso Controller Environment

The second step upgrades to the **full Miso controller**, enabling:

- Governance and policy packs
- Centralized monitoring and audit trails
- Role-based access and SCIM provisioning
- Application container orchestration with rollback support

From here, enterprises manage **applications, connectors, and RAG pipelines** centrally, without manual configuration.

## Environment Deployment: Dev → Test → Prod

Once the full controller is in place, enterprises can deploy **development, testing, and production environments separately**.
Each environment runs isolated, but is managed through the **single Fabrix enterprise interface** for consistency.

This supports:

- Controlled promotion from Dev → Test → Prod
- Policy-as-code for environment governance
- Lifecycle upgrades and downgrades without downtime

## Application & Container Management

Fabrix extends beyond initial deployment by enabling ongoing container lifecycle management:

- Deploy and scale applications through the interface
- Roll back containers to known-good versions
- Apply updates consistently across environments
- Automate promotion of new versions with governance checks

## Installation Flow Diagram

```mermaid
flowchart TD
    A[Stage 1: Minimal Deployment<br/>(Installer + Miso Bootstrap)] --> B[Stage 2: Full Miso Controller]
    B --> C[Dev Environment]
    B --> D[Test Environment]
    B --> E[Production Environment]

    A --- A1[Azure Marketplace Installer]
    A --- A2[Minimal Miso Controller<br/>• Networking (VNet, DNS)<br/>• Private Endpoints<br/>• Key Vault<br/>• Entra ID SSO<br/>• Enterprise Interface (basic)]

    B --- B1[Full Governance Layer<br/>• Policy Packs<br/>• Monitoring & Logs<br/>• SCIM + RBAC<br/>• Container Orchestration + Rollback]
    B --- B2[Unified Enterprise Interface<br/>• Manage Applications<br/>• Manage Connectors<br/>• Upgrade/Downgrade Infra]

    C --- C1[Experimental Connectors & Pipelines]
    D --- D1[Controlled Promotion + Validation]
    E --- E1[Secure, Compliant Workloads]

    classDef stage fill:#f3f6fa,stroke:#2c3e50,stroke-width:1px;
    class A,B,C,D,E stage;
```

This diagram shows the complete installation flow from initial deployment through to production environments, highlighting the progression from minimal bootstrap to full enterprise governance.

## Key Takeaway

Fabrix installation is **predictable, modular, and upgradeable**.
From a minimal bootstrap to a fully governed controller with Dev → Test → Prod environments, enterprises gain complete visibility and rollback options — all without manual reconfiguration.
