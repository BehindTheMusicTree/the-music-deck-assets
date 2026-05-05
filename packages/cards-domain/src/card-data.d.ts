export type CardRarity = "LEGENDARY" | "CLASSIC" | "BANGER" | "NICHE";
export declare const CARD_RARITY_ORDER: readonly CardRarity[];
export type CardKind = "SONG" | "TRANSITION";
export type WishlistKindLabel = "Card" | "Wishlist";
export declare const CATALOG_DEFAULT_ERA: "Era I";
export type CatalogEra = typeof CATALOG_DEFAULT_ERA;
export type CatalogSeriesType = "genre" | "country";
export type Intensity = "POP" | "SOFT" | "EXPERIMENTAL" | "HARDCORE";
export interface BaseCardData {
    id: number;
    title: string;
    ability: string;
    abilityDesc: string;
    pop: number;
    rarity: CardRarity;
    artwork?: string;
    artworkUrl?: string;
    artworkKey?: string;
    artworkPrompt?: string;
    artworkCreatedAt?: string;
    wikipediaUrl?: string;
    artworkOffsetY?: number;
    artworkOverBorder?: boolean;
}
export interface SongData extends BaseCardData {
    artist?: string;
    year: string;
    genre: string;
    country?: string;
    songsOut?: number[];
    catalogNumber?: number;
    printedSetId?: string;
}
export interface TransitionData extends BaseCardData {
    genre: string;
}
export type CardData = SongData;
export type WishlistCardDef = {
    id: number;
    title: string;
    artist?: string;
    year: string;
    kind: WishlistKindLabel;
    genre: string;
    country?: string;
    rarity: CardRarity;
    pop?: number;
    ability: string;
    abilityDesc: string;
    artworkPrompt?: string;
};
