import { useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { contact, profile } from '../data/portfolio.js';
import AnimatedText, { EASE, Reveal } from './AnimatedText.jsx';
import MagneticButton from './MagneticButton.jsx';
import WireSphere from './visuals/WireSphere.jsx';
import usePointer from '../hooks/usePointer.js';
import useReducedMotion from '../hooks/useReducedMotion.js';

function ContactSphere() {
  const reduced = useReducedMotion();
  const { x, y } = usePointer({ disabled: reduced, stiffness: 40 });
  const rx = useTransform(y, [-1, 1], [10, -10]);
  const ry = useTransform(x, [-1, 1], [-14, 14]);

  return (
    <div className="relative aspect-square w-full" style={{ perspective: '1200px' }} aria-hidden="true">
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(closest-side,rgba(197,244,103,0.22),transparent)] blur-2xl" />
      <motion.div className="absolute inset-0" style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}>
        {[
          { s: 82, t: 'rotateX(76deg)', d: 30, c: 'spin-slow' },
          { s: 96, t: 'rotateX(62deg) rotateY(40deg)', d: 46, c: 'spin-rev' },
          { s: 70, t: 'rotateY(76deg)', d: 38, c: 'spin-slow' },
        ].map((r, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{ width: `${r.s}%`, height: `${r.s}%`, transform: `translate(-50%,-50%) ${r.t}`, transformStyle: 'preserve-3d' }}
          >
            <div
              className="absolute inset-0 rounded-full border border-lime/25"
              style={{ animation: reduced ? 'none' : `${r.c} ${r.d}s linear infinite` }}
            >
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-lime shadow-[0_0_14px_4px_rgba(197,244,103,0.55)]" />
            </div>
          </div>
        ))}
        <div className="absolute inset-[8%]">
          <WireSphere lat={12} lon={18} nodes={70} linkDist={0.5} speed={0.0012} tilt={0.5} particles={110} radius={0.42} coreGlow={1.4} />
        </div>
      </motion.div>
    </div>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail, external: false },
    { label: 'LinkedIn', value: 'in/sudharshannellore', href: profile.linkedin, icon: Linkedin, external: true },
    { label: 'GitHub', value: `github.com/${profile.githubHandle}`, href: profile.github, icon: Github, external: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden pb-14 pt-20 sm:pt-24">
      <div className="container-x relative">
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-[11px] text-lime">06</span>
          <motion.span
            className="h-px w-14 origin-left bg-lime/60"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          />
          <span className="label-mono">Contact</span>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-7">
            <AnimatedText
              id="contact-heading"
              lines={contact.headline}
              accent={[1]}
              className="font-display text-[clamp(2.1rem,min(4.6vw,9vh),4.2rem)] font-medium leading-[0.95] tracking-tightest"
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-lg text-[14px] leading-relaxed text-mute sm:text-base">{contact.supporting}</p>
            </Reveal>

            <Reveal delay={0.3} className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton href={`mailto:${profile.email}?subject=${encodeURIComponent("Let's work together")}`}>
                {contact.cta}
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
              </MagneticButton>
              <button
                type="button"
                onClick={copy}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/15 px-5 text-sm text-bone transition-colors hover:border-lime/60"
                aria-live="polite"
              >
                {copied ? <Check size={15} className="text-lime" /> : <Copy size={15} />}
                {copied ? 'Email copied' : 'Copy email'}
              </button>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative mx-auto w-full max-w-[min(400px,62vh)] lg:col-span-5">
            <ContactSphere />
          </Reveal>
        </div>

        <ul className="mt-12 grid border-t border-white/[0.08] md:grid-cols-3">
          {links.map((l, i) => (
            <motion.li
              key={l.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
              className="border-b border-white/[0.08] md:border-b-0 md:border-r md:last:border-r-0"
            >
              <a
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noreferrer' : undefined}
                aria-label={l.external ? `${l.label} (opens in new tab)` : `Send an email to ${profile.email}`}
                className="group flex items-center justify-between gap-4 py-5 transition-colors md:px-6 md:first:pl-0"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 transition-colors duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
                    <l.icon size={17} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="label-mono block !text-[10px]">{l.label}</span>
                    <span className="mt-1 block break-all text-[14px] text-bone sm:text-[15px]">{l.value}</span>
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-mute transition-all duration-300 group-hover:rotate-45 group-hover:text-lime"
                />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
