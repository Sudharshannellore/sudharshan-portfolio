import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion.js';

const LAYERS = [3, 5, 6, 5, 2];
const W = 360;
const H = 300;

/** Abstract neural network: layered nodes, glowing links and travelling signals. */
export default function NeuralNetwork({ className = '' }) {
  const reduced = useReducedMotion();
  const svgRef = useRef(null);
  const onScreen = useInView(svgRef, { margin: '10% 0px' });

  const { nodes, edges } = useMemo(() => {
    const nodes = [];
    LAYERS.forEach((count, li) => {
      const x = 30 + (li / (LAYERS.length - 1)) * (W - 60);
      for (let i = 0; i < count; i++) {
        const y = H / 2 + (i - (count - 1) / 2) * 44;
        nodes.push({ id: `${li}-${i}`, li, x, y });
      }
    });
    const edges = [];
    for (let li = 0; li < LAYERS.length - 1; li++) {
      const a = nodes.filter((n) => n.li === li);
      const b = nodes.filter((n) => n.li === li + 1);
      a.forEach((na) => b.forEach((nb) => edges.push({ a: na, b: nb, id: `${na.id}>${nb.id}` })));
    }
    return { nodes, edges };
  }, []);

  // pick a random forward path through the network every tick
  const [path, setPath] = useState([]);
  useEffect(() => {
    const pick = () => {
      const p = [];
      let prev = null;
      for (let li = 0; li < LAYERS.length; li++) {
        const layer = nodes.filter((n) => n.li === li);
        const n = layer[Math.floor(Math.random() * layer.length)];
        if (prev) p.push(`${prev.id}>${n.id}`);
        prev = n;
      }
      setPath(p);
    };
    pick();
    if (reduced || !onScreen) return undefined;
    const id = setInterval(pick, 1600);
    return () => clearInterval(id);
  }, [nodes, reduced, onScreen]);

  const activeNodes = new Set(path.flatMap((e) => e.split('>')));

  return (
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true">
      <defs>
        <radialGradient id="nn-glow">
          <stop offset="0" stopColor="#C5F467" stopOpacity="0.8" />
          <stop offset="1" stopColor="#C5F467" stopOpacity="0" />
        </radialGradient>
      </defs>
      {edges.map((e) => {
        const on = path.includes(e.id);
        return (
          <line
            key={e.id}
            x1={e.a.x}
            y1={e.a.y}
            x2={e.b.x}
            y2={e.b.y}
            stroke={on ? '#C5F467' : 'rgba(245,245,240,0.07)'}
            strokeWidth={on ? 1.2 : 0.6}
            style={{ transition: 'stroke 0.6s ease, stroke-width 0.6s ease', filter: on ? 'drop-shadow(0 0 3px #C5F467)' : 'none' }}
          />
        );
      })}
      {!reduced &&
        path.map((id, i) => {
          const e = edges.find((x) => x.id === id);
          if (!e) return null;
          return (
            <motion.circle
              key={`${id}-${i}-${path.join()}`}
              r="2.6"
              fill="#F5F5F0"
              initial={{ cx: e.a.x, cy: e.a.y, opacity: 0 }}
              animate={{ cx: e.b.x, cy: e.b.y, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.35, delay: i * 0.3, ease: 'linear' }}
            />
          );
        })}
      {nodes.map((n) => {
        const on = activeNodes.has(n.id);
        return (
          <g key={n.id}>
            {on && <circle cx={n.x} cy={n.y} r="14" fill="url(#nn-glow)" opacity="0.5" />}
            <circle
              cx={n.x}
              cy={n.y}
              r={on ? 5 : 4}
              fill={on ? '#C5F467' : '#0D100E'}
              stroke={on ? '#C5F467' : 'rgba(245,245,240,0.3)'}
              strokeWidth="1"
              style={{ transition: 'all 0.5s ease' }}
            />
          </g>
        );
      })}
      {['INPUT', 'EMBED', 'REASON', 'TOOLS', 'OUT'].map((t, i) => (
        <text
          key={t}
          x={30 + (i / (LAYERS.length - 1)) * (W - 60)}
          y={H - 6}
          textAnchor="middle"
          fill="rgba(146,151,143,0.7)"
          fontSize="7.5"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="1.2"
        >
          {t}
        </text>
      ))}
    </svg>
  );
}
