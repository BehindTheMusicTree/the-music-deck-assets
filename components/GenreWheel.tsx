'use client';

const GENRES = [
  { n: 'Reggae/Dub', h: '#3a9030' },
  { n: 'Electronic', h: '#2850c8' },
  { n: 'Disco/Funk', h: '#c0387a' },
  { n: 'Hip-hop',    h: '#ffd700' },
  { n: 'Rock',       h: '#d01828' },
  { n: 'Country',    h: '#7a4e20' },
  { n: 'Classical',  h: '#5c2a0a' },
  { n: 'Vintage',    h: '#787878' },
];

const CX = 620, CY = 620, R_INNER = 340, R_OUTER = 460, R_HARDCORE = 580;

function repeat(str: string, times: number) {
  return Array(times).fill(str).join(' · ') + ' ·';
}

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r };
}

function Rect({ x, y, label, hex, small }: { x: number; y: number; label: string; hex: string; small?: boolean }) {
  const w = small ? 120 : 160;
  const h = small ? 64 : 92;
  const fs = small ? 10.5 : 14;
  const fsh = small ? 8.5 : 11;
  const isDark = isLight(hex);
  const tc = isDark ? 'rgba(10,10,10,.85)' : 'rgba(255,255,255,.92)';
  const hc = isDark ? 'rgba(10,10,10,.5)' : 'rgba(255,255,255,.55)';
  return (
    <g
      transform={`translate(${x},${y})`}
      style={{ cursor: 'pointer' }}
      onClick={() => navigator.clipboard.writeText(hex)}
    >
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={4} fill={hex} filter={`drop-shadow(0 2px 8px ${hex}88)`} />
      <text x={0} y={-8} textAnchor="middle" fontFamily="Cinzel, serif" fontWeight={700} fontSize={fs} letterSpacing={1} fill={tc}>
        {label}
      </text>
      <text x={0} y={10} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize={fsh} fill={hc}>
        {hex}
      </text>
    </g>
  );
}

function isLight(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

export default function GenreWheel() {
  const popText   = repeat('POP', 40);
  const expText   = repeat('EXPERIMENTAL', 14);
  const exp2Text  = repeat('EXPERIMENTAL', 24);
  const hardText  = repeat('HARDCORE', 32);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48, marginTop: 40 }}>
      <svg
        width={1240}
        height={1240}
        viewBox="0 0 1240 1240"
        style={{ overflow: 'visible', maxWidth: '100%' }}
      >
        <defs>
          <path id="arc-pop"   d={`M ${CX},${CY - (R_INNER - 30)} A ${R_INNER - 30},${R_INNER - 30} 0 1,1 ${CX - 0.1},${CY - (R_INNER - 30)}`} />
          <path id="arc-exp-outer-inner"  d={`M ${CX},${CY - (R_INNER + 20)} A ${R_INNER + 20},${R_INNER + 20} 0 1,1 ${CX - 0.1},${CY - (R_INNER + 20)}`} />
          <path id="arc-exp-inner-outer"  d={`M ${CX},${CY - (R_OUTER - 6)} A ${R_OUTER - 6},${R_OUTER - 6} 0 1,1 ${CX - 0.1},${CY - (R_OUTER - 6)}`} />
          <path id="arc-hard"  d={`M ${CX},${CY - (R_HARDCORE + 30)} A ${R_HARDCORE + 30},${R_HARDCORE + 30} 0 1,1 ${CX - 0.1},${CY - (R_HARDCORE + 30)}`} />
        </defs>

        {/* Pop center */}
        <g style={{ cursor: 'pointer' }} onClick={() => navigator.clipboard.writeText('#c0b8d0')}>
          <rect x={CX - 48} y={CY - 28} width={96} height={56} rx={4} fill="#c0b8d0" />
          <text x={CX} y={CY - 4} textAnchor="middle" fontFamily="Cinzel, serif" fontWeight={700} fontSize={9} letterSpacing={2} fill="#09080d">POP</text>
          <text x={CX} y={CY + 10} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize={6.5} fill="rgba(9,8,13,.5)">#c0b8d0</text>
        </g>

        {/* Pop text — inside inner circle */}
        <circle cx={CX} cy={CY} r={R_INNER} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth={1.5} strokeDasharray="4 6" />
        <text fontFamily="Cinzel, serif" fontSize={11} fill="rgba(255,255,255,.85)" letterSpacing={8}>
          <textPath href="#arc-pop" startOffset="0%" dy={16}>{popText}</textPath>
        </text>

        {/* Experimental text — just outside inner circle */}
        <text fontFamily="Cinzel, serif" fontSize={10} fill="rgba(255,255,255,.22)" letterSpacing={5}>
          <textPath href="#arc-exp-outer-inner" startOffset="0%" dy={16}>{expText}</textPath>
        </text>
        {/* Experimental text — just inside outer circle */}
        <text fontFamily="Cinzel, serif" fontSize={10} fill="rgba(255,255,255,.22)" letterSpacing={5}>
          <textPath href="#arc-exp-inner-outer" startOffset="0%" dy={-8}>{exp2Text}</textPath>
        </text>

        {/* Hardcore circle + text — outside outer circle */}
        <circle cx={CX} cy={CY} r={R_HARDCORE} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth={1.5} strokeDasharray="4 6" />
        <text fontFamily="Cinzel, serif" fontSize={10} fill="rgba(255,255,255,.15)" letterSpacing={5}>
          <textPath href="#arc-hard" startOffset="0%" dy={16}>{hardText}</textPath>
        </text>

        {/* Inner genres */}
        {GENRES.map((g, i) => {
          const angle = (i / GENRES.length) * 360 - 90;
          const { x, y } = polarToXY(CX, CY, R_INNER, angle);
          return <Rect key={g.n} x={x} y={y} label={g.n} hex={g.h} />;
        })}

        {/* Outer subgenres */}
        {[
          { n: 'Metal',      h: '#7a0810', parent: 'Rock',       ring: 'outer' },
          { n: 'Nu Metal',   h: '#c86010', parentA: 'Hip-hop', parentB: 'Rock', t: 0.5, ring: 'outer' },
          { n: 'Dub',        h: '#28b870', parent: 'Reggae/Dub', ring: 'outer' },
          { n: 'Drum & Bass',h: '#3070c8', parent: 'Electronic', ring: 'outer' },
          { n: 'Techno',     h: '#1a2e6a', parent: 'Electronic', ring: 'outer' },
          { n: 'House',      h: '#4030a0', parentA: 'Electronic', angleDelta: 12, ring: 'outer' },
          { n: 'Jazz',       h: '#7a6858', parentA: 'Classical', parentB: 'Vintage', t: 0.35, ring: 'outer' },
        ].map((s: any) => {
          let angle: number;
          if (s.angleDelta !== undefined) {
            const idx = GENRES.findIndex(g => g.n === s.parentA);
            angle = (idx / GENRES.length) * 360 - 90 + s.angleDelta;
          } else if (s.parentA && s.parentB) {
            const idxA = GENRES.findIndex(g => g.n === s.parentA);
            const idxB = GENRES.findIndex(g => g.n === s.parentB);
            const aA = (idxA / GENRES.length) * 360 - 90;
            const aB = (idxB / GENRES.length) * 360 - 90;
            angle = aA + (aB - aA) * (s.t ?? 0.5);
          } else {
            const idx = GENRES.findIndex(g => g.n === s.parent);
            angle = (idx / GENRES.length) * 360 - 90;
          }
          const { x, y } = polarToXY(CX, CY, R_OUTER, angle);
          return <Rect key={s.n} x={x} y={y} label={s.n} hex={s.h} small />;
        })}

        {/* Middle ring subgenres */}
        {[
          { n: 'Disco',       h: '#f0a0c0', parent: 'Disco/Funk' },
          { n: 'Pop Rock',    h: '#f07080', parent: 'Rock' },
          { n: 'EDM',         h: '#7090e8', parent: 'Electronic' },
          { n: 'Pop Country', h: '#d4a06a', parent: 'Country' },
          { n: 'R&B',         h: '#ffe94d', parent: 'Hip-hop' },
          { n: 'Roots',       h: '#5ab848', parent: 'Reggae/Dub' },
        ].map((s) => {
          const idx = GENRES.findIndex(g => g.n === s.parent);
          const angle = (idx / GENRES.length) * 360 - 90;
          const { x, y } = polarToXY(CX, CY, 175, angle);
          return <Rect key={s.n} x={x} y={y} label={s.n} hex={s.h} small />;
        })}
      </svg>

      {/* World aside */}
      <div style={{ width: '100%', maxWidth: 800, display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: 2, color: '#d8d4f0', fontWeight: 700, marginBottom: 12 }}>WORLD — cas particulier</div>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 13, color: '#6a6480', lineHeight: 1.7, marginBottom: 20 }}>
            World n'a pas de couleur propre. Chaque carte World emprunte la couleur du genre hôte et y superpose un motif de pointillés blancs.
          </p>
          {[
            { label: 'Les Lacs du Connemara — Vintage', bg: '#987040' },
            { label: 'Hip-hop World', bg: '#c8960a' },
          ].map(ex => (
            <div key={ex.label} style={{ background: '#100f18', border: '1px solid #1e1c2c', borderRadius: 4, padding: '14px 16px', marginBottom: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 8, letterSpacing: 1, color: '#6a6480', textTransform: 'uppercase' }}>{ex.label}</div>
              <div style={{ height: 32, borderRadius: 3, background: ex.bg, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.85) 1.5px, transparent 1.5px)', backgroundSize: '6px 6px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
