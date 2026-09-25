// Copies the font files named in src/theme/_fonts.scss into .cache/fonts/.

import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

const familyByPrefix = [
    { prefix: 'IBMPlexMono-', family: 'IBM-Plex-Mono' },
    { prefix: 'IBMPlexSans-', family: 'IBM-Plex-Sans' },
    { prefix: 'IBMPlexSerif-', family: 'IBM-Plex-Serif' },
];

/**
 * Copies font files named in src/theme/_fonts.scss into .cache/fonts/.
 */
export function stageFonts()
{
    // Read the stylesheet allowlist.
    const scssPath = join(repoRoot, 'src/theme/_fonts.scss');
    const scss = readFileSync(scssPath, 'utf8');
    const names = [...scss.matchAll(/url\('#\{\$font-assets-path\}\/([^']+)'\)/g)].map((match) => match[1]);

    if (names.length === 0)
    {
        throw new Error('No font urls found in src/theme/_fonts.scss');
    }

    // Replace the staging directory so unreferenced files do not linger.
    const outDir = join(repoRoot, '.cache/fonts');
    rmSync(outDir, { recursive: true, force: true });
    mkdirSync(outDir, { recursive: true });

    // Copy each referenced file flat under .cache/fonts/.
    const uniqueNames = [...new Set(names)];

    for (const fileName of uniqueNames)
    {
        const source = resolveSource(fileName);

        if (!existsSync(source))
        {
            throw new Error(`Referenced font is missing: ${fileName}`);
        }

        copyFileSync(source, join(outDir, fileName));
    }
}

/**
 * Resolves a stylesheet file name to its file in @ibm/plex.
 *
 * @param fileName - Font file name from an @font-face url, such as IBMPlexSans-Regular.woff2
 * @returns Absolute path under node_modules/@ibm/plex
 */
function resolveSource(fileName)
{
    // Flat output rejects paths that would recreate the @ibm/plex tree.
    if (fileName.includes('/') || fileName.includes('\\'))
    {
        throw new Error(`Font url must be a file name: ${fileName}`);
    }

    // Map the file prefix to the IBM Plex family directory.
    const family = familyByPrefix.find((entry) => fileName.startsWith(entry.prefix));

    if (!family)
    {
        throw new Error(`Unknown font prefix: ${fileName}`);
    }

    // woff2 and woff live in sibling folders.
    let formatDir;

    if (fileName.endsWith('.woff2'))
    {
        formatDir = 'woff2';
    }
    else if (fileName.endsWith('.woff'))
    {
        formatDir = 'woff';
    }
    else
    {
        throw new Error(`Unknown font extension: ${fileName}`);
    }

    return join(
        repoRoot,
        'node_modules/@ibm/plex',
        family.family,
        'fonts/complete',
        formatDir,
        fileName,
    );
}

const isDirectRun = process.argv[1] !== undefined
    && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun)
{
    stageFonts();
}
