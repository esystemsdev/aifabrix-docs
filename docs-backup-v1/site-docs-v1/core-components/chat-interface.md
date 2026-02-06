---
title: Chat Interface — Microsoft Teams, Slack & Beyond
description: Integration of AI Fabrix with Microsoft Teams, Slack, and other collaboration platforms
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
  - Role of Chat Interfaces
  - Microsoft Teams Integration
  - Slack Integration
  - Beyond Teams & Slack
  - Security & Governance
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
      - text: Chat Interface
        url: /docs/core-components/chat-interface/
seo:
  keywords:
    - AI Fabrix
    - chat interface
    - Microsoft Teams
    - Slack
    - collaboration
    - ChatOps
  canonical_url: https://docs.aifabrix.ai/core-components/chat-interface
  og_image: images/chat-interface.png
document360:
  category: Core Components
  visibility: public
  searchable: true
  featured: true
  order: 6
layout: doc
---

# Chat Interface — Microsoft Teams, Slack & Beyond

The Chat Interface is the **frontline access point** for AI Fabrix in everyday work.
While **OpenWebUI** provides the native, secure, and case-oriented experience, Fabrix is **not limited to one interface**.
Through its open architecture, Fabrix integrates seamlessly with **Microsoft Teams, Slack, and other collaboration platforms**, enabling AI to meet employees where they already work.

## Table of Contents

1. [Role of Chat Interfaces](#role-of-chat-interfaces)
2. [Microsoft Teams Integration](#microsoft-teams-integration)
3. [Slack Integration](#slack-integration)
4. [Beyond Teams & Slack](#beyond-teams--slack)
5. [Security & Governance](#security--governance)
6. [Enterprise Benefits](#enterprise-benefits)

## Role of Chat Interfaces

Chat interfaces make Fabrix **immediately accessible to employees**:

- No need to log into a new system.
- AI assistants are available inside tools already in daily use.
- Ideal for **internal use cases** such as project discussions, compliance checks, or sales opportunity reviews.

This demonstrates Fabrix's **openness and adaptability** — it's not locked to one UI, but fits into the enterprise ecosystem.

## Microsoft Teams Integration

AI Fabrix integrates with Microsoft Teams to:

- Deliver **chatbots and assistants** directly in Teams channels or 1:1 chats.
- Respect **Entra ID permissions**, ensuring responses are policy-aware.
- Link results back to **SharePoint and Teams files**, keeping context in Microsoft 365.
- Support **adaptive cards** and structured responses for business workflows.

This makes Teams a natural channel for **governed enterprise AI**.

## Slack Integration

For organizations using Slack, Fabrix provides:

- **Secure AI assistants** embedded in Slack channels.
- **Case handover** between Slack and OpenWebUI for structured workflows.
- Integration with **business metadata** (e.g., customer ID, project tags) to keep retrieval context-rich.

Slack becomes a productivity accelerator — without bypassing governance.

## Beyond Teams & Slack

Thanks to the **SDK & Plugin framework**, Fabrix can extend into:

- **Other chat platforms** (e.g., Mattermost, Google Chat).
- **Enterprise portals** (e.g., intranets, ticketing systems).
- **Custom line-of-business applications**.

This flexibility means enterprises can integrate Fabrix **anywhere employees communicate or act on information**.

## Security & Governance

Even when accessed through Teams or Slack, Fabrix enforces:

- **Identity integration** via Entra ID.
- **Policy packs** from Miso (quotas, egress rules, logging).
- **Audit trails** for every query and response.
- **Data residency in Azure** — no SaaS detours, even if the interface is external.

This ensures the same **security posture** across all entry points.

## Enterprise Benefits

By extending Fabrix into Teams, Slack, and beyond, organizations gain:

- **User Adoption:** AI embedded in existing workflows.
- **Flexibility:** Not tied to a single UI.
- **Governed Experience:** All responses stay permission- and policy-aware.
- **Faster ROI:** Employees use AI without switching tools.

✅ [[PLACEHOLDER: Add diagram — Chat Interfaces (Teams, Slack, OpenWebUI) all connecting into Flowise pipelines and Core Services, governed by Miso.]]
