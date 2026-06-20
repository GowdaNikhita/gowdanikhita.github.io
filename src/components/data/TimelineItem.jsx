export function TimelineItem({ date, status = 'complete', title, children, last = false }) {
  const statusMap = {
    success:  { color: 'var(--signal-green)',  label: 'SUCCESS'  },
    active:   { color: 'var(--phosphor-cyan)', label: 'ACTIVE'   },
    complete: { color: 'var(--fog-grey)',       label: 'COMPLETE' },
  };
  const s = statusMap[status] || statusMap.complete;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '64px 28px 1fr', columnGap: 'var(--space-4)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'right', paddingTop: '2px' }}>
        {date}
      </div>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ position: 'relative', width: '13px', height: '13px', marginTop: '4px', flex: 'none' }}>
          <span style={{ position: 'absolute', inset: 0, borderRadius: '999px', background: s.color, boxShadow: `0 0 10px ${s.color}` }} />
          {status === 'active' && (
            <span style={{ position: 'absolute', inset: 0, borderRadius: '999px', background: s.color, animation: 'sentinel-ping 1.8s var(--ease-out) infinite' }} />
          )}
        </span>
        {!last && (
          <span style={{ flex: 1, width: '2px', marginTop: '6px', minHeight: '28px', background: 'linear-gradient(to bottom, var(--border-strong), var(--border-default))' }} />
        )}
      </div>

      <div style={{ paddingBottom: last ? 0 : 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', fontWeight: 700, letterSpacing: 'var(--tracking-label)', color: s.color }}>
            [{s.label}]
          </span>
          <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</span>
        </div>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-normal)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
