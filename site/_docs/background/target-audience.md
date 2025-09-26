---
title: Target Audience
description: Overview of AI Fabrix target audience including executives, architects, developers, and end users
audience:
  - end-user
  - admin
version: stable
owner: product-team
last_reviewed: '2024-01-15'
date: '2025-09-24T15:42:29.860Z'
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
    - audience
    - users
    - personas
    - enterprise
  canonical_url: https://docs.aifabrix.ai/target-audience
  og_image: images/target-audience-preview.png
document360:
  category: Background
  visibility: public
  searchable: true
  featured: false
  order: 5
layout: doc
---


# Target Audience

AI Fabrix serves multiple stakeholders across the enterprise. Each audience benefits from a platform-first approach that runs in the customer’s Azure tenant, balancing innovation speed with governance and compliance.

## Executive Stakeholders

**Who:** CEO, CIO, CDO, CTO, CFO, BU leaders
**What they care about:** Time-to-value, risk, total cost, compliance, vendor lock-in
**How Fabrix helps:**

* Moves AI from pilots to production with predictable costs (subscription tiers; infra billed directly via Azure).
* Reduces risk via in-tenant deployment, ISO-27001 alignment, Entra ID SSO/RBAC, auditability.
* Avoids lock-in with an open-source foundation and a clear exit path.
  **Decision criteria & KPIs:** Time-to-first use case, % pilot-to-prod conversion, audit readiness, cost per use case, user adoption.

## IT Architects

**Who:** Enterprise, solution, and data architects
**What they care about:** Reference architectures, integration patterns, multi-env promotion, interoperability
**How Fabrix helps:**

* Layered architecture (Infra → Miso → Core → Flowise → OpenWebUI → SDK/Plugins) with clear module boundaries.
* Metadata-aware retrieval and connectors for SharePoint, Teams, CRM/ERP/HR/Finance.
* Dev→Test→Prod lifecycle with governance, observability, and rollback.
  **Decision criteria & KPIs:** Architectural fit, connector coverage, security model clarity, ease of integration, MTTR.

## Developers

**Who:** Application engineers, integration developers, LLM/RAG engineers
**What they care about:** Productive APIs/SDKs, safe plugin model, testability, repeatability
**How Fabrix helps:**

* Developer SDK, plugin framework, and Core APIs for rapid connector and workflow development.
* Flowise for building RAG pipelines and system orchestrations without boilerplate.
* Local testing patterns and CI/CD-ready packaging with schema validation.
  **Decision criteria & KPIs:** Build time per feature, defect rate, code reuse, connector/extensibility velocity.

## DevOps Engineers

**Who:** Platform engineers, SRE, release managers
**What they care about:** Reliable deployments, scaling, observability, run costs
**How Fabrix helps:**

* Miso control layer automates Azure provisioning, secrets, identity, and compliance controls.
* Containerized services with horizontal scaling, health endpoints, structured logs, metrics, and traces.
* Environment promotion and policy-as-code for consistent releases.
  **Decision criteria & KPIs:** Deployment frequency, change failure rate, lead time, infra costs, alert fatigue.

## Security Teams

**Who:** CISOs, security architects, GRC/compliance officers, DPOs
**What they care about:** Identity, least-privilege, data protection, auditability, standards alignment
**How Fabrix helps:**

* Entra ID SSO, SCIM, RBAC inheritance; Azure Key Vault for secrets; private networking.
* ISO-27001 alignment with audit trails, egress controls, usage limits, quotas.
* Controlled AI development practices (review gates, logging, provenance).
  **Decision criteria & KPIs:** Compliance evidence, audit findings, policy coverage, data access violations, incident rate.

## End Users

**Who:** Knowledge workers, sales, service, operations, analysts, content creators
**What they care about:** Usability, accuracy, speed, trustworthy access to enterprise content
**How Fabrix helps:**

* OpenWebUI for chat, case-building, and collaboration with role-based access.
* Metadata-aware retrieval ensures relevant, permission-respecting answers.
* Workflows that execute tasks end-to-end via Flowise and enterprise connectors.
  **Decision criteria & KPIs:** Task completion time, user satisfaction (CSAT), adoption/retention, deflection rates.

## Partner Ecosystem

**Who:** System integrators, ISVs, OEMs, domain solution providers
**What they care about:** Extensibility, commercial alignment, joint GTM, maintainability
**How Fabrix helps:**

* SDK and plugin framework with “server-side only” execution and dynamic schemas.
* Clear module boundaries and APIs to embed domain solutions or vertical packs.
* Co-selling model on top of Azure marketplace deployments.
  **Decision criteria & KPIs:** Time-to-solution, reuse across clients, support overhead, shared pipeline wins.