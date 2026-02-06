---
title: AI Fabrix Deployment & Operations
description: Predictable, secure, and flexible deployment options for AI Fabrix in Azure tenant
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
  - Installation Options
  - Infrastructure Sizing & Scaling
  - Subscription Tiers
  - Support & SLAs
  - Exit Path & Open Foundation
  - Conclusion
custom_links:
  - text: Overview
    url: /docs/overview/
  - text: Evaluation Guide
    url: /docs/evaluation/
  - text: Core Components
    url: /docs/core-components/
  - text: Enterprise Features
    url: /docs/enterprise-features/
  - text: Use Cases
    url: /docs/use-cases/
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
  - text: Customer Success
    url: /docs/customer-success/
seo:
  keywords:
    - AI Fabrix
    - deployment
    - operations
    - Azure
    - installation
    - scaling
    - subscription
    - SLA
  canonical_url: https://docs.aifabrix.ai/deployment-operations/overview
  og_image: images/deployment-operations-overview.png
document360:
  category: Deployment & Operations
  visibility: public
  searchable: true
  featured: true
  order: 1
layout: doc
---

# Deployment & Operations

AI Fabrix is designed for predictable, secure, and flexible deployment inside the customer's Azure tenant. This section explains how Fabrix is installed, how it scales, and how enterprises can operate it with confidence.

## Table of Contents

1. [Installation Options](installation-options.md)
2. [Infrastructure Sizing & Scaling](infrastructure-sizing-scaling.md)
3. [Subscription Tiers](subscription-tiers.md)
4. [Support & SLAs](support-slas.md)
5. [Exit Path & Open Foundation](exit-path-open-foundation.md)

## Installation Options

Fabrix can be installed via the **Azure Marketplace** for a guided, baseline deployment. Enterprises may also choose manual installation for hybrid or custom environments.

All deployments are tenant-owned, with resources created in the customer's Azure subscription and secured through private networking and Key Vault.

## Infrastructure Sizing & Scaling

Fabrix offers infrastructure profiles sized **S, M, L, and XL**. Each size maps to workload complexity and expected user volume.

Scaling is supported through Azure-native services: autoscaling container workloads, multi-region distribution with Azure Front Door, and Dev → Test → Prod promotion for enterprise lifecycle management.

## Subscription Tiers

Fabrix is delivered as a subscription with tiers designed to fit different stages of adoption:

- **Community** — entry-level, single-environment, limited features.
- **Standard** — multi-environment support, governance packs, and enterprise connectors.
- **Enterprise** — full policy controls, advanced observability, SLAs, and multi-region scaling.

Azure infrastructure costs are billed directly to the customer, ensuring cost transparency.

## Support & SLAs

Enterprise subscriptions include access to support services and **service-level agreements**. Options range from best-effort support for community users to 24/7 enterprise-grade SLAs.

Operational visibility is provided through monitoring dashboards, logs, and health endpoints, ensuring proactive issue management.

## Exit Path & Open Foundation

Fabrix is built on an **open-source foundation**. Customers can continue independently on open components if a subscription ends.

This guarantees that enterprises avoid lock-in, protecting long-term investments in both infrastructure and AI workflows.

## Conclusion

Fabrix deployment and operations are predictable and enterprise-ready. With secure installation, clear scaling options, transparent billing, and an open exit path, Fabrix ensures organizations can adopt AI with confidence.
