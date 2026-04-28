/**
 * Card-facing theme tokens shared by `lib/genres`, `lib/countries`, and `components/Card`.
 * Keeps domain modules from importing UI components for types only.
 */

/** Shipped deck: how catalogue № is bucketed in {@link import("@/lib/cards/shipped-catalog-meta-by-id")}. */
export type CatalogSeriesType = "genre" | "country";

export interface CardTypePipSymbol {
  sym: string;
  color: string;
  size?: number;
  svg?: string;
}

export interface CardTypePip {
  symbol?: CardTypePipSymbol;
  flagBg?: string;
}

export interface GenreTheme {
  border: string;
  frameBorder?: string;
  frameBg?: string;
  /** `background-position` for url() flags on the card border (e.g. hoist left for PR). */
  frameBackgroundPosition?: string;
  frameRotateR90?: boolean;
  frameFilter?: string;
  frameOpacity?: number;
  headerBg: string;
  textMain: string;
  textBody: string;
  parchStrip: string;
  parchAbility: string;
  barPop: [string, string];
  barExp: [string, string];
  barGlowPop: string;
  barGlowExp: string;
  typePip?: CardTypePip;
  icon: string;
}
