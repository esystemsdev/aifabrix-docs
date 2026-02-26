# Interface Options

AI Fabrix supports multiple interface types. All interfaces follow the same architectural contract and security model.

---

## OpenWebUI (Reference Interface)

OpenWebUI is the **reference implementation** for AI Fabrix interfaces.

Typical use cases:
- Enterprise chat
- Case-based AI interactions
- Multi-step workflows with context persistence

It serves as a blueprint, not a requirement.

---

## Microsoft Teams

Teams acts as a collaborative conversational interface embedded in daily work.

Use cases include:
- Team-based AI assistance
- Contextual actions
- Notifications and approvals

---

## Microsoft Copilot UI

The Copilot UI provides a Microsoft-native AI surface integrated with M365 experiences.

It consumes **already-governed** AI Fabrix capabilities and does not bypass policy layers.

---

## Slack

Slack provides a developer- and operations-friendly conversational interface.

It is well-suited for:
- Operational workflows
- Incident handling
- Event-driven AI interactions

---

## Custom Enterprise Portals

Custom portals embed AI Fabrix into existing enterprise applications.

They offer:
- Full UX control
- Domain-specific workflows
- Custom approval and validation patterns

All custom portals must still propagate identity and interact only through orchestration or MCP.
