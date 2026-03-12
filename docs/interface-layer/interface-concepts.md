# Interface Concepts

The Interface Layer defines how humans interact with AI Fabrix–powered systems.
It is intentionally decoupled from orchestration logic and the Dataplane to ensure security, scalability, and interface flexibility.

The Interface Layer is **not** where integrations run, data is fetched, or policies are enforced.
Its responsibility is **interaction, context capture, and identity propagation**.

---

## Interface vs Orchestration vs Dataplane

AI Fabrix enforces a strict separation of responsibilities across three layers:

| Layer | Responsibility | What it does *not* do |
|------|---------------|----------------------|
| **Interface** | Human interaction, context input, response presentation | No integration logic, no data access |
| **Orchestration** | Agent logic, reasoning, tool selection | No policy enforcement, no raw system access |
| **Dataplane** | Data retrieval, normalization, RBAC/ABAC enforcement | No UI, no conversational state |

**Key rule**
Interfaces only call orchestration endpoints or MCP tools — never Dataplane APIs directly.

---

## Identity and Context Propagation

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

---

## Human-in-the-Loop Patterns

Interfaces are the anchor point for human-in-the-loop workflows:

- Approval before write operations
- Review of AI-generated actions
- Validation of sensitive changes
- Case escalation to humans

Humans interact through interfaces.
Agents execute through orchestration.
Policies are enforced in the Dataplane.

---

## Architectural Context

The diagram below illustrates the supported execution flow and responsibility boundaries described in this article.

```mermaid
flowchart LR

%% ==================================================
%% Class Definitions (Mandatory) [cite: 68-75]
%% ==================================================
classDef control fill:#2563EB,color:#ffffff,stroke:#1E40AF
classDef core fill:#4F46E5,color:#ffffff,stroke:#3730A3
classDef flow fill:#7C3AED,color:#ffffff,stroke:#5B21B6
classDef ui fill:#0D9488,color:#ffffff,stroke:#065F46
classDef external fill:#6B7280,color:#ffffff,stroke-dasharray: 5 5

%% Neutralize subgraph backgrounds for architectural neutrality [cite: 83]
style interface_layer fill:none,stroke:#E2E8F0
style orchestration_layer fill:none,stroke:#E2E8F0
style dataplane_layer fill:none,stroke:#E2E8F0
style miso_controller_layer fill:none,stroke:#E2E8F0

%% ==================================================
%% Nodes & Subgraphs [cite: 51, 83-93]
%% ==================================================
enterprise_user([Enterprise User])

subgraph interface_layer["Interface Layer"]
    open_webui["OpenWebUI Reference"]:::ui
    ms_teams["Microsoft Teams"]:::ui
    ms_copilot_ui["Microsoft Copilot UI"]:::ui
    slack_ui["Slack"]:::ui
    custom_portals["Custom Enterprise Portals"]:::ui
end

subgraph orchestration_layer["Orchestration Layer"]
    agent_workflows["Agent Workflows"]:::flow
end

subgraph dataplane_layer["Dataplane"]
    permission_retrieval["Permission Aware Retrieval"]:::core
    access_enforcement["RBAC and ABAC Enforcement"]:::core
    metadata_normalization["Normalization and Metadata"]:::core
end

subgraph miso_controller_layer["Miso – Controller"]
    identity_context["Identity and Context"]:::control
    policy_authority["Policy and Audit Authority"]:::control
end

enterprise_systems["Enterprise Systems"]:::external

%% ==================================================
%% Relationships & Flow [cite: 101-107]
%% ==================================================
enterprise_user --> open_webui
enterprise_user --> ms_teams
enterprise_user --> ms_copilot_ui
enterprise_user --> slack_ui
enterprise_user --> custom_portals

open_webui --> agent_workflows
ms_teams --> agent_workflows
ms_copilot_ui --> agent_workflows
slack_ui --> agent_workflows
custom_portals --> agent_workflows

agent_workflows --> permission_retrieval
permission_retrieval --> access_enforcement
access_enforcement --> metadata_normalization
metadata_normalization --> enterprise_systems

identity_context -->|Delegated Context| agent_workflows
identity_context -->|Delegated Context| permission_retrieval
policy_authority -->|Policies and Audit Scope| access_enforcement
```
