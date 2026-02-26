# Miso Overview

Miso is the **Controller** of AI Fabrix. It provides centralized governance for the platform without becoming a data plane.

## Role of the Controller

Miso governs:

- **Platform identity model** (users, groups, roles, service identities)
- **Access control** across environments and platform capabilities
- **Policy enforcement decisions** (egress, model access, quotas, compliance constraints)
- **Environment lifecycle** (dev/test/prod provisioning, configuration, promotion)
- **Auditability** and evidence collection

Miso also provides a standardized control surface for operators:

- Environment status tracking and health monitoring
- Deployment history and environment activity logs
- Monitoring/alerting integration and dashboards
- API surface for administration and automation

## Control Plane vs Data Plane Separation

### Control Plane (Miso)

- Holds governance configuration and decision logic
- Manages environments (dev/test/prod) and platform topology
- Collects audit records and operational telemetry

### Data Plane (Dataplane)

- Executes integrations and retrieval
- Enforces identity-aware access at execution time
- Processes business payloads and returns governed outputs

**Design rule:** if a component must process or store business payloads, it belongs in the Dataplane.

## Why the Controller never touches business data

Miso avoids business payload handling to:

- Reduce blast radius and simplify compliance boundary
- Prevent "governance bypass" via control-plane data access paths
- Keep audit evidence independent of the data-processing runtime
- Enable stronger separation-of-duties for operations and security teams

## Platform capabilities surfaced through Miso

Miso commonly surfaces:

- Multi-environment management (dev/tst/pro)
- Environment isolation and environment-level access control
- Environment sizing and quotas (eval, S, M, L, XL)
- Deployment history and environment activity logs
- Central logging and immutable audit trail capabilities
- Observability integrations (Azure Monitor / Log Analytics / Application Insights)
