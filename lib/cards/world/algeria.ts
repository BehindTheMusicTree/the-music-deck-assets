import type { CardData } from "@/components/Card";
import { ART, ARTWORK_CREATED_AT, artworkPromptFor } from "../_card-helpers";

export const ALGERIA_CARDS: CardData[] = [
  {
    id: 35,
    title: "Abdel Kader",
    artist: "Rachid Taha, Khaled, Faudel",
    year: 1998,
    genre: "Raï",
    country: "Algeria",
    ability: "Caravan",
    abilityDesc:
      "Allied World cards gain +4 popularity when this card enters play.",
    pop: 8,
    rarity: "Classic",
    artwork: `${ART}artwork.un-deux-trois-soleil-abdel-kader-v1.png`,
    artworkCreatedAt:
      ARTWORK_CREATED_AT["artwork.un-deux-trois-soleil-abdel-kader-v1.png"],
    ...(artworkPromptFor(35) ?? {}),
    catalogNumber: 1,
    catalogSeriesLabel: "Algeria",
  },
];
