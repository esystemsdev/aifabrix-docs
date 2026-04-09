---
name: Cursor rules and commands for anchors
overview: **Rules** passively guard anchor and persona quality; **first-class Cursor commands** drive creation, extraction, normalization, validation, coverage, and sync so adoption is fast. **V1 ships six commands** (`anchor-create`, `anchor-extract-to-doc`, `anchor-normalize`, `anchor-validate`, `anchor-coverage`, `anchor-sync`); the rest are phased. Depends on [001-yaml_nav_and_anchor_stubs.plan.md](001-yaml_nav_and_anchor_stubs.plan.md) for npm scripts where noted.
todos:
  - id: phase1-anchor-rule-product-repos
    content: "Add .cursor/rules/anchor-docs-structure.mdc in dataplane, miso, builder for anchor-docs/**/*.md (passive enforcement)."
    status: pending
  - id: phase1-thin-docs-rule
    content: "Add aifabrix-docs .cursor/rules/thin-persona-docs.mdc for docs/**/*.md."
    status: pending
  - id: phase1-commands-v1-six
    content: "Add aifabrix-docs .cursor/commands: anchor-create.md, anchor-extract-to-doc.md, anchor-normalize.md, anchor-validate.md, anchor-coverage.md, anchor-sync.md per shared behavior + template below."
    status: pending
  - id: phase1-npm-script-stubs
    content: "Wire or document npm run validate-anchor-docs, anchor-coverage, docs-sync in aifabrix-docs package.json per plan 001; commands reference them."
    status: pending
  - id: phase2-commands-extended
    content: "Add remaining command specs: anchor-create-from-nav, anchor-split, anchor-link-to-nav, anchor-create-missing, anchor-sync-changed, anchor-health, anchor-extract-from-docs, generate-golden-path, summarize-anchor (as applicable)."
    status: pending
  - id: phase2-nav-registry-hints
    content: "After navigation-ids artifact exists: enrich anchor-create-from-nav, anchor-coverage, rules with registry + duplicate detection."
    status: pending
isProject: false
---

# Plan 002: Cursor rules + first-class anchor commands

**Depends on:** [001-yaml_nav_and_anchor_stubs.plan.md](001-yaml_nav_and_anchor_stubs.plan.md) (workspace resolver, `validate-anchor-docs`, `build-persona-docs`, `anchor-coverage`, `docs-sync`, optional incremental hash cache).

---

## Rules vs commands (adoption model)

| Mechanism | Role |
|-----------|------|
| **Rules** (`.cursor/rules/*.mdc`) | Passive enforcement when editing: bad structure, backtick paths, thin-doc violations. |
| **Commands** (`.cursor/commands/*.md`) | Active workflows: create anchors, extract content, normalize, validate, coverage, sync. |

**Rules catch mistakes; commands do the work.** Both are required; commands are what make the system **fast to adopt**.

---

## Shared command behavior (every anchor command)

Each command spec should instruct the agent to:

1. **Detect repo context** — infer **aifabrix-dataplane / aifabrix-miso / aifabrix-builder / aifabrix-docs** from open files or workspace; if ambiguous, ask once.
2. **Resolve workspace root** — read [aifabrix-docs/config/workspace-root.yml](config/workspace-root.yml) when needed (or `AIFABRIX_WORK`); paths in anchors stay `[path:aifabrix-REPO/...]`.
3. **Use the mandatory anchor template** for any new anchor file (see plan 001 / anchor rule).
4. **Prefer `[path:...]`** over backtick file paths.
5. **State affected `navigation_id`** after edits.
6. **Suggest next step** (e.g. after `anchor-create` → suggest `anchor-validate` then `anchor-sync`).

**Example flow:** `anchor-create` → `anchor-validate` → `anchor-sync`.

---

## V1 command set (ship first — six files)

Implement as **Cursor command markdown** under [aifabrix-docs/.cursor/commands/](.cursor/commands/) (agents in any workspace root can invoke them; paths to sibling repos use workspace config).

| Command file | Purpose |
|--------------|---------|
| **`anchor-create.md`** | Create a new anchor-doc from the mandatory template: prompt or use provided **repo**, **title**, **navigation_id**, **owner**; **auto-generate kebab-case filename** under that repo’s `anchor-docs/`; insert template with `last_verified_commit` empty or TBD. |
| **`anchor-extract-to-doc.md`** | **Highest leverage with `anchor-create`:** take **selected** technical content from `aifabrix-docs/docs/**` or other markdown; create **new** anchor in the **correct owning repo**; **replace** original selection with short **summary + link** to the anchor path. |
| **`anchor-normalize.md`** | Fix an existing anchor: missing `## Summary` / `## Paths` / sections; normalize YAML frontmatter; convert backtick repo paths → `[path:...]`. |
| **`anchor-validate.md`** | **Current repo or current file:** run `npm run validate-anchor-docs` from **aifabrix-docs** when script exists; **plus** agent checklist (frontmatter, Summary, ≥1 path, size hint). |
| **`anchor-coverage.md`** | Run `npm run anchor-coverage` from aifabrix-docs when available; else agent summarizes from registry + glob scan: **missing navigation_ids**, **orphan anchors**, **duplicates**. |
| **`anchor-sync.md`** | Run full pipeline: **validate → build persona docs → generate cursor nav** (`npm run docs-sync` from aifabrix-docs per plan 001). After anchor changes, this is the default **publish** step. |

**Naming:** Prefer these **`anchor-*`** names as the **primary** user-facing commands; older names like `docs-sync.md` can be **deprecated** or become a one-line alias pointing to `anchor-sync.md`.

---

## Full recommended catalog (phase 2+)

Add command specs when scripts and registry mature.

### Core creation

| Command | Behavior |
|---------|----------|
| **`anchor-create`** | (V1) |
| **`anchor-create-from-nav`** | User picks **`navigation_id`** from YAML-derived list; **prefill title** from nav; **suggest target repo** from section (builder / dataplane / miso). |

### Refactoring

| Command | Behavior |
|---------|----------|
| **`anchor-extract-to-doc`** | (V1) |
| **`anchor-split`** | Split oversized anchor into smaller files; **keep** a short summary in original; move **Details** subsections into **sub-anchors** (`anchor-docs/<topic>/`) with linked `navigation_id` policy. |
| **`anchor-normalize`** | (V1) |

### Validation

| Command | Behavior |
|---------|----------|
| **`anchor-validate`** | (V1) |
| **`anchor-coverage`** | (V1) |
| **`anchor-health`** | **Combined:** validate + coverage + duplicate `navigation_id` report + **large-file** warnings (~500 lines). |

### Sync

| Command | Behavior |
|---------|----------|
| **`anchor-sync`** | (V1) — same as full docs-sync. |
| **`anchor-sync-changed`** | After plan 001 **hash cache**: rebuild **only** persona sections affected by changed anchors; else fall back to full `anchor-sync`. |

### Navigation helpers

| Command | Behavior |
|---------|----------|
| **`anchor-link-to-nav`** | Attach or fix **`navigation_id`** on an existing anchor to match nav YAML. |
| **`anchor-create-missing`** | Input: coverage output; **interactively** create stubs for missing ids (uses `anchor-create` template). |

### Thin persona docs

| Command | Behavior |
|---------|----------|
| **`anchor-extract-from-docs`** | **Batch / guided:** scan `aifabrix-docs/docs/**` for schema dumps, long CLI blocks; propose moves to anchor-docs + thin summaries (generalization of `anchor-extract-to-doc`). |

### Optional (tie to plan 001 extras)

| Command | Behavior |
|---------|----------|
| **`generate-golden-path`** | CIP + CLI anchors → “Create First Integration” persona page. |
| **`summarize-anchor`** | Optional AI pass: short Summary / dev / architect variants. |

---

## Phase 1 (unchanged): rules

### Anchor structure rule (product repos)

- `.cursor/rules/anchor-docs-structure.mdc` — globs `anchor-docs/**/*.md`; template, Summary, Paths, `[path:]`, granularity, ~500-line hint; `README.md` exempt.

### Thin docs rule (aifabrix-docs)

- `.cursor/rules/thin-persona-docs.mdc` — globs `docs/**/*.md`; discourage duplicating schemas / CLI / API catalogs.

---

## npm scripts (plan 001)

- **`anchor-validate`** command → `npm run validate-anchor-docs` (aifabrix-docs).
- **`anchor-coverage`** → `npm run anchor-coverage`.
- **`anchor-sync`** → `npm run docs-sync` (validate + build-persona-docs + generate-cursor-nav).

Until scripts exist, commands must say: run **agent-only** checklist or stub, and **retry after plan 001**.

---

## Quality checklist (anchor-validate agent branch)

- Frontmatter: `navigation_id`, `owner`, `title`
- `## Summary` non-empty
- `## Paths` + ≥1 `[path:...]`
- No backtick-only repo paths
- File size / single-concept hints

---

## Final result

- **V1:** 2 rules + **6 first-class commands** (`anchor-create` … `anchor-sync`) with shared behavior and **suggested next command**.
- **Later:** full catalog + `anchor-health`, `anchor-create-from-nav`, `anchor-sync-changed`, etc.
- **Highest-value pair:** **`anchor-create`** + **`anchor-extract-to-doc`** — prioritize these in command descriptions and examples.

---

## Cross-link

- [001-yaml_nav_and_anchor_stubs.plan.md](001-yaml_nav_and_anchor_stubs.plan.md) — scripts, registry, template authority.
