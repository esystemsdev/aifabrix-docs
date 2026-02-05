## Overview

### What AI Fabrix Is

AI Fabrix is an enterprise AI platform deployed entirely inside the customer's Azure tenant.

It provides a governed AI operating model that makes AI permission-aware, auditable, and production-ready by design — not by convention.

AI Fabrix introduces two structural capabilities enterprises lack today:

* A **Controller layer** that governs identity, policy, lifecycle, and audit
* A **Dataplane** that supplies AI with permission-aware, metadata-rich, and auditable data

AI Fabrix is designed for organizations that need AI to operate under the same security, compliance, and governance expectations as any other enterprise system.

---

### What AI Fabrix Is Not

AI Fabrix is deliberately not positioned as:

* A SaaS AI product or external control plane
* A chatbot or conversational AI tool
* An agent framework or prompt orchestration library
* An iPaaS or workflow automation platform
* A collection of SDKs or connectors
* A vector database or search product

AI Fabrix does not replace Microsoft services and does not compete with them.
It provides the missing enterprise control, dataplane, and governance layers required to use those services safely at scale.

---

### AI Fabrix as an AI Operating Model

AI Fabrix is not an application — it is an **AI operating model**.

An operating model defines:

* How identity is preserved during execution
* How permissions are enforced across systems
* How data is supplied to AI
* How policy and audit are applied consistently
* How environments are promoted from development to production

Without a shared operating model, enterprises are forced to re‑implement governance, security, and access logic in every AI initiative.

AI Fabrix replaces fragmented approaches with a single, structural model that applies to:

* Humans
* APIs
* AI agents

No exceptions exist for AI.

---

### Why In‑Tenant Architecture Matters

AI Fabrix runs entirely inside the customer's Azure tenant.
There is no shared SaaS control plane and no external execution boundary.

This architectural choice is foundational.

**In‑tenant deployment ensures:**

* Data never leaves the customer's trust boundary unless explicitly allowed
* Identity is provided by Entra ID and preserved end‑to‑end
* Networking, encryption keys, and egress are customer‑controlled
* Compliance boundaries are not crossed by design

For regulated and security‑sensitive organizations, in‑tenant architecture is not an optimization — it is a prerequisite for trust.

---

### Controller vs Dataplane Responsibilities

AI Fabrix enforces a strict separation of concerns.

#### Controller Layer (Miso)

The Controller governs the platform itself.
It never processes business data payloads.

Responsibilities include:

* Identity and access (Entra ID, RBAC, ABAC, SCIM)
* Policy packs (egress, quotas, compliance)
* Environment lifecycle (Dev → Test → Prod)
* Deployment and promotion controls
* Audit, observability, and evidence generation

The Controller decides **who is allowed to do what, where, and under which policies**.

#### Dataplane

The Dataplane is the execution boundary where enterprise data becomes AI‑ready.

It is the only layer allowed to:

* Access external systems
* Execute integrations
* Process business data payloads

At its core is **CIP — Composable Integration Pipelines**, which:

* Execute securely inside the tenant
* Enforce RBAC and ABAC automatically
* Normalize metadata and lineage
* Expose governed data via OpenAPI and MCP

The Dataplane supplies data — not systems — to AI.

---

### How AI Fabrix Complements Microsoft

AI Fabrix is designed to run alongside Microsoft Azure and Microsoft 365.

Microsoft provides the AI primitives:

* Azure networking and compute
* Entra ID for identity
* Azure Key Vault
* Azure OpenAI (optional)
* Azure AI Search (optional)
* Microsoft 365 data sources

AI Fabrix provides what Microsoft does not:

* A governed AI dataplane
* Identity‑native integration execution
* Structural permission‑aware data access
* Centralized AI governance and audit
* An AI operating model that spans tools and teams

The relationship is additive, not competitive.

Microsoft provides the building blocks.
AI Fabrix provides the enterprise control plane and dataplane required to use them safely.

---

### Target Audiences

AI Fabrix is designed for enterprise stakeholders responsible for trust, scale, and risk.

**Primary audiences include:**

* CIOs, CTOs, and CDOs evaluating enterprise AI strategy
* Enterprise and solution architects defining platform standards
* Security and compliance leaders responsible for risk and audit
* Platform and cloud teams operating Azure environments
* Procurement and vendor risk teams assessing architectural exposure

AI Fabrix documentation is written to support architectural evaluation — not product demos or experimentation.

---

### Summary

AI Fabrix introduces a missing layer in enterprise AI:

* A governed dataplane that supplies AI with contextual, permission‑aware data
* A controller that enforces identity, policy, lifecycle, and audit

Together, they form an AI operating model that makes production AI possible inside real enterprise constraints.

This is not about enabling more AI.
It is about enabling AI that enterprises can trust.
