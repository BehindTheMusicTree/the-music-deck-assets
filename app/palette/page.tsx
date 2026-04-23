import Link from 'next/link';

const tokens = [
  { name: '--bg',      hex: '#09080d', usage: 'Main background (near-black violet)' },
  { name: '--surface', hex: '#100f18', usage: 'Secondary surfaces' },
  { name: '--card',    hex: '#16141f', usage: 'Card background' },
  { name: '--border',  hex: '#1e1c2c', usage: 'Generic UI borders' },
  { name: '--gold',    hex: '#a87c28', usage: 'Primary accent, buttons, labels' },
  { name: '--gold-hi', hex: '#c8a040', usage: 'Gold highlight' },
  { name: '--rust',    hex: '#7a3020', usage: 'Warm secondary accent' },
  { name: '--white',   hex: '#d8d4f0', usage: 'Main text' },
  { name: '--muted',   hex: '#6a6480', usage: 'Secondary text, placeholders' },
  { name: '--dim',     hex: '#28263a', usage: 'Separators, inactive zones' },
];

export default function PalettePage() {
  return (
    <div style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 700, marginBottom: 32 }}>
        <Link href="/" style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 2, color: 'var(--muted)', textDecoration: 'none' }}>
          ← Design Charter
        </Link>
      </div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 3, color: 'var(--muted)', marginBottom: 8 }}>01</div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 2, color: 'var(--muted)', marginBottom: 16 }}>Base design tokens</div>
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, letterSpacing: 4, color: 'var(--white)', marginBottom: 8 }}>
        COLOUR <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>PALETTE</em>
      </h2>
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 14, color: 'var(--muted)', maxWidth: 600, textAlign: 'center', marginBottom: 48 }}>
        All colours are defined as CSS custom properties on <code style={{ fontFamily: 'Space Mono, monospace', fontSize: 11 }}>:root</code> and used consistently across the UI.
      </p>

      <div style={{ width: '100%', maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tokens.map(({ name, hex, usage }) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 4, padding: '12px 16px' }}>
            <div style={{ width: 40, height: 40, borderRadius: 3, background: hex, flexShrink: 0, border: '1px solid rgba(255,255,255,0.06)' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--gold)' }}>{name}</span>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--muted)' }}>{hex}</span>
              </div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 14, color: 'var(--muted)', marginTop: 2 }}>{usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
