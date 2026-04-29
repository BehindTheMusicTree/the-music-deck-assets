import type { CardData } from "@/components/Card";
import type { CatalogSeriesType, GenreTheme } from "@/lib/card-theme-types";
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
import { ARTWORK_CREATED_AT } from "./artwork-created-at";
import { CARD_ARTWORK_BASE } from "./art-path";
import { DECK_SPOTLIGHT_CARDS, MOCK_CARDS } from "./genre";
import { WORLD_FLAG_CARDS, WORLD_MIXED_CARDS } from "./world";
import { buildCardTrackIndex } from "./track-graph";

export type { CatalogSeriesType };

/** Card season label: every shipped catalogue card is season 1 for now. */
export const CATALOG_DEFAULT_ERA = "Era I" as const;
export type CatalogEra = typeof CATALOG_DEFAULT_ERA;

export type CatalogEntryKind =
  | "Genre"
  | "World"
  | "World blend"
  | "World + genre";

export type CatalogEntry = {
  rowKey: string;
  kind: CatalogEntryKind;
  card: CardData;
  theme: GenreTheme;
  /** Inferred: "country" when catalogSeriesLabel === card.country, else "genre". */
  catalogSeriesType: CatalogSeriesType;
  /** Copied from `card.catalogSeriesLabel`. */
  catalogSeriesLabel: string;
  /** Copied from `card.catalogNumber` (per-series index from shipped meta). */
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
  kind: CatalogEntryKind;
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

/**
 * Catalog row “kind” + row theme for spotlight cards. Uses `themeForCountry` for world rows
 * instead of `resolveThemeSelection` so the table shows the country shell consistently; full
 * card chrome still comes from `resolveThemeSelection` on the `Card` component.
 */
function spotlightMetaForCard(card: CardData): {
  kind: CatalogEntryKind;
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
  { kind: CatalogEntryKind; theme: GenreTheme }
> = (() => {
  return Object.fromEntries(
    DECK_SPOTLIGHT_CARDS.map((c) => [c.id, spotlightMetaForCard(c)]),
  );
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
    pop: 9,
    rarity: "Classic",
    artwork: `${CARD_ARTWORK_BASE}artwork.los-del-rio-la-macarena-v1.png`,
    artworkCreatedAt: ARTWORK_CREATED_AT["artwork.los-del-rio-la-macarena-v1.png"],
    country: "Spain",
    genre: "Electronic",
    catalogNumber: 17,
    catalogSeriesLabel: "Electronic",
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
      `Catalog row "${row.rowKey}": country-native "${card.genre}" must not reach resolvedAppGenre`,
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

function inferCatalogSeriesType(card: CardData): CatalogSeriesType {
  return card.country != null && card.catalogSeriesLabel === card.country
    ? "country"
    : "genre";
}

function catalogEntryFromRow(row: RawCatalogRow): CatalogEntry {
  const { card } = row;
  if (card.catalogNumber == null || !card.catalogSeriesLabel) {
    throw new Error(
      `Shipped card "${card.title}" (id ${card.id}): set catalogNumber and catalogSeriesLabel directly on the card definition`,
    );
  }
  return {
    rowKey: row.rowKey,
    kind: row.kind,
    card,
    theme: row.theme,
    catalogSeriesType: inferCatalogSeriesType(card),
    catalogSeriesLabel: card.catalogSeriesLabel,
    catalogNumber: card.catalogNumber,
    catalogGenreLabel: catalogGenreLabel(row),
    catalogIntensity: catalogCardIntensity(row),
    catalogEra: CATALOG_DEFAULT_ERA,
  };
}

const rawCatalogRows: RawCatalogRow[] = [
  ...rawGenreRows,
  ...rawWorldRows,
  ...rawBlendRows,
  ...rawSpotlightRows,
  rawLaMacarena,
];

/** Normalised title|artist key for deduplicating wishlist rows against the shipped deck. */
export function normCatalogKey(title: string, artist?: string): string {
  const t = title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const a = (artist ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  return `${t}|${a}`;
}

/** Keys for shipped catalogue rows only — used by `lib/cards/wishlist.ts`. */
export const SHIPPED_CATALOG_DEDUP_KEYS = new Set(
  rawCatalogRows.map((r) => normCatalogKey(r.card.title, r.card.artist)),
);

/** Shipped deck only (bundled artwork). Wishlist rows live in {@link WISHLIST_ENTRIES}. */
export const CATALOG_ENTRIES: CatalogEntry[] = rawCatalogRows
  .map(catalogEntryFromRow)
  .sort((a, b) => a.card.id - b.card.id);

/**
 * Per-id transition data for shipped catalogue cards. `buildCardTrackIndex` runs
 * `buildTrackGraph` once (validates `tracksOut` links on the same card list).
 */
export const CATALOG_CARD_TRACK_INDEX = buildCardTrackIndex(
  rawCatalogRows.map((r) => r.card),
);

/**
 * Pass to `Card` (or use `CatalogCard`) so transition strips resolve — only
 * `cardTrackIndex` is required.
 */
export const CATALOG_CARD_TRANSITION_PROPS = {
  cardTrackIndex: CATALOG_CARD_TRACK_INDEX,
} as const;

export const CATALOG_KINDS: CatalogEntryKind[] = [
  "Genre",
  "World",
  "World blend",
  "World + genre",
];
