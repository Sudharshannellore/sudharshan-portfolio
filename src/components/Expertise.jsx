import { motion } from 'framer-motion';
import { expertise } from '../data/portfolio.js';
import SectionHeading from './SectionHeading.jsx';
import TiltCard from './TiltCard.jsx';
import NeuralNetwork from './NeuralNetwork.jsx';
import { EASE } from './AnimatedText.jsx';
import { BackendVisual, DatabaseVisual, DocumentSnippet, FrontendVisual, SaasVisual } from './visuals/ExpertiseVisuals.jsx';

const LAYOUT = {
  backend: 'md:col-span-2 lg:col-span-8',
  ai: 'lg:col-span-4 lg:row-span-2',
  saas: 'lg:col-span-4',
  frontend: 'lg:col-span-4',
  database: 'md:col-span-2 lg:col-span-12',
};

const VISUAL_H = {
  backend: 'h-48 sm:h-52',
  ai: 'h-52 sm:h-56 lg:h-auto lg:min-h-[14rem] lg:flex-1',
  saas: 'h-44 sm:h-44',
  frontend: 'h-44 sm:h-44',
};

function Visual({ type }) {
  switch (type) {
    case 'backend':
      return <BackendVisual />;
    case 'ai':
      return <NeuralNetwork className="h-full w-full" />;
    case 'saas':
      return <SaasVisual />;
    case 'frontend':
      return <FrontendVisual />;
    default:
      return null;
  }
}

function CardBody({ card }) {
  return (
    <div className="relative p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl font-medium tracking-tight sm:text-[22px]">{card.title}</h3>
        <span className="font-mono text-[11px] text-mute">/{card.index}</span>
      </div>
      <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-mute">{card.blurb}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${card.title} technologies`}>
        {card.items.map((t) => (
          <li key={t} className="chip transition-colors duration-300 group-hover:border-white/15">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-heading" className="relative py-20 sm:py-24">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="expertise-heading"
            label={expertise.label}
            lines={expertise.headline}
            accent={[1]}
            className="lg:col-span-8"
          />
          <p className="max-w-sm text-[14px] leading-relaxed text-mute lg:col-span-4 lg:justify-self-end">
            Backend first, full-stack by practice — from the data model and the API contract to the interface people use.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-12 lg:grid-cols-12">
          {expertise.cards.map((card, i) => (
            <motion.div
              key={card.id}
              className={LAYOUT[card.id]}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 1, ease: EASE, delay: (i % 3) * 0.1 }}
            >
              <TiltCard className="h-full" max={card.id === 'database' ? 2 : 5}>
                {card.id === 'database' ? (
                  <div className="grid h-full items-center lg:grid-cols-12">
                    <div className="lg:col-span-4">
                      <CardBody card={card} />
                    </div>
                    <div className="relative h-44 border-t border-white/[0.06] sm:h-48 lg:col-span-4 lg:h-full lg:min-h-[13rem] lg:border-l lg:border-t-0">
                      <div className="grid-bg-fine absolute inset-0 opacity-60" />
                      <DatabaseVisual />
                    </div>
                    <div className="hidden p-5 lg:col-span-4 lg:block">
                      <DocumentSnippet />
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col">
                    <div className={`relative overflow-hidden border-b border-white/[0.06] ${VISUAL_H[card.id]}`}>
                      <div className="grid-bg-fine absolute inset-0 opacity-60" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(197,244,103,0.07),transparent_65%)]" />
                      <div className="absolute inset-0 p-3">
                        <Visual type={card.visual} />
                      </div>
                    </div>
                    <div className={card.id === 'ai' ? '' : 'mt-auto'}>
                      <CardBody card={card} />
                    </div>
                  </div>
                )}
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
