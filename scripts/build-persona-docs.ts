#!/usr/bin/env ts-node
/**
 * Inject thin "technical anchor" blocks into persona markdown under docs/
 * from anchor-docs across product repos. Uses hash cache for incremental skips.
 */

import * as fs from 'fs';
import * as path from 'path';
import {
    extractPathMarkers,
    extractSummaryParagraph,
    hashAnchorContent,
    splitFrontmatter,
} from './lib/anchor-parse';
import { anchorRepoKeys, getDocsRepoRoot, resolveRepoRoot } from './lib/workspace-root';

interface HashCache {
    [key: string]: string;
}

function cachePath(docsRoot: string): string {
    return path.join(docsRoot, '.cache', 'anchor-hashes.json');
}

function loadCache(docsRoot: string): HashCache {
    const p = cachePath(docsRoot);
    if (!fs.existsSync(p)) {
        return {};
    }
    try {
        return JSON.parse(fs.readFileSync(p, 'utf8')) as HashCache;
    } catch {
        return {};
    }
}

function saveCache(docsRoot: string, c: HashCache): void {
    const dir = path.dirname(cachePath(docsRoot));
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(cachePath(docsRoot), JSON.stringify(c, null, 2), 'utf8');
}

function walkMarkdownFiles(dir: string, out: string[]): void {
    if (!fs.existsSync(dir)) {
        return;
    }
    for (const name of fs.readdirSync(dir)) {
        if (name === 'README.md') {
            continue;
        }
        const p = path.join(dir, name);
        const st = fs.statSync(p);
        if (st.isDirectory()) {
            walkMarkdownFiles(p, out);
        } else if (name.endsWith('.md')) {
            out.push(p);
        }
    }
}

function blockForAnchor(params: {
    navigationId: string;
    repoKey: string;
    relPath: string;
    summary: string;
    paths: string[];
}): string {
    const pathLines =
        params.paths.length > 0
            ? params.paths.map((p) => `- \`[path:${p}]\``).join('\n')
            : '- _(no path markers)_';
    return [
        `<!-- anchor-generated:start navigation_id="${params.navigationId}" -->`,
        '',
        '### Technical anchor (auto-generated)',
        '',
        `_Source:_ \`${params.repoKey}/${params.relPath}\` in the product repository.`,
        '',
        params.summary ? `**Summary:** ${params.summary}` : '**Summary:** _(empty)_',
        '',
        '**Code / spec paths:**',
        pathLines,
        '',
        '<!-- anchor-generated:end navigation_id="' + params.navigationId + '" -->',
        '',
    ].join('\n');
}

function replaceOrAppendBlock(md: string, navigationId: string, newBlock: string): string {
    const start = `<!-- anchor-generated:start navigation_id="${navigationId}" -->`;
    const end = `<!-- anchor-generated:end navigation_id="${navigationId}" -->`;
    const startIdx = md.indexOf(start);
    if (startIdx !== -1) {
        const endIdx = md.indexOf(end, startIdx);
        if (endIdx === -1) {
            return md + '\n\n' + newBlock;
        }
        const after = endIdx + end.length;
        return md.slice(0, startIdx) + newBlock.trimEnd() + md.slice(after);
    }
    const sep = md.endsWith('\n\n') ? '' : '\n\n';
    return md.trimEnd() + sep + newBlock;
}

async function main(): Promise<void> {
    const docsRoot = getDocsRepoRoot();
    const cache = loadCache(docsRoot);
    const nextCache: HashCache = { ...cache };
    let updated = 0;
    let skipped = 0;

    for (const key of anchorRepoKeys()) {
        const root = resolveRepoRoot(key);
        const anchorDir = path.join(root, 'anchor-docs');
        const files: string[] = [];
        walkMarkdownFiles(anchorDir, files);
        for (const abs of files) {
            const rel = path.relative(root, abs).replace(/\\/g, '/');
            const cacheKey = `${key}:${rel}`;
            const raw = fs.readFileSync(abs, 'utf8');
            const h = hashAnchorContent(raw);
            const parsed = splitFrontmatter(raw);
            if ('error' in parsed) {
                console.warn(`⚠️  Skip ${cacheKey}: ${parsed.error}`);
                continue;
            }
            const navId = parsed.frontmatter.navigation_id?.trim();
            if (!navId) {
                console.warn(`⚠️  Skip ${cacheKey}: no navigation_id`);
                continue;
            }
            if (cache[cacheKey] === h) {
                skipped += 1;
                nextCache[cacheKey] = h;
                continue;
            }
            const personaMd = path.join(docsRoot, 'docs', ...navId.split('/')) + '.md';
            if (!fs.existsSync(personaMd)) {
                console.warn(`⚠️  No persona page for navigation_id "${navId}" (${personaMd})`);
                nextCache[cacheKey] = h;
                continue;
            }
            const summary = extractSummaryParagraph(parsed.body);
            const paths = extractPathMarkers(parsed.body);
            const block = blockForAnchor({
                navigationId: navId,
                repoKey: key,
                relPath: rel,
                summary,
                paths,
            });
            const prev = fs.readFileSync(personaMd, 'utf8');
            const merged = replaceOrAppendBlock(prev, navId, block);
            if (merged !== prev) {
                fs.writeFileSync(personaMd, merged, 'utf8');
                console.log(`✅ Updated persona: ${path.relative(docsRoot, personaMd)}`);
                updated += 1;
            }
            nextCache[cacheKey] = h;
        }
    }

    saveCache(docsRoot, nextCache);
    console.log(`\nbuild-persona-docs: updated=${updated} skipped_unchanged=${skipped}`);
}

if (require.main === module) {
    main().catch((e) => {
        console.error(e);
        process.exit(1);
    });
}
