import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion.js';

const GLYPHS = '!<>-_\\/[]{}=+*^?#01ABCDEFXYZ';

/**
 * Cycles through `words`, scrambling characters into place on each change.
 * Visual only — pass the accessible text separately (this is aria-hidden).
 */
export default function RotatingScramble({ words, interval = 2800, className = '' }) {
  const reduced = useReducedMotion();
  const [text, setText] = useState(words[0]);
  const index = useRef(0);

  useEffect(() => {
    if (reduced || words.length < 2) return undefined;
    let raf = 0;
    let timer = 0;

    const scrambleTo = (from, to) => {
      const len = Math.max(from.length, to.length);
      const queue = Array.from({ length: len }, (_, i) => {
        const start = Math.floor(Math.random() * 14);
        return { from: from[i] || '', to: to[i] || '', start, end: start + 10 + Math.floor(Math.random() * 14) };
      });
      let frame = 0;
      const tick = () => {
        let done = 0;
        let out = '';
        for (const q of queue) {
          if (frame >= q.end) {
            done++;
            out += q.to;
          } else if (frame >= q.start) {
            out += q.to === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          } else {
            out += q.from;
          }
        }
        setText(out);
        frame++;
        if (done < queue.length) raf = requestAnimationFrame(tick);
        else timer = setTimeout(next, interval);
      };
      tick();
    };

    const next = () => {
      const from = words[index.current];
      index.current = (index.current + 1) % words.length;
      scrambleTo(from, words[index.current]);
    };

    timer = setTimeout(next, interval);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [words, interval, reduced]);

  return (
    <span className={className} aria-hidden="true">
      {text}
      <span className="anim-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-lime align-baseline" />
    </span>
  );
}
