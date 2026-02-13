# CIP — Composable Integration Pipelines

**The cornerstone of AI Fabrix**

CIP (Composable Integration Pipelines) is the AI-native integration fabric of the Dataplane. It replaces traditional SDK-based integrations, service-account connectors, and workflow automation with a governed, declarative execution model.

---

## What CIP Is

CIP is a declarative pipeline system that:

* Executes integrations inside the customer tenant
* Normalizes external data into a consistent metadata model
* Enforces RBAC and ABAC automatically
* Produces inspectable and auditable execution paths
* Generates OpenAPI and MCP contracts

CIP defines how data is fetched, transformed, filtered, and exposed. Authorization is enforced structurally by the platform.

---

## Why CIP Exists

Traditional integration patterns break in AI scenarios because they:

* Drop user identity through service accounts
* Duplicate permission logic in applications
* Rely on opaque workflow engines
* Implement filtering logic inside prompts or agents

CIP removes these failure modes structurally.

AI never calls systems directly.
AI only consumes outputs produced by governed pipelines.

---

## Declarative Pipeline Model

CIP pipelines follow a structured execution pattern:

* Fetch
* Transform
* Normalize
* Filter
* Expose

Pipelines are validated before deployment and promoted across environments (Dev → Test → Prod). Execution is deterministic and versioned.

---

## CIP Execution Model

### Declarative Pipelines (Default)

* Validated before execution
* Promoted through governed lifecycle
* Automatically generate contracts

### Governed Python Execution (Exceptional)

For advanced cases where declarative logic is insufficient:

* Python execution runs inside the same Dataplane boundary
* Identity and policy enforcement remain intact
* Full audit logging is preserved

There is no governance bypass.

---

## Contracts and Interfaces

### OpenAPI Contracts (System-to-System)

CIP generates versioned OpenAPI contracts suitable for application and system consumers.

### MCP Contracts (Agent-to-Dataplane)

CIP generates MCP (Model Context Protocol) tool definitions for AI agents.

MCP provides tools and context. Governance and filtering remain in the Dataplane.

---

## Security and Governance

CIP enforces:

* Identity propagation from Miso
* RBAC and ABAC filtering
* Policy pack evaluation (egress, quotas, compliance)
* Deterministic audit logging

Every execution records:

* Identity
* Pipeline version
* Policy decisions
* Output scope

---

## CIP Execution Flow

```mermaid
flowchart LR
    Systems["Enterprise Systems"] --> OpenAPI["OpenAPI Contract"] --> CIP["CIP Pipeline"] --> Enforcement["RBAC / ABAC Enforcement"] --> MCP["MCP Contract"] --> Agent["Agent / Workflow"]
```
