import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion.js';

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** CSS-driven infinite row of items (content is duplicated for a seamless loop). Pauses on hover. */
export function TechMarquee({ items, reverse = false, duration = 45 }) {
  const row = () => (
    <ul className="flex shrink-0 items-center gap-3 pr-3">
      {items.map((t) => (
        <li
          key={t}
          className="flex items-center gap-3 whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 font-mono text-[12px] text-bone/80 transition-colors duration-300 hover:border-lime/50 hover:text-lime"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-lime/70" aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  );

  return (
    // Decorative: every technology here is already listed in the cards.
    <div className="group/mq mask-fade-x flex overflow-hidden" aria-hidden="true">
      <div
        className="flex w-max group-hover/mq:[animation-play-state:paused]"
        style={{ animation: `marquee ${duration}s linear infinite`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {row()}
        {row()}
      </div>
    </div>
  );
}

/**
 * Giant text strip that drifts on its own and speeds up / reverses with scroll velocity.
 * `children` is one segment; it's repeated to fill the loop.
 */
export function VelocityMarquee({ children, baseVelocity = -2.5, className = '' }) {
  const reduced = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-25, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    base.set(base.get() + move);
  });

  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
      <motion.div className="flex w-max flex-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex shrink-0 items-center">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
