import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Anchor/button gently pulled toward the pointer.
 * variant: 'primary' (lime fill) | 'ghost' (outlined)
 */
export default function MagneticButton({ children, href, variant = 'primary', className = '', strength = 0.3, ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    'group relative inline-flex min-h-[48px] items-center justify-center overflow-hidden rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-300';
  const styles =
    variant === 'primary'
      ? 'bg-lime text-ink hover:bg-bone shadow-[0_0_40px_-8px_rgba(197,244,103,0.55)]'
      : 'border border-white/15 bg-white/[0.02] text-bone hover:border-lime/60';

  const Comp = href ? motion.a : motion.button;

  return (
    <Comp
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles} ${className}`}
      {...rest}
    >
      {variant === 'ghost' && (
        <span className="absolute inset-0 translate-y-full rounded-full bg-lime/10 transition-transform duration-500 ease-out group-hover:translate-y-0" />
      )}
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </Comp>
  );
}
