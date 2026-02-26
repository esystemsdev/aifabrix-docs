# Interface Layer

User interaction surfaces for governed enterprise AI.

The Interface Layer defines how humans interact with AI Fabrix–powered systems.

It is the visible surface of the platform — but not where the platform's value resides.

AI Fabrix value lives below the UI and agent layer:
in the Control Plane (Miso) and the governed Dataplane (CIP + Retrieval).

Interfaces are replaceable.
Governance and data control are not.

---

## Purpose of the Interface Layer

The Interface Layer exists to:

- Provide secure human interaction surfaces
- Capture identity and contextual intent
- Enable human-in-the-loop workflows
- Present governed responses

It does not:

- Execute integrations
- Enforce policy logic
- Access enterprise systems directly
- Store governance rules

Interfaces are consumers of governed capabilities.
They do not implement them.

---

## Position in the Architecture

AI Fabrix separates responsibilities structurally:

- **Miso (Control Plane)** governs identity, policy, lifecycle, and audit.
- **Dataplane (CIP + Retrieval)** supplies permission-aware, contextual data.
- **Orchestration** coordinates agent logic using governed tools.
- **Interface Layer** enables human interaction.

The interface calls orchestration.
Orchestration calls governed tools.
The Dataplane enforces identity and policy.
Miso records and governs everything.

This separation ensures that:

- Changing the UI does not change governance.
- Introducing new interfaces does not create security risk.
- AI behavior remains bounded by enterprise policy.

---

## Supported Interface Types

AI Fabrix does not prescribe a single UI.

Common interface consumers include:

- OpenWebUI (reference implementation)
- Microsoft Teams
- Microsoft Copilot UI
- Slack
- Custom enterprise portals

These are interaction surfaces.
They are not part of the enforcement boundary.

Microsoft and third-party tools are consumers of AI Fabrix capabilities — not competitors and not control planes.

---

## Identity First

Every interface interaction begins with identity.

Users authenticate via enterprise identity providers (e.g., Entra ID).
Identity context is validated by Miso.
Delegated execution context flows into orchestration and the Dataplane.

No anonymous paths.
No service-account substitution.
No identity drop during execution.

Identity is preserved end-to-end.

---

## Human-in-the-Loop by Design

Enterprise AI requires controlled participation.

Interfaces enable:

- Approval workflows
- Case-based interactions
- Review before write operations
- Escalation and override paths

AI Fabrix treats AI as a governed enterprise actor.
Humans remain accountable.

---

## What This Means

The Interface Layer is intentionally constrained.

It enables interaction.
It does not create authority.

Authority lives in:

- Miso (identity and policy governance)
- The Dataplane (permission-aware data supply)

This ensures that enterprise AI can evolve its interfaces without re-architecting governance.

That separation is structural.
It is not optional.

---

## Interface Layer sub-articles

* **[Interface Concepts](interface-concepts/)** — Interface vs orchestration vs Dataplane, identity propagation, human-in-the-loop patterns
* **[Interface Options](interface-options/)** — OpenWebUI, Microsoft Teams, Copilot UI, Slack, custom portals
* **[Workspace and Access Models](workspace-and-access-models/)** — Case-based access, team and role scoping, auditability

---

**Key takeaway**: Interfaces are replaceable; governance and data control are not. The Interface Layer enables interaction without creating authority.
