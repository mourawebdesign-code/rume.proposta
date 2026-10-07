import { useEffect, useRef } from 'react';

// Auto-scrolling preview of a full-page capture. Only ONE preview scrolls at a
// time: among the cards that are on screen, the one closest to the middle of
// the viewport. It glides down to the bottom at a steady, moderate speed
// (pixels per second, so tall pages simply take longer), rests, eases back up,
// rests, and repeats. A card that stops being the centred one eases back to
// its top; leaving the screen resets it. Hovering with a mouse pauses it.
const DESCEND_PX_PER_SECOND = 130;
const ASCEND_PX_PER_SECOND = 700;
const MIN_DESCEND_MS = 8000;
const MAX_DESCEND_MS = 200000;
const MIN_ASCEND_MS = 3000;
const MAX_ASCEND_MS = 9000;
const START_DELAY_MS = 900;
const REST_BOTTOM_MS = 1600;
const REST_TOP_MS = 1400;
const RESET_MS = 1200;
const DESCEND_EASE = 'cubic-bezier(0.25, 0, 0.75, 1)';
const ASCEND_EASE = 'cubic-bezier(0.45, 0, 0.25, 1)';

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

// Shared across every SiteScroller on the page, so they can agree on which
// single card is the active one.
const registry = new Set();
let frame = 0;

function pickActive() {
  frame = 0;
  const mid = window.innerHeight / 2;
  let best = null;
  let bestDistance = Infinity;
  registry.forEach((card) => {
    if (!card.isVisible()) return;
    const r = card.el.getBoundingClientRect();
    const d = Math.abs((r.top + r.bottom) / 2 - mid);
    if (d < bestDistance) {
      bestDistance = d;
      best = card;
    }
  });
  registry.forEach((card) => card.setActive(card === best));
}

function schedulePick() {
  if (!frame) frame = requestAnimationFrame(pickActive);
}

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', schedulePick, { passive: true });
  window.addEventListener('resize', schedulePick);
}

function currentY(img) {
  const t = getComputedStyle(img).transform;
  if (!t || t === 'none') return 0;
  return new DOMMatrixReadOnly(t).m42;
}

export default function SiteScroller({ src, w, h, alt = '' }) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let visible = false;
    let active = false;
    let running = false;
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
      if (!running || dist <= 1) return;
      const ms = clamp((dist / DESCEND_PX_PER_SECOND) * 1000, MIN_DESCEND_MS, MAX_DESCEND_MS);
      play(0, -dist, ms, DESCEND_EASE, () => {
        timer = setTimeout(ascend, REST_BOTTOM_MS);
      });
    };

    const ascend = () => {
      if (!running) return;
      const ms = clamp((dist / ASCEND_PX_PER_SECOND) * 1000, MIN_ASCEND_MS, MAX_ASCEND_MS);
      play(-dist, 0, ms, ASCEND_EASE, () => {
        timer = setTimeout(descend, REST_TOP_MS);
      });
    };

    const begin = () => {
      halt();
      img.style.transform = 'translateY(0px)';
      timer = setTimeout(descend, START_DELAY_MS);
    };

    const easeToTop = () => {
      const y = currentY(img);
      halt();
      if (y > -1) {
        img.style.transform = 'translateY(0px)';
        return;
      }
      anim = img.animate(
        [{ transform: `translateY(${y}px)` }, { transform: 'translateY(0px)' }],
        { duration: RESET_MS, easing: ASCEND_EASE, fill: 'forwards' }
      );
    };

    const sync = () => {
      const should = visible && active;
      if (should && !running) {
        running = true;
        begin();
      } else if (!should && running) {
        running = false;
        if (visible) {
          easeToTop();
        } else {
          halt();
          img.style.transform = 'translateY(0px)';
        }
      }
    };

    const card = {
      el: container,
      isVisible: () => visible,
      setActive: (value) => {
        if (value === active) return;
        active = value;
        sync();
      },
    };
    registry.add(card);

    measure();
    const ro = new ResizeObserver(() => {
      measure();
      if (running) begin();
    });
    ro.observe(container);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) active = false;
        sync();
        schedulePick();
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
      if (running) anim?.play();
    };
    container.addEventListener('pointerenter', onEnter);
    container.addEventListener('pointerleave', onLeave);

    return () => {
      registry.delete(card);
      ro.disconnect();
      io.disconnect();
      container.removeEventListener('pointerenter', onEnter);
      container.removeEventListener('pointerleave', onLeave);
      halt();
      schedulePick();
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
