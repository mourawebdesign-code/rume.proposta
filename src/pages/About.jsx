import Media from '../components/Media';
import Outro from '../components/Outro';
import Footer from '../components/Footer';

const team = [
  ['Name Surname', 'Partner'],
  ['Name Surname', 'Director'],
  ['Name Surname', 'Partner'],
];

const roles = [
  'Director', 'Director', 'Producer', 'Director', 'Cinematographer', 'Camera Operator', 'Camera Operator',
  'Grip + Electric', 'Sound Design', 'Sound Design', 'Film Assistant', 'Sound Assistant', 'Make up & Hair',
  'Colour', 'Styling', 'Styling Assistant',
];

const awards = [
  ['Grand Prize Award', 'Award Name Here', '2023'],
  ['Official Selection', 'Festival Name Here', '2022'],
  ['Official Selection', 'Competition Name', '2022'],
];

const INTRO =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat, duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.';

export default function About() {
  return (
    <>
      <main className="about">
        <header className="about-hero">
          {/* mobile composition: one text row per fragment */}
          <h3 className="t-display-100 about-lines only-mobile">
            <span className="about-line">We believe that every</span>
            <span className="about-line">
              story <Media className="about-inline" tint="rgb(219, 160, 160)" />
            </span>
            <span className="about-line">is unique</span>
            <span className="about-line">and deserves to be told</span>
            <span className="about-line">in a way that captivates</span>
            <span className="about-line">
              <Media className="about-inline about-inline--m5" tint="rgb(219, 220, 171)" /> every
            </span>
            <span className="about-line">audience.</span>
          </h3>
          <h3 className="t-display-100 about-lines only-wide">
            <span className="about-line">We believe that every</span>
            <span className="about-line">
              story <Media className="about-inline about-inline--first" tint="rgb(219, 160, 160)" /> is unique
            </span>
            <span className="about-line">and deserves to be told</span>
            <span className="about-line">in a way that captivates</span>
            <span className="about-line">
              <Media className="about-inline" tint="rgb(219, 220, 171)" /> every audience.
            </span>
          </h3>
        </header>

        <section className="about-intro">
          <p>{INTRO}</p>
        </section>

        <section className="about-team">
          {team.map(([name, role], i) => (
            <div className="team-card" key={i}>
              <div className="team-img-wrap">
                <Media className="team-img" tint="rgb(140, 140, 140)" />
              </div>
              <div className="team-title">
                <p className="t-title-24">{name}</p>
                <h3 className="t-small-14 muted">{role}</h3>
              </div>
            </div>
          ))}
        </section>

        <section className="about-list">
          <div className="list-title">
            <div className="list-title-col">
              <p className="t-title-48">impossible</p>
              <p className="t-title-24">without</p>
            </div>
            <p className="t-title-48 list-help">the help</p>
            <p className="t-title-24 list-of">of</p>
          </div>
          <div className="credits">
            <div className="credits-roles">
              {roles.map((r, i) => (
                <p className="t-label-16" key={i}>
                  {r.toUpperCase()}
                </p>
              ))}
            </div>
            <div className="credits-names">
              {roles.map((_, i) => (
                <p className="t-body-16" key={i}>
                  Name Surname
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="about-awards">
          <div className="awards-title">
            <p className="t-title-24">PROUDLY</p>
            <p className="t-title-48">AWARDED</p>
            <p className="t-title-24 awards-with">WITH</p>
          </div>
          <div className="awards">
            {awards.map(([label, name, year], i) => (
              <div className="award" key={i}>
                <div className="award-logo" />
                <div className="award-text">
                  <p className="t-label-16 award-label">{label}</p>
                  <p className="t-title-24">{name}</p>
                  <h3 className="t-small-14">{year}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Outro top="visual" bottom="storytellers" variant="page" />
      </main>
      <Footer />
    </>
  );
}
