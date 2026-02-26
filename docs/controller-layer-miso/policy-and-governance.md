# Policy & Governance

Miso centralizes policy definition and governance controls so enforcement is consistent across tools, agents, and environments.

## Policy packs overview

Policy packs represent structured, versionable governance rules that can be applied across environments and workloads.

They typically cover:

- Data egress controls
- Model access policies
- Quotas and rate limits
- Compliance and regulatory constraints

[[PLACEHOLDER: list of built-in policy packs and how they are configured]]
[[PLACEHOLDER: policy pack versioning and promotion behavior]]

## Data egress controls

Egress controls determine:

- Which outbound network paths are allowed
- Which domains/endpoints may be accessed
- Which environments are permitted to communicate externally

Miso participates by:

- Holding policy configuration
- Enforcing environment/network configuration constraints where applicable
- Recording decisions and changes as audit evidence

Relevant control-plane capabilities include:

- Allowed IP ranges configuration (CIDR support)
- Private networking support and private endpoints configuration
- Virtual Network integration and Azure DNS / Front Door integration
- WAF / DDoS controls where deployed as part of the environment profile

[[PLACEHOLDER: explicit "egress allowed/blocked" decision flow and evidence model]]

## Model access policies

Model access policies determine:

- Which model providers and endpoints are permitted (e.g., Azure OpenAI, others)
- Which environments may use which models
- Which identities / roles may call specific model capabilities

Miso should store and govern:

- Allowed model endpoints
- Approved model catalogs per environment
- Usage constraints (quotas, allowed tools/actions)

[[PLACEHOLDER: authoritative model policy schema and examples]]

## Quotas and rate limits

Quotas protect cost and operational stability by placing limits on:

- Request volume / rate per identity, workspace, or environment
- Token/compute budget (where measurable)
- Burst protection for workloads that could overwhelm dependencies

Miso participates by:

- Central policy definition
- Central reporting of usage against limits
- Deterministic evidence for "why a call was allowed/denied"

[[PLACEHOLDER: quota objects, dimensions, and enforcement points]]

## Compliance and regulatory controls

Miso supports compliance readiness through:

- Immutable audit trails
- Security event logging
- Compliance reporting
- Environment isolation and promotion controls
- Integration with enterprise monitoring platforms

Referenced capabilities include:

- ISO 27001-aligned audit trails and controls
- GDPR support considerations (tenant-boundary, retention, evidence)

[[PLACEHOLDER: compliance mapping table (ISO 27001 / SOC2 / GDPR) to Miso controls]]
