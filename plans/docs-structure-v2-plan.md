# Documentation Structure V2 - Implementation Plan

> **Branch**: `feature/docs-structure-v2`  
> **Status**: Planning Phase  
> **Created**: 2026-02-02

## Overview

This plan outlines the implementation of Documentation Structure V2 for AI Fabrix, which will **completely replace** the existing V1 structure. The new structure cannot coexist with the old one - it is a full replacement that preserves all established rules, guidelines, and best practices.

**Critical**: V1 and V2 structures cannot exist side by side. The migration must be complete before deployment.

### Quick Summary

- **V1 Structure**: 10 top-level sections (overview, evaluation, core-components, etc.)
- **V2 Structure**: 14 sections organized by architecture layers (overview through resources)
- **Key Changes**: 
  - Architecture-focused organization (Controller, Dataplane, Orchestration, Interface layers)
  - New sections: "Why AI Fabrix Exists", "Open Standards & Contracts"
  - Expanded content: CIP (Composable Integration Pipelines) gets dedicated detailed section
  - Clean directory names (no numbers in URLs or navigation - numbers only for internal ordering)
- **Migration Type**: Complete atomic replacement (V1 removed after V2 validated)
- **Status**: V2 structure defined ✅ | Migration planning in progress

## Core Principles (Preserved from Existing Structure)

### 1. Customer-Safe Content

- Never expose internal secrets, IDs, or sensitive configuration
- Use placeholder values for internal names/secrets
- Focus on customer value and use cases
- Avoid deployment minutiae - Miso handles provisioning

### 2. End-User Documentation Focus

- **What users can do** (not how it's built)
- **Business workflows** (not technical processes)
- **User outcomes** (not system architecture)
- **Step-by-step guides** (not code examples)
- **Visual examples** (not technical diagrams)
- **User experience** (not developer experience)
- **Business value** (not technical implementation)

### 3. Source-Driven Documentation

- Extract facts directly from code/README/YAML/Bicep files
- Cite file paths inline for editor verification
- Keep documentation synchronized with source code
- Use repository structure as documentation structure

## File Organization Rules (Preserved)

### Metadata Standards

**CRITICAL**: All metadata must be in separate `.yaml` files, NOT in markdown frontmatter.

#### Markdown Files

- **NO frontmatter**: Markdown files should contain only content, no `---` sections
- **Clean content**: Start directly with the content, no metadata blocks
- **Pure markdown**: Only use markdown syntax for content formatting

#### YAML Metadata Files

- **Separate files**: Each `.md` file must have a corresponding `.yaml` file
- **Complete metadata**: All document metadata goes in the `.yaml` file
- **Naming convention**: `document.md` → `document.yaml`

#### Required YAML Metadata Structure

```yaml
title: "[Descriptive title]"
description: "[Brief summary]"
audience: ["end-user", "admin"]
version: "stable"
owner: "[Module owner]"
last_reviewed: "[YYYY-MM-DD]"
layout: "doc"
date: "[YYYY-MM-DD]"
toc: true
custom_links:
  - text: "Module Name"
    url: /docs/module/
    submenu:
      - text: "Document 1"
        url: /docs/module/document1/
      - text: "Document 2"
        url: /docs/module/document2/

# SEO Configuration
seo:
  keywords: ["AI Fabrix", "module", "user-guide"]
  canonical_url: "https://docs.aifabrix.ai/module/document"
  og_image: "images/module-document.png"

# Document360 Specific
document360:
  category: "Module Name"
  visibility: "public"
  searchable: true
  featured: false
  order: 1
```

## Writing Guidelines (Preserved)

### Page Structure

1. **Purpose** (1-2 sentences)
2. **Prerequisites** (environment, permissions)
3. **Steps or Details** (numbered, copy-paste blocks)
4. **Validation** (what "good" looks like)
5. **Troubleshooting** (top 3 issues)
6. **References** (file paths, code links)

### Style Rules

- Use customer-safe wording; no internal secrets/IDs
- Focus on user workflows and business outcomes
- Prefer visual examples (screenshots, diagrams) over code examples
- Use business language, avoid technical jargon
- Call out *operator tasks* vs *platform controls* (ISO alignment)
- Avoid repetition—link to Reference/How-To sections
- Use active voice and clear, concise sentences
- Include step-by-step user guides with clear outcomes

### Technical Standards

- All commands should be copy-pastable
- Include validation steps for each procedure
- Use consistent terminology (AI Fabrix, not "the platform")
- Link to related documentation sections
- Include troubleshooting for common issues

## Module Ownership (Preserved)

- **Platform (Core)**: Architecture & Security
- **Miso**: Cloud Platform / SRE  
- **Flowise & SDK**: Engineering
- **OpenWebUI**: Product + Engineering

## Repository Structure (Preserved)

```yaml
/docs/                    # Documentation source files (edit here - single source of truth)
/site/                    # Jekyll site configuration
  /_data/                 # Jekyll data files (navigation, etc.)
  /assets/images/         # Brand assets (logos, favicons)
  /_config.yml           # Jekyll configuration
  /_includes/            # Jekyll templates
  /_layouts/             # Jekyll layouts
/scripts/                 # TypeScript build scripts
/temp/                    # Temporary files and migration scripts
/openapi/                 # OpenAPI specifications
/prompts/                 # Cursor prompt templates
/.github/workflows/       # CI/CD pipelines
/tools/                   # Transformers, validators
```

## Cursor Workflow Patterns (Preserved)

### Discovery Prompts

When analyzing repositories, use these patterns:

- "Scan this repository. List: (1) components, (2) configuration files, (3) public interfaces, (4) operational concerns, (5) security-relevant settings."
- "From the table, identify items relevant to Platform Overview and Module pages."

### Content Generation

- Extract facts from source files
- Generate customer-safe documentation focused on end-users
- Include file path citations
- Focus on user workflows and business outcomes
- Create step-by-step guides for common tasks
- Emphasize what users can accomplish, not how systems work

### Quality Assurance

- Validate YAML metadata completeness
- Check for customer-safe content
- Ensure copy-pastable commands
- Verify link integrity
- Confirm audience appropriateness

## Compliance & Security (Preserved)

### ISO-27001 Alignment

- Distinguish between operator tasks and platform controls
- Document security controls and policies
- Maintain audit trail through Git history
- Ensure compliance artifacts are current

### Security Guidelines

- Never expose internal infrastructure details
- Use placeholder values for sensitive data
- Focus on customer-facing security features
- Document security controls and guardrails

## Content Generation Rules (Preserved)

### Source Repositories

1. **aifabrix-miso** - Core platform architecture and user guides
2. **aifabrix-core** - AI Fabrix Enterprise Flowise
3. **aifabrix-flowise** - Flowise user guides and workflows
4. **aifabrix-openwebui** - OpenWebUI user guides
5. **aifabrix-plugins** - Plugin development and extensions
6. **aifabrix-mori** - Backend services and subscription management (internal only)

### Content Categories

#### Include
- **Architecture documentation** (system design, components, integrations)
- **API references** (endpoints, schemas, examples)
- **User guides** (getting started, tutorials, workflows)
- **Configuration guides** (setup, deployment, configuration)
- **Security documentation** (authentication, RBAC, compliance)

#### Exclude (Internal Only)
- **Plans folders** (`docs/plans/`, `docs/development/`)
- **Internal specifications** (development specs, implementation details)
- **Project management docs** (task lists, implementation plans)
- **Internal reports** (validation reports, analysis documents)
- **Development workflows** (internal CI/CD, developer processes)

### Content Transformation Process

1. **Source Analysis**: Identify documentation files, extract key information, identify customer-relevant content
2. **Content Transformation**: Remove internal URLs/credentials, simplify technical language, add customer context
3. **Quality Assurance**: Verify no internal information exposed, check technical accuracy, validate accessibility
4. **Metadata Generation**: Create complete YAML metadata files (NO frontmatter in markdown)

### Repository-Specific Rules

- **aifabrix-miso**: Focus on end-user workflows for AI orchestration and environment management
- **aifabrix-core**: Focus on end-user workflows for AI services and data management
- **aifabrix-flowise**: Focus on end-user workflows for AI automation and agent creation
- **aifabrix-openwebui**: Focus on end-user workflows for AI chat and interface management
- **aifabrix-plugins**: Focus on end-user workflows for plugin and extension management
- **aifabrix-mori**: Focus on end-user workflows for subscription and billing management (internal only)

## Style & Formatting Rules (Preserved)

### Writing Style Guidelines

#### Tone & Voice
- **Professional yet approachable**: Technical but not intimidating
- **Confident**: Demonstrate expertise without arrogance
- **Helpful**: Anticipate user needs and questions
- **Clear**: Use simple, direct language

#### Language Standards
- **Active voice**: "Configure the setting" not "The setting should be configured"
- **Present tense**: "AI Fabrix provides" not "AI Fabrix will provide"
- **Consistent terminology**: Use "AI Fabrix" not "the platform" or "our solution"
- **Gender-neutral**: Use "they/them" or restructure sentences

#### Sentence Structure
- **Short sentences**: 15-20 words maximum
- **One idea per sentence**: Avoid complex compound sentences
- **Parallel structure**: Use consistent formatting in lists
- **Clear transitions**: Guide readers through logical flow

### Customer-Safe Content Rules

#### What to Include
✅ Customer-facing features and capabilities  
✅ Public APIs and interfaces  
✅ Configuration examples with placeholders  
✅ Business value and use cases  
✅ Security and compliance features  
✅ Integration patterns and best practices

#### What to Exclude
❌ Internal secrets, keys, or credentials  
❌ Internal infrastructure details  
❌ Proprietary algorithms or implementation details  
❌ Internal team names or processes  
❌ Sensitive configuration values  
❌ Internal debugging information

#### Placeholder Guidelines
Use consistent placeholder patterns:
- Environment variables: `AZURE_SUBSCRIPTION_ID: "your-subscription-id"`
- URLs: `https://your-instance.aifabrix.ai`
- Resource names: `your-aifabrix-instance`

### Markdown Formatting Standards

#### Code Blocks (MD040)
- **Always specify language**: Use `bash`, `json`, `yaml`, `javascript`, `typescript`, `python`, etc.
- **Never use plain code blocks**: Always include language specification after ```
- **Blank lines around code blocks**: Always add blank lines before and after fenced code blocks (MD031)

#### Headers (MD036)
- **Use proper markdown headers**: # ## ### #### ##### ######
- **Never use emphasis for headers**: Avoid **bold** or *italic* for section titles
- **Blank lines around headers**: Always add blank lines before and after headers (MD022)

#### List Formatting (MD032)
- **Consistent bullet points**: Use - for unordered lists
- **Blank lines around lists**: Always add blank lines before and after lists
- **Proper spacing**: Add blank lines between sections

### Audience-Specific Guidelines

#### Executive Audience (Exec)
- **Focus**: Business value, ROI, strategic benefits
- **Language**: High-level, outcome-focused
- **Content**: Use cases, competitive advantages, compliance benefits

#### Architect Audience (Architect)
- **Focus**: Technical architecture, integration patterns
- **Language**: Technical but accessible
- **Content**: Design decisions, scalability, security architecture

#### Developer Audience (Developer)
- **Focus**: End-user workflows and business outcomes
- **Language**: Business-focused, outcome-oriented
- **Content**: User guides, workflow documentation, business value

#### Security Audience (Security)
- **Focus**: Security controls, compliance, risk management
- **Language**: Security-focused, compliance-oriented
- **Content**: Controls mapping, audit procedures, security features

### SEO and Discoverability

#### Title Optimization
- Include primary keyword: "AI Fabrix [Topic]"
- Use action verbs: "Configure", "Deploy", "Integrate"
- Keep under 60 characters
- Be descriptive about page content

#### Description Optimization
- 50-160 characters optimal
- Include primary keyword early
- Use action language: "Learn how to", "Discover how"
- Include value proposition

#### Content Optimization
- Use headings strategically: Include keywords in H2/H3
- Link internally: Connect related documentation
- Use alt text: Describe images for accessibility
- Include FAQs: Address common questions

### Brand Voice Guidelines

#### AI Fabrix Brand Attributes
- **Enterprise-grade**: Professional, reliable, secure
- **Azure-native**: Cloud-first, scalable, integrated
- **Compliance-focused**: ISO-27001, security-first
- **Business-oriented**: ROI-focused, practical, valuable
- **Innovative**: Cutting-edge, forward-thinking, advanced

#### Messaging Pillars
- **Beyond Copilots**: More than just AI assistance
- **Compliance by Design**: Security built-in, not bolted-on
- **Business-First AI**: AI that serves business objectives
- **One Fabric**: Integrated, unified platform
- **Azure-Native ISO27k**: Enterprise security and compliance

## Automation Integration (Preserved)

### Build Pipeline Steps

1. **Validate YAML** - Ensures all metadata files are properly structured
2. **Generate Navigation** - Creates navigation files for each folder
3. **Generate Main Navigation** - Creates main site navigation
4. **Merge Metadata** - Combines YAML metadata into markdown frontmatter for Jekyll
5. **Build Jekyll** - Generates static site from processed files
6. **Deploy** - Pushes to GitHub Pages (if not in GitHub Actions)

### CI/CD Pipeline

- Validate markdown and links
- Check YAML metadata completeness
- Ensure customer-safe content
- Generate navigation and versioning
- Deploy to Document360 or Docusaurus

### Quality Gates

- Lint style and structure
- Validate terminology consistency
- Check SEO requirements
- Ensure accessibility standards
- Validate markdown formatting (MD040, MD036, MD032, MD022, MD031)

## When Working with This Project (Preserved)

### Always Do
1. **Always** check the target audience before writing
2. **Always** include proper YAML metadata files
3. **Always** cite source files when extracting information
4. **Always** validate commands are copy-pastable
5. **Always** use proper markdown formatting (MD040, MD036, MD032, MD022, MD031)
6. **Always** link to related documentation sections
7. **Always** include validation steps in procedures
8. **Always** follow brand voice guidelines
9. **Always** use customer-safe placeholders
10. **Always** test build pipeline after changes

### Never Do
1. **Never** expose internal secrets or sensitive data
2. **Never** skip validation steps in procedures
3. **Never** use frontmatter in markdown files
4. **Never** commit without explicit user confirmation
5. **Never** delete files without explicit user permission
6. **Never** use technical jargon without explanation
7. **Never** skip troubleshooting sections
8. **Never** use internal URLs or credentials

## Critical Rules - NEVER VIOLATE (Preserved)

### Git Commit Rules

- **NEVER commit without explicit user confirmation**
- **ALWAYS ask "Should I commit these changes?" before running git commands**
- **ALWAYS show what will be committed before asking for confirmation**
- **ALWAYS wait for user approval before executing git add/commit/push**
- **If user says no, do NOT proceed with commit**

### Data Protection Rules

- **NEVER delete files without explicit user permission**
- **ALWAYS explain what will be deleted before deletion**
- **ALWAYS ask for confirmation before destructive operations**
- **ALWAYS preserve user's work and changes**

## File Management & Cleanup (Preserved)

### Temporary Files

- **Location**: All temporary files go in `/temp/` directory
- **Migration Scripts**: Move to `/temp/` after use
- **Status Documents**: Move to `/temp/` when no longer needed
- **Old Templates**: Move to `/temp/` when replaced

### Documentation Structure

- **Source Files**: Edit in `/docs/` directory only (single source of truth)
- **Build Pipeline**: TypeScript scripts process `/docs/` and generate Jekyll-compatible files
- **Jekyll Site**: Reads from processed files and generates HTML in `_site/`
- **Brand Assets**: Manually copied to `/site/assets/images/`
- **Navigation**: Auto-generated by TypeScript scripts in `/site/_data/navigation.yml`

### Cleanup Rules

- **Before Committing**: Check for temporary files in root directory
- **After Migration**: Move migration scripts to `/temp/`
- **After Testing**: Move test files to `/temp/`
- **Keep Root Clean**: Only essential files in root directory

## Current Documentation Structure (V1) - TO BE REPLACED

```yaml
docs/
├── overview/                # Platform overview and introduction
├── evaluation/             # Evaluation guide and assessment
├── core-components/         # Core platform components
├── enterprise-features/     # Enterprise features and capabilities
├── use-cases/              # Use cases and applications
├── deployment-operations/   # Deployment and operations
├── customer-success/        # Customer success and best practices
├── roadmap/               # Product roadmap and future plans
├── modules-documentation/  # Modules and documentation
└── resources/              # Support resources and materials
```

**Status**: This structure will be completely removed and replaced by V2. No coexistence is possible.

## Documentation Structure V2 - DEFINED STRUCTURE

> **Status**: V2 structure has been defined. Ready for migration planning and execution.
> 
> **Important**: Once V2 is implemented, V1 structure will be completely removed. The migration must be atomic - either all V1 is replaced with V2, or we rollback to V1.

```yaml
docs/
├── overview/                       # What AI Fabrix Is, Why It Matters (Order: 1)
├── why-aifabrix-exists/            # Enterprise AI Challenges, Why Pilots Fail (Order: 2)
├── architecture-overview/          # High-Level Architecture, Trust Boundaries (Order: 3)
├── controller-layer-miso/          # Governance, Identity, Policy, Lifecycle (Order: 4)
│   ├── miso-overview/
│   ├── identity-access/
│   ├── policy-governance/
│   ├── environment-lifecycle/
│   └── audit-observability/
├── dataplane/                      # Secure Execution, Enterprise Data Access (Order: 5)
│   ├── dataplane-overview/
│   ├── cip-composable-integration-pipelines/
│   │   ├── cip-execution-model/
│   │   ├── contracts-interfaces/
│   │   └── security-governance/
│   └── core-dataplane-services/
├── orchestration-layer/            # Building AI Workflows and Agents (Order: 6)
│   ├── orchestration-concepts/
│   ├── orchestration-options/
│   └── agent-workflow-design/
├── interface-layer/                # User Interaction Surfaces (Order: 7)
│   ├── interface-concepts/
│   ├── interface-options/
│   └── workspace-access-models/
├── open-standards-contracts/       # OpenAPI, MCP, Standards (Order: 8)
├── enterprise-capabilities/        # Identity-Native, Metadata-First, etc. (Order: 9)
├── evaluation-guide/               # Evaluation Criteria, PoC Framework (Order: 10)
├── deployment-operations/           # Azure Deployment, Networking, Scaling (Order: 11)
├── use-cases/                      # Microsoft 365, Copilots, Search, etc. (Order: 12)
├── customer-success/               # Pilot → Production, KPIs, Best Practices (Order: 13)
└── resources/                      # Diagrams, Examples, Templates, Release Notes (Order: 14)
```

**Note**: Directory names do NOT include numbers. Numbers shown above (Order: 1-14) are for internal reference only to indicate the intended navigation order. 

**Navigation Ordering**: Ordering will be controlled via YAML metadata `order` field in each section's `navigation.yaml` file, NOT by directory names. URLs, article titles, and navigation display will use clean names without numbers.

**Example YAML metadata for ordering**:
```yaml
# In navigation.yaml files
order: 1  # For overview section
order: 2  # For why-aifabrix-exists section
# etc.
```

### V2 Structure Details

#### 1. Overview
- What AI Fabrix Is
- What AI Fabrix Is Not
- AI Fabrix as an AI Operating Model
- Why In-Tenant Architecture Matters
- Controller vs Dataplane Responsibilities
- How AI Fabrix Complements Microsoft
- Target Audiences

#### 2. Why AI Fabrix Exists
- Why Enterprise AI Pilots Fail
- Data Access Is the Real Bottleneck
- Why Service Accounts Are a Dead End
- Governance by Design vs Governance by Policy
- AI Cost Sprawl and Risk Containment
- From Experiments to Production AI

#### 3. Architecture Overview
- High-Level Architecture
- Trust Boundaries and Execution Zones
- Identity and Policy Flow
- End-to-End Request Lifecycle

#### 4. Controller Layer (Miso)
**Governance, identity, policy, and lifecycle**

- **4.1 Miso Overview**: Role of Controller, Control Plane vs Data Plane Separation
- **4.2 Identity & Access**: Entra ID Integration, RBAC/ABAC, SCIM, Workspace Scoping
- **4.3 Policy & Governance**: Policy Packs, Data Egress Controls, Model Access Policies
- **4.4 Environment Lifecycle**: Dev → Test → Prod Promotion, Versioning, Rollback
- **4.5 Audit & Observability**: Audit Trails, Access Logs, Model Usage Tracking

#### 5. Dataplane
**Secure execution and enterprise data access**

- **5.1 Dataplane Overview**: Execution Boundary, Security and Isolation Model
- **5.2 CIP — Composable Integration Pipelines**: Core architecture, Declarative Model, Zero Service Accounts
  - **5.2.1 CIP Execution Model**: Declarative Pipelines, Governed Python Execution
  - **5.2.2 Contracts and Interfaces**: OpenAPI Contracts, MCP Contracts, Versioning
  - **5.2.3 Security and Governance**: Identity Propagation, Policy Enforcement, Auditability
- **5.3 Core Dataplane Services**: Metadata Model, Permission-Aware Retrieval, Vector Search, CDC

#### 6. Orchestration Layer
**Building AI workflows and agents**

- **6.1 Orchestration Concepts**: Separation from Data Access, Identity-Aware Tools
- **6.2 Orchestration Options**: Flowise, Microsoft Copilot, n8n, Custom Frameworks
- **6.3 Agent and Workflow Design**: Tool Invocation via MCP, Versioning, Observability

#### 7. Interface Layer
**User interaction surfaces**

- **7.1 Interface Concepts**: Identity Propagation, Human-in-the-Loop Patterns
- **7.2 Interface Options**: OpenWebUI, Teams, Copilot UI, Slack, Custom Portals
- **7.3 Workspace and Access Models**: Case-Based Access, Team Scoping, Auditability

#### 8. Open Standards & Contracts
- OpenAPI as System Contract
- MCP (Model Context Protocol)
- Why AI Fabrix Avoids Proprietary SDKs
- Inspectability and Exit Strategy

#### 9. Enterprise Capabilities
- Identity-Native Security
- Metadata-First Architecture
- Policy-Aware AI Access
- Predictable Cost Controls
- Regulated Workload Readiness
- Zero-Trust AI Architecture

#### 10. Evaluation Guide
- Enterprise Evaluation Criteria
- Security and Compliance Checklist
- Architecture Review Questions
- 30-Day PoC Framework
- Risk and Cost Assessment

#### 11. Deployment & Operations
- Azure-Native Deployment Models
- Networking and Private Endpoints
- Scaling and Performance Profiles
- DevOps and CI/CD Integration
- Backup, Recovery, and DR

#### 12. Use Cases
- Microsoft 365 Knowledge Assistants
- Secure Internal Copilots
- Policy-Aware Enterprise Search
- Case and Deal Workspaces
- Regulated Data AI Scenarios

#### 13. Customer Success
- Pilot → Production Playbook
- Governance Maturity Model
- KPIs and ROI Measurement
- Operational Best Practices

#### 14. Resources
- Architecture Diagrams
- CIP Examples
- Policy Pack Examples
- RFP / RFI Templates
- Release Notes

### Structure Planning Phase

- [x] Define new top-level categories for V2 ✅ **COMPLETE**
- [ ] Map all V1 content to V2 structure (complete mapping) - **See mapping below**
- [ ] Identify content gaps in V2
- [ ] Plan atomic replacement strategy
- [x] Create V2 directory structure specification ✅ **COMPLETE**
- [ ] Plan navigation structure for V2
- [ ] Identify build script changes needed
- [ ] Create path mapping document (V1 → V2) - **See mapping below**

## V1 to V2 Content Mapping

### Mapping Strategy

This section maps existing V1 content to the new V2 structure. Content may need to be:
- **Moved** to new location
- **Split** across multiple V2 sections
- **Merged** with other content
- **Rewritten** to fit new structure
- **Created** as new content

### V1 → V2 Mapping Table

| V1 Structure | V2 Structure | Action | Notes |
|-------------|--------------|--------|-------|
| `overview/platform-overview.md` | `overview/` | Move + Rewrite | Split into multiple topics |
| `evaluation/` | `evaluation-guide/` | Move + Reorganize | Consolidate evaluation content |
| `core-components/miso-governance.md` | `controller-layer-miso/miso-overview/` | Move + Split | Split into 5 subsections |
| `core-components/miso-controller.md` | `controller-layer-miso/` | Move + Split | Distribute across subsections |
| `core-components/core-platform-services.md` | `dataplane/core-dataplane-services/` | Move | Update terminology |
| `core-components/flowise-orchestration.md` | `orchestration-layer/orchestration-options/` | Move + Expand | Add other orchestration options |
| `core-components/openwebui-secure-ux.md` | `interface-layer/interface-options/` | Move + Expand | Add other interface options |
| `core-components/sdk-plugins.md` | `open-standards-contracts/` | Move + Rewrite | Focus on open standards |
| `core-components/chat-interface.md` | `interface-layer/interface-concepts/` | Move | Part of interface layer |
| `enterprise-features/` | `enterprise-capabilities/` | Move + Reorganize | Consolidate enterprise features |
| `use-cases/` | `use-cases/` | Move + Update | Update use case structure |
| `deployment-operations/` | `deployment-operations/` | Move | Keep similar structure |
| `customer-success/` | `customer-success/` | Move + Reorganize | Consolidate customer success |
| `roadmap/` | `resources/` or remove | Review | May move to resources or remove |
| `modules-documentation/` | Various V2 sections | Split | Distribute across architecture layers |
| `resources/` | `resources/` | Move + Expand | Add diagrams, examples, templates |

### Content Migration Details

#### New Content Needed for V2

- [ ] **why-aifabrix-exists/** - Mostly new content
- [ ] **architecture-overview/** - May exist in parts, needs consolidation
- [ ] **dataplane/cip-composable-integration-pipelines/** - New detailed content
- [ ] **orchestration-layer/orchestration-concepts/** - New conceptual content
- [ ] **interface-layer/interface-concepts/** - New conceptual content
- [ ] **open-standards-contracts/** - Rewrite from SDK/plugins content

#### Content Requiring Major Updates

- [ ] Miso content needs to be split into 5 subsections
- [ ] Core platform services → Dataplane services (terminology update)
- [ ] Orchestration content needs expansion (beyond Flowise)
- [ ] Interface content needs expansion (beyond OpenWebUI)
- [ ] Enterprise features need reorganization

#### Content That Can Be Moved As-Is

- [ ] Most deployment-operations content
- [ ] Most use-cases content
- [ ] Most customer-success content
- [ ] Most resources content

### Implementation Checklist

- [ ] Create new directory structure in `/docs/`
- [ ] Migrate existing content to new structure
- [ ] Update all YAML metadata files
- [ ] Update navigation files
- [ ] Update build scripts (if structure changes require it)
- [ ] Test navigation generation with new structure
- [ ] Test metadata merging process
- [ ] Test Jekyll build with new structure
- [ ] Test Document360 sync (if applicable)
- [ ] Update `.cursorrules` if needed
- [ ] Update `.cursorrules-generation` if needed
- [ ] Update `.cursorrules-style` if needed
- [ ] Test build pipeline end-to-end
- [ ] Validate all links (internal and external)
- [ ] Check markdown formatting (MD040, MD036, MD032, MD022, MD031)
- [ ] Verify customer-safe content
- [ ] Update README.md
- [ ] Document migration in CHANGELOG

## Migration Strategy - Atomic Replacement

**CRITICAL PRINCIPLE**: V2 completely replaces V1. They cannot coexist in the same repository.

### Migration Approach

1. **Backup First**: Create complete backup of V1 structure
2. **Build V2**: Create V2 structure alongside V1 (temporarily for validation)
3. **Migrate Content**: Move all content from V1 to V2
4. **Validate V2**: Ensure V2 works completely
5. **Remove V1**: Delete V1 structure completely
6. **Deploy V2**: Deploy only V2 structure

### Migration Constraints

- **No Side-by-Side**: V1 and V2 cannot exist simultaneously in production
- **Atomic Operation**: Migration must be complete before deployment
- **Rollback Ready**: Must be able to restore V1 completely if needed
- **Validation Required**: V2 must be fully validated before V1 removal
- **Path Updates**: All paths, links, and references must be updated to V2

### Phase 1: Planning & Preparation

1. **Audit Current Content**
   - [ ] List all existing documentation files
   - [ ] Map current structure to proposed V2 structure
   - [ ] Identify content that needs updating
   - [ ] Identify content that can be reused as-is

2. **Define New Structure**
   - [ ] Create detailed V2 structure specification
   - [ ] Document rationale for changes
   - [ ] Get approval on new structure

3. **Prepare Migration Tools**
   - [ ] Create migration scripts if needed
   - [ ] Test migration on sample files
   - [ ] Prepare rollback plan

### Phase 2: Structure Creation

**CRITICAL**: Create V2 structure alongside V1 initially, but plan for complete replacement.

1. **Create New V2 Directories**
   - [ ] Create `overview/` directory (Order: 1)
   - [ ] Create `why-aifabrix-exists/` directory (Order: 2)
   - [ ] Create `architecture-overview/` directory (Order: 3)
   - [ ] Create `controller-layer-miso/` directory (Order: 4) with subdirectories:
     - [ ] `miso-overview/`
     - [ ] `identity-access/`
     - [ ] `policy-governance/`
     - [ ] `environment-lifecycle/`
     - [ ] `audit-observability/`
   - [ ] Create `dataplane/` directory (Order: 5) with subdirectories:
     - [ ] `dataplane-overview/`
     - [ ] `cip-composable-integration-pipelines/` with:
       - [ ] `cip-execution-model/`
       - [ ] `contracts-interfaces/`
       - [ ] `security-governance/`
     - [ ] `core-dataplane-services/`
   - [ ] Create `orchestration-layer/` directory (Order: 6) with subdirectories:
     - [ ] `orchestration-concepts/`
     - [ ] `orchestration-options/`
     - [ ] `agent-workflow-design/`
   - [ ] Create `interface-layer/` directory (Order: 7) with subdirectories:
     - [ ] `interface-concepts/`
     - [ ] `interface-options/`
     - [ ] `workspace-access-models/`
   - [ ] Create `open-standards-contracts/` directory (Order: 8)
   - [ ] Create `enterprise-capabilities/` directory (Order: 9)
   - [ ] Create `evaluation-guide/` directory (Order: 10)
   - [ ] Create `deployment-operations/` directory (Order: 11)
   - [ ] Create `use-cases/` directory (Order: 12)
   - [ ] Create `customer-success/` directory (Order: 13)
   - [ ] Create `resources/` directory (Order: 14)
   - [ ] Ensure proper naming conventions (clean names, no numbers in directory names)
   - [ ] **Note**: V1 directories still exist at this point

2. **Update Build Scripts**
   - [ ] Update navigation generation scripts to support V2 structure
   - [ ] Ensure navigation uses clean names (no numbers in URLs or display)
   - [ ] Configure navigation ordering via YAML metadata (order field), not directory names
   - [ ] Update build pipeline if needed for V2
   - [ ] Test scripts with V2 structure (V1 may still exist temporarily)
   - [ ] Ensure scripts can handle transition period

### Phase 3: Content Migration (Atomic Replacement)

**CRITICAL**: This phase performs a complete replacement, not a coexistence.

1. **Migrate Files According to Mapping**

   **Overview Section (01-overview/)**
   - [ ] Move `overview/platform-overview.md` → `01-overview/` (split into multiple files)
   - [ ] Create new content for "What AI Fabrix Is" and "What AI Fabrix Is Not"
   - [ ] Create content for "AI Fabrix as an AI Operating Model"
   - [ ] Create content for "Why In-Tenant Architecture Matters"
   - [ ] Create content for "Controller vs Dataplane Responsibilities"
   - [ ] Create content for "How AI Fabrix Complements Microsoft"
   - [ ] Create content for "Target Audiences"

   **Why AI Fabrix Exists (why-aifabrix-exists/)**
   - [ ] Create new content for "Why Enterprise AI Pilots Fail"
   - [ ] Create new content for "Data Access Is the Real Bottleneck"
   - [ ] Create new content for "Why Service Accounts Are a Dead End"
   - [ ] Create new content for "Governance by Design vs Governance by Policy"
   - [ ] Create new content for "AI Cost Sprawl and Risk Containment"
   - [ ] Create new content for "From Experiments to Production AI"

   **Architecture Overview (architecture-overview/)**
   - [ ] Create/consolidate "High-Level Architecture"
   - [ ] Create "Trust Boundaries and Execution Zones"
   - [ ] Create "Identity and Policy Flow"
   - [ ] Create "End-to-End Request Lifecycle" (with diagram)

   **Controller Layer (controller-layer-miso/)**
   - [ ] Move `core-components/miso-governance.md` → Split across 5 subsections
   - [ ] Move `core-components/miso-controller.md` → Split across subsections
   - [ ] Create `miso-overview/` content
   - [ ] Create `identity-access/` content (from existing + new)
   - [ ] Create `policy-governance/` content (from existing + new)
   - [ ] Create `environment-lifecycle/` content (from existing + new)
   - [ ] Create `audit-observability/` content (from existing + new)

   **Dataplane (dataplane/)**
   - [ ] Move `core-components/core-platform-services.md` → `core-dataplane-services/`
   - [ ] Create `dataplane-overview/` content
   - [ ] Create `cip-composable-integration-pipelines/` content (new detailed section)
   - [ ] Create CIP subsections (execution model, contracts, security)

   **Orchestration Layer (orchestration-layer/)**
   - [ ] Move `core-components/flowise-orchestration.md` → `orchestration-options/`
   - [ ] Create `orchestration-concepts/` content
   - [ ] Expand orchestration options (Flowise, Copilot, n8n, Custom)
   - [ ] Create `agent-workflow-design/` content

   **Interface Layer (interface-layer/)**
   - [ ] Move `core-components/openwebui-secure-ux.md` → `interface-options/`
   - [ ] Move `core-components/chat-interface.md` → `interface-concepts/`
   - [ ] Create `interface-concepts/` content
   - [ ] Expand interface options (OpenWebUI, Teams, Copilot UI, Slack, Custom)
   - [ ] Create `workspace-access-models/` content

   **Open Standards (open-standards-contracts/)**
   - [ ] Move `core-components/sdk-plugins.md` → Rewrite for open standards focus
   - [ ] Create content for OpenAPI contracts
   - [ ] Create content for MCP (Model Context Protocol)
   - [ ] Create content for "Why AI Fabrix Avoids Proprietary SDKs"
   - [ ] Create content for "Inspectability and Exit Strategy"

   **Enterprise Capabilities (enterprise-capabilities/)**
   - [ ] Move `enterprise-features/` content → Reorganize
   - [ ] Consolidate into single section with 6 key capabilities

   **Evaluation Guide (evaluation-guide/)**
   - [ ] Move `evaluation/` content → Consolidate
   - [ ] Reorganize into evaluation guide structure

   **Deployment & Operations (deployment-operations/)**
   - [ ] Move `deployment-operations/` content → Keep similar structure
   - [ ] Update paths and references

   **Use Cases (use-cases/)**
   - [ ] Move `use-cases/` content → Update structure
   - [ ] Ensure all 5 use cases are covered

   **Customer Success (customer-success/)**
   - [ ] Move `customer-success/` content → Consolidate
   - [ ] Reorganize into customer success structure

   **Resources (resources/)**
   - [ ] Move `resources/` content
   - [ ] Move `roadmap/` content (or remove if not needed)
   - [ ] Add architecture diagrams, CIP examples, policy pack examples
   - [ ] Add RFP/RFI templates
   - [ ] Add release notes section

2. **Update Metadata and Links**
   - [ ] Update all YAML metadata files for new structure
   - [ ] Update all `custom_links` in YAML files
   - [ ] Update all internal markdown links
   - [ ] Update all cross-references
   - [ ] Update navigation YAML files
   - [ ] Verify no references to old V1 paths remain

3. **Content Updates**
   - [ ] Review and update content as needed
   - [ ] Ensure all content follows guidelines
   - [ ] Update terminology (e.g., "Core Platform Services" → "Dataplane Services")
   - [ ] Update examples and references
   - [ ] Verify no references to old V1 paths remain
   - [ ] Ensure all new content follows writing guidelines

### Phase 4: Validation & Testing

**CRITICAL**: V1 cannot be removed until ALL validation passes.

1. **Build Testing**
   - [ ] Run complete build pipeline (`npm run build-docs`)
   - [ ] Verify YAML validation passes (all V2 files)
   - [ ] Verify navigation generation works correctly with numbered prefixes
   - [ ] Verify metadata merging works correctly
   - [ ] Verify Jekyll site builds correctly
   - [ ] Check navigation structure in generated site (all 14 sections present)
   - [ ] Validate all internal links (no broken links)
   - [ ] Validate all external links
   - [ ] Test individual build scripts with V2 structure
   - [ ] Verify GitHub Actions workflow (if applicable)
   - [ ] Verify no V1 paths in generated navigation

2. **Content Review**
   - [ ] Review migrated content for accuracy
   - [ ] Verify all 14 V2 sections have content
   - [ ] Check YAML metadata completeness (all required fields)
   - [ ] Verify customer-safe content (no internal secrets)
   - [ ] Test copy-pastable commands
   - [ ] Verify markdown formatting (MD040, MD036, MD032, MD022, MD031)
   - [ ] Check brand voice consistency
   - [ ] Verify SEO optimization
   - [ ] Check audience appropriateness
   - [ ] Verify troubleshooting sections exist where needed
   - [ ] Verify validation steps exist where needed
   - [ ] Verify all new content follows writing guidelines

3. **Structure Validation**
   - [ ] Verify all 14 top-level directories exist (clean names, no numbers)
   - [ ] Verify all subdirectories exist as specified
   - [ ] Verify directory names are clean (no numbers in URLs or navigation)
   - [ ] Verify navigation ordering is configured via YAML metadata (order field)
   - [ ] Verify no V1 directories remain in `/docs/`
   - [ ] Verify no orphaned files
   - [ ] Verify all files have corresponding YAML metadata
   - [ ] Verify navigation.yaml files exist in each section
   - [ ] Verify navigation displays clean names (no numbers visible to users)

4. **Link Validation**
   - [ ] Search for all V1 path references (grep for old paths)
   - [ ] Verify no markdown links point to V1 paths
   - [ ] Verify no YAML custom_links point to V1 paths
   - [ ] Verify all cross-references updated
   - [ ] Test all internal links work
   - [ ] Verify diagram references work

5. **Document360 Sync**
   - [ ] Test Document360 sync if applicable
   - [ ] Verify metadata sync with V2 structure
   - [ ] Check image handling
   - [ ] Verify Mermaid diagram processing (if applicable)
   - [ ] Check category assignments match V2 structure
   - [ ] Verify visibility settings

### Pre-Removal Validation Checklist

**BEFORE removing V1 directories, verify:**

- [ ] ✅ Build pipeline completes successfully
- [ ] ✅ All 14 V2 sections have content
- [ ] ✅ Navigation generates correctly
- [ ] ✅ No broken internal links
- [ ] ✅ No references to V1 paths found (grep search)
- [ ] ✅ Jekyll site builds and displays correctly
- [ ] ✅ All YAML metadata files present
- [ ] ✅ All content follows guidelines
- [ ] ✅ Document360 sync works (if applicable)
- [ ] ✅ Backup branch created with V1 structure
- [ ] ✅ Rollback plan documented and tested

### Phase 5: Cleanup & Documentation

1. **Cleanup - Remove V1 Structure**
   - [ ] **Remove all V1 directories** from `/docs/` (after validation confirms V2 works)
   - [ ] Verify no V1 paths remain in navigation files
   - [ ] Verify no V1 paths remain in any YAML metadata
   - [ ] Verify no V1 paths remain in markdown content
   - [ ] Move migration scripts to `/temp/`
   - [ ] Clean up temporary files
   - [ ] Verify `/docs/` contains only V2 structure

2. **Documentation**
   - [ ] Update README.md with new structure
   - [ ] Update `.cursorrules` if needed (structure references)
   - [ ] Update `.cursorrules-generation` if needed
   - [ ] Update `.cursorrules-style` if needed
   - [ ] Document new V2 structure
   - [ ] Create migration guide for future reference
   - [ ] Update any references to old structure paths

## Content Safety Checklist (Preserved)

### Before Publishing
- [ ] No internal URLs or credentials exposed
- [ ] No internal team names or references
- [ ] No internal deployment details
- [ ] No sensitive configuration information
- [ ] All examples use placeholder values
- [ ] Content focuses on customer value
- [ ] Technical accuracy is maintained
- [ ] Content is accessible to target audience

### Content Quality Checklist
- [ ] Clear, actionable language
- [ ] Complete examples and use cases
- [ ] Proper cross-references
- [ ] Consistent terminology
- [ ] Complete YAML metadata
- [ ] Appropriate audience targeting
- [ ] SEO optimization
- [ ] Document360 configuration
- [ ] Copy-pastable commands
- [ ] Validation steps included
- [ ] Troubleshooting section included

## Success Criteria

### Structure Success
- [x] New structure is clearly defined and documented ✅
- [ ] All 14 V2 sections created with proper structure (clean directory names)
- [ ] Navigation ordering configured via YAML metadata (not directory names)
- [ ] All V1 content migrated to V2 locations
- [ ] V1 directories completely removed
- [ ] No V1 paths remain anywhere
- [ ] No numbers visible in URLs, navigation, or article titles

### Technical Success
- [ ] Build pipeline works with V2 structure
- [ ] All build scripts work correctly
- [ ] Navigation generates correctly (clean names, ordered via YAML metadata)
- [ ] Navigation displays clean names (no numbers visible to users)
- [ ] All links are valid and working
- [ ] YAML metadata is complete for all files (including order field)
- [ ] Jekyll site builds correctly
- [ ] Document360 sync works (if applicable)

### Content Success
- [ ] All existing rules and guidelines are preserved
- [ ] Content follows all style guidelines
- [ ] Customer-safe content is maintained
- [ ] Markdown formatting standards are followed (MD040, MD036, MD032, MD022, MD031)
- [ ] Brand voice guidelines are applied
- [ ] SEO optimization is complete
- [ ] All new content follows writing guidelines
- [ ] All content is audience-appropriate

### Quality Success
- [ ] No broken links
- [ ] No orphaned files
- [ ] All cross-references updated
- [ ] All diagrams accessible
- [ ] All examples work
- [ ] All commands are copy-pastable
- [ ] Documentation is ready for deployment

## Risk Mitigation

### Backup Strategy

- [ ] Create backup branch before migration (`backup/v1-structure`)
- [ ] Document current V1 state completely
- [ ] Tag current state as `v1-structure-final`
- [ ] Keep migration scripts for rollback
- [ ] Export current navigation structure
- [ ] Document all V1 paths and their mappings

### Testing Strategy

- [ ] Test migration on sample files first (small subset)
- [ ] Validate build pipeline early with V2 structure
- [ ] Test navigation generation with V2 structure
- [ ] Verify Document360 sync with V2 structure
- [ ] Test complete migration on staging branch
- [ ] Verify no V1 paths remain anywhere

### Rollback Plan

**CRITICAL**: Since V1 and V2 cannot coexist, rollback means complete reversion to V1.

- [ ] Document rollback steps (restore from backup branch)
- [ ] Keep V1 structure in backup branch until V2 is fully validated
- [ ] Test rollback procedure before final migration
- [ ] Ensure rollback restores complete V1 structure
- [ ] Verify build pipeline works after rollback
- [ ] Document rollback process clearly

## Next Steps

1. **Define V2 Structure**: Work with stakeholders to define the exact new structure
2. **Create Backup**: Create backup branch with current V1 structure (`backup/v1-structure`)
3. **Create Migration Scripts**: Develop tools to automate migration where possible
4. **Test Migration**: Test complete migration on sample subset first
5. **Execute Migration**: Follow phased approach outlined above (atomic replacement)
6. **Validate & Test**: Ensure everything works before removing V1
7. **Remove V1**: Only after full validation, remove V1 structure completely
8. **Document Changes**: Update all relevant documentation

## Questions to Resolve

- [x] What is the exact new structure for V2? ✅ **RESOLVED** - V2 structure defined
- [x] Are there new categories or sections needed? ✅ **RESOLVED** - 14 main sections defined
- [x] Should any existing categories be merged or split? ✅ **RESOLVED** - Mapping created
- [ ] Are there new content types to support? - **Review needed**: Diagrams, examples, templates
- [ ] Do build scripts need updates? - **Review needed**: Navigation with numbered prefixes
- [ ] Are there new automation requirements? - **Review needed**: Check if scripts handle new structure
- [x] How will we handle the atomic replacement (all at once vs phased)? ✅ **RESOLVED** - Phased approach with atomic final step
- [ ] What is the validation criteria before removing V1? - **Define**: Complete checklist needed
- [ ] How will we handle broken links during migration? - **Strategy**: Update all links before removing V1
- [x] How to handle navigation with numbered prefixes? ✅ **RESOLVED** - Use clean names, order via YAML metadata
- [ ] How to handle diagram references? - **Review**: Ensure diagrams are accessible in V2

## Build Scripts & Automation (Preserved)

### TypeScript Build Scripts

The build pipeline consists of the following scripts in `/scripts/`:

1. **build-docs.ts** - Main build orchestrator
2. **validate-yaml.ts** - YAML validation
3. **generate-navigation.ts** - Navigation generation for each folder
4. **generate-main-navigation.ts** - Main site navigation generation
5. **merge-metadata.ts** - Merge YAML into markdown frontmatter
6. **remove-frontmatter.ts** - Remove frontmatter from markdown files
7. **build-jekyll.ts** - Jekyll build process
8. **deploy.ts** - GitHub Pages deployment
9. **sync-document360.ts** - Document360 synchronization

### Build Process Flow

```yaml
1. Validate YAML files
   ↓
2. Generate navigation files (per folder)
   ↓
3. Generate main site navigation
   ↓
4. Merge YAML metadata into markdown
   ↓
5. Build Jekyll site
   ↓
6. Deploy to GitHub Pages (if not in CI/CD)
```

### Script Requirements

- All scripts must handle new structure correctly
- Navigation generation must work with new directory structure
- Metadata merging must preserve all YAML fields
- Build process must validate structure before building

## References

- Current `.cursorrules` file
- Current `.cursorrules-generation` file
- Current `.cursorrules-style` file
- Current documentation structure in `/docs/`
- Build scripts in `/scripts/`
- Navigation files in `/site/_data/`
- Existing plan documents in `/plans/`
- README.md for setup and usage instructions

---

**Remember**: All existing rules, guidelines, and best practices must be preserved in the new structure. The V2 structure is an evolution, not a replacement of principles.
