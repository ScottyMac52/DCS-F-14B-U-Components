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
  'warthog-thr-mic-up': 'BTN 2: VAICOM TX5',
  'warthog-thr-mic-right': 'BTN 3: VAICOM TX2',
  'warthog-thr-mic-down': 'BTN 4: VAICOM TX3',
  'warthog-thr-mic-left': 'BTN 5: VAICOM TX4',
  'warthog-thr-mic-push': 'BTN 6: VAICOM TX1',
  'warthog-thr-speedbrake-forward': 'BTN 7: Speed brake retract',
  'warthog-thr-speedbrake-back': 'BTN 8: Speed brake extend',
  'warthog-thr-boat-forward': 'BTN 9: Wing sweep forward',
  'warthog-thr-boat-back': 'BTN 10: Wing sweep aft',
  'warthog-thr-china-forward': 'BTN 11: Wing sweep auto',
  'warthog-thr-china-back': 'BTN 12: Wing sweep bomb',
  'warthog-thr-left-throttle-button': 'BTN 15: PLM',
  'warthog-thr-landing-horn-silence': 'BTN 21: Caution reset',
  'warthog-thr-eac-on': 'BTN 24: Autopilot on',
  'warthog-thr-rdr-alt-normal': 'BTN 25: Altitude hold',
  'warthog-thr-ap-engage': 'BTN 26: Heading toggle',
  'warthog-thr-left-engine-idle-off': 'BTN 29: Left cutoff',
  'warthog-thr-right-engine-idle-off': 'BTN 30: Right cutoff',
  'warthog-thr-axis-slew-x': 'Slew X',
  'warthog-thr-axis-slew-y': 'Slew Y',
  'warthog-thr-axis-right-throttle': 'Right throttle',
  'warthog-thr-axis-left-throttle': 'Left throttle',
  'warthog-thr-axis-friction': 'Friction axis',
};

const pages = [
  page('02-VKB-F14-GRIP','vkb-f14-gunfighter','VKB GUNFIGHTER • F-14 GRIP','PRIMARY FLIGHT, WEAPONS, TRIM AND DIRECT LIFT CONTROL',[
    'BTN 9–12: Trim','BTN 3: Store release','BTN 13–16: Weapon select','BTN 7: NWS toggle','BTN 5 / RX: DLC','BTN 6: Catapult salute','BTN 1: Trigger','','DLC / countermeasure','','','Trigger stage 1','Trigger stage 2']),
  page('03-WARTHOG-THROTTLE','tm-warthog-throttle','THRUSTMASTER WARTHOG THROTTLE','WING SWEEP, DFCS, SPEED BRAKE, FLAPS AND VAICOM MIC',warthogLabels),
  page('04-PDCP','onyourtwelve-pdcp','ONYOURTWELVE F-14 PDCP','DISPLAY, POWER, STEERING AND HSD PANEL',[
    'BTN 1: Takeoff','BTN 2: Cruise','BTN 3: Air-to-air','BTN 4: Air-to-ground','BTN 5: Landing','BTN 11/12: HUD mode','BTN 15/16: VDI mode','BTN 19/20/29: HSD mode','BTN 27/28: VDI power','BTN 13/14/17/18: HUD controls','BTN 6–10: Steering command','BTN 21/22/25/26: HSD/ECM','BTN 23/24: HUD power']),
  page('05-PTO2','winctrl-pto2','WINCTRL CARRIERACE PTO2','CARRIER, GEAR, FLAPS, LIGHTS AND REFUELING',[
    'BTN 35/37: Gear','BTN 3/4: Launch bar','BTN 5/7: Flaps','','','BTN 32/34: Hook','BTN 12/13: Hook bypass','BTN 8/9: Taxi lights','BTN 10/11: Antiskid','','','','','BTN 2: Caution reset','BTN 38/39: Parking brake','','BTN 14/16: Refuel probe','Flaps','']),
  page('06-MFD1-JESTER','tm-mfd','MFD 1 • DIRECT JESTER','NAVIGATION, RADAR AND CONTEXT',mfdLabels(Array.from({length:28},(_,i)=>`BTN ${i+1}`))),
  page('07-MFD2-CARRIER','tm-mfd','MFD 2 • CARRIER + AIRFRAME','DETERMINISTIC BACKUP TO PTO2',mfdLabels(['Gear up','Gear down','Hook retract','Hook extend','Flaps up','Flaps down','Antiskid BOTH','Antiskid OFF','Brake stow','Brake pull','Probe extend','Probe retract','Taxi lights ON','Taxi lights OFF','Hook carrier','Hook field','Nose strut kneel','Caution reset','Catapult salute','DLC / countermeasure','Unbound','Unbound','Unbound','Unbound','Unbound','Unbound','Unbound','Unbound'])),
  page('08-MFD3-LANTIRN','tm-mfd','MFD 3 • PILOT / JESTER LANTIRN','QJESTER CONTEXT • VR GAZE',mfdLabels(['Smart context','Direct SHORT','Direct HOLD','Direct DOUBLE',...Array(24).fill('Unbound')]))
];

for (const [index, spec] of pages.entries()) {
  const { svg } = renderSharedHardwarePage({ ...spec, commonRoot, footer: `F-14B(U) • shared DCS-Common hardware template • ${index + 2} / 9` });
  writeFileSync(join(svgDir, `${spec.file}.svg`), svg);
  await sharp(Buffer.from(svg)).png().toFile(join(pngDir, `${spec.file}.png`));
}
