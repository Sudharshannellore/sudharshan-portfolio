import { useEffect, useRef } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion.js';

const LIME = '197,244,103';
const BONE = '245,245,240';

/**
 * Canvas-rendered 3D wireframe sphere with perspective projection.
 * Latitude/longitude lines, a Fibonacci node lattice with proximity links,
 * a glowing core and orbiting particles. Responds to the pointer.
 */
export default function WireSphere({
  className = '',
  lat = 9,
  lon = 14,
  nodes = 46,
  linkDist = 0.62,
  speed = 0.0018,
  tilt = 0.38,
  particles = 70,
  radius = 0.36, // fraction of the smaller canvas side
  coreGlow = 1,
  interactive = true,
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let rotY = 0;
    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    let visible = true;

    // Fibonacci lattice for nodes
    const pts = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < nodes; i++) {
      const y = 1 - (i / (nodes - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }
    const links = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1], pts[i][2] - pts[j][2]);
        if (d < linkDist) links.push([i, j]);
      }
    }
    // Highlighted "active" nodes that pulse
    const hot = new Set(Array.from({ length: Math.max(3, Math.floor(nodes / 9)) }, () => Math.floor(Math.random() * nodes)));

    // Orbiting particles in random inclined planes
    const parts = Array.from({ length: particles }, () => ({
      r: 1.15 + Math.random() * 0.75,
      a: Math.random() * Math.PI * 2,
      s: (0.0015 + Math.random() * 0.004) * (Math.random() > 0.5 ? 1 : -1),
      inc: (Math.random() - 0.5) * 1.4,
      size: Math.random() * 1.2 + 0.3,
    }));

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (interactive && !reduced) window.addEventListener('pointermove', onMove, { passive: true });

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(canvas);

    function project(x, y, z, R, cx, cy, ax, ay) {
      // rotate Y
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      let x1 = x * cosY - z * sinY;
      let z1 = x * sinY + z * cosY;
      // rotate X
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const f = 3.2;
      const s = f / (f + z2);
      return [cx + x1 * R * s, cy + y1 * R * s, z2, s];
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * radius;
      const cx = w / 2;
      const cy = h / 2;
      px += (tx - px) * 0.04;
      py += (ty - py) * 0.04;
      const ay = rotY + px * 0.6;
      const ax = tilt + py * 0.3;

      // core glow
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.25);
      g.addColorStop(0, `rgba(${LIME},${0.16 * coreGlow})`);
      g.addColorStop(0.45, `rgba(${LIME},${0.05 * coreGlow})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 0.7;

      const seg = 64;
      // latitude rings
      for (let i = 1; i < lat; i++) {
        const phi = (i / lat) * Math.PI;
        const yy = Math.cos(phi);
        const rr = Math.sin(phi);
        let prev = null;
        for (let k = 0; k <= seg; k++) {
          const th = (k / seg) * Math.PI * 2;
          const p = project(Math.cos(th) * rr, yy, Math.sin(th) * rr, R, cx, cy, ax, ay);
          if (prev) {
            const depth = (1 - (p[2] + prev[2]) / 2) / 2; // 0 back .. 1 front
            ctx.strokeStyle = `rgba(${BONE},${0.03 + depth * 0.13})`;
            ctx.beginPath();
            ctx.moveTo(prev[0], prev[1]);
            ctx.lineTo(p[0], p[1]);
            ctx.stroke();
          }
          prev = p;
        }
      }
      // longitude meridians
      for (let j = 0; j < lon; j++) {
        const th = (j / lon) * Math.PI * 2;
        let prev = null;
        for (let k = 0; k <= seg / 2; k++) {
          const phi = (k / (seg / 2)) * Math.PI;
          const p = project(Math.cos(th) * Math.sin(phi), Math.cos(phi), Math.sin(th) * Math.sin(phi), R, cx, cy, ax, ay);
          if (prev) {
            const depth = (1 - (p[2] + prev[2]) / 2) / 2;
            ctx.strokeStyle = `rgba(${BONE},${0.02 + depth * 0.1})`;
            ctx.beginPath();
            ctx.moveTo(prev[0], prev[1]);
            ctx.lineTo(p[0], p[1]);
            ctx.stroke();
          }
          prev = p;
        }
      }

      // node network (slightly outside surface)
      const proj = pts.map((p) => project(p[0] * 1.02, p[1] * 1.02, p[2] * 1.02, R, cx, cy, ax, ay));
      for (const [a, b] of links) {
        const pa = proj[a];
        const pb = proj[b];
        const depth = (1 - (pa[2] + pb[2]) / 2) / 2;
        ctx.strokeStyle = `rgba(${LIME},${depth * depth * 0.32})`;
        ctx.beginPath();
        ctx.moveTo(pa[0], pa[1]);
        ctx.lineTo(pb[0], pb[1]);
        ctx.stroke();
      }
      proj.forEach((p, i) => {
        const depth = (1 - p[2]) / 2;
        const isHot = hot.has(i);
        const pulse = isHot ? 0.5 + 0.5 * Math.sin(t * 0.003 + i) : 0;
        const r = (isHot ? 2.4 : 1.4) * p[3];
        if (isHot && depth > 0.45) {
          ctx.fillStyle = `rgba(${LIME},${0.12 * depth + pulse * 0.12})`;
          ctx.beginPath();
          ctx.arc(p[0], p[1], r * (3.5 + pulse * 3), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = isHot ? `rgba(${LIME},${0.35 + depth * 0.65})` : `rgba(${BONE},${0.15 + depth * 0.6})`;
        ctx.beginPath();
        ctx.arc(p[0], p[1], r, 0, Math.PI * 2);
        ctx.fill();
      });

      // particles
      for (const pt of parts) {
        if (!reduced) pt.a += pt.s;
        const x = Math.cos(pt.a) * pt.r;
        const z = Math.sin(pt.a) * pt.r;
        const y = z * Math.sin(pt.inc);
        const p = project(x, y, z * Math.cos(pt.inc), R, cx, cy, ax * 0.6, ay * 0.25);
        const depth = (1 - p[2] / 2) / 1.5;
        ctx.fillStyle = `rgba(${LIME},${Math.max(0.05, Math.min(0.8, depth * 0.55))})`;
        ctx.beginPath();
        ctx.arc(p[0], p[1], pt.size * p[3], 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame(t) {
      if (!visible) return;
      rotY += speed;
      draw(t);
      raf = requestAnimationFrame(frame);
    }

    if (reduced) draw(0);
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, [lat, lon, nodes, linkDist, speed, tilt, particles, radius, coreGlow, interactive, reduced]);

  return <canvas ref={ref} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
