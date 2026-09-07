import test from 'node:test';
import assert from 'node:assert/strict';
import { waveHeight, parallaxOffset, fragmentShader } from '../src/wave-field.js';

test('wave changes curvature and local brightness boundary over time', () => {
  const samples = [0.1, 0.3, 0.5, 0.7, 0.9];
  const change = samples.map(x => waveHeight(x, 4) - waveHeight(x, 0));
  assert.ok(Math.max(...change) - Math.min(...change) > 0.1);
  const curvature = t => waveHeight(0.3, t) - 2 * waveHeight(0.5, t) + waveHeight(0.7, t);
  // Two isolated times can coincidentally have similar curvature; test a cycle.
  const curvatures = [0, 2, 4, 6, 8, 10].map(curvature);
  assert.ok(Math.max(...curvatures) - Math.min(...curvatures) > 0.3);
  assert.ok(fragmentShader.includes('u_time'));
  assert.ok(!fragmentShader.includes('thermal-field'));
});
test('foreground advances faster than the hero during overlap', () => {
  assert.equal(parallaxOffset(400, 800), 160);
  assert.equal(-400 + parallaxOffset(400, 800), -240);
  assert.equal(parallaxOffset(900, 800), 320);
  assert.equal(parallaxOffset(-30, 800), 0);
});
test('reduced motion removes parallax, mobile has gentler depth', () => {
  assert.equal(parallaxOffset(400, 800, true), 0);
  assert.equal(parallaxOffset(400, 800, false, true), 96);
});
