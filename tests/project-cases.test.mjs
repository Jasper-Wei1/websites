import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { projectCases } from '../src/project-cases.js';

test('two additional projects have unique routes and complete template content', () => {
  assert.equal(projectCases.length, 2);
  assert.equal(new Set(projectCases.map(p => p.path)).size, 2);
  for (const project of projectCases) {
    assert.ok(project.path.startsWith('/work/'));
    for (const field of ['name', 'role', 'focus', 'since', 'status', 'lead', 'explanation', 'boundary']) assert.ok(project[field]);
    for (const field of ['title', 'promise', 'cover', 'overview', 'workflowTitle', 'workflowNote', 'decisionsTitle']) assert.equal(project[field].length, 2);
    assert.equal(project.steps.length, 4);
    assert.equal(project.decisions.length, 3);
    for (const step of project.steps) assert.equal(step.length, 4);
  }
});

test('prototype boundaries remain visible without private demo links or identities', () => {
  const kosx = projectCases.find(p => p.path.includes('ai-native'));
  assert.match(kosx.status, /本地原型/);
  assert.match(kosx.boundary, /本地模拟/);
  assert.equal(kosx.repo, undefined);
  assert.doesNotMatch(JSON.stringify(projectCases), /Vegas|可可鸭|file:\/\/|\/Users\//);
});

test('new detail template keeps the approved single-opener structure', () => {
  const page = readFileSync(new URL('../src/ProjectCase.jsx', import.meta.url), 'utf8');
  assert.equal((page.match(/<h1>/g) || []).length, 1);
  assert.match(page, /case-hero project-background/);
  assert.doesNotMatch(page, /clip-cover|BUILDING IN PUBLIC|BEHIND THE BUILD/);
  for (const id of ['overview', 'workflow', 'decisions']) {
    assert.ok(page.includes(`id="${id}"`));
    assert.ok(page.includes(`href="#${id}"`));
  }
});
