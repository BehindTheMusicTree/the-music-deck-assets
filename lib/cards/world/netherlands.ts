import type { CardData } from "@/components/Card";
import { ART, ARTWORK_CREATED_AT } from "../_card-helpers";

export const NETHERLANDS_CARDS: CardData[] = [
  {
    id: 94,
    title: "Drank & Drugs",
    artist: "Lil Kleine & Ronnie Flex",
    year: 2015,
    genre: "Hip-House",
    country: "Netherlands",
    ability: "Reserve",
    abilityDesc: "Shipped catalogue entry.",
    pop: 8,
    rarity: "Banger",
    artwork: `${ART}artwork.lil-kleine-drank-drugs-v1.png`,
    artworkCreatedAt:
      ARTWORK_CREATED_AT["artwork.lil-kleine-drank-drugs-v1.png"],
    catalogNumber: 13,
  },
];
