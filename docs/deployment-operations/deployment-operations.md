# 11. Deployment & Operations

AI Fabrix is deployed and operated as a first-class, Azure-native enterprise platform.
All components run entirely inside the customer's Azure tenant and follow standard enterprise operational models.

This section describes how AI Fabrix is deployed, networked, scaled, operated, and protected in production environments.

---

## 11.1 Azure-Native Deployment Models

### In-Tenant Deployment (Mandatory)

AI Fabrix is deployed entirely inside the customer's Azure tenant.

There is:
- No shared SaaS control plane
- No vendor-operated runtime
- No external data processing boundary by default

All components operate under the customer's:
- Azure subscriptions
- Resource groups
- Identity and access controls
- Network and security policies

This deployment model is foundational and non-optional.

### Azure Services and Primitives

AI Fabrix uses standard Azure-native services, including:
- Azure Kubernetes Service (AKS)
- Azure Virtual Networks (VNet)
- Azure Key Vault
- Azure Container Registry
- Azure Monitor and Log Analytics
- Entra ID (Azure AD)

No proprietary infrastructure components are introduced.

[[PLACEHOLDER: minimum Azure service SKUs and regional requirements]]

### Environment Separation

AI Fabrix supports standard enterprise environment separation:
- Development
- Test
- Production

Environment lifecycle and promotion are governed centrally by the Controller layer (Miso).

Community Edition deployments are intentionally limited to a single Development environment.

---

## 11.2 Networking and Private Endpoints

### Private-by-Default Networking

AI Fabrix is designed to operate in private Azure networks:
- Deployed into customer-managed VNets
- No public ingress required for core services
- Controlled east–west traffic
- Explicitly governed outbound traffic

### Private Endpoints

Where supported by Azure services, AI Fabrix integrates using:
- Azure Private Endpoints
- VNet-integrated services
- Private DNS resolution

This applies to dataplane execution, retrieval services, storage, and metadata systems.

### Egress Control

All outbound traffic is subject to centralized policy enforcement:
- Explicit allowlisting
- Environment-specific rules
- Fully auditable decisions

AI workloads do not bypass enterprise network controls.

---

## 11.3 Scaling and Performance Profiles

### Scale Without Architectural Change

AI Fabrix does not use feature-based scaling tiers.

The same platform architecture runs at all sizes.
Scale is achieved by adjusting Azure infrastructure capacity.

This ensures:
- Linear scalability from evaluation to production
- Predictable performance characteristics
- No architectural rework when scaling

### Infrastructure Profiles

Supported infrastructure profiles include:
- **S** — Evaluation and development workloads
- **M** — Departmental production workloads
- **L** — Enterprise-wide deployments
- **XL** — Large-scale or regulated environments

Profiles affect:
- Compute capacity
- Throughput
- Concurrency
- Data volume

[[PLACEHOLDER: detailed sizing and throughput guidance]]

### Horizontal Scaling

Key components scale horizontally:
- Dataplane execution (CIP pipelines)
- Retrieval and indexing services
- Orchestration workloads

Governance, identity enforcement, and audit behavior remain consistent at all scales.

---

## 11.4 DevOps and CI/CD Integration

### Infrastructure as Code

AI Fabrix supports standard Infrastructure-as-Code practices:
- ARM / Bicep
- Terraform
- GitOps-based workflows

[[PLACEHOLDER: reference deployment templates and repositories]]

### Controlled Lifecycle Management

All deployments and updates are governed by the Controller layer:
- Environment promotion (Dev → Test → Prod)
- Versioned configuration
- Controlled rollout of pipelines and workflows

Ad-hoc production changes are explicitly discouraged.

### CI/CD Integration

Typical CI/CD pipelines integrate with AI Fabrix for:
- CIP pipeline definitions
- Orchestration workflow updates
- Policy configuration changes

All changes are:
- Versioned
- Auditable
- Environment-scoped

No runtime changes bypass governance.

---

## 11.5 Backup, Recovery, and Disaster Recovery

### Backup Model

Because AI Fabrix runs entirely in-tenant:
- Customers retain full control of backup policies
- Azure-native backup mechanisms are used
- No proprietary backup formats are introduced

Key assets include:
- Configuration and metadata stores
- CIP definitions and contracts
- Audit and telemetry data

[[PLACEHOLDER: backup scope, RPO, and RTO guidance]]

### Recovery

Recovery follows standard Azure operational practices:
- Infrastructure redeployment via IaC
- Data restoration using Azure-native tools
- Configuration rehydration under governance controls

No specialized recovery tooling is required.

### High Availability and Disaster Recovery

HA and DR capabilities depend on:
- Selected infrastructure profile
- Environment topology
- Customer-defined Azure resilience configuration

Community Edition does not include HA/DR by design.

Standard and Enterprise deployments may support:
- Availability zone redundancy
- Regional redundancy
- Controlled failover

[[PLACEHOLDER: reference HA/DR architectures]]

---

## Operational Summary

From an operations perspective, AI Fabrix behaves as a well-architected Azure-native enterprise platform.

Key characteristics:
- Fully in-tenant deployment
- Private-by-default networking
- Predictable, linear scaling
- Enterprise-grade DevOps integration
- Azure-native backup and recovery

This operational model is a prerequisite for deploying AI in regulated, high-trust, and large-scale enterprise environments.
