import { useEffect, useRef, useState } from 'react';

// Framer Ticker: content repeated until it overflows, translated continuously.
// direction 'up' (All works list, 40px/s) or 'left' (project gallery, ~61px/s). No hover pause.
export default function Ticker({ children, direction = 'left', speed = 60, gap = 0, className = '', style }) {
  const listRef = useRef(null);
  const setRef = useRef(null);
  const [copies, setCopies] = useState(2);
  const vertical = direction === 'up';

  useEffect(() => {
    const list = listRef.current;
    const set = setRef.current;
    if (!list || !set) return;
    const size = () => (vertical ? set.offsetHeight : set.offsetWidth) + gap;
    const viewport = () => (vertical ? list.parentElement.offsetHeight : list.parentElement.offsetWidth);
    const fit = () => setCopies(Math.max(2, Math.ceil(viewport() / Math.max(1, size())) + 1));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(list.parentElement);
    ro.observe(set);

    let raf;
    let last = performance.now();
    let offset = 0;
    const tick = (now) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const s = size();
      offset = (offset + speed * dt) % s;
      list.style.transform = vertical ? `translateY(${-offset}px)` : `translateX(${-offset}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [vertical, speed, gap]);

  const flex = { display: 'flex', flexDirection: vertical ? 'column' : 'row', gap, flexShrink: 0 };
  return (
    <div className={`ticker ${className}`} style={{ overflow: 'hidden', ...style }}>
      <div ref={listRef} style={{ ...flex, willChange: 'transform' }}>
        {Array.from({ length: copies }, (_, i) => (
          <div key={i} ref={i === 0 ? setRef : undefined} style={flex} aria-hidden={i > 0 || undefined}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
