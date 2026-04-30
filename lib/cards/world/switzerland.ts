import type { CardData } from "@/components/Card";
import { ART, ARTWORK_CREATED_AT, artworkPromptFor } from "../_card-helpers";

export const SWITZERLAND_CARDS: CardData[] = [
  {
    catalogNumber: 1,
    id: 97,
    title: "E gschänkte Tag",
    artist: "Jodlerklub Oberhofen",
    year: 1980,
    genre: "Yodel",
    country: "Switzerland",
    ability: "Reserve",
    abilityDesc: "Shipped catalogue entry.",
    pop: 6,
    rarity: "Classic",
    artwork: `${ART}artwork.e-gschankte-tag-v1.png`,
    artworkCreatedAt: ARTWORK_CREATED_AT["artwork.e-gschankte-tag-v1.png"],
    ...(artworkPromptFor(97) ?? {}),
  },
];
