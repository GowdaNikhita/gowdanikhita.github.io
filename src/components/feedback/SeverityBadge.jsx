export function SeverityBadge({ level = 'medium', children, dot = true }) {
  const map = {
    critical: { color: 'var(--sev-critical)', label: 'Critical' },
    high:     { color: 'var(--sev-high)',     label: 'High'     },
    medium:   { color: 'var(--sev-medium)',   label: 'Medium'   },
    low:      { color: 'var(--sev-low)',      label: 'Low'      },
  };
  const sev = map[level] || map.medium;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '7px',
      fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700,
      letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
      padding: '5px 10px', borderRadius: 'var(--radius-xs)',
      color: sev.color,
      background: `color-mix(in srgb, ${sev.color} 12%, transparent)`,
      border: `1px solid color-mix(in srgb, ${sev.color} 40%, transparent)`,
      whiteSpace: 'nowrap',
    }}>
      {dot && <span style={{ width: '7px', height: '7px', borderRadius: '999px', background: sev.color, flex: 'none' }} />}
      {children || sev.label}
    </span>
  );
}
