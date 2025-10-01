# Cost & Sizing Guide

AI Fabrix is designed to deliver **predictable economics** while scaling from sandbox to global enterprise. Costs are transparent because infrastructure runs inside your Azure tenant, with Azure services billed directly to your subscription.

This guide explains subscription tiers, infrastructure sizes, and the upgrade path.

## 1. Platform Foundation (Always Included)

Every subscription includes the full Azure foundation stack and the **Miso controller** for orchestration and governance.

**Included by default:**

- Azure Resource Group & Virtual Network with Private Endpoints
- PostgreSQL with pgvector for embeddings
- Redis Cache for session management
- Azure Key Vault for secret storage
- App Service / Containerized deployment
- Azure Storage for documents & logs
- Azure Front Door for secure global access
- Miso controller with centralized authentication and orchestration
- ISO-27001 aligned secure deployment patterns
- Flowise + OpenWebUI for orchestration and collaboration
- Metadata filters and connectors integrated natively

## 2. Subscription Tiers

### 🔹 Community (Free)

- **Environments:** 1 (Dev / Sandbox only)
- **Sizes:** S only
- **Features:**
  - Flowise + OpenWebUI with limited metadata filters
  - Selected community connectors (basic SharePoint/Teams, demo CRM/ERP)
  - Local accounts (no SSO)
  - No audit logs or SCIM
- **Best for:** Developers, partners, early experimentation

### 🔹 Standard

- **Environments:** 2 (Dev + Prod)
- **Sizes:** S or M
- **Features:**
  - Full metadata filters
  - Expanded connectors (SharePoint, Teams, CRM, ERP, HR, Finance)
  - Entra ID SSO, basic RBAC
  - Audit logs
  - ISO-27001 baseline compliance
- **Best for:** SMBs, department-level rollouts

### 🔹 Enterprise

- **Environments:** 3+ (Dev, Test, Prod)
- **Sizes:** M, L, XL
- **Features:**
  - Full suite of enterprise connectors with metadata enrichment
  - Entra ID SSO, advanced RBAC inheritance, SCIM provisioning
  - Audit logs, quotas, egress controls, SBOMs
  - ISO-27001 alignment with full audit trails
  - Full observability (metrics, logs, health endpoints)
- **Best for:** Large enterprises, regulated industries, global scale

## 3. Infrastructure Sizes

| Size   | App Service / Container Plan              | PostgreSQL (pgvector)   | Redis Cache       | Storage | Networking                                      | Intended Use                            |
| ------ | ----------------------------------------- | ----------------------- | ----------------- | ------- | ----------------------------------------------- | --------------------------------------- |
| **S**  | Basic App Service Plan / Small Container  | Single-node, ~50 GB     | Basic (1 GB)      | 100 GB  | VNet + Private Endpoints                        | Sandbox / Development                   |
| **M**  | Standard App Service Plan                 | HA-enabled, ~200 GB     | Standard (2–5 GB) | 500 GB  | VNet + Private Endpoints                        | SMB / Department scale                  |
| **L**  | Premium App Service Plan                  | HA-enabled, ~500 GB     | Premium (10 GB)   | 1 TB    | VNet + Private Endpoints                        | Enterprise scale                        |
| **XL** | Premium/Isolated Plan with dedicated vNET | Large HA-enabled, >1 TB | Premium (>20 GB)  | 5 TB+   | VNet + Global Load Balancing (Azure Front Door) | Global deployments, regulated workloads |

⚠️ Azure SKUs may vary by customer choice and region. **All costs are billed directly to your Azure subscription.**

## 4. Upgrade Path

- **Subscription upgrades:** Move from Community → Standard → Enterprise without redeployment. Licensing unlocks features.
- **Size upgrades:** Scale S → M → L → XL by adjusting Azure service plans. No architectural changes required.

## 5. Why This Matters

- **No SaaS lock-in:** All data, models, and infra stay inside your Azure tenant.
- **Predictable economics:** Transparent Azure billing, no hidden charges.
- **Smooth scaling:** Start small, grow to enterprise production, and expand globally — all on the same secure architecture.
