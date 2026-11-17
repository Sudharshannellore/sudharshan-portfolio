import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * Normalised pointer position (-1..1 on each axis) relative to the window,
 * smoothed with a spring. Used for parallax.
 */
export default function usePointer({ stiffness = 60, damping = 20, disabled = false } = {}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness, damping });
  const sy = useSpring(y, { stiffness, damping });

  useEffect(() => {
    if (disabled) return undefined;
    const onMove = (e) => {
      x.set((e.clientX / window.innerWidth) * 2 - 1);
      y.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [disabled, x, y]);

  return { x: sx, y: sy };
}
