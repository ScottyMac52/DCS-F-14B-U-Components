import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const commonRoot = resolve(process.env.DCS_COMMON_ROOT ?? join(root, '.dcs-common'));
const { loadProfileDrivenConfig, parseDcsDiffLua } = await import(
  pathToFileURL(join(commonRoot, 'scripts/profile-driven-kneeboard.mjs'))
);

const profiles = {
  throttle: 'src/Config/Input/F-14BU/joystick/Throttle - HOTAS Warthog {5200C960-CB32-11ed-8020-444553540000}.diff.lua',
  grip: 'src/Config/Input/F-14BU/joystick/ VKBSim Gunfighter F14   {2D5CEC70-5189-11f1-8001-444553540000}.diff.lua',
};

function bindings(profile) {
  return parseDcsDiffLua(readFileSync(join(root, profiles[profile]), 'utf8'), {
    filename: profiles[profile],
  }).bindings;
}

function assignments(profile) {
  return bindings(profile).flatMap((binding) => binding.added.map((input) => ({
    command: binding.command,
    name: binding.name,
    key: input.key,
    chord: input.reformers.join('+'),
  })));
}

function targetAssignments(profile, keys) {
  return assignments(profile)
    .filter(({ key }) => keys.includes(key))
    .sort((left, right) => `${left.key}:${left.chord}`.localeCompare(`${right.key}:${right.chord}`));
}

test('F-14B(U) pilot profiles assign every physical chord once', () => {
  for (const profile of Object.keys(profiles)) {
    const seen = new Map();
    for (const assignment of assignments(profile)) {
      const chord = `${assignment.key}:${assignment.chord}`;
      assert.ok(!seen.has(chord), `${profile} assigns ${chord} to both ${seen.get(chord)} and ${assignment.name}`);
      seen.set(chord, assignment.name);
    }
  }
});

test('Warthog autopilot block uses verified deterministic command forms', () => {
  assert.deepEqual(targetAssignments('throttle', [
    'JOY_BTN24',
    'JOY_BTN25',
    'JOY_BTN26',
    'JOY_BTN27',
    'JOY_BTN28',
  ]), [
    {
      command: 'd3040pnilu3040cd22vd1vpnilvu-1',
      name: 'Autopilot On, else Off',
      key: 'JOY_BTN24',
      chord: '',
    },
    {
      command: 'd3038pnilu3038cd22vd1vpnilvu-1',
      name: 'Altitude Hold On, else Off',
      key: 'JOY_BTN25',
      chord: '',
    },
    {
      command: 'd3744pnilunilcd22vd1vpnilvunil',
      name: 'Autopilot Heading Toggle On',
      key: 'JOY_BTN26',
      chord: '',
    },
    {
      command: 'd3039pnilu3039cd22vd-1vpnilvu0',
      name: 'Heading Hold GT, else Off',
      key: 'JOY_BTN27',
      chord: '',
    },
    {
      command: 'd3037pnilu3037cd22vd1vpnilvu0',
      name: 'Autopilot Vector VEC/PCD, else Off',
      key: 'JOY_BTN27',
      chord: 'JOY_BTN7',
    },
    {
      command: 'd3037pnilu3037cd22vd-1vpnilvu0',
      name: 'Autopilot Vector ACL, else Off',
      key: 'JOY_BTN28',
      chord: '',
    },
  ]);

  const removed = bindings('throttle').flatMap((binding) => binding.removed.map((input) => ({
    command: binding.command,
    key: input.key,
    chord: input.reformers.join('+'),
  })));
  assert.ok(removed.some(({ command, key, chord }) => (
    command === 'd3041pnilunilcd22vd0vpnilvunil' && key === 'JOY_BTN26' && chord === ''
  )), 'inherited generic autopilot toggle must be removed from JOY_BTN26');
  assert.ok(removed.some(({ command, key, chord }) => (
    command === 'd3037pnilu3037cd22vd1vpnilvu0' && key === 'JOY_BTN27' && chord === ''
  )), 'inherited VEC/PCD binding must be removed before assigning Ground Track');
});

test('VKB grip preserves UI-layer VR recenter while keeping autopilot controls accessible', () => {
  assert.deepEqual(targetAssignments('grip', ['JOY_BTN3', 'JOY_BTN6']), [
    {
      command: 'd3078pnilu3078cd57vd1vpnilvu0',
      name: 'Store Release',
      key: 'JOY_BTN3',
      chord: '',
    },
    {
      command: 'd3085pnilu3085cd57vd1vpnilvu0',
      name: 'Autopilot Reference / Nosewheel Steering Toggle',
      key: 'JOY_BTN3',
      chord: 'JOY_BTN7',
    },
    {
      command: 'd3086pnilu3086cd22vd1vpnilvu0',
      name: 'Autopilot Emergency Disconnect Paddle',
      key: 'JOY_BTN6',
      chord: '',
    },
  ]);
  assert.equal(assignments('grip').some(({ key }) => key === 'JOY_BTN7'), false);
  assert.equal(
    assignments('grip').some(({ key, chord }) => key === 'JOY_BTN6' && chord === 'JOY_BTN7'),
    false,
    'JOY_BTN7 + JOY_BTN6 is reserved for UI-layer VR recenter',
  );
  const removed = bindings('grip').flatMap((binding) => binding.removed.map((input) => ({
    command: binding.command,
    key: input.key,
    chord: input.reformers.join('+'),
  })));
  assert.ok(removed.some(({ command, key, chord }) => (
    command === 'd3085pnilu3085cd57vd1vpnilvu0' && key === 'JOY_BTN7' && chord === ''
  )), 'inherited A/P REF/NWS must be removed from the JOY_BTN7 modifier');
});

test('DCS-Common resolves base and BTN7 labels on shared hardware callouts', () => {
  const config = loadProfileDrivenConfig('config/kneeboard.json', { consumerRoot: root, commonRoot });
  const throttle = config.pages.find(({ deviceId }) => deviceId === 'tm-warthog-throttle');
  const grip = config.pages.find(({ deviceId }) => deviceId === 'vkb-f14-gunfighter');

  assert.deepEqual(throttle.labels['warthog-thr-ap-select-up'].map(({ fullLabel }) => fullLabel), [
    'BASE — Heading Hold GT, else Off',
    'BTN7 — Autopilot Vector VEC/PCD, else Off',
  ]);
  assert.deepEqual(grip.labels['vkb-btn-release'].map(({ fullLabel }) => fullLabel), [
    'BASE — Store Release',
    'BTN7 — Autopilot Reference / Nosewheel Steering Toggle',
  ]);
  assert.equal(grip.labels['vkb-paddle'], 'Autopilot Emergency Disconnect Paddle');
  assert.equal(config.modifierCatalog.JOY_BTN7.mode, 'hold');
  assert.equal(config.modifierCatalog.JOY_BTN7.key, 'JOY_BTN7');
});
