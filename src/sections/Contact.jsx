import { useState } from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { Card } from '../components/core/Card';
import { Input } from '../components/forms/Input';
import { Button } from '../components/core/Button';
import { BrandIcon } from '../icons/BrandIcon';

const channels = [
  { icon: 'linkedin', label: 'LinkedIn',  ping: '12ms', cta: 'Connect', href: 'https://linkedin.com/in/nikhitagowda' },
  { icon: 'github',   label: 'GitHub',    ping: '8ms',  cta: 'View',    href: 'https://github.com/GowdaNikhita'      },
  { icon: 'mail',     label: 'Email',     ping: '—',    cta: 'Send',    href: 'mailto:nikhitag17@gmail.com'          },
];

export function Contact() {
  const [phase, setPhase] = useState('idle');

  const submit = (e) => {
    e.preventDefault();
    if (phase !== 'idle') return;
    setPhase('encrypting');
    setTimeout(() => setPhase('sent'),  700);
    setTimeout(() => setPhase('idle'), 3200);
  };

  const btnLabel = phase === 'encrypting' ? 'ENCRYPTING…' : phase === 'sent' ? 'TRANSMITTED ✓' : 'TRANSMIT MESSAGE →';

  return (
    <section id="contact" className="section">
      <div className="container container-narrow">
        <header className="section-head">
          <span className="mono-eyebrow">// OPEN CHANNELS</span>
          <h2 className="section-title">Establish Connection</h2>
        </header>
        <div className="contact-grid">
          <div className="channels">
            {channels.map((c) => (
              <div className="channel" key={c.label}>
                <span className="channel-dot" />
                {c.icon === 'mail'
                  ? <Mail size={18} className="channel-icon" />
                  : <span className="channel-icon" style={{ display: 'inline-flex' }}><BrandIcon name={c.icon} size={18} /></span>
                }
                <span className="channel-label">{c.label}</span>
                <span className="channel-ping mono-key">ping: {c.ping}</span>
                <a className="channel-cta" href={c.href} target="_blank" rel="noopener noreferrer">
                  {c.cta} <ArrowUpRight size={13} />
                </a>
              </div>
            ))}
          </div>
          <Card variant="sunken" style={{ padding: 28 }}>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Input label="Name" prefix=">" placeholder="who's reaching out" />
              <Input label="Message" multiline placeholder="Compose your transmission…" />
              <Button type="submit" variant="primary" mono size="lg" disabled={phase !== 'idle'}>
                {btnLabel}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
