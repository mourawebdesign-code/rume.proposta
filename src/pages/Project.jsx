import { Link, Navigate, useParams } from 'react-router-dom';
import Media from '../components/Media';
import Ticker from '../components/Ticker';
import Footer from '../components/Footer';
import { getProject, projects } from '../data/projects';
import { useBreakpoint } from '../components/hooks';

export default function Project() {
  const { slug } = useParams();
  const bp = useBreakpoint();
  const project = getProject(slug);
  if (!project) return <Navigate to="/all-works" replace />;

  const idx = projects.indexOf(project);
  const next = projects[(idx + 2) % projects.length];

  return (
    <>
      <main className="project">
        <header className="p-header">
          <div className="p-title-wrap">
            <h1 className="p-title" style={{ color: project.color }}>
              {project.title}
            </h1>
            <h2 className="t-tag p-tag">{project.category}</h2>
          </div>
          <div className="p-ticker-wrap">
            <Ticker direction="left" speed={bp === 'mobile' ? 40 : 61} className="p-ticker">
              {project.gallery.map((src, i) => (
                <div className="p-loop" key={i}>
                  <Media className="p-loop-img" poster={src} tint={project.color} />
                </div>
              ))}
            </Ticker>
          </div>
        </header>

        <section className="p-details">
          <div className="p-roles">
            {project.credits.map(([r]) => (
              <p className="t-label-16" key={r}>
                {r.toUpperCase()}
              </p>
            ))}
          </div>
          <div className="p-names">
            {project.credits.map(([r, n]) => (
              <p className="t-body-16" key={r}>
                {n}
              </p>
            ))}
          </div>
        </section>

        <section className="p-video">
          <Media className="p-film" video={project.film} tint={project.color} />
        </section>

        <section className="p-description">
          {project.description.map(([h, t]) => (
            <div key={h}>
              <h3>{h}</h3>
              <p>{t}</p>
            </div>
          ))}
        </section>

        <section className="p-other">
          <p className="t-title-48 p-other-title">Other works</p>
          <Link to={`/works/${next.slug}`} className="p-other-card">
            <div className="card-bg p-other-bg">
              <Media className="card-media" poster={next.poster} video={next.video} tint={next.color} />
              <div className="card-text">
                <p className="card-title">{next.title}</p>
              </div>
            </div>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
