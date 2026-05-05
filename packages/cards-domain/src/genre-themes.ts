import type { AppGenreName, GenreName } from "./genre-names";
import type { GenreTheme } from "./genre-theme-types";

// ---------------------------------------------------------------------------
// Pure colour utilities — no external dependencies.
// ---------------------------------------------------------------------------

export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) =>
        Math.min(255, Math.max(0, Math.round(v)))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

export function scaleHex(hex: string, factor: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * factor, g * factor, b * factor);
}

export function rgbaFromHex(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function isVeryLight(hex: string): boolean {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return false;
  const [r, g, b] = hexToRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000 > 205;
}

export function mixHex(base: string, tint: string, amount: number): string {
  const safeAmount = Math.max(0, Math.min(1, amount));
  const [br, bg, bb] = hexToRgb(base);
  const [tr, tg, tb] = hexToRgb(tint);
  return rgbToHex(
    br * (1 - safeAmount) + tr * safeAmount,
    bg * (1 - safeAmount) + tg * safeAmount,
    bb * (1 - safeAmount) + tb * safeAmount,
  );
}

export function parchFromBorder(border: string): {
  strip: string;
  ability: string;
} {
  const amountStrip = isVeryLight(border) ? 0.26 : 0.32;
  const amountAbility = isVeryLight(border) ? 0.09 : 0.18;
  return {
    strip: mixHex("#ede4cc", border, amountStrip),
    ability: mixHex("#f4edd8", border, amountAbility),
  };
}

// ---------------------------------------------------------------------------
// App-genre theme data.
// ---------------------------------------------------------------------------

export const GENRE_THEMES: Record<GenreName, GenreTheme> = {
  Mainstream: {
    border: "#f6f6f2",
    headerBg: "#141218",
    textMain: "#fffef8",
    textBody: "#e8e6dd",
    parchStrip: parchFromBorder("#f6f6f2").strip,
    parchAbility: parchFromBorder("#f6f6f2").ability,
    barPop: ["#8f8d85", "#f7f6ef"],
    barExp: ["#6f6d66", "#d9d6cc"],
    barGlowPop: "rgba(247,246,239,.8)",
    barGlowExp: "rgba(217,214,204,.7)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,1 10,6 15,6 11,9.5 12.5,14.5 8,11.5 3.5,14.5 5,9.5 1,6 6,6" fill="currentColor"/></svg>',
  },
  Rock: {
    border: "#d01828",
    headerBg: "#180404",
    textMain: "#f04858",
    textBody: "#d02838",
    parchStrip: parchFromBorder("#d01828").strip,
    parchAbility: parchFromBorder("#d01828").ability,
    barPop: ["#800810", "#e82030"],
    barExp: ["#600610", "#b81828"],
    barGlowPop: "rgba(232,32,48,.85)",
    barGlowExp: "rgba(184,24,40,.75)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><polygon points="9,1 6,8 9,8 5,15 12,6 8,6" fill="currentColor"/></svg>',
  },
  Electronic: {
    border: "#2850c8",
    headerBg: "#060c18",
    textMain: "#6888e8",
    textBody: "#4868c8",
    parchStrip: parchFromBorder("#2850c8").strip,
    parchAbility: parchFromBorder("#2850c8").ability,
    barPop: ["#102060", "#3060e0"],
    barExp: ["#0c1848", "#2048b0"],
    barGlowPop: "rgba(48,96,224,.8)",
    barGlowExp: "rgba(32,72,176,.7)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M1 8L3 8L5 3L7 13L9 5L11 11L13 8L15 8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  "Hip-Hop": {
    border: "#f2cf00",
    headerBg: "#140e00",
    textMain: "#ffe766",
    textBody: "#f6d21c",
    parchStrip: parchFromBorder("#f2cf00").strip,
    parchAbility: parchFromBorder("#f2cf00").ability,
    barPop: ["#9a7300", "#ffd900"],
    barExp: ["#664b00", "#e7bf00"],
    barGlowPop: "rgba(255,217,0,.85)",
    barGlowExp: "rgba(231,191,0,.78)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M10.5 5.5Q10.5 3.5 8 3.5Q5.5 3.5 5.5 6Q5.5 8 8 8Q10.5 8 10.5 10.5Q10.5 12.5 8 12.5Q5.5 12.5 5.5 10.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="8" y1="2" x2="8" y2="3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="8" y1="12.5" x2="8" y2="14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  },
  "Disco/Funk": {
    border: "#c0387a",
    headerBg: "#18060e",
    textMain: "#e868a0",
    textBody: "#c84880",
    parchStrip: parchFromBorder("#c0387a").strip,
    parchAbility: parchFromBorder("#c0387a").ability,
    barPop: ["#701840", "#e05088"],
    barExp: ["#501030", "#b03868"],
    barGlowPop: "rgba(224,104,160,.8)",
    barGlowExp: "rgba(176,56,104,.7)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1"/><line x1="8" y1="2.5" x2="8" y2="0" stroke="currentColor" stroke-width="1.2"/><rect x="3" y="4" width="3" height="2" rx=".5" fill="currentColor" opacity=".5"/><rect x="10" y="4" width="3" height="2" rx=".5" fill="currentColor" opacity=".5"/></svg>',
  },
  "Reggae/Dub": {
    border: "#3a9030",
    headerBg: "#061404",
    textMain: "#70d058",
    textBody: "#50b038",
    parchStrip: parchFromBorder("#3a9030").strip,
    parchAbility: parchFromBorder("#3a9030").ability,
    barPop: ["#185010", "#48c030"],
    barExp: ["#103a08", "#309820"],
    barGlowPop: "rgba(72,192,48,.8)",
    barGlowExp: "rgba(48,152,32,.7)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="5" ry="5.5" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="3.5" x2="8" y2="1" stroke="currentColor" stroke-width="1.2"/><path d="M5 7 Q6.5 5 8 7 Q9.5 5 11 7" fill="none" stroke="currentColor" stroke-width="1"/></svg>',
  },
  Classical: {
    border: "#5c2a0a",
    headerBg: "#0d0500",
    textMain: "#b86832",
    textBody: "#8a4a1a",
    parchStrip: parchFromBorder("#5c2a0a").strip,
    parchAbility: parchFromBorder("#5c2a0a").ability,
    barPop: ["#4a1a02", "#a85020"],
    barExp: ["#321202", "#7a3a14"],
    barGlowPop: "rgba(168,80,32,.8)",
    barGlowExp: "rgba(122,58,20,.75)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><text x="2" y="13" font-size="14" font-family="serif" fill="currentColor">𝄞</text></svg>',
  },
  Vintage: {
    border: "#787878",
    headerBg: "#0e0e0e",
    textMain: "#b0b0b0",
    textBody: "#888888",
    parchStrip: parchFromBorder("#787878").strip,
    parchAbility: parchFromBorder("#787878").ability,
    barPop: ["#404040", "#a0a0a0"],
    barExp: ["#282828", "#686868"],
    barGlowPop: "rgba(176,176,176,.65)",
    barGlowExp: "rgba(104,104,104,.6)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="currentColor" opacity=".85"/><circle cx="8" cy="8" r="5" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="0.6"/><circle cx="8" cy="8" r="2.2" fill="rgba(0,0,0,0.45)"/><circle cx="8" cy="8" r="0.8" fill="rgba(255,255,255,0.55)"/></svg>',
  },
};

export const APP_GENRE_THEMES: Record<AppGenreName, GenreTheme> = {
  Rock: GENRE_THEMES.Rock,
  Mainstream: GENRE_THEMES.Mainstream,
  Electronic: GENRE_THEMES.Electronic,
  "Hip-Hop": GENRE_THEMES["Hip-Hop"],
  "Disco/Funk": GENRE_THEMES["Disco/Funk"],
  "Reggae/Dub": GENRE_THEMES["Reggae/Dub"],
  Classical: GENRE_THEMES.Classical,
  Vintage: GENRE_THEMES.Vintage,
};
