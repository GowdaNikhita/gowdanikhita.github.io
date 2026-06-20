import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Hero } from './sections/Hero';
import { Arsenal } from './sections/Arsenal';
import { IncidentReports } from './sections/IncidentReports';
import { MissionLog } from './sections/MissionLog';
import { ThreatIntel } from './sections/ThreatIntel';
import { Contact } from './sections/Contact';
import { BlogIndex } from './pages/BlogIndex';
import { BlogPost } from './pages/BlogPost';

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
const portfolioLinks = [
  ['Arsenal',     '/#arsenal'   ],
  ['Reports',     '/#projects'  ],
  ['Mission Log', '/#experience'],
  ['Telemetry',   '/#telemetry' ],
  ['Contact',     '/#contact'   ],
];

function Nav() {
  const location = useLocation();
  const onHome = location.pathname === '/';

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">[ NIKHITA_ ]</Link>
        <div className="nav-links">
          {onHome
            ? portfolioLinks.map(([t, h]) => (
                <a key={h} href={h} className="mono-key nav-link">{t}</a>
              ))
            : portfolioLinks.map(([t, h]) => (
                <a key={h} href={h} className="mono-key nav-link">{t}</a>
              ))
          }
          <Link to="/blog" className="mono-key nav-link" style={{ color: location.pathname.startsWith('/blog') ? 'var(--phosphor-cyan)' : undefined }}>
            Blog
          </Link>
        </div>
      </div>
    </nav>
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
  const [entered, setEntered] = useState(false);

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
