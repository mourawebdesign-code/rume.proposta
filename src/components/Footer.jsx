import { Link } from 'react-router-dom';

const Small = ({ to, href, children }) =>
  to ? (
    <Link to={to} className="f-small">
      {children}
    </Link>
  ) : (
    <a href={href} className="f-small" target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {children}
    </a>
  );

const Group = ({ big, children, className = '' }) => (
  <div className={`f-group ${className}`}>
    <p className="f-big">{big}</p>
    <div className="f-links">{children}</div>
  </div>
);

// Footer: desktop = 2 rows (2 + 3 groups), tablet = 3 rows, mobile = stacked centred groups.
export default function Footer({ className = '' }) {
  const socials = (
    <Group big="Socials" key="s">
      <Small href="https://twitter.com/">Twitter</Small>
      <Small href="https://www.instagram.com/">Instagram</Small>
      <Small href="https://vimeo.com/">Vimeo</Small>
    </Group>
  );
  const work = (
    <Group big="work" key="w">
      <Small to="/all-works">All projects</Small>
    </Group>
  );
  const talk = (
    <Group big="let's talk" key="t">
      <Small href="mailto:name@email.com">email</Small>
      <Small href="tel:+123456890">phone</Small>
    </Group>
  );
  const about = (
    <Group big="about" key="a">
      <Small to="/about">about us</Small>
    </Group>
  );
  const madeBy = (
    <Group big="made by" key="m" className="f-group--made">
      <span className="f-pair">
        <Small href="https://www.ena.supply/">ena</Small>
        <span className="f-small f-comma">,</span>
      </span>
      <Small href="https://arqe.ai/">Arqé</Small>
    </Group>
  );

  return (
    <footer className={`footer ${className}`}>
      <div className="footer-inner">
        <div className="f-row f-row--1">
          {socials}
          {work}
        </div>
        <div className="f-row f-row--2">
          {talk}
          {about}
          <span className="f-tablet-break" />
          {madeBy}
        </div>
      </div>
    </footer>
  );
}
