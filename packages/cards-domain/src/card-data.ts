export type CardRarity = "Legendary" | "Classic" | "Banger" | "Niche";

export const CARD_RARITY_ORDER: readonly CardRarity[] = [
  "Niche",
  "Banger",
  "Classic",
  "Legendary",
] as const;

/** Catalogue row classification. Matches Prisma `CardKind` enum. */
export type CardKind = "Card" | "Planned";

/** Top-level filter: shipped catalogue, wishlist (concept), or planned (no artwork yet). */
export type CardStatus = "Shipped" | "Wishlist" | "Planned";

/** Wishlist row classification (table view). */
export type WishlistKindLabel = "Card" | "Planned";

/** Card season label (era). All shipped today are Era I. */
export const CATALOG_DEFAULT_ERA = "Era I" as const;
export type CatalogEra = typeof CATALOG_DEFAULT_ERA;

/** Shipped deck: how catalogue № is bucketed. */
export type CatalogSeriesType = "genre" | "country";

/** Intensity ramp shared with `apps/web/lib/genres`. Re-exported for convenience. */
export type Intensity = "pop" | "soft" | "experimental" | "hardcore";

/**
 * Canonical card payload returned by the API and rendered by the UI.
 * Mirrors the legacy `CardData` shape from `apps/web/components/Card` so component
 * call-sites remain unchanged. Artwork now resolves to a CDN URL on `artworkUrl`.
 */
export interface CardData {
  id: number;
  title: string;
  artist?: string;
  year: string;
  /** Subgenre, or a parent app genre (e.g. "Electronic" on World+genre) when not a subgenre name. */
  genre?: string;
  ability: string;
  abilityDesc: string;
  /** Popularity 1–9. */
  pop: number;
  rarity: CardRarity;
  /**
   * Public URL the web `<img>` loads. Computed by the API as `S3_PUBLIC_BASE_URL + artworkKey`
   * (or signed URL when bucket is private). Undefined when the card has no artwork yet.
   */
  artwork?: string;
  artworkUrl?: string;
  /** Bucket object key (e.g. "deck/artwork.bohemian-rhapsody-v2.png"); undefined if no artwork. */
  artworkKey?: string;
  /** Optional illustration brief; not rendered. */
  artworkPrompt?: string;
  artworkCreatedAt?: string;
  wikipediaUrl?: string;
  artworkOffsetY?: number;
  artworkOverBorder?: boolean;
  country?: string;
  /** Track ids this card transitions into (successors in a DJ transition). */
  tracksOut?: number[];
  /** Shipped deck only: catalogue number within the derived series. */
  catalogNumber?: number;
}

/** Source row for planned / future cards — separate input shape from `CardData`. */
export type WishlistCardDef = {
  id: number;
  title: string;
  artist?: string;
  year: string;
  kind: WishlistKindLabel;
  /** Subgenre, or an app-level genre when the card is World+genre only. */
  genre?: string;
  country?: string;
  rarity: CardRarity;
  pop?: number;
  ability: string;
  abilityDesc: string;
  /** Optional illustration brief before the asset is shipped to the bucket. */
  artworkPrompt?: string;
};
