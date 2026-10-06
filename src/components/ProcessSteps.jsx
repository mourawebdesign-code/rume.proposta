import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1];
const ACTIVE_WEIGHT = 8;
const INACTIVE_WEIGHT = 1;

const steps = [
  {
    num: '01',
    title: 'Analisamos seu mercado',
    text: 'Entendemos como as clínicas da sua região se apresentam e onde existem oportunidades para diferenciar a sua.',
  },
  {
    num: '02',
    title: 'Entendemos sua clínica',
    text: 'Reunimos procedimentos, profissionais, estrutura, resultados e tudo o que sustenta o valor do seu trabalho.',
  },
  {
    num: '03',
    title: 'Construímos a estratégia',
    text: 'Definimos páginas, argumentos, conteúdo e jornada antes de transformar tudo isso em design.',
  },
  {
    num: '04',
    title: 'Desenvolvemos o site',
    text: 'Construímos a experiência completa e refinamos cada detalhe até a sua aprovação.',
  },
  {
    num: '05',
    title: 'Colocamos no ar',
    text: 'Publicamos seu novo endereço digital pronto para apresentar sua clínica e receber potenciais pacientes.',
  },
];

// Desktop/tablet: one flex strip, the active step's width expands while the
// others compress to numbered slices (title set vertically). Mobile: a plain
// vertical accordion carrying the same number/title/text content.
export default function ProcessSteps() {
  const [active, setActive] = useState(0);
  const total = ACTIVE_WEIGHT + (steps.length - 1) * INACTIVE_WEIGHT;

  return (
    <div className="process">
      <div className="process-desktop only-wide" role="tablist" aria-label="Como funciona">
        {steps.map((s, i) => {
          const isActive = i === active;
          const widthPct = ((isActive ? ACTIVE_WEIGHT : INACTIVE_WEIGHT) / total) * 100;
          return (
            <button
              type="button"
              key={s.num}
              role="tab"
              aria-selected={isActive}
              className={`process-panel${isActive ? ' is-active' : ''}`}
              style={{ width: `${widthPct}%` }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <span className="process-num">{s.num}</span>
              <AnimatePresence mode="wait" initial={false}>
                {isActive ? (
                  <motion.div
                    key="open"
                    className="process-content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, delay: 0.2, ease: EASE }}
                  >
                    <h3 className="process-title">{s.title}</h3>
                    <p className="process-text">{s.text}</p>
                  </motion.div>
                ) : (
                  <motion.span
                    key="closed"
                    className="process-title-vertical"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {s.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      <div className="process-mobile only-mobile">
        {steps.map((s, i) => {
          const isOpen = i === active;
          return (
            <div className="process-accordion-item" key={s.num}>
              <button
                type="button"
                className="process-accordion-head"
                aria-expanded={isOpen}
                onClick={() => setActive(isOpen ? -1 : i)}
              >
                <span className="process-num">{s.num}</span>
                <span className="process-accordion-title">{s.title}</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="process-accordion-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <p className="process-text">{s.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
