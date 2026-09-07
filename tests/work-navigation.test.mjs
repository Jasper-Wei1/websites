import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { projectCases } from '../src/project-cases.js';

const source = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const work = source('../src/WorkPages.jsx');
const app = source('../src/App.jsx');

test('footer omits manual motion controls while retaining system reduced motion', () => {
  assert.doesNotMatch(app, /motion-control|setPaused|暂停动效|播放动效/);
  assert.match(app, /prefers-reduced-motion: reduce/);
  assert.match(app, /usePageMotion\(reduced, route\)/);
  assert.match(app, /<WaveLight paused=\{reduced\}/);
  assert.match(app, /dataset\.motion = reduced \? 'reduced' : 'full'/);
});

test('hero identity and shared local clock represent Jasper in Shenzhen', () => {
  assert.match(app, /hero-meta"><span>Jasper Wei · Personal website<\/span>/);
  assert.match(app, /const timeAndPlace = \[time, 'Shenzhen, China'\]/);
  assert.match(app, /className="time-label">\{timeAndPlace\}/);
  assert.match(app, /className="footer-time">\{timeAndPlace\}/);
  assert.match(app, /timeZone: 'Asia\/Shanghai'/);
  assert.doesNotMatch(app, /GMT\+8/);
  assert.match(app, /about-copy[\s\S]*AI Innovation Consultant/);
});

test('expanded navigation is text-only and follows the four-section homepage order', () => {
  const menu = app.split('function Menu()')[1].split('export function App()')[0];
  assert.doesNotMatch(menu, /<img|thermal-field|jasper-original/);
  const labels = ['Home', 'About me', 'Work', 'Photography'];
  for (const label of labels) assert.ok(menu.includes(label));
  assert.deepEqual(labels.map(label => menu.indexOf("['" + label + "'")), labels.map(label => menu.indexOf("['" + label + "'")).sort((a, b) => a - b));
  assert.match(menu, /\/#photography/);
  assert.match(menu, /aria-expanded=\{open\}/);
  assert.match(menu, /setOpen\(false\)/);
});

test('photography is a real homepage section after work and appears in the footer', () => {
  const positions = ['id="home"', 'id="about"', '<HomeWork ', 'id="photography"'].map(marker => app.indexOf(marker));
  assert.ok(positions.every(position => position >= 0));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.match(app, /id="photography"[\s\S]*jasper-original\.jpg/);
  assert.match(app.split('<footer')[1], /Home<\/a>[\s\S]*About me<\/a>[\s\S]*Work<\/a>[\s\S]*Photography<\/a>/);
});

test('project card actions stay at the bottom with a single-column mobile layout', () => {
  const css = source('../src/work-pages.css');
  assert.match(css, /\.work-card \{[^}]*display:flex;[^}]*flex-direction:column;/);
  assert.match(css, /\.work-card-bottom \{[^}]*margin-top:auto;/);
  assert.match(css, /@media\(max-width:640px\)[\s\S]*\.work-grid\{grid-template-columns:1fr;/);
  assert.match(css, /\.work-card:focus-visible/);
  assert.match(css, /prefers-reduced-motion:reduce/);
});

test('editorial copy omits Chinese punctuation while functional punctuation remains', () => {
  for (const path of ['../src/App.jsx', '../src/WorkPages.jsx', '../src/LivestreamCase.jsx', '../src/ProjectCase.jsx', '../src/project-cases.js']) {
    assert.doesNotMatch(source(path), /[，。！？；：「」“”、]/);
  }
  assert.match(app, /https:\/\/x\.com\/Jasper_Wei1/);
  assert.match(app, /mailto:/);
  assert.match(source('../src/LivestreamCase.jsx'), /Whisper\.cpp/);
  assert.match(source('../src/project-cases.js'), /2026\.07/);
});

test('homepage has a single topic portal instead of project cards or a build log', () => {
  const home = work.split('export function HomeWork')[1].split('export function WorkIndex')[0];
  assert.equal((home.match(/<a /g) || []).length, 1);
  assert.match(home, /href=\{workPath\}/);
  assert.doesNotMatch(home, /\.map\(|BUILD LOG|work-card/);
  assert.match(app, /<HomeWork /);
  assert.doesNotMatch(app, /SelectedWork|BUILD LOG/);
});

test('the project index owns all three unique detail links', () => {
  assert.match(work, /export const workPath = '\/work'/);
  assert.match(work, /workItems\.map\(project/);
  assert.match(work, /href=\{project.path\}/);
  const paths = ['/work/livestream-clipping', ...projectCases.map(project => project.path)];
  assert.equal(new Set(paths).size, 3);
  assert.match(app, /<WorkIndex /);
});

test('detail back links return to the index and the index returns to homepage work', () => {
  for (const path of ['../src/LivestreamCase.jsx', '../src/ProjectCase.jsx']) {
    assert.match(source(path), /href="\/work"[^>]*>[\s\S]*?所有项目/);
  }
  assert.match(work, /href="\/#work"[^>]*>[\s\S]*?返回首页/);
});
