# Controller Layer (Miso)

**Governance, identity, policy, and lifecycle**

Miso is the **Controller layer** of AI Fabrix. It is the platform control plane responsible for:

- **Identity & access** (who can do what)
- **Policy & governance** (what is allowed and under which constraints)
- **Environment lifecycle** (how configurations are promoted and controlled)
- **Audit & observability** (how actions are recorded and evidenced)

### Control Plane vs Data Plane

AI Fabrix is intentionally split into:

- **Controller (Miso):** governs identity, policy, lifecycle, and evidence.
- **Dataplane:** executes integrations and processes business payloads (CIP and dataplane runtime).

This separation ensures governance is **structural**, not re-implemented in each app, agent, or integration.

### Why the Controller never touches business data

Miso is designed so it **does not handle business payloads**. Instead, it:

- Issues and validates identity context (Entra ID claims, groups, roles)
- Applies governance decisions (policies, quotas, allowed endpoints)
- Controls environments (dev/test/prod) and deployment promotion
- Records evidence (audit trails, access decisions, configuration change history)

Business data access and transformation occur only in the **Dataplane execution boundary**.

> Result: Governance can be audited and explained without requiring the Controller to become a data-processing system.

### What architects validate

- Control-plane components do not store or process business payloads.
- Identity context is preserved end-to-end (no "service account as user" pattern).
- Policies are evaluated consistently and centrally.
- Environment promotion is controlled and reproducible (Dev → Test → Prod).
- Auditing is deterministic (not forensic reconstruction).

---

## Miso Overview

Miso is the **Controller** of AI Fabrix. It provides centralized governance for the platform without becoming a data plane.

### Role of the Controller

Miso governs:

- **Platform identity model** (users, groups, roles, service identities)
- **Access control** across environments and platform capabilities
- **Policy enforcement decisions** (egress, model access, quotas, compliance constraints)
- **Environment lifecycle** (dev/test/prod provisioning, configuration, promotion)
- **Auditability** and evidence collection

Miso also provides a standardized control surface for operators:

- Environment status tracking and health monitoring
- Deployment history and environment activity logs
- Monitoring/alerting integration and dashboards
- API surface for administration and automation

[[DIAGRAM: Controller (Miso) → Dataplane boundary → Orchestration/UX]]

### Control Plane vs Data Plane Separation

#### Control Plane (Miso)
- Holds governance configuration and decision logic
- Manages environments (dev/test/prod) and platform topology
- Collects audit records and operational telemetry

#### Data Plane (Dataplane)
- Executes integrations and retrieval
- Enforces identity-aware access at execution time
- Processes business payloads and returns governed outputs

**Design rule:** if a component must process or store business payloads, it belongs in the Dataplane.

### Why the Controller never touches business data

Miso avoids business payload handling to:

- Reduce blast radius and simplify compliance boundary
- Prevent "governance bypass" via control-plane data access paths
- Keep audit evidence independent of the data-processing runtime
- Enable stronger separation-of-duties for operations and security teams

### Platform capabilities surfaced through Miso

Miso commonly surfaces:

- Multi-environment management (dev/tst/pro)
- Environment isolation and environment-level access control
- Environment sizing and quotas (eval, S, M, L, XL)
- Deployment history and environment activity logs
- Central logging and immutable audit trail capabilities
- Observability integrations (Azure Monitor / Log Analytics / Application Insights)

[[TODO: link to canonical platform overview section describing Miso positioning]]

---

## Identity & Access

AI Fabrix is identity-native. Miso centralizes the identity model and ensures identity context is preserved across governed AI execution.

### Entra ID Integration

Miso integrates with **Microsoft Entra ID** for:

- SSO authentication
- Group membership and role mapping
- Token-based identity context propagation

Supported identity integration capabilities include:

- Entra ID integration
- Centralized identity management with JWT tokens
- Group management and group membership management
- Keycloak SSO integration (where used as an intermediary IdP layer)

[[PLACEHOLDER: describe the recommended "Entra ID → Miso" claim mapping model (groups, roles, workspaces)]]

### RBAC and ABAC model

#### RBAC (Role-Based Access Control)
Miso supports RBAC for platform actions such as:

- Environment access (dev/test/prod)
- Application-level access (controller-managed applications)
- Administrative actions (deploy, configure, approve, promote)

Typical platform roles (example) include:

- Admin
- Developer
- Viewer
- Auditor

Exact role definitions, inheritance rules, and permissions should be defined as part of the customer's governance model.

[[PLACEHOLDER: authoritative RBAC role matrix for AI Fabrix + Miso]]

#### ABAC (Attribute-Based Access Control)
ABAC is used when access decisions must include attributes such as:

- Business unit / department
- Region / data residency zone
- Case/workspace membership
- Data classification level

[[PLACEHOLDER: ABAC enforcement points and which attributes are evaluated in Miso vs enforced in the Dataplane]]

### SCIM provisioning

Miso supports **SCIM 2.0** for lifecycle-managed identity provisioning:

- User provisioning and deprovisioning
- Group synchronization
- Consistent access state across environments

This reduces manual identity administration and supports enterprise joiner/mover/leaver processes.

[[PLACEHOLDER: SCIM configuration guide for Entra ID → Miso provisioning]]

### Workspace and environment scoping

Miso enables scoping controls across:

- **Environments**: dev / test / prod isolation with environment-level access control
- **Workspaces**: human and agent activity scoped to workspace context

Key principles:

- Access is not "global by default"
- Operators can restrict which identities may operate in which environments
- Workspace membership should be treated as an access boundary, not a UI feature

[[PLACEHOLDER: define "workspace" formally (ownership, membership, lifecycle, evidence)]]

---

## Policy & Governance

Miso centralizes policy definition and governance controls so enforcement is consistent across tools, agents, and environments.

### Policy packs overview

Policy packs represent structured, versionable governance rules that can be applied across environments and workloads.

They typically cover:

- Data egress controls
- Model access policies
- Quotas and rate limits
- Compliance and regulatory constraints

[[PLACEHOLDER: list of built-in policy packs and how they are configured]]
[[PLACEHOLDER: policy pack versioning and promotion behavior]]

### Data egress controls

Egress controls determine:

- Which outbound network paths are allowed
- Which domains/endpoints may be accessed
- Which environments are permitted to communicate externally

Miso participates by:

- Holding policy configuration
- Enforcing environment/network configuration constraints where applicable
- Recording decisions and changes as audit evidence

Relevant control-plane capabilities include:

- Allowed IP ranges configuration (CIDR support)
- Private networking support and private endpoints configuration
- Virtual Network integration and Azure DNS / Front Door integration
- WAF / DDoS controls where deployed as part of the environment profile

[[PLACEHOLDER: explicit "egress allowed/blocked" decision flow and evidence model]]

### Model access policies

Model access policies determine:

- Which model providers and endpoints are permitted (e.g., Azure OpenAI, others)
- Which environments may use which models
- Which identities / roles may call specific model capabilities

Miso should store and govern:

- Allowed model endpoints
- Approved model catalogs per environment
- Usage constraints (quotas, allowed tools/actions)

[[PLACEHOLDER: authoritative model policy schema and examples]]

### Quotas and rate limits

Quotas protect cost and operational stability by placing limits on:

- Request volume / rate per identity, workspace, or environment
- Token/compute budget (where measurable)
- Burst protection for workloads that could overwhelm dependencies

Miso participates by:

- Central policy definition
- Central reporting of usage against limits
- Deterministic evidence for "why a call was allowed/denied"

[[PLACEHOLDER: quota objects, dimensions, and enforcement points]]

### Compliance and regulatory controls

Miso supports compliance readiness through:

- Immutable audit trails
- Security event logging
- Compliance reporting
- Environment isolation and promotion controls
- Integration with enterprise monitoring platforms

Referenced capabilities include:

- ISO 27001-aligned audit trails and controls
- GDPR support considerations (tenant-boundary, retention, evidence)

[[PLACEHOLDER: compliance mapping table (ISO 27001 / SOC2 / GDPR) to Miso controls]]

---

## Environment Lifecycle

Miso governs environment lifecycle to ensure AI workloads are promoted safely and reproducibly.

### Dev → Test → Prod promotion

Miso supports multi-environment operation (commonly dev/tst/pro), including:

- Environment isolation
- Environment status tracking and health monitoring
- Environment deployment history and activity logs

Promotion goals:

- Make changes reviewable, versioned, and reversible
- Prevent "works in dev" drift from reaching production
- Ensure governance settings move with the release, not after it

[[PLACEHOLDER: define the canonical promotion workflow, artifact types, and responsibilities]]

### Configuration drift prevention

Drift occurs when production diverges from the approved configuration baseline.

Miso mitigates drift via:

- Central configuration management
- Environment configuration validation
- Controlled change processes and approvals
- Audit trails for configuration changes

[[PLACEHOLDER: drift detection model (what is compared, how often, what triggers alerts)]]

### Versioning and rollback

Environment changes should be:

- Versioned (configurations, templates, policies)
- Traceable (who changed what, when, under which approval)
- Rollback-capable (return to prior known-good state)

Miso provides:

- Environment deployment history
- Activity logs
- Controlled application templates and deployments

[[PLACEHOLDER: rollback semantics and supported rollback scope]]

### Approval gates

Approval gates enforce separation of duties and reduce risky changes.

Common gate patterns:

- Security review gate for policy changes
- Platform operator approval for production promotion
- Change window enforcement for regulated environments

Miso includes access request and approval workflows for controlled access.

[[PLACEHOLDER: approval gate configuration and evidence outputs]]

---

## Audit & Observability

Miso provides auditability and operational visibility as first-class platform functions.

### Audit trails and evidence

Audit records should make it possible to answer:

- Who performed an action?
- What did they change or access?
- In which environment/workspace?
- Under which policy and approval state?
- What evidence exists to support compliance review?

Miso supports:

- Comprehensive audit logging
- ISO 27001-aligned audit trails
- Immutable audit records
- User context in audit logs
- Audit log queries and export
- Audit retention policies
- Correlation ID tracking

### Access logs and policy decisions

A governance platform must record not only actions, but **decisions**:

- Access allow/deny decisions (with reason)
- Policy evaluations (which policy triggered the outcome)
- Approval gate outcomes

Miso's logging model includes structured logging and queryable audit feeds.

[[PLACEHOLDER: canonical schema for "policy decision" events]]

### Model usage tracking

Model usage tracking supports:

- Operational debugging (latency, errors)
- Governance oversight (who used which model, under which policy)
- Budget and cost controls

Miso integrates with common telemetry backends:

- Azure Monitor
- Log Analytics
- Application Insights
- OpenTelemetry instrumentation
- Distributed tracing and correlation IDs

[[PLACEHOLDER: model usage metrics catalog and required dimensions (workspace, env, identity, model, cost)]]

### Cost attribution and chargeback

Cost attribution requires consistent tagging and metering dimensions such as:

- Environment
- Workspace
- Application / workflow
- Identity (user/service)
- Model/provider

Miso provides the governance context needed for chargeback reporting.

[[PLACEHOLDER: cost attribution reference implementation (Azure tags, logs → reporting)]]

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "fontFamily": "Poppins, Arial Rounded MT Bold, Arial, sans-serif",
    "fontSize": "15px",
    "background": "#FFFFFF",
    "primaryColor": "#F8FAFC",
    "primaryTextColor": "#0B0E15",
    "primaryBorderColor": "#E2E8F0",
    "lineColor": "#E2E8F0",
    "textColor": "#0B0E15",
    "subGraphTitleColor": "#64748B",
    "subGraphTitleFontWeight": "500"
  }
}}%%

flowchart LR

classDef control fill:#2563EB,color:#ffffff,stroke:#1E40AF;
classDef core fill:#4F46E5,color:#ffffff,stroke:#3730A3;
classDef flow fill:#7C3AED,color:#ffffff,stroke:#5B21B6;
classDef ui fill:#0D9488,color:#ffffff,stroke:#065F46;
classDef data fill:#475569,color:#ffffff,stroke:#334155;
classDef external fill:#6B7280,color:#ffffff,stroke-dasharray: 5 5;

user([Enterprise User])

entra["Microsoft Entra ID"]:::external
monitoring["Monitoring & SIEM\nAzure Monitor / Log Analytics"]:::external

subgraph ux["User Experience"]
  interface["Interface Layer"]:::ui
end

subgraph orchestration["Orchestration"]
  orchestrator["Orchestration Layer"]:::flow
end

subgraph control_plane["Miso – Control Plane"]
  miso["Miso Controller"]:::control
  identity["Identity & Access"]:::control
  policy["Policy & Governance"]:::control
  lifecycle["Environment Lifecycle"]:::control
  audit["Audit & Observability"]:::control
  audit_store[(Audit Logs & Evidence)]:::data
end

subgraph data_plane["Dataplane – Execution"]
  dataplane["Dataplane"]:::core
end

user --> interface --> orchestrator --> dataplane

entra --> identity
miso --> identity
miso --> policy
miso --> lifecycle
miso --> audit

miso -->|Policies / Quotas| dataplane
dataplane -->|Usage & Access Events| audit_store
audit --> audit_store --> monitoring
