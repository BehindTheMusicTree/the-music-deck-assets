import { COUNTRY_DATA } from "@/lib/countries";
import type { GenreName, NonMainstreamGenreName } from "./names";

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
  /** Explicit subgenre colour override (hex #RRGGBB). */
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
 * Subgenre colours are resolved from:
 * 1) explicit `color` override (when set), else
 * 2) fallback `parentA + intensity`.
 *
 * `influence` is for transition/link logic only and does not alter colour.
 * - **Genre-linked** (`kind: "genre"`): keep each hex in the same hue family as
 *   `GENRE_THEMES[parentA].border` (lighter/darker/more or less saturated, or a
 *   deliberate adjacent variation). Avoid unrelated colours unless explicitly
 *   agreed as an exception.
 * - **Country-linked** (`kind: "country"`): follow the country/region palette
 *   (`WORLD_THEMES` / `COUNTRY_DATA`), not global genre hues.
 */
export const SUBGENRES: Subgenre[] = [
  {
    kind: "country",
    n: "Country",
    parentA: "USA",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "American Folk",
    parentA: "USA",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Spiritual",
    parentA: "USA",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Gospel",
    parentA: "USA",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "French Variety",
    parentA: "France",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "French Folk",
    parentA: "France",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Folk Breton",
    parentA: "Bretagne",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Flamenco",
    parentA: "Spain",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Neapolitan Song",
    parentA: "Italy",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Italian Folk",
    parentA: "Italy",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Japanese Folk",
    parentA: "Japan",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "English Folk",
    parentA: "England",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Raï",
    parentA: "Algeria",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Reggaeton",
    parentA: "Puerto Rico",
    intensity: "pop",
  },
  {
    kind: "country",
    n: "Mexican Folk",
    parentA: "Mexico",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Yodel",
    parentA: "Switzerland",
    intensity: "soft",
  },
  {
    kind: "country",
    n: "Peruvian Cumbia",
    parentA: "Peru",
    intensity: "pop",
  },
  {
    kind: "country",
    n: "Russian Folk",
    parentA: "Russia",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Electropop",
    parentA: "Electronic",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Dance Pop",
    parentA: "Electronic",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "New Wave",
    parentA: "Electronic",
    intensity: "pop",
    influence: {
      genre: "Rock",
      intensity: "pop",
    },
  },
  {
    kind: "genre",
    n: "Disco Pop",
    parentA: "Disco/Funk",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Pop Rock",
    parentA: "Rock",
    intensity: "pop",
    influence: {
      genre: "Vintage",
      intensity: "pop",
    },
  },
  {
    kind: "genre",
    n: "Chamber Pop",
    parentA: "Rock",
    intensity: "pop",
    influence: {
      genre: "Classical",
      intensity: "soft",
    },
  },
  {
    kind: "genre",
    n: "Early Pop Rock",
    parentA: "Rock",
    intensity: "pop",
    influence: {
      genre: "Vintage",
      intensity: "pop",
    },
  },
  {
    kind: "genre",
    n: "Soul Rock",
    parentA: "Rock",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Soft Rock",
    parentA: "Rock",
    intensity: "soft",
    influence: {
      genre: "Vintage",
      intensity: "soft",
    },
  },
  {
    kind: "genre",
    n: "Blues Rock",
    parentA: "Rock",
    intensity: "soft",
    influence: {
      genre: "Vintage",
      intensity: "soft",
    },
  },
  {
    kind: "genre",
    n: "Krautrock",
    parentA: "Rock",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Post Grunge",
    parentA: "Rock",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "EDM",
    parentA: "Electronic",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Rap",
    parentA: "Hip-Hop",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Turntablism",
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
    parentA: "Hip-Hop",
    intensity: "soft",
    influence: {
      genre: "Vintage",
      intensity: "soft",
    },
  },
  {
    kind: "genre",
    n: "Roots",
    parentA: "Reggae/Dub",
    intensity: "soft",
    influence: {
      genre: "Vintage",
      intensity: "soft",
    },
  },
  {
    kind: "genre",
    n: "Disco",
    parentA: "Disco/Funk",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Funk",
    parentA: "Disco/Funk",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Early Funk",
    parentA: "Disco/Funk",
    intensity: "experimental",
    influence: {
      genre: "Vintage",
      intensity: "soft",
    },
  },
  {
    kind: "genre",
    n: "Funk Soul",
    parentA: "Disco/Funk",
    intensity: "soft",
    influence: {
      genre: "Vintage",
      intensity: "soft",
    },
  },
  {
    kind: "genre",
    n: "Ska Punk",
    parentA: "Rock",
    intensity: "experimental",
    influence: {
      genre: "Reggae/Dub",
      intensity: "experimental",
    },
  },
  {
    kind: "genre",
    n: "Punk Rock",
    parentA: "Rock",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Grunge",
    parentA: "Rock",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Alternative Rock",
    parentA: "Rock",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Prog Rock",
    parentA: "Rock",
    intensity: "experimental",
    influence: {
      genre: "Classical",
      intensity: "experimental",
    },
  },
  {
    kind: "genre",
    n: "Dub",
    parentA: "Reggae/Dub",
    intensity: "experimental",
    influence: {
      genre: "Electronic",
      intensity: "experimental",
    },
  },
  {
    kind: "genre",
    n: "Drum & Bass",
    parentA: "Electronic",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Peak Time Techno",
    parentA: "Electronic",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Hard Techno",
    parentA: "Electronic",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Jungle",
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
    parentA: "Electronic",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Nu Italo",
    parentA: "Electronic",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "House",
    parentA: "Electronic",
    intensity: "soft",
    influence: {
      genre: "Disco/Funk",
      intensity: "soft",
    },
  },
  {
    kind: "genre",
    n: "French House",
    parentA: "Electronic",
    intensity: "soft",
    influence: {
      genre: "Disco/Funk",
      intensity: "soft",
    },
  },
  {
    kind: "genre",
    n: "Progressive House",
    parentA: "Electronic",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Cantique",
    parentA: "Vintage",
    intensity: "experimental",
    influence: {
      genre: "Classical",
      intensity: "soft",
    },
  },
  {
    kind: "genre",
    n: "Anthem",
    parentA: "Classical",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Jazz",
    parentA: "Vintage",
    intensity: "experimental",
    influence: {
      genre: "Classical",
      intensity: "experimental",
    },
  },
  {
    kind: "genre",
    n: "Soul Jazz",
    parentA: "Vintage",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Soul",
    parentA: "Vintage",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Hard Rock",
    parentA: "Rock",
    intensity: "hardcore",
    influence: {
      genre: "Vintage",
      intensity: "experimental",
    },
  },
  {
    kind: "genre",
    n: "Punk",
    parentA: "Rock",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Metal",
    parentA: "Rock",
    intensity: "hardcore",
    influence: {
      genre: "Classical",
      intensity: "hardcore",
    },
  },
  {
    kind: "genre",
    n: "Nu Metal",
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
    parentA: "Vintage",
    intensity: "hardcore",
    influence: {
      genre: "Classical",
      intensity: "hardcore",
    },
  },
  {
    kind: "genre",
    n: "Psytrance",
    parentA: "Electronic",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Minimal",
    parentA: "Electronic",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Cloud Rap",
    parentA: "Hip-Hop",
    intensity: "experimental",
    influence: {
      genre: "Electronic",
      intensity: "experimental",
    },
  },
  {
    kind: "genre",
    n: "Alternative Hip-Hop",
    parentA: "Hip-Hop",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Progressive Hip-Hop",
    parentA: "Hip-Hop",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Trap",
    parentA: "Hip-Hop",
    intensity: "experimental",
    influence: {
      genre: "Electronic",
      intensity: "hardcore",
    },
  },
  {
    kind: "genre",
    n: "Gangsta Rap",
    parentA: "Hip-Hop",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Christian Hymn",
    parentA: "Vintage",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Baroque Classical",
    parentA: "Classical",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Romantic Classical",
    parentA: "Classical",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Impressionist Classical",
    parentA: "Classical",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Virtuoso Piano",
    parentA: "Classical",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Opera",
    parentA: "Classical",
    intensity: "hardcore",
  },
  {
    kind: "genre",
    n: "Ballet",
    parentA: "Classical",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Waltz",
    parentA: "Classical",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "March",
    parentA: "Classical",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Serenade",
    parentA: "Classical",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Ragtime",
    parentA: "Vintage",
    intensity: "soft",
    influence: {
      genre: "Classical",
      intensity: "soft",
    },
  },
  {
    kind: "genre",
    n: "Folk Ballad",
    parentA: "Vintage",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Sacred Choral",
    parentA: "Classical",
    intensity: "soft",
  },
  {
    kind: "genre",
    n: "Symphonic Showpiece",
    parentA: "Classical",
    intensity: "experimental",
  },
  {
    kind: "genre",
    n: "Doo-wop",
    parentA: "Vintage",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Traditional Pop",
    parentA: "Vintage",
    intensity: "pop",
  },
  {
    kind: "genre",
    n: "Choral",
    parentA: "Vintage",
    intensity: "pop",
    influence: {
      genre: "Classical",
      intensity: "soft",
    },
  },
];
