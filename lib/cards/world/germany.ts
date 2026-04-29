import type { CardData } from "@/components/Card";
import { ART, ARTWORK_CREATED_AT, artworkPromptFor } from "../_card-helpers";

export const GERMANY_CARDS: CardData[] = [
  {
    id: 95,
    title: "Ich geh heut nicht mehr tanzen",
    artist: "Jannen May & ENNIO",
    year: 2016,
    genre: "Pop Rock",
    country: "Germany",
    ability: "Reserve",
    abilityDesc: "Shipped catalogue entry.",
    pop: 7,
    rarity: "Classic",
    artwork: `${ART}artwork.hannenmaykentereit-ich-geh-heut-nicht-mehr-tanzen-v1.png`,
    artworkCreatedAt:
      ARTWORK_CREATED_AT[
        "artwork.hannenmaykentereit-ich-geh-heut-nicht-mehr-tanzen-v1.png"
      ],
    ...(artworkPromptFor(95) ?? {}),
    catalogNumber: 15,
    catalogSeriesLabel: "Rock",
  },
];
