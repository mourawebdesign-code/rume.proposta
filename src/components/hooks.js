import { useEffect, useState } from 'react';

// Framer breakpoints used by the reference: desktop >=1200, tablet 600–1199, mobile <600.
const query = (q) => (typeof window !== 'undefined' ? window.matchMedia(q).matches : false);

export function useMedia(q) {
  const [match, setMatch] = useState(() => query(q));
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, [q]);
  return match;
}

export function useBreakpoint() {
  const desktop = useMedia('(min-width: 1200px)');
  const mobile = useMedia('(max-width: 599px)');
  return desktop ? 'desktop' : mobile ? 'mobile' : 'tablet';
}

// Framer "appear" easings extracted from __framer__appearAnimationsContent
export const EASE_SOFT = [0.12, 0.23, 0.13, 0.96];
export const EASE_RISE = [0.03, 1.01, 0.59, 0.98];
// Framer default hover/variant spring
export const SPRING = { type: 'spring', stiffness: 500, damping: 60, mass: 1 };
