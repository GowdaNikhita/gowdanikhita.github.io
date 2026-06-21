import { useState, useEffect, useRef } from 'react';

/**
 * Keeps the "classified → declassified" motif but guarantees the content is
 * actually readable: it auto-reveals shortly after scrolling into view (so it
 * works on touch with no hover), and can be toggled by click/keyboard. With
 * reduced-motion it renders revealed immediately. The real text is always in
 * the DOM (only visually masked) so it stays available to screen readers.
 */
export function RedactedText({ children, label = 'CLASSIFIED' }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setRevealed(true); return; }

    const el = ref.current;
    if (!el) return;
    let timer;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        timer = setTimeout(() => setRevealed(true), 320);
        io.disconnect();
      }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);

  const toggle = () => setRevealed((v) => !v);

  return (
    <span
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={revealed ? 'Hide details' : 'Reveal details'}
      onClick={toggle}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
      style={{
        position: 'relative', display: 'inline',
        borderRadius: 'var(--radius-xs)',
        color: revealed ? 'var(--text-secondary)' : 'transparent',
        background: revealed ? 'transparent' : 'var(--surface-sunken)',
        boxShadow: revealed ? 'none' : 'inset 0 0 0 1px var(--border-strong)',
        transition: 'color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)',
        cursor: 'pointer',
        padding: revealed ? 0 : '0 4px',
        userSelect: revealed ? 'auto' : 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {children}
      {!revealed && (
        <span aria-hidden="true" style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-label)',
          color: 'var(--text-ghost)', pointerEvents: 'none', overflow: 'hidden',
        }}>
          {label}
        </span>
      )}
    </span>
  );
}
