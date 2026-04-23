import Link from 'next/link';

const rarities = [
  {
    name: 'Legendary',
    hex: '#c8a040',
    desc: 'The rarest cards. Gold accent, prestige halo. Only found in premium boosters or as enigma rewards.',
    examples: ['Iconic artists', 'Milestone albums', 'Limited editions'],
  },
  {
    name: 'Epic',
    hex: '#a070e0',
    desc: 'Powerful and distinctive. Purple signals strong competitive value and special mechanics.',
    examples: ['Genre-defining albums', 'Cult artists', 'Era-defining tracks'],
  },
  {
    name: 'Rare',
    hex: '#6090e0',
    desc: 'Reliable and collectible. Blue tones indicate meaningful cards worth building around.',
    examples: ['Influential tracks', 'Known artists', 'Acclaimed albums'],
  },
  {
    name: 'Common',
    hex: '#8888a0',
    desc: 'The foundation of every collection. Neutral grey — stackable, tradeable, accessible.',
    examples: ['Deep catalogue tracks', 'Emerging artists', 'Everyday songs'],
  },
];

export default function RaritiesPage() {
  return (
    <div style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 700, marginBottom: 32 }}>
        <Link href="/" style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 2, color: 'var(--muted)', textDecoration: 'none' }}>
          ← Design Charter
        </Link>
      </div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 3, color: 'var(--muted)', marginBottom: 8 }}>04</div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 2, color: 'var(--muted)', marginBottom: 16 }}>Card rarity tiers</div>
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, letterSpacing: 4, color: 'var(--white)', marginBottom: 8 }}>
        THE <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>RARITIES</em>
      </h2>
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 14, color: 'var(--muted)', maxWidth: 600, textAlign: 'center', marginBottom: 56 }}>
        Four tiers, each with a fixed accent colour independent of genre. Rarity signals both collector value and competitive power.
      </p>

      <div style={{ width: '100%', maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {rarities.map(({ name, hex, desc, examples }) => (
          <div key={name} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderLeft: `3px solid ${hex}`, borderRadius: 4, padding: '24px 24px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: hex, boxShadow: `0 0 8px ${hex}` }} />
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: 16, letterSpacing: 3, color: hex }}>{name.toUpperCase()}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--muted)', marginLeft: 4 }}>{hex}</span>
            </div>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15, color: 'var(--white)', lineHeight: 1.6, marginBottom: 12 }}>{desc}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {examples.map(ex => (
                <span key={ex} style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: 1, color: 'var(--muted)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 2, padding: '3px 8px' }}>
                  {ex}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
