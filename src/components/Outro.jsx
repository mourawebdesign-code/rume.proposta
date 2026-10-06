import { motion } from 'motion/react';
import Media from './Media';

// "Section Outro": two clipped text rows that rise 130px into view, and a portrait image
// (overlapping the second row) that rises 50px. Measured decay ≈ soft overdamped spring.
const rise = { type: 'spring', stiffness: 60, damping: 20, mass: 1 };

export default function Outro({ top, bottom, image, variant = 'home' }) {
  return (
    <section className={`outro outro--${variant}`}>
      <div className="outro-text">
        <div className="outro-row">
          <motion.h3 className="t-display-100" initial={{ y: 130 }} whileInView={{ y: 0 }} viewport={{ once: false }} transition={rise}>
            {top}
          </motion.h3>
        </div>
        <div className="outro-row">
          <motion.h3
            className="t-display-100"
            initial={{ y: 130 }}
            whileInView={{ y: 0 }}
            viewport={{ once: false }}
            transition={{ ...rise, delay: 0.05 }}
          >
            {bottom}
          </motion.h3>
        </div>
      </div>
      {/* reference keeps this wrapper offset by 50px (it never animates back) */}
      <div className="outro-image-wrap" style={{ transform: 'translateY(50px)' }}>
        <Media className="outro-image" poster={image} tint="rgb(150, 170, 190)" />
      </div>
    </section>
  );
}
