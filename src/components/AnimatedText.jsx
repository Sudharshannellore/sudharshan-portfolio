import { motion } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1];

/**
 * Splits lines into words and reveals each word with a masked slide-up.
 * `lines` is an array of strings, each rendered on its own line.
 * `accent` lists line indexes tinted with the accent colour.
 */
export default function AnimatedText({
  as: Tag = 'h2',
  lines,
  className = '',
  lineClassName = '',
  accent = [],
  delay = 0,
  stagger = 0.06,
  onMount = false,
  id,
}) {
  let wordIndex = 0;
  const trigger = onMount
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-12% 0px' } };

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{lines.join(' ')}</span>
      <motion.span {...trigger} className="block" aria-hidden="true">
        {lines.map((line, li) => {
          const words = line.split(' ');
          return (
            <span key={li} className={`block ${lineClassName} ${accent.includes(li) ? 'text-lime' : ''}`}>
              {words.map((word, wi) => {
                const i = wordIndex++;
                return (
                  <span key={wi} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                    <motion.span
                      className="inline-block will-change-transform"
                      variants={{
                        hidden: { y: '110%', rotate: 4 },
                        show: {
                          y: '0%',
                          rotate: 0,
                          transition: { duration: 0.95, ease: EASE, delay: delay + i * stagger },
                        },
                      }}
                    >
                      {word}
                      {wi < words.length - 1 ? ' ' : ''}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}

/** Generic fade/slide-up reveal on scroll. */
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}
