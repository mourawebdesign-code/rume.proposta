import Footer from '../components/Footer';

export default function Contact() {
  return (
    <main className="contact">
      <section className="contact-details">
        <div className="contact-block">
          <h2 className="t-tag">send an email</h2>
          <a className="t-title-48 contact-value" href="mailto:hello@apexfilms.com">
            hello@apexfilms.com
          </a>
        </div>
        <div className="contact-block contact-block--address">
          <h2 className="t-tag">drop by</h2>
          <a className="t-title-48 contact-value" href="https://maps.google.com" target="_blank" rel="noreferrer">
            Singel 258, 1016 AB Amsterdam, Netherlands
          </a>
        </div>
        <div className="contact-block">
          <h2 className="t-tag">phone us</h2>
          <a className="t-title-48 contact-value" href="tel:+31715498627">
            +31 71 549 8627
          </a>
        </div>
      </section>
      <Footer className="footer--contact" />
    </main>
  );
}
