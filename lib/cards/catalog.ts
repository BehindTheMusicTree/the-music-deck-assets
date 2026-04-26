import type { CardData, GenreTheme } from "@/components/Card";
import {
  APP_GENRE_THEMES,
  type AppGenreName,
  type Intensity,
  appGenreIntensity,
  canonicalCountryFromSubgenre,
  displayGenreLabel,
  isCountrySubgenre,
  isGenreSubgenre,
  resolveThemeSelection,
  subgenreIntensity,
  themeForCountry,
} from "@/lib/genres";
import { CARD_ARTWORK_BASE } from "./art-path";
import {
  DECK_SPOTLIGHT_CARDS,
  MOCK_CARDS,
  WORLD_FLAG_CARDS,
  WORLD_MIXED_CARDS,
} from "./examples";
import {
  type WishlistCardDef,
  WISHLIST_CARD_DEFS,
} from "./catalog-wishlist-defs";

export type CatalogSeriesType = "genre" | "country";

/** Card season label: every shipped catalogue card is season 1 for now. */
export const CATALOG_DEFAULT_ERA = "Era I" as const;
export type CatalogEra = typeof CATALOG_DEFAULT_ERA;

export type CatalogEntry = {
  rowKey: string;
  kind: "Genre" | "World" | "World blend" | "World + genre" | "Planned";
  card: CardData;
  theme: GenreTheme;
  /** Numbering bucket: by parent app genre, except country-native (then by country/region). */
  catalogSeriesType: CatalogSeriesType;
  /** Display label for the numbering bucket (genre or country/region name). */
  catalogSeriesLabel: string;
  /** Index within `catalogSeriesLabel` (stable order by internal card id). */
  catalogNumber: number;
  /** Parent app genre for the table (World for pure country-native strips). */
  catalogGenreLabel: string;
  /** Same intensity as the card gauge (from subgenre when set, else app genre). */
  catalogIntensity: Intensity;
  /** Card season (release wave); bundled deck is all Era I today. */
  catalogEra: CatalogEra;
};

export type RawCatalogRow = {
  rowKey: string;
  kind: CatalogEntry["kind"];
  card: CardData;
  theme: GenreTheme;
};

const mockGenreKeys = Object.keys(MOCK_CARDS) as AppGenreName[];

const rawGenreRows: RawCatalogRow[] = mockGenreKeys.map((g) => {
  const card = MOCK_CARDS[g];
  return {
    rowKey: `genre-${card.id}`,
    kind: "Genre",
    card,
    theme: APP_GENRE_THEMES[g],
  };
});

const rawWorldRows: RawCatalogRow[] = WORLD_FLAG_CARDS.map((c) => ({
  rowKey: `world-${c.id}`,
  kind: "World",
  card: c,
  theme: themeForCountry(c.country!),
}));

const rawBlendRows: RawCatalogRow[] = WORLD_MIXED_CARDS.map((c) => ({
  rowKey: `blend-${c.id}`,
  kind: "World blend",
  card: c,
  theme: themeForCountry(c.country!),
}));

function spotlightMetaForCard(card: CardData): {
  kind: CatalogEntry["kind"];
  theme: GenreTheme;
} {
  const g = card.genre;
  if (!g) {
    throw new Error(`Spotlight card "${card.title}" (${card.id}) must set genre`);
  }
  if (isCountrySubgenre(g)) {
    const expected = canonicalCountryFromSubgenre(g);
    const ctry = card.country ?? expected;
    if (ctry !== expected) {
      throw new Error(
        `Spotlight "${card.title}": country-native "${g}" expects country "${expected}", got "${card.country}"`,
      );
    }
    return { kind: "World", theme: themeForCountry(ctry) };
  }
  if (card.country) {
    if (isGenreSubgenre(g)) {
      return { kind: "World blend", theme: themeForCountry(card.country) };
    }
    return { kind: "World + genre", theme: themeForCountry(card.country) };
  }
  const r = resolveThemeSelection({ genre: g });
  if (!r.resolvedGenre) {
    throw new Error(`Spotlight "${card.title}": no resolved app genre for "${g}"`);
  }
  return {
    kind: "Genre",
    theme: APP_GENRE_THEMES[r.resolvedGenre as AppGenreName],
  };
}

const SPOTLIGHT_CATALOG_META: Record<
  number,
  { kind: CatalogEntry["kind"]; theme: GenreTheme }
> = (() => {
  const fr = themeForCountry("France");
  const es = themeForCountry("Spain");
  const dz = themeForCountry("Algeria");
  const pr = themeForCountry("Puerto Rico");
  const mx = themeForCountry("Mexico");
  const rock = APP_GENRE_THEMES.Rock;
  const base: Record<number, { kind: CatalogEntry["kind"]; theme: GenreTheme }> = {
    28: { kind: "Genre", theme: rock },
    29: { kind: "Genre", theme: rock },
    30: { kind: "World blend", theme: es },
    31: { kind: "World", theme: fr },
    32: { kind: "World", theme: fr },
    33: { kind: "World blend", theme: fr },
    34: { kind: "World", theme: mx },
    35: { kind: "World", theme: dz },
    36: { kind: "World", theme: pr },
  };
  for (const c of DECK_SPOTLIGHT_CARDS) {
    if (c.id > 36) {
      base[c.id] = spotlightMetaForCard(c);
    }
  }
  return base;
})();

const rawSpotlightRows: RawCatalogRow[] = DECK_SPOTLIGHT_CARDS.map((card) => {
  const meta = SPOTLIGHT_CATALOG_META[card.id];
  if (!meta) {
    throw new Error(
      `Add SPOTLIGHT_CATALOG_META[${card.id}] for "${card.title}" in lib/cards/catalog.ts`,
    );
  }
  return {
    rowKey: `spotlight-${card.id}`,
    kind: meta.kind,
    card,
    theme: meta.theme,
  };
});

const rawLaMacarena: RawCatalogRow = {
  rowKey: "world-genre-9101",
  kind: "World + genre",
  card: {
    id: 9101,
    title: "La Macarena",
    artist: "Los Del Rio",
    year: 1993,
    ability: "Festival Pulse",
    abilityDesc: "Gain +10 popularity when played after a World card.",
    pop: 94,
    rarity: "Classic",
    artwork: `${CARD_ARTWORK_BASE}artwork.los-del-rio-la-macarena-v1.png`,
    country: "Spain",
    genre: "Electronic",
  },
  theme: themeForCountry("Spain"),
};

function catalogCardIntensity(row: RawCatalogRow): Intensity {
  const { card } = row;
  if (!card.genre) {
    throw new Error(
      `Cannot resolve intensity for "${row.card.title}" (${row.rowKey}): missing genre`,
    );
  }
  const resolved = resolveThemeSelection({
    genre: card.genre,
    country: card.country,
  });
  if (resolved.resolvedSubgenre) {
    return subgenreIntensity(resolved.resolvedSubgenre);
  }
  if (resolved.resolvedGenre) {
    return appGenreIntensity(resolved.resolvedGenre as AppGenreName);
  }
  throw new Error(
    `Cannot resolve intensity for "${row.card.title}" (${row.rowKey})`,
  );
}

/** Human-readable intensity for tables (matches charter wording). */
export function formatCatalogIntensity(i: Intensity): string {
  return i.charAt(0).toUpperCase() + i.slice(1);
}

function catalogGenreLabel(row: RawCatalogRow): string {
  const { card } = row;
  if (card.genre && isCountrySubgenre(card.genre)) {
    return "World";
  }
  if (!card.genre) return "—";
  return displayGenreLabel(resolvedAppGenre(row));
}

function resolvedAppGenre(row: RawCatalogRow): AppGenreName {
  const { card } = row;
  if (!card.genre) {
    throw new Error(`Catalog row "${row.rowKey}" has no card.genre`);
  }
  if (isCountrySubgenre(card.genre)) {
    throw new Error(
      `Catalog row "${row.rowKey}": use seriesForRow for country-native "${card.genre}"`,
    );
  }
  const r = resolveThemeSelection({ genre: card.genre, country: card.country });
  if (r.resolvedGenre) {
    return r.resolvedGenre as AppGenreName;
  }
  throw new Error(
    `Catalog row "${card.title}" (genre "${card.genre}") has no resolved app genre`,
  );
}

function seriesForRow(row: RawCatalogRow): {
  catalogSeriesType: CatalogSeriesType;
  catalogSeriesLabel: string;
  seriesSortKey: string;
} {
  const { card } = row;
  if (card.genre && isCountrySubgenre(card.genre)) {
    const label = card.country ?? "";
    if (!label) {
      throw new Error(
        `Country-native subgenre "${card.genre}" requires card.country on "${card.title}"`,
      );
    }
    return {
      catalogSeriesType: "country",
      catalogSeriesLabel: label,
      seriesSortKey: `country:${label}`,
    };
  }
  const g = resolvedAppGenre(row);
  const label = displayGenreLabel(g);
  return {
    catalogSeriesType: "genre",
    catalogSeriesLabel: label,
    seriesSortKey: `genre:${g}`,
  };
}

type InterimRow = RawCatalogRow & {
  catalogSeriesType: CatalogSeriesType;
  catalogSeriesLabel: string;
  seriesSortKey: string;
};

function withCatalogNumbering(rows: RawCatalogRow[]): CatalogEntry[] {
  const interim: InterimRow[] = rows.map((r) => ({
    ...r,
    ...seriesForRow(r),
  }));
  const bySeriesKey = new Map<string, InterimRow[]>();
  for (const r of interim) {
    const list = bySeriesKey.get(r.seriesSortKey) ?? [];
    list.push(r);
    bySeriesKey.set(r.seriesSortKey, list);
  }
  const numberByRowKey = new Map<string, number>();
  for (const group of bySeriesKey.values()) {
    group.sort((a, b) => a.card.id - b.card.id);
    group.forEach((r, i) => numberByRowKey.set(r.rowKey, i + 1));
  }
  return interim
    .sort((a, b) => a.card.id - b.card.id)
    .map((r) => {
      const n = numberByRowKey.get(r.rowKey);
      if (n === undefined) {
        throw new Error(`Missing catalogue number for row "${r.rowKey}"`);
      }
      return {
        rowKey: r.rowKey,
        kind: r.kind,
        card: r.card,
        theme: r.theme,
        catalogSeriesType: r.catalogSeriesType,
        catalogSeriesLabel: r.catalogSeriesLabel,
        catalogNumber: n,
        catalogGenreLabel: catalogGenreLabel(r),
        catalogIntensity: catalogCardIntensity(r),
        catalogEra: CATALOG_DEFAULT_ERA,
      };
    });
}

const rawCatalogRows: RawCatalogRow[] = [
  ...rawGenreRows,
  ...rawWorldRows,
  ...rawBlendRows,
  ...rawSpotlightRows,
  rawLaMacarena,
];

function normCatalogKey(title: string, artist?: string): string {
  const t = title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const a = (artist ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  return `${t}|${a}`;
}

function wishlistDefToRaw(d: WishlistCardDef): RawCatalogRow {
  const card: CardData = {
    id: d.id,
    title: d.title,
    artist: d.artist,
    year: d.year,
    genre: d.genre,
    country: d.country,
    ability: d.ability,
    abilityDesc: d.abilityDesc,
    pop: d.pop ?? 72,
    rarity: d.rarity,
    artworkPrompt: d.artworkPrompt,
  };
  if (d.kind === "World") {
    return {
      rowKey: d.rowKey,
      kind: "World",
      card,
      theme: themeForCountry(d.country!),
    };
  }
  if (d.kind === "World blend") {
    return {
      rowKey: d.rowKey,
      kind: "World blend",
      card,
      theme: themeForCountry(d.country!),
    };
  }
  if (d.kind === "World + genre") {
    if (!d.genre) {
      throw new Error(`Wishlist "${d.rowKey}" (World + genre) must set genre`);
    }
    return {
      rowKey: d.rowKey,
      kind: "World + genre",
      card,
      theme: themeForCountry(d.country!),
    };
  }
  const rowKind = d.kind === "Planned" ? "Planned" : "Genre";
  if (!d.genre) {
    throw new Error(`Wishlist "${d.rowKey}" must set genre`);
  }
  return {
    rowKey: d.rowKey,
    kind: rowKind,
    card,
    theme: resolveThemeSelection({ genre: d.genre, country: d.country }).theme,
  };
}

const existingCatalogKeys = new Set(
  rawCatalogRows.map((r) => normCatalogKey(r.card.title, r.card.artist)),
);
const rawWishlistRows: RawCatalogRow[] = WISHLIST_CARD_DEFS.filter(
  (d) => !existingCatalogKeys.has(normCatalogKey(d.title, d.artist)),
).map(wishlistDefToRaw);

const rawCatalogRowsAll: RawCatalogRow[] = [...rawCatalogRows, ...rawWishlistRows];

/** Full catalogue: shipped cards plus planned wishlist rows (wishlist never carries artwork). */
export const CATALOG_ENTRIES: CatalogEntry[] =
  withCatalogNumbering(rawCatalogRowsAll);

export const CATALOG_KINDS: CatalogEntry["kind"][] = [
  "Genre",
  "World",
  "World blend",
  "World + genre",
  "Planned",
];
