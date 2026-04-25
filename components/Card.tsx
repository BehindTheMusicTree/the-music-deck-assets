"use client";

import { useEffect, useState } from "react";
import styles from "./Card.module.css";
import { SUBGENRE_COLOR, subgenreTheme } from "@/lib/genres";

export interface CardData {
  id: number;
  title: string;
  artist?: string;
  year: number;
  genre: string;
  subgenre: string;
  typeStripPrimaryBorder?: string;
  typeStripSubBorder?: string;
  ability: string;
  abilityDesc: string;
  power: number;
  pop: number;
  exp: number;
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
  headerBg: string;
  textMain: string;
  textBody: string;
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

const RARITY_ICON: Record<string, string> = {
  Legendary: `<svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 8,3.5 10,7 5,10 0,7 2,3.5" fill="#c8a040"/></svg>`,
  Epic: `<svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 6.2,3.8 10,3.8 7,6.2 8.2,10 5,7.8 1.8,10 3,6.2 0,3.8 3.8,3.8" fill="#a060c8"/></svg>`,
  Rare: `<svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 6,3.5 9.5,3.5 6.8,5.7 7.8,9.2 5,7.2 2.2,9.2 3.2,5.7 0.5,3.5 4,3.5" fill="#4a7aaa"/></svg>`,
  Common: `<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="#666" stroke-width="1.5"/></svg>`,
};

const STRIP_NAME_FOR_GENRE: Record<string, string> = {
  Rock: "Rock",
  Mainstream: "Mainstream",
  Electronic: "Electronic",
  "Reggae/Dub": "Reggae/Dub",
  HipHop: "Hip-hop",
  Funk: "Funk",
  "Disco/Funk": "Disco/Funk",
  Classical: "Classical",
  Vintage: "Vintage",
};

/** Always returns two parts (genre + subgenre) for a two-column type strip. */
function getTypeStripParts(card: CardData): { left: string; right: string } {
  const left = STRIP_NAME_FOR_GENRE[card.genre] ?? card.genre;
  return { left, right: card.subgenre };
}

function scoreGlowColor(power: number) {
  const t = Math.max(0, Math.min(1, (power - 40) / 60));
  const r = Math.round(t * 14 + 4);
  const o = (0.25 + t * 0.65).toFixed(2);
  return `0 0 ${r}px rgba(200,160,64,${o})`;
}

function isVeryLight(hex: string) {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (r * 299 + g * 587 + b * 114) / 1000;
  return luminance > 205;
}

import {
  USA_FLAG_PATH,
  FLAG_BORDERS,
  FLAG_BG,
  FLAG_PIP_SYMBOL,
  FLAG_PIP_BG,
  FLAG_ROTATE_R90,
} from "@/lib/countries";

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
}: {
  card: CardData;
  theme: GenreTheme;
  small?: boolean;
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const rarColor = RARITY_COLOR[card.rarity] ?? "#666";
  const strip = getTypeStripParts(card);
  const canonicalSubgenreColor = SUBGENRE_COLOR[card.subgenre];
  const effectiveTheme = canonicalSubgenreColor
    ? subgenreTheme(canonicalSubgenreColor, theme)
    : theme;
  const stripLeftBorder = card.typeStripPrimaryBorder ?? theme.border;
  const stripRightBorder = card.typeStripSubBorder ?? effectiveTheme.border;
  const leftPipNeedsBorder = isVeryLight(stripLeftBorder);
  const rightPipNeedsBorder = isVeryLight(stripRightBorder);
  const pipLeftSymbol = card.country
    ? FLAG_PIP_SYMBOL[card.country]
    : undefined;
  const pipLeftFlagBg = card.country ? FLAG_PIP_BG[card.country] : undefined;
  const pipRightSymbol =
    pipLeftSymbol && !card.flagStyle ? pipLeftSymbol : undefined;
  const pipRightFlagBg =
    pipLeftFlagBg && !card.flagStyle ? pipLeftFlagBg : undefined;

  const country = card.country;
  const flagLayer = country ? FLAG_BORDERS[country] : undefined;
  const flagUsR90 = country && FLAG_ROTATE_R90.has(country) && flagLayer;
  const flagBg = country ? FLAG_BG[country] : undefined;
  const flagStyle = card.flagStyle;
  const resolvedFadeColor =
    flagStyle === "fade" ? (card.fadeColor ?? canonicalSubgenreColor) : undefined;
  if (flagStyle === "fade" && !resolvedFadeColor) {
    throw new Error(
      `Missing canonical subgenre color for fade border: "${card.subgenre}"`,
    );
  }

  const varStyle = {
    "--gc-border": effectiveTheme.border,
    "--gc-header-bg": effectiveTheme.headerBg,
    "--gc-text-main": effectiveTheme.textMain,
    "--gc-text-body": effectiveTheme.textBody,
  } as React.CSSProperties;

  /** World flags other than USA (e.g. France): same shell as USA, no rotation */
  const flagFlatShell = Boolean(flagLayer && !flagUsR90 && !flagStyle);

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
            <div className={styles.title}>{card.title}</div>
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
                className={styles.pip}
                style={{ backgroundImage: pipLeftFlagBg }}
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
                className={styles.pip}
                style={{ backgroundImage: pipRightFlagBg }}
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

        {/* Ability */}
        <div className={styles.ability}>
          <div className={styles.abilityName}>{card.ability}</div>
          <div className={styles.abilityDesc}>{card.abilityDesc}</div>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          {[
            {
              lbl: "Popularity",
              val: card.pop,
              grad: effectiveTheme.barPop,
              glow: effectiveTheme.barGlowPop,
            },
            {
              lbl: "Experimental",
              val: card.exp,
              grad: effectiveTheme.barExp,
              glow: effectiveTheme.barGlowExp,
            },
          ].map(({ lbl, val, grad, glow }) => (
            <div key={lbl} className={styles.statRow}>
              <span className={styles.statLabel}>{lbl}</span>
              <div className={styles.statBg}>
                <div
                  className={styles.statFill}
                  style={
                    {
                      width: `${val}%`,
                      background: `linear-gradient(to right, ${grad[0]}, ${grad[1]})`,
                      "--bar-glow": glow,
                    } as React.CSSProperties
                  }
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
            <span
              dangerouslySetInnerHTML={{
                __html: RARITY_ICON[card.rarity] ?? "",
              }}
            />
            <span className={styles.rarityText} style={{ color: rarColor }}>
              {card.rarity}
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
    ) : flagStyle === "fade" && flagBg ? (
      <div
        className={styles.card}
        style={{
          ...varStyle,
          border: "10px solid transparent",
          backgroundImage: `linear-gradient(${"transparent"}, ${"transparent"}), linear-gradient(to right, transparent 23%, ${resolvedFadeColor} 77%), ${flagBg}`,
          backgroundClip: "padding-box, border-box, border-box",
          backgroundOrigin: "padding-box, border-box, border-box",
          backgroundSize: "100% 100%, 100% 100%, 100% 100%",
        }}
      >
        {cardContent}
      </div>
    ) : flagUsR90 ? (
      <div className={styles.cardShell}>
        <div
          className={`${styles.cardFlagUsR90} ${styles.cardWorldFlagTarnish}`}
          aria-hidden
          style={
            {
              backgroundImage:
                flagStyle === "fade"
                  ? `linear-gradient(${"transparent"}, ${"transparent"}), linear-gradient(to bottom, transparent 40%, ${resolvedFadeColor} 60%), url("${USA_FLAG_PATH}")`
                  : `linear-gradient(${"transparent"}, ${"transparent"}), url("${USA_FLAG_PATH}")`,
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
          className={`${styles.cardFlagFlat} ${styles.cardWorldFlagTarnish}`}
          aria-hidden
          style={
            {
              background: `linear-gradient(${"transparent"}, ${"transparent"}) padding-box, ${flagLayer} border-box`,
              border: "10px solid transparent",
            } as React.CSSProperties
          }
        />
        <div className={styles.cardFlagFace} style={varStyle}>
          {cardContent}
        </div>
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
