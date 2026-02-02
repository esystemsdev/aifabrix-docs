# Evaluation Guide

AI Fabrix provides a clear evaluation path that helps enterprises move from proof-of-concept to production with confidence. This section explains how to evaluate the platform, what criteria to use, and how to structure a 30-day proof-of-concept. It also includes sizing guidance, security checklists, and competitive comparisons to support informed decision-making.

## Table of Contents

1. [How to Evaluate Fabrix (Key Criteria)](key-criteria.md)
2. [30-Day Proof-of-Concept Plan](proof-of-concept.md)
3. [Architecture & Security Checklist](security-checklist.md)
4. [Cost & Sizing Guide](cost-sizing.md)
5. [Competitive Comparison](competitive-comparison.md)
6. [Pilot & Rollout Playbook](pilot-rollout.md)

## How to Evaluate Fabrix (Key Criteria)

Evaluation should focus on five enterprise pillars that differentiate Fabrix from SaaS AI tools, open-source frameworks, and baseline Microsoft services.

### In-Tenant by Design

Fabrix runs fully inside the customer's Azure tenant, giving enterprises direct control over data, identity, and networking. This avoids SaaS data exposure and ensures compliance with internal and external regulations.

### Metadata-Aware Retrieval

Unlike basic RAG pipelines, Fabrix enforces permission-aware retrieval across SharePoint, Teams, CRM, and ERP systems. Users only see what they are entitled to, ensuring security and compliance in every query.

### Governance & Control (Miso)

The Miso layer provides enterprise governance through policy packs, Entra ID integration, SCIM provisioning, audit trails, and quotas. This ensures AI adoption follows the same guardrails as other critical IT platforms.

### Predictable Economics

Fabrix uses subscription tiers (S/M/L/XL) combined with direct Azure billing. This makes cost predictable and transparent, eliminating hidden infrastructure or compliance costs that often derail pilots.

### Open Foundation / No Lock-In

Fabrix is built on open-source components and deploys inside the customer's tenant. If a subscription ends, customers can continue independently, protecting long-term investments.

## 30-Day Proof-of-Concept Plan

A structured 30-day plan accelerates evaluation while reducing risk:

- **Week 1:** Deploy Fabrix in the Azure tenant. Validate network isolation and Key Vault integration.
- **Week 2:** Connect Microsoft 365 (SharePoint/Teams) and one business system such as CRM.
- **Week 3:** Test metadata-aware retrieval with real documents and existing permissions.
- **Week 4:** Validate governance, security, and cost telemetry across workflows.

## Architecture & Security Checklist

During evaluation, confirm Fabrix meets enterprise security and compliance standards:

- Azure-native deployment with Virtual Networks and Private Endpoints.
- Key Vault–only secret management.
- Entra ID single sign-on integration.
- SCIM-based user and group provisioning.
- RBAC inheritance across all workspaces.
- Full audit logging with correlation IDs.
- [[PLACEHOLDER: add optional compliance checks specific to industry]].

## Cost & Sizing Guide

Fabrix supports predictable subscription tiers sized S, M, L, and XL. Each size maps to workload complexity and user volume, ensuring right-sized deployments from proof-of-concept to enterprise rollout.

Azure infrastructure costs are billed directly to the customer's subscription, providing transparency. This approach eliminates hidden charges and gives enterprises confidence in long-term cost predictability.

## Competitive Comparison

Fabrix stands out by combining governance, security, and cost predictability:

- **SaaS AI Tools:** No in-tenant control, limited governance, high vendor lock-in.
- **Open Source Only:** No enterprise-grade policies, hidden compliance and integration costs.
- **Microsoft Baseline:** Strong AI services but lacks metadata, observability, and governance layers—Fabrix fills these gaps.

## Pilot & Rollout Playbook

The recommended journey moves from evaluation to full enterprise adoption.

- **Step 1: Proof-of-Concept (30 days):** Validate deployment, connectors, and governance.
- **Step 2: Departmental Pilot:** Run a real business use case to measure outcomes.
- **Step 3: Enterprise Rollout:** Scale across domains with governance, observability, and predictable ROI.

## Conclusion

Fabrix offers a structured, secure, and transparent evaluation path. It is the safest and most cost-predictable choice for enterprises building AI capabilities at scale.
