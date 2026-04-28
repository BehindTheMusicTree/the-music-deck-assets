/**
 * CSS `linear-gradient` / `radial-gradient` strings for country frame & pip flags.
 * Centralises stop math so tricolores stay consistent when edited.
 */

/** Three equal vertical stripes (hoist left). */
export function cssVerticalTricolorEqual(
  left: string,
  mid: string,
  right: string,
): string {
  return `linear-gradient(to right, ${left} 0%, ${left} 33.33%, ${mid} 33.33%, ${mid} 66.66%, ${right} 66.66%, ${right} 100%)`;
}

/** France: slightly asymmetric white band (common CSS workaround). */
export function cssVerticalTricolorFrance(
  left: string,
  mid: string,
  right: string,
): string {
  return `linear-gradient(to right, ${left} 0%, ${left} 33.34%, ${mid} 33.34%, ${mid} 66.66%, ${right} 66.66%, ${right} 100%)`;
}

/** Three equal horizontal stripes (top to bottom). */
export function cssHorizontalTricolorEqual(
  top: string,
  mid: string,
  bot: string,
): string {
  return `linear-gradient(to bottom, ${top} 0%, ${top} 33.33%, ${mid} 33.33%, ${mid} 66.66%, ${bot} 66.66%, ${bot} 100%)`;
}

/** Spain: wide yellow band between two red bands. */
export function cssSpainHorizontal(): string {
  return "linear-gradient(to bottom, #AA151B 0%, #AA151B 25%, #F1BF00 25%, #F1BF00 75%, #AA151B 75%, #AA151B 100%)";
}

/** Two equal vertical stripes. */
export function cssVerticalTwoBandEqual(left: string, right: string): string {
  return `linear-gradient(to right, ${left} 0%, ${left} 50%, ${right} 50%, ${right} 100%)`;
}

export function cssJapanHinomaru(): string {
  return "radial-gradient(circle at 50% 50%, #BC002D 0%, #BC002D 24%, #FFFFFF 24.5%, #FFFFFF 100%)";
}

/** Gwenn-ha-Du–style horizontal stripes. */
export function cssBretagneRepeating(): string {
  return "repeating-linear-gradient(to bottom, #000000 0%, #000000 9.09%, #ffffff 9.09%, #ffffff 18.18%)";
}
