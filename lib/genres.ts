import type { GenreTheme } from "@/components/Card";
import { COUNTRY_DATA } from "@/lib/countries";

// ---------------------------------------------------------------------------
// Canonical genre names
// ---------------------------------------------------------------------------
export type GenreName =
  | "Rock"
  | "Pop"
  | "Electronic"
  | "Hip-Hop"
  | "Disco/Funk"
  | "Reggae/Dub"
  | "Classical"
  | "Vintage";

export const GENRE_NAMES: GenreName[] = [
  "Rock",
  "Pop",
  "Electronic",
  "Hip-Hop",
  "Disco/Funk",
  "Reggae/Dub",
  "Classical",
  "Vintage",
];

export type AppGenreName =
  | "Rock"
  | "Pop"
  | "Electronic"
  | "Hip-Hop"
  | "Disco/Funk"
  | "Roots"
  | "Classical"
  | "Vintage";

export const APP_GENRE_NAMES: AppGenreName[] = [
  "Rock",
  "Pop",
  "Electronic",
  "Hip-Hop",
  "Disco/Funk",
  "Roots",
  "Classical",
  "Vintage",
];

// ---------------------------------------------------------------------------
// Genre themes
// ---------------------------------------------------------------------------
export const GENRE_THEMES: Record<GenreName, GenreTheme> = {
  Rock: {
    border: "#d01828",
    headerBg: "#180404",
    textMain: "#f04858",
    textBody: "#d02838",
    barPop: ["#800810", "#e82030"],
    barExp: ["#600610", "#b81828"],
    barGlowPop: "rgba(232,32,48,.85)",
    barGlowExp: "rgba(184,24,40,.75)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><polygon points="9,1 6,8 9,8 5,15 12,6 8,6" fill="currentColor"/></svg>',
  },
  Pop: {
    border: "#c0b8d0",
    headerBg: "#141218",
    textMain: "#e8e4f4",
    textBody: "#ccc8dc",
    barPop: ["#706880", "#e0d0f0"],
    barExp: ["#504860", "#a890b8"],
    barGlowPop: "rgba(224,208,240,.8)",
    barGlowExp: "rgba(168,144,184,.7)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,1 10,6 15,6 11,9.5 12.5,14.5 8,11.5 3.5,14.5 5,9.5 1,6 6,6" fill="currentColor"/></svg>',
  },
  Electronic: {
    border: "#2850c8",
    headerBg: "#060c18",
    textMain: "#6888e8",
    textBody: "#4868c8",
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
    barPop: ["#404040", "#a0a0a0"],
    barExp: ["#282828", "#686868"],
    barGlowPop: "rgba(176,176,176,.65)",
    barGlowExp: "rgba(104,104,104,.6)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="currentColor" opacity=".85"/><circle cx="8" cy="8" r="5" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="0.6"/><circle cx="8" cy="8" r="2.2" fill="rgba(0,0,0,0.45)"/><circle cx="8" cy="8" r="0.8" fill="rgba(255,255,255,0.55)"/></svg>',
  },
};

export const APP_GENRE_THEMES: Record<AppGenreName, GenreTheme> = {
  Rock: GENRE_THEMES.Rock,
  Pop: GENRE_THEMES.Pop,
  Electronic: GENRE_THEMES.Electronic,
  "Hip-Hop": GENRE_THEMES["Hip-Hop"],
  "Disco/Funk": GENRE_THEMES["Disco/Funk"],
  Roots: GENRE_THEMES["Reggae/Dub"],
  Classical: GENRE_THEMES.Classical,
  Vintage: GENRE_THEMES.Vintage,
};

// Wheel genre order (angular positions). Pop is the centre — not in this list.
export const WHEEL_GENRES: Array<{ n: GenreName; color: string }> = [
  { n: "Reggae/Dub", color: GENRE_THEMES["Reggae/Dub"].border },
  { n: "Electronic", color: GENRE_THEMES.Electronic.border },
  { n: "Disco/Funk", color: GENRE_THEMES["Disco/Funk"].border },
  { n: "Hip-Hop",    color: GENRE_THEMES["Hip-Hop"].border },
  { n: "Rock",       color: GENRE_THEMES.Rock.border },
  { n: "Classical",  color: GENRE_THEMES.Classical.border },
  { n: "Vintage",    color: GENRE_THEMES.Vintage.border },
];

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

export function subgenreTheme(color: string, base: GenreTheme): GenreTheme {
  return {
    border: color,
    headerBg: scale(color, 0.18),
    textMain: scale(color, 1.55),
    textBody: color,
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
export type Ring = "pop" | "soft" | "experimental" | "hardcore";

export interface Subgenre {
  n: string;
  color: string;
  parent?: string;
  parentA?: string;
  parentB?: string;
  t?: number;
  angleDelta?: number;
  ring: Ring;
}

export const SUBGENRES: Subgenre[] = [
  { n: "Electropop", color: "#e4ebff", parent: "Electronic", ring: "pop" },
  { n: "Disco Pop", color: "#ffd6e8", parent: "Disco/Funk", ring: "pop" },
  { n: "Pop Rock", color: "#f07080", parent: "Rock", ring: "soft" },
  { n: "EDM", color: "#7090e8", parent: "Electronic", ring: "soft" },
  { n: "R&B Soul", color: "#ffd060", parent: "Hip-Hop", ring: "soft" },
  { n: "R&B", color: "#ffe94d", parent: "Hip-Hop", ring: "soft" },
  { n: "Roots", color: "#5ab848", parent: "Reggae/Dub", ring: "soft" },
  { n: "Disco", color: "#f0a0c0", parent: "Disco/Funk", ring: "soft" },
  {
    n: "Ska Punk",
    color: "#8a3018",
    parent: "Rock",
    angleDelta: 14,
    ring: "experimental",
  },
  { n: "Dub", color: "#28b870", parent: "Reggae/Dub", ring: "experimental" },
  {
    n: "Drum & Bass",
    color: "#3070c8",
    parent: "Electronic",
    ring: "experimental",
  },
  {
    n: "Jungle",
    color: "#288090",
    parentA: "Electronic",
    parentB: "Reggae/Dub",
    t: 0.34,
    ring: "experimental",
  },
  { n: "Techno", color: "#1a2e6a", parent: "Electronic", ring: "experimental" },
  {
    n: "House",
    color: "#4030a0",
    parentA: "Electronic",
    angleDelta: 12,
    ring: "experimental",
  },
  {
    n: "Religious",
    color: "#888888",
    parent: "Vintage",
    angleDelta: -12,
    ring: "experimental",
  },
  { n: "Jazz", color: "#7a5840", parent: "Vintage", ring: "experimental" },
  {
    n: "Soul",
    color: "#9a8f60",
    parent: "Vintage",
    angleDelta: 12,
    ring: "experimental",
  },
  { n: "Metal", color: "#7a0810", parent: "Rock", ring: "hardcore" },
  {
    n: "Nu Metal",
    color: "#c86010",
    parent: "Rock",
    angleDelta: -14,
    ring: "hardcore",
  },
  { n: "Free Jazz", color: "#2a1a0e", parent: "Vintage", ring: "hardcore" },
  { n: "Psytrance", color: "#0b1f5a", parent: "Electronic", ring: "hardcore" },
];

export const SUBGENRE_COLOR: Record<string, string> = Object.fromEntries(
  SUBGENRES.map((s) => [s.n, s.color]),
);

// ---------------------------------------------------------------------------
// World / country themes — derived from the canonical COUNTRY_DATA in countries.ts
// ---------------------------------------------------------------------------
export const WORLD_THEMES: Record<string, GenreTheme> = Object.fromEntries(
  Object.entries(COUNTRY_DATA).map(([k, v]) => [k, v.theme]),
);

export function themeForCountry(country: string): GenreTheme {
  return WORLD_THEMES[country] ?? GENRE_THEMES.Rock;
}

export function themeForCard(genre: string, country?: string): GenreTheme {
  if (country) return themeForCountry(country);
  return GENRE_THEMES[genre as GenreName] ?? GENRE_THEMES.Rock;
}

// ---------------------------------------------------------------------------
