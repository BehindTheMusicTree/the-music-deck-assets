import type { CardData } from "@/components/Card";
import { ART, ARTWORK_CREATED_AT, artworkPromptFor } from "../_card-helpers";

export const ITALY_CARDS: CardData[] = [
  {
    id: 52,
    title: "Bella Ciao",
    tracksOut: [7],
    year: 1880,
    genre: "Italian Folk",
    country: "Italy",
    ability: "Reserve",
    abilityDesc: "Shipped catalogue entry.",
    pop: 7,
    rarity: "Banger",
    artwork: `${ART}artwork.bella-ciao-original-v1.png`,
    artworkCreatedAt: ARTWORK_CREATED_AT["artwork.bella-ciao-original-v1.png"],
    ...(artworkPromptFor(52) ?? {}),
    catalogNumber: 1,
  },
  {
    id: 69,
    title: "Blue (Da Ba Dee)",
    artist: "Eiffel 65",
    year: 1999,
    genre: "Electropop",
    country: "Italy",
    ability: "Reserve",
    abilityDesc: "Shipped catalogue entry.",
    pop: 8,
    rarity: "Banger",
    artwork: `${ART}artwork.eiffel-65-blue-v1.png`,
    artworkCreatedAt: ARTWORK_CREATED_AT["artwork.eiffel-65-blue-v1.png"],
    ...(artworkPromptFor(69) ?? {}),
    catalogNumber: 10,
  },
];
