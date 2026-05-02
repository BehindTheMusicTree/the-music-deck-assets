import type { CardData } from "@/components/Card";
import type { GenreTheme } from "@/lib/card-theme-types";
import {
  type AppGenreName,
  type Intensity,
  appGenreIntensity,
  displayGenreLabel,
  isCountrySubgenre,
  resolveThemeSelection,
  subgenreIntensity,
  themeForCountry,
} from "@/lib/genres";
import { SHIPPED_CATALOG_DEDUP_KEYS, normCatalogKey } from "./catalog";
import type { WishlistCardDef } from "./wishlist-types";
import { WISHLIST_CARD_DEFS } from "./catalog-wishlist-defs";

export type WishlistKind = WishlistCardDef["kind"];

/** Resolved row for the wishlist tab — separate from {@link CatalogEntry}. */
export type WishlistEntry = {
  rowKey: string;
  kind: WishlistKind;
  card: CardData;
  theme: GenreTheme;
  /** 1-based order in the wishlist table (stable sort by card id). */
  ordinal: number;
  appGenreLabel: string;
  intensity: Intensity;
};

export const WISHLIST_KINDS: WishlistKind[] = [
  "Genre",
  "World",
  "World blend",
  "World + genre",
  "Planned",
];

type WishlistInterim = {
  rowKey: string;
  kind: WishlistKind;
  card: CardData;
  theme: GenreTheme;
};

function wishlistDefToInterim(d: WishlistCardDef): WishlistInterim {
  const card: CardData = {
    id: d.id,
    title: d.title,
    artist: d.artist,
    year: d.year,
    genre: d.genre,
    country: d.country,
    ability: d.ability,
    abilityDesc: d.abilityDesc,
    pop: d.pop ?? 5,
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

const wishlistInterimRows: WishlistInterim[] = WISHLIST_CARD_DEFS.filter(
  (d) => !SHIPPED_CATALOG_DEDUP_KEYS.has(normCatalogKey(d.title, d.artist)),
).map(wishlistDefToInterim);

/** Planned / future cards not yet in the shipped deck (no bundled artwork). */
export const WISHLIST_ENTRIES: WishlistEntry[] = (() => {
  const sorted = [...wishlistInterimRows].sort((a, b) => a.card.id - b.card.id);
  return sorted.map((row, i) => ({
    rowKey: row.rowKey,
    kind: row.kind,
    card: row.card,
    theme: row.theme,
    ordinal: i + 1,
    appGenreLabel: wishlistAppGenreLabel(row.card, row.rowKey),
    intensity: wishlistIntensity(row.card, row.rowKey),
  }));
})();
