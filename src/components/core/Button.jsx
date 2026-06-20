export function Button({
  children,
  variant = 'primary',
  size = 'md',
  mono = false,
  icon = null,
  iconRight = null,
  disabled = false,
  as: Tag = 'button',
  ...rest
}) {
  const sizes = {
    sm: { padding: '6px 12px',  font: 'var(--text-sm)',   gap: '6px'  },
    md: { padding: '10px 18px', font: 'var(--text-sm)',   gap: '8px'  },
    lg: { padding: '14px 26px', font: 'var(--text-base)', gap: '10px' },
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizes[size].gap,
    padding: sizes[size].padding,
    fontFamily: mono ? 'var(--font-mono)' : 'var(--font-display)',
    fontSize: sizes[size].font,
    fontWeight: mono ? 500 : 600,
    letterSpacing: mono ? 'var(--tracking-wide)' : '0',
    textTransform: mono ? 'uppercase' : 'none',
    lineHeight: 1,
    borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
  };

  const variants = {
    primary:   { background: 'var(--phosphor-cyan)', color: 'var(--text-on-accent)', boxShadow: '0 0 16px var(--cyan-20)' },
    secondary: { background: 'transparent',          color: 'var(--phosphor-cyan)',  borderColor: 'var(--cyan-40)' },
    ghost:     { background: 'transparent',          color: 'var(--text-secondary)', borderColor: 'var(--border-default)' },
    danger:    { background: 'transparent',          color: 'var(--breach-red)',     borderColor: 'color-mix(in srgb, var(--breach-red) 45%, transparent)' },
  };

  const hoverMap = {
    primary:   (el, on) => { el.style.background = on ? 'var(--link-hover)' : 'var(--phosphor-cyan)'; el.style.boxShadow = on ? '0 0 24px var(--cyan-40)' : '0 0 16px var(--cyan-20)'; },
    secondary: (el, on) => { el.style.background = on ? 'var(--cyan-12)' : 'transparent'; },
    ghost:     (el, on) => { el.style.background = on ? 'var(--surface-raised)' : 'transparent'; el.style.color = on ? 'var(--text-primary)' : 'var(--text-secondary)'; },
    danger:    (el, on) => { el.style.background = on ? 'var(--red-12)' : 'transparent'; },
  };

  return (
    <Tag
      style={{ ...base, ...variants[variant] }}
      disabled={Tag === 'button' ? disabled : undefined}
      onMouseEnter={(e) => !disabled && hoverMap[variant](e.currentTarget, true)}
      onMouseLeave={(e) => !disabled && hoverMap[variant](e.currentTarget, false)}
      onMouseDown={(e)  => !disabled && (e.currentTarget.style.transform = 'translateY(1px)')}
      onMouseUp={(e)    => !disabled && (e.currentTarget.style.transform = 'translateY(0)')}
      {...rest}
    >
      {icon}
      {children}
      {iconRight}
    </Tag>
  );
}
