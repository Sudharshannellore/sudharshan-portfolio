import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, MapPin } from 'lucide-react';
import { experience } from '../data/portfolio.js';
import SectionHeading from './SectionHeading.jsx';
import { EASE } from './AnimatedText.jsx';

function Marker({ current }) {
  return (
    <span className="absolute left-0 top-2 grid h-[15px] w-[15px] -translate-x-1/2 place-items-center lg:top-3">
      {current && <span className="anim-ping absolute h-full w-full rounded-full bg-lime/60" />}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-30% 0px' }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className={`relative h-[15px] w-[15px] rounded-full border-2 ${
          current ? 'border-lime bg-lime shadow-[0_0_18px_4px_rgba(197,244,103,0.45)]' : 'border-lime/70 bg-ink'
        }`}
      />
    </span>
  );
}

export default function Experience() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          id="experience-heading"
          label={experience.label}
          lines={experience.headline}
          accent={[2]}
          size="md"
          meta="Career log · 2025 → now"
        />

        <ol ref={listRef} className="relative mt-12 lg:mt-14">
          {/* rail */}
          <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-white/[0.08] lg:left-[33.333%]" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-gradient-to-b from-lime via-lime/70 to-lime/0 shadow-[0_0_10px_rgba(197,244,103,0.6)] lg:left-[33.333%]"
          />

          {experience.roles.map((r, i) => (
            <li key={`${r.company}-${r.period}`} className="relative grid pb-12 last:pb-0 lg:grid-cols-3">
              {/* meta column */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.9, ease: EASE }}
                className="pl-10 lg:pl-0 lg:pr-14 lg:text-right"
              >
                <p className="font-mono text-[12px] tracking-wide text-lime">{r.period}</p>
                {r.current && (
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/[0.07] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-lime">
                    Current
                  </span>
                )}
                <p className="label-mono mt-3 hidden !text-mute/50 lg:block">ENTRY.{String(experience.roles.length - i).padStart(2, '0')}</p>
              </motion.div>

              {/* content column */}
              <div className="relative mt-4 pl-10 lg:col-span-2 lg:mt-0 lg:pl-14">
                <span className="absolute left-[7px] top-0 lg:left-0">
                  <Marker current={r.current} />
                </span>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-15% 0px' }}
                  transition={{ duration: 1, ease: EASE, delay: 0.1 }}
                >
                  <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-none tracking-tight">
                    {r.company}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-mute">
                    <span className="flex items-center gap-2 text-bone/90">
                      <Briefcase size={14} className="text-lime" aria-hidden="true" /> {r.role}
                    </span>
                    {r.location && (
                      <span className="flex items-center gap-2">
                        <MapPin size={14} aria-hidden="true" /> {r.location}
                      </span>
                    )}
                  </div>

                  {r.description.length > 0 && (
                    <div className="mt-4 max-w-2xl space-y-3 text-[14px] leading-relaxed text-mute">
                      {r.description.map((d, k) => (
                        <p key={k}>{d}</p>
                      ))}
                    </div>
                  )}

                  {r.stack.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Technologies used at ${r.company}`}>
                      {r.stack.map((s) => (
                        <li key={s} className="chip">
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
