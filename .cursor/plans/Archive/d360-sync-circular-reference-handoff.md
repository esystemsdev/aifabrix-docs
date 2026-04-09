# Document360 Sync — 400 "Published article" Handoff (aifabrix-d360)

**Audience:** Cursor agent and maintainers in the **aifabrix-d360** repo.  
**Purpose:** Fix sync failures so aifabrix-docs (and other doc repos) can sync to Document360 without 400 errors.

---

## 1. Root cause (confirmed)

Sync from **aifabrix-docs** was logging `Request failed with status code 400 "[Circular Reference]"`. After adding raw response logging in d360, a full sync was run with output captured (`2>&1 | tee temp/sync-output-full.log`). The **actual Document360 API response** is:

- **Status:** 400 Bad Request  
- **Body:** Document360 does **not** return "[Circular Reference]". The real error is:

```json
{
  "success": false,
  "errors": [
    {
      "description": "You cannot update published article content, please fork the article to continue editing",
      "errorCode": null
    }
  ]
}
```

So: **"[Circular Reference]"** was from aifabrix-d360’s logger when it stringified the axios error object (which contains circular refs). The **real** Document360 error is: **"You cannot update published article content, please fork the article to continue editing"**.

- **Scope:** All 28 articles fail on **updateArticle** because the articles are already **published** in Document360, and the API does not allow updating published article content directly.
- **Fix direction:** In d360, when **updateArticle** returns this error, either: (1) **fork** the article (per Document360’s message), update the fork, then replace/publish as needed; or (2) **unpublish** → update → **republish** if the API supports it; or (3) use a Document360 API that allows editing published content, if available.

---

## 2. What to do in aifabrix-d360

1. **Handle “published article” constraint in update flow**
   - In `updateArticle` (or the sync path that calls it), when the API returns 400 with `errors[].description` containing "You cannot update published article content, please fork the article to continue editing":
     - **Option A:** Call Document360’s fork-article API (if available), then update the forked article and handle replace/publish as per their docs.
     - **Option B:** Unpublish the article (if the API supports it), then update, then republish.
     - **Option C:** Use a Document360 API that allows editing published content, if one exists.
   - Implement one of these so that sync can update articles that are already published.

2. **Improve user-facing error message**
   - When throwing or logging after a 400, surface the **real** Document360 error (e.g. `errors[0].description`) instead of the stringified axios error, so users see "You cannot update published article content, please fork..." rather than "[Circular Reference]". That can be done by reading `error.response?.data?.errors?.[0]?.description` and including it in the message.

3. **Re-run sync from aifabrix-docs** after the fix: `node -r ts-node/register scripts/sync-document360.ts` (optionally with `2>&1 | tee temp/sync-output-full.log` to capture output).

---

## 3. Update (Feb 2026): 405 on fork

Fork-before-update was implemented in d360. A sync run showed:

- **updateArticle** still returns 400 "please fork the article to continue editing" for published articles.
- The client correctly triggers the fork flow: **getArticle** is called and eventually returns 200 (after long delay; rate limiter timeout may apply).
- **forkArticle** then fails with **405 Method Not Allowed**.

So the fork request in the d360 client is using the wrong HTTP method or wrong path. The fork endpoint and method must be fixed in aifabrix-d360 (correct Document360 API for forking an article) before sync can update published articles.

---

## 4. Quick reference

| Item | Detail |
|------|--------|
| **Current blocker** | `405 Method Not Allowed` on **forkArticle** — fix fork endpoint/HTTP method in d360 client (Document360 fork API). |
| **Real Document360 error (update)** | `400` — `"You cannot update published article content, please fork the article to continue editing"` |
| **What we saw before** | `"[Circular Reference]"` — from d360 logger when stringifying the axios error object (circular refs), not from Document360 |
| **Scope** | All 28 articles fail on **updateArticle** (articles are already published in Document360) |
| **Repo to fix** | aifabrix-d360 (sync tool), not aifabrix-docs |
| **Sync command (from aifabrix-docs)** | `node -r ts-node/register scripts/sync-document360.ts` |
| **Capture full output** | `node -r ts-node/register scripts/sync-document360.ts 2>&1 \| tee temp/sync-output-full.log` |
| **Relevant code** | `src/api/client.ts` (updateArticle); `src/sync/yaml-sync-engine.ts` (sync path that updates existing articles). Implement fork-before-update or unpublish/update/republish when this 400 is returned. |

**Log evidence:** Full sync was run with raw response logging; `temp/sync-output-full.log` (and terminal output) contain lines like `[updateArticle] Document360 raw error response: 400 Bad Request body: { "errors": [{ "description": "You cannot update published article content, please fork the article to continue editing" }] ... }`.
