export function Card({ children, variant = 'default', glitch = false, interactive = false, style = {}, ...rest }) {
  const variants = {
    default: { background: 'var(--surface-card)',   border: '1px solid var(--border-default)' },
    sunken:  { background: 'var(--surface-sunken)', border: '1px solid var(--border-default)' },
    glass:   { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', boxShadow: 'var(--shadow-lg)' },
  };

  return (
    <div
      className={glitch ? 'sentinel-glitch' : undefined}
      style={{
        position: 'relative',
        borderRadius: variant === 'glass' ? 'var(--radius-lg)' : 'var(--radius-md)',
        padding: 'var(--space-5)',
        transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
        ...variants[variant],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (interactive) {
          e.currentTarget.style.borderColor = 'var(--cyan-40)';
          e.currentTarget.style.boxShadow   = '0 0 24px var(--cyan-12)';
        }
      }}
      onMouseLeave={(e) => {
        if (interactive) {
          e.currentTarget.style.borderColor = variant === 'glass' ? 'var(--glass-border)' : 'var(--border-default)';
          e.currentTarget.style.boxShadow   = variant === 'glass' ? 'var(--shadow-lg)' : 'none';
        }
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
