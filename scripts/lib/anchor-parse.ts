/**
 * Parse anchor-doc frontmatter and body conventions (Summary, [path:...]).
 */

import * as crypto from 'crypto';
import * as yaml from 'js-yaml';

export interface AnchorFrontmatter {
    title?: string;
    navigation_id?: string;
    owner?: string;
    last_verified_commit?: string;
}

function pickFrontmatter(raw: Record<string, unknown>): AnchorFrontmatter {
    const s = (v: unknown): string | undefined =>
        typeof v === 'string' && v.trim() !== '' ? v.trim() : undefined;
    const out: AnchorFrontmatter = {};
    const title = s(raw.title);
    const navigationId = s(raw.navigation_id);
    const owner = s(raw.owner);
    const commit = s(raw.last_verified_commit);
    if (title !== undefined) {
        out.title = title;
    }
    if (navigationId !== undefined) {
        out.navigation_id = navigationId;
    }
    if (owner !== undefined) {
        out.owner = owner;
    }
    if (commit !== undefined) {
        out.last_verified_commit = commit;
    }
    return out;
}

export function splitFrontmatter(
    raw: string,
): { frontmatter: AnchorFrontmatter; body: string } | { error: string } {
    if (!raw.startsWith('---')) {
        return { error: 'Missing opening --- frontmatter' };
    }
    const end = raw.indexOf('\n---', 3);
    if (end === -1) {
        return { error: 'Missing closing --- for frontmatter' };
    }
    const fmBlock = raw.slice(3, end).trim();
    const body = raw.slice(end + 4).trimStart();
    try {
        const loaded = yaml.load(fmBlock) as Record<string, unknown> | null;
        if (!loaded || typeof loaded !== 'object') {
            return { error: 'Frontmatter must be a YAML mapping' };
        }
        return { frontmatter: pickFrontmatter(loaded), body };
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return { error: `Invalid YAML frontmatter: ${msg}` };
    }
}

export function extractPathMarkers(body: string): string[] {
    const re = /\[path:([^\]\r\n]+)\]/g;
    const out: string[] = [];
    let m: RegExpExecArray | null;
    while ((m = re.exec(body)) !== null) {
        out.push(m[1].trim());
    }
    return out;
}

export function extractSummaryParagraph(body: string): string {
    const idx = body.search(/^##\s+Summary\s*$/m);
    if (idx === -1) {
        return '';
    }
    const after = body.slice(idx);
    const lines = after.split('\n');
    const buf: string[] = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (/^##\s+/.test(line)) {
            break;
        }
        if (line.trim() !== '') {
            buf.push(line.trim());
        }
    }
    return buf.join(' ').trim();
}

export function hashAnchorContent(fullFile: string): string {
    return crypto.createHash('sha256').update(fullFile, 'utf8').digest('hex');
}
