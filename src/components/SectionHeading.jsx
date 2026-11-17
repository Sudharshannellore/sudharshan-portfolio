import { motion } from 'framer-motion';
import AnimatedText, { EASE } from './AnimatedText.jsx';

/** Numbered section label + oversized headline. */
export default function SectionHeading({ id, label, lines, accent = [], meta, className = '', size = 'lg' }) {
  const [num, name] = label.split('/').map((s) => s.trim());
  const sizes = {
    lg: 'text-[clamp(2rem,min(4.6vw,8.5vh),4.2rem)]',
    md: 'text-[clamp(1.9rem,min(4vw,7.5vh),3.5rem)]',
  };
  return (
    <div className={`relative ${className}`}>
      <div className="mb-6 flex items-center gap-4">
        <span className="font-mono text-[11px] text-lime">{num}</span>
        <motion.span
          className="h-px w-14 origin-left bg-lime/60"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        />
        <span className="label-mono">{name}</span>
        {meta && <span className="label-mono ml-auto hidden !text-mute/50 md:inline">{meta}</span>}
      </div>
      <AnimatedText
        id={id}
        lines={lines}
        accent={accent}
        className={`font-display font-medium leading-[0.98] tracking-tightest ${sizes[size]}`}
      />
    </div>
  );
}

/** Animated hairline with registration crosses, used between sections. */
export function SectionDivider() {
  return (
    <div className="container-x relative z-10" aria-hidden="true">
      <div className="flex items-center gap-4">
        <span className="font-mono text-[10px] text-mute/50">+</span>
        <motion.div
          className="h-px flex-1 origin-left bg-gradient-to-r from-white/20 via-white/5 to-white/20"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE }}
        />
        <span className="font-mono text-[10px] text-mute/50">+</span>
      </div>
    </div>
  );
}
