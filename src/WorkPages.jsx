import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react';
import { projectCases } from './project-cases.js';

export const workPath = '/work';
export const workItems = [
  { path: '/work/livestream-clipping', number: '001', name: '直播切片工作流', title: ['直播切片', '工作流'], tag: 'AI WORKFLOW', status: '持续迭代', summary: 'AI 提出候选 人确认关键结果 ' },
  ...projectCases,
];

export function HomeWork({ Reveal }) {
  return<section id="work" className="selected-work foreground-sheet" aria-labelledby="home-work-title">
<Reveal><a className="work-portal project-background" href={workPath}>
<div className="work-portal-meta"><span className="eyebrow">02  WORK</span><span>{String(workItems.length).padStart(2, '0')} PROJECTS</span></div>
<div><h2 id="home-work-title">我的项目</h2><p>从一个具体问题开始<br />把 AI 的想法 做成可以使用的工具</p></div>
<div className="work-portal-bottom"><span>AI 工作流 / Agent Skills / 项目管理</span><span className="quiet-link">浏览项目<ArrowUpRight size={22} /></span></div>
</a></Reveal>
</section>;
}

export function WorkIndex({ Reveal }) {
  return<section id="page-top" className="work-index-page project-background" aria-labelledby="work-index-title">
<a href="/#work" className="quiet-link case-back"><ArrowLeft size={16} /> 返回首页</a>
<Reveal><div className="section-heading work-index-heading"><div><span className="eyebrow">WORK / {String(workItems.length).padStart(2, '0')} PROJECTS</span><h1 id="work-index-title">做过的事<br /><span>还在继续探索</span></h1></div><p>从一个具体问题开始<br />把想法做成可以使用的东西</p></div></Reveal>
<div className="work-grid">{workItems.map(project =><Reveal key={project.path}><a className="work-card" href={project.path} aria-label={'查看' + project.name + '项目'}>
<div className="work-card-meta"><span>{project.number}</span><span>{project.tag}</span></div>
<h2>{project.title[0]}<br /><span>{project.title[1]}</span></h2>
<p className="work-card-summary">{project.summary}</p>
<div className="work-card-bottom"><span className="work-card-status">{project.status}</span><span className="work-card-cta">查看项目<ArrowUpRight size={18} /></span></div>
</a></Reveal>)}</div>
</section>;
}
