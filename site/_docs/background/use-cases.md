---
title: Use Cases
description: Primary use cases and scenarios for AI Fabrix enterprise AI platform
audience:
  - end-user
  - admin
version: stable
owner: product-team
last_reviewed: '2024-01-15'
date: '2025-09-24T15:42:29.867Z'
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
    - use cases
    - enterprise AI
    - solutions
    - scenarios
  canonical_url: https://docs.aifabrix.ai/use-cases
  og_image: images/use-cases-preview.png
document360:
  category: Background
  visibility: public
  searchable: true
  featured: true
  order: 4
layout: doc
---


# Use Cases

## Enterprise AI Solutions

AI Fabrix enables secure, compliant AI solutions that run inside your Azure tenant and integrate with existing systems.

* **Knowledge Discovery & Enterprise Search**
  Unified, permission-aware search across SharePoint, Teams, CRM/ERP, HR, Finance with metadata filters and auditability.

* **Expert Assistants & Case Workspaces**
  Role-based assistants (IT, Finance, Sales, HR) embedded in OpenWebUI; case-builder views for cross-functional collaboration.

* **Decision Support & Reporting**
  RAG-powered insights tied to KPIs and policies, with explainability, source traceability, and export to BI tools.

* **Operational Agents (Guardrailed)**
  Flowise workflows that read/act in enterprise apps (ticket routing, quote generation, onboarding, vendor due diligence), governed by Miso.

---

## Document Processing

Automate ingestion, classification, extraction, and compliance handling for unstructured content.

* **Ingestion & Normalisation**
  Bulk ingest from SharePoint libraries and email drops; auto-enrichment with business metadata and lineage.

* **Classification & PII/PHI Redaction**
  Policy-driven redaction and tagging; route sensitive items to controlled processing paths.

* **Extraction & Validation**
  Structured data extraction (invoices, contracts, SOPs), schema validation, exception handling queues.

* **Retention & Audit**
  Lifecycle policies, immutable logs, and evidence packs for audits.

**Typical outcomes**: 60–85% cycle-time reduction, 30–50% lower manual QA effort, faster audit readiness.

---

## Workflow Automation

Bridge people, AI, and systems with resilient, auditable workflows.

* **Human-in/on-the-loop**
  Approval steps, escalation paths, and rollback safeguards for sensitive actions.

* **Cross-App Orchestration**
  Multi-system workflows (e.g., CRM ↔ ERP ↔ Finance) with idempotency, retries, and compensation logic.

* **Policy-Driven Automation**
  Enforce data residency, least privilege, and change-control gates in the pipeline.

* **Observability & SLOs**
  Metrics, traces, and alerts for throughput, error budgets, and business KPIs.

---

## Integration Scenarios

Pre-built patterns to de-risk integration and reduce hidden project costs.

* **SharePoint/Teams Knowledge Fabric**
  Secure RAG over departmental sites with inherited folder metadata and permission-aware retrieval.

* **CRM/ERP Revenue Workflows**
  Quote-to-Cash assistants: opportunity summarisation, CPQ support, order validation, and invoice reconciliation.

* **HR & IT Service Delivery**
  Joiner-Mover-Leaver automations; policy-compliant access provisioning with approvals.

* **Finance & Procurement**
  Vendor onboarding checks (KYC, sanctions), PO/Invoice matching, spend policy enforcement.

---

## Industry-Specific Use Cases

* **Healthcare & Life Sciences**
  PHI-aware document pipelines (lab reports, consent forms); clinical SOP retrieval; regulated app Dev→Test→Prod under Miso governance.

* **Financial Services & Insurance**
  KYC/AML documentation intake, claims triage, credit memo drafting with controlled data access and complete audit trails.

* **Manufacturing & Supply Chain**
  Quality records processing, engineering change orders (ECO) routing, supplier scorecards with multi-plant rollouts.

* **Energy & Utilities**
  Asset maintenance knowledge, work order consolidation, safety procedures with offline/edge-friendly caching.

* **Public Sector**
  Case management, grants documentation processing, policy search with strict residency and access controls.

---

## Customer Success Stories

*(Representative, anonymised examples)*

* **Global Diagnostics Provider**
  Consolidated SOP and lab documentation into a PHI-safe knowledge fabric.
  **Impact**: 70% reduction in search time, compliance evidence generation cut from weeks to days.

* **Industrial Manufacturer**
  Automated ECO routing and supplier NCR processing via Flowise workflows.
  **Impact**: 45% faster cycle time, 35% fewer handoffs, improved auditability.

* **Mid-Market Insurer**
  Claims intake triage with document classification and data extraction, human-in-the-loop for exceptions.
  **Impact**: 60% faster triage, 25% reduction in leakage from misrouted claims.

---

## ROI and Benefits

* **Faster Time-to-Value**
  Production-ready baseline in weeks; reusable connectors and patterns minimise custom effort.

* **Compliance by Design**
  ISO-27001 alignment, Entra ID SSO/RBAC, Key Vault, private networking, full audit trails.

* **Cost Predictability**
  Subscription tiers with Azure infra billed directly; fewer hidden integration costs.

* **Risk Reduction**
  No SaaS data exposure; controlled AI development (policy-governed coding, reviews, and promotion gates).

* **Operational Efficiency**
  30–70% cycle-time reductions across document-heavy and cross-app workflows; measurable SLA improvements.
