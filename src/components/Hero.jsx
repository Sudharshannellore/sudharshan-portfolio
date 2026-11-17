import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, MapPin } from 'lucide-react';
import { hero, profile } from '../data/portfolio.js';
import AnimatedText, { EASE } from './AnimatedText.jsx';
import MagneticButton from './MagneticButton.jsx';
import OrbitalVisual from './OrbitalVisual.jsx';

function useIsCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const on = () => setCompact(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return compact;
}

function Clock() {
  const [now, setNow] = useState('');
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date());
    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 30000);
    return () => clearInterval(id);
  }, []);
  return <span>{now} IST</span>;
}

export default function Hero() {
  const compact = useIsCompact();
  const { scrollY } = useScroll();
  const visualY = useTransform(scrollY, [0, 800], [0, 140]);
  const visualOpacity = useTransform(scrollY, [0, 700], [1, 0.2]);
  const textY = useTransform(scrollY, [0, 800], [0, -60]);

  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 sm:pt-28">
      {/* desktop / tablet visual: cinematic, behind the copy on the right */}
      {!compact && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.5 }}
          style={{ y: visualY, opacity: visualOpacity }}
          className="pointer-events-none absolute right-[-18%] top-[18%] w-[80vw] opacity-50 lg:right-[2%] lg:top-[calc(50%-min(22vw,340px,40vh)+24px)] lg:w-[min(44vw,680px,80vh)] lg:opacity-100"
        >
          <OrbitalVisual labels={hero.orbitLabels} />
        </motion.div>
      )}

      <motion.div style={{ y: textY }} className="container-x relative z-10 flex flex-1 flex-col justify-center pb-10">
        {/* mobile visual: in-flow, simplified composition above the headline */}
        {compact && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.4 }}
            className="pointer-events-none mx-auto -mt-4 mb-4 w-[92%] max-w-[360px]"
          >
            <OrbitalVisual labels={hero.orbitLabels} compact />
          </motion.div>
        )}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="label-mono mb-5 flex items-center gap-3"
        >
          <span className="inline-block h-px w-10 bg-lime" />
          <span className="text-lime">{hero.eyebrow}</span>
        </motion.p>

        <AnimatedText
          as="h1"
          onMount
          delay={0.45}
          stagger={0.08}
          lines={hero.headline}
          accent={[2]}
          className="max-w-[14ch] font-display text-[clamp(2.6rem,min(6.6vw,10.5vh),7rem)] font-medium leading-[0.94] tracking-tightest"
        />
        <span id="hero-title" className="sr-only">
          {profile.name} — {hero.headline.join(' ')}
        </span>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.1 }}
          className="mt-6 max-w-[32rem] text-[15px] leading-relaxed text-mute sm:text-base xl:text-[17px]"
        >
          {hero.supporting}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.3 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <MagneticButton href="#projects">
            Explore My Work
            <ArrowDownRight size={16} className="transition-transform duration-300 group-hover:rotate-[-45deg]" />
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Let&apos;s Connect
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* bottom meta strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.6 }}
        className="container-x relative z-10 pb-8"
      >
        <div className="flex flex-col gap-5 border-t border-white/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-mute">
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-lime" aria-hidden="true" />
              Based in {profile.shortLocation}
            </li>
            <li className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="anim-ping absolute inline-flex h-full w-full rounded-full bg-lime" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              Available for opportunities
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile (opens in new tab)"
                className="flex items-center gap-2 transition-colors hover:text-bone"
              >
                <Linkedin size={14} aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile (opens in new tab)"
                className="flex items-center gap-2 transition-colors hover:text-bone"
              >
                <Github size={14} aria-hidden="true" /> GitHub
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-6">
            <span className="label-mono hidden !text-mute/60 md:inline">
              {profile.coordinates} · <Clock />
            </span>
            <a href="#about" className="group flex items-center gap-3" aria-label="Scroll to About section">
              <span className="label-mono transition-colors group-hover:text-bone">Scroll</span>
              <span className="relative h-10 w-[22px] overflow-hidden rounded-full border border-white/20">
                <span
                  className="absolute left-1/2 top-1.5 h-2 w-[2px] -translate-x-1/2 rounded-full bg-lime"
                  style={{ animation: 'scroll-cue 1.8s cubic-bezier(.6,0,.4,1) infinite' }}
                />
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
