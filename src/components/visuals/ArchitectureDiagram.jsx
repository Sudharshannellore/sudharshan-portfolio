import { useState } from 'react';
import { motion } from 'framer-motion';

const N = {
  client: { x: 60, y: 210, label: 'CLIENT', sub: 'web · mobile' },
  gw: { x: 200, y: 210, label: 'API GATEWAY', sub: 'REST · auth' },
  auth: { x: 350, y: 80, label: 'AUTH', sub: 'JWT · OAuth' },
  core: { x: 350, y: 210, label: 'CORE', sub: 'business logic' },
  ai: { x: 350, y: 340, label: 'AI', sub: 'LLM workflows' },
  db: { x: 480, y: 160, label: 'DATA', sub: 'MongoDB' },
  queue: { x: 480, y: 290, label: 'EVENTS', sub: 'jobs · webhooks' },
};

const EDGES = [
  ['client', 'gw'],
  ['gw', 'auth'],
  ['gw', 'core'],
  ['gw', 'ai'],
  ['auth', 'db'],
  ['core', 'db'],
  ['core', 'queue'],
  ['ai', 'queue'],
];

function curve(a, b) {
  const mx = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
}

/** Animated service-architecture diagram used in the About section. Hover a node to trace its connections. */
export default function ArchitectureDiagram() {
  const [active, setActive] = useState(null);
  const linked = active
    ? new Set(EDGES.filter(([a, b]) => a === active || b === active).flat())
    : null;

  return (
    <svg viewBox="0 0 540 420" className="h-full w-full" role="img" aria-label="Diagram of a service architecture: client, API gateway, auth, core and AI services, data store and event queue">
      <defs>
        <pattern id="ad-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.08)" />
        </pattern>
        <radialGradient id="ad-glow">
          <stop offset="0" stopColor="#C5F467" stopOpacity="0.35" />
          <stop offset="1" stopColor="#C5F467" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="540" height="420" fill="url(#ad-dots)" />
      <circle cx={N.core.x} cy={N.core.y} r="120" fill="url(#ad-glow)" opacity="0.4" />

      {EDGES.map(([a, b], i) => {
        const d = curve(N[a], N[b]);
        const on = active && (a === active || b === active);
        const off = active && !on;
        return (
          <g key={`${a}-${b}`} style={{ opacity: off ? 0.25 : 1, transition: 'opacity 0.35s ease' }}>
            <motion.path
              d={d}
              fill="none"
              stroke={on ? 'rgba(197,244,103,0.85)' : 'rgba(245,245,240,0.16)'}
              strokeWidth={on ? 1.6 : 1}
              style={{ transition: 'stroke 0.35s ease, stroke-width 0.35s ease', filter: on ? 'drop-shadow(0 0 4px rgba(197,244,103,0.7))' : 'none' }}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.2 + i * 0.12, ease: 'easeInOut' }}
            />
            <circle r="2.6" fill="#C5F467">
              <animateMotion dur={`${2.4 + (i % 3) * 0.7}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        );
      })}

      {Object.entries(N).map(([k, n], i) => {
        const hub = k === 'gw' || k === 'core';
        const lit = linked?.has(k);
        const self = active === k;
        return (
          <motion.g
            key={k}
            onPointerEnter={() => setActive(k)}
            onPointerLeave={() => setActive(null)}
            className="cursor-pointer"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <g style={{ opacity: active && !lit ? 0.35 : 1, transition: 'opacity 0.35s ease' }}>
            <rect
              x={n.x - 46}
              y={n.y - 22}
              width="92"
              height="44"
              rx="10"
              fill={self ? '#1A2112' : '#0D100E'}
              stroke={self || lit ? 'rgba(197,244,103,0.9)' : hub ? 'rgba(197,244,103,0.6)' : 'rgba(255,255,255,0.14)'}
              style={{ transition: 'fill 0.3s ease, stroke 0.3s ease' }}
            />
            <circle cx={n.x - 34} cy={n.y - 10} r="2.5" fill={hub ? '#C5F467' : 'rgba(245,245,240,0.5)'} className={hub ? 'anim-pulse' : ''} />
            <text x={n.x - 26} y={n.y - 6} fill="#F5F5F0" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
              {n.label}
            </text>
            <text x={n.x - 38} y={n.y + 12} fill="#92978F" fontSize="8" fontFamily="JetBrains Mono, monospace">
              {n.sub}
            </text>
            </g>
          </motion.g>
        );
      })}

      <text x="16" y="404" fill="rgba(146,151,143,0.6)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
        FIG.01 — REQUEST LIFECYCLE
      </text>
      <text x="524" y="404" textAnchor="end" fill="rgba(197,244,103,0.7)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
        STATUS: HEALTHY
      </text>
    </svg>
  );
}
