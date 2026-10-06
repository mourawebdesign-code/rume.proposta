import { motion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import RollLink from '../components/RollLink';
import Ticker from '../components/Ticker';
import Media from '../components/Media';
import Outro from '../components/Outro';
import Footer from '../components/Footer';
import { categories, projects } from '../data/projects';
import { SPRING, useBreakpoint } from '../components/hooks';

function Row({ p }) {
  return (
    <motion.div className="aw-row" initial="rest" animate="rest" whileHover="hover">
      <Link to={`/works/${p.slug}`} className="aw-title-wrap">
        <p className="aw-title t-title-48">{p.title}</p>
      </Link>
      <div className="aw-cat-wrap">
        <h3 className="t-small-14 aw-cat">{p.category}</h3>
      </div>
      <motion.div className="aw-video" variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }} transition={SPRING}>
        <Media poster={p.poster} video={p.video} tint={p.color} />
      </motion.div>
    </motion.div>
  );
}

function Item({ p }) {
  return (
    <Link to={`/works/${p.slug}`} className="aw-item">
      <Media className="aw-item-media" poster={p.poster} video={p.video} tint={p.color} />
      <p className="aw-title t-title-48">{p.title}</p>
      <h3 className="t-small-14 aw-cat">{p.category}</h3>
    </Link>
  );
}

export default function AllWorks() {
  const { category } = useParams();
  const bp = useBreakpoint();
  const active = categories.find((c) => c.path === (category ? `/all-works/${category}` : '/all-works'));
  const list = active?.match ? projects.filter((p) => p.category === active.match) : projects;

  return (
    <>
      <main className="aw">
        <header className="aw-header">
          <h3 className="t-display-100">all Works</h3>
          <div className="aw-filter">
            {categories.map((c) => (
              <RollLink key={c.path} to={c.path} hover={bp === 'desktop'} color={c === active ? 'var(--text)' : 'var(--muted)'}>
                {c.label}
              </RollLink>
            ))}
          </div>
        </header>
        <section className="aw-projects">
          {bp === 'desktop' ? (
            <Ticker direction="up" speed={40} className="aw-ticker">
              {list.map((p) => (
                <Row key={p.slug} p={p} />
              ))}
            </Ticker>
          ) : (
            <Ticker direction="up" speed={40} gap={bp === 'mobile' ? 45 : 39} className="aw-ticker">
              {list.map((p) => (
                <Item key={p.slug} p={p} />
              ))}
            </Ticker>
          )}
        </section>
        <Outro top="one shot" bottom="at the time" variant="works" />
      </main>
      <Footer />
    </>
  );
}
