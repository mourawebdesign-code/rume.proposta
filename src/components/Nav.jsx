import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import RollLink from './RollLink';
import { EASE_SOFT } from './hooks';

// Fixed header. Home: logo hidden until the hero wordmark scrolls away; entrance y:-150 → 0.
export default function Nav() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const on = () => setScrolled(window.scrollY > 460);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [isHome]);

  useEffect(() => setOpen(false), [pathname]);

  const logoVisible = !isHome || scrolled;

  return (
    <>
      <motion.div
        className="nav-container"
        initial={isHome ? { opacity: 0.001, y: -150 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: EASE_SOFT }}
      >
        <nav className="nav">
          <div className="nav-left">
            <RollLink to="/all-works">Works</RollLink>
            <RollLink to="/about">About</RollLink>
          </div>
          <Link
            to="/"
            className="nav-logo"
            style={{ opacity: logoVisible ? 1 : 0, pointerEvents: logoVisible ? 'auto' : 'none' }}
          >
            APEX FILMS
          </Link>
          <div className="nav-right">
            <RollLink to="/contact">Let&apos;s Talk</RollLink>
          </div>
          <button type="button" className="nav-menu-btn t-nav" onClick={() => setOpen(true)}>
            Menu
          </button>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: EASE_SOFT }}
          >
            <div className="menu-top">
              <Link to="/" className="nav-logo menu-logo">
                APEX FILMS
              </Link>
              <button type="button" className="menu-close t-nav" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <div className="menu-links">
              <Link to="/all-works">works</Link>
              <Link to="/about">about</Link>
              <Link to="/contact">let&apos;s talk</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
