import { useEffect, useRef } from 'react';

// Auto-scrolling preview of a full-page capture. While the card is on screen
// (at least half visible) the capture glides down to the bottom at a steady,
// moderate speed (pixels per second, so tall pages simply take longer), rests
// a moment, eases back up, rests, and repeats. Leaving the screen resets it to
// the top; hovering with a mouse pauses it so the visitor can look closely.
// Distances come from the live container size, so every card/breakpoint gets
// its own correct travel and the same on-screen speed.
const DESCEND_PX_PER_SECOND = 130;
const ASCEND_PX_PER_SECOND = 700;
const MIN_DESCEND_MS = 8000;
const MAX_DESCEND_MS = 200000;
const MIN_ASCEND_MS = 3000;
const MAX_ASCEND_MS = 9000;
const START_DELAY_MS = 900;
const REST_BOTTOM_MS = 1600;
const REST_TOP_MS = 1400;
const DESCEND_EASE = 'cubic-bezier(0.25, 0, 0.75, 1)';
const ASCEND_EASE = 'cubic-bezier(0.45, 0, 0.25, 1)';

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export default function SiteScroller({ src, w, h, alt = '' }) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let visible = false;
    let hovering = false;
    let dist = 0;
    let timer = null;
    let anim = null;

    const measure = () => {
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      if (!cw || !ch) return;
      dist = Math.max(0, (h / w) * cw - ch);
    };

    const halt = () => {
      clearTimeout(timer);
      anim?.cancel();
      anim = null;
    };

    const play = (from, to, duration, easing, onDone) => {
      anim = img.animate(
        [{ transform: `translateY(${from}px)` }, { transform: `translateY(${to}px)` }],
        { duration, easing, fill: 'forwards' }
      );
      if (hovering) anim.pause();
      anim.onfinish = onDone;
    };

    const descend = () => {
      if (!visible || dist <= 1) return;
      const ms = clamp((dist / DESCEND_PX_PER_SECOND) * 1000, MIN_DESCEND_MS, MAX_DESCEND_MS);
      play(0, -dist, ms, DESCEND_EASE, () => {
        timer = setTimeout(ascend, REST_BOTTOM_MS);
      });
    };

    const ascend = () => {
      if (!visible) return;
      const ms = clamp((dist / ASCEND_PX_PER_SECOND) * 1000, MIN_ASCEND_MS, MAX_ASCEND_MS);
      play(-dist, 0, ms, ASCEND_EASE, () => {
        timer = setTimeout(descend, REST_TOP_MS);
      });
    };

    const restart = () => {
      halt();
      img.style.transform = 'translateY(0px)';
      if (visible) timer = setTimeout(descend, START_DELAY_MS);
    };

    measure();
    const ro = new ResizeObserver(() => {
      measure();
      if (visible) restart();
    });
    ro.observe(container);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        restart();
      },
      { threshold: 0.5 }
    );
    io.observe(container);

    const onEnter = (e) => {
      if (e.pointerType !== 'mouse') return;
      hovering = true;
      anim?.pause();
    };
    const onLeave = (e) => {
      if (e.pointerType !== 'mouse') return;
      hovering = false;
      anim?.play();
    };
    container.addEventListener('pointerenter', onEnter);
    container.addEventListener('pointerleave', onLeave);

    return () => {
      ro.disconnect();
      io.disconnect();
      container.removeEventListener('pointerenter', onEnter);
      container.removeEventListener('pointerleave', onLeave);
      halt();
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
