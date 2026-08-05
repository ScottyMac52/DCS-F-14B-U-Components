import { mkdirSync, rmSync, writeFileSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve, basename } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..');
const commonRoot = resolve(process.env.DCS_COMMON_ROOT ?? join(root, '.dcs-common'));

const { renderSharedHardwarePage } = await import(pathToFileURL(join(commonRoot, 'scripts/shared-hardware-consumer.mjs')));
const { loadProfileDrivenConfig } = await import(pathToFileURL(join(commonRoot, 'scripts/profile-driven-kneeboard.mjs')));
const { renderKneeboard } = await import(pathToFileURL(join(commonRoot, 'scripts/kneeboard-renderer.mjs')));

// 1. Load the single source of truth: kneeboard.json
const config = loadProfileDrivenConfig('config/kneeboard.json', { consumerRoot: root, commonRoot });

// 2. Set up directories dynamically based on the config
const aircraftFolder = config.aircraft.replace(/[^a-zA-Z0-9-]/g, ''); // e.g., 'F-14B(U)' -> 'F-14BU'
const svgDir = join(root, 'kneeboard', 'source');
const pngDir = join(root, 'kneeboard', aircraftFolder);

rmSync(svgDir, { recursive: true, force: true });
rmSync(pngDir, { recursive: true, force: true });
mkdirSync(svgDir, { recursive: true });
mkdirSync(pngDir, { recursive: true });

const totalPages = config.pages.length;

// 3. Process the sequence
for (const [index, page] of config.pages.entries()) {
  if (page.type === 'summary') {
    // Let DCS-Common's renderer handle the text-only summary pages
    const result = await renderKneeboard({
      config: { pages: [page], profiles: [] },
      outputDir: pngDir,
      rootDir: root,
    });
    // Mirror the SVG output to the source directory for validation
    for (const svgFile of result.svgFiles) {
      copyFileSync(svgFile, join(svgDir, basename(svgFile)));
    }
  } else if (page.deviceId) {
    // Let DCS-Common's hardware manifest provide the baked SVGs for devices
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