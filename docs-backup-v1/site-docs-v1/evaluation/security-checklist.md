---
title: Architecture & Security Checklist
description: Security and compliance checklist for AI Fabrix evaluation
audience:
  - admin
version: stable
owner: security-team
last_reviewed: '2025-01-15'
date: '2025-01-15'
toc: true
custom_links:
  - text: Evaluation Guide
    url: /docs/evaluation/
    submenu:
      - text: Key Criteria
        url: /docs/evaluation/key-criteria/
      - text: Proof of Concept
        url: /docs/evaluation/proof-of-concept/
      - text: Security Checklist
        url: /docs/evaluation/security-checklist/
      - text: Cost & Sizing
        url: /docs/evaluation/cost-sizing/
      - text: Competitive Comparison
        url: /docs/evaluation/competitive-comparison/
      - text: Pilot & Rollout
        url: /docs/evaluation/pilot-rollout/
seo:
  keywords:
    - AI Fabrix
    - security
    - compliance
    - checklist
    - architecture
  canonical_url: https://docs.aifabrix.ai/evaluation/security-checklist
  og_image: images/security-checklist.png
document360:
  category: Evaluation
  visibility: public
  searchable: true
  featured: true
  order: 3
layout: doc
---

# Architecture & Security Checklist

When evaluating AI Fabrix, enterprises must ensure the platform aligns with existing IT architecture, security standards, and compliance requirements. This checklist helps CIOs, IT managers, and architects confirm that Fabrix is production-ready in their Azure environment.

## 1. Azure-Native Deployment

- Runs fully inside your **Azure tenant** — no SaaS, no shared hosting.
- Deployed on **Virtual Networks (VNet)** with **Private Endpoints** and **DNS integration**.
- Supports **Azure Front Door** or **WAF** for global access with protection.
- Uses **App Service / Container Apps / AKS** as flexible compute targets.

**Outcome:** Deployment is isolated, secure, and compliant with enterprise cloud architecture standards.

## 2. Identity & Access Control

- Integrated with **Microsoft Entra ID** for Single Sign-On (SSO).
- **Role-Based Access Control (RBAC)** inheritance across workspaces.
- **SCIM provisioning** for automated user and group management.
- Multi-tenant or multi-environment setups (Dev → Test → Prod) supported.

**Outcome:** Access follows the same guardrails as existing enterprise IT.

## 3. Secret & Key Management

- All secrets stored in **Azure Key Vault only** — no embedded secrets.
- Support for **Managed Identities** where possible.
- Key rotation aligned with enterprise security policies.

**Outcome:** Centralized, compliant key management with no hidden exposures.

## 4. Governance & Observability

- **Miso layer** enforces policy packs for quotas, egress, and compliance.
- **Audit logging** with correlation IDs for every connector and workflow.
- Centralized logs, metrics, and traces for monitoring.
- Cost telemetry available from day one.

**Outcome:** AI workloads are governed, observable, and auditable at scale.

## 5. Data Handling & Compliance

- Metadata-aware retrieval ensures **permission-aware search** across Microsoft 365 and business systems.
- Documents inherit folder or system metadata for compliant context.
- Configurable **egress controls** to prevent unintended data flow.
- [[PLACEHOLDER: Add industry-specific checks — e.g. HIPAA, PCI-DSS, or financial services]].

**Outcome:** Data access remains compliant, permission-aligned, and fully auditable.

## 6. Resilience & Scalability

- Supports **Dev → Test → Prod lifecycle** with promotion as code.
- **Blue/green deployment** and rollback options.
- Autoscaling for workloads; multi-region support via **Azure Front Door**.

**Outcome:** Platform scales with business demand without compromising resilience.

## Key Takeaway

This checklist ensures Fabrix is not just technically deployed, but **aligned with enterprise IT architecture, governance, and compliance standards**.

By validating these areas during evaluation, enterprises reduce risk and accelerate the path to production.
