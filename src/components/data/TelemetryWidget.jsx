export function TelemetryWidget({ label, value, unit = '', caption, tone = 'cyan', children }) {
  const toneMap = {
    cyan:  'var(--phosphor-cyan)',
    green: 'var(--signal-green)',
    red:   'var(--breach-red)',
    white: 'var(--text-primary)',
  };
  const c = toneMap[tone] || toneMap.cyan;

  return (
    <div style={{
      background: 'var(--surface-card)', border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)', padding: 'var(--space-4)',
      display: 'flex', flexDirection: 'column', gap: '8px',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)' }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, color: c, lineHeight: 1 }}>
          {value}
        </span>
        {unit && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{unit}</span>}
      </div>
      {children}
      {caption && <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-ghost)' }}>{caption}</div>}
    </div>
  );
}
