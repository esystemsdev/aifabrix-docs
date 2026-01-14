# Mermaid Diagram Pipeline - End-to-End Test Plan

> **Note for Cursor AI:** This test plan is for the **human tester** to follow. The tester will provide their own Mermaid diagrams from their actual documentation. Do not generate or create test diagrams. When the tester opens this plan in the `aifabrix-docs` project, assist them with the steps but do not create diagrams for them.

## Context: What Was Built in `aifabrix-d360`

### Overview
A complete Mermaid-to-Image rendering pipeline has been implemented in the `aifabrix-d360` project. This pipeline automatically:

1. **Extracts** Mermaid code blocks from Markdown files
2. **Normalizes** the Mermaid content (removes whitespace differences, standardizes formatting)
3. **Hashes** the normalized content using SHA-256 to create a unique identifier
4. **Checks** the database for existing mappings using the hash
5. **Renders** new diagrams to SVG (if not found in database)
6. **Uploads** rendered images to Document360 (if new)
7. **Replaces** Mermaid code blocks with Document360 image URLs in the content
8. **Stores** mappings in SQLite database for future reuse

### Key Features

- **Content-Based Change Detection**: Uses SHA-256 hash of normalized Mermaid content to identify unique diagrams
- **Automatic Reuse**: If the same diagram appears in multiple articles, it only renders/uploads once
- **Change Detection**: When a diagram changes, a new hash is computed, triggering a new render/upload
- **Source File Tracking**: Tracks which files contain each diagram
- **Correlation IDs**: All operations are logged with correlation IDs for traceability

### Integration Points

The pipeline is integrated into `YamlSyncEngine.syncYamlFile()` method, which means:
- Mermaid processing happens automatically during normal sync operations
- No special commands needed - just run `aifabrix-d360 sync` as usual
- Works seamlessly with existing image processing and article publishing

### Database Schema

The `image_mappings` table now includes:
- `diagram_hash`: SHA-256 hash of normalized Mermaid content
- `renderer_version`: Version of Mermaid CLI used to render
- `source_files`: JSON array of file paths where diagram appears
- `last_seen_at`: Timestamp of last sync run where diagram was seen

---

## Test Plan: Verify Mermaid Pipeline in `aifabrix-docs`

### Prerequisites

1. **aifabrix-d360 is built and ready**
   - Ensure the project is built: `npm run build` in `aifabrix-d360`
   - Ensure dependencies are installed: `npm install` in `aifabrix-d360`

2. **aifabrix-docs is set up**
   - Have a local clone of `aifabrix-docs` repository
   - **The tester will provide a Mermaid diagram** - identify an article that contains a Mermaid diagram (or use an existing one from the actual documentation)
   - Ensure the article follows the YAML+Markdown structure expected by the sync tool
   - **Note for tester:** Do not generate test diagrams - use actual documentation diagrams. Cursor AI should not create diagrams for this test.

3. **Document360 Configuration**
   - Have valid `DOCUMENT360_API_TOKEN` and `DOCUMENT360_PROJECT_ID`
   - Have access to the Document360 project to verify published articles
   - Know the article slug/ID in Document360 (or be ready to find it after first sync)

4. **Mermaid CLI Installed**
   - The pipeline uses `@mermaid-js/mermaid-cli` (mmdc)
   - Should be installed as a dependency in `aifabrix-d360`
   - Verify: `npx mmdc --version` should work

---

## Test Steps

### Phase 1: Initial Sync - Verify Diagram Rendering

#### Step 1.1: Identify Test Article
- [ ] Open `aifabrix-docs` repository
- [ ] **The tester provides the Mermaid diagram** - find an article that contains a Mermaid diagram from the actual documentation
- [ ] Note the article's file path (e.g., `docs/getting-started/index.yaml` and `docs/getting-started/index.md`)
- [ ] Note the article's expected Document360 slug/ID
- [ ] **Important for tester:** Use real documentation diagrams - do not generate or create test diagrams. Cursor AI should not create diagrams.

#### Step 1.2: Configure Sync Tool
- [ ] In `aifabrix-docs`, ensure `.env` file exists with:
  ```
  DOCUMENT360_API_TOKEN=your-token
  DOCUMENT360_PROJECT_ID=your-project-id
  DOCUMENT360_BASE_URL=https://apihub.document360.io
  SYNC_SOURCE_PATH=./docs  # or your docs path
  ```
- [ ] Verify `DATABASE_PATH` is set (default: `./data/sync.db`)

#### Step 1.3: Run Initial Sync
- [ ] Navigate to `aifabrix-docs` root directory
- [ ] Run sync command:
  ```bash
  npx aifabrix-d360 sync
  # OR if installed globally:
  aifabrix-d360 sync
  ```
- [ ] Watch for log messages indicating Mermaid processing:
  - Look for: `"Starting Mermaid diagram processing"`
  - Look for: `"Mermaid processing complete: X rendered, Y reused, Z uploaded"`
  - Note the correlation ID from logs

#### Step 1.4: Verify Database State
- [ ] Check the SQLite database:
  ```bash
  sqlite3 ./data/sync.db "SELECT diagram_hash, d360_url, source_files, last_seen_at FROM image_mappings WHERE diagram_hash IS NOT NULL;"
  ```
- [ ] Verify:
  - At least one row exists with `diagram_hash` populated
  - `d360_url` contains a Document360 URL
  - `source_files` contains the path to the test article's Markdown file
  - `last_seen_at` is recent

#### Step 1.5: Verify in Document360
- [ ] Open Document360 project in browser
- [ ] Navigate to the test article
- [ ] Verify:
  - [ ] Article exists and is published
  - [ ] Mermaid code block is **replaced** with an image
  - [ ] Image displays correctly (not broken)
  - [ ] Image URL is from Document360 (check image URL in browser dev tools)
  - [ ] No Mermaid code block visible in the published article

#### Step 1.6: Verify Logs
- [ ] Check sync logs for correlation ID from Step 1.3
- [ ] Verify logs show:
  - Diagram extraction
  - Hash computation
  - Rendering (if new) or reuse (if already exists)
  - Upload (if new)
  - Replacement count

**✅ Phase 1 Success Criteria:**
- Article syncs successfully
- Mermaid diagram is rendered as an image in Document360
- Database contains mapping with correct hash
- Logs show successful processing

---

### Phase 2: Change Detection - Verify Diagram Update

#### Step 2.1: Modify Mermaid Diagram
- [ ] Open the test article's Markdown file in `aifabrix-docs`
- [ ] Find the Mermaid code block (the one provided by the tester from their documentation)
- [ ] **Tester makes a meaningful change** to the diagram (not just whitespace):
  - Add a new node
  - Change node text
  - Add/remove connections
  - Change diagram type (e.g., graph → flowchart)
- [ ] Save the file
- [ ] Note the change made (for verification)
- [ ] **Note for tester:** Modify the actual diagram - make a change that makes sense for the documentation. Cursor AI should not modify the diagram.

#### Step 2.2: Run Sync Again
- [ ] Run sync command again:
  ```bash
  npx aifabrix-d360 sync
  ```
- [ ] Watch for log messages:
  - Should show: `"Mermaid processing complete: 1 rendered, 0 reused, 1 uploaded"`
  - Note the new correlation ID
  - Should indicate a new diagram was detected (different hash)

#### Step 2.3: Verify Database State (Updated)
- [ ] Check database again:
  ```bash
  sqlite3 ./data/sync.db "SELECT diagram_hash, d360_url, source_files, last_seen_at FROM image_mappings WHERE diagram_hash IS NOT NULL ORDER BY last_seen_at DESC;"
  ```
- [ ] Verify:
  - **Two rows** exist (old diagram + new diagram)
  - New row has a **different** `diagram_hash` than the old one
  - New row has a **different** `d360_url` (new image uploaded)
  - New row's `last_seen_at` is more recent
  - Old row still exists (for potential reuse)

#### Step 2.4: Verify in Document360 (Updated)
- [ ] Refresh the article page in Document360
- [ ] Verify:
  - [ ] Article content has **updated**
  - [ ] Image shows the **new diagram** (matches the changes made)
  - [ ] Image URL is **different** from before (check browser dev tools)
  - [ ] Old image is no longer referenced in the article

#### Step 2.5: Verify Logs (Change Detection)
- [ ] Check logs for the new correlation ID
- [ ] Verify logs show:
  - New hash computed (different from previous)
  - New diagram rendered
  - New image uploaded
  - Replacement completed

**✅ Phase 2 Success Criteria:**
- Modified diagram triggers new render/upload
- New hash is computed and stored
- Article content updates with new image
- Old mapping is preserved (for reuse testing)

---

### Phase 3: Reuse Test - Verify Content-Based Caching

#### Step 3.1: Revert to Original Diagram
- [ ] Open the test article's Markdown file
- [ ] Revert the Mermaid diagram back to its **original** content (from Phase 1)
- [ ] Ensure it matches exactly (including whitespace, if possible)
- [ ] Save the file

#### Step 3.2: Run Sync Again
- [ ] Run sync command:
  ```bash
  npx aifabrix-d360 sync
  ```
- [ ] Watch for log messages:
  - Should show: `"Mermaid processing complete: 0 rendered, 1 reused, 0 uploaded"`
  - Should indicate diagram was **reused** (same hash found)

#### Step 3.3: Verify Database State (Reuse)
- [ ] Check database:
  ```bash
  sqlite3 ./data/sync.db "SELECT diagram_hash, d360_url, source_files, last_seen_at FROM image_mappings WHERE diagram_hash IS NOT NULL ORDER BY last_seen_at DESC;"
  ```
- [ ] Verify:
  - Original diagram's `last_seen_at` is updated (most recent)
  - Original diagram's `d360_url` is still the same
  - Both rows still exist (original + modified from Phase 2)

#### Step 3.4: Verify in Document360 (Reuse)
- [ ] Refresh the article page
- [ ] Verify:
  - [ ] Article shows the **original diagram** again
  - [ ] Image URL matches the **original** from Phase 1
  - [ ] No new image was uploaded (check Document360 assets if possible)

#### Step 3.5: Verify Logs (Reuse)
- [ ] Check logs for reuse indication
- [ ] Verify logs show:
  - Hash matched existing mapping
  - No rendering occurred
  - No upload occurred
  - Reuse count = 1

**✅ Phase 3 Success Criteria:**
- Original diagram is reused (no new render/upload)
- Database mapping is reused correctly
- Article content uses original image URL
- Logs confirm reuse behavior

---

## Troubleshooting

### Issue: Mermaid diagram not being extracted
**Symptoms:** Logs show "0 rendered, 0 reused"
**Check:**
- Mermaid code block uses correct syntax: ` ```mermaid ` (not ` ```mermaid` or ` ``` mermaid`)
- Code block is in the Markdown file (not YAML frontmatter)
- Run with `LOG_LEVEL=debug` to see extraction details

### Issue: Diagram renders but image is broken in Document360
**Symptoms:** Image URL exists but shows broken image
**Check:**
- Verify Document360 API token has asset upload permissions
- Check if SVG format is supported by Document360
- Verify image URL is accessible (try opening in browser)
- Check sync logs for upload errors

### Issue: Diagram doesn't update after change
**Symptoms:** Modified diagram still shows old image
**Check:**
- Verify the change actually modifies the normalized content (not just comments/whitespace)
- Check database for new hash entry
- Verify sync actually ran (check logs for correlation ID)
- Clear browser cache when viewing Document360

### Issue: Database errors
**Symptoms:** SQLite errors during sync
**Check:**
- Verify database file is writable
- Check if database schema migration ran (should happen automatically)
- Verify `DATABASE_PATH` is correct
- Check database file isn't locked by another process

### Issue: Mermaid CLI not found
**Symptoms:** Error about `mmdc` command not found
**Check:**
- Run `npm install` in `aifabrix-d360` to ensure dependencies are installed
- Verify `@mermaid-js/mermaid-cli` is in `package.json`
- Try running `npx mmdc --version` manually

---

## Expected Log Output Examples

### Successful Initial Sync
```
[info] Starting Mermaid diagram processing { correlationId: 'abc-123', sourceFile: 'docs/test/index.md' }
[debug] Extracted 1 Mermaid block(s) { correlationId: 'abc-123' }
[debug] Computed hash: a1b2c3d4... { correlationId: 'abc-123', diagramHash: 'a1b2c3d4...' }
[info] Rendering Mermaid diagram { correlationId: 'abc-123', diagramHash: 'a1b2c3d4...' }
[info] Uploading Mermaid image to Document360 { correlationId: 'abc-123', diagramHash: 'a1b2c3d4...' }
[info] Mermaid processing complete: 1 rendered, 0 reused, 1 uploaded, 1 replaced, 0 skipped { correlationId: 'abc-123' }
```

### Successful Reuse
```
[info] Starting Mermaid diagram processing { correlationId: 'def-456', sourceFile: 'docs/test/index.md' }
[debug] Extracted 1 Mermaid block(s) { correlationId: 'def-456' }
[debug] Computed hash: a1b2c3d4... { correlationId: 'def-456', diagramHash: 'a1b2c3d4...' }
[debug] Found existing mapping, reusing { correlationId: 'def-456', diagramHash: 'a1b2c3d4...' }
[info] Mermaid processing complete: 0 rendered, 1 reused, 0 uploaded, 1 replaced, 0 skipped { correlationId: 'def-456' }
```

---

## Success Checklist

After completing all three phases, verify:

- [ ] **Phase 1**: Initial diagram renders and appears in Document360
- [ ] **Phase 2**: Modified diagram triggers new render and updates article
- [ ] **Phase 3**: Reverted diagram reuses existing image (no new render/upload)
- [ ] **Database**: Contains correct mappings with proper hashes
- [ ] **Logs**: Show correlation IDs and proper operation counts
- [ ] **Document360**: Articles display images correctly (not code blocks)
- [ ] **Performance**: Reuse is faster than rendering (check sync times)

---

## Next Steps After Testing

If all tests pass:
1. ✅ Mermaid pipeline is working correctly
2. Consider testing with multiple articles containing the same diagram (verify reuse across articles)
3. Consider testing with multiple diagrams in one article
4. Consider testing edge cases (invalid Mermaid syntax, empty blocks, etc.)

If tests fail:
1. Review error logs with correlation IDs
2. Check database state for inconsistencies
3. Verify Document360 API permissions
4. Review the implementation in `aifabrix-d360` for potential issues

---

## Files to Reference

In `aifabrix-d360` project:
- `src/mermaid/publishWithMermaid.ts` - Main orchestrator
- `src/mermaid/extractMermaidBlocks.ts` - Extraction logic
- `src/mermaid/normalizeMermaid.ts` - Normalization rules
- `src/mermaid/renderMermaid.ts` - Rendering logic
- `src/database/image-mapping.ts` - Database operations
- `src/sync/yaml-sync-engine.ts` - Integration point

In `aifabrix-docs` project:
- The test article's YAML and Markdown files (provided by tester)
- `.env` configuration file
- `./data/sync.db` - SQLite database
- Sync logs (if configured)
