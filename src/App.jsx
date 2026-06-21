import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import { Hero } from './sections/Hero';
import { Arsenal } from './sections/Arsenal';
import { IncidentReports } from './sections/IncidentReports';
import { MissionLog } from './sections/MissionLog';
import { ThreatIntel } from './sections/ThreatIntel';
import { Contact } from './sections/Contact';
import { BlogIndex } from './pages/BlogIndex';
import { BlogPost } from './pages/BlogPost';
import { Button } from './components/core/Button';
import { useTheme } from './hooks';

/* ── Entry Gate ──────────────────────────────────────────── */
function EntryGate({ onDone }) {
  const [pct, setPct] = useState(0);
  const [msg, setMsg] = useState('ESTABLISHING SECURE CONNECTION');

  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(100, ((t - start) / 1100) * 100);
      setPct(Math.floor(p));
      if (p > 78) setMsg('ACCESS GRANTED');
      if (p < 100) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className="entry-gate" onClick={onDone}>
      <div className="entry-scanline" />
      <div className="entry-inner">
        <div className="mono-eyebrow" style={{ color: pct > 78 ? 'var(--signal-green)' : 'var(--phosphor-cyan)' }}>
          {pct > 78 ? '● ' : ''}{msg}…
        </div>
        <div className="entry-bar"><span style={{ width: `${pct}%` }} /></div>
        <div className="entry-meta mono-key">{String(pct).padStart(3, '0')}% · click anywhere to skip</div>
      </div>
    </div>
  );
}

/* ── Nav ─────────────────────────────────────────────────── */
// Recruiter-friendly labels mapped to in-page section ids.
const sections = [
  ['Skills',     'arsenal'   ],
  ['Projects',   'projects'  ],
  ['Experience', 'experience'],
  ['Impact',     'telemetry' ],
  ['Contact',    'contact'   ],
];

function ThemeToggle({ theme, toggle, className = 'theme-toggle' }) {
  const toLight = theme !== 'light';
  return (
    <button
      className={className}
      onClick={toggle}
      aria-label={toLight ? 'Switch to light mode' : 'Switch to dark mode'}
      title={toLight ? 'Light mode' : 'Dark mode'}
    >
      {toLight ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const onHome = location.pathname === '/';
  const isBlog = location.pathname.startsWith('/blog');
  const burgerRef = useRef(null);
  const closeRef = useRef(null);
  const firstRun = useRef(true);

  // Move focus into the dialog on open, return it to the trigger on close.
  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    if (open) closeRef.current?.focus();
    else burgerRef.current?.focus();
  }, [open]);

  // Navigate to a section whether or not we're on the home route.
  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    if (onHome) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `/#${id}`);
    } else {
      // Real hash URL so the section is shareable / refresh-safe; PortfolioPage
      // reads location.hash on mount and scrolls there.
      navigate(`/#${id}`);
    }
  };

  // Lock body scroll, wire Escape, and trap Tab focus within the menu while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key !== 'Tab') return;
      const menu = document.getElementById('mobile-menu');
      if (!menu) return;
      const f = menu.querySelectorAll('a[href], button:not([disabled])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
    <nav className="nav">
      <div className="container nav-inner">
        <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>[ NIKHITA_ ]</Link>

        <div className="nav-links">
          {sections.map(([label, id]) => (
            <a key={id} href={`/#${id}`} className="mono-key nav-link" onClick={go(id)}>{label}</a>
          ))}
          <Link
            to="/blog"
            className="mono-key nav-link"
            aria-current={isBlog ? 'page' : undefined}
            style={{ color: isBlog ? 'var(--phosphor-cyan)' : undefined }}
          >
            Blog
          </Link>
        </div>

        <div className="nav-actions">
          <ThemeToggle theme={theme} toggle={toggle} />
          <a href="/resume.pdf" download="Nikhita_Gowda_Resume.pdf" className="nav-resume mono-key">Resume</a>
          <button
            ref={burgerRef}
            className="nav-burger"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
    </nav>

      {/* Mobile full-screen overlay — sibling of <nav> so the nav's backdrop-filter
          doesn't become the containing block for this position:fixed element. */}
      <div id="mobile-menu" className={`nav-overlay${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Site menu" hidden={!open}>
        <div className="nav-overlay-top">
          <span className="nav-logo">[ NIKHITA_ ]</span>
          <button ref={closeRef} className="nav-burger" aria-label="Close menu" onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="nav-overlay-links">
          {sections.map(([label, id]) => (
            <a key={id} href={`/#${id}`} className="overlay-link" onClick={go(id)}>{label}</a>
          ))}
          <Link to="/blog" className="overlay-link" onClick={() => setOpen(false)}>Blog</Link>
        </div>
        <div className="nav-overlay-cta">
          <Button as="a" href="/resume.pdf" download="Nikhita_Gowda_Resume.pdf" variant="primary" size="lg" icon={<Download size={18} />} onClick={() => setOpen(false)}>
            Download Resume
          </Button>
          <button className="overlay-theme" onClick={toggle}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          </button>
        </div>
      </div>
    </>
  );
}

/* ── Footer ──────────────────────────────────────────────── */
function Footer() {
  const [found, setFound] = useState(false);
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="mono-key">© 2026 NIKHITA GOWDA · BUILT IN THE DARK</span>
        <button className="egg" onClick={() => setFound((v) => !v)} aria-label="hidden challenge">
          [?]
        </button>
        {found && (
          <span className="egg-msg mono-key">
            decode: <span className="cyan">SFRCe3kwdV9mMHVuZF9pdH0=</span>
          </span>
        )}
      </div>
    </footer>
  );
}

/* ── Portfolio page ──────────────────────────────────────── */
function PortfolioPage() {
  const location = useLocation();
  // Deep-link target from the URL hash (set by nav links and pasted/shared links).
  const scrollTarget = location.hash ? location.hash.slice(1) : null;

  let alreadyEntered = false;
  try { alreadyEntered = sessionStorage.getItem('sentinel_entered') === '1'; } catch (e) { /* no-op */ }

  // Skip the boot splash on repeat visits this session, or when deep-linking to a section.
  const [entered, setEntered] = useState(alreadyEntered || !!scrollTarget);

  useEffect(() => {
    if (entered) { try { sessionStorage.setItem('sentinel_entered', '1'); } catch (e) { /* no-op */ } }
  }, [entered]);

  useEffect(() => {
    if (!entered || !scrollTarget) return;
    const el = document.getElementById(scrollTarget);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'auto', block: 'start' }));
  }, [entered, scrollTarget]);

  return (
    <>
      {!entered && <EntryGate onDone={() => setEntered(true)} />}
      <div className={`app${entered ? ' in' : ''}`}>
        <main>
          <Hero />
          <Arsenal />
          <IncidentReports />
          <MissionLog />
          <ThreatIntel />
          <Contact />
        </main>
      </div>
    </>
  );
}

/* ── App root ────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/"          element={<PortfolioPage />} />
        <Route path="/blog"      element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
      <Footer />
    </>
  );
}
