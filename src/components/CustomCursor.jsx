import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion.js';

/** Desktop-only cursor: precise dot + lagging ring that expands over interactive elements. */
export default function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState('');
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine)').matches && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return undefined;
    document.body.classList.add('has-cursor');
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target;
      const labelled = t && t.closest && t.closest('[data-cursor-label]');
      setLabel(labelled ? labelled.getAttribute('data-cursor-label') : '');
      setHover(Boolean(t && t.closest && t.closest('a, button, [data-cursor="hover"]')));
    };
    const leave = () => setVisible(false);
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', dn);
    window.addEventListener('pointerup', up);
    return () => {
      document.body.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', dn);
      window.removeEventListener('pointerup', up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[150] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div className="fixed left-0 top-0" style={{ x: rx, y: ry }}>
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-lime/70"
          animate={{
            width: label ? 96 : hover ? 64 : 34,
            height: label ? 96 : hover ? 64 : 34,
            backgroundColor: label ? 'rgba(197,244,103,1)' : hover ? 'rgba(197,244,103,0.08)' : 'rgba(197,244,103,0)',
            scale: down ? 0.82 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        >
          <AnimatePresence>
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap font-display text-[13px] font-semibold tracking-tight text-ink"
              >
                {label} ↗
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div className="fixed left-0 top-0" style={{ x, y }} animate={{ opacity: label ? 0 : 1 }}>
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime" />
      </motion.div>
    </div>
  );
}
