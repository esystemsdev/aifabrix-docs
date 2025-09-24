
# Technology Stack

AI Fabrix is engineered to run entirely inside the customer’s Azure tenant with a modular, cloud-native stack. The platform favors open standards (OpenAPI, OpenTelemetry, SCIM, OAuth2/OIDC) and a plugin-first approach to integrations.

## Azure Services

* **Network & Edge**

  * Azure Virtual Network (VNet), Private Endpoints, Private DNS
  * Azure Front Door (global entry), Azure Application Gateway (L7)
* **Identity & Secrets**

  * Microsoft Entra ID (SSO, RBAC), SCIM provisioning
  * Azure Key Vault (keys, secrets, certificates)
* **Compute & Containers**

  * Azure App Service / Container Apps (default)
  * Azure Kubernetes Service (AKS) for large-scale or regulated workloads
  * Azure Container Registry (ACR)
* **Data & Storage**

  * Azure Database for PostgreSQL Flexible Server (pgvector)
  * Azure Cache for Redis
  * Azure Storage (Blob, Files) for artifacts and document stores
* **AI & Search**

  * Azure OpenAI Service (optional GPT family and embeddings)
  * Azure AI Search (optional hybrid with pgvector)
* **Monitoring & Security**

  * Azure Monitor, Log Analytics, Application Insights
  * Microsoft Defender for Cloud, Microsoft Sentinel (optional)

## AI/ML Technologies

* **LLM Access**

  * Azure OpenAI or OpenAI (managed foundation models)
  * Optional: model gateways (e.g., vLLM/Ollama) in private clusters where required
* **RAG & Reasoning**

  * Flowise pipelines for retrieval-augmented generation
  * Metadata-aware retrieval (policy filters, permissions context)
* **Embeddings & Vector Ops**

  * Azure OpenAI or OpenAI embeddings
  * pgvector in PostgreSQL as primary vector store; optional Azure AI Search vectors
* **Safety & Governance**

  * Prompt governance patterns, guardrails, audit of model inputs/outputs

## Database Technologies

* **Relational & Vector**

  * PostgreSQL (transactional data, configuration, audit) + pgvector (semantic index)
* **Cache & Queues**

  * Azure Cache for Redis (sessions, conversation state, short-lived context)
  * Azure Storage Queues / Event Grid or Service Bus (asynchronous orchestration)
* **Document Storage**

  * Azure Blob Storage (ingested files, embeddings artifacts, exports)

## Frontend Technologies

* **User Interface**

  * OpenWebUI (hardened for enterprise deployment)
  * React-based components, role-aware UX (RBAC via Entra ID groups)
* **Design System**

  * Tailwind CSS and utility-class theming for admin/operator consoles
  * Accessibility and enterprise theming support

## Backend Technologies

* **Core & Services**

  * Node.js/TypeScript services for Core APIs and plugin runtime
  * Python for selected connectors and data preparation tasks (where appropriate)
* **Miso (Control Layer)**

  * Controller services for identity, policy, provisioning (Bicep-based orchestration)
  * Policy-as-code for environment promotion (Dev → Test → Prod)
* **APIs**

  * OpenAPI/JSON Schema contracts; OAuth2/OIDC; SCIM for user/group lifecycle
* **Packaging**

  * Containerized microservices; IaC-driven release artifacts

## Integration Technologies

* **Enterprise Connectors**

  * Microsoft Graph (SharePoint/OneDrive/Teams/Users/Groups)
  * Dynamics 365/Dataverse, SAP (OData/REST), Salesforce, ServiceNow, Jira
  * CRM/ERP/HR/Finance systems via REST, OData, Webhooks
* **Plugin Framework**

  * Flowise Enterprise Plugin Framework (server-side execution only)
  * Developer SDK with dynamic fields, dependent pickers, output schemas
* **Data Ingestion**

  * SharePoint REST/Graph for hierarchical metadata and document sync
  * Webhooks/Event Grid for event-driven flows

## Development Tools

* **Source & CI/CD**

  * GitHub (Repos, Actions), GitHub Container Registry/ACR
  * IaC with **Bicep** (reference) and optional Terraform (customer choice)
* **Build & Local Dev**

  * Docker/Compose, Node.js/TypeScript toolchain, Python venv/poetry (where used)
  * Cursor-guided development rules (governed AI coding, review gates)
* **Release Management**

  * Environment promotion workflows, policy checks, SBOM generation

## Monitoring and Observability

* **Telemetry**

  * OpenTelemetry instrumentation (traces/metrics/logs)
  * Azure Monitor & Application Insights dashboards and alerts
* **Security & Compliance**

  * Centralized audit logs (immutable retention policies)
  * Defender for Cloud posture checks; Sentinel analytics and playbooks (optional)
* **Operational Health**

  * Health endpoints, structured logs, workload SLOs/SLAs
  * Cost observability (per-service tagging, chargeback/FinOps readiness)