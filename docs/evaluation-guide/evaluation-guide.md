# Evaluation Guide

## Purpose of This Section

This section defines how AI Fabrix should be evaluated as an enterprise platform, not as a demo or feature checklist.

AI Fabrix is evaluated:

* Inside the customer's Azure tenant
* Using real identity, policies, and data
* At full architectural fidelity

The guide supports security, architecture, and procurement teams in assessing structural suitability, compliance posture, operational risk, and cost predictability.

---

## Enterprise Evaluation Criteria

AI Fabrix should be evaluated against platform-level criteria rather than application features.

| Dimension         | What to Validate                             | Why It Matters                     |
| ----------------- | -------------------------------------------- | ---------------------------------- |
| Deployment Model  | Runs entirely inside customer Azure tenant   | Eliminates SaaS control-plane risk |
| Identity Handling | End-to-end Entra ID identity preservation    | Prevents permission leakage        |
| Governance        | Structural, non-optional enforcement         | Avoids drift and exceptions        |
| Dataplane         | Permission-aware, metadata-first data access | Makes AI safe at scale             |
| Integration Model | No default service accounts                  | Reduces attack surface             |
| Auditability      | Deterministic, built-in audit trails         | Required for regulated use         |
| Standards         | OpenAPI + MCP                                | Prevents lock-in                   |
| Lifecycle         | Dev → Test → Prod promotion                  | Production readiness               |
| Cost Model        | Azure-native and predictable                 | Avoids usage surprises             |

Secondary criteria during evaluation include UI polish, prompt templates, pre-built agents, model benchmarking, and demo datasets.

---

## Security and Compliance Checklist

### Identity & Access Control

* Uses Entra ID for all authentication
* Preserves user identity through AI execution
* Enforces RBAC and ABAC centrally
* Avoids shared or system-level service accounts

### Data Access & Isolation

* All data access occurs inside the customer tenant
* Dataplane enforces authorization before retrieval
* Metadata-based filtering is applied
* AI never receives raw system-level access

### Network & Egress

* Deployed into customer VNets
* Supports private endpoints
* Centralized egress controls
* No mandatory outbound SaaS dependencies

### Audit & Observability

* Deterministic audit logs
* Preserved data lineage
* Auditable AI interactions
* Customer-owned logs

### Compliance Alignment

* ISO-27001 aligned controls
* Suitable for regulated workloads
* No AI exception paths
* Human-in-the-loop supported

---

## Architecture Review Questions

### Control Plane (Miso)

* How are policies evaluated and enforced?
* Where does identity persist during execution?
* How are environments promoted?
* How is audit evidence generated?

### Dataplane (CIP)

* How is per-user authorization enforced?
* How is metadata normalized?
* Where does filtering occur?
* How are integrations executed securely?

### Integration Model

* Are service accounts required?
* How are credentials managed?
* How are integrations versioned?
* Are contracts inspectable?

### AI & Orchestration

* Does AI ever bypass the dataplane?
* How are tools exposed to agents?
* Can actions be constrained by user authority?
* Is human-in-the-loop structurally supported?

### Exit & Portability

* Can the platform be removed cleanly?
* Are integrations portable?
* Is data stored in standard Azure services?
* Are there proprietary dependencies?

---

## 30-Day PoC Framework

### Guiding Principle

The PoC is a small-scale production deployment with no throwaway work.

### Week 1 — Foundation

* Deploy Community Edition into Azure
* Integrate Entra ID
* Configure network and egress

**Success:** Platform deployed fully in-tenant with enforced identity.

### Week 2 — Dataplane & Integration

* Connect real data sources
* Define CIP pipelines
* Validate metadata enforcement

**Success:** AI receives only permission-appropriate data.

### Week 3 — Use Case Validation

* Implement a realistic enterprise use case
* Test with real roles
* Validate audit logs

**Success:** Deterministic, trusted outputs.

### Week 4 — Risk & Readiness Review

* Security and compliance review
* Architecture sign-off
* Cost and scale assessment

**Success:** Clear path to production.

---

## Risk and Cost Assessment

### Risk Reduction by Design

| Risk                  | Traditional AI | AI Fabrix     |
| --------------------- | -------------- | ------------- |
| Identity loss         | Common         | Prevented     |
| Permission leakage    | High           | Blocked       |
| Audit gaps            | Forensic       | Deterministic |
| Service account abuse | Typical        | Eliminated    |
| Governance drift      | Likely         | Not possible  |

### Cost Model Characteristics

* Azure-native infrastructure billing
* No per-prompt or per-agent fees
* Predictable scaling
* Governance cost independent of usage

### Evaluation Outcome

At evaluation completion, enterprises should have proven governance, architectural confidence, real integrations, and a low-risk path to production.

AI Fabrix can be removed cleanly if requirements are not met.
