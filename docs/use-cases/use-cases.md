## 12. Use Cases

AI Fabrix use cases describe **how enterprises safely use AI under real constraints**: identity, permissions, auditability, and regulation.

They are **platform-enabled capabilities**, not products or agents.

Each use case exists because AI Fabrix removes structural failure modes that block traditional AI deployments.

---

## 12.1 Microsoft 365 Knowledge Assistants

### Problem

Organizations want AI assistants that can answer questions using Microsoft 365 content: SharePoint, OneDrive, Teams, and Outlook.

Traditional approaches fail because:

* Permissions differ across sites, libraries, and tenants
* Search indexes flatten security context
* AI answers cannot be trusted to respect access rules
* Audits cannot explain *why* a result was shown

As a result, assistants are limited, disabled, or blocked by security teams.

---

### What This Use Case Enables

AI Fabrix enables **permission-aware knowledge assistants** that:

* Answer questions across Microsoft 365 content
* Respect per-user permissions automatically
* Never expose content the user is not allowed to see
* Produce answers suitable for regulated environments

The assistant does not "search everything". It only sees **governed, identity-filtered context**.

---

### Why This Is Hard

Microsoft 365 permissions are:

* Highly granular
* Distributed across sites and workloads
* Dynamic over time

Most AI tools:

* Use service accounts
* Flatten permissions during indexing
* Rely on post-filtering in application code

These approaches break at scale and fail audits.

---

### Why AI Fabrix Works

AI Fabrix integrates Microsoft 365 through the **Dataplane and CIP**:

* Identity is preserved end-to-end via Entra ID
* CIP pipelines enforce permissions before data reaches AI
* Metadata and lineage are preserved for auditability
* Retrieval is permission-aware by design

AI never receives raw documents. It receives **scoped, explainable context**.

---

### Typical Scenarios

* Internal policy assistants
* IT and HR knowledge bots
* Engineering documentation assistants
* Executive briefing assistants

---

## 12.2 Secure Internal Copilots

### Problem

Enterprises want internal copilots that help employees:

* Navigate systems
* Summarize information
* Assist with operational tasks

Copilots often fail security review because:

* They operate with elevated privileges
* They blur system boundaries
* They introduce undocumented access paths

As a result, copilots remain pilots or demos.

---

### What This Use Case Enables

AI Fabrix enables **secure internal copilots** that:

* Act strictly on behalf of authenticated users
* Follow the same access rules as humans
* Operate across systems without bypassing governance
* Produce auditable, explainable outputs

There are **no AI exception paths**.

---

### Why This Is Hard

Most copilots:

* Use shared credentials
* Re-implement permission logic in code
* Embed business rules inside prompts or workflows

This creates hidden risk and operational fragility.

---

### Why AI Fabrix Works

With AI Fabrix:

* Identity is the execution context
* Policies are enforced centrally (Controller layer)
* CIP supplies governed tools and data
* Orchestration cannot bypass the dataplane

Copilots become **first-class enterprise actors**, not privileged systems.

---

### Typical Scenarios

* Internal operational copilots
* IT service desk assistants
* Finance and procurement copilots
* Knowledge worker productivity assistants

---

## 12.3 Policy-Aware Enterprise Search

### Problem

Enterprise search systems struggle to balance:

* Relevance
* Security
* Explainability

AI-powered search often makes this worse by:

* Mixing data from multiple systems
* Ignoring source-system permissions
* Returning unexplainable results

Security teams cannot certify these systems.

---

### What This Use Case Enables

AI Fabrix enables **policy-aware enterprise search** that:

* Retrieves data across systems safely
* Applies identity and policy filtering automatically
* Preserves business metadata and lineage
* Produces explainable search results

Search results are **governed outputs**, not guesses.

---

### Why This Is Hard

Traditional search stacks:

* Index data outside its security context
* Apply filtering after retrieval
* Lose lineage during vectorization

AI adds probabilistic behavior on top of already weak foundations.

---

### Why AI Fabrix Works

AI Fabrix enforces governance **before retrieval**:

* Data is normalized and tagged with metadata
* Retrieval engines apply identity-aware filtering
* CIP pipelines ensure consistent enforcement across sources
* Audit trails exist by default

Search becomes a governed dataplane function, not an app feature.

---

### Typical Scenarios

* Enterprise-wide knowledge search
* Policy and compliance search
* Cross-system document discovery
* AI-assisted analytics exploration

---

## 12.4 Case and Deal Workspaces

### Problem

Case and deal work requires AI assistance, but involves:

* Highly sensitive data
* Context-specific permissions
* Strict audit and traceability requirements

Traditional AI tools cannot safely operate in these environments.

---

### What This Use Case Enables

AI Fabrix enables **secure, case-scoped AI workspaces** that:

* Restrict AI visibility to a specific case or deal
* Enforce role- and context-based access
* Support human-in-the-loop workflows
* Produce full audit trails

AI becomes an assistant, not a decision maker.

---

### Why This Is Hard

Case data:

* Spans multiple systems
* Changes over time
* Is governed by contextual rules, not static roles

Embedding this logic in applications does not scale.

---

### Why AI Fabrix Works

AI Fabrix scopes data access structurally:

* CIP pipelines enforce case context
* Metadata defines ownership and scope
* Policies apply automatically across systems
* Every AI interaction is logged and explainable

This makes AI usable in **high-trust workflows**.

---

### Typical Scenarios

* Legal and compliance cases
* M&A and deal rooms
* Public sector case management
* Regulated customer support

---

## 12.5 Regulated Data AI Scenarios

### Problem

In regulated industries, AI must be:

* Explainable
* Auditable
* Predictable
* Governed

Most AI platforms fail these requirements and are blocked entirely.

---

### What This Use Case Enables

AI Fabrix enables **regulated AI usage** where:

* Data lineage is preserved end-to-end
* AI actions are fully auditable
* Governance is structural, not procedural
* Compliance reviews are deterministic

AI can be used where it was previously prohibited.

---

### Why This Is Hard

Regulators require:

* Clear justification of outputs
* Traceability to source data
* Proof of policy enforcement

Most AI systems cannot provide this without manual reconstruction.

---

### Why AI Fabrix Works

AI Fabrix embeds compliance into the platform:

* Controller layer enforces policy centrally
* Dataplane preserves lineage and context
* CIP pipelines eliminate opaque integrations
* Audit evidence exists by design

Compliance becomes **verifiable**, not negotiated.

---

### Typical Scenarios

* Financial services decision support
* Healthcare administration
* Government and public sector AI
* Risk and compliance analytics

---

## Why These Use Cases Matter

These use cases:

* Do not rely on specific AI tools
* Do not require security exceptions
* Do not compromise governance

They are possible **only because AI Fabrix removes structural failure modes**.

This is the difference between experimenting with AI and deploying AI **at enterprise scale, under control**.
