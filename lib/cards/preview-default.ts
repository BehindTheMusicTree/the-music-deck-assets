import type { CardData } from "@/components/Card";

/** Default card for genre / theme preview tooling. */
export const DEFAULT_PREVIEW_CARD: CardData = {
  id: 9000,
  title: "Preview Track",
  artist: "Artist",
  year: 2024,
  genre: "Disco Pop",
  ability: "Preview",
  abilityDesc: "Live preview of the selected genre or subgenre theme.",
  pop: 75,
  rarity: "Classic",
  artwork: "/cards/artworks/deck/artwork.bohemian-rhapsody-v2.png",
  artworkPrompt:
    "1970s rock opera single cover, dramatic stage lighting, vinyl-era palette.",
};
