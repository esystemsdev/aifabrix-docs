---
title: AI Fabrix Platform Overview
description: Comprehensive overview of AI Fabrix enterprise AI platform with Azure-native ISO27001 compliance
audience:
  - admin
  - end-user
version: stable
owner: platform-team
last_reviewed: '2025-01-15'
date: '2025-01-15'
toc: true
table_of_contents:
  - What Is AI Fabrix?
  - Why It Matters
  - Synergy with Microsoft
  - Who Benefits
  - Challenge We Solve
  - Getting Started
custom_links:
  - text: Overview
    url: /docs/overview/
    submenu:
      - text: Platform Overview
        url: /docs/overview/platform-overview/
  - text: Evaluation Guide
    url: /docs/evaluation/
  - text: Core Components
    url: /docs/core-components/
  - text: Enterprise Features
    url: /docs/enterprise-features/
  - text: Use Cases
    url: /docs/use-cases/
seo:
  keywords:
    - AI Fabrix
    - enterprise AI
    - Azure
    - ISO27001
    - platform overview
  canonical_url: https://docs.aifabrix.ai/overview/platform-overview
  og_image: images/platform-overview.png
document360:
  category: Overview
  visibility: public
  searchable: true
  featured: true
  order: 1
layout: doc
---

# AI Fabrix Platform Overview

AI Fabrix is your enterprise AI fabric inside Azure. It extends Microsoft's cloud and AI capabilities with the governance, control, and observability enterprises need to move from pilots to production at scale.

Unlike external SaaS offerings, Fabrix runs fully in your own Azure tenant. This ensures direct ownership of data, identity, and networking, while aligning with compliance and cost predictability.

## What Is AI Fabrix?

Fabrix is a modular enterprise AI platform that:

- **Deploys in-tenant on Azure** with private networking and Entra ID integration
- **Adds a Miso control layer** for governance, policy packs, and audit trails
- **Provides metadata-aware retrieval** across Microsoft 365, CRM/ERP, databases, and file systems
- **Orchestrates retrieval-augmented generation (RAG) pipelines** and AI agents with Flowise
- **Offers a secure UX** via OpenWebUI or existing tools like Teams/Slack
- **Enables extensibility** with SDKs and plugins, without vendor lock-in

## Why It Matters

Enterprises face recurring challenges in AI adoption:

- **Data security** — sensitive content must stay in-tenant and respect identity/permission models
- **Governance gap** — pilots often lack auditability, quotas, and policy enforcement
- **Integration overhead** — connecting SharePoint, CRM, ERP, and databases requires huge manual effort
- **Unpredictable costs** — uncontrolled SaaS usage derails scaling

Fabrix addresses these directly: in-tenant, policy-aware, extensible, and predictable.

## Synergy with Microsoft

Fabrix complements — not competes with — Microsoft technologies:

- **Uses Azure OpenAI and Azure AI Search** for LLMs and vector search
- **Integrates with SharePoint, Teams, Entra ID** for data and identity
- **Extends with Azure-native security** (Key Vault, Private Endpoints, ISO-27001 alignment)
- **Adds the missing enterprise features**: metadata filters, governance packs, Dev→Test→Prod lifecycle, observability

## Who Benefits

Fabrix is designed for:

- **CIOs & CTOs** needing strategic AI control
- **IT Managers & Architects** integrating AI into Microsoft and business systems
- **Compliance & Risk Leads** requiring policy enforcement and audits
- **Developers & Engineers** building AI agents and connectors in a governed framework

## Challenge We Solve

Enterprises want AI, but:

- **SaaS copilots** only solve personal productivity, not enterprise-wide adoption
- **Custom builds** require months of effort and lack compliance guardrails
- **Costs are unpredictable** and governance is missing

Fabrix closes this gap by being:

- **In-tenant by design** — no external SaaS exposure
- **Governed and observable** — policies, audits, quotas, telemetry
- **Extensible** — any LLM, multiple RAG pipelines, business metadata
- **Predictable** — subscription tiers + direct Azure billing

👉 **Without Fabrix**, enterprises risk stalled pilots, compliance blockers, and runaway costs.

👉 **With Fabrix**, enterprises scale AI securely, responsibly, and without limits.

## Getting Started

Ready to explore AI Fabrix? Start with our [Evaluation Guide](../evaluation/getting-started.md) to understand how AI Fabrix can meet your organization's needs.
