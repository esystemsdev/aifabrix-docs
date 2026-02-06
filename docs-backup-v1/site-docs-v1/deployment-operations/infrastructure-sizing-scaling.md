---
title: Infrastructure Sizing & Scaling
description: Predictable scaling with Azure-native resources and size presets (S, M, L, XL) for enterprise workloads
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
  - Sizing Profiles
  - Scaling Approach
  - Upgrade Path
  - Observability & Cost Control
  - Infrastructure Scaling Diagram
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
    - infrastructure
    - sizing
    - scaling
    - Azure
    - S/M/L/XL
    - enterprise
  canonical_url: https://docs.aifabrix.ai/deployment-operations/infrastructure-sizing-scaling
  og_image: images/infrastructure-sizing-scaling.png
document360:
  category: Deployment & Operations
  visibility: public
  searchable: true
  featured: true
  order: 3
layout: doc
---

# Infrastructure Sizing & Scaling

AI Fabrix is designed to scale **predictably** inside the customer's Azure tenant.
Every deployment uses Azure-native resources, with defined **size presets (S, M, L, XL)** to align infrastructure with expected workloads and compliance needs.

This approach ensures that scaling is transparent, cost-predictable, and managed entirely within the customer's Azure subscription.

## Table of Contents

1. [Sizing Profiles](#sizing-profiles)
2. [Scaling Approach](#scaling-approach)
3. [Upgrade Path](#upgrade-path)
4. [Observability & Cost Control](#observability--cost-control)
5. [Key Takeaway](#key-takeaway)

## Sizing Profiles

Each subscription is deployed with a **size preset** that determines the underlying Azure services for compute, database, caching, storage, and networking.

| Size   | App Service / Container Plan                          | PostgreSQL (pgvector)   | Redis Cache       | Storage | Networking                                                          | Intended Use                            |
| ------ | ----------------------------------------------------- | ----------------------- | ----------------- | ------- | ------------------------------------------------------------------- | --------------------------------------- |
| **S**  | Basic App Service Plan / Small Container              | Single-node, ~50 GB     | Basic (1 GB)      | 100 GB  | VNet + Private Endpoints                                            | Sandbox / Development                   |
| **M**  | Standard App Service Plan                             | HA-enabled, ~200 GB     | Standard (2–5 GB) | 500 GB  | VNet + Private Endpoints                                            | SMB / Department scale                  |
| **L**  | Premium App Service Plan                              | HA-enabled, ~500 GB     | Premium (10 GB)   | 1 TB    | VNet + Private Endpoints                                            | Enterprise scale                        |
| **XL** | Premium/Isolated Plan with dedicated vNET integration | Large HA-enabled, >1 TB | Premium (>20 GB)  | 5 TB+   | VNet + Private Endpoints + Global Load Balancing (Azure Front Door) | Global deployments, regulated workloads |

⚠️ Exact Azure SKUs may vary depending on **regional availability** and **customer preferences**.
All infrastructure costs are billed directly to the customer's Azure subscription for **full transparency**.

## Scaling Approach

Fabrix uses Azure-native scaling options to adapt to enterprise workloads:

- **Horizontal scaling** — Container workloads and App Services autoscale based on demand.
- **Vertical scaling** — Upgrade from S → M → L → XL by adjusting Azure service plans.
- **Multi-region distribution** — Enabled with **Azure Front Door** for global, low-latency deployments.
- **Environment lifecycle** — Dev → Test → Prod separation ensures controlled promotion.
- **Rollback support** — Application containers can revert to a known-good state.

## Upgrade Path

- **Subscription Upgrades**: Move from Community → Standard → Enterprise without redeploying infrastructure; features unlock via license.
- **Size Upgrades**: Move between S, M, L, XL with **seamless migration**; no architectural redesign required.

## Observability & Cost Control

Fabrix adds governance and visibility on top of Azure monitoring:

- **Telemetry**: Metrics, structured logs, traces, and health endpoints.
- **Cost Transparency**: Direct Azure billing, no hidden SaaS fees.
- **Quotas & Policies**: Administrators can set usage and cost limits at the Miso control layer.

## Infrastructure Scaling Diagram

```mermaid
flowchart LR
    S[S — Sandbox / Dev] --> M[M — SMB / Dept Scale] --> L[L — Enterprise Scale] --> XL[XL — Global / Regulated]

    S --- S1[Basic App Service / Small Container]
    S --- S2[PostgreSQL ~50 GB, Single-node]
    S --- S3[Redis Basic 1 GB]
    S --- S4[Storage 100 GB]
    S --- S5[VNet + Private Endpoints]

    M --- M1[Standard App Service]
    M --- M2[PostgreSQL HA ~200 GB]
    M --- M3[Redis 2–5 GB]
    M --- M4[Storage 500 GB]
    M --- M5[VNet + Private Endpoints]

    L --- L1[Premium App Service]
    L --- L2[PostgreSQL HA ~500 GB]
    L --- L3[Redis Premium 10 GB]
    L --- L4[Storage 1 TB]
    L --- L5[VNet + Private Endpoints]

    XL --- XL1[Premium/Isolated App Service]
    XL --- XL2[PostgreSQL >1 TB, HA]
    XL --- XL3[Redis Premium >20 GB]
    XL --- XL4[Storage 5 TB+]
    XL --- XL5[VNet + Global Load Balancing (Front Door)]

    classDef stage fill:#f3f6fa,stroke:#2c3e50,stroke-width:1px;
    class S,M,L,XL stage;
```

This diagram shows the progression from S → M → L → XL with specific infrastructure components and capabilities at each size tier.

## Key Takeaway

Fabrix infrastructure sizing makes it easy to start small, grow to enterprise production, and scale globally — all while staying inside the same **Azure-native architecture**.
