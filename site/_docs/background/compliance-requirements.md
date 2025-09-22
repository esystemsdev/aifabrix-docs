# Compliance Requirements

## ISO 27001 Compliance

**Objective:** Provide the technical and organisational controls needed to implement an ISO/IEC 27001-aligned ISMS across the platform lifecycle.

**Highlights**

* **Scope & Ownership:** All workloads, data, and keys remain in your tenant. Azure’s shared-responsibility model applies; AI Fabrix provides tenant-level controls and evidence hooks.
* **Annex A Control Mapping (selected):**

  * **A.5 Policies:** Security baselines and guardrails codified via **Miso policy packs** (egress, RBAC, access reviews).
  * **A.6 Organisation:** Role separation (platform owner, workspace admin, developer, auditor).
  * **A.8 Asset Management:** SBOMs for containers, inventory of connectors, data stores, and secrets.
  * **A.9 Access Control:** Entra ID SSO, group-based RBAC, least privilege, SCIM provisioning.
  * **A.12 Operations Security:** Hardened containers, image signing, vulnerability scanning, change control.
  * **A.13 Communications Security:** Private networking, TLS in transit, WAF/Front Door at ingress.
  * **A.14 System Acquisition/Development:** CI/CD with security gates, code review, SAST/DAST, dependency checks.
  * **A.15 Supplier Relationships:** In-tenant deployment reduces sub-processor surface; connectors are governed.
  * **A.16 Incident Management:** Centralised logs/metrics/traces; SIEM integration and response runbooks.
  * **A.17 Business Continuity:** Regional options, backups, PITR, recovery testing.
* **Evidence:** Audit logs (who/what/when/where), pipeline artifacts, SBOMs, policy-as-code reports, access reviews.

---

## Data Privacy

**Objective:** Support GDPR/CCPA and equivalent privacy regimes by design.

**Principles & Controls**

* **Controller/Processor Model:** You remain **data controller**. AI Fabrix components run in your tenant; no vendor-operated data plane.
* **Data Minimisation & Purpose Limitation:** Metadata-aware retrieval and source-permission checks reduce over-collection.
* **Data Subject Rights (DSR):** Provenance tracking + source links enable fulfillments (access, rectification, erasure) at the source system.
* **Data Localisation:** Region-pinned resources; private endpoints; optional on-prem/hybrid patterns.
* **PII Protection:** Field-level redaction in logs, configurable prompt/response redaction, pseudonymisation options in processing pipelines.
* **RoPA & DPIA Support:** Templates and evidence (data flows, connector scopes, retention, egress rules) to include in your RoPA/DPIA.

---

## Security Controls

**Identity & Access**

* Entra ID SSO, SCIM, conditional access, group-based RBAC with inheritance.
* Managed identities (workload identity) for **secretless** runtime access to Key Vault.

**Secrets & Keys**

* Keys, certs, and credentials in **Azure Key Vault** with rotation policies; no secrets in code or CI.

**Network & Platform**

* VNets, **Private Endpoints**, NSGs, Azure Firewall/WAF (Front Door), zero-trust segmentation.
* Hardened containers with minimal base images; **image signing** and **admission policies**.

**Data Protection**

* **At rest:** Azure-managed or customer-managed keys (CMK).
* **In transit:** TLS 1.2+ everywhere; mutual TLS within private mesh where applicable.

**Software Supply Chain**

* SBOM generation (per image), SAST/DAST, dependency scanning, CVE gating in CI/CD.
* Provenance attestations for images and IaC; drift detection on infra.

**Egress Governance**

* Policy-enforced allowlists, per-connector quotas, data exfiltration alerts.

---

## Audit Requirements

**Auditability**

* End-to-end **immutable** audit trail: user actions, admin changes, connector calls, prompt/retrieval events, data writes.
* **Correlation IDs** propagate across OpenWebUI, Flowise, Core, connectors, and Miso.

**Retention & Integrity**

* Configurable retention (e.g., 12–24+ months) in Log Analytics/Storage with write-once options.
* Tamper-evidence via hashing and storage immutability policies.

**Evidence Pack**

* Access reviews, change approvals, pipeline artifacts, vulnerability reports, backup/restore test results, policy compliance summaries.

**External SIEM**

* Native export/integration with Microsoft Sentinel or third-party SIEM for detection & response.

---

## Certifications

**Platform Posture**

* AI Fabrix is **designed to support** your certifications (e.g., ISO/IEC 27001, SOC 2).
* Running in your tenant enables you to leverage **Azure’s certifications** (ISO, SOC, PCI, etc.) for inherited controls.

**Customer Responsibilities**

* Operate an ISMS/GRC program, perform risk assessments, maintain policies, and run periodic access reviews and control testing.

> Note: If you require vendor-side certification attestations, a separate assessment can be scoped (controls, code, and process review).

---

## Regulatory Compliance

**EU & Global**

* **GDPR** (privacy-by-design), **NIS2** (essential entities—governance/incident readiness), **DORA** (financial sector resilience), **CCPA/CPRA** (US-CA).

**Healthcare & Life Sciences (optional/when applicable)**

* **HIPAA**: PHI handling patterns (isolation, logging, minimum necessary, BAAs as needed).
* **EU MDR/IVDR & IEC 62304**: For software supporting medical workflows—traceability, change control, verification evidence.
* **GxP**: Validation packages and audit trails to support CSV where required.

**Financial Services**

* **PCI DSS (integration)**: Do not process/store PAN data in Fabrix; integrate with PCI-scoped systems via tokenised patterns.

---

## Security Architecture

**Design Principles**

* **In-tenant, zero-trust**: No public control plane; private-by-default.
* **Defense-in-depth**: Identity, network, host, app, and data-layer controls.
* **Policy-as-Code**: Azure Policy/Blueprints enforced by **Miso** across environments.
* **Secretless Runtimes**: Managed identities, one-time short-lived tokens where needed.
* **Fail-Secure Defaults**: Deny-by-default egress; least privilege everywhere.

**Observability**

* Golden signals (latency, errors, saturation), structured logs, traces, metrics with SLOs and error budgets.

---

## Risk Management

**Approach**

* **ISO 27005-aligned** risk process with continuous updates: identify → assess → treat → monitor.
* **Threat Modelling**: STRIDE/LINDDUN for workflows and data flows; update on each major change.
* **Risk Register**: Owner, likelihood/impact, treatment plan, due dates, residual risk.

**Controls Testing**

* Automated policy compliance; vulnerability mgmt and patch SLAs; periodic table-top incident drills.
* Backup/restore drills; RTO/RPO validation; dependency failure simulations (chaos testing where appropriate).

**Third-Party & Connector Risk**

* Connector allowlisting; per-connector scopes; vendor risk review for critical integrations.
* Contractual terms for any externally hosted LLMs or APIs (data use, retention, sub-processing).

---

### Implementation Checklist (optional appendix)

* [ ] Entra ID SSO & SCIM enabled; access reviews scheduled
* [ ] Key Vault CMK rotation policy configured; no secrets in CI
* [ ] VNets + Private Endpoints; deny public egress by default
* [ ] Logging/metrics/traces to SIEM with ≥12 months retention
* [ ] CI/CD with SAST/DAST, image signing, SBOMs, CVE gates
* [ ] Backup/PITR configured; recovery tested and documented
* [ ] DPIA/RoPA updated; egress allowlists and data maps approved
* [ ] Incident response runbooks tested; on-call and RACI defined
