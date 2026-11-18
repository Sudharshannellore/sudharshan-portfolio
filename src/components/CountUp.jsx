import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion.js';

/** Counts from 0 to `value` the first time it scrolls into view. */
export default function CountUp({ value, duration = 1.8, pad = 2, suffix = '', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      setN(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {String(n).padStart(pad, '0')}
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </span>
  );
}
