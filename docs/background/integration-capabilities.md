
# Integration Capabilities

AI Fabrix provides a **governed integration fabric** for enterprise systems and data. Connectors run **inside the customer’s Azure tenant**, enforce **Entra ID / RBAC**, and respect **metadata-aware retrieval** so applications and agents only access data they are entitled to use.

---

## API Integration

**Scope**

* **REST/HTTP** (JSON), **GraphQL**, and **SOAP** (legacy).
* OAuth2, API keys (stored in **Azure Key Vault**), mTLS where required.
* Pagination, rate-limit backoff, idempotency keys, and retry/circuit-breaker policies.

**Capabilities**

* Request signing, custom headers, HMAC verification.
* OpenAPI import for typed requests/responses and automatic schema validation.
* Webhook endpoints with verification secrets and replay protection.
* Fine-grained **egress controls**: allowlists per connector, per-environment quotas.

---

## Database Integration

**Supported patterns**

* Federated read via service accounts with **least privilege**.
* Batch extract and **CDC** (change data capture) where sources support it.
* Caching via Redis; vectorization into PostgreSQL/pgvector when required.

**Common engines**

* Azure SQL / SQL Server, PostgreSQL, MySQL, Oracle.
* Data warehouses (read patterns): Azure Synapse, Snowflake, BigQuery (via APIs).

**Controls**

* Connection pooling, read-only roles, masked views for PII/PHI.
* Network isolation using Private Endpoints or self-hosted runners.

---

## File System Integration

**Sources**

* SharePoint, OneDrive, Teams Files, Azure Blob/Files; SFTP for legacy file drops.

**Document processing**

* Incremental crawls based on modified/created timestamps.
* File-type filters (.docx, .pptx, .pdf, .txt, .xlsx, .csv, etc.).
* **Inherited folder metadata** (e.g., Deal Name, HubSpot ID) merged into file records.
* OCR where needed; text/metadata extraction pipelines with retry and dead-letter queues.

**Security**

* Source-permission checks on retrieval; metadata tags drive access control in RAG.

---

## Cloud Service Integration

**Azure-first**

* Entra ID (SSO, SCIM), Key Vault, Storage, App Service/Container Apps, Front Door.
* Microsoft Graph for M365 (users, groups, files, calendars).

**Other clouds**

* AWS/GCP services accessed through API connectors or private routing.
* Consistent audit schema and egress policies across providers.

---

## Third-Party Integrations

**Business apps**

* CRM/ERP/HR/Finance platforms (e.g., Dynamics 365, Salesforce, SAP, Workday, NetSuite, HubSpot).
* ITSM/Support tools (ServiceNow, Jira, Zendesk).
* Collaboration (Teams, Slack) for message/file ingestion under RBAC.

**Approach**

* Server-side connectors (no browser tokens) with typed inputs/outputs.
* Per-connector policy packs: rate limits, payload size caps, PII scrubbing rules.
* Observability: per-call logs, correlation IDs, metrics (latency, throughput, errors).

---

## Custom Connectors

**SDK & Plugin Framework**

* Clean, developer-friendly SDK with **dynamic input fields**, dependent pickers, and output schemas.
* Safe execution model (containerized, server-side only); no credentials in code—**Key Vault** required.
* Versioned manifests, semantic versioning, and canary rollout support.

**Developer experience**

* Local test harness and contract tests.
* CI/CD templates for build, sign, scan, and publish to internal catalog.
* Linting for policy compliance (egress, secrets, PII handling).

---

## Integration Patterns

* **Event-driven**: webhooks/queues trigger Flowise workflows; sub-second SLA where supported.
* **Batch**: scheduled extractions, transformations, and vectorization.
* **CDC**: stream updates into search/vector stores; reconcile with source-of-truth keys.
* **Federated read (“zero-copy”)**: query on demand with source permissions; cache where allowed.
* **RAG with metadata filters**: retrieve only documents the caller is entitled to see.
* **Human-in/on-the-loop**: approvals, exception handling, and reversible actions.

---

## Data Synchronization

**Strategies**

* **Full load → incremental**: initial backfill, then delta by timestamp or CDC.
* **Key-based upsert**: stable IDs map to source objects; conflict resolution via version/ETag.
* **Schema evolution**: additive fields handled automatically; breaking changes flagged in CI.

**Quality & lineage**

* Checksums and record counts per batch; drift detection vs. source.
* End-to-end lineage: source → transform → index/vector → consumer workflow.
* Rollback plans and replayable jobs from durable queues.

**Governance**

* Data minimization and retention policies per dataset.
* PII/PHI tagging, masking, and allow/deny lists enforced at connector and query-time.