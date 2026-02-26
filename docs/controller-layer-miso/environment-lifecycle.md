# Environment Lifecycle

Miso governs environment lifecycle to ensure AI workloads are promoted safely and reproducibly.

## Dev → Test → Prod promotion

Miso supports multi-environment operation (commonly dev/tst/pro), including:

- Environment isolation
- Environment status tracking and health monitoring
- Environment deployment history and activity logs

Promotion goals:

- Make changes reviewable, versioned, and reversible
- Prevent "works in dev" drift from reaching production
- Ensure governance settings move with the release, not after it

[[PLACEHOLDER: define the canonical promotion workflow, artifact types, and responsibilities]]

## Configuration drift prevention

Drift occurs when production diverges from the approved configuration baseline.

Miso mitigates drift via:

- Central configuration management
- Environment configuration validation
- Controlled change processes and approvals
- Audit trails for configuration changes

[[PLACEHOLDER: drift detection model (what is compared, how often, what triggers alerts)]]

## Versioning and rollback

Environment changes should be:

- Versioned (configurations, templates, policies)
- Traceable (who changed what, when, under which approval)
- Rollback-capable (return to prior known-good state)

Miso provides:

- Environment deployment history
- Activity logs
- Controlled application templates and deployments

[[PLACEHOLDER: rollback semantics and supported rollback scope]]

## Approval gates

Approval gates enforce separation of duties and reduce risky changes.

Common gate patterns:

- Security review gate for policy changes
- Platform operator approval for production promotion
- Change window enforcement for regulated environments

Miso includes access request and approval workflows for controlled access.

[[PLACEHOLDER: approval gate configuration and evidence outputs]]
