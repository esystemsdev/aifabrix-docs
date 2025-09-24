
# Architecture Overview

## System Architecture

AI Fabrix is a **layered enterprise AI platform** running entirely inside the customer’s **Azure tenant**.
The system is designed to balance **innovation speed** with **regulatory compliance**, ensuring that pilots can move to production without hidden costs or security gaps.

High-level layers:

1. **Infrastructure & Security (Azure-native)** – VNet, Private Links, Key Vault, PostgreSQL, Redis, hardened containers.
2. **Control Layer (Miso)** – Central orchestration, identity, governance, and deployment automation.
3. **Core Services** – APIs, metadata filters, governance logic, and enterprise integrations.
4. **Application Layer** – Flowise for orchestration, OpenWebUI for user experience, custom enterprise apps and agents.
5. **Extension Layer** – SDK and plugin framework for developers and partners.

---

## Core Modules

* **Miso (Enterprise Controller)**
  Orchestrates deployment, enforces compliance, manages identities and audit trails.
* **Core Platform**
  APIs, metadata-driven retrieval, and integration with enterprise systems (CRM, ERP, HR, Finance).
* **Flowise**
  Workflow and orchestration engine for building AI-powered processes and use cases.
* **OpenWebUI**
  User interface for collaboration, chat, and case building across teams.
* **SDK & Plugins**
  Developer tools for extending the platform with connectors, custom logic, and workflows.
* **Mori (Internal)**
  Subscription and tenant management, not exposed to customers.

---

## Data Flow

1. **Ingestion** – Data enters Fabrix through connectors (SharePoint, Teams, CRM, ERP, etc.).
2. **Metadata Enrichment** – Data is tagged with metadata filters to ensure secure and relevant retrieval.
3. **Vectorization & Storage** – Documents and structured data are stored in PostgreSQL/pgvector with metadata.
4. **Retrieval** – Queries from Flowise/OpenWebUI filter data via metadata-aware retrieval.
5. **Execution** – Workflows and agents act on the data, optionally invoking external APIs or enterprise apps.
6. **Audit & Logging** – Every action is logged, monitored, and observable for compliance.

---

## Integration Points

* **Azure Services** – Key Vault, Entra ID (SSO, RBAC), Azure Front Door, App Service, Storage.
* **Enterprise Applications** – SharePoint, Teams, CRM, ERP, HR, Finance systems.
* **Developer Tools** – SDK for connector and plugin development.
* **Observability Systems** – Metrics, logs, audit pipelines into customer monitoring stack.

---

## Scalability Design

* **Environment Separation** – Dev → Test → Prod lifecycle with automated promotion and rollback.
* **Horizontal Scaling** – Containers auto-scale within App Service / AKS as workload increases.
* **Global Expansion** – Multi-region deployment supported by Azure Front Door and private networking.
* **Future-Proofing** – Modular design allows integration of multiple LLMs and emerging AI models.

---

## Security Architecture

* **Identity & Access** – Entra ID SSO, SCIM provisioning, RBAC inheritance.
* **Credential Management** – All secrets stored in Azure Key Vault, never exposed in pipelines or local machines.
* **Network Isolation** – Private networking and VNet integration prevent data leakage.
* **Compliance Alignment** – ISO-27001, HIPAA/GDPR-ready design for healthcare and regulated industries.
* **Governance & Audit** – Usage limits, quotas, egress controls, structured logs, audit trails.
* **Controlled AI Development** – All AI-assisted coding (e.g., Cursor) follows enterprise-approved pipelines with review, versioning, and compliance checks.