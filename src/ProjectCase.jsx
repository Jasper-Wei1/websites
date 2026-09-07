import { useState } from 'react';
import { ArrowDown, ArrowUpRight, ArrowLeft, Plus, Minus } from '@phosphor-icons/react';

import { HeadingLines as Lines, Paragraphs } from './EditorialCopy.jsx';

// New projects reuse the accepted single-opener livestream anatomy and CSS/motion.
export function ProjectCase({ project, Reveal }) {
  const [step, setStep] = useState(0);
  const [openDecision, setOpenDecision] = useState(0);
  const current = project.steps[step];
  return<>
<div className="case-hero-scroll" id="page-top"><section className="case-hero project-background">
<a href="/work" className="quiet-link case-back"><ArrowLeft size={16} /> 所有项目</a>
<div className="case-title-row"><h1>{project.title[0]}<br /><span>{project.title[1]}</span></h1><div><span className="eyebrow">{project.label}</span><p><Lines lines={project.promise} /></p><a href="#overview" className="quiet-link">Explore the project<ArrowDown size={16} /></a></div></div>
<div className="case-meta"><div><span>ROLE</span><p>{project.role}</p></div><div><span>FOCUS</span><p>{project.focus}</p></div><div><span>SINCE</span><p>{project.since}</p></div><div><span>STATUS</span><p><i />{project.status}</p></div></div>
</section></div>
<div className="case-body foreground-sheet">
<nav className="case-index" aria-label="项目目录"><span>{project.number} / {project.label}</span><div><a href="#overview">概览</a><a href="#workflow">流程</a><a href="#decisions">取舍</a></div></nav>
<section id="overview" className="case-section"><Reveal><span className="eyebrow">01  THE QUESTION</span></Reveal><div><Reveal><h2><Lines lines={project.overview} /></h2><Paragraphs className="case-lead" text={project.lead} /><Paragraphs text={project.explanation} /><div className="project-boundary"><Paragraphs text={project.boundary} /></div>{project.repo &&<a className="quiet-link project-source" href={project.repo} target="_blank" rel="noopener noreferrer">查看 Skill 仓库<ArrowUpRight size={17} /></a>}</Reveal></div></section>
<section id="workflow" className="workflow-section"><Reveal><div className="section-heading"><div><span className="eyebrow">02  THE WORKFLOW</span><h2><Lines lines={project.workflowTitle} /></h2></div><p><Lines lines={project.workflowNote} /></p></div></Reveal>
<div className="workflow-tabs" role="tablist" aria-label="工作流四个阶段">{project.steps.map(([title], index) =><button key={title} role="tab" id={'step-tab-' + index} aria-controls="step-panel" aria-selected={step === index} tabIndex={step === index ? 0 : -1} onClick={() => setStep(index)} onKeyDown={event => { const next = event.key === 'ArrowRight' ? (index + 1) % 4 : event.key === 'ArrowLeft' ? (index + 3) % 4 : event.key === 'Home' ? 0 : event.key === 'End' ? 3 : null; if (next !== null) { event.preventDefault(); setStep(next); document.getElementById('step-tab-' + next)?.focus(); } }}><span>0{index + 1}</span>{title}<ArrowUpRight size={18} /></button>)}</div>
<div className="workflow-panel" id="step-panel" role="tabpanel" aria-labelledby={'step-tab-' + step} tabIndex={0}><span className="step-number" aria-hidden="true">0{step + 1}</span><div key={step} className="step-copy"><span className="eyebrow">{current[1]}</span><h3>{current[0]}</h3><Paragraphs text={current[2]} /><span className="step-principle">{current[3]}</span></div></div>
</section>
<section id="decisions" className="case-section"><Reveal><span className="eyebrow">03  DESIGN DECISIONS</span></Reveal><div><Reveal><h2><Lines lines={project.decisionsTitle} /></h2></Reveal><div className="decision-list">{project.decisions.map(([title, body], index) =><div className="decision" key={title}><h3><button aria-expanded={openDecision === index} aria-controls={'decision-' + index} onClick={() => setOpenDecision(openDecision === index ? -1 : index)}><span><small>0{index + 1}</small>{title}</span>{openDecision === index ?<Minus size={20} /> :<Plus size={20} />}</button></h3><div className={'decision-body' + (openDecision === index ? ' expanded' : '')} id={'decision-' + index} inert={openDecision !== index} aria-hidden={openDecision !== index}><div><Paragraphs text={body} /></div></div></div>)}</div></div></section>
</div>
</>;
}
