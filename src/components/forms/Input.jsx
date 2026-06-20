import { useState } from 'react';

export function Input({ label, hint, multiline = false, prefix = null, style = {}, ...rest }) {
  const [focused, setFocused] = useState(false);
  const Field = multiline ? 'textarea' : 'input';

  const fieldStyle = {
    width: '100%', boxSizing: 'border-box',
    fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)',
    background: 'var(--surface-sunken)',
    border: `1px solid ${focused ? 'var(--phosphor-cyan)' : 'var(--border-default)'}`,
    borderRadius: 'var(--radius-sm)',
    padding: multiline ? '12px 14px' : '11px 14px',
    paddingLeft: prefix ? '34px' : '14px',
    outline: 'none',
    resize: multiline ? 'vertical' : undefined,
    minHeight: multiline ? '96px' : undefined,
    boxShadow: focused ? '0 0 16px var(--cyan-12)' : 'none',
    transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
    ...style,
  };

  return (
    <label style={{ display: 'block' }}>
      {label && (
        <span style={{
          display: 'block', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)',
          textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)',
          color: 'var(--text-secondary)', marginBottom: '7px',
        }}>
          {label}
        </span>
      )}
      <span style={{ position: 'relative', display: 'block' }}>
        {prefix && (
          <span style={{
            position: 'absolute', left: '12px',
            top: multiline ? '13px' : '50%',
            transform: multiline ? 'none' : 'translateY(-50%)',
            color: 'var(--text-ghost)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)',
          }}>
            {prefix}
          </span>
        )}
        <Field
          style={fieldStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
      </span>
      {hint && (
        <span style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-ghost)', marginTop: '6px' }}>
          {hint}
        </span>
      )}
    </label>
  );
}
