# Article SEO in Document360 — Plan for aifabrix-docs (Cursor Agent)

**Audience:** Cursor agent and maintainers in the **aifabrix-docs** project.  
**Purpose:** Use the new Article SEO sync feature so Document360 gets proper Meta title and Meta description from aifabrix-docs content.

---

## 1. What changed in aifabrix-d360 (already done)

The **aifabrix-d360** sync tool now pushes **Article SEO** to Document360:

- When an article is **created** or **updated**, if the article has **`meta_title`** and/or **`meta_description`** in the source, the tool calls Document360’s **Article Settings API** and sets:
  - **Meta title** (browser tab / search results title) from `meta_title`
  - **Meta description** (snippet under the title in search results) from `meta_description`

No change is required in **aifabrix-docs** code or scripts for this to work; the sync already reads YAML (and Markdown front matter) and now writes these fields to Document360 when present.

---

## 2. How sync is used in aifabrix-docs (findings)

- **Dependency:** `aifabrix-d360` is linked as a local package: `"aifabrix-d360": "file:../aifabrix-d360"` in `package.json`.
- **Entry point:** `scripts/sync-document360.ts` imports `AifabrixD360`, loads `.env`, builds config from environment variables (`DOCUMENT360_API_TOKEN`, `DOCUMENT360_PROJECT_ID`, `SYNC_SOURCE_PATH` default `./docs`, etc.), and runs `sync.sync()`.
- **Command:** `npm run sync-document360` runs the sync. No script changes are needed for SEO.
- **Content layout:** Docs live under `docs/` with one or more YAML metadata files per section (e.g. `docs/overview/overview.yaml`, `docs/interface-layer/interface-layer.yaml`, `docs/dataplane/dataplane.yaml`). Each has:
  - **`title`** — article title
  - **`description`** — short summary (already used as meta description by the sync)
  - **`document360`** — category, order, visibility, etc.
  - **`seo`** — keywords, canonical_url, og_image (used by Jekyll/navigation; sync uses top-level fields for Document360 SEO)

The sync maps:

- **`description`** → Document360 **Meta description** (already in place).
- **`meta_title`** → Document360 **Meta title**. If **`meta_title`** is missing, the sync falls back to **`title`**.

So: **Meta description** is already synced from `description`. To control **Meta title** (e.g. for better SEO or to keep it under 70 characters), aifabrix-docs should add **`meta_title`** where desired.

---

## 3. What to do in aifabrix-docs

### 3.1 Add `meta_title` where you want a dedicated SEO title

- **Where:** In the same YAML files that already have `title` and `description` (e.g. `docs/overview/overview.yaml`, `docs/interface-layer/interface-layer.yaml`, and other section/topic YAML files).
- **Field:** Top-level **`meta_title`** (string).
- **When to set it:**
  - When the article title is long or not ideal for search (Document360 recommends 50–60 characters for Meta title; max 70).
  - When you want the browser-tab / SERP title to differ from the on-page heading (`title`).
- **Example:**

```yaml
title: "Overview"
meta_title: "AI Fabrix Overview | Enterprise AI Platform"
description: "What AI Fabrix is, what it is not, and why in-tenant architecture matters for enterprise AI"
# ... rest unchanged
```

- If **`meta_title`** is omitted, the sync continues to use **`title`** as the Meta title (current behavior).

### 3.2 Keep `description` in shape for Meta description

- **`description`** is already used as the Document360 Meta description. Keep it concise and useful for search (Document360 recommends 150–160 characters).
- No new field is required; only ensure new or updated articles have a meaningful `description`.

### 3.3 Optional: validation or guidelines

- **Lint / validation:** Optionally add a check (e.g. in `scripts/validate-yaml.ts` or a separate script) that:
  - Ensures each article YAML has `description`.
  - Optionally warns if `meta_title` is missing or if `meta_title` / `description` exceed recommended lengths (70 and 160 characters respectively).
- **Docs:** Optionally document in aifabrix-docs README or contributor guide that:
  - `title` and `description` are required (or strongly recommended).
  - `meta_title` is optional and used as the Document360 Meta title when set; otherwise `title` is used.

### 3.4 What not to change

- **Do not** change `scripts/sync-document360.ts` or the way `AifabrixD360` is called for SEO.
- **Do not** add new scripts solely for SEO; the existing sync handles it.
- **Slug:** The sync does not currently send `slug` to Document360’s Article Settings API (support was not confirmed). Keeping `slug` in YAML for local/navigation use is fine; it is not yet synced as the article’s SEO slug in Document360.

---

## 4. Checklist for the Cursor agent in aifabrix-docs

- [ ] **Add `meta_title`** to section/topic YAML files where a distinct Meta title is desired (e.g. 50–60 chars, keyword-aware). Prefer top-level `meta_title` in the same file as `title` and `description`.
- [ ] **Keep `description`** populated and within ~150–160 characters for best use as Meta description.
- [ ] **(Optional)** Extend validation (e.g. `validate-yaml.ts`) to require `description` and optionally warn on missing `meta_title` or length.
- [ ] **(Optional)** Document in README or contributor guide that `description` and optional `meta_title` drive Document360 Article SEO after sync.

---

## 5. Quick reference: YAML fields the sync uses for SEO

| YAML field     | Document360 field   | Notes                                      |
|----------------|---------------------|--------------------------------------------|
| `title`        | Article title       | Always used.                               |
| `meta_title`   | Meta title (SEO)    | Optional; if missing, `title` is used.     |
| `description`  | Meta description    | Used as the SEO meta description.          |

Sync command in aifabrix-docs: **`npm run sync-document360`** (no changes needed to the command or script for this feature).
