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
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
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
