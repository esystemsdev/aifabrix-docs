# Multi-Cloud & Hybrid Support

While AI Fabrix is optimized for **in-tenant Azure deployment**, many enterprises operate in **hybrid or multi-cloud environments**. The roadmap includes extending Fabrix to support these complex infrastructures without losing its core strengths: **governance, compliance, and predictable economics**.

## Table of Contents

1. [Why Multi-Cloud Matters](#why-multi-cloud-matters)
2. [Hybrid Cloud Scenarios](#hybrid-cloud-scenarios)
3. [Multi-Cloud Governance](#multi-cloud-governance)
4. [Technical Direction](#technical-direction)
5. [Release Planning](#release-planning)
6. [Summary](#summary)

---

## Why Multi-Cloud Matters

Enterprises often distribute workloads across multiple environments for:

- **Regulatory Requirements:** Certain workloads must run in specific jurisdictions or infrastructures.
- **Resilience:** Reduce vendor dependency and ensure business continuity.
- **Business Units:** Different divisions may standardize on different clouds or on-prem systems.

Fabrix will evolve to unify these diverse environments under **a single governance and control plane**.

---

## Hybrid Cloud Scenarios

Planned hybrid use cases include:

- **On-Premise + Azure:** Extending Fabrix to securely integrate with on-prem data centers.
- **Edge Deployments:** Running retrieval and inference pipelines close to where data is generated.
- **Private Cloud Integration:** Support for sovereign or industry-specific private cloud models.

---

## Multi-Cloud Governance

Fabrix will provide **consistent guardrails** across distributed deployments:

- **Unified Policy Packs:** Enforce egress restrictions, quotas, and compliance regardless of location.
- **Centralized Identity & Access:** Extend Entra ID and SCIM provisioning to hybrid and non-Azure environments.
- **Audit Trail Federation:** Consolidate compliance logs across clouds into enterprise SIEM systems.

---

## Technical Direction

Future enhancements will include:

- **Cross-Cloud Connectors:** Governed ingestion from AWS S3, GCP storage, and third-party SaaS platforms.
- **Federated Vector Search:** Querying embeddings stored across distributed infrastructures.
- **Global Orchestration Layer:** Coordinating RAG pipelines spanning Azure, other clouds, and on-premise data sources.

---

## Release Planning

[[PLACEHOLDER: Add timeline for multi-cloud and hybrid features, including pilot customer programs.]]

---

## Summary

Multi-cloud and hybrid support will enable Fabrix to act as a **unified enterprise AI fabric**, extending governance, retrieval, and orchestration across heterogeneous infrastructures. This ensures that customers can scale securely, wherever their data and workloads reside.
