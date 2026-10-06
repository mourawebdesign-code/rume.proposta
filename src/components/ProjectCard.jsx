import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Media from './Media';
const MotionLink = motion.create(Link);
// measured: text still ~25% away from rest position 120ms into the hover
const TEXT_SPRING = { type: 'spring', stiffness: 400, damping: 40, mass: 1 };

// Home "Featured Video Card".
// Desktop: light title centred under the media; hover → background turns the project colour,
// light title leaves upward and a dark title + category block rises in.
// Tablet/mobile ("Card Mobile"): static light title + category.
export default function ProjectCard({ project, interactive, className = '' }) {
  const { slug, title, category, color, poster, video } = project;

  if (!interactive) {
    return (
      <Link to={`/works/${slug}`} className={`card card--static ${className}`}>
        <div className="card-bg">
          <Media className="card-media" poster={poster} video={video} tint={color} />
          <div className="card-text">
            <p className="card-title">{title}</p>
            <p className="card-cat">{category}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <MotionLink to={`/works/${slug}`} className={`card ${className}`} initial="rest" animate="rest" whileHover="hover">
      <motion.div
        className="card-bg"
        variants={{ rest: { backgroundColor: 'rgb(20, 20, 20)' }, hover: { backgroundColor: color } }}
        transition={{ duration: 0.15, ease: [0.44, 0, 0.56, 1] }}
      >
        <Media className="card-media" poster={poster} video={video} tint={color} />
        <div className="card-text">
          <motion.div className="card-text-a" variants={{ rest: { opacity: 1, y: 0 }, hover: { opacity: 0, y: -12 } }} transition={TEXT_SPRING}>
            <p className="card-title">{title}</p>
          </motion.div>
          <motion.div className="card-text-b" variants={{ rest: { opacity: 0, y: 44 }, hover: { opacity: 1, y: 0 } }} transition={TEXT_SPRING}>
            <p className="card-title card-title--dark">{title}</p>
            <p className="card-cat card-cat--dark">{category}</p>
          </motion.div>
        </div>
      </motion.div>
    </MotionLink>
  );
}
