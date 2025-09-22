---
layout: doc
title: Deployment Models
date: 2024-01-15T00:00:00.000Z
toc: true
custom_links:
  - text: Platform Overview
    url: /docs/background/
    submenu:
      - text: What is AI Fabrix
        url: /docs/background/platform-overview/
      - text: Architecture Overview
        url: /docs/background/architecture-overview/
      - text: Use Cases
        url: /docs/background/use-cases/
      - text: Target Audience
        url: /docs/background/target-audience/
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
