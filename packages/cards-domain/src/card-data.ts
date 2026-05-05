export type CardRarity = "LEGENDARY" | "CLASSIC" | "BANGER" | "NICHE";

export const CARD_RARITY_ORDER: readonly CardRarity[] = [
  "NICHE",
  "BANGER",
  "CLASSIC",
  "LEGENDARY",
] as const;

/** Card variant — matches the Prisma `CardKind` enum. */
export type CardKind = "SONG" | "TRANSITION";

/** Wishlist row classification (table view). */
export type WishlistKindLabel = "Card" | "Wishlist";

/** Card season label (era). All shipped today are Era I. */
export const CATALOG_DEFAULT_ERA = "Era I" as const;
export type CatalogEra = typeof CATALOG_DEFAULT_ERA;

/** Shipped deck: how catalogue № is bucketed. */
export type CatalogSeriesType = "genre" | "country";

/** Intensity ramp shared with `apps/web/lib/genres` and Prisma `Intensity`. */
export type Intensity = "POP" | "SOFT" | "EXPERIMENTAL" | "HARDCORE";

/** Shared properties for any card variant. */
export interface BaseCardData {
  id: number;
  title: string;
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
}

/**
 * Song payload: Song-specific fields layered on top of base card fields.
 * This is the canonical model for the current catalog and API routes.
 */
export interface SongData extends BaseCardData {
  artist?: string;
  year: string;
  /** Subgenre, or a parent app genre (e.g. "Electronic" on World+genre) when not a subgenre name. */
  genre: string;
  country?: string;
  /** Song ids this card transitions into (successors in a DJ transition). */
  songsOut?: number[];
  /** Shipped deck only: catalogue number within the derived series. */
  catalogNumber?: number;
  /** Player-facing stable id from API when shipped (e.g. RK-S1-023). */
  printedSetId?: string;
}

/** Transition payload: dedicated card variant used for bridge/mix steps. */
export interface TransitionData extends BaseCardData {
  genre: string;
}

/** Backward-compatible alias kept while the UI migrates from CardData -> SongData. */
export type CardData = SongData;

/** Source row for planned / future song cards — separate input shape from `SongData`. */
export type WishlistCardDef = {
  id: number;
  title: string;
  artist?: string;
  year: string;
  kind: WishlistKindLabel;
  /** Subgenre, or an app-level genre when the card is World+genre only. */
  genre: string;
  country?: string;
  rarity: CardRarity;
  pop?: number;
  ability: string;
  abilityDesc: string;
  /** Optional illustration brief before the asset is shipped to the bucket. */
  artworkPrompt?: string;
};
