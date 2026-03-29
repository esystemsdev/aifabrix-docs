# Plan: Separate API docs (`./api-docs`) vs user docs (`./docs`)

**Last updated:** 2026-03-26  
**Status:** In progress — rubric sections, validator, `api-docs/` scaffold, `package.json`, `env.example`, README, and sync script header done; optional: mock/real D360 runs, content migration, CI (Phase 5)  
**Rubric:** `prompts/plan-quality-evaluation.md`

---

## Overview

Operators maintain **user-facing documentation** under **`./docs`** (also the Jekyll/GitHub Pages source) and **API reference** under **`./api-docs`**, synced to a **separate Document360 project version** using the **`api-docs`** sync target. **aifabrix-d360** uses one **`SYNC_SOURCE_PATH`** per run: user-docs sync reads **`./docs`**; API sync reads **`./api-docs`** (set via npm script). Constraints: no change required to **aifabrix-d360** for this split; Jekyll does **not** publish **`api-docs/`** in this phase unless Phase 5 is approved.

---

## Scope

| Area | In scope |
|------|-----------|
| `api-docs/` | New tree: `.md` + sibling `.yaml` (same rules as `docs/` for sync metadata) |
| `package.json` | `sync-document360:api-docs` sets `SYNC_SOURCE_PATH=./api-docs` (Unix-style env) |
| `scripts/validate-yaml.ts` | Validate metadata YAML under **`docs/`** and **`api-docs/`** (skip missing dirs) |
| `scripts/sync-document360.ts` | Header comment documents paths vs npm scripts |
| `env.example`, `README.md` | Two roots, env vars, commands, CI/local validation |
| `.github/workflows/` | No change required unless adding a sync job (Phase 5) |

**Out of scope** (unchanged): **aifabrix-d360** fork for per-target env vars; full migration of API pages from `docs/`; Jekyll/build pipeline consuming `api-docs/` unless explicitly added.

---

## Rules and standards

- **`.cursorrules`**: Customer-safe content; **no markdown frontmatter** in `api-docs/**/*.md`; metadata only in sibling **`.yaml`**; paired files for each page; **no secrets** in repo (use `env.example` for names only; real values in `.env`, gitignored).
- **Git / safety**: **No `git commit` or push without explicit user confirmation**; no destructive deletes without permission and explanation.
- **Build / CI parity**: After touching `api-docs/`, `package.json`, or `scripts/`, run **`npm run validate`** then **`npm run build-docs`** locally (matches `jekyll-dynamic.yml` build expectations for the main pipeline). **`api-docs/`** is included in **validate** only; Jekyll steps still process **`docs/`** as today.
- **References**: `README.md`, `package.json`, `prompts/plan-quality-evaluation.md`, `.cursorrules`.

---

## Goal

- **User documentation** syncs from **`./docs`** to the Document360 **`docs`** lane (existing behavior).
- **API reference** syncs from **`./api-docs`** to the Document360 **`api-docs`** lane (same API token; version via `DOCUMENT360_PROJECT_VERSION_ID_API_DOCS` or slug).

---

## Assumptions

1. **aifabrix-d360** keeps a single **`SYNC_SOURCE_PATH`** per process; **`docs` | `api-docs`** selects Document360 version + default SQLite file.
2. API content follows the **same metadata conventions** as **`docs/`** (`.md` + sidecar `.yaml` for the sync engine).
3. **Jekyll / `build-docs`** is **not** extended to emit **`api-docs/`** in this phase unless Phase 5 is approved.

---

## Definition of Done

### Content (`api-docs/`)

- [x] Landing page: **`api-docs/overview.md`** + **`api-docs/overview.yaml`** (pattern for future pages).
- [ ] Additional API pages: **no** MD frontmatter; **paired `.yaml`** with required fields per `.cursorrules`.
- [x] Customer-safe wording; **AI Fabrix** terminology (landing stub).

### Build and validation

- [x] **`npm run validate`** includes **`api-docs/`** when present (`scripts/validate-yaml.ts`).
- [x] **`npm run build-docs`** passes with no regressions (run locally before commit).

### Sync (when run intentionally)

- [x] **`npm run sync-document360`** uses default **`./docs`**; **`npm run sync-document360:api-docs`** sets **`SYNC_SOURCE_PATH=./api-docs`** and **`api-docs`** target.
- [ ] Logs show expected **`syncTarget`** and source path (run **`MOCK_MODE=true`** or real sync to confirm).

### Process

- [ ] No commits without explicit user confirmation; **`env.example`** documents variable **names** only.

### N/A for this phase

- [ ] **`npm run dev`** spot-check for **`api-docs/`** (not in Jekyll scope unless Phase 5).

---

## Risks and open questions

| Risk / question | Mitigation |
|-----------------|------------|
| **Windows** npm scripts: inline `VAR=value` may fail | Document in README; optional later: `cross-env` devDependency. |
| Duplicate or divergent content between **`docs/`** and **`api-docs/`** | Content audit / redirects; optional migration task (Phase 2.3). |
| First **`api-docs`** sync creates a full tree in that Document360 version | Expected; verify in correct project version before production run. |
| Rollback | Revert **`package.json`** script; remove or stop syncing **`api-docs/`**; D360 cleanup manual if needed. |

---

## Phase 1 — Scripts and environment ergonomics

| Step | Task | Notes |
|------|------|--------|
| 1.1 | **`package.json`** — user-docs scripts | Default **`./docs`** (omit `SYNC_SOURCE_PATH` or set explicitly). |
| 1.2 | **`package.json`** — API-docs script | **`SYNC_SOURCE_PATH=./api-docs`** for `sync-document360:api-docs`. |
| 1.3 | Cross-platform | See **Risks**; README documents Windows limitation. |

---

## Phase 2 — Content scaffold

| Step | Task | Notes |
|------|------|--------|
| 2.1 | **`api-docs/`** | Minimal landing page + YAML (validates under shared validator). |
| 2.2 | Structure | Mirror **`docs/`** patterns the sync engine expects (`navigation.yaml` per folder when you add sections). |
| 2.3 | Migration (optional) | Move API-oriented pages from **`docs/`** after inventory. |

---

## Phase 3 — Documentation

| Step | Task | Notes |
|------|------|--------|
| 3.1 | **`env.example`** | Two roots; **`SYNC_SOURCE_PATH`** per run; npm sets **`./api-docs`** for API script. |
| 3.2 | **`README.md`** | Table: command → target → local path → D360 env vars; **`api-docs`** vs Jekyll **`docs/`**. |
| 3.3 | **`scripts/sync-document360.ts`** | Header: **`./docs`** vs **`./api-docs`** and npm scripts. |

---

## Phase 4 — Validation

| Step | Task | Notes |
|------|------|--------|
| 4.1 | Repo | **`npm run validate`**, **`npm run build-docs`**. |
| 4.2 | Mock sync | `MOCK_MODE=true`: both sync commands; check paths and **`syncTarget`**. |
| 4.3 | Real Document360 | Version UUIDs/slugs set; verify API content only in API version. |

---

## Phase 5 — Optional follow-ups

| Area | Description |
|------|-------------|
| **CI** | Job or doc for API sync with secrets. |
| **Jekyll** | Publish **`api-docs/`** on Pages — separate initiative. |
| **aifabrix-d360** | Optional env like `SYNC_SOURCE_PATH_API_DOCS` — not required if npm sets path. |

---

## Success criteria

- One command syncs **only** `./docs` to the **docs** Document360 version.
- Another syncs **only** `./api-docs` to the **api-docs** Document360 version.
- **`env.example`** and **README** explain paths, targets, and version env vars.
- **`npm run validate`** covers **`api-docs/`** metadata YAML.

---

## References (in-repo)

- `scripts/sync-document360.ts` — forward sync  
- `scripts/validate-yaml.ts` — **`docs/`** + **`api-docs/`**  
- `package.json` — sync npm scripts  
- `env.example` — Document360 / sync variables  
- **aifabrix-d360** (`file:../aifabrix-d360`) — `ConfigManager`, CLI  

---

## Plan quality follow-up (resolved)

Earlier review (`2026-03-26`) against **`prompts/plan-quality-evaluation.md`** flagged missing **Overview / Scope / Rules / DoD / Risks**, **`api-docs`** exclusion from **`validate`**, and weak verification hooks. **Resolved by:** adding those sections; extending **`validate-yaml.ts`** to scan **`api-docs/`** when present; folding **`npm run validate`** and **`npm run build-docs`** into **Definition of Done** and Phase 4.
