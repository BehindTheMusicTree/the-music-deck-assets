import type { Intensity } from "@/lib/genres";

/** Matches `GenreWheel` SVG layout (single source of truth for radii). */
export const WHEEL_CX = 620;
export const WHEEL_CY = 620;
export const R_POP_SUBGENRES = 200;
export const R_POP_SOFT_LINE = R_POP_SUBGENRES + 100;
export const R_SOFT_SUBGENRES = R_POP_SOFT_LINE + 100;
export const R_SOFT_EXPERIMENTAL_LINE = R_SOFT_SUBGENRES + 100;
export const R_EXPERIMENTAL_SUBGENRES = R_SOFT_EXPERIMENTAL_LINE + 100;
export const R_EXPERIMENTAL_HARDCORE_LINE = R_EXPERIMENTAL_SUBGENRES + 100;
export const R_HARDCORE_SUBGENRES = R_EXPERIMENTAL_HARDCORE_LINE + 100;

/** Small subgenre tile width in `GenreWheel` (tighter pack reduces overlap). */
export const WHEEL_SMALL_TILE_W = 100;
export const WHEEL_SMALL_TILE_HALF_W = WHEEL_SMALL_TILE_W / 2;

export function wheelSubgenreRadius(intensity: Intensity): number {
  if (intensity === "pop") return R_POP_SUBGENRES;
  if (intensity === "soft") return R_SOFT_SUBGENRES;
  if (intensity === "hardcore") return R_HARDCORE_SUBGENRES;
  return R_EXPERIMENTAL_SUBGENRES;
}

/** Inward / outward nudge when a sector has many tiles on the same intensity ring. */
export const WHEEL_SUBGENRE_RADIAL_STAGGER = 18;
