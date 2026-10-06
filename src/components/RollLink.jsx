import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SPRING } from './hooks';

const MotionLink = motion.create(Link);

// Nav/filter link: two stacked copies (3px apart) inside a 14px clip; hover rolls up 17px.
export default function RollLink({ to, children, color, className = '', hover = true, onClick }) {
  return (
    <MotionLink
      to={to}
      onClick={onClick}
      className={`roll ${className}`}
      style={color ? { color } : undefined}
      initial="rest"
      animate="rest"
      whileHover={hover ? 'hover' : undefined}
    >
      <motion.span className="roll-inner" variants={{ rest: { y: 0 }, hover: { y: -17 } }} transition={SPRING}>
        <span className="t-nav">{children}</span>
        <span className="t-nav" aria-hidden="true">
          {children}
        </span>
      </motion.span>
    </MotionLink>
  );
}
