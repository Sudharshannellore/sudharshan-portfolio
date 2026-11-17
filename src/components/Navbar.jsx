import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navLinks, profile } from '../data/portfolio.js';
import useActiveSection from '../hooks/useActiveSection.js';
import { EASE } from './AnimatedText.jsx';

const ids = navLinks.map((l) => l.id);

export default function Navbar() {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-[1320px] items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled
            ? 'border-white/10 bg-ink/70 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a href="#home" className="group flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-tight">
          <span className="relative grid h-7 w-7 place-items-center rounded-full border border-lime/40">
            <span className="h-2 w-2 rounded-full bg-lime transition-transform duration-500 group-hover:scale-150" />
            <span className="anim-spin-slow absolute inset-0 rounded-full border border-dashed border-lime/25" />
          </span>
          {profile.brand}
          <sup className="-ml-1.5 text-[11px] font-normal text-lime">®</sup>
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`relative block rounded-full px-4 py-1.5 text-[13px] transition-colors duration-300 ${
                  active === l.id ? 'text-ink' : 'text-mute hover:text-bone'
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-lime"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 text-[12px] text-mute xl:flex">
            <span className="relative flex h-2 w-2">
              <span className="anim-ping absolute inline-flex h-full w-full rounded-full bg-lime" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            Available for opportunities
          </span>
          <a
            href="#contact"
            className="group hidden items-center gap-1.5 rounded-full bg-bone px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-lime sm:inline-flex"
          >
            Let&apos;s Talk
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'm'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="grid-bg fixed inset-0 -z-10 flex flex-col bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: EASE }}
                  className="border-b border-white/[0.07]"
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-baseline justify-between py-4 font-display text-4xl font-medium tracking-tight ${
                      active === l.id ? 'text-lime' : 'text-bone'
                    }`}
                  >
                    {l.label}
                    <span className="font-mono text-[11px] text-mute">0{i}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto space-y-3 text-sm text-mute">
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-lime" /> Available for opportunities
              </p>
              <a href={`mailto:${profile.email}`} className="block text-bone">
                {profile.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
