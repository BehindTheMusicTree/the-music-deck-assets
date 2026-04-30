import type { CardRarity } from "@/lib/cards/card-rarity";

/** Source row for planned / future cards — not part of the shipped deck catalogue. */
export type WishlistCardDef = {
  rowKey: string;
  id: number;
  title: string;
  artist?: string;
  year: string;
  kind: "Genre" | "World" | "World blend" | "World + genre" | "Planned";
  /** Subgenre, or an app-level genre when the card is World+genre only. */
  genre?: string;
  country?: string;
  rarity: CardRarity;
  pop?: number;
  ability: string;
  abilityDesc: string;
  /** Optional illustration brief before the asset is shipped to `public/cards/artworks/deck/`. */
  artworkPrompt?: string;
};
