import assert from 'node:assert/strict';
import { getNextVersion, resolvePackageVersion } from './version.mjs';

assert.equal(getNextVersion('1.2.0', 'patch'), '1.2.1');
assert.equal(getNextVersion('1.2.0', 'minor'), '1.3.0');
assert.equal(getNextVersion('1.2.0', 'major'), '2.0.0');
assert.equal(getNextVersion('0.0.0', 'patch'), '0.0.1');
assert.throws(() => getNextVersion('v1.2.0', 'patch'));
assert.throws(() => getNextVersion('1.2.0', 'banana'));

assert.equal(resolvePackageVersion(''), '0.0.0-local');
assert.equal(resolvePackageVersion('1.2.3-beta.1+sha.abcdef'), '1.2.3-beta.1+sha.abcdef');
assert.throws(() => resolvePackageVersion('v1.2.3'));

console.log('Semantic version tests passed.');
