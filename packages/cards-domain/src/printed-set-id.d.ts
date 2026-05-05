import { type RootGenreName } from "./genre-names";
export declare const PRINTED_DEFAULT_SEASON: "S1";
export declare const ROOT_GENRE_PRINTED_TYPE_CODE: Record<RootGenreName, string>;
export declare function territoryToPrintedTypeCode(territoryName: string): string;
export declare function printedTypeCodeForSongCard(input: {
    genre: string;
    country?: string | null;
    title?: string;
    id?: number;
}, codeByAnchorName: ReadonlyMap<string, string>): string;
export declare function printedTypeCodeForTransitionGenre(rootGenreLabel: string, codeByAnchorName: ReadonlyMap<string, string>): string;
export declare function printedSetIdTypeSegment(printedSetId: string): string;
export declare function formatPrintedSetId(typeCode: string, seasonCode: string, sequenceWithinSeason: number, variantSuffix?: string | null): string;
