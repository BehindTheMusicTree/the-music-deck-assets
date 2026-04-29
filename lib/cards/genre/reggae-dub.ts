import type { CardData } from "@/components/Card";
import { ART, ARTWORK_CREATED_AT, artworkPromptFor } from "../_card-helpers";

export const REGGAE_DUB_CARDS: CardData[] = [
  {
    id: 4,
    title: "Is This Love",
    artist: "Bob Marley",
    year: 1978,
    genre: "Roots",
    ability: "Roots",
    abilityDesc: "Heals 20 HP when adjacent to a World genre card.",
    pop: 8,
    rarity: "Classic",
    artwork: `${ART}artwork.is-this-love-v1.png`,
    artworkCreatedAt: ARTWORK_CREATED_AT["artwork.is-this-love-v1.png"],
    catalogNumber: 1,
    catalogSeriesLabel: "Reggae/Dub",
  },
  {
    id: 104,
    title: "I Shot the Sherif",
    artist: "Bob Marley & The Wailers",
    year: 1973,
    genre: "Roots",
    ability: "Reserve",
    abilityDesc: "Shipped catalogue entry.",
    tracksOut: [105],
    pop: 9,
    rarity: "Legendary",
    artwork: `${ART}artwork.bob-marley-i-shot-the-sherif-v1.png`,
    artworkCreatedAt:
      ARTWORK_CREATED_AT["artwork.bob-marley-i-shot-the-sherif-v1.png"],
    ...(artworkPromptFor(104) ?? {}),
    catalogNumber: 3,
    catalogSeriesLabel: "Reggae/Dub",
  },
];
