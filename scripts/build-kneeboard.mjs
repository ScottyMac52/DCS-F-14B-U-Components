import { mkdirSync, rmSync, writeFileSync, copyFileSync, readFileSync } from 'node:fs';
import { dirname, join, resolve, basename } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..');
const commonRoot = resolve(process.env.DCS_COMMON_ROOT ?? join(root, '.dcs-common'));

const { renderSharedHardwarePage } = await import(pathToFileURL(join(commonRoot, 'scripts/shared-hardware-consumer.mjs')));
const { loadProfileDrivenConfig } = await import(pathToFileURL(join(commonRoot, 'scripts/profile-driven-kneeboard.mjs')));
const { renderKneeboard } = await import(pathToFileURL(join(commonRoot, 'scripts/kneeboard-renderer.mjs')));

// 1. Load both the raw JSON (for summary pages) and the loaded config (for mapped hardware pages)
const rawConfig = JSON.parse(readFileSync(join(root, 'config/kneeboard.json'), 'utf8'));
const config = loadProfileDrivenConfig('config/kneeboard.json', { consumerRoot: root, commonRoot });

const aircraftFolder = config.aircraft.replace(/[^a-zA-Z0-9-]/g, '');
const svgDir = join(root, 'kneeboard', 'source');
const pngDir = join(root, 'kneeboard', aircraftFolder);

rmSync(svgDir, { recursive: true, force: true });
rmSync(pngDir, { recursive: true, force: true });
mkdirSync(svgDir, { recursive: true });
mkdirSync(pngDir, { recursive: true });

// 2. Stitch the pages together and sort them by filename so they process in order (01, 02, etc.)
const allPages = [
  ...(rawConfig.summaryPages || []),
  ...config.pages
].sort((a, b) => a.file.localeCompare(b.file));

const totalPages = allPages.length;

// 3. Process the sequence
for (const [index, page] of allPages.entries()) {
  if (page.type === 'summary') {
    // Pass summary pages to the generic renderer
    const result = await renderKneeboard({
      config: { pages: [page], profiles: [] },
      outputDir: pngDir,
      rootDir: root,
    });
    
    // Copy the generated SVG back into the source directory to maintain test consistency
    for (const svgFile of result.svgFiles) {
      copyFileSync(svgFile, join(svgDir, basename(svgFile)));
    }
  } else if (page.deviceId) {
    // Pass hardware pages to the DCS-Common hardware composition function
    const hardwareRender = renderSharedHardwarePage({
      ...page,
      commonRoot,
      provenance: { consumer: `DCS-${aircraftFolder}-Components`, page: `${index + 1} / ${totalPages}` },
    });
    
    writeFileSync(join(svgDir, `${page.file}.svg`), hardwareRender.svg, 'utf8');
    await sharp(Buffer.from(hardwareRender.svg)).png().toFile(join(pngDir, `${page.file}.png`));
  }
}

console.log(`Successfully generated ${totalPages} pages using DCS-Common as the engine.`);