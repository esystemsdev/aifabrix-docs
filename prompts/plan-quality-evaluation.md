# Plan quality evaluation (aifabrix-docs)

Use this document to review `plan.md` files (or any feature-development plan under `.cursor/plans/`) **before** implementation. It supports a **plan first, then implement, then verify** workflow for this repository: doc-as-code, TypeScript build scripts, Jekyll, and customer-facing content rules.

**Primary references** (treat these as the “rules” for this repo):

- [`.cursorrules`](../.cursorrules) — documentation standards, metadata, security, git safety
- [`README.md`](../README.md) — setup and build pipeline
- [`package.json`](../package.json) — authoritative npm scripts
- [`.github/workflows/jekyll-dynamic.yml`](../.github/workflows/jekyll-dynamic.yml) — CI build steps for docs/site/scripts changes

If you add a `.cursor/rules/` tree, extend the “Rules and standards” checklist with links to those files alongside `.cursorrules`.

---

## How to use this rubric

1. Open the plan file and walk through **Section 1 → 6** below.
2. For each item, mark **Pass**, **Gap**, or **N/A** with a short note.
3. Summarize with **Section 7** (report template).
4. **Do not start implementation** until critical gaps (Definition of Done, scope, customer-safety for content plans) are addressed.

Optional command-style invocation (for humans or agents):

```text
Evaluate plan quality using prompts/plan-quality-evaluation.md against [path-to-plan.md]
```

### In another Cursor chat (Composer or Agent)

Use a **second** chat when you want a fresh context (e.g. review only, no implementation).

1. **Same workspace**: Open the new chat in the **aifabrix-docs** folder so paths and `@` references resolve.
2. **Attach context**: In the chat input, add:
   - `@prompts/plan-quality-evaluation.md` (this rubric), and  
   - `@.cursor/plans/your-plan.plan.md` (or whatever path your plan uses).
3. **Prompt** (copy and adjust the plan path):

```text
Follow prompts/plan-quality-evaluation.md exactly. Read the attached plan file, work through Sections 1–6, and output a filled-in “Plan quality report” from Section 7. Do not implement changes unless I ask.
```

4. **If the plan is only in the other chat**: paste the plan markdown into this chat *or* save it under `.cursor/plans/` first, then `@` that file.

**Tip**: In Agent mode, the model can open `.cursorrules` and `README.md` to verify DoD; mention that if you want a stricter check: *“Cross-check Definition of Done against package.json scripts and .github/workflows/jekyll-dynamic.yml.”*

---

## 1. Plan structure and clarity

| Criterion | Pass if |
|-----------|---------|
| **Title** | First line is a single H1 (`# …`) describing the outcome, not a vague label. |
| **Overview** | `## Overview` states purpose, user or operator outcome, and constraints in 1–3 short paragraphs. |
| **Scope** | `## Scope` lists affected areas (paths, systems): e.g. `docs/`, `site/`, `scripts/`, `.github/workflows/`. |
| **Out of scope** | Explicit exclusions when the change could sprawl (optional but recommended). |
| **Tasks** | Numbered or checklisted work items with clear completion signals. |
| **Risks / open questions** | Known unknowns or dependencies called out (recommended for larger plans). |

**Failure modes**: Tasks-only plan with no overview; scope that contradicts the task list; no file paths or subsystems named.

---

## 2. Plan classification (pick all that apply)

Classify the plan so reviewers know which quality gates apply:

| Type | Signals in the plan | Quality focus |
|------|---------------------|---------------|
| **Documentation content** | New/edited pages under `docs/`, tone, structure, screenshots | Paired `.yaml`, `.cursorrules` writing rules, customer-safe content, links |
| **Build / pipeline** | `scripts/*.ts`, `package.json`, `tsconfig.json` | `npm run validate`, `npm run build-docs`, TypeScript compiles |
| **Jekyll / site** | `site/` layouts, `_config.yml`, assets, `_data/` | `npm run build-jekyll` (or full `build-docs`), local `npm run dev` if UI behavior changes |
| **CI / automation** | `.github/workflows/` | Workflow matches local commands; path filters sensible |
| **Secrets / local config** | `.env`, `env.example`, scripts that read credentials | Never commit secrets; document variable *names* via `env.example`; plans must not embed real values |
| **Refactor / chore** | Moves, renames, tooling | Regression checks: validate + full build; navigation still generated |

---

## 3. Rules and standards (must be referenced or implied)

Plans should include a `## Rules and standards` section (or equivalent) that ties work to repo policy.

**Always applicable (every plan)**

- [ ] **`.cursorrules`** — customer-safe content; git commit only with explicit user confirmation; no destructive deletes without permission; doc structure and YAML-metadata rules when touching `docs/`.

**When the plan touches `docs/`**

- [ ] **No markdown frontmatter** in `docs/**/*.md`; metadata only in sibling `.yaml` files.
- [ ] **Paired files**: each new or renamed `.md` has a matching `.yaml` (and obsolete pairs removed if deleting pages).
- [ ] **End-user focus** where content is customer-facing (workflows, validation, troubleshooting — not internal implementation dumps).
- [ ] **No secrets**: placeholders only; no real tokens, internal IDs, or production URLs that should stay private.

**When the plan touches `scripts/`, `package.json`, or TypeScript config**

- [ ] **Build pipeline order** is respected conceptually: validate → generate-nav → merge-metadata → build-jekyll (see `README.md`; `npm run build-docs` orchestrates the main path).
- [ ] **CI parity**: if CI runs `npm run build-docs`, the plan’s DoD should not rely only on partial steps unless justified.

**When the plan touches `.env`, `env.example`, or scripts that use credentials**

- [ ] **Never commit** real `.env` values; plan references `env.example` and documents variable *names*, not values.
- [ ] **Behavior split** (e.g. multiple modes, databases, or output targets) is explicit if the script’s contract changes; point readers to `README.md` for how to run and configure locally.

**Optional team rules**

- If you maintain MarkdownLint or other linters, the plan must state commands and zero-error expectation when documentation formatting is in scope.

---

## 4. Definition of Done (repository-specific)

A strong plan documents **DoD** in a dedicated section. Use the blocks below; delete subsections that are **N/A** for this plan.

### 4.1 Documentation and metadata (`docs/`)

- [ ] New/changed pages follow `.cursorrules` page structure where applicable (purpose, prerequisites, steps, validation, troubleshooting, references).
- [ ] Every affected `docs/.../*.md` has a correct sibling `docs/.../*.yaml` with required fields (title, description, audience, owner, dates, layout, etc. — see `.cursorrules`).
- [ ] Terminology: “AI Fabrix” and customer-appropriate language; no internal-only deployment trivia unless the doc is explicitly operator-facing and still customer-safe.
- [ ] Links and cross-references checked (no broken internal links introduced).

### 4.2 Build and validation (default for most code/pipeline changes)

Run in order unless the plan explains why a step is skipped:

1. `npm run validate` — YAML metadata validation (`scripts/validate-yaml.ts`).
2. `npm run build-docs` — full TypeScript pipeline including Jekyll build per project scripts (matches CI in `jekyll-dynamic.yml` for the build job).

If the plan only changes pure `site/` assets with no pipeline impact, still confirm whether `npm run build-jekyll` or full `build-docs` is required and state which.

### 4.3 Local smoke (when site behavior or styling is touched)

- [ ] `npm run dev` (Jekyll serve) used to spot-check affected pages, or plan documents equivalent validation.

### 4.4 Git and safety (process DoD)

- [ ] Plan reminds implementers: **no `git commit` / push without explicit user confirmation**; show what will be committed (per `.cursorrules`).
- [ ] No file deletions without explicit permission and explanation.

---

## 5. Task quality checks

| Criterion | Pass if |
|-----------|---------|
| **Traceability** | Each task maps to scope (files or subsystems). |
| **Ordering** | Dependencies ordered (e.g. metadata before build; script changes before relying on new behavior). |
| **Verification** | Tasks or DoD include *how* to verify (command, page URL, artifact). |
| **Rollback** | For risky changes, notes how to revert or feature-flag (recommended). |

---

## 6. Security and compliance (content and process)

- [ ] No instruction to paste secrets into plans, issues, or commits.
- [ ] Customer-facing content plans respect ISO-aligned distinction (operator vs platform controls) where relevant (see `.cursorrules`).
- [ ] Temporary or experimental files assigned to `temp/` if the plan generates them (per `.cursorrules`).

---

## 7. Evaluation report template

Paste this under the plan or in a review comment and fill in.

```markdown
## Plan quality report

**Date**: YYYY-MM-DD  
**Plan**: [path]  
**Overall**: ✅ Ready / ⚠️ Ready with gaps / ❌ Not ready

### Summary
[1–2 sentences]

### Structure (Section 1)
- [ ] Pass / Gap: …

### Classification (Section 2)
Types: …

### Rules and standards (Section 3)
- Gaps: …

### Definition of Done (Section 4)
- Present and complete: Yes / Partial / No  
- Missing: …

### Tasks (Section 5)
- Gaps: …

### Security / compliance (Section 6)
- Issues: None / [list]

### Required updates before implementation
1. …
```

### Status guidance

- **Ready**: Overview, scope, tasks, and DoD align; applicable rules referenced; validation commands match `package.json` / CI; content plans satisfy `.cursorrules` for `docs/`.
- **Ready with gaps**: Implementable but missing nice-to-haves (e.g. optional risks section); document follow-ups.
- **Not ready**: Missing DoD for the areas touched; scope contradicts tasks; no YAML/metadata strategy for new docs; secrets or unsafe git process implied.

---

## 8. Example minimal good plan (snippet)

```markdown
# Add troubleshooting section to installation guide

## Overview
End-users hit common SSL errors during install; we add a short troubleshooting subsection and align metadata.

## Scope
- `docs/getting-started/installation.md`
- `docs/getting-started/installation.yaml`
- Out of scope: CI workflow changes (separate change)

## Rules and standards
- `.cursorrules` — paired YAML, no frontmatter in `.md`, customer-safe wording

## Before development
- [ ] Read current installation page and related links

## Definition of Done
- [ ] `installation.md` updated; no frontmatter
- [ ] `installation.yaml` updated (title/description if needed)
- [ ] `npm run validate` and `npm run build-docs` succeed locally
- [ ] No commits without explicit user confirmation

## Tasks
- [ ] Draft troubleshooting (3 top issues + validation)
- [ ] Update YAML description/keywords if needed
- [ ] Run validate + build-docs
```

---

## Success criteria for *this* evaluation doc

Using this file on a plan should reliably result in:

1. Clear classification and scope.  
2. Explicit DoD aligned with **aifabrix-docs** tooling (`npm run validate`, `npm run build-docs`, Jekyll as documented in `README.md`).  
3. Documentation-specific gates (paired YAML, customer-safe content) when `docs/` is touched.  
4. A short written report deciding ready vs not ready.

---

## Notes

- **Large plans**: If a single plan spans unrelated areas (e.g. `docs/` plus a major `scripts/` refactor), split into smaller plans or add separate DoD subsections per area.
- **Evolving rules**: When `.cursor/rules/` or new linters are added, update **Section 3** and **Section 4** to link commands and files explicitly.
