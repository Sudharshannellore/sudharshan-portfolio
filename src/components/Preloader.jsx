import { useEffect, useState } from 'react';
import { animate, motion } from 'framer-motion';
import { profile } from '../data/portfolio.js';
import { EASE } from './AnimatedText.jsx';

const CURTAIN = [0.76, 0, 0.24, 1];
const STEPS = ['Booting runtime', 'Compiling modules', 'Linking services', 'Ready'];

/**
 * Intro screen: counts 0 → 100, then lifts away in two layers
 * (ink panel first, lime curtain right behind it).
 * Calls `onDone` when the counter completes so the page can mount underneath.
 */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.7,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(onDone, 180),
    });
    return () => controls.stop();
  }, [onDone]);

  const step = STEPS[Math.min(STEPS.length - 1, Math.floor(count / 26))];
  const letters = profile.brand.split('');

  return (
    <motion.div className="fixed inset-0 z-[200]" aria-hidden="true" exit={{ pointerEvents: 'none' }}>
      {/* lime curtain — trails the ink panel on exit */}
      <motion.div
        className="absolute inset-0 bg-lime"
        exit={{ y: '-100%', transition: { duration: 0.9, ease: CURTAIN, delay: 0.12 } }}
      />

      <motion.div
        className="absolute inset-0 flex flex-col bg-ink"
        exit={{ y: '-100%', transition: { duration: 0.85, ease: CURTAIN } }}
      >
        <div className="grid-bg absolute inset-0 opacity-40" />

        <div className="container-x relative flex flex-1 flex-col justify-between py-8">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            <span>{profile.coordinates}</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-lime anim-pulse" />
              {step}
            </span>
          </div>

          <div className="overflow-hidden">
            <p className="flex font-display text-[clamp(2.4rem,9vw,8rem)] font-semibold leading-none tracking-tightest">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.045 }}
                  className="inline-block"
                >
                  {l}
                </motion.span>
              ))}
              <motion.sup
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="ml-1 mt-2 text-[0.2em] font-normal text-lime"
              >
                ®
              </motion.sup>
            </p>
          </div>

          <div>
            <div className="flex items-end justify-between">
              <span className="label-mono">Full-Stack · Backend Engineer</span>
              <span className="font-display text-[clamp(3rem,10vw,9rem)] font-medium leading-[0.8] tracking-tightest tabular-nums text-lime">
                {String(count).padStart(3, '0')}
              </span>
            </div>
            <div className="mt-5 h-px w-full bg-white/10">
              <div
                className="h-px bg-lime shadow-[0_0_12px_rgba(197,244,103,0.8)]"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
