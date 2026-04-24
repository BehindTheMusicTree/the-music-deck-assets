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
    <div className="px-6 py-10 flex flex-col items-center">
      <div className="w-full max-w-[700px] mb-8">
        <Link href="/" className="font-mono text-[15px] tracking-[2px] text-muted no-underline">
          ← Design Charter
        </Link>
      </div>

      <div className="font-mono text-[15px] tracking-[3px] text-muted mb-2">01</div>
      <div className="font-mono text-[15px] tracking-[2px] text-muted mb-4">Base design tokens</div>
      <h2 className="font-cinzel text-3xl tracking-[4px] text-white mb-2">
        COLOUR <em className="text-gold not-italic">PALETTE</em>
      </h2>
      <p className="font-garamond italic text-muted max-w-[600px] text-center mb-12">
        All colours are defined as CSS custom properties on{' '}
        <code className="font-mono text-[15px]">:root</code> and used consistently across the UI.
      </p>

      <div className="w-full max-w-[700px] flex flex-col gap-2">
        {tokens.map(({ name, hex, usage }) => (
          <div key={name} className="flex items-center gap-4 bg-card border border-ui-border rounded px-4 py-3">
            <div className="w-10 h-10 rounded-[3px] shrink-0 border border-white/[0.06]" style={{ background: hex }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-mono text-[15px] text-gold">{name}</span>
                <span className="font-mono text-[15px] text-muted">{hex}</span>
              </div>
              <div className="font-garamond text-sm text-muted mt-0.5">{usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
