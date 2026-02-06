# 30-Day Proof-of-Concept Plan

Enterprises evaluating AI Fabrix should aim for a structured **30-day proof-of-concept (PoC)**. This approach balances infrastructure validation with business value demonstration, ensuring both IT and business stakeholders see measurable outcomes.

The plan assumes **20 working days** and is divided into two phases:

- **Phase 1 (10 days): Infrastructure, validation, and compliance alignment**
- **Phase 2 (10 days): Business use case with real data**

## Phase 1: Infrastructure & Compliance Validation (Days 1–10)

The first phase focuses on setting up Fabrix inside your Azure tenant and validating it against your enterprise IT standards.

**Key activities:**

- Deploy Fabrix in your Azure subscription (VNet, Private Endpoints, Key Vault).
- Integrate identity and access with **Entra ID** (SSO, RBAC inheritance).
- Enable SCIM provisioning for user and group management.
- Validate audit logs, telemetry, and security controls.
- Align deployment with your **compliance processes** (ISO, GDPR, HIPAA, or sector-specific).
- Ensure Fabrix matches your internal IT and change management requirements.

**Outcome:** Infrastructure is production-grade, validated against enterprise IT policies, and approved for controlled business use.

## Phase 2: Real Use Case with Real Data (Days 11–20)

The second phase demonstrates business value by applying Fabrix to one **practical use case** using real data.

**Key activities:**

- Connect Microsoft 365 (SharePoint, Teams) and one business system (e.g. CRM or ERP).
- Ingest and index a real dataset with metadata-aware retrieval.
- Configure policies to ensure users only access what they are entitled to.
- Run pilot workflows in **Flowise orchestration** with OpenWebUI for end-user testing.
- Measure outcomes: accuracy, compliance, speed, and cost telemetry.
- Document lessons learned for production rollout.

**Outcome:** Clear evidence of value in a real use case, aligned with enterprise security and compliance.

## Why This Matters

- Many AI pilots fail because they skip **compliance alignment** or avoid **real data testing**. Fabrix ensures both are covered in 30 days.
- This dual-track approach makes it possible to move **directly from PoC to production**, without rework.
- Success requires **alignment with your internal IT processes**. Fabrix provides the platform, but governance, access approvals, and project scope must be driven by your organization.

## Key Takeaway

A successful 30-day PoC delivers:

1. **Validated infrastructure** inside your Azure tenant.
2. **Confirmed compliance** with your security and audit requirements.
3. **Real-world results** on a business use case with real data.

With these three outcomes, enterprises can confidently progress to pilot and production.
