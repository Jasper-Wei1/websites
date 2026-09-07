import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/case-study.css', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/LivestreamCase.jsx', import.meta.url), 'utf8');

test('project opener and reusable cover share the approved background', () => {
  const work = readFileSync(new URL('../src/WorkPages.jsx', import.meta.url), 'utf8');
  assert.match(work, /work-index-page project-background/);
  assert.doesNotMatch(work, /work-card[^"\n]*project-background/);
  assert.match(work, /work-portal project-background/);
  assert.match(page, /case-hero project-background/);
  assert.match(css, /radial-gradient/);
  assert.doesNotMatch(css, /url\(/);
  assert.doesNotMatch(page + css, /dark-warm-fade|clip-cover-art|hue-rotate/);
  assert.match(css, /\.project-background\s*\{[^}]*overflow: clip;[^}]*background: #050505;/);
});

test('case detail keeps one opener and only the requested sections', () => {
  const detail = page.split('export function LivestreamCase(')[1].split('export function LivestreamArticle(')[0];
  assert.match(detail, /case-hero project-background/);
  assert.doesNotMatch(detail, /<Cover|BUILDING IN PUBLIC|BEHIND THE BUILD|#evidence|id="evidence"/);
  for (const section of ['overview', 'workflow', 'decisions']) {
    assert.ok(detail.includes(`id="${section}"`));
    assert.ok(detail.includes(`href="#${section}"`));
  }
});
