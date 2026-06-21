import { Card } from '../components/core/Card';
import { SeverityBadge } from '../components/feedback/SeverityBadge';
import { RedactedText } from '../components/data/RedactedText';
import { Button } from '../components/core/Button';
import { BrandIcon } from '../icons/BrandIcon';

const projects = [
  {
    sev: 'critical',
    name: 'SENTINEL: LLM Red-Teaming Toolkit',
    featured: true,
    objective: 'Quantify LLM attack surfaces and benchmark mitigations for prompt-injection and data-exfiltration.',
    vuln: '29.1% injection success rate across 5 categories; data-exfiltration peaked at 73%. 22 MITRE ATT&CK-mapped SIEM fixtures ingested across 550 API calls.',
    resolution: 'Implemented prompt hardening, input sanitization, and instruction-hierarchy tagging. Migrated to Anthropic tool-use API; containerized with Docker.',
    tags: ['LLM Security', 'Anthropic API', 'MITRE ATT&CK', 'Docker'],
    github: 'https://github.com/GowdaNikhita',
  },
  {
    sev: 'high',
    name: 'RetailOps / Kira: AIOps Platform',
    featured: false,
    objective: 'Autonomous incident-response platform correlating multi-source telemetry to detect anomalies without manual triage.',
    vuln: 'CloudWatch logs, Prometheus metrics, and EKS cluster health were siloed — no cross-layer anomaly correlation or unified query surface.',
    resolution: 'Deployed microservices on AWS with Terraform/ArgoCD/GitHub Actions. LLM-powered natural-language incident queries cut MTTD significantly.',
    tags: ['AWS', 'Terraform', 'Prometheus', 'Grafana'],
    github: 'https://github.com/GowdaNikhita',
  },
  {
    sev: 'medium',
    name: 'BASTION: Network Security Scanner',
    featured: false,
    objective: 'Python scanner to fingerprint services across a /24 subnet and map them to known CVEs via the NVD API.',
    vuln: 'Weak TLS configurations and missing mutual TLS on internal endpoints in a deliberately vulnerable lab environment.',
    resolution: 'NVD API CVE correlation produced a prioritized fix list. Flagged misconfigs and produced TLS hardening recommendations.',
    tags: ['Python', 'nmap', 'NVD API', 'TLS'],
    github: 'https://github.com/GowdaNikhita',
  },
];

export function IncidentReports() {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <header className="section-head">
          <span className="mono-eyebrow">// INCIDENT REPORTS</span>
          <h2 className="section-title">Selected Engagements</h2>
        </header>
        <div className="reports-grid">
          {projects.map((p) => (
            <Card key={p.name} glitch={p.featured} interactive={!p.featured} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <SeverityBadge level={p.sev} />
                {p.featured && <span className="mono-eyebrow" style={{ color: 'var(--phosphor-cyan)' }}>★ FEATURED</span>}
              </div>
              <h3 className="report-name">{p.name}</h3>
              <div className="report-field">
                <span className="report-key">Objective</span>
                <p>{p.objective}</p>
              </div>
              <div className="report-field">
                <span className="report-key">Vulnerability</span>
                <p><RedactedText>{p.vuln}</RedactedText></p>
              </div>
              <div className="report-field">
                <span className="report-key">Resolution</span>
                <p><RedactedText label="REDACTED">{p.resolution}</RedactedText></p>
              </div>
              <div className="report-tags">
                {p.tags.map((t) => <span className="report-tag" key={t}>{t}</span>)}
              </div>
              <div className="report-links">
                <Button as="a" href={p.github} target="_blank" rel="noopener noreferrer" variant="ghost" mono size="sm" iconRight={<BrandIcon name="github" size={14} />}>View on GitHub</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
