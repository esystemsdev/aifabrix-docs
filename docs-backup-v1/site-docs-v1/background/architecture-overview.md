---
title: Architecture Overview
description: High-level architecture overview of AI Fabrix enterprise AI platform
audience:
  - end-user
  - admin
version: stable
owner: product-team
last_reviewed: '2025-09-22'
date: '2025-09-24T15:42:29.831Z'
toc: true
custom_links:
  - text: Getting Started
    url: /docs/getting-started/
    submenu:
      - text: Installation Guide
        url: /docs/getting-started/installation/
      - text: Quick Deploy Guide
        url: /docs/getting-started/quick-deploy/
  - text: Platform Overview
    url: /docs/background/
    submenu:
      - text: Architecture Overview
        url: /docs/background/architecture-overview/
      - text: Competitive Advantages
        url: /docs/background/competitive-advantages/
      - text: Compliance Requirements
        url: /docs/background/compliance-requirements/
      - text: Deployment Models
        url: /docs/background/deployment-models/
      - text: Integration Capabilities
        url: /docs/background/integration-capabilities/
      - text: Modules Overview
        url: /docs/background/modules-overview/
      - text: Platform Overview
        url: /docs/background/platform-overview/
      - text: Target Audience
        url: /docs/background/target-audience/
      - text: Technology Stack
        url: /docs/background/technology-stack/
      - text: Use Cases
        url: /docs/background/use-cases/
  - text: Architecture
    url: /docs/architecture/
    submenu:
      - text: Miso Controller Architecture
        url: /docs/architecture/miso-controller/
      - text: Portal Architecture
        url: /docs/architecture/portal-architecture/
      - text: Security Authentication
        url: /docs/architecture/security-authentication/
  - text: User Guides
    url: /docs/user-guides/
    submenu:
      - text: Portal Usage Guide
        url: /docs/user-guides/portal-usage/
  - text: API Reference
    url: /docs/api/
    submenu:
      - text: AI Fabrix Miso API
        url: /docs/api/miso-api/
seo:
  keywords:
    - AI Fabrix
    - architecture
    - system design
    - enterprise AI
  canonical_url: https://docs.aifabrix.ai/architecture-overview
  og_image: images/architecture-overview-preview.png
document360:
  category: Background
  visibility: public
  searchable: true
  featured: true
  order: 2
layout: doc
---


# Architecture Overview

## System Architecture

AI Fabrix is a **layered enterprise AI platform** running entirely inside the customer’s **Azure tenant**.
The system is designed to balance **innovation speed** with **regulatory compliance**, ensuring that pilots can move to production without hidden costs or security gaps.

High-level layers:

1. **Infrastructure & Security (Azure-native)** – VNet, Private Links, Key Vault, PostgreSQL, Redis, hardened containers.
2. **Control Layer (Miso)** – Central orchestration, identity, governance, and deployment automation.
3. **Core Services** – APIs, metadata filters, governance logic, and enterprise integrations.
4. **Application Layer** – Flowise for orchestration, OpenWebUI for user experience, custom enterprise apps and agents.
5. **Extension Layer** – SDK and plugin framework for developers and partners.

---

## Core Modules

* **Miso (Enterprise Controller)**
  Orchestrates deployment, enforces compliance, manages identities and audit trails.
* **Core Platform**
  APIs, metadata-driven retrieval, and integration with enterprise systems (CRM, ERP, HR, Finance).
* **Flowise**
  Workflow and orchestration engine for building AI-powered processes and use cases.
* **OpenWebUI**
  User interface for collaboration, chat, and case building across teams.
* **SDK & Plugins**
  Developer tools for extending the platform with connectors, custom logic, and workflows.
* **Mori (Internal)**
  Subscription and tenant management, not exposed to customers.

---

## Data Flow

1. **Ingestion** – Data enters Fabrix through connectors (SharePoint, Teams, CRM, ERP, etc.).
2. **Metadata Enrichment** – Data is tagged with metadata filters to ensure secure and relevant retrieval.
3. **Vectorization & Storage** – Documents and structured data are stored in PostgreSQL/pgvector with metadata.
4. **Retrieval** – Queries from Flowise/OpenWebUI filter data via metadata-aware retrieval.
5. **Execution** – Workflows and agents act on the data, optionally invoking external APIs or enterprise apps.
6. **Audit & Logging** – Every action is logged, monitored, and observable for compliance.

---

## Integration Points

* **Azure Services** – Key Vault, Entra ID (SSO, RBAC), Azure Front Door, App Service, Storage.
* **Enterprise Applications** – SharePoint, Teams, CRM, ERP, HR, Finance systems.
* **Developer Tools** – SDK for connector and plugin development.
* **Observability Systems** – Metrics, logs, audit pipelines into customer monitoring stack.

---

## Scalability Design

* **Environment Separation** – Dev → Test → Prod lifecycle with automated promotion and rollback.
* **Horizontal Scaling** – Containers auto-scale within App Service / AKS as workload increases.
* **Global Expansion** – Multi-region deployment supported by Azure Front Door and private networking.
* **Future-Proofing** – Modular design allows integration of multiple LLMs and emerging AI models.

---

## Security Architecture

* **Identity & Access** – Entra ID SSO, SCIM provisioning, RBAC inheritance.
* **Credential Management** – All secrets stored in Azure Key Vault, never exposed in pipelines or local machines.
* **Network Isolation** – Private networking and VNet integration prevent data leakage.
* **Compliance Alignment** – ISO-27001, HIPAA/GDPR-ready design for healthcare and regulated industries.
* **Governance & Audit** – Usage limits, quotas, egress controls, structured logs, audit trails.
* **Controlled AI Development** – All AI-assisted coding (e.g., Cursor) follows enterprise-approved pipelines with review, versioning, and compliance checks.