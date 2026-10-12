// Writes src/controls/icons/lucide-svg.ts from the lucide-static ESM barrel.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Writes suffixed Lucide re-exports so ng-luna does not publish plain icon names.
 */
export function writeLucideSvgBarrel()
{
    // Read the pinned lucide-static entry that lists every runtime export.
    const sourcePath = join(repoRoot, 'node_modules/lucide-static/dist/esm/lucide-static.js');
    const source = readFileSync(sourcePath, 'utf8');
    const names = [];
    const seen = new Set();

    for (const match of source.matchAll(/default as ([A-Za-z_][A-Za-z0-9_]*)/g))
    {
        const name = match[1];

        if (seen.has(name))
        {
            throw new Error(`Duplicate Lucide export: ${name}`);
        }

        seen.add(name);
        names.push(name);
    }

    if (names.length === 0)
    {
        throw new Error('No Lucide icon exports found in lucide-static');
    }

    // One documented re-export per Lucide name, with an Svg suffix.
    const header = [
        '/**',
        ' * Re-exports Lucide static icon SVG strings with an `Svg` suffix.',
        ' */',
    ].join('\n');

    const blocks = names.map((name) =>
    {
        return [
            `/** Exports the Lucide ${name} icon as an SVG string. */`,
            `export { ${name} as ${name}Svg } from 'lucide-static';`,
        ].join('\n');
    });

    const outPath = join(repoRoot, 'src/controls/icons/lucide-svg.ts');
    writeFileSync(outPath, `${header}\n\n${blocks.join('\n\n')}\n`);
}

const isDirectRun = process.argv[1] !== undefined
    && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun)
{
    writeLucideSvgBarrel();
}
