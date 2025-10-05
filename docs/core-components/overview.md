# Core Components

AI Fabrix is built from modular components that together form a secure, governed, and extensible enterprise AI platform. Each component has a clear responsibility and integrates seamlessly with Microsoft Azure services. This section introduces the core layers of Fabrix and explains their role in delivering enterprise-grade AI.

## Table of Contents

1. [Miso — Governance & Deployment](miso-governance.md)
2. [Core Platform Services — Metadata-Aware Retrieval & Connectors](core-platform-services.md)
3. [Flowise — Orchestration for RAG Pipelines & Agents](flowise-orchestration.md)
4. [OpenWebUI — Secure UX for Chat & Case Building](openwebui-secure-ux.md)
5. [SDK & Plugins — Developer Extensions](sdk-plugins.md)
6. [Chat Interface — Microsoft Teams, Slack & Beyond](chat-interface.md)

## Miso — Governance & Deployment

Miso is the **control and deployment layer** of Fabrix. It provides identity integration with Entra ID, SCIM-based provisioning, and role-based access control. Policy packs allow administrators to enforce quotas, data egress restrictions, and audit logging.

Miso also manages the lifecycle of environments (Dev → Test → Prod) as policy-as-code, ensuring enterprise governance extends to AI workflows. This makes Fabrix deployment predictable, auditable, and aligned with ISO-27001 standards.

## Core Platform Services — Metadata-Aware Retrieval & Connectors

The core platform services handle **retrieval, metadata, and connectors**. Fabrix ingests content from Microsoft 365, CRM, ERP, databases, and file systems while respecting source permissions.

The metadata system ensures that RAG pipelines can filter results by business context, security attributes, and compliance policies. Connectors are governed, audited, and centrally observable, reducing the risks of shadow integrations.

## Flowise — Orchestration for RAG Pipelines & Agents

Flowise powers **retrieval-augmented generation (RAG) orchestration** inside Fabrix. It allows enterprises to design, run, and monitor pipelines that combine data sources, AI models, and governance policies.

With Flowise, enterprises can standardize AI agent behavior, reuse building blocks, and enforce structured outputs. This accelerates adoption by making AI flows transparent, governed, and ready for production scaling.

## OpenWebUI — Secure UX for Chat & Case Building

OpenWebUI provides the **user interface** for Fabrix. It is a secure, collaborative environment where employees can query enterprise knowledge, build cases, and work across projects.

Unlike consumer-grade chat tools, OpenWebUI enforces enterprise identity, permissions, and audit requirements. Conversations and evidence can be linked to business cases, making it suitable for regulated industries.

## SDK & Plugins — Developer Extensions

The SDK and plugin framework enable developers to **extend Fabrix safely**. Plugins run server-side, with no browser-stored credentials, ensuring secure integration with enterprise systems.

Features include dynamic input fields, schema validation, versioned manifests, and contract testing. This framework allows organizations to connect legacy systems, build industry-specific extensions, and innovate without losing governance.

## Chat Interface — Microsoft Teams, Slack & Beyond

AI Fabrix is **open by design** when it comes to user interaction. While OpenWebUI is the native interface for secure chat and case building, Fabrix can also integrate with **Microsoft Teams, Slack, or other collaboration tools**.

### Key Capabilities

- **Native ChatOps** — Employees can use AI assistants directly inside Teams or Slack, without switching tools.
- **Policy-Aware Responses** — Even when embedded in external chat platforms, Fabrix ensures retrieval and answers respect Entra ID permissions and Miso policies.
- **Cross-Platform Flexibility** — Organizations can adopt OpenWebUI for structured case management, while still enabling lightweight Q&A inside Teams/Slack.
- **Custom Integration** — Through the SDK & Plugins, enterprises can embed Fabrix assistants into any internal system or chat interface.

### Why It Matters

- **Adapts to Existing Tools:** Employees stay in the flow of work.
- **Supports Internal Use Cases:** Project discussions, sales opportunities, or compliance queries can all happen directly in Teams/Slack.
- **Openness & Extensibility:** Demonstrates that Fabrix is not locked to one UI — it extends securely into any enterprise system.

## Conclusion

Together, these components make Fabrix a complete enterprise AI fabric.

- **Miso** provides governance,
- **Core Services** deliver metadata-aware retrieval,
- **Flowise** orchestrates pipelines,
- **OpenWebUI** enables structured collaboration,
- **SDK & Plugins** allow safe extensions, and
- **Chat Interfaces** bring AI directly into everyday tools like Microsoft Teams and Slack.

All operate **inside the customer's Azure tenant**, ensuring governance, compliance, and adaptability.

✅ [[PLACEHOLDER: Add diagram — Core components, showing OpenWebUI as the default UX, plus optional Teams/Slack integration through SDK/Plugins.]]
