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

export const USA_FLAG_PATH = "/cards/artworks/deck/flag-usa.webp";

export const COUNTRY_DATA: Record<string, CountryDef> = {
  USA: {
    theme: {
      border: "#B22234", headerBg: "#060c18",
      textMain: "#f1eee6", textBody: "#d2cfc6",
      parchStrip: "#e8d6cf", parchAbility: "#efe1d9",
      barPop: ["#B22234", "#e84455"], barExp: ["#3C3B6E", "#6060cc"],
      barGlowPop: "rgba(178,34,52,.85)", barGlowExp: "rgba(96,96,204,.75)",
      frameBorder: `url('${USA_FLAG_PATH}')`,
      frameBg: `url('${USA_FLAG_PATH}')`,
      frameRotateR90: true,
      frameFilter: "saturate(0.78) brightness(0.9) contrast(1.03)",
      frameOpacity: 0.7,
      icon: GLOBE_ICON,
    },
    flag: {
      border: `url('${USA_FLAG_PATH}')`,
      rotateR90: true,
    },
    pip: { sym: "★", color: "#1a1a2e" },
  },

  Mexico: {
    theme: {
      border: "#006847",
      headerBg: "#0a0c10",
      textMain: "#f2f4f2",
      textBody: "#cfd4d0",
      parchStrip: "#dce4dd",
      parchAbility: "#e8efe8",
      barPop: ["#006847", "#2a9868"],
      barExp: ["#CE1126", "#e83040"],
      barGlowPop: "rgba(0,104,71,.85)",
      barGlowExp: "rgba(206,17,38,.75)",
      frameBorder:
        "linear-gradient(to right, #006847 0%, #006847 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #CE1126 66.66%, #CE1126 100%)",
      frameBg:
        "linear-gradient(to right, #006847 0%, #006847 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #CE1126 66.66%, #CE1126 100%)",
      frameFilter: "saturate(0.8) brightness(0.95) contrast(1.03)",
      frameOpacity: 0.7,
      icon: GLOBE_ICON,
    },
    flag: {
      border:
        "linear-gradient(to right, #006847 0%, #006847 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #CE1126 66.66%, #CE1126 100%)",
      bg: "linear-gradient(to right, #006847 0%, #006847 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #CE1126 66.66%, #CE1126 100%)",
    },
    pip: { sym: "◆", color: "#006847", size: 15 },
  },

  Peru: {
    theme: {
      border: "#D91023",
      headerBg: "#0a0c10",
      textMain: "#f4f2f2",
      textBody: "#ded8d8",
      parchStrip: "#e8dede",
      parchAbility: "#efe8e8",
      barPop: ["#D91023", "#e84850"],
      barExp: ["#9a1420", "#c42030"],
      barGlowPop: "rgba(217,16,35,.85)",
      barGlowExp: "rgba(154,20,32,.75)",
      frameBorder:
        "linear-gradient(to right, #D91023 0%, #D91023 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #D91023 66.66%, #D91023 100%)",
      frameBg:
        "linear-gradient(to right, #D91023 0%, #D91023 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #D91023 66.66%, #D91023 100%)",
      frameFilter: "saturate(0.88) brightness(0.96) contrast(1.03)",
      frameOpacity: 0.7,
      icon: GLOBE_ICON,
    },
    flag: {
      border:
        "linear-gradient(to right, #D91023 0%, #D91023 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #D91023 66.66%, #D91023 100%)",
      bg: "linear-gradient(to right, #D91023 0%, #D91023 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #D91023 66.66%, #D91023 100%)",
    },
    pip: { sym: "◆", color: "#D91023", size: 15 },
  },

  France: {
    theme: {
      border: "#0055A4", headerBg: "#04091a",
      textMain: "#eceaf2", textBody: "#ceccd6",
      parchStrip: "#d7dde0", parchAbility: "#e3e8ea",
      barPop: ["#0055A4", "#4488ee"], barExp: ["#EF4135", "#ff7066"],
      barGlowPop: "rgba(0,85,164,.85)", barGlowExp: "rgba(239,65,53,.75)",
      frameBorder:
        "linear-gradient(to right, #0055A4 0%, #0055A4 33.34%, #FFFFFF 33.34%, #FFFFFF 66.66%, #EF4135 66.66%, #EF4135 100%)",
      frameBg:
        "linear-gradient(to right, #0055A4 0%, #0055A4 33.34%, #FFFFFF 33.34%, #FFFFFF 66.66%, #EF4135 66.66%, #EF4135 100%)",
      frameFilter: "saturate(0.78) brightness(0.9) contrast(1.03)",
      frameOpacity: 0.7,
      icon: GLOBE_ICON,
    },
    flag: {
      border:
        "linear-gradient(to right, #0055A4 0%, #0055A4 33.34%, #FFFFFF 33.34%, #FFFFFF 66.66%, #EF4135 66.66%, #EF4135 100%)",
      bg: "linear-gradient(to right, #0055A4 0%, #0055A4 33.34%, #FFFFFF 33.34%, #FFFFFF 66.66%, #EF4135 66.66%, #EF4135 100%)",
    },
    pip: { sym: "⚜", color: "#1a2a0a", size: 19 },
  },

  Spain: {
    theme: {
      border: "#AA151B", headerBg: "#120606",
      textMain: "#ffffff", textBody: "#dddddd",
      parchStrip: "#e5d1cb", parchAbility: "#edded7",
      barPop: ["#AA151B", "#e03030"], barExp: ["#2a6e2a", "#50b050"],
      barGlowPop: "rgba(170,21,27,.85)", barGlowExp: "rgba(80,176,80,.75)",
      frameBorder: "linear-gradient(to bottom, #AA151B 0%, #AA151B 25%, #F1BF00 25%, #F1BF00 75%, #AA151B 75%, #AA151B 100%)",
      frameBg: "linear-gradient(to right,  #AA151B 0%, #AA151B 25%, #F1BF00 25%, #F1BF00 75%, #AA151B 75%, #AA151B 100%)",
      frameFilter: "saturate(0.78) brightness(0.9) contrast(1.03)",
      frameOpacity: 0.7,
      icon: GLOBE_ICON,
    },
    flag: {
      border: "linear-gradient(to bottom, #AA151B 0%, #AA151B 25%, #F1BF00 25%, #F1BF00 75%, #AA151B 75%, #AA151B 100%)",
      bg:     "linear-gradient(to right,  #AA151B 0%, #AA151B 25%, #F1BF00 25%, #F1BF00 75%, #AA151B 75%, #AA151B 100%)",
    },
  },

  Italy: {
    theme: {
      border: "#009246",
      headerBg: "#0a1014",
      textMain: "#f0f2ee",
      textBody: "#cfd4d0",
      parchStrip: "#dce5de",
      parchAbility: "#e8efe9",
      barPop: ["#009246", "#2eb86e"],
      barExp: ["#CE2B37", "#e85858"],
      barGlowPop: "rgba(0,146,70,.85)",
      barGlowExp: "rgba(206,43,55,.75)",
      frameBorder:
        "linear-gradient(to right, #009246 0%, #009246 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #CE2B37 66.66%, #CE2B37 100%)",
      frameBg:
        "linear-gradient(to right, #009246 0%, #009246 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #CE2B37 66.66%, #CE2B37 100%)",
      frameFilter: "saturate(0.78) brightness(0.9) contrast(1.03)",
      frameOpacity: 0.7,
      icon: GLOBE_ICON,
    },
    flag: {
      border:
        "linear-gradient(to right, #009246 0%, #009246 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #CE2B37 66.66%, #CE2B37 100%)",
      bg: "linear-gradient(to right, #009246 0%, #009246 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #CE2B37 66.66%, #CE2B37 100%)",
    },
  },

  Japan: {
    theme: {
      border: "#BC002D",
      headerBg: "#0c0a0c",
      textMain: "#f5f3f0",
      textBody: "#d8d4d0",
      parchStrip: "#e8e4e0",
      parchAbility: "#f0ece8",
      barPop: ["#BC002D", "#e02840"],
      barExp: ["#1a1a28", "#404058"],
      barGlowPop: "rgba(188,0,45,.85)",
      barGlowExp: "rgba(40,40,72,.75)",
      frameBorder:
        "radial-gradient(circle at 50% 50%, #BC002D 0%, #BC002D 24%, #FFFFFF 24.5%, #FFFFFF 100%)",
      frameBg:
        "radial-gradient(circle at 50% 50%, #BC002D 0%, #BC002D 24%, #FFFFFF 24.5%, #FFFFFF 100%)",
      frameFilter: "saturate(0.8) brightness(0.97) contrast(1.03)",
      frameOpacity: 0.7,
      icon: GLOBE_ICON,
    },
    flag: {
      border:
        "radial-gradient(circle at 50% 50%, #BC002D 0%, #BC002D 24%, #FFFFFF 24.5%, #FFFFFF 100%)",
      bg: "radial-gradient(circle at 50% 50%, #BC002D 0%, #BC002D 24%, #FFFFFF 24.5%, #FFFFFF 100%)",
    },
  },

  England: {
    theme: {
      border: "#C8102E",
      headerBg: "#0c0a0a",
      textMain: "#f4f2ee",
      textBody: "#d6d2cc",
      parchStrip: "#e6e2dc",
      parchAbility: "#eeebe5",
      barPop: ["#C8102E", "#e83040"],
      barExp: ["#1a2a48", "#3a5088"],
      barGlowPop: "rgba(200,16,46,.85)",
      barGlowExp: "rgba(26,42,72,.75)",
      frameBorder:
        "linear-gradient(to bottom, transparent 40%, #C8102E 40%, #C8102E 60%, transparent 60%), linear-gradient(to right, transparent 40%, #C8102E 40%, #C8102E 60%, transparent 60%), #FFFFFF",
      frameBg:
        "linear-gradient(to bottom, transparent 40%, #C8102E 40%, #C8102E 60%, transparent 60%), linear-gradient(to right, transparent 40%, #C8102E 40%, #C8102E 60%, transparent 60%), #FFFFFF",
      frameFilter: "saturate(0.82) brightness(0.96) contrast(1.02)",
      frameOpacity: 0.72,
      icon: GLOBE_ICON,
    },
    flag: {
      border:
        "linear-gradient(to bottom, transparent 40%, #C8102E 40%, #C8102E 60%, transparent 60%), linear-gradient(to right, transparent 40%, #C8102E 40%, #C8102E 60%, transparent 60%), #FFFFFF",
      bg: "linear-gradient(to bottom, transparent 40%, #C8102E 40%, #C8102E 60%, transparent 60%), linear-gradient(to right, transparent 40%, #C8102E 40%, #C8102E 60%, transparent 60%), #FFFFFF",
    },
  },

  "Puerto Rico": {
    theme: {
      border: "#002B7C",
      headerBg: "#0a0c18",
      textMain: "#f4f4f8",
      textBody: "#d0d4e0",
      parchStrip: "#dce0ea",
      parchAbility: "#e8ecf4",
      barPop: ["#EF3340", "#ff5060"],
      barExp: ["#002B7C", "#4068c0"],
      barGlowPop: "rgba(239,51,64,.85)",
      barGlowExp: "rgba(0,43,124,.75)",
      frameBorder:
        "linear-gradient(to right, #002B7C 0%, #002B7C 28%, #EF3340 28%, #EF3340 40%, #FFFFFF 40%, #FFFFFF 52%, #EF3340 52%, #EF3340 64%, #FFFFFF 64%, #FFFFFF 76%, #EF3340 76%, #EF3340 100%)",
      frameBg:
        "linear-gradient(to right, #002B7C 0%, #002B7C 28%, #EF3340 28%, #EF3340 40%, #FFFFFF 40%, #FFFFFF 52%, #EF3340 52%, #EF3340 64%, #FFFFFF 64%, #FFFFFF 76%, #EF3340 76%, #EF3340 100%)",
      frameFilter: "saturate(0.88) brightness(0.96) contrast(1.03)",
      frameOpacity: 0.7,
      icon: GLOBE_ICON,
    },
    flag: {
      border:
        "linear-gradient(to right, #002B7C 0%, #002B7C 28%, #EF3340 28%, #EF3340 40%, #FFFFFF 40%, #FFFFFF 52%, #EF3340 52%, #EF3340 64%, #FFFFFF 64%, #FFFFFF 76%, #EF3340 76%, #EF3340 100%)",
      bg: "linear-gradient(to right, #002B7C 0%, #002B7C 28%, #EF3340 28%, #EF3340 40%, #FFFFFF 40%, #FFFFFF 52%, #EF3340 52%, #EF3340 64%, #FFFFFF 64%, #FFFFFF 76%, #EF3340 76%, #EF3340 100%)",
    },
  },

  Algeria: {
    theme: {
      border: "#006233",
      headerBg: "#0a100c",
      textMain: "#f2f4f2",
      textBody: "#cfd6d0",
      parchStrip: "#dce4dc",
      parchAbility: "#e8f0e8",
      barPop: ["#006233", "#2a9860"],
      barExp: ["#D21034", "#e83850"],
      barGlowPop: "rgba(0,98,51,.85)",
      barGlowExp: "rgba(210,16,52,.75)",
      frameBorder:
        "linear-gradient(to right, #006233 0%, #006233 50%, #FFFFFF 50%, #FFFFFF 100%)",
      frameBg:
        "linear-gradient(to right, #006233 0%, #006233 50%, #FFFFFF 50%, #FFFFFF 100%)",
      frameFilter: "saturate(0.82) brightness(0.95) contrast(1.03)",
      frameOpacity: 0.7,
      icon: GLOBE_ICON,
    },
    flag: {
      border:
        "linear-gradient(to right, #006233 0%, #006233 50%, #FFFFFF 50%, #FFFFFF 100%)",
      bg: "linear-gradient(to right, #006233 0%, #006233 50%, #FFFFFF 50%, #FFFFFF 100%)",
    },
  },

  // Gwenn-ha-Du: 11 alternating black/white horizontal stripes + canton hermine
  Bretagne: {
    theme: {
      border: "#222222", headerBg: "#0a0a0a",
      textMain: "#f8f7f3", textBody: "#dddcd7",
      parchStrip: "#dad2be", parchAbility: "#e4ddcb",
      barPop: ["#333333", "#666666"], barExp: ["#999999", "#cccccc"],
      barGlowPop: "rgba(50,50,50,.85)", barGlowExp: "rgba(180,180,180,.75)",
      frameBorder: "repeating-linear-gradient(to bottom, #000000 0%, #000000 9.09%, #ffffff 9.09%, #ffffff 18.18%)",
      frameBg: "repeating-linear-gradient(to right, #000000 0%, #000000 9.09%, #ffffff 9.09%, #ffffff 18.18%)",
      frameFilter: "saturate(0.78) brightness(0.9) contrast(1.03)",
      frameOpacity: 0.7,
      icon: GLOBE_ICON,
    },
    flag: {
      border: "repeating-linear-gradient(to bottom, #000000 0%, #000000 9.09%, #ffffff 9.09%, #ffffff 18.18%)",
      bg:     "repeating-linear-gradient(to right, #000000 0%, #000000 9.09%, #ffffff 9.09%, #ffffff 18.18%)",
    },
    pip: {
      sym: "✦", color: "#222222", size: 17,
      bg: "repeating-linear-gradient(to bottom, #000000 0%, #000000 50%, #ffffff 50%, #ffffff 100%)",
    },
  },

};

// ---------------------------------------------------------------------------
// Map placement (plate carrée: x = lon + 180°, y = 90° − lat in SVG space)
// ---------------------------------------------------------------------------

/** Representative WGS-84 point for each registered country / region. */
export const COUNTRY_MAP_POINT = {
  USA: { lon: -98.35, lat: 39.5 },
  Mexico: { lon: -99.13, lat: 19.43 },
  Peru: { lon: -77.04, lat: -12.05 },
  France: { lon: 2.35, lat: 46.8 },
  Spain: { lon: -3.7, lat: 40.2 },
  Italy: { lon: 12.5, lat: 42.5 },
  Japan: { lon: 138.25, lat: 36.2 },
  England: { lon: -1.5, lat: 52.5 },
  Algeria: { lon: 2.65, lat: 28.35 },
  "Puerto Rico": { lon: -66.45, lat: 18.22 },
  Bretagne: { lon: -3.2, lat: 48.15 },
} as const satisfies Record<keyof typeof COUNTRY_DATA, { lon: number; lat: number }>;

export function countryToMapSvg(lon: number, lat: number): { x: number; y: number } {
  return { x: lon + 180, y: 90 - lat };
}

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
    .filter(([, v]) => v.pip?.bg || v.flag.bg)
    .map(([k, v]) => [k, v.pip?.bg ?? v.flag.bg!]),
);

export const FLAG_ROTATE_R90 = new Set(
  Object.entries(COUNTRY_DATA).filter(([, v]) => v.flag.rotateR90).map(([k]) => k),
);
