import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '../data/projects.js';
import { projectsSection } from '../data/portfolio.js';
import SectionHeading from './SectionHeading.jsx';
import { EASE } from './AnimatedText.jsx';
import { MOCKUPS } from './visuals/ProjectMockups.jsx';

function ProjectLink({ href, children, label }) {
  if (!href) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/10 px-4 py-2 text-[13px] text-mute/60">
        {children}
        <span className="font-mono text-[10px]">soon</span>
      </span>
    );
  }
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

function ProjectCard({ project, index }) {
  const Mock = MOCKUPS[project.visual] || MOCKUPS.dashboard;
  const flip = index % 2 === 1;
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.1, ease: EASE }}
      className="group grid items-center gap-6 lg:grid-cols-12 lg:gap-10"
      aria-labelledby={`project-${index}`}
    >
      <div
        className={`relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-ink-2 lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}
        data-cursor="hover"
      >
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(197,244,103,0.14),transparent_60%)] opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
        <div className="absolute left-5 top-4 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-mute/70">
          FIG.{num} — {project.category}
        </div>
        <div className="relative aspect-[4/3] sm:aspect-[16/10]">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
            />
          ) : (
            <Mock />
          )}
        </div>
      </div>

      <div className={`lg:col-span-6 xl:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <div className="flex items-center gap-4">
          <span className="font-display text-[clamp(2.2rem,3.6vw,3.2rem)] font-medium leading-none tracking-tightest text-outline">{num}</span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="label-mono">{project.category}</span>
        </div>
        <h3 id={`project-${index}`} className="mt-4 font-display text-[clamp(1.4rem,2.2vw,2rem)] font-medium leading-[1.05] tracking-tight">
          {project.title}
        </h3>
        {project.date && (
          <p className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-lime">
            <span className="h-1 w-1 rounded-full bg-lime" aria-hidden="true" />
            <time>{project.date}</time>
          </p>
        )}
        {project.placeholder && (
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-dashed border-lime/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-lime/80">
            Placeholder · edit data/projects.js
          </span>
        )}
        <p className="mt-3 max-w-md text-[14px] leading-relaxed text-mute">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology stack">
          {project.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.live ? (
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
          ) : (
            <ProjectLink href="" label="">
              Live demo
            </ProjectLink>
          )}
          {project.repos?.length ? (
            project.repos.map((r) => (
              <ProjectLink key={r.url} href={r.url} label={`${project.title} ${r.label} source code on GitHub`}>
                <Github size={14} aria-hidden="true" /> {r.label}
              </ProjectLink>
            ))
          ) : (
            <ProjectLink href={project.github} label={`${project.title} source code on GitHub`}>
              <Github size={14} aria-hidden="true" /> Source
            </ProjectLink>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
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
            {String(projects.length).padStart(2, '0')} entries
            <br />
            <span className="!text-mute/50">gallery · v1</span>
          </p>
        </div>

        <div className="mt-12 space-y-16 lg:mt-14 lg:space-y-20">
          {projects.map((p, i) => (
            <ProjectCard key={`${p.title}-${i}`} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
