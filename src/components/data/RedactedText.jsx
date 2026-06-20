import { useState } from 'react';

export function RedactedText({ children, label = 'CLASSIFIED' }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <span
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      style={{
        position: 'relative', display: 'inline-block', cursor: 'help',
        borderRadius: 'var(--radius-xs)',
        color:      revealed ? 'var(--text-primary)' : 'transparent',
        background: revealed ? 'transparent' : 'var(--steel-outline)',
        boxShadow:  revealed ? 'none' : 'inset 0 0 0 1px var(--border-strong)',
        transition: 'color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)',
        padding: '0 4px',
        userSelect: revealed ? 'auto' : 'none',
      }}
    >
      {children}
      {!revealed && (
        <span aria-hidden="true" style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-label)',
          color: 'var(--slate)', pointerEvents: 'none', overflow: 'hidden',
        }}>
          {label}
        </span>
      )}
    </span>
  );
}
