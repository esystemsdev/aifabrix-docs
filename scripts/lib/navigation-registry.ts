/**
 * Build canonical navigation_id set from docs section navigation.yaml files (section/url).
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export interface NavYamlItem {
    title: string;
    url: string;
    order?: number;
    navigation_id?: string;
}

export interface NavYamlFile {
    title: string;
    description?: string;
    items: NavYamlItem[];
}

export interface AnchorCoverageConfig {
    /** When true, exit non-zero if a required id has zero anchors */
    failOnMissingRequired?: boolean;
    /** Explicit ids that must have ≥1 anchor */
    requiredAnchorIds?: string[];
}

export function navigationIdForItem(sectionFolder: string, item: NavYamlItem): string {
    if (item.navigation_id && item.navigation_id.trim() !== '') {
        return item.navigation_id.trim();
    }
    return `${sectionFolder}/${item.url}`;
}

export function loadNavigationRegistry(docsDir: string): Set<string> {
    const ids = new Set<string>();
    if (!fs.existsSync(docsDir)) {
        return ids;
    }
    const entries = fs.readdirSync(docsDir, { withFileTypes: true });
    for (const ent of entries) {
        if (!ent.isDirectory()) {
            continue;
        }
        const navPath = path.join(docsDir, ent.name, 'navigation.yaml');
        if (!fs.existsSync(navPath)) {
            continue;
        }
        const doc = yaml.load(fs.readFileSync(navPath, 'utf8')) as NavYamlFile | null;
        if (!doc?.items) {
            continue;
        }
        for (const item of doc.items) {
            if (item.url) {
                ids.add(navigationIdForItem(ent.name, item));
            }
        }
    }
    return ids;
}

export function loadAnchorCoverageConfig(docsRepoRoot: string): AnchorCoverageConfig {
    const p = path.join(docsRepoRoot, 'scripts', 'config', 'anchor-coverage.yml');
    if (!fs.existsSync(p)) {
        return { failOnMissingRequired: false, requiredAnchorIds: [] };
    }
    const raw = fs.readFileSync(p, 'utf8');
    const o = yaml.load(raw) as AnchorCoverageConfig | null;
    return {
        failOnMissingRequired: Boolean(o?.failOnMissingRequired),
        requiredAnchorIds: Array.isArray(o?.requiredAnchorIds) ? o!.requiredAnchorIds! : [],
    };
}
