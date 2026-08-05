import { rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..');
const commonRoot = resolve(process.env.DCS_COMMON_ROOT ?? join(root, '.dcs-common'));

const { loadProfileDrivenConfig } = await import(pathToFileURL(join(commonRoot, 'scripts/profile-driven-kneeboard.mjs')));
const { renderKneeboard } = await import(pathToFileURL(join(commonRoot, 'scripts/kneeboard-renderer.mjs')));

const pngDir = join(root, 'kneeboard', 'F-14BU');
const svgDir = join(root, 'kneeboard', 'source');

// Clean output directories to ensure a deterministic, fresh build
rmSync(svgDir, { recursive: true, force: true });
rmSync(pngDir, { recursive: true, force: true });

// Load configuration via DCS-Common profile parser
const config = loadProfileDrivenConfig('config/kneeboard.json', { consumerRoot: root, commonRoot });

// Execute the unified DCS-Common kneeboard renderer
const result = await renderKneeboard({
  config,
  outputDir: pngDir,
  rootDir: root,
});

// Ensure source SVGs are mirrored in kneeboard/source as required by test contracts
import { copyFileSync, mkdirSync } from 'node:fs';
mkdirSync(svgDir, { recursive: true });
for (const svgFile of result.svgFiles) {
  copyFileSync(svgFile, join(svgDir, basename(svgFile)));
}

console.log(`Successfully generated ${result.svgFiles.length} SVG pages and ${result.pngFiles.length} PNG pages using DCS-Common.`);