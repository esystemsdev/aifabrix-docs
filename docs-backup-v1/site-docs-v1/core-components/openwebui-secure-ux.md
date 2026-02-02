---
title: OpenWebUI — Secure UX for Chat & Case Building
description: Secure user interface for chat and case building workflows
audience:
  - end-user
  - admin
  - developer
version: stable
owner: platform-team
last_reviewed: '2025-01-15'
date: '2025-01-15'
toc: true
table_of_contents:
  - Role of OpenWebUI
  - Enterprise Chat Experience
  - Case Building & Collaboration
  - Integration with Microsoft 365
  - Security & Compliance Features
  - Enterprise Benefits
custom_links:
  - text: Core Components
    url: /docs/core-components/
    submenu:
      - text: Miso — Governance & Deployment
        url: /docs/core-components/miso-governance/
      - text: Core Platform Services
        url: /docs/core-components/core-platform-services/
      - text: Flowise — Orchestration
        url: /docs/core-components/flowise-orchestration/
      - text: OpenWebUI — Secure UX
        url: /docs/core-components/openwebui-secure-ux/
      - text: SDK & Plugins
        url: /docs/core-components/sdk-plugins/
seo:
  keywords:
    - AI Fabrix
    - OpenWebUI
    - secure UX
    - chat
    - case building
  canonical_url: https://docs.aifabrix.ai/core-components/openwebui-secure-ux
  og_image: images/openwebui-secure-ux.png
document360:
  category: Core Components
  visibility: public
  searchable: true
  featured: true
  order: 4
layout: doc
---

# OpenWebUI — Secure UX for Chat & Case Building

OpenWebUI is the **user interface layer** of AI Fabrix.
It provides a secure, enterprise-ready workspace for employees to interact with AI — whether through chat, case building, or collaborative knowledge work.
Unlike consumer-grade chat tools, OpenWebUI is identity-aware, policy-enforced, and auditable by design.

## Table of Contents

1. [Role of OpenWebUI](#role-of-openwebui)
2. [Enterprise Chat Experience](#enterprise-chat-experience)
3. [Case Building & Collaboration](#case-building--collaboration)
4. [Integration with Microsoft 365](#integration-with-microsoft-365)
5. [Security & Compliance Features](#security--compliance-features)
6. [Enterprise Benefits](#enterprise-benefits)

## Role of OpenWebUI

OpenWebUI is the **front door for users** into Fabrix.
It connects employees to:

- Policy-aware retrieval pipelines.
- AI assistants and agents orchestrated via Flowise.
- Business case workspaces and collaboration tools.

All interactions are governed by the policies and identity integrations provided by Miso.

## Enterprise Chat Experience

OpenWebUI provides a **secure chat interface** where users can:

- Ask questions across enterprise knowledge bases.
- Receive responses filtered by metadata, permissions, and compliance rules.
- Interact with AI agents designed for specific business domains (e.g., sales, HR, IT).

Unlike public chatbots, Fabrix ensures that **users only see what they are authorized to see**.

## Case Building & Collaboration

Beyond chat, OpenWebUI supports **case building**:

- Users can collect conversations, documents, and evidence into structured cases.
- Cases can be shared across departments for cross-functional work.
- Links to CRM records, SharePoint folders, and project metadata are preserved.

This makes Fabrix suitable for **regulated industries** where traceability and evidence matter (e.g., legal, compliance, project delivery).

## Integration with Microsoft 365

OpenWebUI complements Microsoft's collaboration tools:

- **SharePoint & Teams:** Results and evidence link directly back to Microsoft 365 content.
- **Entra ID:** Access follows existing user roles and permissions.
- **Azure Monitor & Sentinel:** Audit and security logs integrate with Microsoft monitoring.

This ensures Fabrix feels like a **natural extension of Microsoft 365**, not a competing platform.

## Security & Compliance Features

OpenWebUI is designed for enterprise trust:

- **SSO via Entra ID** — no separate accounts.
- **Audit Logging** — every query and case action is traceable.
- **Policy Enforcement** — egress, quotas, and permissions inherited from Miso.
- **Data Residency** — all operations remain inside the customer's Azure tenant.

These controls make it viable for GDPR, HIPAA, ISO-27001, and similar frameworks.

## Enterprise Benefits

With OpenWebUI, organizations gain:

- **Secure Chat for Enterprise Knowledge.**
- **Structured Case Management.**
- **Deep Microsoft 365 Integration.**
- **Audit-Ready Collaboration.**

It transforms AI from an **isolated chatbot** into a **collaborative enterprise assistant** that fits regulated business processes.

✅ [[PLACEHOLDER: Add diagram — OpenWebUI as the user-facing layer, connecting chat, case building, and collaboration to Flowise pipelines and Core Services.]]
