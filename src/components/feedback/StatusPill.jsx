export function StatusPill({ tone = 'live', children, pulse = true }) {
  const map = {
    live:   'var(--signal-green)',
    active: 'var(--phosphor-cyan)',
    alert:  'var(--breach-red)',
    idle:   'var(--fog-grey)',
  };
  const c = map[tone] || map.live;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '9px',
      fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
      textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)',
      color: c, padding: '7px 14px',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid var(--border-default)',
      background: 'var(--surface-card)',
    }}>
      <span style={{ position: 'relative', width: '9px', height: '9px', flex: 'none' }}>
        <span style={{ position: 'absolute', inset: 0, borderRadius: '999px', background: c }} />
        {pulse && (
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '999px', background: c,
            animation: 'sentinel-ping 1.8s var(--ease-out) infinite',
          }} />
        )}
      </span>
      <span style={{ color: 'var(--text-primary)' }}>{children}</span>
    </span>
  );
}
