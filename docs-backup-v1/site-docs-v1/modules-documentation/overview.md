---
title: AI Fabrix Modules & Documentation
description: Comprehensive documentation for each AI Fabrix module covering governance, retrieval, orchestration, and developer tools
audience:
  - admin
  - architect
  - developer
  - end-user
version: stable
owner: platform-team
last_reviewed: '2025-01-15'
date: '2025-01-15'
toc: true
table_of_contents:
  - Purpose of This Section
  - What You'll Find in This Section
  - Key Value for Enterprises
  - Conclusion
custom_links:
  - text: Overview
    url: /docs/overview/
  - text: Evaluation Guide
    url: /docs/evaluation/
  - text: Core Components
    url: /docs/core-components/
  - text: Enterprise Features
    url: /docs/enterprise-features/
  - text: Use Cases
    url: /docs/use-cases/
  - text: Deployment & Operations
    url: /docs/deployment-operations/
  - text: Customer Success
    url: /docs/customer-success/
  - text: Roadmap
    url: /docs/roadmap/
  - text: Modules & Documentation
    url: /docs/modules-documentation/
    submenu:
      - text: Modules & Documentation Overview
        url: /docs/modules-documentation/overview/
      - text: Miso — Governance & Deployment
        url: /docs/modules-documentation/miso-governance-deployment/
      - text: Core Platform Services
        url: /docs/modules-documentation/core-platform-services/
      - text: Flowise Orchestration
        url: /docs/modules-documentation/flowise-orchestration/
      - text: OpenWebUI
        url: /docs/modules-documentation/openwebui/
      - text: SDK & Plugins
        url: /docs/modules-documentation/sdk-plugins/
seo:
  keywords:
    - AI Fabrix modules
    - platform documentation
    - governance
    - orchestration
    - developer tools
    - enterprise AI
  canonical_url: https://docs.aifabrix.ai/modules-documentation/overview
  og_image: images/modules-documentation-overview-preview.png
document360:
  category: Modules & Documentation
  visibility: public
  searchable: true
  featured: true
  order: 1
layout: doc
---

# Modules & Documentation

AI Fabrix is a modular platform. Each component has a specific role, from **governance and security** to **retrieval and orchestration**. This section provides structured documentation for each module, covering both **user-facing guidance** and **developer/operations practices**.

By separating into module-specific pages, enterprises can focus on the areas most relevant to their needs — whether it is configuring Entra ID for identity governance, building new connectors, or operating large-scale RAG pipelines.

## Table of Contents

1. [Miso — Governance & Deployment](miso-governance-deployment.md)
2. [Core Platform Services](core-platform-services.md)
3. [Flowise Orchestration](flowise-orchestration.md)
4. [OpenWebUI](openwebui.md)
5. [SDK & Plugins](sdk-plugins.md)

---

## Purpose of This Section

- Provide a **user manual** for administrators, developers, and end users.
- Deliver **operational guidance** for deployment, scaling, and compliance.
- Document **developer extension points** such as SDKs, plugins, and APIs.
- Ensure **governance, observability, and auditability** across all modules.

---

## What You'll Find in This Section

1. **Miso — Governance & Deployment**

   - Overview
   - Identity & Access (Entra ID, SCIM, RBAC)
   - Policy Packs & Quotas
   - Environment Lifecycle (Dev → Test → Prod)
   - Audit & Compliance Features
   - [[PLACEHOLDER: Operations Guide]]

2. **Core Platform Services**

   - Metadata-Aware Retrieval
   - Connectors (Microsoft 365, CRM, ERP, Databases, File Systems)
   - API Usage & Governance
   - Security Patterns (Private Endpoints, Key Vault)
   - [[PLACEHOLDER: Connector Development Guide]]

3. **Flowise Orchestration**

   - Overview of RAG Pipelines & Agents
   - Pipeline Design & Best Practices
   - Agent Governance & Structured Outputs
   - Monitoring & Debugging Flows
   - [[PLACEHOLDER: Flowise Developer Guide]]

4. **OpenWebUI**

   - Secure Chat & Collaboration UX
   - Case Building with Evidence
   - Workspace Management
   - Audit & Compliance in User Interfaces
   - [[PLACEHOLDER: Customization Guide]]

5. **SDK & Plugins**

   - Plugin Framework Overview
   - Server-Side Security Model
   - Dynamic Input & Schema Validation
   - Versioned Manifests & Canary Rollouts
   - [[PLACEHOLDER: Developer API Reference]]

---

## Key Value for Enterprises

- **Clarity:** Every module has its own documentation, eliminating guesswork in configuration.
- **Security:** Guides emphasize Azure-native deployment, Entra ID integration, and policy enforcement.
- **Scalability:** Dev → Test → Prod lifecycles are supported with governance baked in.
- **Extensibility:** Developers can safely extend Fabrix through SDKs and plugins.
- **Compliance:** Audit trails, quotas, and policy packs are documented as first-class features.

---

## Conclusion

The **Modules & Documentation** section acts as the **knowledge backbone** for AI Fabrix. It empowers IT teams, architects, and developers to deploy, operate, and extend Fabrix securely within their Azure tenant.

Each subpage builds on this foundation — providing the detailed instructions required to run Fabrix at enterprise scale.
