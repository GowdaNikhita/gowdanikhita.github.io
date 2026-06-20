export function SkillChip({ children, tone = 'neutral', icon = null }) {
  const tones = {
    neutral:   { color: 'var(--text-primary)',  border: 'var(--border-strong)' },
    offensive: { color: 'var(--breach-red)',    border: 'color-mix(in srgb, var(--breach-red) 40%, transparent)' },
    defensive: { color: 'var(--phosphor-cyan)', border: 'var(--cyan-40)' },
    forensics: { color: 'var(--signal-green)',  border: 'var(--green-20)' },
  };
  const t = tones[tone] || tones.neutral;

  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '7px',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 500,
        letterSpacing: 'var(--tracking-mono)', color: t.color,
        padding: '7px 12px', borderRadius: 'var(--radius-sm)',
        background: 'var(--surface-sunken)', border: `1px solid ${t.border}`,
        transition: 'background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
        cursor: 'default', whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-raised)'; e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${t.border}`; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface-sunken)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {icon}
      {children}
    </span>
  );
}
