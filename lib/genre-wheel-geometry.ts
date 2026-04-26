import type { Intensity } from "@/lib/genres";

/** SVG square — must fit outer subgenre tiles + radial dividers around `WHEEL_CX` / `WHEEL_CY`. */
export const WHEEL_VIEW_SIZE = 2400;
export const WHEEL_CX = WHEEL_VIEW_SIZE / 2;
export const WHEEL_CY = WHEEL_VIEW_SIZE / 2;

/** Matches `GenreWheel` SVG layout (single source of truth for radii). */
export const R_POP_SUBGENRES = 200;
const RING_STEP = 80;
export const R_POP_SOFT_LINE = R_POP_SUBGENRES + RING_STEP;
export const R_SOFT_SUBGENRES = R_POP_SOFT_LINE + RING_STEP;
export const R_SOFT_EXPERIMENTAL_LINE = R_SOFT_SUBGENRES + RING_STEP;
export const R_EXPERIMENTAL_SUBGENRES = R_SOFT_EXPERIMENTAL_LINE + RING_STEP;
export const R_EXPERIMENTAL_HARDCORE_LINE =
  R_EXPERIMENTAL_SUBGENRES + RING_STEP;
export const R_HARDCORE_SUBGENRES = R_EXPERIMENTAL_HARDCORE_LINE + RING_STEP;

/** Radial lines extend this far past the last dashed intensity ring. */
export const WHEEL_RADIAL_DIVIDER_EXTRA = 200;

/** Main genre / hub tile width in `GenreWheel`. */
export const WHEEL_MAIN_TILE_W = 120;

/** Small subgenre tile size in `GenreWheel` (tighter pack reduces overlap). */
export const WHEEL_SMALL_TILE_W = Math.round(76 * 1.2);
export const WHEEL_SMALL_TILE_H = Math.round(54 * (1 - 1 / 3) * 0.6);
export const WHEEL_SMALL_TILE_HALF_W = WHEEL_SMALL_TILE_W / 2;

export function wheelSubgenreRadius(intensity: Intensity): number {
  if (intensity === "pop") return R_POP_SUBGENRES;
  if (intensity === "soft") return R_SOFT_SUBGENRES;
  if (intensity === "hardcore") return R_HARDCORE_SUBGENRES;
  return R_EXPERIMENTAL_SUBGENRES;
}

/** Inward / outward nudge when a sector has many tiles on the same intensity ring. */
export const WHEEL_SUBGENRE_RADIAL_STAGGER = 22;
