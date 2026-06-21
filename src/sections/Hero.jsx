import { useState, useEffect } from 'react';
import { Download, ArrowRight } from 'lucide-react';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { StatusPill } from '../components/feedback/StatusPill';
import { useDecrypt } from '../hooks';

export function Hero() {
  const [run, setRun] = useState(true);
  const name = useDecrypt('NIKHITA GOWDA', { duration: 800, run });
  const role = useDecrypt('Security Engineer', { duration: 700, delay: 200, run });

  useEffect(() => {
    const t = setTimeout(() => setRun(false), 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-radar" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-inner">
        <Card variant="glass" style={{ maxWidth: 720, padding: '40px 44px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
            <span className="mono-eyebrow">// EXECUTIVE BRIEFING</span>
          </div>
          <h1 className="hero-name">{name}</h1>
          <p className="hero-role">{role}</p>
          <div style={{ margin: '26px 0 14px' }}>
            <StatusPill tone="live">Actively Seeking Opportunities</StatusPill>
          </div>
          <p className="hero-summary">
            Security engineer with about a year of hands-on experience in threat modeling,
            secure code review, and cloud security automation. I ship production Python and
            deploy infrastructure on AWS.
          </p>
          <p className="hero-focus">
            <span className="mono-key">Focus:</span> Threat Intelligence · LLM Red-Teaming · Cloud Security Automation
          </p>
          <div className="hero-cta">
            <Button as="a" href="/resume.pdf" download="Nikhita_Gowda_Resume.pdf" variant="primary" size="lg" icon={<Download size={18} />}>
              Download Resume
            </Button>
            <Button as="a" href="#projects" variant="secondary" size="lg" iconRight={<ArrowRight size={16} />}>
              View Projects
            </Button>
          </div>
        </Card>
      </div>
      <div className="scroll-hint mono-eyebrow">SCROLL ↓</div>
    </section>
  );
}
