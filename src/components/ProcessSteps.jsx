import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1];
const ACTIVE_WEIGHT = 8;
const INACTIVE_WEIGHT = 1;

const Icon = ({ children }) => (
  <svg
    className="process-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const icons = [
  <Icon key="market">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.5-4.5" />
    <path d="M8 12.5v-2M11 12.5V8.5M14 12.5v-3" />
  </Icon>,
  <Icon key="clinic">
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M12 8v6M9 11h6" />
    <path d="M10 21v-3h4v3" />
  </Icon>,
  <Icon key="strategy">
    <circle cx="12" cy="12" r="9" />
    <path d="m16 8-2 6-6 2 2-6z" />
  </Icon>,
  <Icon key="build">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18M9 20V9" />
  </Icon>,
  <Icon key="launch">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </Icon>,
];

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
// others compress to numbered slices (title set vertically). Same strip on mobile.
export default function ProcessSteps() {
  const [active, setActive] = useState(0);
  const total = ACTIVE_WEIGHT + (steps.length - 1) * INACTIVE_WEIGHT;

  return (
    <div className="process">
      <div className="process-desktop" role="tablist" aria-label="Como funciona">
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
                    className="process-open"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, delay: 0.2, ease: EASE }}
                  >
                    <div className="process-icon-wrap">{icons[i]}</div>
                    <div className="process-content">
                      <h3 className="process-title">{s.title}</h3>
                      <p className="process-text">{s.text}</p>
                    </div>
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

    </div>
  );
}
