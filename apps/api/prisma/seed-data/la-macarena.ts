import type { CardData } from "@repo/cards-domain";
import { ART, ARTWORK_CREATED_AT } from "./_card-helpers";

/**
 * Sole "World + genre" shipped card. Lives outside the genre/world snapshots
 * because it isn't part of any country file.
 */
export const LA_MACARENA_CARD: CardData = {
  id: 9101,
  title: "La Macarena",
  artist: "Los Del Rio",
  year: "1993",
  ability: "Festival Pulse",
  abilityDesc: "Gain +10 popularity when played after a World card.",
  pop: 9,
  rarity: "Classic",
  artwork: `${ART}artwork.los-del-rio-la-macarena-v1.png`,
  artworkCreatedAt: ARTWORK_CREATED_AT["artwork.los-del-rio-la-macarena-v1.png"],
  country: "Spain",
  genre: "Electronic",
  catalogNumber: 17,
};
