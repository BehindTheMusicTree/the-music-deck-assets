import type { CardData } from "@/components/Card";
import { ART, ARTWORK_CREATED_AT } from "../_card-helpers";

export const MEXICO_CARDS: CardData[] = [
  {
    id: 34,
    title: "La Cucaracha",
    artist: "Traditional (Mexico)",
    year: 1880,
    genre: "Mexican Folk",
    country: "Mexico",
    ability: "Reserve",
    abilityDesc: "Planned catalogue entry.",
    artworkOffsetY: -20,
    pop: 7,
    rarity: "Banger",
    artwork: `${ART}artwork.la-cucaracha-v1.png`,
    artworkCreatedAt: ARTWORK_CREATED_AT["artwork.la-cucaracha-v1.png"],
    catalogNumber: 1,
    catalogSeriesLabel: "Mexico",
  },
];
