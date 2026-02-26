# Audit & Observability

Miso provides auditability and operational visibility as first-class platform functions.

## Audit trails and evidence

Audit records should make it possible to answer:

- Who performed an action?
- What did they change or access?
- In which environment/workspace?
- Under which policy and approval state?
- What evidence exists to support compliance review?

Miso supports:

- Comprehensive audit logging
- ISO 27001-aligned audit trails
- Immutable audit records
- User context in audit logs
- Audit log queries and export
- Audit retention policies
- Correlation ID tracking

## Access logs and policy decisions

A governance platform must record not only actions, but **decisions**:

- Access allow/deny decisions (with reason)
- Policy evaluations (which policy triggered the outcome)
- Approval gate outcomes

Miso's logging model includes structured logging and queryable audit feeds.

[[PLACEHOLDER: canonical schema for "policy decision" events]]

## Model usage tracking

Model usage tracking supports:

- Operational debugging (latency, errors)
- Governance oversight (who used which model, under which policy)
- Budget and cost controls

Miso integrates with common telemetry backends:

- Azure Monitor
- Log Analytics
- Application Insights
- OpenTelemetry instrumentation
- Distributed tracing and correlation IDs

[[PLACEHOLDER: model usage metrics catalog and required dimensions (workspace, env, identity, model, cost)]]

## Cost attribution and chargeback

Cost attribution requires consistent tagging and metering dimensions such as:

- Environment
- Workspace
- Application / workflow
- Identity (user/service)
- Model/provider

Miso provides the governance context needed for chargeback reporting.

[[PLACEHOLDER: cost attribution reference implementation (Azure tags, logs → reporting)]]
