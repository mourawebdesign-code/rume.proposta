import { useLayoutEffect, useRef, useState } from 'react';

// Framer "fit text": an SVG whose viewBox is the text box, so the wordmark always spans
// the full width of its wrapper (1360px desktop → 1346px glyph box, scale 0.99).
export default function FitText({ children, className = '', color = 'var(--text)', grain = false }) {
  const textRef = useRef(null);
  const [box, setBox] = useState({ x: 0, y: -80, w: 440, h: 100 });

  useLayoutEffect(() => {
    let alive = true;
    const measure = () => {
      if (!alive || !textRef.current) return;
      const b = textRef.current.getBBox();
      if (b.width) setBox({ x: b.x, y: b.y, w: b.width, h: b.height });
    };
    measure();
    document.fonts?.ready.then(measure);
    return () => {
      alive = false;
    };
  }, [children]);

  const grainId = 'fittext-grain-ink';

  return (
    <svg className={className} viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {grain && (
        <defs>
          <pattern id={grainId} patternUnits="userSpaceOnUse" width="34" height="34">
            <image href="/grain-text.png" width="34" height="34" preserveAspectRatio="none" />
          </pattern>
        </defs>
      )}
      <text
        ref={textRef}
        x="0"
        y="0"
        fill={grain ? `url(#${grainId})` : color}
        style={{ font: '800 100px var(--display)', letterSpacing: '-2.5px' }}
      >
        {children}
      </text>
    </svg>
  );
}
