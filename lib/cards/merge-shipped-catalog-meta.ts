import type { CardData } from "@/components/Card";
import { SHIPPED_CATALOG_META_BY_ID } from "./shipped-catalog-meta-by-id";

/**
 * Merges shipped catalogue № + series from {@link SHIPPED_CATALOG_META_BY_ID} into a `CardData`.
 * Call for every card in the shipped deck; catalog reads these fields and does not recompute.
 */
export function mergeShippedCatalogMeta(card: CardData): CardData {
  const m = SHIPPED_CATALOG_META_BY_ID[card.id];
  if (!m) {
    throw new Error(
      `Missing SHIPPED_CATALOG_META_BY_ID[${card.id}] for "${card.title}" — add an entry (or run generate script) when shipping a new card.`,
    );
  }
  return { ...card, ...m };
}
