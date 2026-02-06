---
title: Upcoming Features
description: Near-term roadmap priorities for AI Fabrix connector expansion, SDK enhancements, and governance improvements
audience:
  - admin
  - architect
  - developer
  - end-user
version: stable
owner: product-team
last_reviewed: '2025-01-15'
date: '2025-01-15'
toc: true
table_of_contents:
  - Connector Expansion
  - SDK & Plugin Enhancements
  - Policy Pack Advancements
  - Observability & Economics
  - Release Planning
  - Summary
custom_links:
  - text: Roadmap
    url: /docs/roadmap/
    submenu:
      - text: Roadmap Overview
        url: /docs/roadmap/overview/
      - text: Upcoming Features
        url: /docs/roadmap/upcoming-features/
seo:
  keywords:
    - AI Fabrix
    - upcoming features
    - roadmap
    - connectors
    - SDK
    - governance
  canonical_url: https://docs.aifabrix.ai/roadmap/upcoming-features
  og_image: images/upcoming-features.png
document360:
  category: Roadmap
  visibility: public
  searchable: true
  featured: true
  order: 1
layout: doc
---

# Upcoming Features

AI Fabrix is continuously enhanced to close enterprise gaps in **retrieval-augmented generation (RAG)**, governance, and integration. This roadmap outlines the near-term priorities designed to strengthen the platform's value for CIOs, IT leaders, and enterprise architects.

## Table of Contents

1. [Connector Expansion](#connector-expansion)
2. [SDK & Plugin Enhancements](#sdk--plugin-enhancements)
3. [Policy Pack Advancements](#policy-pack-advancements)
4. [Observability & Economics](#observability--economics)
5. [Release Planning](#release-planning)
6. [Summary](#summary)

---

## Connector Expansion

Fabrix will broaden its **connector ecosystem** beyond Microsoft 365, ensuring enterprises can integrate AI pipelines with critical business systems:

- **ERP Systems:** SAP, Dynamics 365 Finance & Operations, Oracle.
- **HR Platforms:** Workday, SuccessFactors, Dynamics HR.
- **Finance Systems:** Netsuite, Dynamics 365 Finance, industry-specific accounting solutions.
- **Databases:** Broader support for SQL/NoSQL systems and data warehouses.

These connectors will support **metadata inheritance, permission mapping, and policy enforcement** out of the box.

---

## SDK & Plugin Enhancements

The **developer SDK** is a strategic area of growth:

- **Plugin Validation Framework:** Automated contract testing to ensure plugins comply with enterprise policies.
- **Versioned Manifests:** Allow safe rollbacks and canary releases.
- **Testing Tooling:** Local sandbox for plugin development with schema validation.
- **Secure Execution Model:** Guarantee server-side credential handling without exposing secrets in client apps.

This allows enterprise developers to safely extend Fabrix without compromising governance or compliance.

---

## Policy Pack Advancements

Governance remains a **first-class feature** of Fabrix. Upcoming updates include:

- **Data Residency Packs:** Enforce geographical storage and processing policies.
- **Advanced Quota Management:** Fine-grained quotas on embeddings, tokens, or API calls.
- **Customizable Guardrails:** Define enterprise-specific compliance rules that flow across environments (Dev → Test → Prod).

---

## Observability & Economics

New capabilities are planned to improve **operational visibility and cost predictability**:

- **Cost Forecasting Dashboards** integrated with Azure billing data.
- **Usage Heatmaps** for tracing workload spikes.
- **Environment Comparisons** to assess scaling needs across Dev, Test, and Production.

---

## Release Planning

[[PLACEHOLDER: Add quarterly timeline and feature release milestones once available]]

---

## Summary

The upcoming features roadmap ensures Fabrix continues to deliver **secure, governed, and scalable AI**—helping enterprises move beyond pilots to full production with confidence.
