import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion.js';

/**
 * Card with subtle 3D tilt, an inner pointer spotlight and a border glow
 * that follows the pointer around the card's edge.
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
  const ring = useMotionTemplate`radial-gradient(260px circle at ${mx}% ${my}%, rgba(197,244,103,0.95), rgba(197,244,103,0.25) 35%, transparent 70%)`;

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
      className={`group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-ink-2/80 ${className}`}
      {...rest}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spot }}
      />
      <motion.div
        aria-hidden="true"
        className="spot-ring opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{ background: ring }}
      />
      {children}
    </Comp>
  );
}

/** Pointer-tracking spotlight + border glow for any rounded container (no tilt). */
export function Spotlight({ children, className = '', size = 520, ...rest }) {
  const ref = useRef(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spot = useMotionTemplate`radial-gradient(${size}px circle at ${mx}% ${my}%, rgba(197,244,103,0.08), transparent 55%)`;
  const ring = useMotionTemplate`radial-gradient(${size * 0.6}px circle at ${mx}% ${my}%, rgba(197,244,103,0.95), rgba(197,244,103,0.2) 35%, transparent 70%)`;

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <div ref={ref} onPointerMove={onMove} className={`group/spot relative ${className}`} {...rest}>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: spot }}
      />
      <motion.div
        aria-hidden="true"
        className="spot-ring opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100 group-focus-within/spot:opacity-100"
        style={{ background: ring }}
      />
      {children}
    </div>
  );
}
