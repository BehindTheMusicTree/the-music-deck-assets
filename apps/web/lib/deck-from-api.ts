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
import {
  CATALOG_DEFAULT_ERA,
  CATALOG_GENRE_REPRESENTATIVE_IDS,
  normCatalogKey,
  type CatalogEntry,
  type CatalogEntryKind,
} from "@/lib/cards/catalog";
import { deriveCatalogSeriesLabel } from "@/lib/cards/_card-helpers";
import type { WishlistEntry, WishlistKind } from "@/lib/cards/wishlist";

/** JSON shape returned by `GET /cards` family (matches Nest `CardResponse`). */
export type ApiCardJson = {
  id: number;
  rowKey: string;
  status: string;
  kind: string;
  title: string;
  artist?: string;
  year: string;
  genre?: string;
  country?: string;
  ability: string;
  abilityDesc: string;
  pop: number;
  rarity: CardData["rarity"];
  catalogNumber?: number;
  artworkUrl?: string;
  artworkKey?: string;
  artworkContentType?: string;
  artworkBytes?: number;
  artworkChecksum?: string;
  artworkOffsetY?: number;
  artworkOverBorder?: boolean;
  artworkCreatedAt?: string;
  artworkPrompt?: string;
  tracksOut: number[];
};

const ID_TO_APP_GENRE = Object.fromEntries(
  (
    Object.entries(CATALOG_GENRE_REPRESENTATIVE_IDS) as [AppGenreName, number][]
  ).map(([g, id]) => [id, g]),
) as Record<number, AppGenreName>;

export function apiCardToCardData(a: ApiCardJson): CardData {
  return {
    id: a.id,
    title: a.title,
    artist: a.artist,
    year: a.year,
    genre: a.genre,
    country: a.country,
    ability: a.ability,
    abilityDesc: a.abilityDesc,
    pop: a.pop,
    rarity: a.rarity,
    catalogNumber: a.catalogNumber,
    artworkUrl: a.artworkUrl,
    artworkKey: a.artworkKey,
    artworkPrompt: a.artworkPrompt,
    artworkCreatedAt: a.artworkCreatedAt,
    artworkOffsetY: a.artworkOffsetY,
    artworkOverBorder: a.artworkOverBorder,
    tracksOut: a.tracksOut?.length ? a.tracksOut : undefined,
  };
}

function apiKindToWishlistKind(kind: string): WishlistKind {
  switch (kind) {
    case "Genre":
      return "Genre";
    case "World":
      return "World";
    case "WorldBlend":
      return "World blend";
    case "WorldGenre":
      return "World + genre";
    case "Planned":
      return "Planned";
    default:
      throw new Error(`Unexpected wishlist card kind "${kind}"`);
  }
}

type RawCatalogRow = {
  rowKey: string;
  kind: CatalogEntryKind;
  card: CardData;
  theme: GenreTheme;
};

function spotlightMetaForCard(card: CardData): {
  kind: CatalogEntryKind;
  theme: GenreTheme;
} {
  const g = card.genre;
  if (!g) {
    throw new Error(
      `Spotlight card "${card.title}" (${card.id}) must set genre`,
    );
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
    throw new Error(
      `Spotlight "${card.title}": no resolved app genre for "${g}"`,
    );
  }
  return {
    kind: "Genre",
    theme: APP_GENRE_THEMES[r.resolvedGenre as AppGenreName],
  };
}

function rawCatalogRowFromApiShipped(a: ApiCardJson): RawCatalogRow {
  const card = apiCardToCardData(a);
  if (a.rowKey.startsWith("genre-")) {
    const g = ID_TO_APP_GENRE[a.id];
    if (!g) {
      throw new Error(`Unknown genre representative id ${a.id}`);
    }
    return {
      rowKey: a.rowKey,
      kind: "Genre",
      card,
      theme: APP_GENRE_THEMES[g],
    };
  }
  if (a.rowKey.startsWith("world-")) {
    return {
      rowKey: a.rowKey,
      kind: "World",
      card,
      theme: themeForCountry(card.country!),
    };
  }
  if (a.rowKey.startsWith("blend-")) {
    return {
      rowKey: a.rowKey,
      kind: "World blend",
      card,
      theme: themeForCountry(card.country!),
    };
  }
  if (a.rowKey === "world-genre-9101") {
    return {
      rowKey: a.rowKey,
      kind: "World + genre",
      card,
      theme: themeForCountry("Spain"),
    };
  }
  if (a.rowKey.startsWith("spotlight-")) {
    const meta = spotlightMetaForCard(card);
    return {
      rowKey: a.rowKey,
      kind: meta.kind,
      card,
      theme: meta.theme,
    };
  }
  throw new Error(`Unrecognised shipped rowKey "${a.rowKey}"`);
}

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

function inferCatalogSeriesType(
  country: string | undefined,
  label: string,
): CatalogSeriesType {
  return country != null && label === country ? "country" : "genre";
}

function catalogEntryFromRow(row: RawCatalogRow): CatalogEntry {
  const { card } = row;
  if (card.catalogNumber == null) {
    throw new Error(
      `Shipped card "${card.title}" (id ${card.id}): set catalogNumber on the card definition`,
    );
  }
  const catalogSeriesLabel = deriveCatalogSeriesLabel(card);
  return {
    rowKey: row.rowKey,
    kind: row.kind,
    card,
    theme: row.theme,
    catalogSeriesType: inferCatalogSeriesType(card.country, catalogSeriesLabel),
    catalogSeriesLabel,
    catalogNumber: card.catalogNumber,
    catalogGenreLabel: catalogGenreLabel(row),
    catalogIntensity: catalogCardIntensity(row),
    catalogEra: CATALOG_DEFAULT_ERA,
  };
}

/** Rebuild shipped {@link CatalogEntry} rows from API payloads (same table output as static bundle). */
export function buildCatalogEntriesFromShippedApi(
  shipped: ApiCardJson[],
): CatalogEntry[] {
  const rawRows = shipped.map(rawCatalogRowFromApiShipped);
  return rawRows
    .map(catalogEntryFromRow)
    .sort((a, b) => a.card.id - b.card.id);
}

function wishlistInterimFromApi(a: ApiCardJson): {
  rowKey: string;
  kind: WishlistKind;
  card: CardData;
  theme: GenreTheme;
} {
  const card = apiCardToCardData(a);
  const kind = apiKindToWishlistKind(a.kind);
  if (kind === "World") {
    return {
      rowKey: a.rowKey,
      kind: "World",
      card,
      theme: themeForCountry(card.country!),
    };
  }
  if (kind === "World blend") {
    return {
      rowKey: a.rowKey,
      kind: "World blend",
      card,
      theme: themeForCountry(card.country!),
    };
  }
  if (kind === "World + genre") {
    if (!card.genre) {
      throw new Error(`Wishlist "${a.rowKey}" (World + genre) must set genre`);
    }
    return {
      rowKey: a.rowKey,
      kind: "World + genre",
      card,
      theme: themeForCountry(card.country!),
    };
  }
  const rowKind = kind === "Planned" ? "Planned" : "Genre";
  if (!card.genre) {
    throw new Error(`Wishlist "${a.rowKey}" must set genre`);
  }
  return {
    rowKey: a.rowKey,
    kind: rowKind,
    card,
    theme: resolveThemeSelection({ genre: card.genre, country: card.country })
      .theme,
  };
}

function wishlistAppGenreLabel(card: CardData, rowKey: string): string {
  if (card.genre && isCountrySubgenre(card.genre)) {
    return "World";
  }
  if (!card.genre) return "—";
  const r = resolveThemeSelection({ genre: card.genre, country: card.country });
  if (r.resolvedGenre) {
    return displayGenreLabel(r.resolvedGenre as AppGenreName);
  }
  throw new Error(
    `Wishlist row "${rowKey}" (genre "${card.genre}") has no resolved app genre`,
  );
}

function wishlistIntensity(card: CardData, rowKey: string): Intensity {
  if (!card.genre) {
    throw new Error(
      `Wishlist row "${rowKey}" (${card.title}): missing genre for intensity`,
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
    `Wishlist row "${rowKey}" (${card.title}): cannot resolve intensity`,
  );
}

/** Wishlist + planned rows, deduped against shipped catalogue keys like the static bundle. */
export function buildWishlistEntriesFromApi(
  wishlist: ApiCardJson[],
  shippedCatalog: CatalogEntry[],
): WishlistEntry[] {
  const shippedKeys = new Set(
    shippedCatalog.map((r) => normCatalogKey(r.card.title, r.card.artist)),
  );
  const interim = wishlist
    .filter(
      (a) => !shippedKeys.has(normCatalogKey(a.title, a.artist)),
    )
    .map(wishlistInterimFromApi);
  const sorted = [...interim].sort((a, b) => a.card.id - b.card.id);
  return sorted.map((row, i) => ({
    rowKey: row.rowKey,
    kind: row.kind,
    card: row.card,
    theme: row.theme,
    ordinal: i + 1,
    appGenreLabel: wishlistAppGenreLabel(row.card, row.rowKey),
    intensity: wishlistIntensity(row.card, row.rowKey),
  }));
}
