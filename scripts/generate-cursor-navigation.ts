#!/usr/bin/env ts-node
/**
 * Generate .cursor/Navigation.md from docs section navigation.yaml files (do not edit by hand).
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { getDocsRepoRoot } from './lib/workspace-root';

interface NavItem {
    title: string;
    url: string;
    order?: number;
}

interface NavFile {
    title: string;
    description?: string;
    items: NavItem[];
}

function readNavSection(navPath: string): NavFile | null {
    try {
        return yaml.load(fs.readFileSync(navPath, 'utf8')) as NavFile;
    } catch {
        return null;
    }
}

function generateMarkdown(docsDir: string): string {
    const lines: string[] = [
        '# AI Fabrix Documentation – Navigation (generated)',
        '',
        '> **Do not edit by hand.** Regenerate with `npm run generate-cursor-nav` in the aifabrix-docs repository.',
        '',
        '---',
        '',
    ];

    const folders = fs
        .readdirSync(docsDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .sort();

    for (const folder of folders) {
        const navPath = path.join(docsDir, folder, 'navigation.yaml');
        if (!fs.existsSync(navPath)) {
            continue;
        }
        const nav = readNavSection(navPath);
        if (!nav?.items?.length) {
            continue;
        }
        const heading = nav.title || folder;
        lines.push(`# ${heading}`, '');
        const sorted = [...nav.items].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
        for (const item of sorted) {
            lines.push(`### ${item.title}`, '');
            lines.push(`* navigation_id: \`${folder}/${item.url}\``, '');
        }
        lines.push('---', '');
    }

    return lines.join('\n').trimEnd() + '\n';
}

async function main(): Promise<void> {
    const docsRoot = getDocsRepoRoot();
    const docsDir = path.join(docsRoot, 'docs');
    const outPath = path.join(docsRoot, '.cursor', 'Navigation.md');
    const md = generateMarkdown(docsDir);
    fs.writeFileSync(outPath, md, 'utf8');
    console.log(`✅ Wrote ${path.relative(docsRoot, outPath)}`);
}

if (require.main === module) {
    main().catch((e) => {
        console.error(e);
        process.exit(1);
    });
}
