import Lenis from 'lenis';

// Single Lenis instance shared across the app. `null` when smooth scrolling is
// disabled (reduced motion) — callers must handle that.
let lenis = null;
let rafId = 0;

const HEADER_OFFSET = -16;

function onAnchorClick(e) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest && e.target.closest('a[href^="#"]');
  if (!a) return;
  const hash = a.getAttribute('href');
  if (!hash || hash === '#') return;
  const target = document.querySelector(hash);
  if (!target || !lenis) return;
  e.preventDefault();
  // `force` so links in the (scroll-locked) mobile menu still navigate.
  lenis.scrollTo(target, { offset: HEADER_OFFSET, force: true, duration: 1.4 });
  if (history.replaceState) history.replaceState(null, '', hash);
}

export function initSmoothScroll() {
  if (lenis) return lenis;
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  const raf = (time) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);
  document.addEventListener('click', onAnchorClick);
  return lenis;
}

export function destroySmoothScroll() {
  if (!lenis) return;
  cancelAnimationFrame(rafId);
  document.removeEventListener('click', onAnchorClick);
  lenis.destroy();
  lenis = null;
}

/** Locks / unlocks page scrolling (works with or without Lenis). */
export function lockScroll(locked) {
  document.body.style.overflow = locked ? 'hidden' : '';
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}
