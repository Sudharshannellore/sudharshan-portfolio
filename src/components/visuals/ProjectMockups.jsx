import { motion } from 'framer-motion';

const mono = { fontFamily: 'JetBrains Mono, monospace' };

function Window({ title, children, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-ink-3/95 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-3 text-[10px] text-mute" style={mono}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function Stage({ children }) {
  return (
    <div className="relative h-full w-full [perspective:1400px]">
      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-[560px] transition-transform duration-700 ease-out [transform:rotateX(10deg)_rotateY(-12deg)] group-hover:[transform:rotateX(4deg)_rotateY(-4deg)]">
          {children}
        </div>
      </div>
    </div>
  );
}

function Float({ className = '', delay = 0, children }) {
  return (
    <div className={`anim-float absolute rounded-xl border border-white/10 bg-ink/90 px-3 py-2 text-[10px] shadow-2xl backdrop-blur ${className}`} style={{ ...mono, animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export function DashboardMock() {
  const bars = [38, 62, 48, 80, 56, 92, 70, 84, 64, 96, 78, 88];
  return (
    <Stage>
      <div className="relative">
        <Window title="app / overview">
          <div className="grid grid-cols-[64px_1fr] sm:grid-cols-[96px_1fr]">
            <div className="space-y-2 border-r border-white/[0.06] p-3">
              {[1, 0, 0, 0, 0].map((a, i) => (
                <div key={i} className={`h-2 rounded ${a ? 'bg-lime/70' : 'bg-white/[0.07]'}`} style={{ width: `${60 + (i * 13) % 35}%` }} />
              ))}
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2">
                {['users', 'requests', 'uptime'].map((k) => (
                  <div key={k} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
                    <div className="text-[8px] uppercase tracking-widest text-mute" style={mono}>
                      {k}
                    </div>
                    <div className="mt-1.5 h-2.5 w-2/3 rounded bg-bone/70" />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex h-24 items-end gap-1 rounded-lg border border-white/[0.06] bg-white/[0.015] p-2 sm:h-28">
                {bars.map((h, i) => (
                  <motion.span
                    key={i}
                    className={`flex-1 rounded-sm ${i === 9 ? 'bg-lime' : 'bg-lime/30'}`}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Window>
        <Float className="-right-3 -top-5 text-bone/80 sm:-right-8">
          <span className="text-lime">●</span> deploy succeeded
        </Float>
        <Float className="-bottom-5 -left-3 text-mute sm:-left-8" delay={-3}>
          GET /metrics <span className="text-lime">200</span>
        </Float>
      </div>
    </Stage>
  );
}

export function EditorMock() {
  const lines = [
    ['@Controller', "('projects')", 'lime'],
    ['export class', ' ProjectsController {', 'bone'],
    ['  @Get', "(':id')", 'lime'],
    ['  @UseGuards', '(JwtAuthGuard, RolesGuard)', 'mute'],
    ['  findOne', '(@Param() p) {', 'bone'],
    ['    return', ' this.service.findOne(p.id);', 'mute'],
    ['  }', '', 'bone'],
    ['}', '', 'bone'],
  ];
  return (
    <Stage>
      <div className="relative">
        <Window title="projects.controller.ts">
          <div className="flex p-4 text-[10px] leading-[1.9] sm:text-[11px]" style={mono}>
            <div className="mr-4 select-none text-right text-mute/40">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="min-w-0">
              {lines.map(([a, b, c], i) => (
                <motion.div
                  key={i}
                  className="truncate whitespace-pre"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                >
                  <span className={c === 'lime' ? 'text-lime' : c === 'mute' ? 'text-mute' : 'text-bone'}>{a}</span>
                  <span className="text-bone/70">{b}</span>
                  {i === lines.length - 1 && <span className="anim-blink ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-lime" />}
                </motion.div>
              ))}
            </div>
          </div>
        </Window>
        <Float className="-right-3 bottom-6 text-mute sm:-right-10">
          <span className="text-lime">✓</span> tests passed
        </Float>
      </div>
    </Stage>
  );
}

export function ApiMock() {
  const svcs = ['auth', 'users', 'billing', 'search'];
  return (
    <Stage>
      <Window title="architecture / services">
        <svg viewBox="0 0 400 220" className="block w-full" aria-hidden="true">
          <rect x="20" y="90" width="70" height="40" rx="8" fill="#0D100E" stroke="rgba(197,244,103,0.6)" />
          <text x="55" y="114" textAnchor="middle" fill="#C5F467" fontSize="9" style={mono}>
            gateway
          </text>
          <rect x="310" y="90" width="70" height="40" rx="8" fill="#0D100E" stroke="rgba(255,255,255,0.18)" />
          <text x="345" y="114" textAnchor="middle" fill="#F5F5F0" fontSize="9" style={mono}>
            database
          </text>
          {svcs.map((s, i) => {
            const y = 26 + i * 52;
            const a = `M 90 110 C 130 110, 130 ${y + 14}, 165 ${y + 14}`;
            const b = `M 235 ${y + 14} C 270 ${y + 14}, 270 110, 310 110`;
            return (
              <g key={s}>
                <path d={a} stroke="rgba(245,245,240,0.15)" fill="none" />
                <path d={b} stroke="rgba(245,245,240,0.15)" fill="none" />
                <circle r="2.2" fill="#C5F467">
                  <animateMotion dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" path={`${a} L 235 ${y + 14} ${b.replace('M', 'L')}`} />
                </circle>
                <rect x="165" y={y} width="70" height="28" rx="7" fill="#121613" stroke="rgba(255,255,255,0.12)" />
                <text x="200" y={y + 17} textAnchor="middle" fill="#F5F5F0" fontSize="8.5" style={mono}>
                  {s}
                </text>
              </g>
            );
          })}
        </svg>
      </Window>
    </Stage>
  );
}

export function WorkflowMock() {
  const steps = [
    { l: 'input', x: 44, y: 100 },
    { l: 'router', x: 140, y: 100 },
    { l: 'retrieve', x: 240, y: 50 },
    { l: 'tool call', x: 240, y: 150 },
    { l: 'LLM', x: 346, y: 100 },
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 4],
    [3, 4],
  ];
  return (
    <Stage>
      <div className="relative">
        <Window title="graph / agent.flow">
          <svg viewBox="0 0 400 200" className="block w-full" aria-hidden="true">
            <defs>
              <pattern id="wf-dots" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.7" fill="rgba(255,255,255,0.07)" />
              </pattern>
            </defs>
            <rect width="400" height="200" fill="url(#wf-dots)" />
            {edges.map(([a, b], i) => {
              const A = steps[a];
              const B = steps[b];
              const d = `M ${A.x + 34} ${A.y} C ${A.x + 64} ${A.y}, ${B.x - 64} ${B.y}, ${B.x - 34} ${B.y}`;
              return (
                <g key={i}>
                  <path d={d} stroke="rgba(197,244,103,0.35)" fill="none" className="anim-dash" />
                  <circle r="2.4" fill="#F5F5F0">
                    <animateMotion dur="1.6s" begin={`${i * 0.3}s`} repeatCount="indefinite" path={d} />
                  </circle>
                </g>
              );
            })}
            {steps.map((s, i) => (
              <g key={s.l}>
                <rect
                  x={s.x - 34}
                  y={s.y - 15}
                  width="68"
                  height="30"
                  rx="15"
                  fill={i === 4 ? 'rgba(197,244,103,0.12)' : '#121613'}
                  stroke={i === 4 ? '#C5F467' : 'rgba(255,255,255,0.15)'}
                />
                <text x={s.x} y={s.y + 3} textAnchor="middle" fill={i === 4 ? '#C5F467' : '#F5F5F0'} fontSize="8.5" style={mono}>
                  {s.l}
                </text>
              </g>
            ))}
          </svg>
        </Window>
        <Float className="-bottom-6 right-4 text-mute">
          state.step = <span className="text-lime">&quot;respond&quot;</span>
        </Float>
      </div>
    </Stage>
  );
}

export function SubscriptionMock() {
  const plans = [
    { n: 'Starter', on: false },
    { n: 'Pro', on: true },
    { n: 'Team', on: false },
  ];
  return (
    <Stage>
      <div className="relative">
        <Window title="billing / plans">
          <div className="grid grid-cols-3 gap-2 p-4">
            {plans.map((p) => (
              <div
                key={p.n}
                className={`rounded-xl border p-3 ${p.on ? 'border-lime/60 bg-lime/[0.06]' : 'border-white/[0.07] bg-white/[0.015]'}`}
              >
                <div className={`text-[10px] ${p.on ? 'text-lime' : 'text-mute'}`} style={mono}>
                  {p.n}
                </div>
                <div className="mt-2 h-3 w-1/2 rounded bg-bone/60" />
                <div className="mt-3 space-y-1.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className={`h-1 w-1 rounded-full ${p.on ? 'bg-lime' : 'bg-white/30'}`} />
                      <span className="h-1.5 flex-1 rounded bg-white/[0.07]" />
                    </div>
                  ))}
                </div>
                <div className={`mt-3 h-5 rounded-md ${p.on ? 'bg-lime' : 'border border-white/10'}`} />
              </div>
            ))}
          </div>
        </Window>
        <Float className="-left-3 -top-5 text-mute sm:-left-8">
          webhook <span className="text-lime">payment.captured</span>
        </Float>
        <Float className="-bottom-5 -right-3 text-bone/80 sm:-right-8" delay={-2.5}>
          credits +1000
        </Float>
      </div>
    </Stage>
  );
}

export function DataVizMock() {
  const pts = [20, 45, 30, 60, 52, 78, 64, 90, 82, 96];
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${20 + i * 40} ${180 - p * 1.5}`).join(' ');
  return (
    <Stage>
      <Window title="analytics / trends">
        <svg viewBox="0 0 400 200" className="block w-full" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="20" x2="380" y1={40 + i * 40} y2={40 + i * 40} stroke="rgba(255,255,255,0.06)" />
          ))}
          <motion.path
            d={`${d} L 380 190 L 20 190 Z`}
            fill="rgba(197,244,103,0.08)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          />
          <motion.path
            d={d}
            stroke="#C5F467"
            strokeWidth="1.6"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
          <circle cx="380" cy={180 - 96 * 1.5} r="4" fill="#C5F467" className="anim-pulse" />
        </svg>
      </Window>
    </Stage>
  );
}

/* Gamified coding platform: quest editor, XP bar, level, timer, leaderboard */
export function QuestMock() {
  const code = [
    ['def', ' is_palindrome(s):', 'lime'],
    ['    s', ' = s.lower()', 'bone'],
    ['    return', ' s == s[::-1]', 'lime'],
  ];
  const tests = ['racecar', 'Level', 'logic'];
  return (
    <Stage>
      <div className="relative">
        <Window title="quest / zone-3 · palindromes.py">
          <div className="grid grid-cols-[1fr_88px] sm:grid-cols-[1fr_120px]">
            <div className="border-r border-white/[0.06] p-4" style={mono}>
              <div className="mb-3 flex items-center justify-between text-[9px] uppercase tracking-widest">
                <span className="text-mute">Daily challenge</span>
                <span className="flex items-center gap-1.5 text-lime">
                  <span className="anim-pulse h-1.5 w-1.5 rounded-full bg-lime" /> 02:41
                </span>
              </div>
              <div className="space-y-1 text-[10px] leading-[1.8] sm:text-[11px]">
                {code.map(([a, b, c], i) => (
                  <motion.div
                    key={i}
                    className="truncate whitespace-pre"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.12 }}
                  >
                    <span className={c === 'lime' ? 'text-lime' : 'text-bone'}>{a}</span>
                    <span className="text-bone/70">{b}</span>
                    {i === code.length - 1 && <span className="anim-blink ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-lime" />}
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3 text-[9px] sm:text-[10px]">
                {tests.map((t, i) => (
                  <motion.div
                    key={t}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.25 }}
                  >
                    <span className="text-lime">✓</span>
                    <span className="text-mute">test_{t}</span>
                    <span className="ml-auto text-mute/60">passed</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 p-3" style={mono}>
              <div className="grid aspect-square place-items-center rounded-xl border border-lime/40 bg-lime/[0.06]">
                <div className="text-center">
                  <div className="text-[8px] uppercase tracking-widest text-mute">level</div>
                  <div className="font-display text-2xl font-semibold text-lime sm:text-3xl">12</div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[8px] uppercase tracking-widest text-mute">
                  <span>xp</span>
                  <span className="text-lime">+50</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full rounded-full bg-lime"
                    initial={{ width: '30%' }}
                    whileInView={{ width: '78%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
              <div className="flex gap-1">
                {[1, 1, 1, 0].map((on, i) => (
                  <span key={i} className={`h-4 flex-1 rounded ${on ? 'bg-lime/60' : 'border border-white/10'}`} />
                ))}
              </div>
            </div>
          </div>
        </Window>
        <Float className="-right-3 -top-5 text-bone/80 sm:-right-8">
          <span className="text-lime">★</span> quest complete
        </Float>
        <Float className="-bottom-5 -left-3 text-mute sm:-left-8" delay={-3}>
          duel · <span className="text-lime">you win</span>
        </Float>
      </div>
    </Stage>
  );
}

/* AI CRM: lead pipeline kanban + AI copilot + auto-conversion */
export function CrmMock() {
  const cols = [
    { name: 'New', n: 2, cards: [62, 48] },
    { name: 'Contacted', n: 2, cards: [74, 55] },
    { name: 'Qualified', n: 1, cards: [88], hot: true },
  ];
  return (
    <Stage>
      <div className="relative">
        <Window title="crm / leads · pipeline">
          <div className="grid grid-cols-3 gap-2 p-3 sm:p-4">
            {cols.map((c, ci) => (
              <div key={c.name} className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-2">
                <div className="mb-2 flex items-center justify-between px-0.5 text-[9px] uppercase tracking-widest" style={mono}>
                  <span className={c.hot ? 'text-lime' : 'text-mute'}>{c.name}</span>
                  <span className="text-mute/60">{c.n}</span>
                </div>
                <div className="space-y-1.5">
                  {c.cards.map((score, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + ci * 0.15 + i * 0.08 }}
                      className={`rounded-lg border p-2 ${c.hot ? 'border-lime/50 bg-lime/[0.06]' : 'border-white/[0.07] bg-ink/60'}`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={`h-3.5 w-3.5 shrink-0 rounded-full ${c.hot ? 'bg-lime/70' : 'bg-white/15'}`} />
                        <span className="h-1.5 flex-1 rounded bg-bone/50" />
                      </div>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                          <span className={`block h-full rounded-full ${c.hot ? 'bg-lime' : 'bg-lime/40'}`} style={{ width: `${score}%` }} />
                        </span>
                        <span className="text-[8px] text-mute" style={mono}>
                          {score}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  {ci === 1 && (
                    <div className="anim-float rounded-lg border border-dashed border-lime/40 p-2 [transform:rotate(-4deg)]">
                      <span className="block h-1.5 w-2/3 rounded bg-lime/40" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Window>
        <Float className="-right-3 -top-6 max-w-[190px] text-bone/80 sm:-right-8">
          <span className="text-lime">✦ AI Copilot</span>
          <span className="mt-1 block text-mute">2 deals stale &gt;14d · follow up?</span>
        </Float>
        <Float className="-bottom-5 -left-3 text-mute sm:-left-8" delay={-3}>
          lead <span className="text-lime">→</span> org + contact
        </Float>
      </div>
    </Stage>
  );
}

/* Clinic booking: date + time slots, service summary, payment choice */
export function BookingMock() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const slots = ['10:00', '11:30', '13:00', '15:30', '17:00', '18:30'];
  return (
    <Stage>
      <div className="relative">
        <Window title="book / appointment">
          <div className="grid grid-cols-[1.25fr_1fr] gap-3 p-3 sm:p-4">
            <div>
              <div className="mb-2 text-[9px] uppercase tracking-widest text-mute" style={mono}>
                select date
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((d, i) => (
                  <span key={i} className="text-center text-[8px] text-mute/60" style={mono}>
                    {d}
                  </span>
                ))}
                {Array.from({ length: 14 }).map((_, i) => (
                  <span
                    key={i}
                    className={`grid aspect-square place-items-center rounded-md text-[8px] ${
                      i === 9 ? 'bg-lime text-ink' : i < 3 ? 'text-mute/30' : 'border border-white/[0.06] text-bone/70'
                    }`}
                    style={mono}
                  >
                    {i + 10}
                  </span>
                ))}
              </div>
              <div className="mb-2 mt-3 text-[9px] uppercase tracking-widest text-mute" style={mono}>
                time slot
              </div>
              <div className="grid grid-cols-3 gap-1">
                {slots.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    className={`rounded-md border py-1 text-center text-[8px] ${
                      i === 3 ? 'border-lime/70 bg-lime/10 text-lime' : i === 1 ? 'border-white/[0.04] text-mute/30 line-through' : 'border-white/[0.08] text-bone/70'
                    }`}
                    style={mono}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="flex flex-col rounded-xl border border-white/[0.07] bg-white/[0.02] p-2.5">
              <div className="text-[9px] uppercase tracking-widest text-mute" style={mono}>
                combo
              </div>
              <div className="mt-1.5 h-2 w-4/5 rounded bg-bone/60" />
              <div className="mt-1.5 space-y-1">
                {[0, 1].map((i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-lime" />
                    <span className="h-1.5 flex-1 rounded bg-white/[0.08]" />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[8px]" style={mono}>
                <span className="text-mute">staff</span>
                <span className="h-3.5 w-3.5 rounded-full bg-white/15" />
                <span className="h-1.5 flex-1 rounded bg-white/[0.08]" />
              </div>
              <div className="mt-auto grid grid-cols-2 gap-1 pt-3 text-[8px]" style={mono}>
                <span className="rounded-md border border-white/10 py-1 text-center text-mute">COD</span>
                <span className="rounded-md border border-lime/60 bg-lime/10 py-1 text-center text-lime">Online</span>
              </div>
              <div className="mt-1.5 h-5 rounded-md bg-lime" />
            </div>
          </div>
        </Window>
        <Float className="-right-3 -top-5 text-bone/80 sm:-right-8">
          <span className="text-lime">✓</span> booking confirmed
        </Float>
        <Float className="-bottom-5 -left-3 text-mute sm:-left-8" delay={-3}>
          reminder email <span className="text-lime">scheduled</span>
        </Float>
      </div>
    </Stage>
  );
}

/* Local marketplace: vendor cards + live order tracking timeline */
export function MarketplaceMock() {
  const vendors = [
    { tag: 'farm', on: true },
    { tag: 'artisan', on: false },
    { tag: 'organic', on: false },
  ];
  const steps = ['placed', 'accepted', 'preparing', 'ready', 'out', 'delivered'];
  const current = 4;
  return (
    <Stage>
      <div className="relative">
        <Window title="bazaar / near you">
          <div className="p-3 sm:p-4">
            <div className="grid grid-cols-3 gap-2">
              {vendors.map((v, i) => (
                <motion.div
                  key={v.tag}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={`overflow-hidden rounded-xl border ${v.on ? 'border-lime/50' : 'border-white/[0.07]'} bg-white/[0.02]`}
                >
                  <div className={`h-9 ${v.on ? 'bg-lime/20' : 'bg-white/[0.05]'} grid-bg-fine`} />
                  <div className="p-2">
                    <div className="h-1.5 w-3/4 rounded bg-bone/60" />
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="text-[8px] uppercase tracking-widest text-mute" style={mono}>
                        {v.tag}
                      </span>
                      <span className="text-[8px] text-lime" style={mono}>
                        ★ 4.{8 - i}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-3 rounded-xl border border-white/[0.07] bg-ink/60 p-3">
              <div className="mb-3 flex items-center justify-between text-[9px] uppercase tracking-widest" style={mono}>
                <span className="text-mute">order #LB-2048</span>
                <span className="flex items-center gap-1 text-lime">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime anim-pulse" /> live
                </span>
              </div>
              <div className="relative flex items-center justify-between">
                <span className="absolute inset-x-1 top-1/2 h-px -translate-y-1/2 bg-white/10" />
                <motion.span
                  className="absolute left-1 top-1/2 h-px -translate-y-1/2 bg-lime"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(current / (steps.length - 1)) * 97}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
                {steps.map((s, i) => (
                  <span
                    key={s}
                    className={`relative z-10 h-2.5 w-2.5 rounded-full border ${
                      i < current ? 'border-lime bg-lime' : i === current ? 'border-lime bg-ink shadow-[0_0_10px_2px_rgba(197,244,103,0.5)]' : 'border-white/20 bg-ink'
                    }`}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[7px] uppercase tracking-wider sm:text-[8px]" style={mono}>
                {steps.map((s, i) => (
                  <span key={s} className={i === current ? 'text-lime' : 'text-mute/60'}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Window>
        <Float className="-right-3 -top-5 text-bone/80 sm:-right-8">
          <span className="text-lime">●</span> new order · vendor alert
        </Float>
        <Float className="-bottom-5 -left-3 text-mute sm:-left-8" delay={-3}>
          razorpay <span className="text-lime">paid</span> · COD ready
        </Float>
      </div>
    </Stage>
  );
}

export const MOCKUPS = {
  marketplace: MarketplaceMock,
  booking: BookingMock,
  crm: CrmMock,
  quest: QuestMock,
  dashboard: DashboardMock,
  editor: EditorMock,
  api: ApiMock,
  workflow: WorkflowMock,
  subscription: SubscriptionMock,
  dataviz: DataVizMock,
};
