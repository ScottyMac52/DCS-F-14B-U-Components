import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..');
const pngDir = join(root, 'kneeboard', 'F-14BU');
const svgDir = join(root, 'kneeboard', 'source');
const profileDir = join(root, 'src', 'Config', 'Input', 'F-14BU', 'joystick');

const pages = [
  '01-VAICOM-OVERVIEW',
  '02-VKB-F14-GRIP',
  '03-WARTHOG-THROTTLE',
  '04-PDCP',
  '05-PTO2',
  '06-MFD1-JESTER',
  '07-MFD2-CARRIER',
  '08-MFD3-LANTIRN',
  '09-TM-TPR',
  '10-AXES-RESERVED-OPENKNEEBOARD',
];

const expectedAssets = [
  'cougar-mfd-clean.png',
  'cougar-mfd-template.png',
  'pdcp-photo',
  'pto2-clean.png',
  'pto2-template.svg',
  'vkb-f14-grip-photo.jpeg',
  'vkb-f14-grip-photo-clean.png',
  'warthog-throttle-base.png',
  'warthog-throttle-handles.png',
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function hashFile(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function generatedHashes() {
  return Object.fromEntries(pages.flatMap((page) => [
    [`${page}.svg`, hashFile(join(svgDir, `${page}.svg`))],
    [`${page}.png`, hashFile(join(pngDir, `${page}.png`))],
  ]));
}

function profile(nameFragment) {
  const matches = readdirSync(profileDir).filter((name) => name.includes(nameFragment));
  assert(matches.length === 1, `Expected one profile matching ${nameFragment}; found ${matches.length}.`);
  return readFileSync(join(profileDir, matches[0]), 'utf8');
}

function assertProfileButtons(nameFragment, page, buttons) {
  const lua = profile(nameFragment);
  for (const button of buttons) {
    assert(lua.includes(`JOY_BTN${button}`), `${nameFragment} is missing JOY_BTN${button}.`);
  }
}

const pngNames = readdirSync(pngDir).filter((name) => name.endsWith('.png')).sort();
const svgNames = readdirSync(svgDir).filter((name) => name.endsWith('.svg')).sort();
assert(JSON.stringify(pngNames) === JSON.stringify(pages.map((page) => `${page}.png`)), 'Unexpected kneeboard PNG filenames or page count.');
assert(JSON.stringify(svgNames) === JSON.stringify(pages.map((page) => `${page}.svg`)), 'Unexpected kneeboard SVG filenames or page count.');

for (const page of pages) {
  const png = join(pngDir, `${page}.png`);
  const svg = join(svgDir, `${page}.svg`);
  const metadata = await sharp(png).metadata();
  assert(metadata.width === 1200 && metadata.height === 1600, `${page}.png must be 1200 x 1600.`);
  const source = readFileSync(svg, 'utf8');
  const resources = source
    .replaceAll('http://www.w3.org/2000/svg', '')
    .replaceAll('http://www.w3.org/1999/xlink', '');
  assert(!/https?:\/\//i.test(resources), `${page}.svg contains a network dependency.`);
  assert(source.includes(`${pages.indexOf(page) + 1} / 10`), `${page}.svg has the wrong page number.`);
}

const sourceAssetNames = readdirSync(join(root, 'kneeboard', 'assets', 'source'));
for (const asset of expectedAssets) {
  if (asset === 'pdcp-photo') {
    assert(sourceAssetNames.includes('scott-custom-f14-pdcp.jpeg'), 'The Scott-provided PDCP photograph is missing.');
  } else {
    assert(sourceAssetNames.includes(asset), `Missing source asset: ${asset}`);
  }
}
assert(!sourceAssetNames.includes('vkb-f14-grip.svg'), 'The superseded VKB vector asset is still present.');
const vkbPhoto = await sharp(join(root, 'kneeboard', 'assets', 'source', 'vkb-f14-grip-photo.jpeg')).metadata();
assert(vkbPhoto.width === 648 && vkbPhoto.height === 1269, 'The Scott-supplied VKB photograph has unexpected dimensions.');
const vkbCutout = await sharp(join(root, 'kneeboard', 'assets', 'source', 'vkb-f14-grip-photo-clean.png')).metadata();
assert(vkbCutout.hasAlpha, 'The cleaned VKB photograph must retain a transparent background.');

assertProfileButtons('Gunfighter F14', '02-VKB-F14-GRIP', [1, 3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16]);
assertProfileButtons('OnYourTwelve F-14 PDCP', '04-PDCP', Array.from({ length: 29 }, (_, index) => index + 1));
assertProfileButtons('CarrierAce PTO 2', '05-PTO2', [2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 16, 32, 34, 35, 37, 38, 39]);
assertProfileButtons('F16 MFD 1', '06-MFD1-JESTER', Array.from({ length: 28 }, (_, index) => index + 1));
assertProfileButtons('F16 MFD 2', '07-MFD2-CARRIER', Array.from({ length: 20 }, (_, index) => index + 1));
assertProfileButtons('F16 MFD 3', '08-MFD3-LANTIRN', [1, 2, 3, 4]);
assertProfileButtons('Throttle - HOTAS Warthog', '03-WARTHOG-THROTTLE', [7, 8, 9, 10, 11, 12, 15, 21, 24, 25, 26, 29, 30]);

const requiredText = {
  '01-VAICOM-OVERVIEW': ['TX1', 'MFD 3', 'KNEEBOARD\\F-14BU'],
  '02-VKB-F14-GRIP': ['Shared DCS-Common device: vkb-f14-gunfighter'],
  '03-WARTHOG-THROTTLE': ['Shared DCS-Common device: tm-warthog-throttle'],
  '04-PDCP': ['Shared DCS-Common device: onyourtwelve-pdcp'],
  '05-PTO2': ['Shared DCS-Common device: winctrl-pto2'],
  '06-MFD1-JESTER': ['Shared DCS-Common device: tm-mfd'],
  '07-MFD2-CARRIER': ['Shared DCS-Common device: tm-mfd'],
  '08-MFD3-LANTIRN': ['Shared DCS-Common device: tm-mfd'],
  '09-AXES-RESERVED-OPENKNEEBOARD': ['MOZA', 'Y pitch / X roll', 'NEXT_PAGE.exe', 'ENABLE_TINT.exe'],
};
for (const [page, labels] of Object.entries(requiredText)) {
  const source = readFileSync(join(svgDir, `${page}.svg`), 'utf8');
  const visibleText = source.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  for (const label of labels) assert(visibleText.includes(label), `${page} is missing required text: ${label}`);
}

function embeddedSharedSvg(page) {
  const source = readFileSync(join(svgDir, `${page}.svg`), 'utf8');
  const prefix = '<image href="data:image/svg+xml;base64,';
  const encoded = source.split(prefix)[1]?.split('"')[0];
  assert(encoded, `${page} does not embed its shared hardware SVG.`);
  return Buffer.from(encoded, 'base64').toString('utf8');
}

const warthogSharedSvg = embeddedSharedSvg('03-WARTHOG-THROTTLE');
assert((warthogSharedSvg.match(/<!-- callout:/g) ?? []).length === 41, 'Warthog page must retain all 41 shared catalog callouts.');
assert(!/<(?:line|circle)\b|<rect\b[^>]*\bx=/.test(warthogSharedSvg), 'Warthog page must not draw duplicate callout paths, dots, or label boxes.');
for (const label of [
  'VAICOM TX5', 'VAICOM TX1',
  'RETRACT', 'EXTEND',
  'SWEEP FWD', 'SWEEP BOMB',
  'PLM', 'CAUTION',
  'AP ON', 'ALT HOLD', 'HDG TOGGLE',
  'L CUT', 'R CUT',
  'Slew X', 'Slew Y', 'FRICTION',
]) {
  assert(warthogSharedSvg.includes(label), `Warthog shared SVG is missing mapped label: ${label}`);
}

const pdcpSharedSvg = embeddedSharedSvg('04-PDCP');
const pdcpLabels = [...pdcpSharedSvg.matchAll(/<text id="lbl-(pdcp-[^"]+)"[^>]*>([^<]*)<\/text>/g)];
assert(pdcpLabels.length === 29, 'PDCP page must retain all 29 shared catalog callouts.');
for (const [, id, label] of pdcpLabels) {
  assert(label.length > 0, `PDCP ${id} must render its configured F-14 function.`);
}
for (const [id, label] of [
  ['pdcp-to', 'Takeoff'],
  ['pdcp-vdi-awl', 'STEER TACAN'],
  ['pdcp-hud-alt-baro', 'HUD ALT BARO'],
  ['pdcp-vdi-power-on', 'VDI POWER ON'],
  ['pdcp-hsd-ecm-mode', 'HSD ECM'],
]) {
  const text = pdcpSharedSvg.match(new RegExp(`<text id="lbl-${id}"[^>]*>([^<]*)</text>`))?.[1];
  assert(text === label, `PDCP ${id} must render its mapped label.`);
}

const pto2SharedSvg = embeddedSharedSvg('05-PTO2');
assert((pto2SharedSvg.match(/<!-- callout:pto2-button-/g) ?? []).length === 41,
  'PTO2 page must retain all 41 shared catalog callouts.');
for (const [id, label] of [
  ['pto2-button-2', 'Caution reset'],
  ['pto2-button-3', 'Launch bar retract'],
  ['pto2-button-14', 'Refuel probe extend'],
  ['pto2-button-35', 'Gear up'],
  ['pto2-button-39', 'Parking brake pull'],
]) {
  const text = pto2SharedSvg.match(new RegExp(`<text id="lbl-${id}"[^>]*>([^<]*)</text>`))?.[1];
  assert(text === label, `PTO2 ${id} must render its mapped label.`);
}
for (const id of ['pto2-button-1', 'pto2-button-6', 'pto2-button-41']) {
  const text = pto2SharedSvg.match(new RegExp(`<text id="lbl-${id}"[^>]*>([^<]*)</text>`))?.[1];
  assert(text === '', `PTO2 ${id} must remain visibly unbound.`);
}

const before = generatedHashes();
function runBuildStep(script) {
  const result = spawnSync(process.execPath, [join(scriptDir, script)], {
    cwd: root,
    encoding: 'utf8',
    env: process.env,
  });
  assert(
    result.status === 0,
    `Deterministic rebuild failed in ${script}:\n${result.error?.stack ?? ''}\n${result.stdout ?? ''}\n${result.stderr ?? ''}`,
  );
}
runBuildStep('build-kneeboard.mjs');
runBuildStep('apply-shared-hardware.mjs');
const after = generatedHashes();
assert(JSON.stringify(after) === JSON.stringify(before), 'Kneeboard output changed across identical builds.');

console.log('Kneeboard validation passed: 10 deterministic pages, mappings, dimensions, and offline assets verified.');
