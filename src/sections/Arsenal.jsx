import { SkillChip } from '../components/data/SkillChip';
import { useInView } from '../hooks';

const cats = [
  {
    key: 'SECURITY',
    tone: 'offensive',
    items: ['LLM Red-Teaming', 'Prompt Injection', 'Threat Modeling', 'Penetration Testing', 'SCA (BlackDuck)', 'CVE Triage'],
  },
  {
    key: 'CLOUD & INFRA',
    tone: 'defensive',
    items: ['AWS (EC2/EKS/Lambda)', 'Terraform', 'Docker', 'ArgoCD', 'Prometheus', 'GitHub Actions'],
  },
  {
    key: 'ENGINEERING',
    tone: 'forensics',
    items: ['Python', 'C/C++', 'JavaScript', 'Anthropic API', 'PyTorch', 'Pydantic v2'],
  },
];

export function Arsenal() {
  const [ref, seen] = useInView();

  return (
    <section id="arsenal" className="section" ref={ref}>
      <div className="container">
        <header className="section-head">
          <span className="mono-eyebrow">// ARSENAL</span>
          <h2 className="section-title">Tools &amp; Capabilities</h2>
        </header>
        <div className="arsenal-grid">
          {cats.map((c) => (
            <div key={c.key}>
              <div className="arsenal-col-head">
                <span className="mono-eyebrow" style={{ color: 'var(--text-primary)' }}>{c.key}</span>
                <span className="arsenal-rule" />
              </div>
              <div className="chip-wrap">
                {c.items.map((s, i) => (
                  <span key={s} className={`chip-anim${seen ? ' in' : ''}`} style={{ transitionDelay: `${i * 45}ms` }}>
                    <SkillChip tone={c.tone}>{s}</SkillChip>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
