import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useTransform } from 'framer-motion';
import WireSphere from './visuals/WireSphere.jsx';
import usePointer from '../hooks/usePointer.js';
import useReducedMotion from '../hooks/useReducedMotion.js';

const RINGS = [
  { size: 74, tilt: 'rotateX(74deg) rotateY(-8deg)', dur: 26, dir: 1, dash: false, node: true },
  { size: 92, tilt: 'rotateX(68deg) rotateY(22deg)', dur: 40, dir: -1, dash: true, node: true },
  { size: 108, tilt: 'rotateX(80deg) rotateY(-28deg)', dur: 58, dir: 1, dash: false, node: false },
  { size: 60, tilt: 'rotateX(20deg) rotateY(70deg)', dur: 34, dir: -1, dash: true, node: true },
];

/**
 * The hero's computational universe: canvas wireframe sphere, CSS-3D orbital
 * rings, orbiting technology labels with depth, SVG data paths and HUD marks.
 */
export default function OrbitalVisual({ labels = [], notes, compact = false }) {
  const reduced = useReducedMotion();
  const { x, y } = usePointer({ disabled: reduced });
  const rotY = useTransform(x, [-1, 1], [-10, 10]);
  const rotX = useTransform(y, [-1, 1], [8, -8]);
  const shiftX = useTransform(x, [-1, 1], [-14, 14]);
  const shiftY = useTransform(y, [-1, 1], [-10, 10]);
  const shiftXFar = useTransform(x, [-1, 1], [22, -22]);
  const shiftYFar = useTransform(y, [-1, 1], [16, -16]);

  const shown = compact ? labels.slice(0, 5) : labels;

  return (
    <div className="relative aspect-square w-full select-none" style={{ perspective: '1400px' }} aria-hidden="true">
      {/* far layer: data paths + HUD */}
      <motion.div className="absolute inset-0" style={{ x: shiftXFar, y: shiftYFar }}>
        <DataPaths />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      >
        {/* rings */}
        {RINGS.map((r, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              width: `${r.size}%`,
              height: `${r.size}%`,
              transform: `translate(-50%, -50%) ${r.tilt}`,
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: `1px ${r.dash ? 'dashed' : 'solid'} rgba(197,244,103,${r.dash ? 0.22 : 0.3})`,
                boxShadow: r.dash ? 'none' : '0 0 30px rgba(197,244,103,0.07), inset 0 0 30px rgba(197,244,103,0.05)',
                animation: reduced ? 'none' : `${r.dir > 0 ? 'spin-slow' : 'spin-rev'} ${r.dur}s linear infinite`,
              }}
            >
              {r.node && (
                <>
                  <span className="absolute -top-[5px] left-1/2 h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-lime shadow-[0_0_14px_4px_rgba(197,244,103,0.6)]" />
                  <span className="absolute -bottom-[3px] left-[30%] h-[6px] w-[6px] rounded-full bg-bone/70" />
                </>
              )}
            </div>
          </div>
        ))}

        {/* sphere */}
        <div className="absolute inset-[6%]">
          <WireSphere
            lat={compact ? 7 : 10}
            lon={compact ? 10 : 16}
            nodes={compact ? 32 : 54}
            particles={compact ? 40 : 90}
            radius={0.4}
          />
        </div>
      </motion.div>

      {/* orbiting labels */}
      <motion.div className="absolute inset-0" style={{ x: shiftX, y: shiftY }}>
        <OrbitLabels labels={shown} notes={notes} reduced={reduced} />
      </motion.div>

      {!compact && <Hud />}
    </div>
  );
}

function OrbitLabels({ labels, notes, reduced }) {
  const wrapRef = useRef(null);
  const refs = useRef([]);
  const hoveredRef = useRef(-1);
  const [hovered, setHovered] = useState(-1);
  const [ready, setReady] = useState(false);
  const onScreen = useInView(wrapRef, { margin: '10% 0px' });

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    const n = labels.length;
    // two staggered orbital bands for depth
    const conf = labels.map((_, i) => ({
      base: (i / n) * Math.PI * 2,
      rx: i % 2 ? 46 : 40,
      ry: i % 2 ? 12 : 17,
      yo: i % 2 ? -6 : 8,
      speed: i % 2 ? 0.00011 : 0.00008,
    }));
    let raf = 0;
    let last = 0;
    let clock = 0; // orbit time; frozen while a label is hovered
    const place = (t) => {
      conf.forEach((c, i) => {
        const el = refs.current[i];
        if (!el) return;
        const a = c.base + t * c.speed;
        const xx = Math.cos(a) * c.rx;
        const zz = Math.sin(a);
        const yy = zz * c.ry + c.yo;
        const depth = (zz + 1) / 2; // 0 back, 1 front
        const focus = hoveredRef.current === i;
        const s = focus ? 1.2 : 0.72 + depth * 0.38;
        el.style.transform = `translate(-50%, -50%) translate3d(${xx}cqw, ${yy}cqw, 0) scale(${s})`;
        el.style.opacity = focus ? '1' : String(0.25 + depth * 0.75);
        el.style.zIndex = focus ? '20' : String(Math.round(depth * 10));
        el.style.filter = !focus && depth < 0.35 ? 'blur(0.6px)' : 'none';
      });
    };
    const loop = (t) => {
      const dt = last ? Math.min(t - last, 50) : 0;
      last = t;
      if (hoveredRef.current === -1) clock += dt;
      place(clock);
      raf = requestAnimationFrame(loop);
    };
    place(0);
    setReady(true);
    if (!reduced && onScreen) raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [labels, reduced, onScreen]);

  return (
    <div ref={wrapRef} className="absolute inset-0" style={{ containerType: 'inline-size' }}>
      {labels.map((label, i) => {
        const active = hovered === i;
        const note = notes?.[label];
        return (
          <div
            key={label}
            ref={(el) => (refs.current[i] = el)}
            className="pointer-events-auto absolute left-1/2 top-1/2 will-change-transform"
            style={{ opacity: ready ? undefined : 0 }}
            onPointerEnter={() => setHovered(i)}
            onPointerLeave={() => setHovered(-1)}
            data-cursor="hover"
          >
            <span
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] backdrop-blur-md transition-colors duration-300 sm:px-3 sm:text-[11px] ${
                active ? 'border-lime bg-lime text-ink shadow-[0_0_24px_rgba(197,244,103,0.45)]' : 'border-white/10 bg-ink/70 text-bone/90'
              }`}
            >
              <span className={`h-1 w-1 rounded-full ${active ? 'bg-ink' : 'bg-lime'}`} />
              {label}
            </span>
            {note && (
              <span
                className={`pointer-events-none absolute left-1/2 top-full mt-2 w-max max-w-[220px] -translate-x-1/2 rounded-lg border border-lime/30 bg-ink/90 px-2.5 py-1.5 text-center font-mono text-[9px] leading-snug text-bone/90 backdrop-blur-md transition-all duration-300 ${
                  active ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
                }`}
              >
                {note}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function DataPaths() {
  const paths = [
    'M 20 160 C 120 120, 180 260, 300 250 S 470 150, 590 210',
    'M 10 430 C 140 380, 200 480, 320 430 S 500 330, 590 380',
    'M 60 40 C 180 120, 260 60, 360 140 S 520 260, 580 100',
  ];
  return (
    <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full opacity-70" fill="none">
      <defs>
        <linearGradient id="dp-grad" x1="0" x2="1">
          <stop offset="0" stopColor="#C5F467" stopOpacity="0" />
          <stop offset="0.5" stopColor="#C5F467" stopOpacity="0.45" />
          <stop offset="1" stopColor="#C5F467" stopOpacity="0" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} stroke="url(#dp-grad)" strokeWidth="0.8" className="anim-dash" style={{ animationDuration: `${8 + i * 3}s` }} />
          <circle r="2.2" fill="#C5F467">
            <animateMotion dur={`${7 + i * 2.5}s`} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}
    </svg>
  );
}

function Hud() {
  return (
    <div className="pointer-events-none absolute inset-0 font-mono text-[9px] uppercase tracking-[0.2em] text-mute/60 sm:text-[10px] [@media(max-height:760px)]:hidden">
      {/* corner brackets */}
      {['left-0 top-0 border-l border-t', 'right-0 top-0 border-r border-t', 'left-0 bottom-0 border-l border-b', 'right-0 bottom-0 border-r border-b'].map(
        (c) => (
          <span key={c} className={`absolute h-4 w-4 border-white/20 ${c}`} />
        ),
      )}
      <span className="absolute left-6 top-1">SYS.CORE / v2.6</span>
      <span className="absolute right-6 top-1 text-lime/70">● LIVE</span>
      <span className="absolute bottom-1 left-6">NODES 54 · LINKS ACTIVE</span>
      <span className="absolute bottom-1 right-6">RX 0.38 RAD</span>
      {/* crosshair */}
      <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-white/20" />
      <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-white/20" />
      <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-white/20" />
      <span className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-white/20" />
    </div>
  );
}
