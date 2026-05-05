import type { RootGenreName, GenreName } from "./genre-names";
import type { GenreTheme } from "./genre-theme-types";
export declare function hexToRgb(hex: string): [number, number, number];
export declare function rgbToHex(r: number, g: number, b: number): string;
export declare function scaleHex(hex: string, factor: number): string;
export declare function rgbaFromHex(hex: string, alpha: number): string;
export declare function isVeryLight(hex: string): boolean;
export declare function mixHex(base: string, tint: string, amount: number): string;
export declare function parchFromBorder(border: string): {
    strip: string;
    ability: string;
};
export declare const GENRE_THEMES: Record<GenreName, GenreTheme>;
export declare const APP_GENRE_THEMES: Record<RootGenreName, GenreTheme>;
