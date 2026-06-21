import { useState } from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { Card } from '../components/core/Card';
import { Input } from '../components/forms/Input';
import { Button } from '../components/core/Button';
import { BrandIcon } from '../icons/BrandIcon';

const EMAIL = 'nikhitag17@gmail.com';

const channels = [
  { icon: 'linkedin', label: 'LinkedIn', ping: '12ms', cta: 'Connect', href: 'https://www.linkedin.com/in/nikhita-gowda-527909276/' },
  { icon: 'github',   label: 'GitHub',   ping: '8ms',  cta: 'View',    href: 'https://github.com/GowdaNikhita' },
  { icon: 'mail',     label: 'Email',    ping: '—',    cta: 'Send',    href: `mailto:${EMAIL}` },
];

export function Contact() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [phase, setPhase] = useState('idle'); // idle | opening
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (phase !== 'idle') return;
    if (!name.trim() || !message.trim()) {
      setError('Add your name and a message, and I’ll open your email app pre-filled.');
      return;
    }
    setError('');
    setPhase('opening');
    const subject = `Portfolio contact from ${name.trim()}`;
    const body = `${message.trim()}\n\n— ${name.trim()}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setTimeout(() => setPhase('idle'), 2500);
  };

  const btnLabel = phase === 'opening' ? 'OPENING EMAIL…' : 'TRANSMIT MESSAGE →';

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
                <a
                  className="channel-cta"
                  href={c.href}
                  target={c.icon === 'mail' ? undefined : '_blank'}
                  rel={c.icon === 'mail' ? undefined : 'noopener noreferrer'}
                >
                  {c.cta} <ArrowUpRight size={13} />
                </a>
              </div>
            ))}
          </div>
          <Card variant="sunken" style={{ padding: 28 }}>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Input
                label="Name" prefix=">" name="name" value={name}
                onChange={(e) => setName(e.target.value)} placeholder="who's reaching out"
              />
              <Input
                label="Message" multiline name="message" value={message}
                onChange={(e) => setMessage(e.target.value)} placeholder="Compose your transmission…"
              />
              {error && (
                <span className="mono-key" style={{ color: 'var(--breach-red)' }}>{error}</span>
              )}
              <Button type="submit" variant="primary" mono size="lg" disabled={phase !== 'idle'}>
                {btnLabel}
              </Button>
              <span className="mono-key" style={{ color: 'var(--text-ghost)' }}>
                Opens your email app, pre-filled. Prefer direct? <a href={`mailto:${EMAIL}`} style={{ color: 'var(--phosphor-cyan)' }}>{EMAIL}</a>
              </span>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
