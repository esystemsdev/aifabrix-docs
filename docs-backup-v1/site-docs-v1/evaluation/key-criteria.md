---
title: How to Evaluate Fabrix (Key Criteria)
description: Key enterprise criteria for evaluating AI Fabrix platform
audience:
  - admin
  - end-user
version: stable
owner: platform-team
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
    - evaluation
    - criteria
    - enterprise
    - assessment
  canonical_url: https://docs.aifabrix.ai/evaluation/key-criteria
  og_image: images/key-criteria.png
document360:
  category: Evaluation
  visibility: public
  searchable: true
  featured: true
  order: 1
layout: doc
---

# How to Evaluate Fabrix (Key Criteria)

Evaluating AI Fabrix goes beyond testing model accuracy. The key is to assess whether the platform delivers **security, governance, compliance, and cost predictability** at enterprise scale. Fabrix is evaluated against five pillars that define its enterprise readiness.

## 1. In-Tenant by Design

- Deployed fully inside the customer's **Azure tenant**.
- Uses Virtual Networks, Private Endpoints, and Azure Key Vault for isolation and control.
- Eliminates SaaS data exposure and ensures compliance with ISO-27001, GDPR, HIPAA, and industry-specific mandates.
- Enterprises maintain **direct ownership** of data, identity, and networking.

## 2. Metadata-Aware Retrieval

- Standard RAG pipelines return results without understanding **user entitlements**.
- Fabrix enforces **permission-aware retrieval**, ensuring results reflect the same access controls as SharePoint, Teams, CRM, or ERP.
- Metadata and policy filters allow **fine-grained governance** in every query.
- Supports compliant, context-rich retrieval that scales across regulated industries.

## 3. Governance & Control (Miso Layer)

- Central governance via the **Miso control layer**.
- Provides:
  - Entra ID integration with role inheritance.
  - SCIM-based user/group provisioning.
  - Policy packs for quotas, egress, and compliance.
  - Audit trails with correlation IDs.
- Ensures AI workloads follow the same **guardrails** as other enterprise IT platforms.

## 4. Predictable Economics

- Subscription tiers (S/M/L/XL) aligned to workload scale.
- **Direct Azure billing** for infrastructure — no hidden markups.
- Transparent cost structure that reduces risk of **pilot overspend**.
- Predictable economics make it easier to secure internal approval and budget.

## 5. Open Foundation / No Lock-In

- Built on **open-source components** and deploys inside Azure.
- If subscription ends, customers can continue independently.
- Protects long-term investments in data pipelines, connectors, and retrieval infrastructure.
- Provides an **exit path**, avoiding the lock-in risks of SaaS or proprietary AI stacks.

## Key Takeaway

The five pillars ensure Fabrix is **enterprise-ready from day one**:

- Secure (in-tenant deployment).
- Compliant (metadata-aware retrieval).
- Governed (Miso control).
- Predictable (transparent economics).
- Open (no lock-in).

These criteria provide a **structured framework** to compare Fabrix against SaaS tools, open-source frameworks, or Microsoft baseline services.
