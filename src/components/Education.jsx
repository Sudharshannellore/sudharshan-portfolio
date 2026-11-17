import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { education } from '../data/portfolio.js';
import { EASE, Reveal } from './AnimatedText.jsx';

const TRACES = [
  'M 0 40 H 120 L 150 70 H 300 L 330 40 H 420',
  'M 0 100 H 80 L 110 130 H 240 L 270 100 H 420',
  'M 0 160 H 160 L 190 130 H 260 L 290 160 H 420',
  'M 60 0 V 30 L 90 60 V 200',
  'M 340 0 V 50 L 310 80 V 200',
];

function CircuitTrace() {
  return (
    <svg viewBox="0 0 420 200" className="h-full w-full" aria-hidden="true" fill="none">
      {TRACES.map((d, i) => (
        <g key={i}>
          <motion.path
            d={d}
            stroke="rgba(245,245,240,0.12)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: i * 0.15, ease: 'easeInOut' }}
          />
          <circle r="2" fill="#C5F467">
            <animateMotion dur={`${4 + i}s`} begin={`${i * 0.6}s`} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}
      {[
        [150, 70],
        [300, 70],
        [110, 130],
        [270, 100],
        [190, 130],
        [90, 60],
        [310, 80],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4" fill="#080A09" stroke="rgba(197,244,103,0.6)" />
          <circle cx={x} cy={y} r="1.4" fill="#C5F467" />
        </g>
      ))}
      <rect x="180" y="82" width="60" height="36" rx="4" fill="#0D100E" stroke="rgba(197,244,103,0.5)" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line x1={190 + i * 13} y1="76" x2={190 + i * 13} y2="82" stroke="rgba(245,245,240,0.3)" />
          <line x1={190 + i * 13} y1="118" x2={190 + i * 13} y2="124" stroke="rgba(245,245,240,0.3)" />
        </g>
      ))}
      <text x="210" y="103" textAnchor="middle" fill="#C5F467" fontSize="8" fontFamily="JetBrains Mono, monospace">
        ECE
      </text>
    </svg>
  );
}

export default function Education() {
  const [start, end] = education.period.split('–').map((s) => s.trim());
  const startYear = start.split(' ').pop();
  const endYear = end.split(' ').pop();

  return (
    <section id="education" aria-labelledby="education-heading" className="relative overflow-hidden py-20 sm:py-24">
      <div className="container-x">
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-[11px] text-lime">05</span>
          <motion.span
            className="h-px w-14 origin-left bg-lime/60"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          />
          <span className="label-mono">Education</span>
        </div>

        <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-ink-2/70">
          <div className="grid-bg-fine absolute inset-0 opacity-40" />
          <div className="relative grid lg:grid-cols-12">
            <div className="p-6 sm:p-8 lg:col-span-7 lg:p-10">
              <Reveal>
                <p
                  className="font-display text-[clamp(2.8rem,min(7vw,13vh),6rem)] font-medium leading-[0.85] tracking-tightest text-outline"
                  aria-hidden="true"
                >
                  {startYear}
                  <span className="[-webkit-text-stroke:1px_#C5F467]">→</span>
                  <br />
                  {endYear}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 id="education-heading" className="mt-7 font-display text-[clamp(1.4rem,2.4vw,2rem)] font-medium leading-tight tracking-tight">
                  {education.institution}
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <dl className="mt-6 grid gap-5 sm:grid-cols-3">
                  <div>
                    <dt className="label-mono !text-[10px]">Degree</dt>
                    <dd className="mt-2 text-[15px] text-bone">{education.degree}</dd>
                  </div>
                  <div>
                    <dt className="label-mono !text-[10px]">Branch</dt>
                    <dd className="mt-2 text-[15px] text-bone">{education.branch}</dd>
                  </div>
                  <div>
                    <dt className="label-mono !text-[10px]">Duration</dt>
                    <dd className="mt-2 text-[15px] text-bone">{education.period}</dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            <div className="relative min-h-[200px] border-t border-white/[0.06] lg:col-span-5 lg:border-l lg:border-t-0">
              <div className="absolute inset-0 flex items-center p-6">
                <CircuitTrace />
              </div>
              <div className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-ink/70">
                <GraduationCap size={18} className="text-lime" aria-hidden="true" />
              </div>
              <span className="label-mono absolute bottom-5 left-6 !text-[10px] !text-mute/60">SIG.PATH / B.TECH</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
