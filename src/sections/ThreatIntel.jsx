import { TelemetryWidget } from '../components/data/TelemetryWidget';

const cells = Array.from({ length: 7 * 17 }, () => Math.random());

export function ThreatIntel() {
  return (
    <section id="telemetry" className="section section-alt">
      <div className="container">
        <header className="section-head">
          <span className="mono-eyebrow">// THREAT INTEL</span>
          <h2 className="section-title">Live Telemetry</h2>
        </header>
        <div className="telemetry-grid">
          <TelemetryWidget label="CVEs Identified"      value="03"    tone="red"   caption="high-severity · BlackDuck SCA" />
          <TelemetryWidget label="LLM Injection Rate"   value="29.1"  unit="%"     tone="red"   caption="peak 73% data exfiltration" />
          <TelemetryWidget label="Triage Reduction"     value="30"    unit="%"     tone="green" caption="CI pipeline automation" />
          <TelemetryWidget label="GPA"                  value="4.0"   tone="cyan"  caption="M.S. · Ohio State" />
        </div>
        <div className="activity">
          <div className="activity-head">
            <span className="mono-eyebrow" style={{ color: 'var(--text-primary)' }}>GITHUB ACTIVITY</span>
            <span className="mono-key">// github.com/GowdaNikhita</span>
          </div>
          <div className="activity-grid">
            {cells.map((v, i) => {
              const lvl = v > 0.82 ? 3 : v > 0.62 ? 2 : v > 0.38 ? 1 : 0;
              return <span key={i} className={`commit l${lvl}`} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
