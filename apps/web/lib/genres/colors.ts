import type { GenreTheme } from "@/lib/card-theme-types";
import { COUNTRY_DATA, countryFlagForShell } from "@/lib/countries";
import type { AppGenreName, GenreName, NonMainstreamGenreName } from "./model";
import {
  appGenreFromSubgenre,
  appGenreIntensity,
  displayGenreLabel,
  getSubgenreDefinition,
  isGenreName,
  SUBGENRES,
  type Intensity,
  type GenreSubgenre,
} from "./model";
import {
  APP_GENRE_THEMES,
  GENRE_THEMES,
  isVeryLight,
  mixHex,
  parchFromBorder,
  rgbaFromHex as rgba,
  scaleHex as scale,
} from "@repo/cards-domain";

export { APP_GENRE_THEMES, GENRE_THEMES };

export const GENRE_PASTELIZATION = 0.0;
export const GENRE_INTENSITY_GRADIENT = 1.9;
export const GENRE_POP_DARKEN = -0.37;
export const GENRE_STEP_POP_TO_SOFT_DARKEN = 0.32;
export const GENRE_STEP_SOFT_TO_EXPERIMENTAL_DARKEN = 0.28;
export const GENRE_STEP_EXPERIMENTAL_TO_HARDCORE_DARKEN = 0.34;

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
  const experimentalDarken =
    softDarken + GENRE_STEP_SOFT_TO_EXPERIMENTAL_DARKEN;
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
        genreStripPrimaryBorder: countryTheme!.border,
        genreStripSubBorder: resolvedColor,
        selectionKind: "world-blend-subgenre",
        mirrorCountryTypeStripRight: false,
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
    rightLabel: appGenre === "Mainstream" ? "Mainstream" : "—",
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
