export type GenreName = "Rock" | "Mainstream" | "Electronic" | "Hip-Hop" | "Disco/Funk" | "Reggae/Dub" | "Classical" | "Vintage";
export declare const GENRE_NAMES: GenreName[];
export type RootGenreName = GenreName;
export declare const APP_GENRE_NAMES: RootGenreName[];
export type NonMainstreamGenreName = Exclude<GenreName, "Mainstream">;
