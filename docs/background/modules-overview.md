
# Modules Overview

## AI Fabrix Core

The **Core module** provides the foundational services of the platform:

* Metadata-aware retrieval for enterprise data.
* Integration with business-critical systems (SharePoint, Teams, CRM, ERP, HR, Finance).
* Governance, auditing, and logging of all data operations.
* APIs and interfaces for connectors, workflows, and external systems.

This module ensures that AI queries and applications are always **context-rich, compliant, and auditable**.

---

## Miso

**Miso** is the **control and deployment layer** of AI Fabrix.

* Automates Azure-based provisioning (Dev → Test → Prod).
* Manages identity and access through Entra ID, SCIM, and RBAC inheritance.
* Enforces compliance (ISO-27001, GDPR, HIPAA alignment).
* Centralizes audit trails and operational observability.

Miso ensures **secure-by-default deployment** and **enterprise-grade governance** across all environments.

---

## Flowise

The **Flowise module** orchestrates workflows and integrations:

* Graphical builder for AI workflows and connectors.
* Orchestration of data flows between systems and vectorized knowledge bases.
* Support for metadata-aware retrieval augmented generation (RAG).
* Foundation for building AI-powered agents, copilots, and business-specific automations.

Flowise is the **integration fabric** of AI Fabrix, enabling repeatable, scalable workflows.

---

## OpenWebUI

**OpenWebUI** provides the **user experience layer**:

* Secure, role-based chat and collaboration interface.
* Case-builder for team-based AI projects.
* Multi-workspace support with Entra ID group-based roles.
* Visualization tools for conversations, context, and workflow execution.

This is the **primary interaction point** for end users, designed for usability without compromising compliance.

---

## Additional Modules

* **SDK**
  Developer toolkit for building and testing connectors, plugins, and workflows. Includes schema validation, packaging, and CI/CD integration.

* **Plugins**
  Flowise Enterprise Plugin Framework. Enables safe, server-side execution of community and enterprise connectors with dynamic schemas.

* **Mori (Internal)**
  Backend for subscription, tenant management, and billing. Used internally for customer lifecycle operations, not exposed to customers.

---

## Module Interactions

* **Miso** provisions and secures the environment.
* **Core** manages data retrieval, enrichment, and compliance controls.
* **Flowise** orchestrates workflows using Core APIs and metadata.
* **OpenWebUI** exposes workflows and collaboration tools to end users.
* **SDK & Plugins** extend Flowise and Core with new integrations.
* **Mori** supports subscription management in the background.

Together, these modules form a **layered architecture** that balances extensibility with enterprise trust.

---

## Module Responsibilities

* **Core** – Secure data access, metadata enrichment, APIs.
* **Miso** – Deployment, governance, compliance, observability.
* **Flowise** – Workflow orchestration, integrations, RAG pipelines.
* **OpenWebUI** – End-user interface and collaboration features.
* **SDK** – Developer enablement and extensibility.
* **Plugins** – Connector and extension ecosystem.
* **Mori (Internal)** – Subscription and tenant lifecycle management.

flowchart TD
  %% Layered view of AI Fabrix modules and interactions

  %% Infrastructure & Security
  subgraph L0[Azure Infrastructure & Security]
    KV[Azure Key Vault]
    VNet[VNet + Private Links]
    MI[Managed Identities]
    PG[PostgreSQL / pgvector]
    REDIS[Redis]
    LOG[Observability: Logs & Metrics]
  end

  %% Control Layer
  subgraph L1[Miso — Control & Deployment Layer]
    MISO[Miso Controller\n(Provisioning • Identity • Governance • Audit)]
  end

  %% Core Platform
  subgraph L2[AI Fabrix Core — Platform Services]
    CORE[Core APIs & Services\n(Metadata Filters • Governance • Policy)]
    INTEG[Enterprise Connectors\n(SharePoint • Teams • CRM • ERP • HR • Finance)]
  end

  %% Workflow / Orchestration
  subgraph L3[Flowise — Workflow & Orchestration]
    FLOW[Flow Orchestrator\n(Agents • RAG • Automations)]
  end

  %% UX Layer
  subgraph L4[OpenWebUI — UX]
    WEBUI[Secure UI\n(Chat • Case Builder • Collaboration)]
  end

  %% Extensibility
  subgraph L5[Extensibility]
    SDK[Developer SDK & CLI]
    PLUG[Plugin Framework\n(Safe Server-Side Connectors)]
  end

  %% Internal Ops
  subgraph L6[Mori — Internal Operations]
    MORI[Subscription & Tenant Mgmt\n(Billing • Usage)]
  end

  %% Data sources (external systems)
  subgraph DS[Enterprise Data Sources]
    SP[SharePoint]
    TEAMS[Teams]
    CRM[CRM]
    ERP[ERP]
    HR[HR]
    FIN[Finance]
  end

  %% Identity
  IDP[Entra ID (SSO, RBAC, SCIM)]

  %% Primary flows
  WEBUI -->|User actions / prompts| FLOW
  FLOW -->|Metadata-aware retrieval & policies| CORE
  CORE -->|Read/Write| PG
  CORE -->|Cache| REDIS
  CORE -->|Governed access| INTEG
  INTEG --> SP
  INTEG --> TEAMS
  INTEG --> CRM
  INTEG --> ERP
  INTEG --> HR
  INTEG --> FIN

  %% Control & governance
  MISO -->|Provision & Configure| CORE
  MISO -->|Provision & Configure| FLOW
  MISO -->|Provision & Configure| WEBUI
  MISO -->|Secrets & Policies| KV
  MISO -->|Network & Private Endpoints| VNet
  MISO -->|Attach Identities| MI
  MISO -->|Audit & Telemetry| LOG

  %% Identity and access
  IDP -->|SSO / RBAC| WEBUI
  IDP -->|Service & App Identities| MISO
  IDP -->|Service AuthZ| CORE
  IDP -->|Operator Access| FLOW

  %% Extensibility paths
  SDK -. Builds/Tests .-> PLUG
  PLUG -. Extends .-> FLOW
  PLUG -. Extends .-> CORE

  %% Internal ops
  MORI -->|Tenant/Subscription Metadata| MISO
  MORI -->|Usage & Billing Signals| LOG

  %% Visual grouping notes (no edges)
  classDef infra fill:#f5f7fa,stroke:#c7d0dc,color:#1f2a37;
  classDef control fill:#eef6ff,stroke:#93c5fd,color:#1e3a8a;
  classDef core fill:#f0fdf4,stroke:#86efac,color:#065f46;
  classDef flow fill:#fff7ed,stroke:#fdba74,color:#7c2d12;
  classDef ui fill:#fef2f2,stroke:#fca5a5,color:#7f1d1d;
  classDef ext fill:#f5f3ff,stroke:#c4b5fd,color:#3730a3;
  classDef ops fill:#f8fafc,stroke:#cbd5e1,color:#0f172a;

  class KV,VNet,MI,PG,REDIS,LOG infra
  class MISO control
  class CORE,INTEG core
  class FLOW flow
  class WEBUI ui
  class SDK,PLUG ext
  class MORI ops