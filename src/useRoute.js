import { useEffect, useState } from 'react';

export function useRoute() {
  const [route, setRoute] = useState(window.location.pathname);
  useEffect(() => {
    let timer;
    const navigate = (url, push) => {
      clearTimeout(timer);
      document.documentElement.classList.add('route-leaving');
      timer = setTimeout(() => {
        if (push) history.pushState({}, '', url.pathname + url.hash);
        setRoute(url.pathname);
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.documentElement.classList.remove('route-leaving');
      }, matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduced' ? 0 : 240);
    };
    const click = event => {
      const link = event.target.closest('a[href]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      event.preventDefault(); navigate(url, true);
    };
    const pop = () => {
      const url = new URL(location.href);
      // Hash history must not re-enter the current page or reset it to the top.
      if (document.querySelector('main')?.dataset.route === url.pathname) {
        const target = document.getElementById(url.hash.slice(1));
        if (target) target.scrollIntoView({ behavior: 'instant' });
        else window.scrollTo({ top: 0, behavior: 'instant' });
      } else navigate(url, false);
    };
    document.addEventListener('click', click); window.addEventListener('popstate', pop);
    return () => { clearTimeout(timer); document.documentElement.classList.remove('route-leaving'); document.removeEventListener('click', click); window.removeEventListener('popstate', pop); };
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      const target = document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
      if (document.activeElement === document.body) document.querySelector('main')?.focus({ preventScroll: true });
    }, 50);
    return () => clearTimeout(timer);
  }, [route]);
  return route;
}
