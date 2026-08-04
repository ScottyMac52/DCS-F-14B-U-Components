import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..');
const commonRoot = resolve(process.env.DCS_COMMON_ROOT ?? join(root, '.dcs-common'));
const { formatProvenanceFooter } = await import(pathToFileURL(join(commonRoot, 'scripts/shared-hardware-consumer.mjs')));
const svgDir = join(root, 'kneeboard', 'source');
const pngDir = join(root, 'kneeboard', 'F-14BU');
const assetDir = join(root, 'kneeboard', 'assets', 'source');
mkdirSync(svgDir, { recursive: true });
mkdirSync(pngDir, { recursive: true });

const esc = (value) => String(value)
  .replaceAll('&', '&')
  .replaceAll('<', '<')
  .replaceAll('>', '>')
  .replaceAll('"', '"');

function wrap(text, max = 28, limit = 2) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    if (!line) line = word;
    else if (`${line} ${word}`.length <= max) line += ` ${word}`;
    else { lines.push(line); line = word; }
  }
  if (line) lines.push(line);
  if (lines.length <= limit) return lines;
  const clipped = lines.slice(0, limit);
  clipped[limit - 1] = `${clipped[limit - 1].replace(/[.,;:]$/, '')}…`;
  return clipped;
}

const item = (key, text, accent = 'cyan') => ({ key, text, accent });
const callout = (key, text, side, anchor, accent = 'cyan') => ({ key, text, side, anchor, accent });
const colors = { cyan: '#46d8ff', gold: '#ffc95c', red: '#ff6b76' };

function dataUri(buffer, mime) {
  return `data:${mime};base64,${buffer.toString('base64')}`;
}

async function preparedAssets() {
  const warthogBase = readFileSync(join(assetDir, 'warthog-throttle-base.png'));
  const warthogHandles = readFileSync(join(assetDir, 'warthog-throttle-handles.png'));

  const pto2 = readFileSync(join(assetDir, 'pto2-clean.png'));
  const mfd = readFileSync(join(assetDir, 'cougar-mfd-clean.png'));

  const pdcp = await sharp(join(assetDir, 'scott-custom-f14-pdcp.jpeg'))
    .rotate().jpeg({ quality: 90, chromaSubsampling: '4:4:4' }).toBuffer();
  const vkb = readFileSync(join(assetDir, 'vkb-f14-grip-photo-clean.png'));

  return {
    warthogBase: dataUri(warthogBase, 'image/png'),
    warthogHandles: dataUri(warthogHandles, 'image/png'),
    pto2: dataUri(pto2, 'image/png'),
    mfd: dataUri(mfd, 'image/png'),
    pdcp: dataUri(pdcp, 'image/jpeg'),
    vkb: dataUri(vkb, 'image/png'),
  };
}

function frame(title, kicker, body, index, pageCount) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="1600" viewBox="0 0 1200 1600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#06101d"/><stop offset="1" stop-color="#0c1b2d"/>
    </linearGradient>
    <filter id="deviceShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="12" stdDeviation="15" flood-color="#000" flood-opacity="0.65"/>
    </filter>
  </defs>
  <rect width="1200" height="1600" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="16" fill="#46d8ff"/>
  <text x="54" y="80" font-family="DejaVu Sans,Arial,sans-serif" font-size="44" font-weight="800" fill="#f5f9ff">${esc(title)}</text>
  <text x="56" y="126" font-family="DejaVu Sans,Arial,sans-serif" font-size="20" font-weight="700" letter-spacing="1.2" fill="#ffc95c">${esc(kicker)}</text>
  <line x1="54" y1="156" x2="1146" y2="156" stroke="#263a52" stroke-width="3"/>
  ${body}
  <line x1="54" y1="1532" x2="1146" y2="1532" stroke="#263a52" stroke-width="2"/>
  <text x="54" y="1570" font-family="DejaVu Sans,Arial,sans-serif" font-size="18" fill="#8ea5bd">${esc(formatProvenanceFooter({ commonRoot, consumer: 'DCS-F-14B-U-Components' }))}</text>
  <text x="1146" y="1570" text-anchor="end" font-family="DejaVu Sans,Arial,sans-serif" font-size="18" fill="#8ea5bd">${index + 1} / ${pageCount}</text>
</svg>`;
}

function summaryPage(page, index, pageCount) {
  const margin = 54;
  const gap = 32;
  const colWidth = (1200 - margin * 2 - gap) / 2;
  const split = Math.ceil(page.items.length / 2);
  const columns = [page.items.slice(0, split), page.items.slice(split)];
  const maxRows = Math.max(...columns.map((column) => column.length));
  const rowHeight = Math.min(88, Math.floor(1320 / maxRows));
  const startY = 182;
  let body = '<g font-family="DejaVu Sans,Arial,sans-serif">';

  for (let column = 0; column < 2; column++) {
    const x = margin + column * (colWidth + gap);
    columns[column].forEach((entry, row) => {
      const y = startY + row * rowHeight;
      const lines = wrap(entry.text, rowHeight < 72 ? 28 : 32, 3);
      const accent = colors[entry.accent] ?? colors.cyan;
      body += `<rect x="${x}" y="${y}" width="${colWidth}" height="${rowHeight - 8}" rx="13" fill="#101f33" stroke="#263a52" stroke-width="2"/>`;
      body += `<rect x="${x + 12}" y="${y + 12}" width="126" height="${rowHeight - 32}" rx="9" fill="#08111f" stroke="${accent}" stroke-width="2"/>`;
      body += `<text x="${x + 75}" y="${y + rowHeight / 2 + 2}" text-anchor="middle" dominant-baseline="middle" font-size="22" font-weight="700" fill="${accent}">${esc(entry.key)}</text>`;
      const lineHeight = rowHeight < 72 ? 19 : 22;
      const textY = y + (rowHeight - 8 - (lines.length - 1) * lineHeight) / 2 + 7;
      lines.forEach((line, lineIndex) => {
        body += `<text x="${x + 154}" y="${textY + lineIndex * lineHeight}" font-size="${rowHeight < 72 ? 18 : 21}" font-weight="500" fill="#f2f7ff">${esc(line)}</text>`;
      });
    });
  }
  body += '</g>';
  return frame(page.title, page.kicker, body, index, pageCount);
}

function imageElement(layer) {
  const opacity = layer.opacity ?? 1;
  return `<image x="${layer.x}" y="${layer.y}" width="${layer.width}" height="${layer.height}" href="${layer.href}" preserveAspectRatio="xMidYMid meet" opacity="${opacity}" filter="url(#deviceShadow)"/>`;
}

function hardwarePage(page, index, pageCount) {
  const left = page.callouts.filter((entry) => entry.side === 'left');
  const right = page.callouts.filter((entry) => entry.side === 'right');
  const labelWidth = 286;
  const leftX = 54;
  const rightX = 860;
  const top = 182;
  const bottom = page.notes?.length ? 1250 : 1480;
  let body = '<g font-family="DejaVu Sans,Arial,sans-serif">';
  body += '<rect x="348" y="182" width="504" height="1288" rx="26" fill="#08121f" stroke="#1b334a" stroke-width="3"/>';
  for (const layer of page.images) body += imageElement(layer);

  if (page.directMarkers) {
    const markers = new Map();
    for (const entry of page.callouts) {
      const markerKey = entry.anchor.join(',');
      const marker = markers.get(markerKey) ?? { anchor: entry.anchor, entries: [] };
      marker.entries.push(entry);
      markers.set(markerKey, marker);
    }
    for (const marker of markers.values()) {
      const label = marker.entries
        .map((entry) => entry.key.replace(/^BTN\s+/, ''))
        .join('/');
      const accentName = marker.entries.some((entry) => entry.accent === 'red')
        ? 'red'
        : marker.entries.some((entry) => entry.accent === 'gold') ? 'gold' : 'cyan';
      const accent = colors[accentName];
      const markerWidth = Math.max(28, label.length * 8 + 12);
      body += `<rect x="${marker.anchor[0] - markerWidth / 2}" y="${marker.anchor[1] - 13}" width="${markerWidth}" height="26" rx="8" fill="#06101d" stroke="${accent}" stroke-width="2"/>`;
      body += `<text x="${marker.anchor[0]}" y="${marker.anchor[1] + 1}" text-anchor="middle" dominant-baseline="middle" font-size="11" font-weight="800" fill="${accent}">${esc(label)}</text>`;
    }
  }

  const drawSide = (entries, side) => {
    if (!entries.length) return;
    const routedEntries = [...entries].sort((a, b) => a.anchor[1] - b.anchor[1]);
    const spacing = (bottom - top) / routedEntries.length;
    routedEntries.forEach((entry, row) => {
      const cardHeight = Math.min(72, spacing - 7);
      const y = top + row * spacing + (spacing - cardHeight) / 2;
      const x = side === 'left' ? leftX : rightX;
      const lineStartX = side === 'left' ? x + labelWidth : x;
      const accent = colors[entry.accent] ?? colors.cyan;
      const lines = wrap(entry.text, 22, 2);
      if (!page.directMarkers) {
        body += `<path d="M ${lineStartX} ${y + cardHeight / 2} L ${entry.anchor[0]} ${entry.anchor[1]}" fill="none" stroke="${accent}" stroke-width="2.5" opacity="0.9"/>`;
        body += `<circle cx="${entry.anchor[0]}" cy="${entry.anchor[1]}" r="7" fill="#06101d" stroke="${accent}" stroke-width="3"/>`;
      }
      body += `<rect x="${x}" y="${y}" width="${labelWidth}" height="${cardHeight}" rx="11" fill="#0d1b2b" stroke="${accent}" stroke-width="2"/>`;
      body += `<rect x="${x + 9}" y="${y + 9}" width="82" height="${cardHeight - 18}" rx="7" fill="#06101d" stroke="${accent}" stroke-width="1.5"/>`;
      body += `<text x="${x + 50}" y="${y + cardHeight / 2 + 1}" text-anchor="middle" dominant-baseline="middle" font-size="17" font-weight="800" fill="${accent}">${esc(entry.key)}</text>`;
      const lineHeight = 17;
      const textY = y + (cardHeight - (lines.length - 1) * lineHeight) / 2 + 6;
      lines.forEach((line, lineIndex) => {
        body += `<text x="${x + 101}" y="${textY + lineIndex * lineHeight}" font-size="16" font-weight="600" fill="#f2f7ff">${esc(line)}</text>`;
      });
    });
  };

  drawSide(left, 'left');
  drawSide(right, 'right');

  if (page.notes?.length) {
    const noteTop = 1260;
    const noteWidth = (1092 - (page.notes.length - 1) * 14) / page.notes.length;
    page.notes.forEach((note, noteIndex) => {
      const x = 54 + noteIndex * (noteWidth + 14);
      const accent = colors[note.accent] ?? colors.cyan;
      const lines = wrap(note.text, Math.floor(noteWidth / 12), 3);
      body += `<rect x="${x}" y="${noteTop}" width="${noteWidth}" height="210" rx="15" fill="#101f33" stroke="${accent}" stroke-width="2"/>`;
      body += `<text x="${x + 18}" y="${noteTop + 36}" font-size="18" font-weight="800" fill="${accent}">${esc(note.key)}</text>`;
      lines.forEach((line, lineIndex) => {
        body += `<text x="${x + 18}" y="${noteTop + 72 + lineIndex * 25}" font-size="18" font-weight="600" fill="#f2f7ff">${esc(line)}</text>`;
      });
    });
  }

  body += '</g>';
  return frame(page.title, page.kicker, body, index, pageCount);
}

// Tuned for the Cougar MFD image placed at (360, 500, 480×590).
// Order matches the 28 OSB sequence used by mfdCallouts():
// top L→R, right T→B, bottom R→L, left B→T, then the 8 corner/side extras.
function mfdAnchors(offsetY = 0) {
  const y = (v) => v + offsetY;
  const top = [420, 500, 580, 660, 740].map((x) => [x, y(545)]);
  const right = [620, 690, 760, 830, 900].map((yy) => [800, y(yy)]);
  const bottom = [740, 660, 580, 500, 420].map((x) => [x, y(1045)]);
  const left = [900, 830, 760, 690, 620].map((yy) => [400, y(yy)]);
  return [
    ...top, ...right, ...bottom, ...left,
    // right-side extras (upper then lower)
    [815, y(600)], [815, y(650)], [815, y(950)], [815, y(1000)],
    // left-side extras (lower then upper)
    [385, y(1000)], [385, y(950)], [385, y(650)], [385, y(600)],
  ];
}

function mfdCallouts(items, offsetY = 0) {
  const anchors = mfdAnchors(offsetY);
  return items.map((entry, index) => callout(
    entry.key,
    entry.text,
    anchors[index][0] < 600 ? 'left' : 'right',
    anchors[index],
    entry.accent,
  ));
}

const assets = await preparedAssets();
const pages = [
  {
    type: 'summary',
    file: '01-VAICOM-OVERVIEW',
    title: 'VAICOM PRO + CONTROL OVERVIEW',
    kicker: 'VOICE-FIRST JESTER • PHYSICAL BACKUP • NO JESTER WHEEL',
    items: [
      item('TX1', '12Joy6 • VHF AM • Ctrl+Alt+Shift+1', 'gold'),
      item('TX2', '12Joy3 • UHF • Ctrl+Alt+Shift+2', 'gold'),
      item('TX3', '12Joy4 • VHF FM • Ctrl+Alt+Shift+3', 'gold'),
      item('TX4', '12Joy5 • AUTO • Ctrl+Alt+Shift+4', 'gold'),
      item('TX5', '12Joy2 • Interphone • Ctrl+Alt+Shift+5', 'gold'),
      item('MIC', 'DCS JOY_BTN2–6 intentionally unassigned', 'red'),
      item('MFD 1', 'Direct Jester navigation, radar and context'),
      item('MFD 2', 'Carrier and airframe controls'),
      item('MFD 3', 'Direct LANTIRN targeting-pod controls'),
      item('VOICE', 'Use VAICOM for conversational Jester tasks'),
      item('VR', 'OpenKneeboard folder: KNEEBOARD\\F-14BU'),
      item('RULE', 'Time-critical actions stay on physical controls'),
    ],
  },
  {
    type: 'hardware',
    file: '02-VKB-F14-GRIP',
    title: 'VKB GUNFIGHTER • F-14 GRIP',
    kicker: 'PRIMARY FLIGHT, WEAPONS, TRIM AND DIRECT LIFT CONTROL',
    images: [{ href: assets.vkb, x: 370, y: 215, width: 460, height: 1220, opacity: 0.92 }],
    callouts: [
      callout('BTN 1', 'Trigger', 'left', [455, 565]),
      callout('BTN 3', 'Store release', 'left', [755, 440], 'red'),
      callout('BTN 5', 'DLC / countermeasure', 'left', [420, 490]),
      callout('BTN 6', 'Catapult salute', 'left', [480, 810]),
      callout('BTN 7', 'NWS toggle', 'left', [710, 480], 'gold'),
      callout('RX', 'DLC / maneuver flap axis', 'left', [420, 490], 'gold'),
      callout('BTN 9', 'Trim pitch up', 'left', [625, 405], 'gold'),
      callout('BTN 10', 'Trim left wing down', 'right', [625, 405], 'gold'),
      callout('BTN 11', 'Trim right wing down', 'right', [625, 405], 'gold'),
      callout('BTN 12', 'Trim pitch down', 'right', [625, 405], 'gold'),
      callout('BTN 13', 'Sparrow / Phoenix', 'right', [780, 810]),
      callout('BTN 14', 'Sidewinder selector', 'right', [780, 810]),
      callout('BTN 15', 'Gun selector', 'right', [780, 810]),
      callout('BTN 16', 'Weapon selector OFF', 'right', [780, 810]),
    ],
  },
  {
    type: 'hardware',
    file: '03-WARTHOG-THROTTLE',
    title: 'THRUSTMASTER WARTHOG THROTTLE',
    kicker: 'WING SWEEP, DFCS, SPEED BRAKE, FLAPS AND VAICOM MIC',
    images: [
      { href: assets.warthogBase, x: 390, y: 180, width: 420, height: 600, opacity: 0.78 },
      { href: assets.warthogHandles, x: 360, y: 760, width: 480, height: 690, opacity: 0.78 },
    ],
    callouts: [
      // Base panel (upper image)
      callout('BTN 29', 'Left engine cutoff', 'right', [520, 420]),
      callout('BTN 30', 'Right engine cutoff', 'right', [620, 420]),
      callout('BTN 22', 'Flaps up', 'right', [470, 560]),
      callout('BTN 23', 'Flaps down', 'right', [470, 610]),
      callout('BTN 21', 'Master caution reset', 'right', [700, 600]),
      callout('BTN 24', 'Autopilot ON / release OFF', 'right', [500, 690]),
      callout('BTN 25', 'Altitude hold ON / release OFF', 'right', [560, 700]),
      callout('BTN 26', 'Autopilot heading toggle', 'right', [640, 700]),
      // Handles (lower image)
      callout('BTN 1', 'PLM button', 'left', [640, 1020]),
      callout('MIC 2–6', 'Reserved for VAICOM AHK', 'left', [430, 1060], 'red'),
      callout('BTN 15', 'PLM; CAGE/SEAM removed', 'right', [740, 1100]),
      callout('BTN 7', 'Speed brake retract', 'left', [430, 1170]),
      callout('BTN 8', 'Speed brake extend', 'left', [430, 1220]),
      callout('BTN 9', 'Wing sweep forward', 'left', [445, 1280]),
      callout('BTN 10', 'Wing sweep aft', 'left', [445, 1325]),
      callout('BTN 11', 'Wing sweep auto', 'left', [470, 1375]),
      callout('BTN 12', 'Wing sweep bomb', 'left', [470, 1415]),
      callout('BTN 13', 'Exterior lights master', 'right', [780, 1320]),
    ],
  },
  {
    type: 'hardware',
    file: '04-PDCP',
    title: 'ONYOURTWELVE F-14 PDCP',
    kicker: 'SCOTT’S CUSTOM DISPLAY, POWER, STEERING AND HSD PANEL',
    images: [{ href: assets.pdcp, x: 355, y: 245, width: 490, height: 1000, opacity: 0.92 }],
    callouts: [
      // Left column – display modes
      callout('BTN 1', 'Display mode takeoff', 'left', [430, 400]),
      callout('BTN 2', 'Display mode cruise', 'left', [430, 500]),
      callout('BTN 3', 'Display mode air-to-air', 'left', [430, 600]),
      callout('BTN 4', 'Display mode air-to-ground', 'left', [430, 700]),
      callout('BTN 5', 'Display mode landing', 'left', [430, 800]),
      // HUD mode / altitude (upper center)
      callout('BTN 11', 'HUD digital', 'left', [560, 430]),
      callout('BTN 12', 'HUD analog', 'left', [560, 430]),
      callout('BTN 13', 'HUD radar altitude', 'left', [700, 430], 'gold'),
      callout('BTN 14', 'HUD barometric altitude', 'left', [700, 430], 'gold'),
      // VDI / HSD modes
      callout('BTN 15', 'VDI mode NORM', 'right', [600, 580]),
      callout('BTN 16', 'VDI mode TV', 'right', [600, 580]),
      callout('BTN 17', 'HUD mode night', 'right', [720, 600]),
      callout('BTN 18', 'HUD mode day', 'right', [720, 600]),
      callout('BTN 19', 'HSD mode NAV', 'right', [600, 780]),
      callout('BTN 20', 'HSD mode TID', 'right', [600, 780]),
      callout('BTN 29', 'HSD mode ECM', 'right', [600, 780]),
      callout('BTN 21', 'HSD ECM override OFF', 'right', [720, 800]),
      callout('BTN 22', 'HSD ECM override ON', 'right', [720, 800]),
      // STEER CMD row (bottom of panel)
      callout('BTN 6', 'STEER CMD TACAN', 'left', [430, 1100]),
      callout('BTN 7', 'STEER CMD destination', 'left', [510, 1100]),
      callout('BTN 8', 'STEER CMD AWL/PCD', 'left', [590, 1100]),
      callout('BTN 9', 'STEER CMD VEC', 'left', [670, 1100]),
      callout('BTN 10', 'STEER CMD MAN', 'left', [750, 1100]),
      // Power switches (bottom row)
      callout('BTN 27', 'VDI power OFF', 'right', [450, 1000]),
      callout('BTN 28', 'VDI power ON', 'right', [450, 1000]),
      callout('BTN 23', 'HUD power OFF', 'right', [580, 1000]),
      callout('BTN 24', 'HUD power ON', 'right', [580, 1000]),
      callout('BTN 25', 'HSD/ECM power OFF', 'right', [720, 1000]),
      callout('BTN 26', 'HSD/ECM power ON', 'right', [720, 1000]),
    ],
  },
  {
    type: 'hardware',
    file: '05-PTO2',
    title: 'WINCTRL CARRIERACE PTO2',
    kicker: 'CARRIER, GEAR, FLAPS, LIGHTS AND REFUELING',
    images: [{ href: assets.pto2, x: 350, y: 360, width: 500, height: 760, opacity: 0.72 }],
    callouts: [
      callout('BTN 35', 'Gear UP', 'right', [470, 520]),
      callout('BTN 37', 'Gear DOWN', 'right', [470, 520]),
      callout('BTN 3', 'Launch bar retract / strut extend', 'left', [520, 560], 'gold'),
      callout('BTN 4', 'Launch bar extend / strut kneel', 'left', [520, 560], 'gold'),
      callout('BTN 5', 'Flaps up; else half', 'left', [600, 580]),
      callout('BTN 7', 'Flaps down; else half', 'left', [600, 580]),
      callout('BTN 32', 'Hook retract', 'right', [720, 680]),
      callout('BTN 34', 'Hook extend', 'right', [720, 680]),
      callout('BTN 8', 'Taxi lights ON', 'left', [510, 700]),
      callout('BTN 9', 'Taxi lights OFF', 'left', [510, 700]),
      callout('BTN 10', 'Antiskid / spoiler BOTH', 'left', [590, 700]),
      callout('BTN 11', 'Antiskid / spoiler OFF', 'left', [590, 700]),
      callout('BTN 2', 'Master caution reset', 'left', [430, 780]),
      callout('BTN 12', 'Hook bypass FIELD', 'right', [550, 800]),
      callout('BTN 13', 'Hook bypass CARRIER', 'right', [550, 800]),
      callout('BTN 14', 'Refuel probe extend / ALL', 'right', [640, 800]),
      callout('BTN 16', 'Refuel probe retract', 'right', [640, 800]),
      callout('BTN 38/39', 'Parking brake stow / pull', 'right', [650, 880]),
    ],
  },
  {
    type: 'hardware',
    file: '06-MFD1-JESTER',
    title: 'MFD 1 • DIRECT JESTER',
    kicker: 'NO WHEEL • NAVIGATION, RADAR AND CONTEXT',
    images: [{ href: assets.mfd, x: 360, y: 500, width: 480, height: 590, opacity: 0.78 }],
    callouts: mfdCallouts([
      item('BTN 1', 'Steerpoint SP1'), item('BTN 2', 'Steerpoint SP2'),
      item('BTN 3', 'Steerpoint SP3'), item('BTN 4', 'Fixed point'),
      item('BTN 5', 'Initial point'), item('BTN 6', 'Surface target'),
      item('BTN 7', 'Home base'), item('BTN 8', 'Manual steerpoint'),
      item('BTN 9', 'Radar VSL high'), item('BTN 10', 'Radar VSL low'),
      item('BTN 11', 'Toggle PD-STT / P-STT'), item('BTN 12', 'Break lock'),
      item('BTN 13', 'Range auto'), item('BTN 14', 'Range 25'),
      item('BTN 15', 'Range 50'), item('BTN 16', 'Range 100'),
      item('BTN 17', 'Range 200'), item('BTN 18', 'Range 400'),
      item('BTN 19', 'STT lock ahead'), item('BTN 20', 'STT lock enemy ahead'),
      item('BTN 21', 'Ground stabilize'), item('BTN 22', 'Aircraft stabilize'),
      item('BTN 23', 'TWS mode'), item('BTN 24', 'RWS mode'),
      item('BTN 25', 'Collision steering'), item('BTN 26', 'Context SHORT'),
      item('BTN 27', 'Context HOLD'), item('BTN 28', 'Context DOUBLE'),
    ]),
  },
  {
    type: 'hardware',
    file: '07-MFD2-CARRIER',
    title: 'MFD 2 • CARRIER + AIRFRAME',
    kicker: 'DETERMINISTIC BACKUP TO PTO2',
    images: [{ href: assets.mfd, x: 360, y: 500, width: 480, height: 590, opacity: 0.78 }],
    callouts: mfdCallouts([
      item('BTN 1', 'Gear up'), item('BTN 2', 'Gear down'),
      item('BTN 3', 'Hook retract'), item('BTN 4', 'Hook extend'),
      item('BTN 5', 'Flaps up; else half'), item('BTN 6', 'Flaps down; else half'),
      item('BTN 7', 'Antiskid / spoiler BOTH'), item('BTN 8', 'Antiskid / spoiler OFF'),
      item('BTN 9', 'Parking brake stow'), item('BTN 10', 'Parking brake pull'),
      item('BTN 11', 'Refuel probe extend / ALL'), item('BTN 12', 'Refuel probe retract'),
      item('BTN 13', 'Taxi lights ON'), item('BTN 14', 'Taxi lights OFF'),
      item('BTN 15', 'Hook bypass CARRIER'), item('BTN 16', 'Hook bypass FIELD'),
      item('BTN 17', 'Nose strut kneel'), item('BTN 18', 'Master caution reset'),
      item('BTN 19', 'Catapult salute'), item('BTN 20', 'DLC / countermeasure'),
      item('BTN 21', 'Deliberately unbound', 'red'), item('BTN 22', 'Deliberately unbound', 'red'),
      item('BTN 23', 'Deliberately unbound', 'red'), item('BTN 24', 'Deliberately unbound', 'red'),
      item('BTN 25', 'Deliberately unbound', 'red'), item('BTN 26', 'Deliberately unbound', 'red'),
      item('BTN 27', 'Deliberately unbound', 'red'), item('BTN 28', 'Deliberately unbound', 'red'),
    ]),
  },
  {
    type: 'hardware',
    file: '08-MFD3-LANTIRN',
    title: 'MFD 3 • PILOT / JESTER LANTIRN',
    kicker: 'QJESTER CONTEXT • VR GAZE • NO WHEEL',
    images: [{ href: assets.mfd, x: 360, y: 260, width: 480, height: 590, opacity: 0.78 }],
    callouts: [
      callout('BTN 1', 'Smart short / hold / double', 'left', [430, 310], 'gold'),
      callout('BTN 2', 'Direct SHORT context', 'left', [510, 310]),
      callout('BTN 3', 'Direct HOLD context', 'right', [590, 310], 'gold'),
      callout('BTN 4', 'Direct DOUBLE context', 'right', [670, 310]),
      callout('5–28', 'Intentionally unbound', 'right', [800, 560], 'red'),
    ],
    notes: [
      item('A/G', 'Hold BTN 1, look at a ground point, then release. Jester slews the pod and establishes area track.'),
      item('LTS', 'Hold BTN 1, look at the VDI LTS repeat, then release. Jester moves the pod to the indicated location.'),
      item('RULE', 'Use BTN 3 if smart-hold timing is unreliable. Pilot profile uses Jester AI, not RIO LANTIRN.', 'red'),
    ],
  },
  {
    type: 'summary',
    file: '09-AXES-RESERVED-OPENKNEEBOARD',
    title: 'AXES, RESERVED DEVICES + KNEEBOARD',
    kicker: 'CONFIGURATION NOTES AND OPTIONAL VOICE NAVIGATION',
    items: [
      item('TPR Z', 'Rudder axis', 'gold'), item('TPR Y', 'Left wheel brake', 'gold'),
      item('TPR X', 'Right wheel brake', 'gold'), item('MOZA', 'Y pitch / X roll', 'gold'),
      item('Viper TQS', 'Reserved; clears stray flight axes'), item('vJoy', 'Reserved; clears stray generic axes'),
      item('ICP', 'Empty and deliberately reserved', 'red'), item('MFD 2', 'Buttons 21–28 deliberately unbound', 'red'),
      item('VOICE', '“Kneeboard next page” • NEXT_PAGE.exe'),
      item('VOICE', '“Kneeboard previous page” • PREVIOUS_PAGE.exe'),
      item('VOICE', '“Kneeboard next tab” • NEXT_TAB.exe'),
      item('VOICE', '“Kneeboard previous tab” • PREVIOUS_TAB.exe'),
      item('VOICE', '“Kneeboard brighter” • INCREASE_BRIGHTNESS.exe'),
      item('VOICE', '“Kneeboard dimmer” • DECREASE_BRIGHTNESS.exe'),
      item('VOICE', '“Kneeboard night” • ENABLE_TINT.exe'),
      item('VOICE', '“Kneeboard day” • DISABLE_TINT.exe'),
      item('TAB', 'Saved Games\\DCS.openbeta\\KNEEBOARD\\F-14BU'),
      item('SAFETY', 'Use unique phrases that do not overlap VAICOM', 'gold'),
    ],
  },
];

for (let index = 0; index < pages.length; index++) {
  const page = pages[index];
  const svg = page.type === 'summary'
    ? summaryPage(page, index, pages.length)
    : hardwarePage(page, index, pages.length);
  writeFileSync(join(svgDir, `${page.file}.svg`), svg, 'utf8');
  await sharp(Buffer.from(svg)).png().toFile(join(pngDir, `${page.file}.png`));
}

console.log(`Generated ${pages.length} SVG pages and PNG pages.`);
