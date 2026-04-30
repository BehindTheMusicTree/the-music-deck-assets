import type { GenreTheme } from "@/lib/card-theme-types";
import { COUNTRY_DATA, countryFlagForShell } from "@/lib/countries";
import type { AppGenreName, GenreName, NonMainstreamGenreName } from "./genre-model";
import {
  appGenreFromSubgenre,
  appGenreIntensity,
  displayGenreLabel,
  getSubgenreDefinition,
  isGenreName,
  SUBGENRES,
  type Intensity,
  type GenreSubgenre,
} from "./genre-model";

/**
 * Single tuning knob for genre colour pastelisation.
 * - 0   => no pastel lift (most primary/saturated look)
 * - 1   => legacy pastel lift levels
 * - >1  => extra pastel
 */
export const GENRE_PASTELIZATION = 0.0;
/**
 * Single tuning knob for intensity spread from pop -> hardcore.
 * - 1   => legacy spread
 * - >1  => stronger contrast between light/pop and dark/hardcore
 * - <1  => flatter intensity contrast
 */
export const GENRE_INTENSITY_GRADIENT = 1.9;
export const GENRE_POP_DARKEN = -0.37;
export const GENRE_STEP_POP_TO_SOFT_DARKEN = 0.32;
export const GENRE_STEP_SOFT_TO_EXPERIMENTAL_DARKEN = 0.28;
export const GENRE_STEP_EXPERIMENTAL_TO_HARDCORE_DARKEN = 0.34;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHex(r: number, g: number, b: number): string {
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
function scale(hex: string, factor: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * factor, g * factor, b * factor);
}
function rgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

function isVeryLight(hex: string): boolean {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return false;
  const [r, g, b] = hexToRgb(hex);
  const luminance = (r * 299 + g * 587 + b * 114) / 1000;
  return luminance > 205;
}

function mixHex(base: string, tint: string, amount: number): string {
  const safeAmount = Math.max(0, Math.min(1, amount));
  const [br, bg, bb] = hexToRgb(base);
  const [tr, tg, tb] = hexToRgb(tint);
  return rgbToHex(
    br * (1 - safeAmount) + tr * safeAmount,
    bg * (1 - safeAmount) + tg * safeAmount,
    bb * (1 - safeAmount) + tb * safeAmount,
  );
}

function parchFromBorder(border: string): { strip: string; ability: string } {
  const amountStrip = isVeryLight(border) ? 0.26 : 0.32;
  const amountAbility = isVeryLight(border) ? 0.09 : 0.18;
  return {
    strip: mixHex("#ede4cc", border, amountStrip),
    ability: mixHex("#f4edd8", border, amountAbility),
  };
}

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
    border: "#c8960a",
    headerBg: "#140e00",
    textMain: "#f0b800",
    textBody: "#c89000",
    parchStrip: parchFromBorder("#c8960a").strip,
    parchAbility: parchFromBorder("#c8960a").ability,
    barPop: ["#7a5400", "#f0b000"],
    barExp: ["#503800", "#c08800"],
    barGlowPop: "rgba(240,176,0,.8)",
    barGlowExp: "rgba(192,136,0,.75)",
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

export function subgenreTheme(color: string, base: GenreTheme): GenreTheme {
  const parch = parchFromBorder(color);
  return {
    border: color,
    headerBg: scale(color, 0.18),
    textMain: scale(color, 1.55),
    textBody: color,
    parchStrip: parch.strip,
    parchAbility: parch.ability,
    barPop: [scale(color, 0.55), scale(color, 1.35)],
    barExp: [scale(color, 0.4), scale(color, 0.78)],
    barGlowPop: rgba(color, 0.85),
    barGlowExp: rgba(scale(color, 0.8), 0.75),
    icon: base.icon,
  };
}

function mixedWithWhite(hex: string, amount: number): string {
  return mixHex(hex, "#ffffff", amount);
}

function mixedWithBlack(hex: string, amount: number): string {
  return mixHex(hex, "#000000", amount);
}

function applyDarken(hex: string, amount: number): string {
  if (amount < 0) return mixedWithWhite(hex, -amount);
  return mixedWithBlack(hex, amount);
}

export function genreIntensityColor(
  genre: NonMainstreamGenreName,
  intensity: Intensity,
): string {
  const base = GENRE_THEMES[genre].border;
  const popPastelLift = 0.45 * GENRE_PASTELIZATION * GENRE_INTENSITY_GRADIENT;
  const softPastelLift =
    0.32 * GENRE_PASTELIZATION * (0.8 + 0.2 * GENRE_INTENSITY_GRADIENT);

  const popDarken = GENRE_POP_DARKEN - popPastelLift;
  const softDarken = popDarken + GENRE_STEP_POP_TO_SOFT_DARKEN - softPastelLift;
  const experimentalDarken = softDarken + GENRE_STEP_SOFT_TO_EXPERIMENTAL_DARKEN;
  const hardcoreDarken =
    experimentalDarken + GENRE_STEP_EXPERIMENTAL_TO_HARDCORE_DARKEN;

  const byIntensity: Record<Intensity, number> = {
    pop: popDarken,
    soft: softDarken,
    experimental: experimentalDarken,
    hardcore: hardcoreDarken,
  };

  return applyDarken(base, byIntensity[intensity]);
}

function resolvedGenreSubgenreColor(sub: GenreSubgenre): string {
  if (sub.color && /^#[0-9a-fA-F]{6}$/.test(sub.color)) return sub.color;
  return genreIntensityColor(sub.parentA, sub.intensity);
}

export const SUBGENRE_COLOR: Record<string, string> = Object.fromEntries(
  SUBGENRES.filter((s): s is GenreSubgenre => s.kind === "genre").map((s) => [
    s.n,
    resolvedGenreSubgenreColor(s),
  ]),
);

export function matchupTargetDiamondColor(name: string): string {
  if (name in GENRE_THEMES) {
    return GENRE_THEMES[name as GenreName].border;
  }
  const sub = getSubgenreDefinition(name);
  if (sub?.kind === "genre") return resolvedGenreSubgenreColor(sub);
  throw new Error(`Unknown matchup target "${name}"`);
}

/** DOM `id` for each genre block under #genre-themes (`GenreThemePreview`). */
export function genreThemeSectionDomId(genreName: string): string {
  return `genre-theme-${genreName.replace(/[^a-zA-Z0-9]+/g, "-")}`;
}

/** `window` event: wheel / deep-link navigates to a genre theme row + preview. */
export const GENRE_THEME_NAV_EVENT = "musicdeck:genre-theme-navigate";

export type GenreThemeNavigateDetail =
  | { kind: "genre"; genre: GenreName }
  | { kind: "subgenre"; subgenre: string };

export type ThemeSelectionKind =
  | "world-country-only"
  | "country-native"
  | "world-blend-subgenre"
  | "genre-subgenre"
  | "world-genre-only"
  | "genre-only";

export interface ResolvedThemeSelection {
  theme: GenreTheme;
  displayGenre: string;
  leftLabel: string;
  rightLabel: string;
  frameBorder?: string;
  frameBg?: string;
  frameBackgroundPosition?: string;
  frameRotateR90?: boolean;
  frameFilter?: string;
  frameOpacity?: number;
  resolvedCountry?: string;
  resolvedGenre?: string;
  resolvedSubgenre?: string;
  flagStyle?: "fade";
  fadeColor?: string;
  genreStripPrimaryBorder?: string;
  genreStripSubBorder?: string;
  selectionKind: ThemeSelectionKind;
  mirrorCountryTypeStripRight: boolean;
}

type CountryFrameFields = Pick<
  GenreTheme,
  | "frameBorder"
  | "frameBg"
  | "frameBackgroundPosition"
  | "frameRotateR90"
  | "frameFilter"
  | "frameOpacity"
>;

function pickCountryFrame(source: GenreTheme): CountryFrameFields {
  return {
    frameBorder: source.frameBorder,
    frameBg: source.frameBg,
    frameBackgroundPosition: source.frameBackgroundPosition,
    frameRotateR90: source.frameRotateR90,
    frameFilter: source.frameFilter,
    frameOpacity: source.frameOpacity,
  };
}

export function resolveThemeSelection({
  genre: g,
  country,
}: {
  genre: string;
  country?: string;
}): ResolvedThemeSelection {
  const countryTheme = country ? WORLD_THEMES[country] : undefined;
  if (country && !countryTheme)
    throw new Error(`Unknown world country theme "${country}"`);
  if (!g?.trim()) {
    throw new Error(
      "Card must set genre (a subgenre name, or an app-level genre).",
    );
  }
  if (country && g === country) {
    const frame = pickCountryFrame(countryTheme!);
    return {
      theme: countryTheme!,
      displayGenre: country,
      leftLabel: country,
      rightLabel: "—",
      ...frame,
      resolvedCountry: country,
      genreStripPrimaryBorder: countryTheme!.border,
      genreStripSubBorder: countryTheme!.border,
      selectionKind: "world-country-only",
      mirrorCountryTypeStripRight: true,
    };
  }

  const def = getSubgenreDefinition(g);
  if (def) {
    if (def.kind === "country") {
      if (country && country !== def.parentA) {
        throw new Error(
          `Country-native subgenre "${g}" belongs to "${def.parentA}", not "${country}"`,
        );
      }
      const resolvedCountry = def.parentA;
      const resolvedTheme = WORLD_THEMES[resolvedCountry];
      const frame = pickCountryFrame(resolvedTheme);
      return {
        theme: resolvedTheme,
        displayGenre: resolvedCountry,
        leftLabel: resolvedCountry,
        rightLabel: g,
        ...frame,
        resolvedCountry,
        resolvedSubgenre: g,
        genreStripPrimaryBorder: resolvedTheme.border,
        selectionKind: "country-native",
        mirrorCountryTypeStripRight: true,
      };
    }

    const appGenre = appGenreFromSubgenre(g);
    const resolvedColor = resolvedGenreSubgenreColor(def);
    const resolvedTheme = subgenreTheme(resolvedColor, APP_GENRE_THEMES[appGenre]);

    if (country) {
      const countryFrameTheme = countryTheme!;
      const frame = pickCountryFrame(countryFrameTheme);
      return {
        theme: {
          ...resolvedTheme,
          ...frame,
        },
        displayGenre: country,
        leftLabel: country,
        rightLabel: g,
        ...frame,
        resolvedCountry: country,
        resolvedGenre: appGenre,
        resolvedSubgenre: g,
        flagStyle: "fade",
        fadeColor: resolvedColor,
        genreStripPrimaryBorder: countryTheme!.border,
        genreStripSubBorder: resolvedColor,
        selectionKind: "world-blend-subgenre",
        mirrorCountryTypeStripRight: true,
      };
    }

    return {
      theme: resolvedTheme,
      displayGenre: appGenre,
      leftLabel: displayGenreLabel(appGenre),
      rightLabel: g,
      resolvedGenre: appGenre,
      resolvedSubgenre: g,
      genreStripPrimaryBorder: undefined,
      genreStripSubBorder: resolvedColor,
      selectionKind: "genre-subgenre",
      mirrorCountryTypeStripRight: false,
    };
  }

  if (!isGenreName(g)) {
    throw new Error(
      `Unknown genre or subgenre "${g}" (not a canonical subgenre and not a known app genre).`,
    );
  }
  const appGenre = g as AppGenreName;
  const genreOnlyColor =
    appGenre === "Mainstream"
      ? GENRE_THEMES.Mainstream.border
      : genreIntensityColor(appGenre, appGenreIntensity(appGenre));
  if (country) {
    const resolvedTheme =
      appGenre === "Mainstream"
        ? APP_GENRE_THEMES[appGenre]
        : subgenreTheme(genreOnlyColor, APP_GENRE_THEMES[appGenre]);
    const countryFrameTheme = countryTheme!;
    const frame = pickCountryFrame(countryFrameTheme);
    return {
      theme: {
        ...resolvedTheme,
        ...frame,
      },
      displayGenre: country,
      leftLabel: country,
      rightLabel: displayGenreLabel(appGenre),
      ...frame,
      resolvedCountry: country,
      resolvedGenre: appGenre,
      flagStyle: "fade",
      fadeColor: genreOnlyColor,
      genreStripPrimaryBorder: countryTheme!.border,
      genreStripSubBorder: genreOnlyColor,
      selectionKind: "world-genre-only",
      mirrorCountryTypeStripRight: false,
    };
  }

  const resolvedTheme =
    appGenre === "Mainstream"
      ? APP_GENRE_THEMES[appGenre]
      : subgenreTheme(genreOnlyColor, APP_GENRE_THEMES[appGenre]);
  return {
    theme: resolvedTheme,
    displayGenre: displayGenreLabel(appGenre),
    leftLabel: displayGenreLabel(appGenre),
    rightLabel: "—",
    resolvedGenre: appGenre,
    genreStripPrimaryBorder: resolvedTheme.border,
    genreStripSubBorder: resolvedTheme.border,
    selectionKind: "genre-only",
    mirrorCountryTypeStripRight: false,
  };
}

export const WORLD_THEMES: Record<string, GenreTheme> = Object.fromEntries(
  Object.entries(COUNTRY_DATA).map(([k, v]) => [
    k,
    {
      ...v.theme,
      typePip: {
        symbol: v.pip
          ? {
              sym: v.pip.sym,
              color: v.pip.color,
              size: v.pip.size,
              svg: v.pip.svg,
            }
          : undefined,
        flagBg: v.pip?.bg ?? countryFlagForShell(k, "flat").border,
      },
    },
  ]),
);

export function themeForCountry(country: string): GenreTheme {
  const theme = WORLD_THEMES[country];
  if (!theme) {
    throw new Error(`Unknown world country theme "${country}"`);
  }
  return theme;
}

export function themeForCard(genre: string, country?: string): GenreTheme {
  if (country) return themeForCountry(country);
  const theme = GENRE_THEMES[genre as GenreName];
  if (!theme) {
    throw new Error(`Unknown canonical genre theme "${genre}"`);
  }
  return theme;
}

export const WHEEL_GENRES: Array<{ n: GenreName; color: string }> = [
  {
    n: "Reggae/Dub",
    color: genreIntensityColor("Reggae/Dub", "soft"),
  },
  { n: "Electronic", color: genreIntensityColor("Electronic", "soft") },
  { n: "Disco/Funk", color: genreIntensityColor("Disco/Funk", "soft") },
  { n: "Hip-Hop", color: genreIntensityColor("Hip-Hop", "soft") },
  { n: "Rock", color: genreIntensityColor("Rock", "soft") },
  { n: "Classical", color: genreIntensityColor("Classical", "soft") },
  { n: "Vintage", color: genreIntensityColor("Vintage", "soft") },
];
