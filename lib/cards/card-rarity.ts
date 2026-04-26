/** Tier id on `CardData` matches the string shown under the rarity icon. */
export type CardRarity = "Legendary" | "Classic" | "Banger" | "Niche";

/** Lowest → highest for showcase grids. */
export const CARD_RARITY_ORDER: readonly CardRarity[] = [
  "Niche",
  "Banger",
  "Classic",
  "Legendary",
] as const;
