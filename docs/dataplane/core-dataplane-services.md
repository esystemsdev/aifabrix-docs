# Core Dataplane Services

**Shared services that make AI permission-aware and production-ready**

Beyond integration execution, the Dataplane provides core services that ensure data is contextual, governed, and suitable for AI consumption.

---

## Enterprise Metadata Model

All data entering the Dataplane is normalized into a structured metadata model:

* Business-aligned dimensions
* Typed attributes
* Lineage and provenance tracking

Access emerges from metadata structure. If data does not belong to a user context, it does not appear in results.

---

## Permission-Aware Retrieval (RAG)

Retrieval services enforce identity and metadata filtering before data reaches AI.

Capabilities include:

* Identity-scoped queries
* Mandatory metadata filters
* ABAC evaluation
* Deterministic result scoping

AI never receives raw, unfiltered system payloads.

---

## Vector Search with Metadata Filtering

Vector similarity search operates together with enforced metadata constraints:

* Similarity ranking
* Identity-derived filtering
* Dimension-based scoping

This prevents semantic leakage across permission boundaries.

---

## Delta Sync and Change Data Capture (CDC)

The Dataplane supports structured synchronization patterns:

* Full synchronization
* Incremental updates
* Content-based change detection

This ensures predictable refresh cycles and efficient updates.

---

## Structured and Unstructured Ingestion

Supported ingestion types include:

* Structured business records (CRM, ERP)
* Document storage systems
* Hybrid datasets

All ingestion converges into the same metadata and governance model.

---

## Secure Runtime and Network Egress Control

Execution is governed by:

* Azure networking controls
* Environment isolation
* Explicit egress policies
* Fail-closed enforcement behavior

No outbound access is permitted unless explicitly allowed by policy.

---

These services collectively ensure that enterprise data becomes AI-ready without compromising identity, governance, or auditability.
