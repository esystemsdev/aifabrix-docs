# Orchestration Options

AI Fabrix is orchestration-agnostic by design.

Any orchestration engine may be used as long as it consumes governed tools exposed by the Dataplane.

Orchestration layers consume CIP pipelines as governed tools.
They never connect directly to raw enterprise systems.

---

## Flowise (Reference Implementation)

Flowise is the reference orchestration implementation.

Characteristics:

- Visual, inspectable agent and workflow definitions
- Native support for tool-based agent execution
- Clear separation of prompts, tools, and control flow

In AI Fabrix:

- Flowise consumes MCP tools generated from CIP pipelines
- It has no direct system access
- It follows the Controller lifecycle for promotion

Flowise is a reference, not a dependency.

---

## Microsoft Copilot / Copilot Studio

Microsoft Copilot can act as an orchestration layer when:

- It does not connect directly to enterprise systems
- All data access is mediated by the Dataplane
- Identity and authorization are enforced centrally

Copilot is a consumer, not a competing platform.

---

## n8n

n8n may be used for workflow-style orchestration when:

- It consumes MCP or OpenAPI interfaces
- It does not manage credentials
- It does not implement access logic

Typical use cases include event-driven or scheduled AI-assisted workflows.

---

## Custom Agent Frameworks

Custom agent frameworks are supported by contract, not by SDK.

Requirements:

- Consume MCP or OpenAPI interfaces
- Do not embed credentials
- Do not bypass Dataplane enforcement

This ensures portability, inspectability, and consistent governance.
