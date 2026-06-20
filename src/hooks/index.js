import { useState, useEffect, useRef } from 'react';

export function useDecrypt(text, { duration = 800, delay = 0, run = true } = {}) {
  const [output, setOutput] = useState(text);
  useEffect(() => {
    if (!run) { setOutput(text); return; }
    const chars = '!<>-_\\/[]{}—=+*^?#01ABCDEF';
    let raf, start;
    const reveal = Math.max(1, Math.round(text.length));
    const tick = (t) => {
      if (!start) start = t;
      const elapsed = t - start;
      if (elapsed < delay) { raf = requestAnimationFrame(tick); return; }
      const p = Math.min(1, (elapsed - delay) / duration);
      const settled = Math.floor(p * reveal);
      let out = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') { out += ' '; continue; }
        out += i < settled ? text[i] : chars[Math.floor(Math.random() * chars.length)];
      }
      setOutput(out);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setOutput(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, run]);
  return output;
}

export function useInView(opts = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, opts);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}
