import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, ArrowUp, SquaresFour, StarFour, Copy, Check } from '@phosphor-icons/react';
import '@fontsource/anton/latin-400.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-800.css';
import { WaveLight } from './WaveLight.jsx';
import { usePageMotion } from './usePageMotion.js';
import { useRoute } from './useRoute.js';
import { LivestreamCase, LivestreamArticle, casePath, articlePath } from './LivestreamCase.jsx';
import { HomeWork, WorkIndex, workPath } from './WorkPages.jsx';
import { projectCases } from './project-cases.js';
import { ProjectCase } from './ProjectCase.jsx';

const email = 'wpx0428@126.com';
const socials = [['X / Twitter', 'https://x.com/Jasper_Wei1'], ['GitHub', 'https://github.com/Jasper-Wei1'], ['Email', 'mailto:' + email]];
function ExternalLink({ href, children, ...props }) {
  return<a href={href} target={href.startsWith('https') ? '_blank' : undefined} rel={href.startsWith('https') ? 'noopener noreferrer' : undefined} {...props}>{children}</a>;
}
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }, { threshold: 0.12 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return<div ref={ref} className={'reveal ' + className} style={{ '--delay': delay + 's' }}>{children}</div>;
}
function Wordmark({ footer = false }) {
  const box = useRef(null), text = useRef(null);
  useEffect(() => {
    let live = true;
    const fit = () => {
      if (!live || !text.current) return;
      text.current.style.transform = 'none';
      text.current.style.transform = 'scaleX(' + box.current.clientWidth / text.current.getBoundingClientRect().width + ')';
    };
    const observer = new ResizeObserver(fit);
    observer.observe(box.current);
    document.fonts.ready.then(fit);
    return () => { live = false; observer.disconnect(); };
  }, []);
  const Tag = footer ? 'div' : 'h1';
  return<div className={'wordmark-box' + (footer ? ' footer-wordmark' : '')} ref={box}><Tag className="wordmark" ref={text} aria-label={footer ? undefined : 'Jasper Wei'} aria-hidden={footer || undefined}>JASPER</Tag></div>;
}
function Menu() {
  const [open, setOpen] = useState(false);
  const root = useRef(null), trigger = useRef(null), timer = useRef(null);
  const clearTimer = () => clearTimeout(timer.current);
  useEffect(() => {
    const outside = event => { if (!root.current.contains(event.target)) setOpen(false); };
    const escape = event => { if (event.key === 'Escape') { setOpen(false); trigger.current.focus(); } };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => { clearTimeout(timer.current); document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, []);
  return<div ref={root} className={'menu-shell' + (open ? ' open' : '')}
    onPointerEnter={event => { if (event.pointerType === 'mouse') { clearTimer(); timer.current = setTimeout(() => setOpen(true), 180); } }}
    onPointerLeave={event => { clearTimer(); if (event.pointerType === 'mouse' && !root.current.contains(document.activeElement)) timer.current = setTimeout(() => setOpen(false), 180); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
<button ref={trigger} className="menu-trigger" aria-label={open ? '关闭导航菜单' : '打开导航菜单'} aria-expanded={open} aria-controls="main-menu" onClick={() => { clearTimer(); setOpen(value => !value); }}>
<SquaresFour size={15} weight="fill" /><span className="menu-label"><span>Menu</span><span>Close</span></span><span className="menu-status">Always exploring</span>
</button>
<nav id="main-menu" aria-label="主导航" className="menu-body" inert={!open} aria-hidden={!open}>
      {[['Home', '首页', '/#home'], ['About me', '认识我', '/#about'], ['Work', '做过的事', workPath], ['Photography', '摄影', '/#photography']].map(([name, sub, href]) =>
<a className="menu-row" href={href} key={href} onClick={() => setOpen(false)}><span>{name}<small>{sub}</small></span></a>)}
<div className="menu-socials"><span>Elsewhere</span><div>{socials.map(([name, href]) =><ExternalLink key={name} href={href}>{name}<ArrowUpRight size={12} /></ExternalLink>)}</div></div>
</nav>
</div>;
}
export function App() {
  const route = useRoute();
  const isHome = route === '/', isWork = route === workPath, isCase = route === casePath, isArticle = route === articlePath;
  const project = projectCases.find(item => item.path === route);
  const [reduced, setReduced] = useState(false), [copied, setCopied] = useState(false), [time, setTime] = useState('');
  const timeAndPlace = [time, 'Shenzhen, China'].filter(Boolean).join(' · ');
  usePageMotion(reduced, route);
  useEffect(() => {
    document.title = project ? project.name + '  Jasper' : isWork ? '我的项目  Jasper' : isCase ? '直播切片工作流  Jasper' : isArticle ? '把剪切片变成一条生产线  Jasper' : 'Jasper Wei  Always exploring';
  }, [isCase, isArticle, project, isWork]);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    update(); preference.addEventListener('change', update);
    const tick = () => setTime(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Shanghai' }).format(new Date()));
    tick(); const interval = setInterval(tick, 30000);
    return () => { preference.removeEventListener('change', update); clearInterval(interval); };
  }, []);
  useEffect(() => { document.documentElement.dataset.motion = reduced ? 'reduced' : 'full'; }, [reduced]);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 2400); }
    catch { window.location.href = 'mailto:' + email; }
  };
  return<>
<a className="skip-link" href={isHome ? '#about' : '#main-content'}>跳到主要内容</a>
<header className="site-header"><a href="/#home" className="brand" aria-label="Jasper 首页">jasper</a><Menu key={route} /><a href="#contact" className="contact-pill" aria-label="联系 Jasper"><StarFour weight="fill" size={16} /><span>Say hello</span></a></header>
<main key={route} id="main-content" tabIndex={-1} className="route-content" data-route={route}>
      {isHome ?<>
<div className="hero-scroll" id="home"><section className="hero" aria-label="Jasper 的个人主页">
<div className="hero-meta"><span>Jasper Wei · Personal website</span><span className="time-label">{timeAndPlace}</span></div>
<div className="hero-statement"><p>Stay curious<br />Bring ideas to life</p><span>保持好奇 把想法变成现实</span></div>
<a href="#about" className="scroll-prompt">Scroll to explore<ArrowDown size={15} /></a>
<div className="hero-light" aria-hidden="true" /><Wordmark />
<WaveLight paused={reduced} />
</section></div>
<section id="about" className="about" aria-labelledby="about-title">
<Reveal><div className="eyebrow"><span>01  ABOUT ME</span><span>30 秒认识我</span></div><h2 id="about-title" className="about-heading"><span>把复杂的事理清</span><span>把 AI 的想法</span><span>变成真实的工具</span></h2></Reveal>
<div className="about-copy"><Reveal delay={0.08}><p><strong>你好 我是 Jasper</strong><br />前汽车工程师<br />现在是一名 <strong>AI Innovation Consultant</strong></p><p>我在做 AI 工作流 Agent Skills 和个人数字工具<br />也记录过程中值得分享的经验与思考</p></Reveal><Reveal delay={0.18}><p className="aside-copy">工作之外<br />我喜欢摄影</p><p className="aside-copy">想让你看看我正在做什么<br />以及我是怎样一个人</p></Reveal></div>
<Reveal className="now-block"><div className="eyebrow"><span><i /> NOW</span><span>SEPTEMBER 2026</span></div><p>正在迭代 KOSX AI Native 项目控制看板 也在继续完善直播切片工作流和 Agent Skills</p><ExternalLink href="https://x.com/Jasper_Wei1" className="quiet-link">在 X 看我的近况<ArrowUpRight size={17} /></ExternalLink></Reveal>
</section>
<HomeWork Reveal={Reveal} />
<section id="photography" className="about photography" aria-labelledby="photography-title">
<Reveal><span className="eyebrow">03 PHOTOGRAPHY / 摄影</span><h2 id="photography-title" className="photography-heading">也在生活里<br />寻找新的视角</h2></Reveal>
<Reveal className="personal-note"><figure><img src="/assets/jasper-original.jpg" alt="Jasper 在海边旅行时拍摄的个人照片" loading="lazy" width="1086" height="1448" /></figure><div><span className="note-caption">工程 AI 摄影<br />还有许多正在发生的事</span></div></Reveal>
</section>
</> : isWork ?<WorkIndex Reveal={Reveal} /> : isCase ?<LivestreamCase Reveal={Reveal} /> : project ?<ProjectCase project={project} Reveal={Reveal} /> : isArticle ?<LivestreamArticle Reveal={Reveal} /> :<section className="not-found"><h1>这里还没有内容</h1><a className="contact-pill" href="/">回到首页</a></section>}
</main>
<footer id="contact" className="footer">
<div className="footer-content"><div className="footer-invitation"><span className="footer-time">{timeAndPlace}</span><h2>Stay curious<br />Bring ideas to life</h2><a href={'mailto:' + email} className="contact-pill"><StarFour weight="fill" size={16} /><span>Say hello</span></a></div>
<div className="footer-links"><span>Explore</span><a href="/#home">Home</a><a href="/#about">About me</a><a href={workPath}>Work</a><a href="/#photography">Photography</a></div>
<div className="footer-links"><span>Socials</span>{socials.map(([name, href]) =><ExternalLink key={name} href={href}>{name}</ExternalLink>)}<button className="copy-email" onClick={copyEmail}>{copied ?<Check size={14} /> :<Copy size={14} />}{copied ? '邮箱已复制' : '复制邮箱'}</button><span className="sr-only" role="status">{copied ? '邮箱地址已复制' : ''}</span></div>
</div>
<div className="footer-meta"><span>© 2026 JASPER WEI<br />ALWAYS A WORK IN PROGRESS</span><a href={isHome ? '#home' : '#page-top'}>Back to top<ArrowUp size={14} /></a></div>
<Wordmark footer />
</footer>
<div className="bottom-blur" aria-hidden="true"><i /><i /><i /></div>
</>;
}
