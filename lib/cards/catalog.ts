import type { CardData, GenreTheme } from "@/components/Card";
import {
  APP_GENRE_THEMES,
  type AppGenreName,
  themeForCountry,
} from "@/lib/genres";
import { CARD_ARTWORK_BASE } from "./art-path";
import {
  DECK_SPOTLIGHT_CARDS,
  MOCK_CARDS,
  WORLD_FLAG_CARDS,
  WORLD_MIXED_CARDS,
} from "./examples";

export type CatalogEntry = {
  /** Stable row key for React lists */
  rowKey: string;
  /** High-level group for the catalog table */
  kind: "Genre" | "World" | "World blend" | "World + genre";
  card: CardData;
  theme: GenreTheme;
  genreName?: string;
};

const mockGenreKeys = Object.keys(MOCK_CARDS) as AppGenreName[];

const genreEntries: CatalogEntry[] = mockGenreKeys.map((g) => {
  const card = MOCK_CARDS[g];
  return {
    rowKey: `genre-${card.id}`,
    kind: "Genre",
    card,
    theme: APP_GENRE_THEMES[g],
  };
});

const worldEntries: CatalogEntry[] = WORLD_FLAG_CARDS.map((c) => ({
  rowKey: `world-${c.id}`,
  kind: "World",
  card: c,
  theme: themeForCountry(c.country!),
}));

const worldBlendEntries: CatalogEntry[] = WORLD_MIXED_CARDS.map((c) => ({
  rowKey: `blend-${c.id}`,
  kind: "World blend",
  card: c,
  theme: themeForCountry(c.country!),
}));

/** How each `DECK_SPOTLIGHT_CARDS` row appears in the catalogue (theme + type strip group). */
const SPOTLIGHT_CATALOG_META: Record<
  number,
  { kind: CatalogEntry["kind"]; theme: GenreTheme }
> = (() => {
  const fr = themeForCountry("France");
  const es = themeForCountry("Spain");
  const rock = APP_GENRE_THEMES.Rock;
  return {
    28: { kind: "Genre", theme: rock },
    29: { kind: "Genre", theme: rock },
    30: { kind: "World blend", theme: es },
    31: { kind: "World", theme: fr },
    32: { kind: "World", theme: fr },
    33: { kind: "World blend", theme: fr },
  };
})();

const spotlightEntries: CatalogEntry[] = DECK_SPOTLIGHT_CARDS.map((card) => {
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

const laMacarena: CatalogEntry = {
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
    subgenre: undefined,
  },
  theme: themeForCountry("Spain"),
  genreName: "Electronic",
};

/** All shipped cards with artwork (charter, previews, catalogue). */
export const CATALOG_ENTRIES: CatalogEntry[] = [
  ...genreEntries,
  ...worldEntries,
  ...worldBlendEntries,
  ...spotlightEntries,
  laMacarena,
].sort((a, b) => a.card.id - b.card.id);
