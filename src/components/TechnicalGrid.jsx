import { useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion.js';

const MASK = 'radial-gradient(ellipse 85% 70% at 50% 35%, #000 30%, transparent 85%)';

/**
 * Fixed page background: drifting engineering grid, ambient aurora,
 * pointer-following light and a fine particle field.
 */
export default function TechnicalGrid() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const light = useMotionTemplate`radial-gradient(640px circle at ${sx}% ${sy}%, rgba(197,244,103,0.055), transparent 60%)`;

  useEffect(() => {
    if (reduced) return undefined;
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced, mx, my]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink">
      <div className="grid-bg anim-grid absolute inset-0 opacity-70" style={{ maskImage: MASK, WebkitMaskImage: MASK }} />
      <div className="anim-aurora absolute -left-[20%] -top-[30%] h-[80vh] w-[80vw] rounded-full bg-[radial-gradient(closest-side,rgba(197,244,103,0.08),transparent)]" />
      <div className="anim-aurora absolute -bottom-[30%] -right-[20%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgba(110,150,130,0.07),transparent)] [animation-delay:-9s]" />
      <motion.div className="absolute inset-0" style={{ background: light }} />
      {!reduced && <Particles />}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(8,10,9,0.8)_100%)]" />
    </div>
  );
}

function Particles() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const count = window.innerWidth < 768 ? 26 : 56;
    const pts = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00012,
      vy: -Math.random() * 0.00018 - 0.00004,
      r: Math.random() * 1.1 + 0.3,
      a: Math.random() * 0.45 + 0.12,
    }));

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -0.02) {
          p.y = 1.02;
          p.x = Math.random();
        }
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197,244,103,${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full opacity-60" />;
}
