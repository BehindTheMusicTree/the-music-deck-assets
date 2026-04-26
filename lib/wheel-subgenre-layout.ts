import { GENRE_THEMES, SUBGENRES, WHEEL_GENRES, WORLD_THEMES } from "@/lib/genres";
import type { GenreName, GenreSubgenre, Intensity, Subgenre } from "@/lib/genres";
import { WHEEL_SUBGENRE_RADIAL_STAGGER } from "@/lib/genre-wheel-geometry";

export type WheelSubgenrePlacement = {
  /** Absolute angle in degrees (same convention as `GenreWheel` polar math). */
  angleDeg: number;
  /** Added to the intensity ring radius (± for staggered lanes). */
  rOffset: number;
};

const SECTOR_DEG = 360 / WHEEL_GENRES.length;
/** Tiny inset from radial dividers so tiles do not sit on the lines. */
const SECTOR_EDGE_INSET_DEG = 1.25;
/**
 * When a (genre × intensity) bucket has this many or more tiles, split into two
 * radial lanes (±`WHEEL_SUBGENRE_RADIAL_STAGGER`). Keep high so all tiles on
 * the same intensity ring share one circle until the wedge is truly packed
 * (e.g. Classical experimental has six — still one ring at 7).
 */
const DUAL_LANE_MIN = 7;

function genreSectorStart(parentA: GenreName): number {
  const idx = WHEEL_GENRES.findIndex((g) => g.n === parentA);
  if (idx < 0) return NaN;
  return (idx / WHEEL_GENRES.length) * 360 - 90;
}

function isWheelGenreSubgenre(s: Subgenre): s is GenreSubgenre {
  if (s.kind !== "genre") return false;
  if (s.parentA in WORLD_THEMES) return false;
  if (!(s.parentA in GENRE_THEMES)) return false;
  if (s.parentB && !(s.parentB in GENRE_THEMES)) return false;
  if (s.parentB && s.parentB in WORLD_THEMES) return false;
  return true;
}

function blendAngle(s: GenreSubgenre): number {
  const aA = genreSectorStart(s.parentA as GenreName);
  const aB = genreSectorStart(s.parentB!);
  let delta = aB - aA;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return aA + delta * (s.t ?? 0.5);
}

/**
 * Places `count` tiles along [spanStart, spanEnd] using a local arc from 0 to W.
 * - n = 1 → middle: W/2
 * - n = 2 → at W/3 and 2W/3 (first and second third of the span)
 * - general: u_i = (i+1)/(n+1) * W so tiles stay off the sector edges.
 */
function anglesInGenreCadran(
  count: number,
  spanStart: number,
  spanEnd: number,
): number[] {
  if (count <= 0) return [];
  const w = spanEnd - spanStart;
  return Array.from(
    { length: count },
    (_, i) => spanStart + ((i + 1) / (count + 1)) * w,
  );
}

function bucketKey(parentA: GenreName, intensity: Intensity): string {
  return `${parentA}\t${intensity}`;
}

/**
 * Computes wheel position for each global genre subgenre inside the parent
 * genre wedge (same convention as `GenreWheel`), with optional radial stagger
 * when a bucket is very crowded.
 */
export function computeWheelSubgenrePlacements(
  subs: readonly Subgenre[],
): Map<string, WheelSubgenrePlacement> {
  const out = new Map<string, WheelSubgenrePlacement>();
  const wheelSubs = subs.filter(isWheelGenreSubgenre);

  for (const s of wheelSubs) {
    if (s.parentB) {
      out.set(s.n, { angleDeg: blendAngle(s), rOffset: 0 });
    }
  }

  const regular = wheelSubs.filter((s) => !s.parentB);
  const groups = new Map<string, GenreSubgenre[]>();
  for (const s of regular) {
    const k = bucketKey(s.parentA as GenreName, s.intensity);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k)!.push(s);
  }

  for (const [, items] of groups) {
    items.sort((a, b) => a.n.localeCompare(b.n));
    const parentA = items[0]!.parentA as GenreName;
    const sector0 = genreSectorStart(parentA);
    if (Number.isNaN(sector0)) continue;
    const inner = sector0 + SECTOR_EDGE_INSET_DEG;
    const outer = sector0 + SECTOR_DEG - SECTOR_EDGE_INSET_DEG;
    const n = items.length;

    if (n < DUAL_LANE_MIN) {
      if (n === 1) {
        /* Same azimuth as the parent genre tile — ray from centre through the ring label. */
        out.set(items[0]!.n, {
          angleDeg: genreSectorStart(parentA),
          rOffset: 0,
        });
      } else {
        const angles = anglesInGenreCadran(n, inner, outer);
        for (let i = 0; i < n; i++) {
          out.set(items[i]!.n, { angleDeg: angles[i]!, rOffset: 0 });
        }
      }
      continue;
    }

    const mid = inner + (outer - inner) / 2;
    const nInner = Math.ceil(n / 2);
    const innerItems = items.slice(0, nInner);
    const outerItems = items.slice(nInner);
    const anglesInner = anglesInGenreCadran(innerItems.length, inner, mid);
    const anglesOuter = anglesInGenreCadran(outerItems.length, mid, outer);
    for (let i = 0; i < innerItems.length; i++) {
      out.set(innerItems[i]!.n, {
        angleDeg: anglesInner[i]!,
        rOffset: -WHEEL_SUBGENRE_RADIAL_STAGGER,
      });
    }
    for (let i = 0; i < outerItems.length; i++) {
      out.set(outerItems[i]!.n, {
        angleDeg: anglesOuter[i]!,
        rOffset: WHEEL_SUBGENRE_RADIAL_STAGGER,
      });
    }
  }

  return out;
}
