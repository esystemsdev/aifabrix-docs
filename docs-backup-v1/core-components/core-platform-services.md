# Core Platform Services — Metadata-Aware Retrieval & Connectors

Core Platform Services are the **engine of AI Fabrix**.
They handle ingestion, indexing, retrieval, and compliance-aware access to enterprise data.
This layer bridges your existing systems (Microsoft 365, CRM, ERP, databases, file shares) with AI pipelines — always respecting permissions and metadata.

## Table of Contents

1. [Role of Core Services](#role-of-core-services)
2. [Connectors & Ingestion](#connectors--ingestion)
3. [Metadata-Aware Retrieval](#metadata-aware-retrieval)
4. [Observability & Auditing](#observability--auditing)
5. [Security & Compliance Integration](#security--compliance-integration)
6. [Enterprise Benefits](#enterprise-benefits)

## Role of Core Services

The Core Services layer ensures that **data enters Fabrix securely, is enriched with metadata, and is retrievable in a policy-aware way**.
It provides:

- Standardized ingestion pipelines.
- Permission-aware indexing and search.
- Metadata tagging and enrichment.
- APIs for retrieval and orchestration (used by Flowise and OpenWebUI).

This creates a **governed foundation for retrieval-augmented generation (RAG)**.

## Connectors & Ingestion

Fabrix ships with **enterprise connectors** that sync and ingest content from:

- Microsoft 365 (SharePoint, Teams, Outlook).
- CRM/ERP platforms (Dynamics, SAP, Salesforce, etc.).
- HR & finance systems.
- SQL and NoSQL databases.
- File systems and cloud storage.

Features include:

- **Incremental sync / CDC** (where supported).
- **Folder-level metadata inheritance** for context-rich retrieval.
- **Governed deployment** — connectors are policy-controlled, centrally observable, and auditable.

This avoids "shadow integrations" and ensures every sync is IT-approved.

## Metadata-Aware Retrieval

The **metadata system** is what differentiates Fabrix from raw vector databases:

- Every document is indexed with **business metadata** (department, project, region, permissions, classification).
- Retrieval queries can filter on both **semantic similarity and metadata attributes**.
- Results are **policy-aware** — respecting Entra ID permissions, compliance flags, and egress rules.

This enables **precision RAG**: AI retrieves only what users are entitled to see, with business context intact.

## Observability & Auditing

Core Services provide full observability over data pipelines:

- **Sync & ingestion logs** for every connector.
- **Error tracking and retry mechanisms**.
- **Audit trails** — every query, result, and action logged.
- **Usage telemetry** to track adoption and costs.

This makes it possible to answer compliance questions like *"Who had access to what, and when?"*.

## Security & Compliance Integration

The Core layer is aligned with enterprise security standards:

- **Private networking** (VNet + private endpoints).
- **Azure Key Vault–managed secrets**.
- **ISO-27001 control alignment**.
- **Permission inheritance** from source systems (e.g., SharePoint ACLs flow into Fabrix).

No connector bypasses governance — everything runs under Miso's policies.

## Enterprise Benefits

By using Core Platform Services, enterprises gain:

- **Trusted Data Foundation:** All data indexed with metadata and permissions.
- **Policy-Aware Retrieval:** Safer than generic vector DBs.
- **Reduced Risk of Shadow IT:** Connectors are approved, observable, and governed.
- **Regulatory Alignment:** Retrieval and indexing respect compliance boundaries.

✅ [[PLACEHOLDER: Add diagram — Core Platform Services as the data and retrieval engine, sitting between source systems and RAG orchestration.]]
