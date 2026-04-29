import type { GenreTheme } from "@/lib/card-theme-types";
import { COUNTRY_DATA, countryFlagForShell } from "@/lib/countries";
import {
  GENRE_NAMES,
  type AppGenreName,
  type GenreName,
  type NonMainstreamGenreName,
} from "./genre-names";
import {
  SUBGENRES,
  type GenreSubgenre,
  type Intensity,
  type Subgenre,
} from "./genre-subgenres-data";

export type {
  AppGenreName,
  GenreName,
  NonMainstreamGenreName,
} from "./genre-names";
export { APP_GENRE_NAMES, GENRE_NAMES } from "./genre-names";

export type {
  CountrySubgenre,
  GenreSubgenre,
  Intensity,
  Subgenre,
} from "./genre-subgenres-data";
export { intensityLevelIndex, SUBGENRES } from "./genre-subgenres-data";

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

/**
 * Circular genre chain for wheel outer ring only.
 * Mainstream is the hub and intentionally has no next pointer.
 */
const NON_MAINSTREAM_WHEEL_ORDER: NonMainstreamGenreName[] = [
  "Reggae/Dub",
  "Electronic",
  "Disco/Funk",
  "Hip-Hop",
  "Rock",
  "Classical",
  "Vintage",
];

export const GENRE_NEXT: Record<
  NonMainstreamGenreName,
  NonMainstreamGenreName
> = (() => {
  const out = {} as Record<NonMainstreamGenreName, NonMainstreamGenreName>;
  for (let i = 0; i < NON_MAINSTREAM_WHEEL_ORDER.length; i += 1) {
    const current = NON_MAINSTREAM_WHEEL_ORDER[i];
    const next =
      NON_MAINSTREAM_WHEEL_ORDER[(i + 1) % NON_MAINSTREAM_WHEEL_ORDER.length];
    out[current] = next;
  }
  return out;
})();

/** Reverse circular chain for wheel outer ring only. */
export const GENRE_PREVIOUS: Record<
  NonMainstreamGenreName,
  NonMainstreamGenreName
> = (() => {
  const out = {} as Record<NonMainstreamGenreName, NonMainstreamGenreName>;
  for (const current of Object.keys(GENRE_NEXT) as NonMainstreamGenreName[]) {
    const next = GENRE_NEXT[current];
    out[next] = current;
  }
  return out;
})();

export type GenreIntensityNode = {
  genre: GenreName;
  intensity: Intensity;
};

export type GenreIntensityDirection = "out" | "in";
export type TransitionNodeDirection = "out" | "in";
export type TransitionGenreIntensityNode = {
  kind: "genreIntensity";
  genre: GenreName;
  intensity: Intensity;
};
export type TransitionSubgenreNode = {
  kind: "subgenre";
  subgenre: string;
  genre: NonMainstreamGenreName;
  intensity: Intensity;
};
export type TransitionNode = TransitionGenreIntensityNode | TransitionSubgenreNode;

const INTENSITY_ORDER: Intensity[] = [
  "pop",
  "soft",
  "experimental",
  "hardcore",
];

function nextIntensity(i: Intensity): Intensity | undefined {
  const idx = INTENSITY_ORDER.indexOf(i);
  if (idx < 0 || idx === INTENSITY_ORDER.length - 1) return undefined;
  return INTENSITY_ORDER[idx + 1];
}

function previousIntensity(i: Intensity): Intensity | undefined {
  const idx = INTENSITY_ORDER.indexOf(i);
  if (idx <= 0) return undefined;
  return INTENSITY_ORDER[idx - 1];
}

function genreIntensityKey(n: GenreIntensityNode): string {
  return `${n.genre}|${n.intensity}`;
}

function transitionNodeKey(n: TransitionNode): string {
  if (n.kind === "genreIntensity") return `g|${n.genre}|${n.intensity}`;
  return `s|${n.subgenre}`;
}

function uniqueGenreIntensity(
  nodes: GenreIntensityNode[],
): GenreIntensityNode[] {
  const seen = new Set<string>();
  const out: GenreIntensityNode[] = [];
  for (const n of nodes) {
    const k = genreIntensityKey(n);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(n);
  }
  return out;
}

function uniqueTransitionNodes(nodes: TransitionNode[]): TransitionNode[] {
  const seen = new Set<string>();
  const out: TransitionNode[] = [];
  for (const n of nodes) {
    const k = transitionNodeKey(n);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(n);
  }
  return out;
}

/** Every genre × intensity node used on the wheel (Mainstream is pop-only). */
export function allGenreIntensityNodes(): GenreIntensityNode[] {
  const out: GenreIntensityNode[] = [];
  for (const genre of GENRE_NAMES) {
    const levels: Intensity[] =
      genre === "Mainstream" ? ["pop"] : [...INTENSITY_ORDER];
    for (const intensity of levels) {
      out.push({ genre, intensity });
    }
  }
  return out;
}

const GENRE_SUBGENRES = SUBGENRES.filter(
  (sub): sub is GenreSubgenre => sub.kind === "genre",
);
const GENRE_SUBGENRE_BY_NAME = Object.fromEntries(
  GENRE_SUBGENRES.map((sub) => [sub.n, sub]),
) as Record<string, GenreSubgenre>;
const INFLUENCE_MATCHING_SUBGENRES_BY_NODE: Record<string, string[]> =
  (() => {
    const map = new Map<string, string[]>();
    for (const sub of GENRE_SUBGENRES) {
      if (!sub.influence) continue;
      const key = genreIntensityKey({
        genre: sub.influence.genre,
        intensity: sub.influence.intensity,
      });
      const current = map.get(key) ?? [];
      current.push(sub.n);
      map.set(key, current);
    }
    return Object.fromEntries(map.entries());
  })();

function toTransitionGenreIntensityNode(
  node: GenreIntensityNode,
): TransitionGenreIntensityNode {
  return { kind: "genreIntensity", genre: node.genre, intensity: node.intensity };
}

function toTransitionSubgenreNode(subgenre: string): TransitionSubgenreNode {
  const sub = GENRE_SUBGENRE_BY_NAME[subgenre];
  if (!sub) {
    throw new Error(`Unknown genre subgenre "${subgenre}"`);
  }
  return {
    kind: "subgenre",
    subgenre,
    genre: sub.parentA,
    intensity: sub.intensity,
  };
}

function baseGenreIntensityOut(node: GenreIntensityNode): GenreIntensityNode[] {
  if (node.genre === "Mainstream") {
    return uniqueGenreIntensity([
      { genre: "Mainstream", intensity: "pop" },
      ...WHEEL_GENRES.map((g) => ({ genre: g.n, intensity: "pop" as Intensity })),
    ]);
  }
  const out: GenreIntensityNode[] = [{ genre: node.genre, intensity: node.intensity }];
  const up = nextIntensity(node.intensity);
  const down = previousIntensity(node.intensity);
  if (up) out.push({ genre: node.genre, intensity: up });
  if (down) out.push({ genre: node.genre, intensity: down });
  const nextGenre = GENRE_NEXT[node.genre];
  const previousGenre = GENRE_PREVIOUS[node.genre];
  out.push({ genre: nextGenre, intensity: node.intensity });
  out.push({ genre: previousGenre, intensity: node.intensity });
  if (down) {
    out.push({ genre: nextGenre, intensity: down });
    out.push({ genre: previousGenre, intensity: down });
  }
  if (node.intensity === "pop") {
    out.push({ genre: "Mainstream", intensity: "pop" });
  }
  return uniqueGenreIntensity(out);
}

function transitionOutFromGenreIntensity(
  node: GenreIntensityNode,
): TransitionNode[] {
  const out: TransitionNode[] = baseGenreIntensityOut(node).map(
    toTransitionGenreIntensityNode,
  );
  const influencedSubgenres =
    INFLUENCE_MATCHING_SUBGENRES_BY_NODE[genreIntensityKey(node)] ?? [];
  out.push(...influencedSubgenres.map(toTransitionSubgenreNode));
  return uniqueTransitionNodes(out);
}

function transitionOutFromSubgenre(subgenre: string): TransitionNode[] {
  const sub = GENRE_SUBGENRE_BY_NAME[subgenre];
  if (!sub) {
    throw new Error(`Unknown genre subgenre "${subgenre}"`);
  }
  const parentNode: GenreIntensityNode = {
    genre: sub.parentA,
    intensity: sub.intensity,
  };
  const out: TransitionNode[] = [...transitionOutFromGenreIntensity(parentNode)];
  if (sub.influence) {
    out.push(
      toTransitionGenreIntensityNode({
        genre: sub.influence.genre,
        intensity: sub.influence.intensity,
      }),
    );
  }
  return uniqueTransitionNodes(out);
}

function allTransitionNodes(): TransitionNode[] {
  return [
    ...allGenreIntensityNodes().map(toTransitionGenreIntensityNode),
    ...GENRE_SUBGENRES.map((sub) => toTransitionSubgenreNode(sub.n)),
  ];
}

export function transitionOut(node: TransitionNode): TransitionNode[] {
  if (node.kind === "genreIntensity") {
    return transitionOutFromGenreIntensity({
      genre: node.genre,
      intensity: node.intensity,
    });
  }
  return transitionOutFromSubgenre(node.subgenre);
}

export function transitionIn(node: TransitionNode): TransitionNode[] {
  return allTransitionNodes().filter((candidate) =>
    transitionOut(candidate).some(
      (outNode) => transitionNodeKey(outNode) === transitionNodeKey(node),
    ),
  );
}

export function transitionLinks(
  node: TransitionNode,
  direction: TransitionNodeDirection = "out",
): TransitionNode[] {
  return direction === "out" ? transitionOut(node) : transitionIn(node);
}

export function subgenreTransitionOut(subgenre: string): TransitionNode[] {
  return transitionOut(toTransitionSubgenreNode(subgenre));
}

export function subgenreTransitionIn(subgenre: string): TransitionNode[] {
  return transitionIn(toTransitionSubgenreNode(subgenre));
}

/**
 * Transition rule helper.
 * Compatibility layer (genre-intensity only).
 */
export function genreIntensityOut(
  node: GenreIntensityNode,
): GenreIntensityNode[] {
  return transitionOut({
    kind: "genreIntensity",
    genre: node.genre,
    intensity: node.intensity,
  })
    .filter(
      (n): n is TransitionGenreIntensityNode => n.kind === "genreIntensity",
    )
    .map((n) => ({ genre: n.genre, intensity: n.intensity }));
}

export function genreIntensityIn(
  node: GenreIntensityNode,
): GenreIntensityNode[] {
  return transitionIn({
    kind: "genreIntensity",
    genre: node.genre,
    intensity: node.intensity,
  })
    .filter(
      (n): n is TransitionGenreIntensityNode => n.kind === "genreIntensity",
    )
    .map((n) => ({ genre: n.genre, intensity: n.intensity }));
}

export function genreIntensityLinks(
  node: GenreIntensityNode,
  direction: GenreIntensityDirection = "out",
): GenreIntensityNode[] {
  return direction === "out" ? genreIntensityOut(node) : genreIntensityIn(node);
}

/** Weak vs / Advantage vs targets (canonical; aligns with Genres — Associations). */
export const GENRE_BATTLE_MATCHUP: Record<
  GenreName,
  {
    readonly advantageVs: readonly string[];
    readonly weakVs: readonly string[];
  }
> = (() => {
  const wheelGenres = [...NON_MAINSTREAM_WHEEL_ORDER];
  const byGenre = new Map<NonMainstreamGenreName, number>(
    wheelGenres.map((g, i) => [g, i]),
  );
  const influencedTargetsByGenre: Record<NonMainstreamGenreName, Set<GenreName>> =
    Object.fromEntries(wheelGenres.map((g) => [g, new Set<GenreName>()])) as Record<
      NonMainstreamGenreName,
      Set<GenreName>
    >;
  for (const sub of GENRE_SUBGENRES) {
    if (!sub.influence) continue;
    influencedTargetsByGenre[sub.parentA].add(sub.influence.genre);
  }
  const atOffset = (
    genre: NonMainstreamGenreName,
    offset: number,
  ): NonMainstreamGenreName => {
    const start = byGenre.get(genre);
    if (start === undefined) {
      throw new Error(`Unknown wheel genre "${genre}"`);
    }
    const raw = (start + offset) % wheelGenres.length;
    const idx = raw < 0 ? raw + wheelGenres.length : raw;
    return wheelGenres[idx];
  };
  const out = {} as Record<
    GenreName,
    {
      advantageVs: readonly string[];
      weakVs: readonly string[];
    }
  >;
  out.Mainstream = { advantageVs: [], weakVs: [] };
  for (const genre of wheelGenres) {
    const advantageVs: NonMainstreamGenreName[] = [
      atOffset(genre, +2),
      atOffset(genre, -3),
    ];
    const weakVsBase: NonMainstreamGenreName[] = [
      atOffset(genre, -2),
      atOffset(genre, +3),
    ];
    const removedWeaknesses = influencedTargetsByGenre[genre];
    const weakVs = weakVsBase.filter((g) => !removedWeaknesses.has(g));
    out[genre] = { advantageVs, weakVs };
  }
  return out;
})();

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

export function matchupIncomingFrom(genre: AppGenreName | undefined): string[] {
  if (!genre) return [];
  const target = genre as GenreName;
  return (Object.keys(GENRE_BATTLE_MATCHUP) as GenreName[]).filter((candidate) =>
    GENRE_BATTLE_MATCHUP[candidate].advantageVs.includes(target),
  );
}

// Wheel genre order (angular positions). Mainstream is the centre — not in this list.
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

const INFLUENCE_WEIGHT = 0.33;

function mixedWithWhite(hex: string, amount: number): string {
  return mixHex(hex, "#ffffff", amount);
}

function mixedWithBlack(hex: string, amount: number): string {
  return mixHex(hex, "#000000", amount);
}

type CountryName = keyof typeof COUNTRY_DATA;

// Only genre-subgenres can drive a derived subgenre color/theme.
// Country-subgenres always resolve to their country theme.
export const SUBGENRE_COLOR: Record<string, string> = Object.fromEntries(
  SUBGENRES.filter((s) => s.kind === "genre").map((s) => [
    s.n,
    resolvedGenreSubgenreColor(s),
  ]),
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
export function appGenreIntensity(genre: AppGenreName): Intensity {
  if (!(genre in APP_GENRE_THEMES)) {
    throw new Error(`Unknown app genre "${genre}"`);
  }
  return "soft";
}

export function genreIntensityColor(
  genre: NonMainstreamGenreName,
  intensity: Intensity,
): string {
  const base = GENRE_THEMES[genre].border;
  if (intensity === "pop") return mixedWithWhite(base, 0.55);
  if (intensity === "soft") return mixedWithWhite(base, 0.32);
  if (intensity === "experimental") return mixedWithBlack(base, 0.12);
  return mixedWithBlack(base, 0.38);
}

function resolvedGenreSubgenreColor(sub: GenreSubgenre): string {
  const baseColor = genreIntensityColor(sub.parentA, sub.intensity);
  if (!sub.influence) return baseColor;
  const influenceColor = genreIntensityColor(
    sub.influence.genre,
    sub.influence.intensity,
  );
  return mixHex(baseColor, influenceColor, INFLUENCE_WEIGHT);
}

export function matchupTargetDiamondColor(name: string): string {
  if (name in GENRE_THEMES) {
    return GENRE_THEMES[name as GenreName].border;
  }
  const sub = SUBGENRE_BY_NAME[name];
  if (sub?.kind === "genre") return resolvedGenreSubgenreColor(sub);
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

type ResolvableGenre = GenreName | string;

function isGenreName(genre: string): genre is GenreName {
  return genre in GENRE_THEMES;
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
  typeStripPrimaryBorder?: string;
  typeStripSubBorder?: string;
  /** Why this row resolved — drives Card type-strip / frame behaviour without re-deriving. */
  selectionKind: ThemeSelectionKind;
  /** When true, Card mirrors the country pip (diamond flag) or symbol on the right of the type strip. */
  mirrorCountryTypeStripRight: boolean;
}

function toCanonicalGenre(genre: ResolvableGenre): GenreName {
  if (isGenreName(genre)) return genre;
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
 * For `world-genre-only`, `mirrorCountryTypeStripRight` is false so the right type-strip pip
 * uses the genre border (ELECTRONIC, etc.), not a second country flag.
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
  if (country && g === country) {
    const frame = pickCountryFrame(countryTheme!);
    return {
      theme: countryTheme!,
      displayGenre: country,
      leftLabel: country,
      rightLabel: "—",
      ...frame,
      resolvedCountry: country,
      typeStripPrimaryBorder: countryTheme!.border,
      typeStripSubBorder: countryTheme!.border,
      selectionKind: "world-country-only",
      mirrorCountryTypeStripRight: true,
    };
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
      const frame = pickCountryFrame(resolvedTheme);
      return {
        theme: resolvedTheme,
        displayGenre: resolvedCountry,
        leftLabel: resolvedCountry,
        rightLabel: g,
        ...frame,
        resolvedCountry,
        resolvedSubgenre: g,
        typeStripPrimaryBorder: resolvedTheme.border,
        selectionKind: "country-native",
        mirrorCountryTypeStripRight: true,
      };
    }

    const appGenre = appGenreFromSubgenre(g);
    const resolvedColor = resolvedGenreSubgenreColor(def);
    const resolvedTheme = subgenreTheme(
      resolvedColor,
      APP_GENRE_THEMES[appGenre],
    );

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
        typeStripPrimaryBorder: countryTheme!.border,
        typeStripSubBorder: resolvedColor,
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
      typeStripPrimaryBorder: undefined,
      typeStripSubBorder: resolvedColor,
      selectionKind: "genre-subgenre",
      mirrorCountryTypeStripRight: false,
    };
  }

  if (!isGenreName(g)) {
    throw new Error(
      `Unknown genre or subgenre "${g}" (not a canonical subgenre and not a known app genre).`,
    );
  }
  const appGenre = toAppGenre(g);
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
      typeStripPrimaryBorder: countryTheme!.border,
      typeStripSubBorder: genreOnlyColor,
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
    typeStripPrimaryBorder: resolvedTheme.border,
    typeStripSubBorder: resolvedTheme.border,
    selectionKind: "genre-only",
    mirrorCountryTypeStripRight: false,
  };
}

// ---------------------------------------------------------------------------
// World / country themes — derived from the canonical COUNTRY_DATA in countries.ts
// ---------------------------------------------------------------------------
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

/** When `country` is set, returns that country's theme only (`genre` is ignored). */
export function themeForCard(genre: string, country?: string): GenreTheme {
  if (country) return themeForCountry(country);
  const theme = GENRE_THEMES[genre as GenreName];
  if (!theme) {
    throw new Error(`Unknown canonical genre theme "${genre}"`);
  }
  return theme;
}

// ---------------------------------------------------------------------------
