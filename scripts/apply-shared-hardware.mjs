import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const commonRoot = resolve(process.env.DCS_COMMON_ROOT ?? join(root, '.dcs-common'));
const { renderSharedHardwarePage } = await import(pathToFileURL(join(commonRoot, 'scripts/shared-hardware-consumer.mjs')));
const svgDir = join(root, 'kneeboard/source');
const pngDir = join(root, 'kneeboard/F-14BU');
mkdirSync(svgDir, { recursive: true }); mkdirSync(pngDir, { recursive: true });

const mfdIds = ['mfd-osb-t1','mfd-osb-t2','mfd-osb-t3','mfd-osb-t4','mfd-osb-t5','mfd-osb-r1','mfd-osb-r2','mfd-osb-r3','mfd-osb-r4','mfd-osb-r5','mfd-osb-b5','mfd-osb-b4','mfd-osb-b3','mfd-osb-b2','mfd-osb-b1','mfd-osb-l5','mfd-osb-l4','mfd-osb-l3','mfd-osb-l2','mfd-osb-l1','mfd-rocker-gain','mfd-rocker-lvl','mfd-rocker-con-up','mfd-rocker-con-down','mfd-rocker-brt-up','mfd-rocker-brt-down','mfd-rocker-sym','mfd-rocker-int'];
const mfdLabels = (values) => Object.fromEntries(mfdIds.map((id, index) => [id, values[index] ?? '']));
const page = (file, deviceId, title, kicker, labels) => ({ file, deviceId, title, kicker, labels });
const warthogLabels = {
  'warthog-thr-mic-up': 'VAICOM TX5',
  'warthog-thr-mic-right': 'VAICOM TX2',
  'warthog-thr-mic-down': 'VAICOM TX3',
  'warthog-thr-mic-left': 'VAICOM TX4',
  'warthog-thr-mic-push': 'VAICOM TX1',
  'warthog-thr-speedbrake-forward': 'RETRACT',
  'warthog-thr-speedbrake-back': 'EXTEND',
  'warthog-thr-boat-forward': 'SWEEP FWD',
  'warthog-thr-boat-back': 'SWEEP AFT',
  'warthog-thr-china-forward': 'SWEEP AUTO',
  'warthog-thr-china-back': 'SWEEP BOMB',
  'warthog-thr-left-throttle-button': 'PLM',
  'warthog-thr-landing-horn-silence': 'CAUTION',
  'warthog-thr-eac-on': 'AP ON',
  'warthog-thr-rdr-alt-normal': 'ALT HOLD',
  'warthog-thr-ap-engage': 'HDG TOGGLE',
  'warthog-thr-left-engine-idle-off': 'L CUT',
  'warthog-thr-right-engine-idle-off': 'R CUT',
  'warthog-thr-axis-slew-x': 'Slew X',
  'warthog-thr-axis-slew-y': 'Slew Y',
  'warthog-thr-axis-friction': 'FRICTION',
};

const pto2Labels = {
  'pto2-button-2': 'Caution reset',
  'pto2-button-3': 'Launch bar retract',
  'pto2-button-4': 'Launch bar extend',
  'pto2-button-5': 'Flaps up',
  'pto2-button-7': 'Flaps full',
  'pto2-button-8': 'Taxi lights ON',
  'pto2-button-9': 'Taxi lights OFF',
  'pto2-button-10': 'Antiskid BOTH',
  'pto2-button-11': 'Antiskid OFF',
  'pto2-button-12': 'Hook bypass FIELD',
  'pto2-button-13': 'Hook bypass CARRIER',
  'pto2-button-14': 'Refuel probe extend',
  'pto2-button-16': 'Refuel probe retract',
  'pto2-button-32': 'Hook retract',
  'pto2-button-34': 'Hook extend',
  'pto2-button-35': 'Gear up',
  'pto2-button-37': 'Gear down',
  'pto2-button-38': 'Parking brake stow',
  'pto2-button-39': 'Parking brake pull',
};

const pages = [
  page('02-VKB-F14-GRIP','vkb-f14-gunfighter','VKB GUNFIGHTER • F-14 GRIP','PRIMARY FLIGHT, WEAPONS, TRIM AND DIRECT LIFT CONTROL',[
    'BTN 9–12: Trim','BTN 3: Store release','BTN 13–16: Weapon select','BTN 7: NWS toggle','BTN 5 / RX: DLC','BTN 6: Catapult salute','BTN 1: Trigger','','DLC / countermeasure','','','Trigger stage 1','Trigger stage 2']),
  page('03-WARTHOG-THROTTLE','tm-warthog-throttle','THRUSTMASTER WARTHOG THROTTLE','WING SWEEP, DFCS, SPEED BRAKE, FLAPS AND VAICOM MIC',warthogLabels),
  page('04-PDCP','onyourtwelve-pdcp','ONYOURTWELVE F-14 PDCP','DISPLAY, POWER, STEERING AND HSD PANEL',[
    'BTN 1: Takeoff','BTN 2: Cruise','BTN 3: Air-to-air','BTN 4: Air-to-ground','BTN 5: Landing','BTN 11/12: HUD mode','BTN 15/16: VDI mode','BTN 19/20/29: HSD mode','BTN 27/28: VDI power','BTN 13/14/17/18: HUD controls','BTN 6–10: Steering command','BTN 21/22/25/26: HSD/ECM','BTN 23/24: HUD power']),
  page('05-PTO2','winctrl-pto2','WINCTRL CARRIERACE PTO2','CARRIER, GEAR, FLAPS, LIGHTS AND REFUELING',pto2Labels),
  page('06-MFD1-JESTER','tm-mfd','MFD 1 • DIRECT JESTER','NAVIGATION, RADAR AND CONTEXT',mfdLabels(Array.from({length:28},(_,i)=>`BTN ${i+1}`))),
  page('07-MFD2-CARRIER','tm-mfd','MFD 2 • CARRIER + AIRFRAME','DETERMINISTIC BACKUP TO PTO2',mfdLabels(['Gear up','Gear down','Hook retract','Hook extend','Flaps up','Flaps down','Antiskid BOTH','Antiskid OFF','Brake stow','Brake pull','Probe extend','Probe retract','Taxi lights ON','Taxi lights OFF','Hook carrier','Hook field','Nose strut kneel','Caution reset','Catapult salute','DLC / countermeasure','Unbound','Unbound','Unbound','Unbound','Unbound','Unbound','Unbound','Unbound'])),
  page('08-MFD3-LANTIRN','tm-mfd','MFD 3 • PILOT / JESTER LANTIRN','QJESTER CONTEXT • VR GAZE',mfdLabels(['Smart context','Direct SHORT','Direct HOLD','Direct DOUBLE',...Array(24).fill('Unbound')]))
];

for (const [index, spec] of pages.entries()) {
  const { svg } = renderSharedHardwarePage({ ...spec, commonRoot, footer: `F-14B(U) • shared DCS-Common hardware template • ${index + 2} / 9` });
  writeFileSync(join(svgDir, `${spec.file}.svg`), svg);
  await sharp(Buffer.from(svg)).png().toFile(join(pngDir, `${spec.file}.png`));
}
