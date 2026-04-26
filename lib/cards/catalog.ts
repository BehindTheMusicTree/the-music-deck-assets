import type { CardData, GenreTheme } from "@/components/Card";
import {
  APP_GENRE_THEMES,
  type AppGenreName,
  themeForCountry,
} from "@/lib/genres";
import { CARD_EXAMPLE_ART_BASE } from "./art-path";
import { MOCK_CARDS, WORLD_FLAG_CARDS, WORLD_MIXED_CARDS } from "./examples";

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
    artwork: `${CARD_EXAMPLE_ART_BASE}artwork.example-los-del-rio-la-macarena-v1.png`,
    country: "Spain",
    subgenre: undefined,
  },
  theme: themeForCountry("Spain"),
  genreName: "Electronic",
};

/** All example cards shipped for previews and the cards charter, for catalog listing. */
export const CATALOG_ENTRIES: CatalogEntry[] = [
  ...genreEntries,
  ...worldEntries,
  ...worldBlendEntries,
  laMacarena,
].sort((a, b) => a.card.id - b.card.id);
