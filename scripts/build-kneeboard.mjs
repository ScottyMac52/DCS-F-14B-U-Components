import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..');
const commonRoot = resolve(process.env.DCS_COMMON_ROOT ?? join(root, '.dcs-common'));

const { renderSharedHardwarePage } = await import(pathToFileURL(join(commonRoot, 'scripts/shared-hardware-consumer.mjs')));
const { loadProfileDrivenConfig } = await import(pathToFileURL(join(commonRoot, 'scripts/profile-driven-kneeboard.mjs')));
const { renderKneeboard } = await import(pathToFileURL(join(commonRoot, 'scripts/kneeboard-renderer.mjs')));

const svgDir = join(root, 'kneeboard', 'source');
const pngDir = join(root, 'kneeboard', 'F-14BU');

// 1. Clean output directories to prevent stale artifacts failing tests
rmSync(svgDir, { recursive: true, force: true });
rmSync(pngDir, { recursive: true, force: true });
mkdirSync(svgDir, { recursive: true });
mkdirSync(pngDir, { recursive: true });

// 2. Load the configuration
const config = loadProfileDrivenConfig('config/kneeboard.json', { consumerRoot: root, commonRoot });
const totalPages = config.pages.length;

// 3. Render Pages
for (const [index, page] of config.pages.entries()) {
  let svg;
  
  if (page.type === 'summary' || !page.deviceId) {
    // Utilize the DCS-Common renderer for non-hardware summary pages
    const result = await renderKneeboard({ 
        config: { pages: [page] }, 
        outputDir: pngDir, 
        rootDir: root 
    });
    // The renderer writes it, we just need to copy the SVG to the source dir if needed, 
    // or rely on the shared hardware pipeline below for consistency.
    continue; 
  } else {
    // Utilize the DCS-Common shared hardware composition
    const hardwareRender = renderSharedHardwarePage({
      ...page,
      commonRoot,
      provenance: { consumer: 'DCS-F-14B-U-Components', page: `${index + 1} / ${totalPages}` },
    });
    svg = hardwareRender.svg;
  }

  writeFileSync(join(svgDir, `${page.file}.svg`), svg);
  await sharp(Buffer.from(svg)).png().toFile(join(pngDir, `${page.file}.png`));
}

console.log(`Generated kneeboard sequence using DCS-Common.`);