import type { GenreTheme } from "@/components/Card";

// ---------------------------------------------------------------------------
// Canonical country definitions — single source of truth for World cards.
// Add a new entry here to register a country; everything else derives from it.
// ---------------------------------------------------------------------------

export interface CountryDef {
  theme: GenreTheme;
  flag: {
    /** CSS value for the border layer (gradient or url()). */
    border: string;
    /** CSS value for the pip / background fill. `border` is used as fallback. */
    bg?: string;
    /** Rotate the border image 90 ° (USA star-field needs this). */
    rotateR90?: true;
  };
  pip?: {
    sym: string;
    color: string;
    size?: number;
    /** Overrides the default pip background (solid theme.border). */
    bg?: string;
  };
}

const GLOBE_ICON =
  '<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.2"/><ellipse cx="8" cy="8" rx="3" ry="6" fill="none" stroke="currentColor" stroke-width=".8"/><line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width=".8"/></svg>';

export const USA_FLAG_PATH = "/cards/artworks/examples/flag-usa.webp";

export const COUNTRY_DATA: Record<string, CountryDef> = {
  USA: {
    theme: {
      border: "#B22234", headerBg: "#060c18",
      textMain: "#ffffff", textBody: "#cccccc",
      barPop: ["#B22234", "#e84455"], barExp: ["#3C3B6E", "#6060cc"],
      barGlowPop: "rgba(178,34,52,.85)", barGlowExp: "rgba(96,96,204,.75)",
      icon: GLOBE_ICON, sym: "★", bg0: "#1a2050", bg1: "#060a1e", accent: "#ffffff",
    },
    flag: {
      border: `url('${USA_FLAG_PATH}')`,
      rotateR90: true,
    },
    pip: { sym: "★", color: "#1a1a2e" },
  },

  France: {
    theme: {
      border: "#0055A4", headerBg: "#04091a",
      textMain: "#ffffff", textBody: "#cccccc",
      barPop: ["#0055A4", "#4488ee"], barExp: ["#EF4135", "#ff7066"],
      barGlowPop: "rgba(0,85,164,.85)", barGlowExp: "rgba(239,65,53,.75)",
      icon: GLOBE_ICON, sym: "⚜", bg0: "#0a1830", bg1: "#040810", accent: "#ffffff",
    },
    flag: {
      border: "linear-gradient(to bottom, #EF4135 0%, #EF4135 33.34%, #FFFFFF 33.34%, #FFFFFF 66.66%, #0055A4 66.66%, #0055A4 100%)",
      bg:     "linear-gradient(to bottom, #EF4135 0%, #EF4135 33.34%, #FFFFFF 33.34%, #FFFFFF 66.66%, #0055A4 66.66%, #0055A4 100%)",
    },
    pip: { sym: "⚜", color: "#1a2a0a", size: 19 },
  },

  Spain: {
    theme: {
      border: "#AA151B", headerBg: "#120606",
      textMain: "#ffffff", textBody: "#dddddd",
      barPop: ["#AA151B", "#e03030"], barExp: ["#2a6e2a", "#50b050"],
      barGlowPop: "rgba(170,21,27,.85)", barGlowExp: "rgba(80,176,80,.75)",
      icon: GLOBE_ICON, sym: "♦", bg0: "#2a0a0a", bg1: "#0e0404", accent: "#F1BF00",
    },
    flag: {
      border: "linear-gradient(to bottom, #AA151B 0%, #AA151B 25%, #F1BF00 25%, #F1BF00 75%, #AA151B 75%, #AA151B 100%)",
      bg:     "linear-gradient(to right,  #AA151B 0%, #AA151B 25%, #F1BF00 25%, #F1BF00 75%, #AA151B 75%, #AA151B 100%)",
    },
    pip: {
      sym: "♦", color: "#AA151B",
      bg: "linear-gradient(135deg, #AA151B 25%, #F1BF00 25%, #F1BF00 75%, #AA151B 75%)",
    },
  },

  // Gwenn-ha-Du: 11 alternating black/white horizontal stripes + canton hermine
  Bretagne: {
    theme: {
      border: "#222222", headerBg: "#0a0a0a",
      textMain: "#ffffff", textBody: "#cccccc",
      barPop: ["#333333", "#666666"], barExp: ["#999999", "#cccccc"],
      barGlowPop: "rgba(50,50,50,.85)", barGlowExp: "rgba(180,180,180,.75)",
      icon: GLOBE_ICON, sym: "✦", bg0: "#1a1a1a", bg1: "#080808", accent: "#ffffff",
    },
    flag: {
      border: "repeating-linear-gradient(to bottom, #000000 0%, #000000 9.09%, #ffffff 9.09%, #ffffff 18.18%)",
      bg:     "repeating-linear-gradient(to right,  #000000 0%, #000000 9.09%, #ffffff 9.09%, #ffffff 18.18%)",
    },
    pip: {
      sym: "✦", color: "#222222", size: 17,
      bg: "repeating-linear-gradient(to bottom, #000000 0%, #000000 50%, #ffffff 50%, #ffffff 100%)",
    },
  },
};

// ---------------------------------------------------------------------------
// Derived helpers — consumed by Card.tsx and genres.ts
// ---------------------------------------------------------------------------

export function themeForCountry(country: string): GenreTheme | undefined {
  return COUNTRY_DATA[country]?.theme;
}

export const FLAG_BORDERS: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_DATA).map(([k, v]) => [k, v.flag.border]),
);

export const FLAG_BG: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_DATA)
    .filter(([, v]) => v.flag.bg)
    .map(([k, v]) => [k, v.flag.bg!]),
);

export const FLAG_PIP_SYMBOL: Record<string, { sym: string; color: string; size?: number }> = Object.fromEntries(
  Object.entries(COUNTRY_DATA)
    .filter(([, v]) => v.pip)
    .map(([k, v]) => [k, { sym: v.pip!.sym, color: v.pip!.color, size: v.pip!.size }]),
);

export const FLAG_PIP_BG: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_DATA)
    .filter(([, v]) => v.pip?.bg)
    .map(([k, v]) => [k, v.pip!.bg!]),
);

export const FLAG_ROTATE_R90 = new Set(
  Object.entries(COUNTRY_DATA).filter(([, v]) => v.flag.rotateR90).map(([k]) => k),
);
