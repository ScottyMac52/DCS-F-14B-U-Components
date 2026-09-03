import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

test('build:kneeboard produces summary, source SVG, and PNG folders', () => {
  const result = spawnSync('npm', ['run', 'build:kneeboard'], {
    cwd: root,
    encoding: 'utf8',
    shell: true,
    env: process.env,
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  const sourceDir = join(root, 'kneeboard', 'source');
  const pngRoot = join(root, 'kneeboard');
  assert.ok(existsSync(sourceDir));

  const dirs = readdirSync(pngRoot).filter((name) => name !== 'source');
  assert.ok(dirs.length >= 1, 'expected a kneeboard PNG folder');

  const pngDir = join(pngRoot, dirs[0]);
  const pngNames = readdirSync(pngDir).filter((name) => name.endsWith('.png'));
  assert.ok(pngNames.includes('00-F14BU-CONTROL-OVERVIEW.png'), 'expected F-14B(U) control overview summary page');
  assert.ok(pngNames.includes('01-VAICOM-OVERVIEW.png'), 'expected VAICOM/Warthog summary page');

  assert.ok(existsSync(join(sourceDir, '00-F14BU-CONTROL-OVERVIEW.svg')));
  assert.ok(existsSync(join(sourceDir, '01-VAICOM-OVERVIEW.svg')));
});
