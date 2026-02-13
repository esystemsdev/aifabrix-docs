# Interface Layer

**User interaction surfaces**

The Interface Layer defines how humans interact with AI Fabrix–powered systems.  
It is intentionally decoupled from orchestration logic and the Dataplane to ensure security, scalability, and interface flexibility.

The Interface Layer is **not** where integrations run, data is fetched, or policies are enforced.  
Its responsibility is **interaction, context capture, and identity propagation**.

---

## Interface Concepts

### Interface vs Orchestration vs Dataplane

AI Fabrix enforces a strict separation of responsibilities across three layers:

| Layer | Responsibility | What it does *not* do |
|------|---------------|----------------------|
| **Interface** | Human interaction, context input, response presentation | No integration logic, no data access |
| **Orchestration** | Agent logic, reasoning, tool selection | No policy enforcement, no raw system access |
| **Dataplane** | Data retrieval, normalization, RBAC/ABAC enforcement | No UI, no conversational state |

**Key rule**  
Interfaces only call orchestration endpoints or MCP tools — never Dataplane APIs directly.

### Identity and Context Propagation

Every interface interaction carries **user identity and execution context** into the system.

1. User authenticates in the interface (e.g. Entra ID, Slack, Teams)
2. Identity is validated by Miso
3. A delegated execution token is issued
4. Orchestration and Dataplane receive user identity, groups, roles, and environment context

This enables:
- RBAC enforcement at operation level
- ABAC filtering at data level
- Full auditability of user actions
- Consistent access behavior across interfaces

### Human-in-the-Loop Patterns

Interfaces are the anchor point for human-in-the-loop workflows:

- Approval before write operations
- Review of AI-generated actions
- Validation of sensitive changes
- Case escalation to humans

Humans interact through interfaces.  
Agents execute through orchestration.  
Policies are enforced in the Dataplane.

---

## Interface Options

### OpenWebUI (Reference Interface)

OpenWebUI is the **reference implementation** for AI Fabrix interfaces.

Typical use cases:
- Enterprise chat
- Case-based AI interactions
- Multi-step workflows with context persistence

It serves as a blueprint, not a requirement.

### Microsoft Teams

Teams acts as a collaborative conversational interface embedded in daily work.

Use cases include:
- Team-based AI assistance
- Contextual actions
- Notifications and approvals

### Microsoft Copilot UI

The Copilot UI provides a Microsoft-native AI surface integrated with M365 experiences.

It consumes **already-governed** AI Fabrix capabilities and does not bypass policy layers.

### Slack

Slack provides a developer- and operations-friendly conversational interface.

It is well-suited for:
- Operational workflows
- Incident handling
- Event-driven AI interactions

### Custom Enterprise Portals

Custom portals embed AI Fabrix into existing enterprise applications.

They offer:
- Full UX control
- Domain-specific workflows
- Custom approval and validation patterns

All custom portals must still propagate identity and interact only through orchestration or MCP.

---

## Workspace and Access Models

### Case-Based Access

A case represents a bounded interaction context containing:
- User intent
- Conversation history
- Retrieved data references
- Actions and decisions
- Audit trail

Cases provide isolation, accountability, and auditability.

### Team and Role Scoping

Interfaces reflect — but do not define — access rules.

- Teams are resolved via identity providers
- Roles and permissions are assigned by Miso
- Interfaces only display what the user is authorized to see

### Auditability of User Interactions

All meaningful interactions are auditable:

- Who initiated the action
- When it occurred
- What context was used
- Which operations were executed
- What data was accessed or modified

Audit logs are produced by Miso and the Dataplane, not by the interface itself.

---

## Interface Layer – Architectural Context

The diagram below illustrates the supported execution flow and responsibility boundaries described in this section.

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
classDef external fill:#6B7280,color:#ffffff,stroke-dasharray: 5 5;

user([Enterprise User])

subgraph interface_layer["Interface Layer"]
  openwebui["OpenWebUI (Reference)"]:::ui
  teams["Microsoft Teams"]:::ui
  copilot["Microsoft Copilot UI"]:::ui
  slack["Slack"]:::ui
  portal["Custom Enterprise Portals"]:::ui
end

subgraph orchestration_layer["Orchestration Layer"]
  agent["Agent Workflows"]:::flow
end

subgraph dataplane["Dataplane"]
  retrieval["Permission-aware Retrieval"]:::core
  enforcement["RBAC / ABAC Enforcement"]:::core
  normalization["Normalization & Metadata"]:::core
end

subgraph miso["Miso (Controller)"]
  identity["Identity & Context"]:::control
  policy["Policy & Audit Authority"]:::control
end

systems["Enterprise Systems"]:::external

user --> openwebui
user --> teams
user --> copilot
user --> slack
user --> portal

openwebui --> agent
teams --> agent
copilot --> agent
slack --> agent
portal --> agent

agent --> retrieval --> enforcement --> normalization --> systems

identity -->|Delegated execution context| agent
identity -->|Delegated execution context| retrieval
policy -->|Policies & audit scope| enforcement
