import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion.js';

/**
 * Card with subtle 3D tilt, pointer spotlight and animated conic border on hover.
 */
export default function TiltCard({ children, className = '', max = 6, as = 'article', ...rest }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const spot = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(197,244,103,0.09), transparent 55%)`;

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    if (reduced || e.pointerType !== 'mouse') return;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const Comp = motion[as];

  return (
    <Comp
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1200 }}
      className={`border-spin group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-ink-2/80 ${className}`}
      {...rest}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spot }}
      />
      {children}
    </Comp>
  );
}
