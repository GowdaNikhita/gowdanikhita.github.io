import { TimelineItem } from '../components/data/TimelineItem';

const entries = [
  {
    date: '2026',
    status: 'active',
    title: 'Application Threat Intelligence Intern — Keysight Technologies',
    body: 'Automated BlackDuck SCA across the full dependency tree. Found 3 high-severity CVEs, flagged ~40% of deps, and cut manual triage ~30%. Currently building STRIDE threat models, and resolved TLS/CORS issues in a C-to-Python-to-HTTP pipeline.',
  },
  {
    date: '2025',
    status: 'active',
    title: 'M.S. Computer Science & Engineering — Ohio State University',
    body: 'GPA 4.0/4.0 · NSA-designated program. Coursework: Intro to Cybersecurity, Distributed Systems, Advanced Algorithms, Data Mining. Expected May 2027.',
  },
  {
    date: '2024',
    status: 'complete',
    title: 'Web Development Intern — Codsoft',
    body: 'Built 5+ full-stack apps with access-controlled REST APIs, RBAC, and server-side input validation using React, Node.js, MongoDB. Designed a microservices job board with clean auth/business-logic separation.',
  },
  {
    date: '2021',
    status: 'success',
    title: 'B.E. Computer Science & Engineering — JSS Science and Technology University',
    body: 'GPA 9.4/10 · Coursework: Cybersecurity, Cryptography, Software Engineering. Graduated Jun 2025.',
  },
];

export function MissionLog() {
  return (
    <section id="experience" className="section">
      <div className="container container-narrow">
        <header className="section-head">
          <span className="mono-eyebrow">// MISSION LOG</span>
          <h2 className="section-title">Experience &amp; Education</h2>
        </header>
        <div className="timeline">
          {entries.map((e, i) => (
            <TimelineItem key={e.title} date={e.date} status={e.status} title={e.title} last={i === entries.length - 1}>
              {e.body}
            </TimelineItem>
          ))}
        </div>
      </div>
    </section>
  );
}
