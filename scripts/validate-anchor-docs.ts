#!/usr/bin/env ts-node
/**
 * Strict validation for product-repo anchor-docs/*.md
 * Usage: ts-node scripts/validate-anchor-docs.ts [--coverage] [--no-strict-warnings]
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import {
    extractPathMarkers,
    splitFrontmatter,
} from './lib/anchor-parse';
import { loadAnchorCoverageConfig, loadNavigationRegistry } from './lib/navigation-registry';
import { anchorRepoKeys, getDocsRepoRoot, resolvePathMarker, resolveRepoRoot } from './lib/workspace-root';

interface AllowedOwnersFile {
    allowed_owners?: string[];
}

function loadAllowedOwners(docsRoot: string): Set<string> | null {
    const p = path.join(docsRoot, 'scripts', 'config', 'allowed-anchor-owners.yml');
    if (!fs.existsSync(p)) {
        return null;
    }
    const o = yaml.load(fs.readFileSync(p, 'utf8')) as AllowedOwnersFile | null;
    const list = o?.allowed_owners;
    if (!Array.isArray(list) || list.length === 0) {
        return null;
    }
    return new Set(list.map((x) => String(x)));
}

function walkMarkdownFiles(dir: string, out: string[]): void {
    if (!fs.existsSync(dir)) {
        return;
    }
    for (const name of fs.readdirSync(dir)) {
        // Plan: every anchor-docs/**/*.md must follow the template except exempt README.md.
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

function collectAnchorFiles(): { repo: string; abs: string; rel: string }[] {
    const list: { repo: string; abs: string; rel: string }[] = [];
    for (const key of anchorRepoKeys()) {
        const root = resolveRepoRoot(key);
        const anchorDir = path.join(root, 'anchor-docs');
        const files: string[] = [];
        walkMarkdownFiles(anchorDir, files);
        for (const abs of files) {
            list.push({
                repo: key,
                abs,
                rel: path.relative(root, abs).replace(/\\/g, '/'),
            });
        }
    }
    return list;
}

async function main(): Promise<void> {
    const args = new Set(process.argv.slice(2));
    const withCoverage = args.has('--coverage');
    const docsRoot = getDocsRepoRoot();
    const docsDir = path.join(docsRoot, 'docs');
    const registry = loadNavigationRegistry(docsDir);
    const allowedOwners = loadAllowedOwners(docsRoot);
    const coverageCfg = loadAnchorCoverageConfig(docsRoot);

    let errors = 0;
    let warnings = 0;
    const idToAnchors = new Map<string, string[]>();
    const anchors = collectAnchorFiles();

    for (const { repo, abs, rel } of anchors) {
        const label = `${repo}:${rel}`;
        const raw = fs.readFileSync(abs, 'utf8');
        const parsed = splitFrontmatter(raw);
        if ('error' in parsed) {
            console.error(`❌ ${label}: ${parsed.error}`);
            errors += 1;
            continue;
        }
        const { frontmatter, body } = parsed;
        if (!frontmatter.navigation_id) {
            console.error(`❌ ${label}: missing navigation_id in frontmatter`);
            errors += 1;
        } else if (!registry.has(frontmatter.navigation_id)) {
            console.error(
                `❌ ${label}: navigation_id "${frontmatter.navigation_id}" not in docs registry`,
            );
            errors += 1;
        } else {
            const arr = idToAnchors.get(frontmatter.navigation_id) ?? [];
            arr.push(label);
            idToAnchors.set(frontmatter.navigation_id, arr);
        }
        if (!frontmatter.owner || frontmatter.owner.trim() === '') {
            console.error(`❌ ${label}: missing owner in frontmatter`);
            errors += 1;
        } else if (allowedOwners && !allowedOwners.has(frontmatter.owner)) {
            console.error(
                `❌ ${label}: owner "${frontmatter.owner}" not in scripts/config/allowed-anchor-owners.yml`,
            );
            errors += 1;
        }
        if (!frontmatter.last_verified_commit || frontmatter.last_verified_commit.trim() === '') {
            console.warn(`⚠️  ${label}: last_verified_commit missing (recommended)`);
            warnings += 1;
        }
        if (!/^##\s+Summary\s*$/m.test(body)) {
            console.error(`❌ ${label}: missing ## Summary section`);
            errors += 1;
        } else {
            const after = body.split(/^##\s+Summary\s*$/m)[1] ?? '';
            const nextHeader = after.search(/^##\s+/m);
            const summaryBody = nextHeader === -1 ? after : after.slice(0, nextHeader);
            if (summaryBody.replace(/\s/g, '') === '') {
                console.error(`❌ ${label}: ## Summary is empty`);
                errors += 1;
            }
        }
        for (const required of ['## Details', '## Examples', '## Paths'] as const) {
            if (!body.includes(required)) {
                console.error(`❌ ${label}: missing ${required} section heading`);
                errors += 1;
            }
        }
        const paths = extractPathMarkers(body);
        if (paths.length === 0) {
            console.error(`❌ ${label}: no [path:...] markers in body`);
            errors += 1;
        }
        for (const relPath of paths) {
            try {
                const full = resolvePathMarker(relPath);
                if (!fs.existsSync(full)) {
                    console.error(`❌ ${label}: [path:${relPath}] does not exist (${full})`);
                    errors += 1;
                }
            } catch (e) {
                const msg = e instanceof Error ? e.message : String(e);
                console.error(`❌ ${label}: [path:${relPath}] resolve error: ${msg}`);
                errors += 1;
            }
        }
    }

    for (const [nid, labels] of idToAnchors) {
        if (labels.length > 1) {
            console.warn(
                `⚠️  navigation_id "${nid}" used by multiple anchors: ${labels.join(', ')}`,
            );
            warnings += 1;
        }
    }

    if (withCoverage) {
        console.log('\n📊 Anchor coverage (registry id → anchor count)\n');
        let missingRequired = 0;
        for (const id of [...registry].sort()) {
            const n = idToAnchors.get(id)?.length ?? 0;
            const mark = n === 0 ? ' (no anchor)' : '';
            console.log(`  ${id}: ${n}${mark}`);
            const requiredList = coverageCfg.requiredAnchorIds ?? [];
            if (requiredList.includes(id) && n === 0) {
                missingRequired += 1;
            }
        }
        if (coverageCfg.failOnMissingRequired && missingRequired > 0) {
            console.error(
                `❌ ${missingRequired} required navigation_id(s) from config have no anchor (see anchor-coverage.yml)`,
            );
            errors += missingRequired;
        } else if (missingRequired > 0) {
            console.warn(
                `⚠️  ${missingRequired} required id(s) have no anchor but failOnMissingRequired is false`,
            );
        }
    }

    console.log(
        `\nValidated ${anchors.length} anchor file(s); registry size ${registry.size}; errors=${errors} warnings=${warnings}`,
    );
    if (errors > 0) {
        process.exit(1);
    }
}

if (require.main === module) {
    main().catch((e) => {
        console.error(e);
        process.exit(1);
    });
}
