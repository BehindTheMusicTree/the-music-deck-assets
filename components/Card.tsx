'use client';

import styles from './Card.module.css';

export interface CardData {
  id: number;
  title: string;
  artist: string;
  year: number;
  genre: string;
  genreLabel: string;
  ability: string;
  abilityDesc: string;
  power: number;
  pop: number;
  exp: number;
  rarity: 'Legendary' | 'Epic' | 'Rare' | 'Common';
  artwork?: string;
}

export interface GenreTheme {
  border: string;
  cardBg: string;
  headerBg: string;
  textMain: string;
  textBody: string;
  barPop: [string, string];
  barExp: [string, string];
  barGlowPop: string;
  barGlowExp: string;
  icon: string;
  sym: string;
  bg0: string;
  bg1: string;
  accent: string;
}

const RARITY_COLOR: Record<string, string> = {
  Legendary: '#c8a040',
  Epic:      '#a060c8',
  Rare:      '#4a7aaa',
  Common:    '#666',
};

const RARITY_ICON: Record<string, string> = {
  Legendary: `<svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 8,3.5 10,7 5,10 0,7 2,3.5" fill="#c8a040"/></svg>`,
  Epic:      `<svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 6.2,3.8 10,3.8 7,6.2 8.2,10 5,7.8 1.8,10 3,6.2 0,3.8 3.8,3.8" fill="#a060c8"/></svg>`,
  Rare:      `<svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 6,3.5 9.5,3.5 6.8,5.7 7.8,9.2 5,7.2 2.2,9.2 3.2,5.7 0.5,3.5 4,3.5" fill="#4a7aaa"/></svg>`,
  Common:    `<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="#666" stroke-width="1.5"/></svg>`,
};

function scoreGlowColor(power: number) {
  const t = Math.max(0, Math.min(1, (power - 40) / 60));
  const r = Math.round(t * 14 + 4);
  const o = (0.25 + t * 0.65).toFixed(2);
  return `0 0 ${r}px rgba(200,160,64,${o})`;
}

function CardArtSvg({ card, theme }: { card: CardData; theme: GenreTheme }) {
  const s = card.id * 137 + 42;
  const bars = Array.from({ length: 14 }, (_, i) => ({
    h: 16 + ((s + i * 31) % 52),
    x: 6 + i * 16,
    op: parseFloat((0.18 + ((s + i * 7) % 6) * 0.1).toFixed(2)),
  }));
  const dots = Array.from({ length: 12 }, (_, i) => ({
    cx: 15 + ((s * i * 3) % 210),
    cy: 10 + ((s * i * 7 + 33) % 160),
    r: 1.5 + ((s + i) % 3),
    op: parseFloat((0.08 + ((s + i * 11) % 5) * 0.05).toFixed(2)),
  }));

  if (card.artwork) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={card.artwork} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    );
  }

  return (
    <svg viewBox="0 0 234 190" width="100%" height="100%" className={styles.artSvg}>
      <defs>
        <radialGradient id={`rg${card.id}`} cx="50%" cy="42%" r="72%">
          <stop offset="0%" stopColor={theme.bg0} />
          <stop offset="100%" stopColor={theme.bg1} />
        </radialGradient>
      </defs>
      <rect width={234} height={190} fill={`url(#rg${card.id})`} />
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={theme.accent} fillOpacity={d.op} />
      ))}
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={105 - b.h / 2} width={10} height={b.h} rx={5} fill={theme.accent} fillOpacity={b.op} />
      ))}
      <text x={117} y={102} fontSize={80} textAnchor="middle" fill={theme.accent} fillOpacity={0.07} fontFamily="serif">{theme.sym}</text>
      <text x={117} y={99}  fontSize={78} textAnchor="middle" fill={theme.accent} fillOpacity={0.42} fontFamily="serif">{theme.sym}</text>
      <rect x={0} y={160} width={234} height={30} fill={theme.bg1} fillOpacity={0.65} />
      <rect x={0} y={0}   width={234} height={18} fill={theme.bg1} fillOpacity={0.45} />
    </svg>
  );
}

export default function Card({ card, theme, small }: { card: CardData; theme: GenreTheme; small?: boolean }) {
  const rarColor = RARITY_COLOR[card.rarity] ?? '#666';

  const cssVars = {
    '--gc-border':     theme.border,
    '--gc-card-bg':    theme.cardBg,
    '--gc-header-bg':  theme.headerBg,
    '--gc-text-main':  theme.textMain,
    '--gc-text-body':  theme.textBody,
  } as React.CSSProperties;

  const inner = (
    <div className={styles.card} style={cssVars}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span
            className={styles.headerIcon}
            dangerouslySetInnerHTML={{ __html: theme.icon.replace(/currentColor/g, theme.textMain) }}
          />
          <div className={styles.titleGroup}>
            <div className={styles.title}>{card.title}</div>
            <div className={styles.artist}>{card.artist}</div>
          </div>
        </div>
        <div
          className={styles.score}
          style={{ '--score-glow-c': theme.textMain, '--score-glow-r': `${4 + Math.round((Math.max(0, Math.min(1,(card.power-40)/60))) * 14)}px`, boxShadow: scoreGlowColor(card.power) } as React.CSSProperties}
        >
          {card.power}
        </div>
      </div>

      {/* Body: artwork fills this zone, panels overlay at the bottom */}
      <div className={styles.body}>
        <div className={styles.art}>
          <CardArtSvg card={card} theme={theme} />
        </div>

        {/* Type strip */}
        <div className={styles.typeStrip}>
          <span className={styles.typeText}>{card.year}</span>
          <div className={styles.typeRight}>
            <span className={styles.typeText}>{card.genreLabel}</span>
            <div className={styles.pip} style={{ background: theme.border }} />
          </div>
        </div>

        {/* Ability */}
        <div className={styles.ability}>
          <div className={styles.abilityName}>{card.ability}</div>
          <div className={styles.abilityDesc}>{card.abilityDesc}</div>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          {[
            { lbl: 'Popularity',   val: card.pop, grad: theme.barPop, glow: theme.barGlowPop },
            { lbl: 'Experimental', val: card.exp, grad: theme.barExp, glow: theme.barGlowExp },
          ].map(({ lbl, val, grad, glow }) => (
            <div key={lbl} className={styles.statRow}>
              <span className={styles.statLabel}>{lbl}</span>
              <div className={styles.statBg}>
                <div
                  className={styles.statFill}
                  style={{
                    width: `${val}%`,
                    background: `linear-gradient(to right, ${grad[0]}, ${grad[1]})`,
                    '--bar-glow': glow,
                  } as React.CSSProperties}
                />
              </div>
              <span className={styles.statVal}>{val}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
        <span className={styles.brand}>{card.year}</span>
        <div className={styles.rarityRow}>
          <span dangerouslySetInnerHTML={{ __html: RARITY_ICON[card.rarity] ?? '' }} />
          <span className={styles.rarityText} style={{ color: rarColor }}>{card.rarity}</span>
        </div>
        </div>
      </div>
    </div>
  );

  if (!small) return inner;

  return (
    <div className={styles.wrapSm}>
      <div className={styles.cardSm}>{inner}</div>
    </div>
  );
}
