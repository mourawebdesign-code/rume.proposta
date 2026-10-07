import { motion } from 'motion/react';
import PortfolioCard from '../components/PortfolioCard';
import ProcessSteps from '../components/ProcessSteps';
import { portfolioSites } from '../data/portfolio';
import { EASE_RISE, EASE_SOFT } from '../components/hooks';

const [projectOne, projectTwo] = portfolioSites;

const WHATSAPP_URL = `https://wa.me/5521986044236?text=${encodeURIComponent(
  'Olá, Ryan! Vim pelo seu site e quero um site para minha clínica.'
)}`;

const WHATSAPP_FLOAT_URL = `https://wa.me/5521986044236?text=${encodeURIComponent(
  'Olá, Ryan! Vim pelo seu site e gostaria de conversar sobre o meu projeto.'
)}`;

function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={WHATSAPP_FLOAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com Ryan no WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.96L2 22l5.2-1.5A9.93 9.93 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 0 1 6.9 12.3l-.2.3.7 2.5-2.6-.7-.3.2A8.1 8.1 0 1 1 12.04 3.8zM8.6 7.4c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.7 1.1 2.9c.1.2 2 3.1 4.9 4.3 2.4.9 2.9.7 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4s-1.7-.8-2-.9-.5-.1-.7.1c-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.5-.6-.5z" />
      </svg>
    </a>
  );
}

function SiteLink({ project }) {
  return (
    <a className="featured-link" href={project.url} target="_blank" rel="noopener noreferrer">
      Acessar site
      <span className="featured-link-arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

const pillars = [
  {
    num: '01',
    stage: 'Descoberta',
    title: 'Encontrar sua clínica',
    text: 'Construímos uma presença própria para sua clínica ser encontrada além do Instagram, com estrutura preparada para Google e páginas dedicadas aos procedimentos que você oferece.',
    image: { src: '/journey/descoberta.webp', alt: 'Resultados do Google para a busca "harmonização facial no Recreio dos Bandeirantes", com várias clínicas concorrendo pela mesma pesquisa' },
    features: ['SEO estruturado', 'Páginas de procedimentos', 'Presença no Google'],
  },
  {
    num: '02',
    stage: 'Comparação',
    title: 'Confiar no seu trabalho',
    text: 'Quando uma paciente compara clínicas, preço não é a única coisa que pesa. Profissionais, resultados, estrutura e posicionamento ajudam a construir a percepção de valor antes do primeiro contato.',
    image: { src: '/journey/comparacao.webp', alt: 'Três sites de clínicas lado a lado: dois modelos antigos e desatualizados ao fundo, e um site moderno e premium em destaque' },
    features: ['Profissionais', 'Resultados', 'Diferenciais'],
  },
  {
    num: '03',
    stage: 'Decisão',
    title: 'Dar o próximo passo',
    text: 'Organizamos a experiência para responder dúvidas, reduzir objeções e deixar o caminho até o contato ou agendamento simples e evidente.',
    image: { src: '/journey/conversao.webp', alt: 'Celular com conversas de WhatsApp de pacientes interessadas pedindo informações e agendando avaliação' },
    features: ['Copy estratégica', 'Prova social', 'CTAs de agendamento'],
  },
];

export default function Home() {
  return (
    <main className="home">
      <WhatsAppFloat />
      <div className="home-light grain-surface">
        <header className="home-header">
          <div className="home-logo">
            <motion.div initial={{ y: 700 }} animate={{ y: 0 }} transition={{ duration: 1.5, delay: 0.2, ease: EASE_RISE }}>
              <div className="home-hero-headline">
                <span className="home-hero-line grain-ink">Sua clínica merece+</span>
                <span className="home-hero-line home-hero-line--big text-accent">Visibilidade</span>
              </div>
            </motion.div>
          </div>
          <div className="home-tags">
            <motion.p
              className="home-subheadline"
              initial={{ opacity: 0.001 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'linear' }}
            >
              Um site pode fazer sua clínica ser mais encontrada, transmitir mais valor e transformar visitas em novas
              oportunidades de agendamento.
            </motion.p>
          </div>
        </header>

        <section className="featured featured--row1">
          <motion.div
            className="featured-item"
            initial={{ opacity: 0.001, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.9, ease: EASE_RISE }}
          >
            <PortfolioCard project={projectOne} />
            <SiteLink project={projectOne} />
          </motion.div>
        </section>
      </div>

      <section className="home-dark grain-surface">
        <div className="home-strategic">
          <motion.div
            className="home-strategic-title-wrap"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.9, ease: EASE_SOFT }}
          >
            <h2 className="home-strategic-headline">
              <span className="home-strategic-line">Não é apenas sobre</span>
              <span className="home-strategic-line">
                Ser <span className="text-accent">bonito.</span>
              </span>
            </h2>
          </motion.div>
          <motion.p
            className="home-strategic-text"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_SOFT }}
          >
            Seu site precisa fazer a paciente perceber o valor da sua clínica, confiar no seu trabalho e escolher você
            antes mesmo de entrar em contato.
          </motion.p>
        </div>
      </section>

      <div className="home-light-2 grain-surface">
        <section className="featured featured--row2">
          <motion.div
            className="featured-item"
            initial={{ opacity: 0.001, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.9, ease: EASE_RISE }}
          >
            <PortfolioCard project={projectTwo} />
            <SiteLink project={projectTwo} />
          </motion.div>
        </section>
      </div>

      <section className="rume-strategy grain-surface">
        <div className="rume-strategy-inner">
          <motion.p
            className="t-small-14 rume-eyebrow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.7, ease: EASE_SOFT }}
          >
            Estratégia Ryan Moura
          </motion.p>
          <motion.h2
            className="rume-headline"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE_SOFT }}
          >
            <span className="rume-headline-line">Antes de agendar, sua paciente</span>
            <span className="rume-headline-line">
              Precisa passar por <span className="text-accent">3 decisões.</span>
            </span>
          </motion.h2>

          <div className="rume-pillars">
            {pillars.map((p, i) => (
              <motion.div
                className="rume-pillar"
                key={p.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.7, delay: 0.25 + i * 0.12, ease: EASE_SOFT }}
              >
                <div className="rume-pillar-meta">
                  <span className="t-small-14 rume-pillar-num">{p.num}</span>
                  <span className="rume-pillar-stage">{p.stage}</span>
                </div>
                <h3 className="rume-pillar-title">{p.title}</h3>
                <p className="rume-pillar-text">{p.text}</p>
                <motion.div
                  className="rume-pillar-media"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.7, delay: 0.35 + i * 0.12, ease: EASE_SOFT }}
                >
                  <img src={p.image.src} alt={p.image.alt} loading="lazy" />
                </motion.div>
                <div className="rume-pillar-features">
                  {p.features.map((f) => (
                    <span className="rume-pillar-feature" key={f}>
                      {f}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="rume-stat grain-surface">
        <div className="rume-stat-inner">
          <div className="rume-stat-top">
            <motion.h2
              className="rume-stat-number text-accent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.9, ease: EASE_SOFT }}
            >
              75%
            </motion.h2>
            <div className="rume-stat-copy">
              <motion.p
                className="rume-stat-sentence"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE_SOFT }}
              >
                Das pessoas julgam a credibilidade de uma empresa pelo design do seu site.
              </motion.p>
              <motion.p
                className="rume-stat-conclusion"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.8, delay: 0.35, ease: EASE_SOFT }}
              >
                Antes de conhecer sua clínica, entrar em contato ou agendar uma avaliação, a paciente já está formando
                uma percepção sobre o seu trabalho.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <section className="rume-process grain-surface">
        <div className="rume-process-inner">
          <motion.p
            className="t-small-14 rume-process-eyebrow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.7, ease: EASE_SOFT }}
          >
            Como funciona
          </motion.p>

          <div className="rume-process-intro">
            <motion.h2
              className="rume-process-headline"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE_SOFT }}
            >
              <span className="rume-process-headline-lines only-wide">
                <span className="rume-process-headline-line">Não criamos o mesmo site</span>
                <span className="rume-process-headline-line">
                  para <span className="text-accent">toda clínica.</span>
                </span>
              </span>
              <span className="rume-process-headline-lines only-mobile">
                <span className="rume-process-headline-line">Não criamos</span>
                <span className="rume-process-headline-line">o mesmo site</span>
                <span className="rume-process-headline-line">
                  para <span className="text-accent">toda clínica.</span>
                </span>
              </span>
            </motion.h2>
            <motion.p
              className="rume-process-support"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_SOFT }}
            >
              Antes de desenhar qualquer página, entendemos sua clínica, sua região, seus procedimentos e o que faz
              uma paciente escolher você ou outra opção.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE_SOFT }}
          >
            <ProcessSteps />
          </motion.div>
        </div>
      </section>

      <section className="rume-cta grain-surface">
        <div className="rume-cta-inner">
          <div className="rume-cta-top">
            <div className="rume-cta-headline-col">
              <motion.h2
                className="rume-cta-headline"
                initial="rest"
                whileInView="in"
                viewport={{ once: true, margin: '-15% 0px' }}
              >
                <motion.span
                  className="rume-cta-line"
                  variants={{ rest: { opacity: 0, y: 20 }, in: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.8, delay: 0, ease: EASE_SOFT }}
                >
                  Não se limite apenas ao
                </motion.span>
                <motion.span
                  className="rume-cta-line rume-cta-line--accent text-accent"
                  variants={{ rest: { opacity: 0, y: 20 }, in: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.8, delay: 0.1, ease: EASE_SOFT }}
                >
                  Instagram.
                </motion.span>
              </motion.h2>

              <motion.div
                className="rume-cta-action only-wide"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.7, delay: 0.25, ease: EASE_SOFT }}
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="rume-cta-button">
                  <span className="rume-cta-button-text">Quero um site para minha clínica</span>
                  <span className="rume-cta-button-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </motion.div>
            </div>

            <motion.div
              className="rume-cta-copy"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE_SOFT }}
            >
              <p className="rume-cta-paragraph">
                O Instagram mostra momentos do seu trabalho. Seu site organiza tudo o que uma paciente precisa
                perceber para confiar na sua clínica.
              </p>
              <p className="rume-cta-paragraph">
                Procedimentos, profissionais, resultados, estrutura, diferenciais e formas de contato reunidos em um
                endereço que pertence à sua marca.
              </p>

              <motion.div
                className="rume-cta-action only-mobile"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.7, delay: 0.35, ease: EASE_SOFT }}
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="rume-cta-button">
                  <span className="rume-cta-button-text">Quero um site para minha clínica</span>
                  <span className="rume-cta-button-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="rume-about grain-surface">
        <div className="rume-about-inner">
          <motion.div
            className="rume-about-photo"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.9, ease: EASE_SOFT }}
          >
            <img src="/about/ryan.webp" alt="Ryan Moura, especialista em web design e automação" loading="lazy" />
          </motion.div>

          <div className="rume-about-content">
            <motion.h2
              className="rume-about-headline"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_SOFT }}
            >
              <span className="rume-about-headline-wide">
                Prazer, eu sou Ryan Moura.
                <br />E vou cuidar do seu projeto.
              </span>
            </motion.h2>

            <motion.div
              className="rume-about-paragraphs"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_SOFT }}
            >
              <p>
                Sou especialista em web design e automação para negócios locais. Trabalhei em grandes empresas, onde
                aprendi o que separa um site comum de uma presença digital que realmente gera resultado.
              </p>
              <p>
                Hoje sigo carreira autônoma e coloco toda essa experiência a serviço de quem vive do próprio negócio.
                Cuido pessoalmente de cada projeto, da estratégia ao design, para que a sua marca seja vista, lembrada
                e escolhida.
              </p>
              <p>
                Meu objetivo é simples: melhorar a sua presença digital e trazer mais clientes da sua região, com um
                trabalho sob medida, sem templates e sem intermediários.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="rume-footer">
        <div className="rume-footer-inner">
          <div className="rume-footer-brand">
            <p className="rume-footer-mark">Ryan Moura</p>
            <p className="rume-footer-copy">© 2026. Todos os direitos reservados</p>
          </div>
          <a href="#" className="rume-footer-link">
            Política de privacidade
          </a>
        </div>
      </footer>
    </main>
  );
}
