# Identity & Access

AI Fabrix is identity-native. Miso centralizes the identity model and ensures identity context is preserved across governed AI execution.

## Entra ID Integration

Miso integrates with **Microsoft Entra ID** for:

- SSO authentication
- Group membership and role mapping
- Token-based identity context propagation

Supported identity integration capabilities include:

- Entra ID integration
- Centralized identity management with JWT tokens
- Group management and group membership management
- Keycloak SSO integration (where used as an intermediary IdP layer)

[[PLACEHOLDER: describe the recommended "Entra ID → Miso" claim mapping model (groups, roles, workspaces)]]

## RBAC and ABAC model

### RBAC (Role-Based Access Control)

Miso supports RBAC for platform actions such as:

- Environment access (dev/test/prod)
- Application-level access (controller-managed applications)
- Administrative actions (deploy, configure, approve, promote)

Typical platform roles (example) include:

- Admin
- Developer
- Viewer
- Auditor

Exact role definitions, inheritance rules, and permissions should be defined as part of the customer's governance model.

[[PLACEHOLDER: authoritative RBAC role matrix for AI Fabrix + Miso]]

### ABAC (Attribute-Based Access Control)

ABAC is used when access decisions must include attributes such as:

- Business unit / department
- Region / data residency zone
- Case/workspace membership
- Data classification level

[[PLACEHOLDER: ABAC enforcement points and which attributes are evaluated in Miso vs enforced in the Dataplane]]

## SCIM provisioning

Miso supports **SCIM 2.0** for lifecycle-managed identity provisioning:

- User provisioning and deprovisioning
- Group synchronization
- Consistent access state across environments

This reduces manual identity administration and supports enterprise joiner/mover/leaver processes.

[[PLACEHOLDER: SCIM configuration guide for Entra ID → Miso provisioning]]

## Workspace and environment scoping

Miso enables scoping controls across:

- **Environments**: dev / test / prod isolation with environment-level access control
- **Workspaces**: human and agent activity scoped to workspace context

Key principles:

- Access is not "global by default"
- Operators can restrict which identities may operate in which environments
- Workspace membership should be treated as an access boundary, not a UI feature

[[PLACEHOLDER: define "workspace" formally (ownership, membership, lifecycle, evidence)]]
