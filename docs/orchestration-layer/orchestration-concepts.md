# Orchestration Concepts

The Orchestration Layer is responsible for building AI workflows and agents that consume governed capabilities exposed by the AI Fabrix Dataplane.

Orchestration does not integrate directly with enterprise systems and does not implement access control logic. Its sole responsibility is to coordinate reasoning, workflow steps, and tool invocation using pre-governed interfaces.

In AI Fabrix, orchestration is intentionally decoupled from data access to preserve security, auditability, and architectural clarity.

---

## What Orchestration Means in AI Fabrix

Orchestration is the layer where:

- AI agents and workflows are defined
- Reasoning, branching, and control flow occur
- Governed tools are invoked to retrieve or act on data

It is not the layer where:

- External systems are connected
- Credentials are managed
- Permissions are enforced
- Business data is filtered

Those responsibilities belong exclusively to the Dataplane.

Orchestration answers:

> "Given a user intent and available governed tools, how should the AI proceed?"

Not:

> "How do I access this system or secure this data?"

---

## Separation from Data Access

AI Fabrix enforces a strict separation between orchestration and data access:

- Orchestration layers never call raw APIs
- Orchestration layers never hold credentials
- Orchestration layers never implement filtering or permission logic

All data access is executed by governed pipelines in the Dataplane.

This ensures:

- Identity is preserved end-to-end
- Permissions cannot be bypassed
- Audits are deterministic
- Orchestration engines remain replaceable

---

## Identity-Aware Tool Consumption

Orchestration layers consume tools on behalf of an authenticated user.

Execution flow:

1. User authenticates via Entra ID
2. Identity and group context is evaluated by the Controller (Miso)
3. Orchestration invokes a tool using MCP
4. The Dataplane enforces RBAC, ABAC, and policy
5. Only permitted data or actions are executed

Implications:

- Orchestration does not encode authorization logic
- Tools behave identically across orchestration engines
- AI agents cannot escalate privileges

AI agents are first-class governed actors.
