import Link from 'next/link';

const sections = [
  { href: '/palette', index: '01', label: 'Colour Palette', desc: 'Base design tokens and UI colours' },
  { href: '/genres', index: '02', label: 'Genres', desc: 'Genre colour system and the wheel' },
  { href: '/typography', index: '03', label: 'Typography', desc: 'Cinzel, Cormorant Garamond, Space Mono' },
  { href: '/rarities', index: '04', label: 'Rarities', desc: 'Legendary, Epic, Rare, Common' },
  { href: '/cards',    index: '05', label: 'Cards',    desc: 'Card frame anatomy and all genre variants' },
];

export default function IndexPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 3, color: 'var(--muted)', marginBottom: 16, textTransform: 'uppercase' }}>
        Design Charter
      </div>
      <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 36, fontWeight: 700, letterSpacing: 6, color: 'var(--white)', marginBottom: 8, textAlign: 'center' }}>
        THE <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>MUSIC DECK</em>
      </h1>
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 15, color: 'var(--muted)', marginBottom: 56, textAlign: 'center', maxWidth: 480 }}>
        Visual identity reference for UI, card frames, and genre theming.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, width: '100%', maxWidth: 840 }}>
        {sections.map(({ href, index, label, desc }) => (
          <Link key={href} href={href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 4,
              padding: '28px 24px',
            }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 3, color: 'var(--muted)', marginBottom: 10 }}>{index}</div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 14, letterSpacing: 2, color: 'var(--gold)', marginBottom: 8, textTransform: 'uppercase' }}>{label}</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>{desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
