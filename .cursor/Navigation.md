# AI Fabrix Documentation – Navigation (Final)

---

## Get Started

### Choose Your Path

* Developers → Builder (Integration Development)
* Platform Admins → Controller (Miso)
* Integrators → API Usage
* Architects → Architecture Overview

### How AI Fabrix Works (Mental Model)

* Integrations are defined as CIP pipelines
* Dataplane executes pipelines per environment
* Miso governs identity, policies, and promotion
* APIs are automatically generated from CIP

---

# Builder (Integration Development)

### Getting Started

* What You Need
* Install Builder CLI
* Authentication (Miso)
* Select Environment (Dev / Tst / Pro)
* First Run Overview

### Create Your First Integration ⭐

* Initialize App
* Import OpenAPI / Select System
* Generate CIP
* Run Locally
* Test in Dev
* Deploy to Dev Dataplane
* Promote to Tst / Pro

### Builder CLI

* CLI Overview
* Authentication Commands
* Environment Commands
* Application Commands
* Development Commands
* Deployment Commands
* Troubleshooting

### CIP (Composable Integration Pipelines)

* What is CIP
* Pipeline Structure

  * fetch
  * transform (fieldMappings)
  * accessFields
  * exposure
  * sync
* Minimal Example
* Full Example
* Mapping to OpenAPI / MCP
* RBAC & ABAC Integration

### Integration Development Guides

* Build from OpenAPI ⭐
* Build from Scratch ⚙
* Extend Existing Integration
* Add New Data Source
* Authentication (OAuth, API Keys)
* Pagination & Rate Limits
* Error Handling

### Datasource Types

* recordStorage
* documentStorage
* vectorStore
* messageService
* none

#### entityType = none

* No metadataSchema
* No storage
* Orchestration only

### Testing & Debugging

* Local Testing
* Using Real Data
* Logs & Observability
* Debugging Pipelines

### Deployment & Promotion ⭐

* Deploy to Dev
* Validate in Tst
* Promote to Production
* Versioning
* Rollback

### Open Standards & Contracts

* OpenAPI (input)
* MCP / Generated OpenAPI (output)
* Schema Strategy
* Interoperability

### Reference

* external-system.schema.json
* external-datasource.schema.json
* CIP DSL Reference
* fieldMappings DSL
* accessFields (ABAC)

---

# Controller Layer (Miso)

## Overview

* What is Miso
* Role in AI Fabrix

## What Miso Owns

* Identity (who)
* Permissions (what)
* Policies (how)
* Promotion (where)

## Identity & Access

* Entra ID Integration
* SCIM Provisioning
* RBAC Model
* ABAC Model

## Environment Management

* Environments (Dev / Tst / Pro)
* Environment Isolation
* Environment Configuration

## Development & Promotion Flow

* Lifecycle Overview (Dev → Tst → Pro)
* What Gets Promoted
* What Does Not Get Promoted
* Promotion Process
* Approvals & Policies
* Rollback Strategy

## Access & Governance

* Policy Engine
* Access Control Policies
* Data Governance
* Audit & Compliance

## Deployment & Operations

* Controller Deployment
* Scaling & Availability
* Monitoring & Logs

---

# Dataplane

## Overview

* What is Dataplane
* Role per Environment
* Relationship to Miso

## What Dataplane Guarantees

* Normalized metadata
* ABAC enforcement at query time
* FK-based joins only
* Full audit trail

## Data Model & Query Rules

* metadata_json as canonical storage
* Indexed fields for querying
* Filtering only on indexed fields
* Joins via foreignKeys only
* No cross-datasource enrichment persistence

## Runtime & Execution

* Execution Model
* Sync & Scheduling
* Data Normalization
* Metadata Handling
* Logging & Audit

## Development in Dataplane

* Dataplane per Environment
* Runtime Differences (Dev / Tst / Pro)
* Deployment Boundaries
* Relationship to Promotion Flow

---

# API Usage

## Overview

* When to Use API vs Builder CLI
* Integration Patterns

## API Types

* Generated APIs (from CIP)
* System APIs

## Authentication

* Service Users
* OAuth / Token Handling

## OpenAPI Reference

* Endpoints Overview
* Schema Usage

## Example Workflows

* Data Retrieval
* Triggering Pipelines
* Integration Scenarios

## Webhooks & Events

* Event Model
* Subscription Patterns

---

# Architecture Overview

## Platform Architecture

* AI Fabrix Layers Overview
* Control vs Execution Model

## Environment Model

* Dev / Tst / Pro Separation
* Isolation & Security Boundaries

## Core Concepts

* CIP as Integration Standard
* Dataplane Execution Model
* Miso Governance Model
* RBAC / ABAC
* AI-Driven Integration

---

# Platform Operations

* Security & Compliance
* Observability
* Scaling
* Cost Management
* Azure Architecture
* Networking
* Key Vault & Secrets
* CI/CD Model
* Multi-Region Strategy

---

# Use Cases

* Sales Case Builder
* Document Intelligence
* Meeting Intelligence
* Integration Automation

---

# Examples & Ecosystem

## AI Orchestration Examples

* Flowise
* n8n
* Custom Code Orchestration
* Microsoft Copilot
* Google AI

## UI & Experience Examples

* OpenWebUI
* Custom Frontends
* Embedded Experiences

---

# Customer Success

* Onboarding Guide
* Best Practices
* Common Pitfalls

---

# Resources

* CLI Reference
* SDKs
* Example Projects
* Templates
