import { useState } from 'react';
import { HeadingLines, Paragraphs } from './EditorialCopy.jsx';
import { ArrowDown, ArrowUpRight, ArrowLeft, Plus, Minus } from '@phosphor-icons/react';

export const casePath = '/work/livestream-clipping';
export const articlePath = '/writing/livestream-clipping';
const original = 'https://x.com/Jasper_Wei1/status/2079229671624134680';
const steps = [
  ['01', '看完整场', '转录与全时间轴分析', '先把直播变成带时间码的逐字稿 再沿完整时间轴分析\n\n保留评分依据和淘汰原因 让没有选中也有迹可循', 'AI 负责整理信息 人能回看每一个判断'],
  ['02', '选出值得留下的', '候选选择与切点确认', '候选按主题与时间重叠去重 人决定留下哪些片段\n\n核对起止点是否切断原意 确认后锁定连续的源区间', '不是分数越高 就一定值得发布'],
  ['03', '把意思表达清楚', '画面 字幕与标题', '在预览里核对竖屏裁切 字幕和标题 保留识别原文与修改依据\n\n避免画面遮挡 字幕误写或标题夸大', '每一层确认只批准当前结果'],
  ['04', '形成可复用的流程', '预览 确认与渲染', '由 Remotion 沿同一时间轴驱动原片 原声和字幕 把确认过的决定交给渲染\n\n把规则和记录留下 供下一次复用', '自动执行重复工作 保留人的内容判断'],
];

export function LivestreamCase({ Reveal }) {
  const [step, setStep] = useState(0);
  const [openDecision, setOpenDecision] = useState(0);
  const decisions = [
    ['先证明看全了 再讨论选得好', '第一版只评估了预选的五段 结果看起来完整 实际上漏掉了大量内容\n\n后来增加全时间轴覆盖和淘汰记录 先检查评估范围 再比较候选质量'],
    ['保留连续原片 不重新拼出一个意思', '切点会影响语义 每条切片使用确认过的连续源区间\n\n原片 原声和字幕遵循同一条基准时间轴 不靠重排原话制造更强的开场'],
    ['让确认发生在工作台 而不是散落在聊天里', '候选 范围 画面字幕 标题都有各自的确认步骤\n\n修改上游决定后 需要重新核对受影响的下游结果 避免沿用已经失效的批准'],
  ];
  return<>
<div className="case-hero-scroll" id="page-top"><section className="case-hero project-background">
<a href="/work" className="quiet-link case-back"><ArrowLeft size={16} /> 所有项目</a>
<div className="case-title-row"><h1>直播切片<br /><span>工作流</span></h1><div><span className="eyebrow">LIVE → CLIPS</span><p>让 AI 处理重复工作<br />把内容判断留给人</p><a href="#overview" className="quiet-link">Explore the project<ArrowDown size={16} /></a></div></div>
<div className="case-meta"><div><span>ROLE</span><p>产品设计 / 工作流开发</p></div><div><span>FOCUS</span><p>AI  视频生产  人机协作</p></div><div><span>SINCE</span><p>2026.07</p></div><div><span>STATUS</span><p><i /> 持续迭代</p></div></div>
</section></div>
<div className="case-body foreground-sheet">
<nav className="case-index" aria-label="项目目录"><span>001 / LIVESTREAM CLIPPING</span><div><a href="#overview">概览</a><a href="#workflow">流程</a><a href="#decisions">取舍</a></div></nav>
<section id="overview" className="case-section"><Reveal><span className="eyebrow">01  THE QUESTION</span></Reveal><div><Reveal><h2><HeadingLines lines={['不是帮我剪五条', '而是把整场直播\n看明白']} /></h2><p className="case-lead">一场直播很长 有价值的内容散落其中<br />只给几个高分片段 我仍然不知道</p><p className="case-lead">它看完了吗 为什么选这段<br />切掉上下文以后 意思还成立吗</p><p>我想做的是一条能回头检查的生产流程 从转录 分析到切点与画面确认 每一步都留下依据</p><p>它既要减少重复操作 也要让最终发布的人保有判断权</p></Reveal></div></section>
<section id="workflow" className="workflow-section"><Reveal><div className="section-heading"><div><span className="eyebrow">02  THE WORKFLOW</span><h2>AI 往前推<br />人把关键关</h2></div><p>四个阶段 一条源时间轴<br />点选步骤 了解人和 AI 如何协作</p></div></Reveal>
<div className="workflow-tabs" role="tablist" aria-label="工作流四个阶段">{steps.map(([number, title], index) =><button key={number} role="tab" id={'step-tab-' + index} aria-controls="step-panel" aria-selected={step === index} tabIndex={step === index ? 0 : -1} onClick={() => setStep(index)} onKeyDown={event => { const next = event.key === 'ArrowRight' ? (index + 1) % 4 : event.key === 'ArrowLeft' ? (index + 3) % 4 : event.key === 'Home' ? 0 : event.key === 'End' ? 3 : null; if (next !== null) { event.preventDefault(); setStep(next); document.getElementById('step-tab-' + next)?.focus(); } }}><span>{number}</span>{title}<ArrowUpRight size={18} /></button>)}</div>
<div className="workflow-panel" id="step-panel" role="tabpanel" aria-labelledby={'step-tab-' + step} tabIndex={0}><span className="step-number" aria-hidden="true">{steps[step][0]}</span><div key={step} className="step-copy"><span className="eyebrow">{steps[step][2]}</span><h3>{steps[step][1]}</h3><Paragraphs text={steps[step][3]} /><span className="step-principle">{steps[step][4]}</span></div></div>
</section>
<section id="decisions" className="case-section"><Reveal><span className="eyebrow">03  DESIGN DECISIONS</span></Reveal><div><Reveal><h2>做这个工具时<br />我选择守住什么</h2></Reveal><div className="decision-list">{decisions.map(([title, body], index) =><div className="decision" key={title}><h3><button aria-expanded={openDecision === index} aria-controls={'decision-' + index} onClick={() => setOpenDecision(openDecision === index ? -1 : index)}><span><small>0{index + 1}</small>{title}</span>{openDecision === index ?<Minus size={20} /> :<Plus size={20} />}</button></h3><div className={'decision-body' + (openDecision === index ? ' expanded' : '')} id={'decision-' + index} inert={openDecision !== index} aria-hidden={openDecision !== index}><div><Paragraphs text={body} /></div></div></div>)}</div></div></section>
</div>
</>;
}

export function LivestreamArticle({ Reveal }) {
  return<article id="page-top" className="build-log foreground-sheet">
<header className="article-header"><a href={casePath} className="quiet-link"><ArrowLeft size={16} /> 返回直播切片项目</a><div className="eyebrow">BUILD LOG  2026.07.20  JASPER</div><h1>把剪切片<br />变成一条生产线</h1><p>用 Codex + Remotion 实现直播切片自动化<br />以及我为什么没有把它做成一键出片</p><a href={original} target="_blank" rel="noopener noreferrer" className="quiet-link">阅读 X 原文<ArrowUpRight size={16} /></a></header>
<div className="article-content"><p className="article-intro">直播切片不是让 AI 从逐字稿里挑五个高分段落 而是把整场直播变成一套覆盖完整时间轴 判断可追溯 关键结果由人确认的制作流程</p>
<h2>第一版 我就踩了一个坑</h2><p>最初做 Demo 时 我让 Agent 挑选精彩片段 它给出了五个结果 看起来已经完成任务</p><p>但复核后我发现 它并没有遍历完整时间轴 而是只在预选的五个子区间里继续筛选</p><p>结果完整 不等于检查完整 大量内容没有进入评估范围 评分再精细也解决不了漏看的问题</p><p>修改后 工作流开始覆盖完整时间轴 在那条 55 分 04 秒的历史样本里 粗筛得到 33 个区间 按主题和时间重叠去重后保留 20 个候选</p><p>这是候选分析的结果 并不意味着生成了 20 条成片</p>
<blockquote>AI 给出的答案看起来再完整<br />也不等于它真正检查了全部内容</blockquote>
<h2>先确定一条不变的时间轴</h2><p>传统剪辑依靠时间轴 AI 剪辑也一样 对于口播和直播 基准就是原片与原始音频</p><p>转录 候选和字幕都需要回到这个基准 才能知道每句话从哪里来 切点是否正确</p><p>当时的版本用 Whisper.cpp 生成带时间码的逐字稿 Agent 负责理解内容 评分并推荐候选 人批准内容 切点 视觉和标题 Remotion 负责预览与渲染</p><p>后续的本地语音识别方案继续迭代 但同一源时间轴这条原则没有变</p>
<h2>把精彩拆成能检查的规则</h2><p>只说找精彩片段太模糊 我把判断拆成六个维度 并要求留下评分依据 这是一组针对当时口播样本的权重 不是通用于所有视频的标准</p>
<table><caption className="sr-only">历史口播样本评分权重</caption><thead><tr><th scope="col">维度</th><th scope="col">权重</th></tr></thead><tbody>{[['内容完整度',30],['信息价值',20],['开头吸引力',20],['情绪与表达',10],['可剪辑性',10],['平台适配度',10]].map(([label, value]) =><tr key={label}><th scope="row">{label}</th><td>{value}%</td></tr>)}</tbody></table>
<h2>为什么我仍然保留人工确认</h2><p>切点可能改变一句话的意思 竖屏裁切可能遮住重要信息 标题也可能把内容夸大 分数可以帮助筛选 却不能代替最终判断</p><p>所以 AI 先给候选 人决定取舍 范围确认后 再核对画面 字幕和标题</p><p>自动化真正替我做的是转录 扫描 整理 记录和渲染 而不是替我决定什么值得发布</p>
<h2>工具的价值 在下一次使用里</h2><p>做完一次剪辑 还需要把可复用的规则留下 时间轴 审计和确认机制可以固定 裁切 字幕 节奏与模板则应该随内容调整</p><p>我更在意的不是让流程看起来一步到位 而是下一次处理新内容时 仍然知道每个结果怎么来的 哪里需要人看一眼</p><div className="article-endnote">站内编辑版 根据 2026.07.20 的 X 长文与本地草稿重新编排 历史实践与当前项目状态分开陈述 未收录私人反馈截图</div>
<a href={casePath} className="contact-pill">回到项目概览<ArrowUpRight size={18} /></a>
</div>
</article>;
}
