# Exit Path & Open Foundation

AI Fabrix is designed to avoid **vendor lock-in**. Unlike SaaS AI platforms, it runs entirely inside the customer's own Azure tenant, using open standards and containerized components.
This ensures that enterprises always retain control over their infrastructure, data, and AI workflows.

## Table of Contents

1. [Open-Source Foundation](#open-source-foundation)
2. [No Lock-In by Design](#no-lock-in-by-design)
3. [Exit Path Options](#exit-path-options)
4. [Key Takeaway](#key-takeaway)

## Open-Source Foundation

Fabrix builds on **open-source components** such as Flowise, pgvector, and OpenWebUI.
The enterprise layer adds governance (Miso), observability, and policy enforcement, but the **core remains portable**.

If a subscription ends, customers can:

- Continue running open components independently.
- Retain embeddings, vector stores, and AI pipelines.
- Extend or migrate with their own connectors and plugins.

## No Lock-In by Design

- **In-Tenant Infrastructure**: All resources are deployed in the customer's Azure subscription.
- **Standard Azure Services**: PostgreSQL, Redis, Azure Storage, App Services, and Key Vault remain customer-owned.
- **Portable Workflows**: Flowise pipelines and connectors are not tied to a proprietary SaaS runtime.
- **Data Sovereignty**: All embeddings, indexes, and metadata remain inside Azure-controlled databases.

## Exit Path Options

1. **Continue with Open-Source**

   - Run Flowise, OpenWebUI, and connectors independently.
   - Maintain your vector store and metadata filters.

2. **Hybrid Migration**

   - Keep governance-critical elements (e.g., policies, SCIM, RBAC) under Fabrix.
   - Gradually transition workloads into customer-managed orchestration.

3. **Full Decommissioning**

   - Uninstall Miso and Fabrix control layers.
   - Retain all underlying Azure infrastructure and data.

## Key Takeaway

Fabrix ensures enterprises have **freedom of choice**.
You gain the benefits of an enterprise-ready control layer without being locked into a vendor SaaS model.
If strategy changes, you can **exit gracefully** and continue on open components, protecting long-term investment in both AI and infrastructure.
