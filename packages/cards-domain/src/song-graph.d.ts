import type { CardData } from "./card-data";
export type SongGraph = {
    byId: Record<number, Pick<CardData, "id" | "title" | "artist" | "genre" | "artwork" | "artworkUrl" | "printedSetId">>;
    songsOutById: Record<number, number[]>;
    songsInById: Record<number, number[]>;
};
export declare function buildSongGraph(cards: CardData[]): SongGraph;
export type CardSongIndexEntry = Pick<CardData, "id" | "title" | "artist" | "genre" | "artwork" | "artworkUrl" | "printedSetId"> & {
    songsOut: number[];
};
export type CardSongIndex = Record<number, CardSongIndexEntry>;
export declare function buildCardSongIndex(cards: CardData[], prebuilt?: SongGraph): CardSongIndex;
export declare function deriveSongsInFromSongIndex(cardSongIndex: CardSongIndex, targetId: number): number[];
