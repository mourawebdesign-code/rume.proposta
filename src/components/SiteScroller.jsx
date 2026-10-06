import { useEffect, useRef } from 'react';

// Shows only the top of a full-page capture until the user hovers the card:
// hover scrolls slowly and steadily down to the bottom (one pass, no loop),
// and leaving the card eases it back up to the top from wherever it stopped.
// Speed (not duration) is kept consistent across cards: a medium-height page
// takes roughly 25-35s to reach the bottom, taller pages take proportionally
// longer. IntersectionObserver is not used here — the browser's native
// `loading="lazy"` already defers offscreen image loads.
const PX_PER_SECOND = 85;
const MIN_DESCEND = 15;
const MAX_DESCEND = 150;
const MIN_ASCEND = 1.5;
const MAX_ASCEND = 2.5;
const DESCEND_EASE = 'cubic-bezier(0.3, 0, 0.2, 1)';
const ASCEND_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

// Reads the live translateY off the element regardless of whether it's mid
// animation, finished-and-filled, or never animated — so a new animation can
// always start from the true current position with no visual jump.
function getCurrentY(img) {
  const t = getComputedStyle(img).transform;
  if (!t || t === 'none') return 0;
  const m = new DOMMatrixReadOnly(t);
  return m.m42;
}

export default function SiteScroller({ src, w, h, alt = '' }) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const animRef = useRef(null);
  const distRef = useRef(0);
  const enabledRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    enabledRef.current = !reduceMotion && canHover;

    const measure = () => {
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      if (!cw || !ch) return;
      const scaledHeight = (h / w) * cw;
      distRef.current = Math.max(0, scaledHeight - ch);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);

    const onEnter = (e) => {
      if (!enabledRef.current || e.pointerType !== 'mouse') return;
      const dist = distRef.current;
      if (dist <= 1) return;

      const startY = getCurrentY(img);
      animRef.current?.cancel();

      const remaining = Math.abs(-dist - startY);
      const duration = Math.min(MAX_DESCEND, Math.max(MIN_DESCEND, remaining / PX_PER_SECOND));

      img.style.willChange = 'transform';
      const anim = img.animate(
        [{ transform: `translateY(${startY}px)` }, { transform: `translateY(${-dist}px)` }],
        { duration: duration * 1000, easing: DESCEND_EASE, fill: 'forwards' }
      );
      animRef.current = anim;
    };

    const onLeave = (e) => {
      if (!enabledRef.current || e.pointerType !== 'mouse') return;
      const dist = distRef.current;
      const startY = getCurrentY(img);
      animRef.current?.cancel();

      if (dist <= 1 || startY >= -1) {
        img.style.transform = 'translateY(0px)';
        img.style.willChange = 'auto';
        return;
      }

      const ratio = Math.min(1, Math.abs(startY) / dist);
      const duration = MIN_ASCEND + ratio * (MAX_ASCEND - MIN_ASCEND);

      const anim = img.animate(
        [{ transform: `translateY(${startY}px)` }, { transform: 'translateY(0px)' }],
        { duration: duration * 1000, easing: ASCEND_EASE, fill: 'forwards' }
      );
      anim.onfinish = () => {
        img.style.willChange = 'auto';
      };
      animRef.current = anim;
    };

    container.addEventListener('pointerenter', onEnter);
    container.addEventListener('pointerleave', onLeave);

    return () => {
      ro.disconnect();
      container.removeEventListener('pointerenter', onEnter);
      container.removeEventListener('pointerleave', onLeave);
      animRef.current?.cancel();
    };
  }, [src, w, h]);

  return (
    <div className="media card-media site-viewport" ref={containerRef}>
      <img
        ref={imgRef}
        className="site-frame"
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
      />
    </div>
  );
}
