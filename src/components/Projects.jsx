import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '../data/projects.js';
import { projectsSection } from '../data/portfolio.js';
import SectionHeading from './SectionHeading.jsx';
import { EASE } from './AnimatedText.jsx';
import { Spotlight } from './TiltCard.jsx';
import { MOCKUPS } from './visuals/ProjectMockups.jsx';
import useMediaQuery from '../hooks/useMediaQuery.js';
import useReducedMotion from '../hooks/useReducedMotion.js';

function OutlineLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${label} (opens in new tab)`}
      className="group/link inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[13px] text-bone transition-colors hover:border-lime hover:text-lime"
    >
      {children}
      <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/link:rotate-45" aria-hidden="true" />
    </a>
  );
}

/** Mockup frame: links to the live demo when there is one, otherwise a plain box. */
function MediaFrame({ href, label, className, children }) {
  if (!href) return <div className={className}>{children}</div>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      data-cursor="hover"
      data-cursor-label="View"
      className={`block ${className}`}
    >
      {children}
    </a>
  );
}

/** One project as a single opaque panel: mockup + summary. */
function ProjectPanel({ project, index }) {
  const Mock = MOCKUPS[project.visual] || MOCKUPS.dashboard;
  const num = String(index + 1).padStart(2, '0');
  const repos = project.repos?.length
    ? project.repos
    : project.github
      ? [{ label: 'Source', url: project.github }]
      : [];

  return (
    <Spotlight className="overflow-hidden rounded-[32px] border border-white/[0.08] bg-ink-2 shadow-[0_-30px_80px_-40px_rgba(0,0,0,0.9)]">
      <article className="relative grid lg:grid-cols-12" aria-labelledby={`project-${index}`}>
        <MediaFrame
          href={project.live}
          label={`${project.title} live demo (opens in new tab)`}
          className="group/media relative overflow-hidden border-b border-white/[0.06] text-left lg:col-span-7 lg:border-b-0 lg:border-r"
        >
          <div className="grid-bg absolute inset-0 opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(197,244,103,0.14),transparent_60%)] opacity-60 transition-opacity duration-700 group-hover/media:opacity-100" />
          <div className="absolute left-5 top-4 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-mute/70">
            FIG.{num} — {project.category}
          </div>
          <div className="relative aspect-[4/3] transition-transform duration-[1200ms] ease-out group-hover/media:scale-[1.035] sm:aspect-[16/10]">
            {project.image ? (
              <img
                src={project.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Mock />
            )}
          </div>
        </MediaFrame>

        <div className="relative flex flex-col p-6 sm:p-8 lg:col-span-5">
          <div className="flex items-center gap-4">
            <span className="font-display text-[clamp(2.2rem,3.6vw,3.2rem)] font-medium leading-none tracking-tightest text-outline">
              {num}
            </span>
            <span className="h-px flex-1 bg-white/10" />
            {project.date && (
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-lime">
                <span className="h-1 w-1 rounded-full bg-lime" aria-hidden="true" />
                <time>{project.date}</time>
              </span>
            )}
          </div>
          <p className="label-mono mt-5">{project.category}</p>
          <h3 id={`project-${index}`} className="mt-2 font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-medium leading-[1.05] tracking-tight">
            {project.title}
          </h3>
          <p className="mt-3 text-[14px] leading-relaxed text-mute">{project.description}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology stack">
            {project.stack.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2 lg:mt-auto lg:pt-6">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo (opens in new tab)`}
                className="group/link inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-bone"
              >
                Live demo
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/link:rotate-45" aria-hidden="true" />
              </a>
            )}
            {repos.map((r) => (
              <OutlineLink key={r.url} href={r.url} label={`${project.title} ${r.label} source code on GitHub`}>
                <Github size={14} aria-hidden="true" /> {r.label}
              </OutlineLink>
            ))}
          </div>
        </div>
      </article>
    </Spotlight>
  );
}

/** Pinned slot: the card sticks, then shrinks and dims as later cards slide over it. */
function StackSlot({ project, index, total, progress }) {
  const start = index / total;
  const targetScale = 1 - (total - 1 - index) * 0.045;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const dim = useTransform(progress, [start, 1], [0, Math.min(0.55, (total - 1 - index) * 0.14)]);

  return (
    <div className="sticky top-0 flex h-screen items-center pt-16">
      <motion.div
        style={{ scale, top: `${index * 22}px` }}
        className="relative w-full origin-top"
      >
        <ProjectPanel project={project} index={index} />
        <motion.div
          aria-hidden="true"
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 z-10 rounded-[32px] bg-ink"
        />
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const stackRef = useRef(null);
  const reduced = useReducedMotion();
  const roomy = useMediaQuery('(min-width: 1024px) and (min-height: 760px)');
  const stacking = roomy && !reduced;
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });
  const total = projects.length;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative py-20 sm:py-24">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="projects-heading"
            label={projectsSection.label}
            lines={projectsSection.headline}
            accent={[1]}
            className="lg:col-span-9"
          />
          <p className="label-mono lg:col-span-3 lg:justify-self-end lg:text-right">
            {String(total).padStart(2, '0')} entries
            <br />
            <span className="!text-mute/50">gallery · v1</span>
          </p>
        </div>

        {stacking ? (
          <div ref={stackRef} className="relative mt-6">
            {projects.map((p, i) => (
              <StackSlot
                key={`${p.title}-${i}`}
                project={p}
                index={i}
                total={total}
                progress={scrollYProgress}
              />
            ))}
          </div>
        ) : (
          <div ref={stackRef} className="mt-12 space-y-8">
            {projects.map((p, i) => (
              <motion.div
                key={`${p.title}-${i}`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1, ease: EASE }}
              >
                <ProjectPanel project={p} index={i} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
