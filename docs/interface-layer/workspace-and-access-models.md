# Workspace and Access Models

---

## Case-Based Access

A case represents a bounded interaction context containing:
- User intent
- Conversation history
- Retrieved data references
- Actions and decisions
- Audit trail

Cases provide isolation, accountability, and auditability.

---

## Team and Role Scoping

Interfaces reflect — but do not define — access rules.

- Teams are resolved via identity providers
- Roles and permissions are assigned by Miso
- Interfaces only display what the user is authorized to see

---

## Auditability of User Interactions

All meaningful interactions are auditable:

- Who initiated the action
- When it occurred
- What context was used
- Which operations were executed
- What data was accessed or modified

Audit logs are produced by Miso and the Dataplane, not by the interface itself.
