import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion.js';

const mono = { fontFamily: 'JetBrains Mono, monospace' };

/* ------------------------------------------------------------------ */
/* Backend: request flow through services + live log                    */
/* ------------------------------------------------------------------ */
const LOGS = [
  ['POST', '/v1/auth/login', '200'],
  ['GET', '/v1/workspaces', '200'],
  ['PATCH', '/v1/users/:id/role', '204'],
  ['POST', '/v1/billing/webhook', '200'],
  ['GET', '/v1/ai/runs/:id', '200'],
  ['DELETE', '/v1/sessions', '204'],
];

export function BackendVisual() {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => setTick((t) => t + 1), 1400);
    return () => clearInterval(id);
  }, [reduced]);
  const visible = [0, 1, 2, 3].map((i) => LOGS[(tick + i) % LOGS.length]);

  const svc = [
    { x: 300, y: 50, l: 'users.service' },
    { x: 300, y: 120, l: 'billing.service' },
    { x: 300, y: 190, l: 'ai.service' },
  ];
  const paths = svc.map((s) => `M 150 120 C 220 120, 220 ${s.y}, ${s.x - 50} ${s.y}`);

  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 420 240" className="absolute inset-y-0 right-0 h-full w-full sm:w-[64%]" aria-hidden="true">
        <path d="M 20 120 L 100 120" stroke="rgba(245,245,240,0.18)" strokeWidth="1" />
        <circle r="2.5" fill="#C5F467">
          <animateMotion dur="1.4s" repeatCount="indefinite" path="M 20 120 L 100 120" />
        </circle>
        {paths.map((d, i) => (
          <g key={i}>
            <path d={d} stroke="rgba(245,245,240,0.16)" fill="none" />
            <path d={d} stroke="#C5F467" fill="none" strokeOpacity="0.5" className="anim-dash" />
            <circle r="2.5" fill="#F5F5F0">
              <animateMotion dur={`${1.6 + i * 0.4}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        ))}
        {/* gateway */}
        <rect x="100" y="98" width="50" height="44" rx="10" fill="#121613" stroke="rgba(197,244,103,0.65)" />
        <text x="125" y="117" textAnchor="middle" fontSize="7" fill="#C5F467" style={mono}>
          API
        </text>
        <text x="125" y="129" textAnchor="middle" fontSize="6.5" fill="#92978F" style={mono}>
          gateway
        </text>
        {svc.map((s) => (
          <g key={s.l}>
            <rect x={s.x - 50} y={s.y - 16} width="110" height="32" rx="8" fill="#0D100E" stroke="rgba(255,255,255,0.14)" />
            <circle cx={s.x - 38} cy={s.y} r="2.5" fill="#C5F467" className="anim-pulse" />
            <text x={s.x - 30} y={s.y + 3} fontSize="8" fill="#F5F5F0" style={mono}>
              {s.l}
            </text>
          </g>
        ))}
        <circle cx="20" cy="120" r="5" fill="none" stroke="#F5F5F0" strokeOpacity="0.5" />
      </svg>

      <div className="absolute left-3 top-1/2 hidden w-[34%] max-w-[260px] -translate-y-1/2 rounded-xl border border-white/10 bg-ink/85 p-3 backdrop-blur sm:block" style={mono}>
        <div className="mb-2 flex items-center justify-between text-[9px] uppercase tracking-widest text-mute">
          <span>access.log</span>
          <span className="text-lime">● stream</span>
        </div>
        <ul className="space-y-1 text-[10px]">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map(([m, p, s], i) => (
              <motion.li
                key={`${tick}-${i}`}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: i === 0 ? 1 : 0.55, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex gap-2 truncate"
              >
                <span className="w-11 shrink-0 text-lime">{m}</span>
                <span className="truncate text-bone/80">{p}</span>
                <span className="ml-auto text-mute">{s}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SaaS: floating dashboard — plan, credits, roles, token               */
/* ------------------------------------------------------------------ */
export function SaasVisual() {
  return (
    <div className="relative h-full w-full [perspective:900px]" style={mono}>
      <div className="absolute left-1/2 top-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
        <div className="anim-float rounded-2xl border border-white/10 bg-ink-3/90 p-4 shadow-2xl [transform:rotateX(14deg)_rotateZ(-3deg)]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-mute">workspace / billing</span>
            <span className="rounded-full bg-lime/15 px-2 py-0.5 text-[9px] text-lime">PRO</span>
          </div>
          <div className="mt-3 text-[10px] text-mute">credits</div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-lime/50 to-lime"
              initial={{ width: '8%' }}
              whileInView={{ width: '68%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-1.5 text-[9px]">
            {['ADMIN', 'EDITOR', 'VIEWER'].map((r, i) => (
              <span key={r} className={`rounded-md border px-1.5 py-1 text-center ${i === 0 ? 'border-lime/50 text-lime' : 'border-white/10 text-mute'}`}>
                {r}
              </span>
            ))}
          </div>
        </div>
        <div className="anim-float absolute -right-3 -top-7 rounded-xl border border-white/10 bg-ink/90 px-3 py-2 text-[9px] text-mute shadow-xl [animation-delay:-2s]">
          <span className="text-lime">JWT</span> eyJhbGciOi…
        </div>
        <div className="anim-float absolute -bottom-8 -left-2 flex items-center gap-2 rounded-xl border border-white/10 bg-ink/90 px-3 py-2 text-[9px] text-bone/80 shadow-xl [animation-delay:-4s]">
          <span className="h-1.5 w-1.5 rounded-full bg-lime" /> subscription.renewed
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Frontend: layered browser + responsive device                        */
/* ------------------------------------------------------------------ */
export function FrontendVisual() {
  return (
    <div className="relative h-full w-full [perspective:1000px]">
      <div className="absolute left-[8%] top-[14%] w-[72%] [transform:rotateY(-14deg)_rotateX(6deg)]">
        <div className="absolute -left-4 -top-4 h-full w-full rounded-xl border border-white/[0.06] bg-white/[0.02]" />
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-ink-3/95 shadow-2xl">
          <div className="flex items-center gap-1 border-b border-white/[0.06] px-2.5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="ml-2 h-2 flex-1 rounded-full bg-white/[0.05]" />
          </div>
          <div className="space-y-2 p-3">
            <div className="h-2 w-1/3 rounded bg-lime/70" />
            <div className="h-2 w-2/3 rounded bg-white/10" />
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex h-10 items-end gap-0.5 rounded-md border border-white/[0.06] bg-white/[0.02] p-1">
                  {[0, 1, 2, 3].map((j) => (
                    <span
                      key={j}
                      className="anim-bar w-full rounded-sm bg-lime/50"
                      style={{ height: `${40 + ((i * 4 + j) * 17) % 60}%`, animationDelay: `${-(i + j) * 0.4}s` }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="h-2 w-1/2 rounded bg-white/[0.07]" />
          </div>
        </div>
      </div>
      <div className="anim-float absolute bottom-[10%] right-[8%] w-[24%] min-w-[64px]">
        <div className="rounded-[14px] border border-white/15 bg-ink-3 p-1.5 shadow-2xl">
          <div className="mx-auto mb-1.5 h-1 w-6 rounded-full bg-white/15" />
          <div className="space-y-1.5 px-0.5 pb-1">
            <div className="h-1.5 w-2/3 rounded bg-lime/70" />
            <div className="h-6 rounded bg-white/[0.06]" />
            <div className="h-6 rounded bg-white/[0.06]" />
            <div className="h-1.5 w-1/2 rounded bg-white/10" />
          </div>
        </div>
      </div>
      <span className="absolute left-[8%] top-[4%] font-mono text-[9px] tracking-widest text-mute/70">&lt;Layout breakpoint=&quot;lg&quot; /&gt;</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Database: stacked data layers + rising particles + document          */
/* ------------------------------------------------------------------ */
export function DatabaseVisual() {
  const layers = [0, 1, 2, 3];
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 260 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="db-side" x1="0" x2="1">
            <stop offset="0" stopColor="#C5F467" stopOpacity="0.05" />
            <stop offset="0.5" stopColor="#C5F467" stopOpacity="0.14" />
            <stop offset="1" stopColor="#C5F467" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {layers.map((i) => {
          const y = 190 - i * 42;
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <path d={`M 50 ${y} L 50 ${y + 22} A 80 22 0 0 0 210 ${y + 22} L 210 ${y}`} fill="url(#db-side)" stroke="rgba(197,244,103,0.35)" strokeWidth="0.8" />
              <ellipse cx="130" cy={y} rx="80" ry="22" fill="#0D100E" stroke={i === 3 ? '#C5F467' : 'rgba(245,245,240,0.25)'} strokeWidth="0.9" />
              <ellipse cx="130" cy={y} rx="56" ry="14" fill="none" stroke="rgba(245,245,240,0.08)" strokeDasharray="2 4" />
            </motion.g>
          );
        })}
        {Array.from({ length: 10 }).map((_, i) => (
          <circle key={i} r="1.6" fill="#C5F467" opacity="0.8">
            <animateMotion
              dur={`${2.6 + (i % 4) * 0.6}s`}
              begin={`${i * 0.35}s`}
              repeatCount="indefinite"
              path={`M ${70 + i * 12} 214 L ${70 + i * 12} 40`}
            />
            <animate attributeName="opacity" values="0;0.9;0" dur={`${2.6 + (i % 4) * 0.6}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}

export function DocumentSnippet() {
  return (
    <pre className="overflow-hidden rounded-xl border border-white/10 bg-ink/80 p-4 text-[11px] leading-relaxed text-mute" style={mono}>
      <span className="text-mute/60">{'// collection: subscriptions'}</span>
      {'\n{\n  '}
      <span className="text-lime">_id</span>
      {': ObjectId(…),\n  '}
      <span className="text-lime">workspaceId</span>
      {': ObjectId(…),\n  '}
      <span className="text-lime">plan</span>
      {': "pro",\n  '}
      <span className="text-lime">credits</span>
      {': { used, limit },\n  '}
      <span className="text-lime">status</span>
      {': "active"\n}\n'}
      <span className="text-mute/60">{'createIndex({ workspaceId: 1 })'}</span>
    </pre>
  );
}
