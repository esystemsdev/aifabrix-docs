---
title: Identity & Access Management
description: Comprehensive identity and access framework extending Microsoft Entra ID for AI Fabrix
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
  - Entra ID Integration
  - SCIM Provisioning
  - Role-Based Access Control (RBAC)
  - Benefits
  - Conclusion
custom_links:
  - text: Enterprise Features
    url: /docs/enterprise-features/
    submenu:
      - text: Enterprise Features Overview
        url: /docs/enterprise-features/overview/
      - text: Identity & Access Management
        url: /docs/enterprise-features/identity-access-management/
      - text: Security & Compliance
        url: /docs/enterprise-features/security-compliance/
seo:
  keywords:
    - AI Fabrix
    - identity
    - access management
    - Entra ID
    - SCIM
    - RBAC
    - SSO
  canonical_url: https://docs.aifabrix.ai/enterprise-features/identity-access-management
  og_image: images/identity-access-management.png
document360:
  category: Enterprise Features
  visibility: public
  searchable: true
  featured: true
  order: 2
layout: doc
---

# Identity & Access Management

AI Fabrix extends Microsoft Entra ID with a **comprehensive identity and access framework** that ensures AI workflows are as secure and compliant as any other enterprise system. Identity and role management are not optional add-ons—they are **built into the platform** through the Miso control layer.

## Table of Contents

1. [Entra ID Integration](#entra-id-integration)
2. [SCIM Provisioning](#scim-provisioning)
3. [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
4. [Benefits](#benefits)
5. [Conclusion](#conclusion)

## Entra ID Integration

- **Single Sign-On (SSO):** All Fabrix services integrate natively with Entra ID, ensuring users authenticate with their existing enterprise identity.
- **Federated Access:** External partners or contractors can be provisioned with the same identity policies, without bypassing enterprise security.
- **Conditional Access:** Enterprises can enforce location, device, or risk-based authentication before accessing AI workflows.

## SCIM Provisioning

- **Automated User & Group Sync:** Fabrix supports **SCIM (System for Cross-domain Identity Management)** to synchronize users and groups directly from Entra ID.
- **Lifecycle Management:** Onboarding, role changes, and offboarding are automatically reflected in Fabrix workspaces.
- **Cross-Workspace Roles:** Users can inherit access policies across multiple Fabrix environments (Dev, Test, Prod).

## Role-Based Access Control (RBAC)

- **Granular Permissions:** Access can be limited to connectors, pipelines, or data stores.
- **Inherited Policies:** Fabrix workflows inherit the same RBAC policies defined in Entra ID, ensuring consistency with enterprise IT.
- **Workspace Separation:** Developers, operators, and business users can be assigned distinct roles that prevent privilege creep.

## Benefits

By integrating with Entra ID and extending it with SCIM and RBAC, Fabrix ensures:

- Identity policies are consistent with enterprise standards.
- AI workflows are never isolated from core IT governance.
- Security audits can confirm that only the right users had access at the right time.

## Conclusion

Identity and access management in Fabrix means **no parallel identity silo** is created. Instead, AI adoption follows the same proven identity model the enterprise already trusts—**with automation and policy inheritance built in**.
