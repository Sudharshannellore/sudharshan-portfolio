import { motion } from 'framer-motion';
import { about } from '../data/portfolio.js';
import SectionHeading from './SectionHeading.jsx';
import { EASE, Reveal } from './AnimatedText.jsx';
import ArchitectureDiagram from './visuals/ArchitectureDiagram.jsx';
import CountUp from './CountUp.jsx';
import { projects } from '../data/projects.js';
import { experience } from '../data/portfolio.js';

// Derived from the data files so the numbers stay accurate as content changes.
const techCount = new Set(
  projects.flatMap((p) => p.stack).map((s) => s.toLowerCase().replace(/\.js$/, '').replace(/ \d+$/, '')),
).size;

const STATS = [
  { value: projects.filter((p) => p.live).length, label: 'Products live' },
  { value: experience.roles.length, label: 'Engineering roles' },
  { value: techCount, label: 'Technologies shipped', suffix: '+' },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading id="about-heading" label={about.label} lines={about.headline} accent={[1]} meta="Profile · Index 01" />

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          {/* text column */}
          <div className="lg:col-span-6 xl:col-span-5">
            <Reveal>
              <p className="font-display text-xl leading-snug text-bone sm:text-[22px]">{about.paragraphs[0]}</p>
            </Reveal>
            <div className="mt-6 space-y-4 text-[14px] leading-relaxed text-mute sm:text-[15px]">
              {about.paragraphs.slice(1).map((p, i) => (
                <Reveal key={i} delay={0.08 * (i + 1)}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-6">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                  className="flex flex-col-reverse"
                >
                  <dt className="label-mono mt-2 !text-[10px] leading-snug">{s.label}</dt>
                  <dd className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-none tracking-tightest text-lime">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </dd>
                </motion.div>
              ))}
            </dl>

            <dl className="mt-6 grid grid-cols-2 border-l border-t border-white/[0.08]">
              {about.facts.map((f, i) => (
                <motion.div
                  key={f.k}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                  className="group relative border-b border-r border-white/[0.08] p-4 transition-colors duration-500 hover:bg-white/[0.02]"
                >
                  <dt className="label-mono flex items-center gap-2 !text-[10px]">
                    <span className="h-1 w-1 rounded-full bg-lime/70 transition-transform group-hover:scale-150" />
                    {f.k}
                  </dt>
                  <dd className="mt-2 font-display text-[14px] text-bone sm:text-base">{f.v}</dd>
                </motion.div>
              ))}
            </dl>
          </div>

          {/* diagram column */}
          <Reveal className="w-full lg:col-span-6 lg:col-start-7 lg:ml-auto lg:max-w-[calc(66vh*1.29+40px)]" delay={0.15}>
            <div className="glass relative overflow-hidden rounded-3xl p-3 sm:p-5">
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-lime/70" />
                </div>
                <span className="label-mono !text-[10px]">architecture.svg <span className="hidden !text-lime/70 sm:inline">· hover a node</span></span>
              </div>
              <div className="relative aspect-[540/420] w-full rounded-2xl border border-white/[0.06] bg-ink/60">
                <ArchitectureDiagram />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
