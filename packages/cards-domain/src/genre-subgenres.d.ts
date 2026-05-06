import type { Intensity } from "./card-data";
import type { NonMainstreamGenreName } from "./genre-names";
export declare function intensityLevelIndex(level: Intensity): number;
interface BaseSubgenre {
    n: string;
    color?: string;
    parentA: string;
    parentB?: NonMainstreamGenreName;
    intensity: Intensity;
    influence?: {
        genre: NonMainstreamGenreName;
        intensity: Intensity;
    };
}
export interface GenreSubgenre extends BaseSubgenre {
    kind: "genre";
    parentA: NonMainstreamGenreName;
}
export interface CountrySubgenre extends BaseSubgenre {
    kind: "country";
    parentB?: never;
}
export type Subgenre = GenreSubgenre | CountrySubgenre;
export declare const SUBGENRES: Subgenre[];
export {};
