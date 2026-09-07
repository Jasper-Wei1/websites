import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { projectCases } from '../src/project-cases.js';

const source = name => readFileSync(new URL('../src/' + name, import.meta.url), 'utf8');
test('shared scale owns editorial sizes with explicit mobile roles', () => {
  const css = source('type-system.css');
  for (const [role, desktop, mobile] of [['section',72,40],['detail',48,30],['card',40,32],['intro',24,20],['body',18,16]]) {
    assert.match(css, new RegExp('--type-' + role + ': ' + desktop + 'px'));
    assert.match(css, new RegExp('--type-' + role + ': ' + mobile + 'px'));
  }
  assert.match(css, /--type-action: 16px/);
  assert.match(css, /--type-meta: 12px/);
  assert.match(css, /--reading-width: 720px/);
  assert.match(css, /100vw - 1200px/);
  assert.ok(source('main.jsx').indexOf('type-system.css') > source('main.jsx').indexOf('work-pages.css'));
  assert.doesNotMatch(css, /\.wordmark\s*\{|\.case-title-row h1\s*\{/);
});

test('smooth and native anchors share CSS margins and header clearance', () => {
  const motion = source('usePageMotion.js');
  assert.match(motion, /getComputedStyle\(target\)\.scrollMarginTop/);
  assert.doesNotMatch(motion, /: -170/);
  assert.ok(motion.indexOf('dataset.header =') < motion.indexOf('if (!hero) return'));
  assert.match(source('type-system.css'), /#overview, #workflow, #decisions \{ scroll-margin-top: calc\(var\(--header-clearance\) \+ var\(--index-height\) \+ 24px\)/);
});

test('paragraph boundaries are authored and prototype limitations remain prominent', () => {
  assert.match(source('EditorialCopy.jsx'), /text\.split\('\\n\\n'\)/);
  for (const project of projectCases) {
    assert.ok(project.explanation.includes('\n\n'));
    assert.ok(project.boundary.includes('\n\n'));
  }
  const kosx = projectCases.find(project => project.number === '003');
  assert.match(kosx.boundary, /本地模拟/);
  assert.match(kosx.boundary, /真实文件存储 通知 权限与多人协作尚未验证/);
  assert.match(kosx.boundary, /不代表已经上线或产生业务成果/);
  assert.match(source('ProjectCase.jsx'), /className="project-boundary"><Paragraphs/);
});
