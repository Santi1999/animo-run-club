import {useEffect, useLayoutEffect} from 'react';

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Fades in any `[data-reveal]` element the first time it scrolls into view.
 * Elements stay visible until JS runs (`reveal-ready` is added on the client),
 * so there's no hidden content without JS. Also watches for elements added
 * later (route changes, deferred data, pagination).
 */
export function useScrollReveal() {
  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      },
      {threshold: 0.12, rootMargin: '0px 0px -6% 0px'},
    );

    const observe = (node: Document | Element) => {
      node
        .querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)')
        .forEach((el) => io.observe(el));
    };

    root.classList.add('reveal-ready');
    observe(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.matches('[data-reveal]')) io.observe(n);
          observe(n);
        });
      }
    });
    mo.observe(document.body, {childList: true, subtree: true});

    return () => {
      mo.disconnect();
      io.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);
}
