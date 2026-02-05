# 3. Architecture Overview

AI Fabrix is designed as an **in-tenant, Azure-native enterprise AI architecture** where identity, policy, and governance are enforced structurally across every execution path.

The architecture deliberately separates **control**, **execution**, **orchestration**, and **interaction** to eliminate common enterprise AI failure modes such as identity loss, service-account sprawl, and non-deterministic audits.

This section explains the architecture from four perspectives:

- High-level structure
- Trust boundaries and execution zones
- Identity and policy flow
- End-to-end request lifecycle

---

## 3.1 High-Level Architecture

AI Fabrix is composed of four distinct architectural layers, each with a single, non-overlapping responsibility.

### Architectural Layers

1. **Controller Layer (Miso)**  
   Governance, identity, policy enforcement, and lifecycle management.

2. **Dataplane**  
   Secure execution boundary where enterprise data is accessed and transformed through governed pipelines.

3. **Orchestration Layer**  
   Composition of AI agents, workflows, and retrieval logic using governed tools.

4. **Interface Layer**  
   Enterprise user interaction surfaces such as chat, portals, and collaboration tools.

Each layer is independently evolvable, but **no layer can bypass another**.

---

## 3.2 Trust Boundaries and Execution Zones

AI Fabrix explicitly defines trust boundaries to prevent implicit privilege escalation and accidental data exposure.

### In-Tenant Boundary

All AI Fabrix components are deployed entirely inside the customer's Azure tenant:

- Customer-managed subscriptions
- Private networking and endpoints
- Entra ID–based identity
- Customer-controlled encryption keys

There is no shared SaaS control plane by default.

### Execution Zones

| Zone | Purpose | Characteristics |
|---|---|---|
| Controller | Governance and policy | No business data access |
| Dataplane | Data execution | Identity- and policy-enforced |
| Orchestration | AI logic | No raw system access |
| Interface | Human interaction | No direct data/system access |

This ensures compromise of one zone does not expose the others.

---

## 3.3 Identity and Policy Flow

Identity is the **primary execution context** in AI Fabrix.

It is never dropped, replaced, or generalized.

### Identity Model

- Authentication via Microsoft Entra ID
- User and workload identity propagate end-to-end
- AI agents act strictly on behalf of authenticated identities
- No default service accounts for data access

### Policy Enforcement

Policies are defined and evaluated centrally and enforced structurally at execution boundaries.

Policy categories include:

- RBAC and ABAC
- Environment and lifecycle controls
- Data egress and movement policies
- Quotas and usage limits
- Compliance and audit requirements

Policies are not embedded in application logic and are not re-implemented per workflow.

---

## 3.4 End-to-End Request Lifecycle

Every request—human, API, or agent—follows the same governed execution path.

### Request Flow

1. User authenticates via Entra ID
2. Interaction occurs through a governed interface
3. Orchestration composes the request using governed tools
4. Dataplane executes pipelines with enforced identity and policy
5. Controller evaluates policy, records audit, and enforces constraints
6. Response is returned with permissions already applied

There are no AI-specific exception paths.

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "fontFamily": "Poppins, Arial Rounded MT Bold, Arial, sans-serif",
    "fontSize": "15px",
    "background": "#FFFFFF",
    "primaryColor": "#F8FAFC",
    "primaryTextColor": "#0B0E15",
    "primaryBorderColor": "#E2E8F0",
    "lineColor": "#E2E8F0",
    "textColor": "#0B0E15",
    "subGraphTitleColor": "#64748B",
    "subGraphTitleFontWeight": "500"
  }
}}%%

flowchart LR

classDef control fill:#2563EB,color:#ffffff,stroke:#1E40AF;
classDef core fill:#4F46E5,color:#ffffff,stroke:#3730A3;
classDef flow fill:#7C3AED,color:#ffffff,stroke:#5B21B6;
classDef ui fill:#0D9488,color:#ffffff,stroke:#065F46;

miso["Miso Controller"]:::control
data["Dataplane"]:::core
orch["Orchestration Layer"]:::flow
ui["Interface Layer"]:::ui

miso --> data --> orch --> ui
