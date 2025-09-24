---
title: Deployment Models
description: Overview of AI Fabrix deployment options including Azure Marketplace and manual installation
audience:
  - end-user
  - admin
version: stable
owner: product-team
last_reviewed: '2025-09-22'
date: '2025-09-24T15:42:29.845Z'
toc: true
custom_links:
  - text: Getting Started
    url: /aifabrix-docs/docs/getting-started/
    submenu:
      - text: Installation Guide
        url: /aifabrix-docs/docs/getting-started/installation/
      - text: Quick Deploy Guide
        url: /aifabrix-docs/docs/getting-started/quick-deploy/
  - text: Platform Overview
    url: /aifabrix-docs/docs/background/
    submenu:
      - text: Architecture Overview
        url: /aifabrix-docs/docs/background/architecture-overview/
      - text: Competitive Advantages
        url: /aifabrix-docs/docs/background/competitive-advantages/
      - text: Compliance Requirements
        url: /aifabrix-docs/docs/background/compliance-requirements/
      - text: Deployment Models
        url: /aifabrix-docs/docs/background/deployment-models/
      - text: Integration Capabilities
        url: /aifabrix-docs/docs/background/integration-capabilities/
      - text: Modules Overview
        url: /aifabrix-docs/docs/background/modules-overview/
      - text: Platform Overview
        url: /aifabrix-docs/docs/background/platform-overview/
      - text: Target Audience
        url: /aifabrix-docs/docs/background/target-audience/
      - text: Technology Stack
        url: /aifabrix-docs/docs/background/technology-stack/
      - text: Use Cases
        url: /aifabrix-docs/docs/background/use-cases/
  - text: Architecture
    url: /aifabrix-docs/docs/architecture/
    submenu:
      - text: Miso Controller Architecture
        url: /aifabrix-docs/docs/architecture/miso-controller/
      - text: Portal Architecture
        url: /aifabrix-docs/docs/architecture/portal-architecture/
      - text: Security Authentication
        url: /aifabrix-docs/docs/architecture/security-authentication/
  - text: User Guides
    url: /aifabrix-docs/docs/user-guides/
    submenu:
      - text: Portal Usage Guide
        url: /aifabrix-docs/docs/user-guides/portal-usage/
  - text: API Reference
    url: /aifabrix-docs/docs/api/
    submenu:
      - text: AI Fabrix Miso API
        url: /aifabrix-docs/docs/api/miso-api/
seo:
  keywords:
    - AI Fabrix
    - deployment
    - Azure Marketplace
    - installation
    - models
  canonical_url: https://docs.aifabrix.ai/deployment-models
  og_image: images/deployment-models-preview.png
document360:
  category: Background
  visibility: public
  searchable: true
  featured: true
  order: 7
layout: doc
---


# Deployment Models

## Azure Marketplace Deployment

**Best for:** Standardized, repeatable installs with guardrails.

**Highlights**

* **Turn-key foundation stack:** Resource Group, VNet + Private Endpoints, Azure Key Vault, Storage, App Service/Container Apps, PostgreSQL (pgvector), Redis, Azure Front Door.
* **Identity-first:** Entra ID SSO, RBAC, optional SCIM provisioning.
* **Governed bootstrap (Miso):** Policy packs (egress controls, quotas), audit wiring, environment baselines (Dev → Test → Prod).
* **Network isolation:** Private endpoints to data stores; no public data egress by default.

**What you get**

* Pre-validated Bicep templates (infrastructure as code)
* Baseline logging/metrics and audit pipelines
* Opinionated defaults for security, backup, and scaling

**When to choose**

* You want fastest time-to-value with enterprise controls baked in.
* You need repeatability across multiple business units/regions.

---

## Manual Installation

**Best for:** Edge cases or highly customized environments.

**Approach**

1. Provision core Azure resources (VNet, subnets, Key Vault, Storage, Postgres, Redis).
2. Deploy containers (Flowise, OpenWebUI, Core services, Miso) with your preferred orchestrator.
3. Configure Entra ID SSO/RBAC and secret references (Key Vault).
4. Connect enterprise systems (SharePoint, Teams, CRM, ERP, HR, Finance) with metadata filters.
5. Enable audit pipelines and guardrails (Miso policy sets).

**Trade-offs**

* Maximum flexibility, **higher responsibility** for hardening, drift control, and lifecycle management.

---

## Container Deployment

**Best for:** Teams standardizing on containers across environments.

**Options**

* **Docker Compose (single host):** Evaluation or small non-prod environments.
* **Azure Container Apps / AKS:** Production-grade with autoscaling, rolling updates, and blue/green.
* **Image supply chain controls:** Private registries, signed images, SBOM retention.

**Operational considerations**

* Pod identity / workload identity for secretless access to Key Vault.
* Per-namespace network policies; enforce private endpoints for data plane.
* Horizontal autoscaling based on CPU/RAM and queue depth; vertical tuning via presets.

---

## Hybrid Deployment

**Best for:** On-prem data residency with cloud orchestration.

**Patterns**

* **Data-in-place:** Keep data on-prem; access via private connectivity (ExpressRoute/VPN) and metadata-aware retrieval.
* **Split control plane:** Miso and orchestration in Azure; connectors/agents run on-prem runners with pull/push model.
* **Zero trust posture:** Mutual TLS, IP allowlists, and least-privilege service principals.

**Notes**

* Avoid bulk replication; prefer **federated retrieval** with permission checks at source.

---

## Multi-Cloud Deployment

**Best for:** Organizations operating across multiple cloud providers.

**Current approach**

* **Primary on Azure** for identity, security, and network primitives.
* **Interop** via plugin/connector framework (read/write) to other clouds’ apps and data.
* **Portable architecture:** Containers and IaC enable redeployability; avoid provider-specific lock-in at app layer.

**Design guardrails**

* Centralized identity (Entra ID) with cross-cloud trust.
* Consistent audit/telemetry schema across clouds.
* Encrypted transport with egress controls per region.

---

## Development Environment

**Goal:** Safe, fast iteration without compromising production integrity.

**Dev/Non-Prod setup**

* Separate **Dev** and **Test** subscriptions/resource groups.
* Smaller SKUs, same security posture (private endpoints, Key Vault, SSO).
* Feature flags and **tenant-isolated** datasets (synthetic or masked).
* CI/CD pipelines with:

  * Image build, scan, and sign
  * IaC validation and drift detection
  * Policy compliance checks before promotion

---

## Production Considerations

**Security & Compliance**

* Entra ID SSO, group-based RBAC; SCIM for automated provisioning.
* All secrets in **Azure Key Vault**; no secrets in code or pipelines.
* Private networking everywhere; deny public egress except approved endpoints.
* Full audit trail: API calls, workflow actions, data access, admin events.

**Reliability**

* **HA** for Core services; zone-redundant Postgres and Redis where supported.
* Automated backups with tested restore procedures; PITR for Postgres.
* Health probes, circuit breakers, and retry policies at connector boundaries.

**Scalability**

* Horizontal autoscale for stateless services; connection pooling for Postgres.
* Workload queues with back-pressure; per-tenant throttling and quotas.
* Regional expansion via Azure Front Door + private link hubs.

**Observability**

* Centralized logs/metrics/traces with correlation IDs across Miso, Core, Flowise, and connectors.
* SLOs and alerts (latency, error budgets, queue depth, token usage).
* Cost telemetry per tenant/workspace for showback/chargeback.

**Change Management**

* Blue/green or canary releases; signed image promotion.
* Config as code with versioned policy sets (egress rules, data access scopes).
* Rollback plans and immutable release artifacts.