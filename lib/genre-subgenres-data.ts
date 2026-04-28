import { COUNTRY_DATA } from "@/lib/countries";
import type { GenreName, NonMainstreamGenreName } from "./genre-names";

export type Intensity = "pop" | "soft" | "experimental" | "hardcore";

export function intensityLevelIndex(level: Intensity): number {
  if (level === "pop") return 1;
  if (level === "soft") return 2;
  if (level === "experimental") return 3;
  return 4;
}

type CountryName = keyof typeof COUNTRY_DATA;


interface BaseSubgenre {
  n: string;
  /** Deprecated: no longer used to resolve theme colour. */
  color?: string;
  parentA: GenreName | CountryName;
  parentB?: NonMainstreamGenreName;
  t?: number;
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
  parentA: CountryName;
  parentB?: never;
}

export type Subgenre = GenreSubgenre | CountrySubgenre;

/**
 * Subgenre colours are resolved from `parentA + intensity` (with optional
 * `influence` blend). The legacy `color` field is ignored for theme resolution.
 * - **Genre-linked** (`kind: "genre"`): keep each hex in the same hue family as
 *   `GENRE_THEMES[parentA].border` (lighter/darker/more or less saturated, or a
 *   mix toward `parentB` when set). Avoid unrelated colours unless explicitly
 *   agreed as an exception.
 * - **Country-linked** (`kind: "country"`): follow the country/region palette
 *   (`WORLD_THEMES` / `COUNTRY_DATA`), not global genre hues.
 */
export const SUBGENRES: Subgenre[] = [
  {
    kind: "country",
    n: "Country",
    color: "#b22234",
    parentA: "USA",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "American Folk",
    color: "#7a6040",
    parentA: "USA",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Spiritual",
    color: "#505848",
    parentA: "USA",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Gospel",
    color: "#6e6e6a",
    parentA: "USA",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "French Variety",
    color: "#0055a4",
    parentA: "France",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "French Folk",
    color: "#5a6870",
    parentA: "France",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Folk Breton",
    color: "#222222",
    parentA: "Bretagne",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Flamenco",
    color: "#AA151B",
    parentA: "Spain",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Neapolitan Song",
    color: "#d05838",
    parentA: "Italy",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Italian Folk",
    color: "#4a6042",
    parentA: "Italy",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Japanese Folk",
    color: "#8b4855",
    parentA: "Japan",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "English Folk",
    color: "#6b5038",
    parentA: "England",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Raï",
    color: "#9a2848",
    parentA: "Algeria",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Reggaeton",
    color: "#d05038",
    parentA: "Puerto Rico",
    intensity: "pop",
  },
  {
    kind: "country",
    n: "Mexican Folk",
    color: "#1e6b4a",
    parentA: "Mexico",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Yodel",
    color: "#a62c32",
    parentA: "Switzerland",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Peruvian Cumbia",
    color: "#c4363a",
    parentA: "Peru",
    intensity: "pop",
  },
  {
    kind: "country",
    n: "Russian Folk",
    color: "#6a3038",
    parentA: "Russia",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Electropop",
    color: "#e4ebff",
    parentA: "Electronic",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Dance Pop",
    color: "#e8d4f0",
    parentA: "Electronic",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "New Wave",
    color: "#d8e4fc",
    parentA: "Electronic",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Disco Pop",
    color: "#ffd6e8",
    parentA: "Disco/Funk",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Pop Rock",
    color: "#f7b4ba",
    parentA: "Rock",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Chamber Pop",
    color: "#e8bcc4",
    parentA: "Rock",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Early Pop Rock",
    color: "#e6c8c8",
    parentA: "Rock",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Soul Rock",
    color: "#d4a090",
    parentA: "Rock",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Soft Rock",
    color: "#d0a4aa",
    parentA: "Rock",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Blues Rock",
    color: "#c4a0a0",
    parentA: "Rock",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Krautrock",
    color: "#b8929a",
    parentA: "Rock",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Post Grunge",
    color: "#7a2c34",
    parentA: "Rock",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "EDM",
    color: "#7090e8",
    parentA: "Electronic",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Rap",
    color: "#c8960a",
    parentA: "Hip-Hop",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Turntablism",
    color: "#3d6ca0",
    parentA: "Electronic",
    intensity: "experimental",
    influence: {
      genre: "Hip-Hop",
      intensity: "experimental",
    },
  },
  {
    kind: "genre",
    n: "Hip-House",
    color: "#6d74b8",
    parentA: "Hip-Hop",
    intensity: "soft",
    influence: {
      genre: "Electronic",
      intensity: "experimental",
    },
  },
  {
    kind: "genre",
    n: "R&B",
    color: "#edd4a8",
    parentA: "Hip-Hop",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Roots",
    color: "#5ab848",
    parentA: "Reggae/Dub",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Disco",
    color: "#f0a0c0",
    parentA: "Disco/Funk",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Funk",
    color: "#c06098",
    parentA: "Disco/Funk",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Ska Punk",
    color: "#9a4024",
    parentA: "Rock",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Punk Rock",
    color: "#782838",
    parentA: "Rock",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Grunge",
    color: "#501a22",
    parentA: "Rock",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Alternative Rock",
    color: "#64242c",
    parentA: "Rock",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Prog Rock",
    color: "#843038",
    parentA: "Rock",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Dub",
    color: "#28b870",
    parentA: "Reggae/Dub",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Drum & Bass",
    color: "#0c1f3c",
    parentA: "Electronic",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Peak Time Techno",
    color: "#141c34",
    parentA: "Electronic",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Hard Techno",
    color: "#182242",
    parentA: "Electronic",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Jungle",
    color: "#288090",
    parentA: "Electronic",
    parentB: "Reggae/Dub",
    t: 0.42,
    intensity: "experimental",
    influence: {
      genre: "Reggae/Dub",
      intensity: "experimental",
    },
  },
  {
    kind: "genre",
    n: "Techno",
    color: "#2a4588",
    parentA: "Electronic",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "House",
    color: "#4030a0",
    parentA: "Electronic",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "French House",
    color: "#5b6ec8",
    parentA: "Electronic",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Progressive House",
    color: "#3848b0",
    parentA: "Electronic",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Cantique",
    color: "#888888",
    parentA: "Vintage",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Anthem",
    color: "#4e321f",
    parentA: "Classical",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Jazz",
    color: "#6a5c68",
    parentA: "Vintage",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Soul Jazz",
    color: "#8a7a70",
    parentA: "Vintage",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Soul",
    color: "#9a8f60",
    parentA: "Vintage",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Hard Rock",
    color: "#843028",
    parentA: "Rock",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Punk",
    color: "#8c1424",
    parentA: "Rock",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Metal",
    color: "#4a060c",
    parentA: "Rock",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Nu Metal",
    color: "#8e2810",
    parentA: "Rock",
    intensity: "hardcore",
    influence: {
      genre: "Hip-Hop",
      intensity: "experimental",
    },
  },
  {
    kind: "genre",
    n: "Free Jazz",
    color: "#1e1a24",
    parentA: "Vintage",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Psytrance",
    color: "#0b1f5a",
    parentA: "Electronic",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Minimal",
    color: "#3d5a78",
    parentA: "Electronic",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Cloud Rap",
    color: "#c09028",
    parentA: "Hip-Hop",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Alternative Hip-Hop",
    color: "#b88830",
    parentA: "Hip-Hop",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Progressive Hip-Hop",
    color: "#a97b2c",
    parentA: "Hip-Hop",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Trap",
    color: "#6e5608",
    parentA: "Hip-Hop",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Gangsta Rap",
    color: "#5e4608",
    parentA: "Hip-Hop",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Christian Hymn",
    color: "#a0a090",
    parentA: "Vintage",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Baroque Classical",
    color: "#5c4334",
    parentA: "Classical",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Romantic Classical",
    color: "#624038",
    parentA: "Classical",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Impressionist Classical",
    color: "#c8b898",
    parentA: "Classical",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Virtuoso Piano",
    color: "#241410",
    parentA: "Classical",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Opera",
    color: "#4a2c24",
    parentA: "Classical",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Ballet",
    color: "#755048",
    parentA: "Classical",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Waltz",
    color: "#c4b098",
    parentA: "Classical",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "March",
    color: "#d9ccb0",
    parentA: "Classical",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Serenade",
    color: "#baa490",
    parentA: "Classical",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Ragtime",
    color: "#4a3828",
    parentA: "Vintage",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Folk Ballad",
    color: "#6a6050",
    parentA: "Vintage",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Sacred Choral",
    color: "#ae9a7e",
    parentA: "Classical",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Symphonic Showpiece",
    color: "#3a3028",
    parentA: "Classical",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Doo-wop",
    color: "#c8b4a0",
    parentA: "Vintage",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Traditional Pop",
    color: "#e0dedc",
    parentA: "Vintage",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Choral",
    color: "#d2cdc2",
    parentA: "Vintage",
    intensity: "pop",
  },
];
