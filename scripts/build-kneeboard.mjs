import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..');
const svgDir = join(root, 'kneeboard', 'source');
const pngDir = join(root, 'kneeboard', 'F-14BU');
mkdirSync(svgDir, { recursive: true });
mkdirSync(pngDir, { recursive: true });

const esc = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function wrap(text, max = 31) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    if (!line) line = word;
    else if (`${line} ${word}`.length <= max) line += ` ${word}`;
    else { lines.push(line); line = word; }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function item(key, text, accent = 'cyan') { return { key, text, accent }; }

const pages = [
  {
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
    file: '02-STICK-AND-THROTTLE',
    title: 'GUNFIGHTER STICK + WARTHOG THROTTLE',
    kicker: 'PRIMARY FLIGHT, WEAPONS, WING SWEEP AND DFCS',
    items: [
      item('STK 1', 'Trigger'), item('STK 3', 'Store release', 'red'),
      item('STK 5', 'DLC toggle / countermeasure dispense'), item('STK 6', 'Catapult salute'),
      item('STK 7', 'Autopilot reference / NWS toggle', 'gold'),
      item('STK 13', 'Sparrow / Phoenix selector'), item('STK 14', 'Sidewinder selector'),
      item('STK 15', 'Gun selector'), item('STK 16', 'Weapon selector OFF'),
      item('STK RX', 'DLC / maneuver flaps axis', 'gold'),
      item('HAT ↑', 'Trim pitch up • BTN 9', 'gold'), item('HAT ↓', 'Trim pitch down • BTN 12', 'gold'),
      item('HAT ←', 'Trim left wing down • BTN 10', 'gold'), item('HAT →', 'Trim right wing down • BTN 11', 'gold'),
      item('THR 1', 'PLM button'), item('THR 7', 'Speed brake retract'),
      item('THR 8', 'Speed brake extend'), item('THR 9', 'Wing sweep forward'),
      item('THR 10', 'Wing sweep aft'), item('THR 11', 'Wing sweep auto'),
      item('THR 12', 'Wing sweep bomb'), item('THR 13', 'Exterior lights master'),
      item('THR 15', 'PLM button • CAGE/SEAM removed'), item('THR 21', 'Master caution reset'),
      item('THR 22', 'Flaps up'), item('THR 23', 'Flaps down'),
      item('THR 24', 'Autopilot ON; release OFF'), item('THR 25', 'Altitude hold ON; release OFF'),
      item('THR 26', 'Autopilot heading toggle'), item('THR 29', 'Left engine cutoff'),
      item('THR 30', 'Right engine cutoff'), item('MIC 2–6', 'Reserved for VAICOM AutoHotKey', 'red'),
    ],
  },
  {
    file: '03-PDCP', title: 'PDCP', kicker: 'DISPLAY MODES, POWER, STEERING AND HSD',
    items: [
      item('BTN 1', 'Display mode takeoff'), item('BTN 2', 'Display mode cruise'),
      item('BTN 3', 'Display mode air-to-air'), item('BTN 4', 'Display mode air-to-ground'),
      item('BTN 5', 'Display mode landing'), item('BTN 6', 'STEER CMD TACAN'),
      item('BTN 7', 'STEER CMD Destination'), item('BTN 8', 'STEER CMD AWL/PCD'),
      item('BTN 9', 'STEER CMD VEC'), item('BTN 10', 'STEER CMD MAN'),
      item('BTN 11', 'HUD Digital'), item('BTN 12', 'HUD Analog'),
      item('BTN 13', 'HUD radar altitude; else baro'), item('BTN 14', 'HUD baro altitude; else radar'),
      item('BTN 15', 'VDI mode NORM'), item('BTN 16', 'VDI mode TV'),
      item('BTN 17', 'HUD mode Night'), item('BTN 18', 'HUD mode Day'),
      item('BTN 19', 'HSD mode NAV'), item('BTN 20', 'HSD mode TID'),
      item('BTN 21', 'HSD ECM override OFF'), item('BTN 22', 'HSD ECM override ON'),
      item('BTN 23', 'HUD power OFF'), item('BTN 24', 'HUD power ON'),
      item('BTN 25', 'HSD/ECM power OFF'), item('BTN 26', 'HSD/ECM power ON'),
      item('BTN 27', 'VDI power OFF'), item('BTN 28', 'VDI power ON'),
      item('BTN 29', 'HSD mode ECM'),
    ],
  },
  {
    file: '04-PTO2', title: 'CARRIERACE PTO 2', kicker: 'CARRIER, GEAR, FLAPS, LIGHTS AND REFUELING',
    items: [
      item('BTN 2', 'Master caution reset'),
      item('BTN 3', 'Launch bar RETRACT • nose strut EXTEND', 'gold'),
      item('BTN 4', 'Launch bar EXTEND • nose strut KNEEL', 'gold'),
      item('BTN 5', 'Flaps UP; else HALF'), item('BTN 7', 'Flaps DOWN; else HALF'),
      item('BTN 8', 'Taxi lights ON'), item('BTN 9', 'Taxi lights OFF'),
      item('BTN 10', 'Antiskid / spoiler brakes BOTH'), item('BTN 11', 'Antiskid / spoiler brakes OFF'),
      item('BTN 12', 'Hook bypass FIELD'), item('BTN 13', 'Hook bypass CARRIER'),
      item('BTN 14', 'Refuel probe extend / ALL'), item('BTN 16', 'Refuel probe retract'),
      item('BTN 32', 'Hook retract'), item('BTN 34', 'Hook extend'),
      item('BTN 35', 'Gear UP'), item('BTN 37', 'Gear DOWN'),
      item('BTN 38', 'Parking brake stow'), item('BTN 39', 'Parking brake pull'),
    ],
  },
  {
    file: '05-MFD1-JESTER', title: 'MFD 1 • DIRECT JESTER', kicker: 'NO WHEEL • NAVIGATION, RADAR AND CONTEXT',
    items: [
      item('BTN 1', 'Set steerpoint SP1'), item('BTN 2', 'Set steerpoint SP2'),
      item('BTN 3', 'Set steerpoint SP3'), item('BTN 4', 'Set fixed point'),
      item('BTN 5', 'Set initial point'), item('BTN 6', 'Set surface target'),
      item('BTN 7', 'Set home base'), item('BTN 8', 'Set manual steerpoint'),
      item('BTN 9', 'Radar VSL High'), item('BTN 10', 'Radar VSL Low'),
      item('BTN 11', 'Toggle PD-STT / P-STT'), item('BTN 12', 'Break lock'),
      item('BTN 13', 'Range Auto'), item('BTN 14', 'Range 25'),
      item('BTN 15', 'Range 50'), item('BTN 16', 'Range 100'),
      item('BTN 17', 'Range 200'), item('BTN 18', 'Range 400'),
      item('BTN 19', 'STT lock ahead'), item('BTN 20', 'STT lock enemy ahead'),
      item('BTN 21', 'Ground stabilize'), item('BTN 22', 'Aircraft stabilize'),
      item('BTN 23', 'TWS mode'), item('BTN 24', 'RWS mode'),
      item('BTN 25', 'Collision steering'), item('BTN 26', 'Context SHORT'),
      item('BTN 27', 'Context HOLD'), item('BTN 28', 'Context DOUBLE'),
    ],
  },
  {
    file: '06-MFD2-CARRIER', title: 'MFD 2 • CARRIER + AIRFRAME', kicker: 'DETERMINISTIC BACKUP TO PTO2',
    items: [
      item('BTN 1', 'Gear UP'), item('BTN 2', 'Gear DOWN'),
      item('BTN 3', 'Hook retract'), item('BTN 4', 'Hook extend'),
      item('BTN 5', 'Flaps UP; else HALF'), item('BTN 6', 'Flaps DOWN; else HALF'),
      item('BTN 7', 'Antiskid / spoiler brakes BOTH'), item('BTN 8', 'Antiskid / spoiler brakes OFF'),
      item('BTN 9', 'Parking brake stow'), item('BTN 10', 'Parking brake pull'),
      item('BTN 11', 'Refuel probe extend / ALL'), item('BTN 12', 'Refuel probe retract'),
      item('BTN 13', 'Taxi lights ON'), item('BTN 14', 'Taxi lights OFF'),
      item('BTN 15', 'Hook bypass CARRIER'), item('BTN 16', 'Hook bypass FIELD'),
      item('BTN 17', 'Nose strut KNEEL; else OFF'), item('BTN 18', 'Master caution reset'),
      item('BTN 19', 'Catapult salute'), item('BTN 20', 'DLC / countermeasure dispense'),
      item('21–28', 'Deliberately unbound', 'red'),
    ],
  },
  {
    file: '07-MFD3-LANTIRN', title: 'MFD 3 • PILOT / JESTER LANTIRN', kicker: 'QJESTER CONTEXT • VR GAZE • NO WHEEL',
    items: [
      item('BTN 1', 'Smart context • short / hold / double', 'gold'),
      item('BTN 2', 'Direct SHORT context'), item('BTN 3', 'Direct HOLD context', 'gold'),
      item('BTN 4', 'Direct DOUBLE context'), item('5–28', 'Intentionally unbound', 'red'),
      item('A/G', 'Hold BTN 1 • look at ground point • release'),
      item('RESULT', 'Jester slews pod and establishes area track'),
      item('LTS', 'Hold BTN 1 • look at VDI LTS repeat • release'),
      item('RESULT', 'Jester moves pod to indicated location'),
      item('DIRECT', 'Use BTN 3 if smart-hold timing is unreliable'),
      item('VOICE', 'VAICOM remains primary for spoken Jester tasks'),
      item('RULE', 'Pilot profile uses Jester AI • not RIO LANTIRN', 'red'),
    ],
  },
  {
    file: '08-AXES-RESERVED-OPENKNEEBOARD', title: 'AXES, RESERVED DEVICES + KNEEBOARD',
    kicker: 'CONFIGURATION NOTES AND OPTIONAL VOICE NAVIGATION',
    items: [
      item('TPR Z', 'Rudder axis', 'gold'), item('TPR Y', 'Left wheel brake', 'gold'),
      item('TPR X', 'Right wheel brake', 'gold'), item('MOZA', 'Removes stray rudder and throttle binds'),
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
      item('TAB', 'Folder: Saved Games\\DCS.openbeta\\KNEEBOARD\\F-14BU'),
      item('SAFETY', 'Use unique phrases that do not overlap VAICOM', 'gold'),
    ],
  },
];

function render(page, index) {
  const width = 1200;
  const height = 1600;
  const margin = 54;
  const gap = 32;
  const colWidth = (width - margin * 2 - gap) / 2;
  const split = Math.ceil(page.items.length / 2);
  const cols = [page.items.slice(0, split), page.items.slice(split)];
  const maxRows = Math.max(...cols.map((x) => x.length));
  const rowHeight = Math.min(88, Math.floor(1270 / maxRows));
  const startY = 218;
  const colors = { cyan: '#46d8ff', gold: '#ffc95c', red: '#ff6b76' };

  let body = '';
  for (let c = 0; c < 2; c++) {
    const x = margin + c * (colWidth + gap);
    cols[c].forEach((entry, row) => {
      const y = startY + row * rowHeight;
      const lines = wrap(entry.text, rowHeight < 72 ? 28 : 32);
      const accent = colors[entry.accent] ?? colors.cyan;
      body += `<rect x="${x}" y="${y}" width="${colWidth}" height="${rowHeight - 8}" rx="13" fill="#101f33" stroke="#263a52" stroke-width="2"/>`;
      body += `<rect x="${x + 12}" y="${y + 12}" width="126" height="${rowHeight - 32}" rx="9" fill="#08111f" stroke="${accent}" stroke-width="2"/>`;
      body += `<text x="${x + 75}" y="${y + rowHeight / 2 + 2}" text-anchor="middle" dominant-baseline="middle" font-size="23" font-weight="700" fill="${accent}">${esc(entry.key)}</text>`;
      const lineHeight = rowHeight < 72 ? 20 : 23;
      const textY = y + (rowHeight - 8 - (lines.length - 1) * lineHeight) / 2 + 7;
      lines.forEach((line, i) => {
        body += `<text x="${x + 154}" y="${textY + i * lineHeight}" font-size="${rowHeight < 72 ? 19 : 22}" font-weight="500" fill="#f2f7ff">${esc(line)}</text>`;
      });
    });
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#06101d"/><stop offset="1" stop-color="#0c1b2d"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="1600" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="16" fill="#46d8ff"/>
  <text x="54" y="82" font-family="DejaVu Sans, Arial, sans-serif" font-size="47" font-weight="800" fill="#f5f9ff">${esc(page.title)}</text>
  <text x="56" y="132" font-family="DejaVu Sans, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="1.5" fill="#ffc95c">${esc(page.kicker)}</text>
  <line x1="54" y1="166" x2="1146" y2="166" stroke="#263a52" stroke-width="3"/>
  <g font-family="DejaVu Sans, Arial, sans-serif">${body}</g>
  <line x1="54" y1="1532" x2="1146" y2="1532" stroke="#263a52" stroke-width="2"/>
  <text x="54" y="1570" font-family="DejaVu Sans, Arial, sans-serif" font-size="19" fill="#8ea5bd">F-14B(U) • Scott's cockpit • VAICOM PRO • Package 1.2.0</text>
  <text x="1146" y="1570" text-anchor="end" font-family="DejaVu Sans, Arial, sans-serif" font-size="19" fill="#8ea5bd">${index + 1} / ${pages.length}</text>
</svg>`;
}

for (let index = 0; index < pages.length; index++) {
  const page = pages[index];
  const svgPath = join(svgDir, `${page.file}.svg`);
  const pngPath = join(pngDir, `${page.file}.png`);
  const svg = render(page, index);
  writeFileSync(svgPath, svg, 'utf8');
  await sharp(Buffer.from(svg)).png().toFile(pngPath);
}

console.log(`Generated ${pages.length} SVG pages and PNG pages.`);
