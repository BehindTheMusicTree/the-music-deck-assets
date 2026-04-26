import type { GenreTheme } from "@/components/Card";
import { COUNTRY_DATA } from "@/lib/countries";

// ---------------------------------------------------------------------------
// Canonical genre names
// ---------------------------------------------------------------------------
export type GenreName =
  | "Rock"
  | "Mainstream"
  | "Electronic"
  | "Hip-Hop"
  | "Disco/Funk"
  | "Reggae/Dub"
  | "Classical"
  | "Vintage";

export const GENRE_NAMES: GenreName[] = [
  "Mainstream",
  "Rock",
  "Electronic",
  "Hip-Hop",
  "Disco/Funk",
  "Reggae/Dub",
  "Classical",
  "Vintage",
];

export type AppGenreName =
  | "Rock"
  | "Mainstream"
  | "Electronic"
  | "Hip-Hop"
  | "Disco/Funk"
  | "Reggae/Dub"
  | "Classical"
  | "Vintage";

export const APP_GENRE_NAMES: AppGenreName[] = [
  "Rock",
  "Mainstream",
  "Electronic",
  "Hip-Hop",
  "Disco/Funk",
  "Reggae/Dub",
  "Classical",
  "Vintage",
];

// ---------------------------------------------------------------------------
// Genre themes
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

/** Weak vs / Advantage vs targets (canonical; aligns with Genres — Associations). */
export const GENRE_BATTLE_MATCHUP: Record<
  GenreName,
  {
    readonly advantageVs: readonly string[];
    readonly weakVs: readonly string[];
  }
> = {
  Mainstream: { advantageVs: [], weakVs: [] },
  Rock: {
    advantageVs: ["Classical", "Reggae/Dub"],
    weakVs: ["Disco/Funk", "Vintage"],
  },
  Electronic: {
    advantageVs: ["Vintage", "Classical"],
    weakVs: ["Hip-Hop", "Metal"],
  },
  "Hip-Hop": {
    advantageVs: ["Classical", "Metal"],
    weakVs: ["Classical", "Vintage"],
  },
  "Disco/Funk": {
    advantageVs: ["Metal", "Rock"],
    weakVs: ["Classical", "Metal"],
  },
  "Reggae/Dub": {
    advantageVs: ["Rock", "Metal"],
    weakVs: ["Electronic", "Classical"],
  },
  Classical: {
    advantageVs: ["Hip-Hop", "Disco/Funk"],
    weakVs: ["Rock", "Electronic"],
  },
  Vintage: {
    advantageVs: ["Electronic", "Hip-Hop"],
    weakVs: ["Rock", "Metal"],
  },
};

export function matchupTargetsForAppGenre(genre: AppGenreName | undefined): {
  advantageVs: string[];
  weakVs: string[];
} {
  if (!genre) return { advantageVs: [], weakVs: [] };
  const row = GENRE_BATTLE_MATCHUP[genre as GenreName];
  if (!row) return { advantageVs: [], weakVs: [] };
  return {
    advantageVs: [...row.advantageVs],
    weakVs: [...row.weakVs],
  };
}

// Wheel genre order (angular positions). Mainstream is the centre — not in this list.
export const WHEEL_GENRES: Array<{ n: GenreName; color: string }> = [
  { n: "Reggae/Dub", color: GENRE_THEMES["Reggae/Dub"].border },
  { n: "Electronic", color: GENRE_THEMES.Electronic.border },
  { n: "Disco/Funk", color: GENRE_THEMES["Disco/Funk"].border },
  { n: "Hip-Hop", color: GENRE_THEMES["Hip-Hop"].border },
  { n: "Rock", color: GENRE_THEMES.Rock.border },
  { n: "Classical", color: GENRE_THEMES.Classical.border },
  { n: "Vintage", color: GENRE_THEMES.Vintage.border },
];

/** DOM `id` for each genre block under #genre-themes (`GenreThemePreview`). */
export function genreThemeSectionDomId(genreName: string): string {
  return `genre-theme-${genreName.replace(/[^a-zA-Z0-9]+/g, "-")}`;
}

/** `window` event: wheel / deep-link navigates to a genre theme row + preview. */
export const GENRE_THEME_NAV_EVENT = "musicdeck:genre-theme-navigate";

export type GenreThemeNavigateDetail =
  | { kind: "genre"; genre: GenreName }
  | { kind: "subgenre"; subgenre: string };

// ---------------------------------------------------------------------------
// Color utilities (no external deps)
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Subgenres (wheel data)
// ---------------------------------------------------------------------------
export type Intensity = "pop" | "soft" | "experimental" | "hardcore";

export function intensityLevelIndex(level: Intensity): number {
  if (level === "pop") return 1;
  if (level === "soft") return 2;
  if (level === "experimental") return 3;
  return 4;
}

type CountryName = keyof typeof COUNTRY_DATA;

/** Wheel / theme parent for genre subgenres — never Mainstream (hub centre only). */
export type NonMainstreamGenreName = Exclude<GenreName, "Mainstream">;

interface BaseSubgenre {
  n: string;
  color: string;
  parentA: GenreName | CountryName;
  parentB?: NonMainstreamGenreName;
  t?: number;
  intensity: Intensity;
}

export interface GenreSubgenre extends BaseSubgenre {
  kind: "genre";
  parentA: NonMainstreamGenreName;
}

export interface CountrySubgenre extends BaseSubgenre {
  kind: "country";
  parentA: CountryName;
  parentB?: never;
}

export type Subgenre = GenreSubgenre | CountrySubgenre;

export const SUBGENRES: Subgenre[] = [
  {
    kind: "country",
    n: "Country",
    color: "#b22234",
    parentA: "USA",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "American folk",
    color: "#7a6040",
    parentA: "USA",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Spiritual",
    color: "#505848",
    parentA: "USA",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "French Variety",
    color: "#0055a4",
    parentA: "France",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "French folk",
    color: "#5a6870",
    parentA: "France",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Folk Breton",
    color: "#222222",
    parentA: "Bretagne",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Flamenco",
    color: "#AA151B",
    parentA: "Spain",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Neapolitan song",
    color: "#d05838",
    parentA: "Italy",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Italian folk",
    color: "#4a6042",
    parentA: "Italy",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Japanese folk",
    color: "#8b4855",
    parentA: "Japan",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "English folk",
    color: "#6b5038",
    parentA: "England",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Raï",
    color: "#9a2848",
    parentA: "Algeria",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Reggaeton",
    color: "#d05038",
    parentA: "Puerto Rico",
    intensity: "pop",
  },
  {
    kind: "country",
    n: "Mexican Folk",
    color: "#1e6b4a",
    parentA: "Mexico",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Electropop",
    color: "#e4ebff",
    parentA: "Electronic",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Dance Pop",
    color: "#e8d4f0",
    parentA: "Electronic",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Disco Pop",
    color: "#ffd6e8",
    parentA: "Disco/Funk",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Pop Rock",
    color: "#f07080",
    parentA: "Rock",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "EDM",
    color: "#7090e8",
    parentA: "Electronic",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Rap",
    color: "#c8960a",
    parentA: "Hip-Hop",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "R&B Soul",
    color: "#ffd060",
    parentA: "Hip-Hop",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "R&B",
    color: "#e8e2c8",
    parentA: "Hip-Hop",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Roots",
    color: "#5ab848",
    parentA: "Reggae/Dub",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Disco",
    color: "#f0a0c0",
    parentA: "Disco/Funk",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Ska Punk",
    color: "#8a3018",
    parentA: "Rock",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Dub",
    color: "#28b870",
    parentA: "Reggae/Dub",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Drum & Bass",
    color: "#0c1f3c",
    parentA: "Electronic",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Jungle",
    color: "#288090",
    parentA: "Electronic",
    parentB: "Reggae/Dub",
    t: 0.42,
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Techno",
    color: "#2a4588",
    parentA: "Electronic",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "House",
    color: "#4030a0",
    parentA: "Electronic",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Cantique",
    color: "#888888",
    parentA: "Vintage",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Anthem",
    color: "#5c2a0a",
    parentA: "Classical",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Jazz",
    color: "#6a5c68",
    parentA: "Vintage",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Soul",
    color: "#9a8f60",
    parentA: "Vintage",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Punk",
    color: "#e02038",
    parentA: "Rock",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Metal",
    color: "#7a0810",
    parentA: "Rock",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Nu Metal",
    color: "#c86010",
    parentA: "Rock",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Free Jazz",
    color: "#1e1a24",
    parentA: "Vintage",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Psytrance",
    color: "#0b1f5a",
    parentA: "Electronic",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Minimal",
    color: "#3d5a78",
    parentA: "Electronic",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Cloud rap",
    color: "#c09028",
    parentA: "Hip-Hop",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Trap",
    color: "#3a2d48",
    parentA: "Hip-Hop",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Christian hymn",
    color: "#a0a090",
    parentA: "Vintage",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Baroque classical",
    color: "#5a4030",
    parentA: "Classical",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Romantic classical",
    color: "#884060",
    parentA: "Classical",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Impressionist classical",
    color: "#7088a0",
    parentA: "Classical",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Virtuoso piano",
    color: "#c02850",
    parentA: "Classical",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Opera",
    color: "#902040",
    parentA: "Classical",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Ballet",
    color: "#d07090",
    parentA: "Classical",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Waltz",
    color: "#4088c8",
    parentA: "Classical",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "March",
    color: "#c89830",
    parentA: "Classical",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Serenade",
    color: "#6880a0",
    parentA: "Classical",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Ragtime",
    color: "#4a3828",
    parentA: "Vintage",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Folk ballad",
    color: "#6a6050",
    parentA: "Vintage",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Sacred choral",
    color: "#9a8068",
    parentA: "Classical",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Symphonic showpiece",
    color: "#284868",
    parentA: "Classical",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Traditional song",
    color: "#757060",
    parentA: "Vintage",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Traditional pop",
    color: "#ebe9e7",
    parentA: "Vintage",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Classic rock",
    color: "#8a8280",
    parentA: "Rock",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Arena anthem",
    color: "#d04020",
    parentA: "Rock",
    intensity: "soft",
  },
];

// Only genre-subgenres can drive a derived subgenre color/theme.
// Country-subgenres always resolve to their country theme.
export const SUBGENRE_COLOR: Record<string, string> = Object.fromEntries(
  SUBGENRES.filter((s) => s.kind === "genre").map((s) => [s.n, s.color]),
);
const SUBGENRE_PARENT_A: Record<string, GenreName | CountryName> =
  Object.fromEntries(SUBGENRES.map((s) => [s.n, s.parentA]));
const SUBGENRE_BY_NAME: Record<string, Subgenre> = Object.fromEntries(
  SUBGENRES.map((s) => [s.n, s]),
);

export function subgenreParentA(subgenre: string): string | undefined {
  return SUBGENRE_PARENT_A[subgenre];
}

export function isWorldNativeSubgenre(subgenre: string): boolean {
  const def = SUBGENRE_BY_NAME[subgenre];
  return def?.kind === "country";
}

export function isCountrySubgenre(subgenre: string): boolean {
  return SUBGENRE_BY_NAME[subgenre]?.kind === "country";
}

export function isGenreSubgenre(subgenre: string): boolean {
  return SUBGENRE_BY_NAME[subgenre]?.kind === "genre";
}

export function subgenreIntensity(subgenre: string): Intensity {
  const sub = SUBGENRE_BY_NAME[subgenre];
  if (!sub) {
    throw new Error(`Unknown canonical subgenre "${subgenre}"`);
  }
  return sub.intensity;
}

/** Intensity when the card has no subgenre (genre-only); subgenre overrides when present. */
const APP_GENRE_ONLY_INTENSITY: Partial<Record<AppGenreName, Intensity>> = {
  Electronic: "hardcore",
  "Hip-Hop": "soft",
  Classical: "experimental",
  Rock: "experimental",
  "Reggae/Dub": "experimental",
};

export function appGenreIntensity(genre: AppGenreName): Intensity {
  if (!(genre in APP_GENRE_THEMES)) {
    throw new Error(`Unknown app genre "${genre}"`);
  }
  return APP_GENRE_ONLY_INTENSITY[genre] ?? "pop";
}

export function matchupTargetDiamondColor(name: string): string {
  if (name in GENRE_THEMES) {
    return GENRE_THEMES[name as GenreName].border;
  }
  const sub = SUBGENRE_BY_NAME[name];
  if (sub?.color) return sub.color;
  throw new Error(`Unknown matchup target "${name}"`);
}

export function matchupGenreDisplayLabel(name: string): string {
  if (name === "Mainstream") return "Pop";
  return name;
}

export function canonicalCountryFromSubgenre(subgenre: string): string {
  const sub = SUBGENRE_BY_NAME[subgenre];
  if (!sub) {
    throw new Error(`Unknown canonical subgenre "${subgenre}"`);
  }
  if (sub.kind !== "country") {
    throw new Error(`Subgenre "${subgenre}" is not a country-native subgenre`);
  }
  return sub.parentA;
}

export function canonicalGenreFromSubgenre(subgenre: string): GenreName {
  const sub = SUBGENRE_BY_NAME[subgenre];
  if (!sub) {
    throw new Error(`Unknown canonical subgenre "${subgenre}"`);
  }
  if (sub.kind !== "genre") {
    throw new Error(
      `Subgenre "${subgenre}" is country-native and has no global canonical genre parent`,
    );
  }
  if (!(sub.parentA in GENRE_THEMES)) {
    throw new Error(
      `Subgenre "${subgenre}" parent "${sub.parentA}" is not a global canonical genre`,
    );
  }
  return sub.parentA as GenreName;
}

export function appGenreFromSubgenre(subgenre: string): AppGenreName {
  const canonical = canonicalGenreFromSubgenre(subgenre);
  return canonical as AppGenreName;
}

type ResolvableGenre = GenreName | AppGenreName | string;

function isGenreName(genre: string): genre is GenreName {
  return genre in GENRE_THEMES;
}

function isAppGenreName(genre: string): genre is AppGenreName {
  return genre in APP_GENRE_THEMES;
}

export interface ResolvedThemeSelection {
  theme: GenreTheme;
  displayGenre: string;
  leftLabel: string;
  rightLabel: string;
  frameBorder?: string;
  frameBg?: string;
  frameRotateR90?: boolean;
  frameFilter?: string;
  frameOpacity?: number;
  resolvedCountry?: string;
  resolvedGenre?: string;
  resolvedSubgenre?: string;
  flagStyle?: "fade";
  fadeColor?: string;
  typeStripPrimaryBorder?: string;
  typeStripSubBorder?: string;
}

function toCanonicalGenre(genre: ResolvableGenre): GenreName {
  if (isGenreName(genre)) return genre;
  if (isAppGenreName(genre)) return genre as GenreName;
  throw new Error(`Unknown canonical genre theme "${genre}"`);
}

function toAppGenre(genre: ResolvableGenre): AppGenreName {
  return toCanonicalGenre(genre) as AppGenreName;
}

export function displayGenreLabel(genre: AppGenreName): string {
  return genre === "Mainstream" ? "Pop" : genre;
}

/**
 * @param g Canonical subgenre from `SUBGENRE_BY_NAME`, or an app-level genre
 *   (e.g. "Electronic" for World+genre, or a genre-only track with no subgenre name).
 * @param country For World, World blend, and World+genre.
 */
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

  const def = SUBGENRE_BY_NAME[g];
  if (def) {
    if (def.kind === "country") {
      if (country && country !== def.parentA) {
        throw new Error(
          `Country-native subgenre "${g}" belongs to "${def.parentA}", not "${country}"`,
        );
      }
      const resolvedCountry = def.parentA;
      const resolvedTheme = WORLD_THEMES[resolvedCountry];
      return {
        theme: resolvedTheme,
        displayGenre: resolvedCountry,
        leftLabel: resolvedCountry,
        rightLabel: g,
        frameBorder: resolvedTheme.frameBorder,
        frameBg: resolvedTheme.frameBg,
        frameRotateR90: resolvedTheme.frameRotateR90,
        frameFilter: resolvedTheme.frameFilter,
        frameOpacity: resolvedTheme.frameOpacity,
        resolvedCountry,
        resolvedSubgenre: g,
        typeStripPrimaryBorder: resolvedTheme.border,
      };
    }

    const appGenre = appGenreFromSubgenre(g);
    const resolvedTheme = subgenreTheme(def.color, APP_GENRE_THEMES[appGenre]);

    if (country) {
      const countryFrameTheme = countryTheme!;
      return {
        theme: {
          ...resolvedTheme,
          frameBorder: countryFrameTheme.frameBorder,
          frameBg: countryFrameTheme.frameBg,
          frameRotateR90: countryFrameTheme.frameRotateR90,
          frameFilter: countryFrameTheme.frameFilter,
          frameOpacity: countryFrameTheme.frameOpacity,
        },
        displayGenre: country,
        leftLabel: country,
        rightLabel: g,
        frameBorder: countryFrameTheme.frameBorder,
        frameBg: countryFrameTheme.frameBg,
        frameRotateR90: countryFrameTheme.frameRotateR90,
        frameFilter: countryFrameTheme.frameFilter,
        frameOpacity: countryFrameTheme.frameOpacity,
        resolvedCountry: country,
        resolvedGenre: appGenre,
        resolvedSubgenre: g,
        flagStyle: "fade",
        fadeColor: def.color,
        typeStripPrimaryBorder: countryTheme!.border,
        typeStripSubBorder: def.color,
      };
    }

    return {
      theme: resolvedTheme,
      displayGenre: appGenre,
      leftLabel: def.intensity === "pop" ? "Pop" : displayGenreLabel(appGenre),
      rightLabel: g,
      resolvedGenre: appGenre,
      resolvedSubgenre: g,
      typeStripPrimaryBorder:
        def.intensity === "pop" ? GENRE_THEMES.Mainstream.border : undefined,
      typeStripSubBorder: def.color,
    };
  }

  if (!isAppGenreName(g)) {
    throw new Error(
      `Unknown genre or subgenre "${g}" (not a canonical subgenre and not a known app genre).`,
    );
  }
  const appGenre = toAppGenre(g);
  if (country) {
    const resolvedTheme = APP_GENRE_THEMES[appGenre];
    const countryFrameTheme = countryTheme!;
    return {
      theme: {
        ...resolvedTheme,
        frameBorder: countryFrameTheme.frameBorder,
        frameBg: countryFrameTheme.frameBg,
        frameRotateR90: countryFrameTheme.frameRotateR90,
        frameFilter: countryFrameTheme.frameFilter,
        frameOpacity: countryFrameTheme.frameOpacity,
      },
      displayGenre: country,
      leftLabel: country,
      rightLabel: displayGenreLabel(appGenre),
      frameBorder: countryFrameTheme.frameBorder,
      frameBg: countryFrameTheme.frameBg,
      frameRotateR90: countryFrameTheme.frameRotateR90,
      frameFilter: countryFrameTheme.frameFilter,
      frameOpacity: countryFrameTheme.frameOpacity,
      resolvedCountry: country,
      resolvedGenre: appGenre,
      flagStyle: "fade",
      fadeColor: resolvedTheme.border,
      typeStripPrimaryBorder: countryTheme!.border,
      typeStripSubBorder: resolvedTheme.border,
    };
  }

  const resolvedTheme = APP_GENRE_THEMES[appGenre];
  return {
    theme: resolvedTheme,
    displayGenre: displayGenreLabel(appGenre),
    leftLabel: displayGenreLabel(appGenre),
    rightLabel: "—",
    resolvedGenre: appGenre,
    typeStripPrimaryBorder: resolvedTheme.border,
    typeStripSubBorder: resolvedTheme.border,
  };
}

// ---------------------------------------------------------------------------
// World / country themes — derived from the canonical COUNTRY_DATA in countries.ts
// ---------------------------------------------------------------------------
export const WORLD_THEMES: Record<string, GenreTheme> = Object.fromEntries(
  Object.entries(COUNTRY_DATA).map(([k, v]) => [k, v.theme]),
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

// ---------------------------------------------------------------------------
