import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { parallaxOffset } from './wave-field.js';

export function usePageMotion(still, route = '/') {
  useEffect(() => {
    const hero = document.querySelector('.hero, .case-hero'), shell = document.querySelector('.hero-scroll, .case-hero-scroll');
    const index = document.querySelector('.case-index');
    const narrow = matchMedia('(max-width: 640px)');
    let height = shell?.offsetHeight || 1, top = shell ? shell.getBoundingClientRect().top + window.scrollY : 0, request = 0;
    const update = () => {
      request = 0;
      document.documentElement.dataset.header = window.scrollY > 32 ? 'solid' : 'clear';
      if (index) index.dataset.pinned = index.getBoundingClientRect().top <= (parseFloat(getComputedStyle(index).top) || 0) + 32 ? 'true' : 'false';
      if (!hero) return;
      const offset = parallaxOffset(window.scrollY - top, height, still, narrow.matches);
      hero.style.transform = 'translate3d(0,' + offset.toFixed(2) + 'px,0)';
    };
    const onScroll = () => { if (!request) request = requestAnimationFrame(update); };
    const resize = new ResizeObserver(() => { height = shell.offsetHeight; top = shell.getBoundingClientRect().top + window.scrollY; update(); });
    if (shell) resize.observe(shell);
    window.addEventListener('scroll', onScroll, { passive: true }); update();
    const lenis = still ? null : new Lenis({
      autoRaf: true, smoothWheel: true, lerp: 0.085, syncTouch: false,
      anchors: false, prevent: node => node.classList?.contains('menu-shell'),
    });
    const anchorClick = event => {
      const link = event.target.closest('a[href]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(url.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      history.pushState({}, '', url.hash);
      const offset = -(parseFloat(getComputedStyle(target).scrollMarginTop) || 0);
      if (lenis) lenis.scrollTo(target, { offset });
      else window.scrollTo({ top: Math.max(0, window.scrollY + target.getBoundingClientRect().top + offset), behavior: 'instant' });
    };
    document.addEventListener('click', anchorClick);
    if (lenis) document.documentElement.dataset.scroll = 'smooth';
    else document.documentElement.dataset.scroll = 'native';
    return () => {
      lenis?.destroy(); resize.disconnect(); cancelAnimationFrame(request);
      document.removeEventListener('click', anchorClick);
      window.removeEventListener('scroll', onScroll); if (hero) hero.style.transform = '';
      delete document.documentElement.dataset.scroll;
      delete document.documentElement.dataset.header;
    };
  }, [still, route]);
}
