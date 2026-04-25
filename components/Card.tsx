"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import styles from "./Card.module.css";
import {
  type AppGenreName,
  appGenreIntensity,
  isCountrySubgenre,
  matchupGenreDisplayLabel,
  matchupTargetDiamondColor,
  matchupTargetsForAppGenre,
  resolveThemeSelection,
  subgenreIntensity,
} from "@/lib/genres";

export interface CardData {
  id: number;
  title: string;
  artist?: string;
  year: number;
  subgenre?: string;
  typeStripPrimaryBorder?: string;
  typeStripSubBorder?: string;
  ability: string;
  abilityDesc: string;
  power: number;
  pop: number;
  rarity: "Legendary" | "Epic" | "Rare" | "Common";
  artwork?: string;
  country?: string;
  /** 'full' = flag fills entire card background; 'fade' = flag left-half fades into genre colour */
  flagStyle?: "full" | "fade";
  /** Colour the flag fades into for flagStyle='fade' (defaults to "transparent") */
  fadeColor?: string;
}

export interface GenreTheme {
  border: string;
  frameBorder?: string;
  frameBg?: string;
  frameRotateR90?: boolean;
  frameFilter?: string;
  frameOpacity?: number;
  headerBg: string;
  textMain: string;
  textBody: string;
  parchStrip: string;
  parchAbility: string;
  barPop: [string, string];
  barExp: [string, string];
  barGlowPop: string;
  barGlowExp: string;
  icon: string;
}

const RARITY_COLOR: Record<string, string> = {
  Legendary: "#c8a040",
  Epic: "#a060c8",
  Rare: "#4a7aaa",
  Common: "#666",
};

const RARITY_LABEL: Record<string, string> = {
  Legendary: "Legendary",
  Epic: "Classic",
  Rare: "Banger",
  Common: "Niche",
};

const RARITY_ICON: Record<string, string> = {
  Legendary: `<svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 8,3.5 10,7 5,10 0,7 2,3.5" fill="#c8a040"/></svg>`,
  Epic: `<svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 6.2,3.8 10,3.8 7,6.2 8.2,10 5,7.8 1.8,10 3,6.2 0,3.8 3.8,3.8" fill="#a060c8"/></svg>`,
  Rare: `<svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 6,3.5 9.5,3.5 6.8,5.7 7.8,9.2 5,7.2 2.2,9.2 3.2,5.7 0.5,3.5 4,3.5" fill="#4a7aaa"/></svg>`,
  Common: `<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="#666" stroke-width="1.5"/></svg>`,
};

const STRIP_NAME_FOR_GENRE: Record<string, string> = {
  Pop: "Pop",
  Rock: "Rock",
  Mainstream: "Pop",
  Electronic: "Electronic",
  "Reggae/Dub": "Reggae/Dub",
  HipHop: "Hip-hop",
  Funk: "Funk",
  "Disco/Funk": "Disco/Funk",
  Classical: "Classical",
  Vintage: "Vintage",
};

/** Always returns two parts for a two-column type strip. */
function getTypeStripParts(
  leftLabel: string,
  rightLabel: string,
): { left: string; right: string } {
  const left = STRIP_NAME_FOR_GENRE[leftLabel] ?? leftLabel;
  return { left, right: rightLabel };
}

function scoreGlowColor(power: number) {
  const t = Math.max(0, Math.min(1, (power - 40) / 60));
  const r = Math.round(t * 14 + 4);
  const o = (0.25 + t * 0.65).toFixed(2);
  return `0 0 ${r}px rgba(200,160,64,${o})`;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function popularityNote(popularity: number): number {
  const normalized = clamp(popularity, 0, 100);
  return clamp(Math.ceil((normalized / 100) * 9), 1, 9);
}

function popularityTier(note: number): "gold" | "platinum" | "diamond" {
  if (note <= 3) return "gold";
  if (note <= 6) return "platinum";
  return "diamond";
}

function popularityCount(note: number): number {
  return ((note - 1) % 3) + 1;
}

const AWARD_SYMBOL_SIZE = 24;

function awardSymbolSvg(tier: "gold" | "platinum" | "diamond"): string {
  if (tier === "gold") {
    return `<svg width="${AWARD_SYMBOL_SIZE}" height="${AWARD_SYMBOL_SIZE}" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="5" fill="#d4af37" stroke="#f7df84" stroke-width="0.8"/><circle cx="6" cy="6" r="2.5" fill="#b58a1e"/><path d="M6 3.8l.6 1.2 1.3.2-.95.92.22 1.32L6 6.78l-1.17.66.22-1.32-.95-.92 1.3-.2.6-1.2z" fill="#f7df84"/></svg>`;
  }
  if (tier === "platinum") {
    return `<svg width="${AWARD_SYMBOL_SIZE}" height="${AWARD_SYMBOL_SIZE}" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1.2l3.6 1.2v3.2c0 2.6-1.7 4.3-3.6 5.2-1.9-.9-3.6-2.6-3.6-5.2V2.4L6 1.2z" fill="#c7d0d9" stroke="#eff4f8" stroke-width="0.8"/><path d="M3.2 3.2l-.8.6.6.9-.9.3.35.98-1 .06.06 1.03 1-.1.14.98.98-.24.34.93.9-.5" fill="none" stroke="#9ca9b6" stroke-width="0.55"/><path d="M8.8 3.2l.8.6-.6.9.9.3-.35.98 1 .06-.06 1.03-1-.1-.14.98-.98-.24-.34.93-.9-.5" fill="none" stroke="#9ca9b6" stroke-width="0.55"/></svg>`;
  }
  return `<svg width="${AWARD_SYMBOL_SIZE}" height="${AWARD_SYMBOL_SIZE}" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4.2L4.2 2h3.6L10 4.2 6 10 2 4.2z" fill="#7fe3ff" stroke="#e8fbff" stroke-width="0.8"/><path d="M4.2 2L6 4.2 7.8 2M2 4.2h8M6 4.2v5.8" stroke="#dff8ff" stroke-width="0.6" fill="none"/></svg>`;
}

type IntensityLevel = "pop" | "soft" | "experimental" | "hardcore";

function intensityIndex(level: IntensityLevel): number {
  if (level === "pop") return 1;
  if (level === "soft") return 2;
  if (level === "experimental") return 3;
  return 4;
}

function isVeryLight(hex: string) {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (r * 299 + g * 587 + b * 114) / 1000;
  return luminance > 205;
}

import { FLAG_PIP_SYMBOL, FLAG_PIP_BG } from "@/lib/countries";

function CardArtwork({ card }: { card: CardData }) {
  if (!card.artwork) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={card.artwork}
      alt=""
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
  );
}

export default function Card({
  card,
  theme,
  small,
  genreName,
}: {
  card: CardData;
  theme: GenreTheme;
  small?: boolean;
  genreName?: string;
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const rarColor = RARITY_COLOR[card.rarity] ?? "#666";
  const [titleScale, setTitleScale] = useState(1);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleScaleRef = useRef(1);
  const resolved =
    card.country || card.subgenre || genreName
      ? resolveThemeSelection({
          genre: genreName,
          subgenre: card.subgenre || undefined,
          country: card.country,
        })
      : {
          theme,
          displayGenre: "—",
          leftLabel: "—",
          rightLabel: card.subgenre ?? "—",
        };
  const effectiveTheme = resolved.theme;
  const strip = getTypeStripParts(resolved.leftLabel, resolved.rightLabel);
  const matchup = matchupTargetsForAppGenre(
    resolved.resolvedGenre as AppGenreName | undefined,
  );
  const stripLeftBorder =
    card.typeStripPrimaryBorder ??
    resolved.typeStripPrimaryBorder ??
    effectiveTheme.border;
  const stripRightBorder =
    card.typeStripSubBorder ??
    resolved.typeStripSubBorder ??
    effectiveTheme.border;
  const leftPipNeedsBorder = isVeryLight(stripLeftBorder);
  const rightPipNeedsBorder = isVeryLight(stripRightBorder);
  const pipLeftSymbol = card.country
    ? FLAG_PIP_SYMBOL[card.country]
    : undefined;
  const pipLeftFlagBg = card.country ? FLAG_PIP_BG[card.country] : undefined;
  const rightUsesCountryIdentity = Boolean(
    card.country &&
    resolved.resolvedSubgenre &&
    isCountrySubgenre(resolved.resolvedSubgenre),
  );
  const pipRightSymbol =
    pipLeftSymbol && rightUsesCountryIdentity ? pipLeftSymbol : undefined;
  const pipRightFlagBg =
    pipLeftFlagBg && rightUsesCountryIdentity ? pipLeftFlagBg : undefined;

  const flagLayer = resolved.frameBorder ?? effectiveTheme.frameBorder;
  const flagBg = resolved.frameBg ?? effectiveTheme.frameBg;
  const flagUsR90 = Boolean(
    (resolved.frameRotateR90 ?? effectiveTheme.frameRotateR90) && flagLayer,
  );
  const worldFrameFilter = resolved.frameFilter ?? effectiveTheme.frameFilter;
  const worldFrameOpacity =
    resolved.frameOpacity ?? effectiveTheme.frameOpacity;
  const flagStyle = card.flagStyle ?? resolved.flagStyle;
  const resolvedFadeColor =
    flagStyle === "fade" ? (card.fadeColor ?? resolved.fadeColor) : undefined;
  if (flagStyle === "fade" && !resolvedFadeColor) {
    throw new Error(
      `Missing canonical color for fade border on "${card.title}"`,
    );
  }

  const varStyle = {
    "--gc-border": effectiveTheme.border,
    "--gc-header-bg": effectiveTheme.headerBg,
    "--gc-text-main": effectiveTheme.textMain,
    "--gc-text-body": effectiveTheme.textBody,
    "--gc-parch-strip": effectiveTheme.parchStrip,
    "--gc-parch-ability": effectiveTheme.parchAbility,
  } as React.CSSProperties;

  /** World flags other than USA (e.g. France): same shell as USA, no rotation */
  const flagFlatShell = Boolean(flagLayer && !flagUsR90);

  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const recompute = () => {
      el.style.fontSize = "12px";
      el.style.letterSpacing = "0.8px";
      const available = el.clientWidth;
      if (!available) return;

      // Fit title width as tightly as possible.
      let scale = 1;
      const minScale = 0.5;
      const epsilon = 0.5;
      for (let i = 0; i < 3; i += 1) {
        const needed = el.scrollWidth;
        if (!needed) return;
        if (needed <= available + epsilon) break;
        const ratio = available / needed;
        scale = Math.max(minScale, Math.min(1, scale * ratio));
        el.style.fontSize = `${12 * scale}px`;
        el.style.letterSpacing = `${0.8 * scale}px`;
      }

      if (Math.abs(scale - titleScaleRef.current) > 0.003) {
        titleScaleRef.current = scale;
        setTitleScale(scale);
      }
    };

    recompute();
    const observer = new ResizeObserver(() => recompute());
    observer.observe(el);
    if (typeof document !== "undefined" && "fonts" in document) {
      void (document as Document & { fonts?: FontFaceSet }).fonts?.ready.then(
        () => recompute(),
      );
    }
    return () => observer.disconnect();
  }, [card.title, card.artist, small]);

  const cardContent = (
    <>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span
            className={styles.headerIcon}
            dangerouslySetInnerHTML={{
              __html: effectiveTheme.icon.replace(
                /currentColor/g,
                effectiveTheme.textMain,
              ),
            }}
          />
          <div
            className={`${styles.titleGroup} ${!card.artist ? styles.titleGroupSolo : ""}`}
          >
            <div
              ref={titleRef}
              className={styles.title}
              style={{
                fontSize: `${12 * titleScale}px`,
                letterSpacing: `${0.8 * titleScale}px`,
              }}
            >
              {card.title}
            </div>
            {card.artist ? (
              <div className={styles.artist}>{card.artist}</div>
            ) : null}
          </div>
        </div>
        <div
          className={styles.score}
          style={
            {
              "--score-glow-c": effectiveTheme.textMain,
              "--score-glow-r": `${4 + Math.round(Math.max(0, Math.min(1, (card.power - 40) / 60)) * 14)}px`,
              boxShadow: scoreGlowColor(card.power),
            } as React.CSSProperties
          }
        >
          {card.power}
        </div>
      </div>

      {/* Body: artwork fills this zone, panels overlay at the bottom */}
      <div className={styles.body}>
        <div className={styles.art}>
          <CardArtwork card={card} />
        </div>

        {/* Type strip: diamond + genre (left), subgenre + diamond (right) */}
        <div className={styles.typeStrip}>
          <div className={styles.typeStripSide}>
            {pipLeftSymbol ? (
              <span
                className={styles.pipSymbol}
                style={{
                  color: pipLeftSymbol.color,
                  fontSize: pipLeftSymbol.size,
                }}
              >
                {pipLeftSymbol.sym}
              </span>
            ) : pipLeftFlagBg ? (
              <div
                className={styles.pipFlag}
                style={{
                  backgroundImage: pipLeftFlagBg,
                  backgroundSize: "100% 160%",
                  backgroundPosition: "center",
                  border: "1px solid rgba(20, 16, 10, 0.35)",
                }}
              />
            ) : (
              <div
                className={styles.pip}
                style={{
                  background: stripLeftBorder,
                  border: leftPipNeedsBorder
                    ? "1px solid rgba(20, 16, 10, 0.45)"
                    : "none",
                }}
              />
            )}
            <span className={styles.typeText}>{strip.left}</span>
          </div>
          <div className={`${styles.typeStripSide} ${styles.typeStripSubSide}`}>
            <span className={styles.typeText}>{strip.right}</span>
            {pipRightSymbol ? (
              <span
                className={styles.pipSymbol}
                style={{
                  color: pipRightSymbol.color,
                  fontSize: pipRightSymbol.size,
                }}
              >
                {pipRightSymbol.sym}
              </span>
            ) : pipRightFlagBg ? (
              <div
                className={styles.pipFlag}
                style={{
                  backgroundImage: pipRightFlagBg,
                  backgroundSize: "100% 160%",
                  backgroundPosition: "center",
                  border: "1px solid rgba(20, 16, 10, 0.35)",
                }}
              />
            ) : (
              <div
                className={styles.pip}
                style={{
                  background: stripRightBorder,
                  border: rightPipNeedsBorder
                    ? "1px solid rgba(20, 16, 10, 0.45)"
                    : "none",
                }}
              />
            )}
          </div>
        </div>

        {/* Matchup strip — weak (left, reddish), advantage (right, greenish) */}
        <div
          className={styles.matchupStrip}
          role="group"
          aria-label="Genre weak matchups and strong matchups"
        >
          <div className={`${styles.matchupHalf} ${styles.matchupWeak}`}>
            {matchup.weakVs.length === 0 ? (
              <span
                className={`${styles.matchupEmpty} ${small ? styles.matchupEmptySm : ""}`}
              >
                —
              </span>
            ) : (
              matchup.weakVs.map((name) => {
                const color = matchupTargetDiamondColor(name);
                const pipLight = isVeryLight(color);
                return (
                  <span key={`weak-${name}`} className={styles.matchupCluster}>
                    <span
                      className={`${styles.matchupPip} ${small ? styles.matchupPipSm : ""}`}
                      style={{
                        background: color,
                        border: pipLight
                          ? "1px solid rgba(20, 16, 10, 0.45)"
                          : "none",
                      }}
                    />
                    <span
                      className={`${styles.matchupName} ${small ? styles.matchupNameSm : ""}`}
                    >
                      {matchupGenreDisplayLabel(name)}
                    </span>
                  </span>
                );
              })
            )}
          </div>
          <div className={`${styles.matchupHalf} ${styles.matchupAdv}`}>
            {matchup.advantageVs.length === 0 ? (
              <span
                className={`${styles.matchupEmpty} ${small ? styles.matchupEmptySm : ""}`}
              >
                —
              </span>
            ) : (
              matchup.advantageVs.map((name) => {
                const color = matchupTargetDiamondColor(name);
                const pipLight = isVeryLight(color);
                return (
                  <span key={`adv-${name}`} className={styles.matchupCluster}>
                    <span
                      className={`${styles.matchupName} ${small ? styles.matchupNameSm : ""}`}
                    >
                      {matchupGenreDisplayLabel(name)}
                    </span>
                    <span
                      className={`${styles.matchupPip} ${small ? styles.matchupPipSm : ""}`}
                      style={{
                        background: color,
                        border: pipLight
                          ? "1px solid rgba(20, 16, 10, 0.45)"
                          : "none",
                      }}
                    />
                  </span>
                );
              })
            )}
          </div>
        </div>

        {/* Ability */}
        <div className={styles.ability}>
          <div className={styles.abilityName}>{card.ability}</div>
          <div className={styles.abilityDesc}>{card.abilityDesc}</div>
        </div>

        {/* Stats: popularity symbols (left); intensity gradient + note under cursor (right) */}
        <div className={`${styles.stats} ${small ? styles.statsSm : ""}`}>
          <div
            className={styles.statsPop}
            aria-label={`Popularity tier ${popularityNote(card.pop)} of 9`}
          >
            {(() => {
              const note = popularityNote(card.pop);
              const tier = popularityTier(note);
              const count = popularityCount(note);
              const icon = awardSymbolSvg(tier);
              return Array.from({ length: count }).map((_, i) => (
                <span
                  key={`award-${i}`}
                  dangerouslySetInnerHTML={{ __html: icon }}
                />
              ));
            })()}
          </div>
          <div className={styles.statsIntensity}>
            {(() => {
              const intensitySubgenre =
                resolved.resolvedSubgenre ?? card.subgenre;
              const level = intensitySubgenre
                ? subgenreIntensity(intensitySubgenre)
                : resolved.resolvedGenre
                  ? appGenreIntensity(resolved.resolvedGenre as AppGenreName)
                  : undefined;
              const idx = level ? intensityIndex(level) : null;
              const pct = idx ? (idx / 4) * 100 : 0;
              return (
                <>
                  <div
                    className={styles.intensityTrack}
                    style={
                      idx
                        ? ({
                            ["--intensity-pct" as string]: String(Math.round(pct)),
                          } as CSSProperties)
                        : undefined
                    }
                  >
                    {idx ? (
                      <div
                        className={styles.intensityFill}
                        style={{ width: `${pct}%` }}
                      >
                        <div className={styles.intensityFillInner} />
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.intensityNoteRow}>
                    {idx ? (
                      <span
                        className={styles.intensityNote}
                        style={
                          pct >= 99.5
                            ? {
                                left: "100%",
                                transform: "translateX(-100%)",
                              }
                            : { left: `${pct}%`, transform: "translateX(-50%)" }
                        }
                      >
                        {Math.round(pct)}%
                      </span>
                    ) : (
                      <span className={styles.intensityNoteMuted}>—</span>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.brand}>{card.year}</span>
          <div className={styles.rarityRow}>
            <span
              dangerouslySetInnerHTML={{
                __html: RARITY_ICON[card.rarity] ?? "",
              }}
            />
            <span className={styles.rarityText} style={{ color: rarColor }}>
              {RARITY_LABEL[card.rarity] ?? card.rarity}
            </span>
          </div>
        </div>
      </div>
    </>
  );

  const renderInnerCard = () =>
    flagStyle === "full" && flagBg ? (
      /* Full-bleed flag covers the entire card background */
      <div className={styles.card} style={{ ...varStyle, background: flagBg }}>
        {cardContent}
      </div>
    ) : flagUsR90 ? (
      <div className={styles.cardShell}>
        <div
          className={styles.cardFlagUsR90}
          aria-hidden
          style={
            {
              backgroundImage:
                flagStyle === "fade"
                  ? `linear-gradient(${"transparent"}, ${"transparent"}), linear-gradient(to bottom, transparent 46%, ${resolvedFadeColor} 54%), ${flagBg}`
                  : `linear-gradient(${"transparent"}, ${"transparent"}), ${flagBg}`,
              backgroundSize:
                flagStyle === "fade"
                  ? "100% 100%, 100% 100%, cover"
                  : "100% 100%, cover",
              backgroundPosition:
                flagStyle === "fade" ? "0% 0%, 0% 0%, 0% 0%" : "0% 0%, 0% 0%",
              backgroundRepeat: "no-repeat",
              backgroundClip:
                flagStyle === "fade"
                  ? "padding-box, border-box, border-box"
                  : "padding-box, border-box",
              backgroundOrigin:
                flagStyle === "fade"
                  ? "padding-box, border-box, border-box"
                  : "padding-box, border-box",
              border: "10px solid transparent",
              filter: worldFrameFilter,
              opacity: worldFrameOpacity,
            } as React.CSSProperties
          }
        />
        <div className={styles.cardFlagFace} style={varStyle}>
          {cardContent}
        </div>
      </div>
    ) : flagFlatShell ? (
      <div className={styles.cardShell}>
        <div
          className={styles.cardFlagFlat}
          aria-hidden
          style={
            {
              background:
                flagStyle === "fade"
                  ? `linear-gradient(${"transparent"}, ${"transparent"}) padding-box, linear-gradient(to right, transparent 42%, ${resolvedFadeColor} 58%) border-box, ${flagLayer} border-box`
                  : `linear-gradient(${"transparent"}, ${"transparent"}) padding-box, ${flagLayer} border-box`,
              border: "10px solid transparent",
              filter: worldFrameFilter,
              opacity: worldFrameOpacity,
            } as React.CSSProperties
          }
        />
        <div className={styles.cardFlagFace} style={varStyle}>
          {cardContent}
        </div>
      </div>
    ) : flagStyle === "fade" && flagBg ? (
      <div
        className={styles.card}
        style={{
          ...varStyle,
          border: "10px solid transparent",
          backgroundImage: `linear-gradient(${"transparent"}, ${"transparent"}), linear-gradient(to right, transparent 42%, ${resolvedFadeColor} 58%), ${flagBg}`,
          backgroundClip: "padding-box, border-box, border-box",
          backgroundOrigin: "padding-box, border-box, border-box",
          backgroundSize: "100% 100%, 100% 100%, 100% 100%",
        }}
      >
        {cardContent}
      </div>
    ) : (
      <div className={styles.card} style={varStyle}>
        {cardContent}
      </div>
    );

  const onCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsZoomed(true);
    } else if (e.key === "Escape") {
      setIsZoomed(false);
    }
  };

  useEffect(() => {
    if (!isZoomed) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsZoomed(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isZoomed]);

  const baseCard = small ? (
    <div className={styles.wrapSm}>
      <div className={styles.cardSm}>{renderInnerCard()}</div>
    </div>
  ) : (
    renderInnerCard()
  );

  return (
    <>
      <div
        className={styles.zoomTrigger}
        role="button"
        tabIndex={0}
        aria-label={`Zoom card ${card.title}`}
        onClick={() => setIsZoomed(true)}
        onKeyDown={onCardKeyDown}
      >
        {baseCard}
      </div>
      {isZoomed && (
        <div
          className={styles.zoomOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={`Zoomed card ${card.title}`}
          onClick={() => setIsZoomed(false)}
          onKeyDown={onCardKeyDown}
        >
          <div className={styles.zoomCard} onClick={(e) => e.stopPropagation()}>
            {renderInnerCard()}
          </div>
        </div>
      )}
    </>
  );
}
