# Subscription Tiers

AI Fabrix subscriptions are designed to match different stages of enterprise AI adoption — from experimentation to global-scale, regulated production.
Every tier includes the **Azure-native foundation** and **Miso controller**, ensuring deployments remain tenant-owned, secure, and governed.

## Table of Contents

1. [Community (Free)](#community-free)
2. [Standard](#standard)
3. [Enterprise](#enterprise)
4. [Comparison Table](#comparison-table)
5. [Upgrade Path](#upgrade-path)
6. [Key Takeaway](#key-takeaway)

## Community (Free)

- **Environments**: 1 (Dev / Sandbox only)
- **Sizes**: S only
- **Features**:

  - Flowise + OpenWebUI
  - Limited metadata filters
  - Selected community connectors (SharePoint basic, Teams basic, demo CRM/ERP)
  - Local user accounts (no Entra ID integration)
  - No audit logs or SCIM provisioning
- **Best for**: Developers, partners, and early experimentation.

## Standard

- **Environments**: 2 (Dev + Prod)
- **Sizes**: S or M
- **Features**:

  - Full metadata filters
  - Expanded connectors (SharePoint, Teams, CRM, ERP, HR, Finance)
  - Entra ID SSO + basic RBAC
  - Audit logs
  - ISO-27001 baseline compliance
- **Best for**: SMBs and department-level production rollouts.

## Enterprise

- **Environments**: 3+ (Dev, Test, Prod)
- **Sizes**: M, L, XL
- **Features**:

  - Full suite of enterprise connectors with metadata enrichment
  - Entra ID SSO + advanced RBAC inheritance + SCIM provisioning
  - Audit logs, usage quotas, egress controls, SBOMs
  - ISO-27001 alignment with full audit trails
  - Full observability (metrics, structured logs, health endpoints)
- **Best for**: Large enterprises, regulated industries, and global-scale deployments.

## Comparison Table

| Feature Area                | Community (Free)                                     | Standard                                                            | Enterprise                                           |
| --------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------- |
| **Azure Foundation + Miso** | ✔ Always included                                    | ✔ Always included                                                   | ✔ Always included                                    |
| **Environments**            | 1 (Dev/Sandbox)                                      | 2 (Dev + Prod)                                                      | 3+ (Dev, Test, Prod)                                 |
| **Sizes Available**         | S                                                    | S, M                                                                | M, L, XL                                             |
| **Flowise + OpenWebUI**     | ✔                                                    | ✔                                                                   | ✔                                                    |
| **Metadata Filters**        | Limited                                              | Full                                                                | Full with dynamic policies                           |
| **Data Connectors**         | Community set (basic SharePoint/Teams, demo CRM/ERP) | Expanded enterprise apps (SharePoint, Teams, CRM, ERP, HR, Finance) | Full enterprise suite with metadata enrichment       |
| **Identity & Access**       | Local users only                                     | Entra ID SSO + basic RBAC                                           | Entra ID SSO + advanced RBAC + SCIM                  |
| **Governance**              | –                                                    | Audit logs                                                          | Audit logs, quotas, SBOMs, egress controls           |
| **Compliance**              | –                                                    | ISO-27001 baseline                                                  | Full ISO-27001 alignment                             |
| **Observability**           | Basic logs                                           | Structured logs + metrics                                           | Full observability (logs, metrics, health endpoints) |
| **Scalability**             | Sandbox only                                         | Dev → Prod                                                          | Dev → Test → Prod → Global                           |
| **Support**                 | Community docs only                                  | Standard support                                                    | Enterprise SLA + roadmap alignment                   |

## Upgrade Path

- **Community → Standard → Enterprise**: Features unlock via license — no redeployment required.
- **Infrastructure scaling (S → M → L → XL)**: Adjust Azure service plans without redesigning architecture.

## Key Takeaway

Fabrix subscription tiers provide a **clear adoption path**:

- Start in **Community** for free experimentation.
- Move to **Standard** for department-level production.
- Scale into **Enterprise** for full compliance, observability, and global reach.

This staged model ensures **predictable costs, no SaaS lock-in, and enterprise readiness** at every step.
