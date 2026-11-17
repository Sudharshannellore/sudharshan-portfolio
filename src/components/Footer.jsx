import { ArrowUp } from 'lucide-react';
import { profile } from '../data/portfolio.js';

export default function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { label: 'LinkedIn', href: profile.linkedin, external: true },
    { label: 'GitHub', href: profile.github, external: true },
    { label: 'Email', href: `mailto:${profile.email}`, external: false },
  ];

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/[0.08]">
      <div className="container-x py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight">
              {profile.brand}
              <sup className="ml-0.5 text-[10px] text-lime">®</sup>
            </p>
            <p className="mt-1 text-[13px] text-mute">{profile.shortTitle}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px]">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noreferrer' : undefined}
                    className="text-mute transition-colors hover:text-lime"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#home"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-bone transition-colors hover:border-lime"
                >
                  Back to top
                  <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.06] pt-6 font-mono text-[11px] text-mute/70 sm:flex-row sm:justify-between">
          <span>
            © {year} {profile.name}. All rights reserved.
          </span>
          <span>
            {profile.coordinates} · Built with React, Vite &amp; Framer Motion
          </span>
        </div>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1000 150"
        className="pointer-events-none -mb-[1.5%] block w-full select-none px-3 sm:px-5"
      >
        <text
          x="500"
          y="140"
          textAnchor="middle"
          textLength="990"
          lengthAdjust="spacingAndGlyphs"
          fill="rgba(255,255,255,0.03)"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="600"
          fontSize="180"
          letterSpacing="-6"
        >
          {profile.brand}
        </text>
      </svg>
    </footer>
  );
}
