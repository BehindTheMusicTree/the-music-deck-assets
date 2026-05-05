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
