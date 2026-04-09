/**
 * Resolve multi-repo workspace paths for anchor-doc tooling.
 * Loads config/workspace-root.yml; override root with AIFABRIX_WORK.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export interface WorkspaceRootFile {
    aifabrixWork: string;
    repos: Record<string, string>;
}

const REPO_KEYS = ['dataplane', 'miso', 'builder'] as const;
export type AnchorRepoKey = (typeof REPO_KEYS)[number];

export function getDocsRepoRoot(): string {
    return path.resolve(__dirname, '..', '..');
}

function defaultWorkspaceRoot(): string {
    const env = process.env.AIFABRIX_WORK;
    if (env && env.trim() !== '') {
        return path.resolve(env.trim());
    }
    return path.resolve(getDocsRepoRoot(), '..');
}

export function loadWorkspaceRootConfig(): WorkspaceRootFile {
    const configPath = path.join(getDocsRepoRoot(), 'scripts', 'config', 'workspace-root.yml');
    const base: WorkspaceRootFile = {
        aifabrixWork: defaultWorkspaceRoot(),
        repos: {
            dataplane: 'aifabrix-dataplane',
            miso: 'aifabrix-miso',
            builder: 'aifabrix-builder',
        },
    };
    if (!fs.existsSync(configPath)) {
        return base;
    }
    const raw = fs.readFileSync(configPath, 'utf8');
    const loaded = yaml.load(raw) as Partial<WorkspaceRootFile> | null;
    if (!loaded || typeof loaded !== 'object') {
        return base;
    }
    const work =
        process.env.AIFABRIX_WORK && process.env.AIFABRIX_WORK.trim() !== ''
            ? path.resolve(process.env.AIFABRIX_WORK.trim())
            : loaded.aifabrixWork
              ? path.resolve(loaded.aifabrixWork)
              : base.aifabrixWork;
    return {
        aifabrixWork: work,
        repos: { ...base.repos, ...(loaded.repos ?? {}) },
    };
}

export function getWorkspaceRoot(): string {
    return loadWorkspaceRootConfig().aifabrixWork;
}

/** Full path to a product repo root (e.g. dataplane → …/aifabrix-dataplane). */
export function resolveRepoRoot(repo: AnchorRepoKey): string {
    const cfg = loadWorkspaceRootConfig();
    const folder = cfg.repos[repo];
    if (!folder) {
        throw new Error(`Unknown repo key: ${repo}`);
    }
    return path.join(cfg.aifabrixWork, folder);
}

/**
 * Resolve [path:repoRelative] where repoRelative is like aifabrix-dataplane/openapi/openapi.yaml
 */
export function resolvePathMarker(markerBody: string): string {
    const trimmed = markerBody.trim();
    const parts = trimmed.split('/');
    if (parts.length < 2 || !parts[0]) {
        throw new Error(`Invalid path marker body: ${markerBody}`);
    }
    const root = getWorkspaceRoot();
    return path.join(root, ...parts);
}

export function anchorRepoKeys(): readonly AnchorRepoKey[] {
    return REPO_KEYS;
}
