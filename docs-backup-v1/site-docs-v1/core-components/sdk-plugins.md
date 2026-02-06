---
title: SDK & Plugins — Developer Extensions
description: SDK and plugin system for extending AI Fabrix functionality
audience:
  - developer
  - admin
  - end-user
version: stable
owner: platform-team
last_reviewed: '2025-01-15'
date: '2025-01-15'
toc: true
table_of_contents:
  - Role of SDK & Plugins
  - Safe Extension Model
  - Developer Experience
  - Governance & Lifecycle Controls
  - Example Use Cases
  - Enterprise Benefits
custom_links:
  - text: Core Components
    url: /docs/core-components/
    submenu:
      - text: Miso — Governance & Deployment
        url: /docs/core-components/miso-governance/
      - text: Core Platform Services
        url: /docs/core-components/core-platform-services/
      - text: Flowise — Orchestration
        url: /docs/core-components/flowise-orchestration/
      - text: OpenWebUI — Secure UX
        url: /docs/core-components/openwebui-secure-ux/
      - text: SDK & Plugins
        url: /docs/core-components/sdk-plugins/
seo:
  keywords:
    - AI Fabrix
    - SDK
    - plugins
    - developer
    - extensions
  canonical_url: https://docs.aifabrix.ai/core-components/sdk-plugins
  og_image: images/sdk-plugins.png
document360:
  category: Core Components
  visibility: public
  searchable: true
  featured: true
  order: 5
layout: doc
---

# SDK & Plugins — Developer Extensions

The **SDK & Plugin framework** makes AI Fabrix **extensible by design**.
It gives enterprises and partners a **safe, governed way to add new capabilities**, whether by building new connectors, creating workflow nodes, or extending business logic.
Unlike ad-hoc scripts or unmanaged integrations, the Fabrix SDK ensures all extensions run under **Miso governance, Azure security, and enterprise auditability**.

## Table of Contents

1. [Role of SDK & Plugins](#role-of-sdk--plugins)
2. [Safe Extension Model](#safe-extension-model)
3. [Developer Experience](#developer-experience)
4. [Governance & Lifecycle Controls](#governance--lifecycle-controls)
5. [Example Use Cases](#example-use-cases)
6. [Enterprise Benefits](#enterprise-benefits)

## Role of SDK & Plugins

The SDK provides a **developer toolkit** for extending Fabrix.
Plugins can extend the platform by:

- Adding **new data connectors** to enterprise systems.
- Creating **custom processing or enrichment steps**.
- Integrating with **external APIs and workflows**.
- Delivering **structured outputs** specific to industry domains.

This makes Fabrix adaptable across industries, without losing its security and governance guarantees.

## Safe Extension Model

Fabrix plugins are built for **enterprise security**:

- **Server-Side Only Execution** — no credentials stored in browsers or user devices.
- **Azure Key Vault Secrets** — credentials and tokens stored securely.
- **Contract Tests** — enforce predictable behavior before production rollout.
- **Versioned Manifests** — ensure controlled deployments with rollback options.

This prevents the "shadow IT" problem of ungoverned custom scripts.

## Developer Experience

The SDK is **designed for enterprise developers and partners**:

- **Type-Safe APIs** for connectors, processing nodes, and agent tools.
- **Dynamic Input Fields** for configuration that adapts to system schemas.
- **Output Schemas** for structured, reusable results.
- **Hot Reload Development** for fast iteration.
- **Standard Deployment Model** — integrate with Miso's Dev → Test → Prod lifecycle.

This allows development teams to innovate quickly while staying within compliance guardrails.

## Governance & Lifecycle Controls

All plugins run under Miso's **governance framework**:

- **Policy Packs:** Apply quotas, egress restrictions, and audit requirements.
- **Environment Promotion:** Plugins can be promoted through Dev, Test, and Prod via policy-as-code.
- **Central Observability:** Logs, metrics, and traces tied to plugin usage.
- **Controlled Rollouts:** Canary deployments and rollback paths.

This ensures extensions are **auditable, observable, and reversible**.

## Example Use Cases

- **Healthcare:** Connector to FHIR data sources with compliance tagging.
- **Finance:** Plugin to calculate regulatory ratios inside RAG flows.
- **Manufacturing:** IoT data connector with metadata enrichment (plant, device ID, timestamp).
- **Legal:** Plugin to apply document classification before ingestion.
- **Custom Workflows:** Approval steps, escalation triggers, or cross-system sync actions.

## Enterprise Benefits

By adopting the SDK & Plugins, enterprises gain:

- **Controlled Innovation** — extensions that fit compliance frameworks.
- **Domain Adaptability** — tailor AI Fabrix to industry-specific needs.
- **Faster Time-to-Value** — SDK accelerates development of new integrations.
- **No Lock-In** — plugins remain portable and standards-based.

✅ [[PLACEHOLDER: Add diagram — SDK/Plugins layer enabling custom extensions, governed by Miso, feeding into Core Services and Flowise orchestration.]]
