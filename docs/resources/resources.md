# Resources

This section provides practical reference material for architects, security teams, and delivery teams working with AI Fabrix.

The resources here support **evaluation, design, implementation, and governance** of the platform. They do not introduce new platform behavior beyond what is defined in the core documentation.

---

## Architecture Diagrams

This subsection contains reference diagrams that describe the structural architecture of AI Fabrix and its governed execution flow.

**Purpose**
- Support architecture and security reviews
- Provide a shared visual model for enterprise stakeholders
- Clarify separation between Controller, Dataplane, orchestration, and UX layers

**Scope**
- Normative architecture references
- Production-equivalent deployment patterns
- No UI- or agent-specific assumptions

### High-Level Architecture Diagram

```mermaid
flowchart LR
    User[User / API / AI Agent]
    UX[UX Layer<br/>(OpenWebUI / Copilot)]
    Orchestration[Orchestration Layer<br/>(Flowise or equivalent)]
    Controller[Miso Controller<br/>Identity • Policy • Audit]
    Dataplane[CIP Dataplane<br/>Integration • Retrieval]
    Systems[Enterprise Systems<br/>SaaS • Databases • M365]

    User --> UX
    UX --> Orchestration
    Orchestration -->|OpenAPI / MCP| Dataplane
    Dataplane --> Systems

    Controller -.-> UX
    Controller -.-> Orchestration
    Controller -.-> Dataplane
```

**Interpretation Notes**
- Miso (Controller) governs but never handles business payloads
- CIP executes all integrations inside the Dataplane
- UX and orchestration layers are replaceable consumers

---

## CIP Examples

This subsection provides example Composable Integration Pipelines (CIP).

**Purpose**
- Demonstrate declarative, inspectable integration patterns
- Show structural enforcement of identity and permissions
- Provide reusable enterprise integration patterns

**Example Categories**
- SaaS API access with per-user authorization
- Document ingestion with permission-aware retrieval
- Delta sync and change data capture (CDC)

**Non-Goals**
- No service accounts
- No application-level permission logic
- No prompt-side filtering

Placeholders:
- CIP Example: SaaS API integration  
- CIP Example: Document system ingestion  
- CIP Example: Permission-aware retrieval  

---

## Policy Pack Examples

This subsection documents example policy packs enforced by the Miso Controller.

**Purpose**
- Illustrate structural governance
- Support compliance and audit reviews
- Provide reusable policy patterns

**Policy Categories**
- RBAC and ABAC enforcement
- Network and egress controls
- Environment separation (Dev / Test / Prod)
- Quotas and cost controls
- Audit and observability

**Characteristics**
- Centrally evaluated
- Deterministic enforcement
- Applies equally to humans, APIs, and AI agents

Placeholders:
- Policy Pack: RBAC / ABAC enforcement  
- Policy Pack: Egress and network control  
- Policy Pack: Audit and observability  

---

## RFP / RFI Templates

This subsection provides templates for procurement and risk evaluation.

**Purpose**
- Enable consistent enterprise evaluation
- Support security and compliance due diligence
- Reduce ambiguity in vendor assessments

**Template Types**
- RFI: Architecture and capability discovery
- RFP: Detailed technical and governance requirements
- Security and compliance questionnaires

**Focus Areas**
- In-tenant deployment
- Identity and permission enforcement
- Dataplane execution model
- Auditability and exit guarantees

Placeholders:
- RFI Template: Enterprise AI Platforms  
- RFP Template: Governed AI Deployment  
- Security & Compliance Checklist  

---

## Release Notes

This subsection contains versioned release notes for AI Fabrix.

**Purpose**
- Transparent change tracking
- Support enterprise change management
- Enable risk assessment

**Release Note Structure**
- Version
- Release date
- Added capabilities
- Changes
- Fixes
- Breaking changes (explicit)

**Principles**
- No silent behavior changes
- No feature gating by plan
- Backward compatibility explicitly documented

Placeholders:
- Release Notes: Latest Version  
- Release Notes: Archive  

---

## How to Use This Section

This section is a **working reference** for architects, security teams, and delivery teams.

If a behavior or capability is not documented here or elsewhere in the knowledge base, it should be treated as **not supported** until explicitly documented.
