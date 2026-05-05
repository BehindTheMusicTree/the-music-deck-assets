import { GENRE_NAMES, type GenreName, type RootGenreName } from "./genre-names";
import { SUBGENRES } from "./genre-subgenres";
import { ISO_ALPHA2_BY_TERRITORY_NAME } from "./iso-alpha2-by-territory-name";

/** Default season slug for bundled catalogue (Era I commercially = S1 numbering). */
export const PRINTED_DEFAULT_SEASON = "S1" as const;

const SUBGENRE_BY_NAME = new Map(SUBGENRES.map((s) => [s.n, s]));

/**
 * Official TYPE segment for shipped root genres (charter-aligned). Persisted on
 * `Genre.printedTypeCode` for wheel roots; kept here as seed/API invariant reference.
 */
export const ROOT_GENRE_PRINTED_TYPE_CODE: Record<RootGenreName, string> = {
  Rock: "RK",
  Mainstream: "PP",
  Electronic: "EL",
  "Reggae/Dub": "WD",
  "Hip-Hop": "HH",
  "Disco/Funk": "DF",
  Classical: "CL",
  Vintage: "VT",
};

/**
 * Territory labels (genre taxonomy parents, WORLD themes, English names) → ISO 3166-1 alpha‑2.
 * Used when seeding `Genre.printedTypeCode` for country rows only (bulk mapping + aliases).
 */
const TERRITORY_ISO_OVERRIDES: Record<string, string> = {};
const TERRITORY_TO_ISO_ALPHA2: Record<string, string> = {
  ...ISO_ALPHA2_BY_TERRITORY_NAME,
  ...TERRITORY_ISO_OVERRIDES,
};

/** Populate DB country-anchor genres (`Genre.isCountry`) — ISO alpha‑2 TYPE segment. */
export function territoryToPrintedTypeCode(territoryName: string): string {
  const code = TERRITORY_TO_ISO_ALPHA2[territoryName];
  if (!code) {
    throw new Error(
      `Printed set id: unknown territory "${territoryName}" (fix taxonomy label or ISO map)`,
    );
  }
  return code;
}

function lookupPrintedCode(
  anchorGenreName: string,
  codeByAnchorName: ReadonlyMap<string, string>,
): string {
  const code = codeByAnchorName.get(anchorGenreName);
  if (!code) {
    throw new Error(
      `Printed set id: missing printedTypeCode in DB for taxonomy genre "${anchorGenreName}"`,
    );
  }
  return code;
}

function isGenreName(s: string): s is GenreName {
  return (GENRE_NAMES as readonly string[]).includes(s);
}

/** Taxonomy genre row whose `printedTypeCode` defines TYPE for this stripe (country parent or root). */
function printedTypeAnchorForSongStripe(genreStripeLabel: string): string {
  const genre = genreStripeLabel?.trim();
  if (!genre) throw new Error("Printed set id: missing genre stripe");

  const def = SUBGENRE_BY_NAME.get(genre);
  if (def?.kind === "country") return def.parentA;
  if (def?.kind === "genre") return def.parentA;
  if (isGenreName(genre)) return genre;

  throw new Error(`Printed set id: cannot resolve TYPE anchor for genre "${genre}"`);
}

/** TYPE segment from `Genre.printedTypeCode` on the anchor taxonomy row (see {@link printedTypeAnchorForSongStripe}). */
export function printedTypeCodeForSongCard(
  input: {
    genre: string;
    country?: string | null;
    title?: string;
    id?: number;
  },
  codeByAnchorName: ReadonlyMap<string, string>,
): string {
  const genre = input.genre?.trim();
  if (!genre) {
    throw new Error(
      `Printed set id: missing genre (${input.title ?? "?"}${input.id != null ? ` id ${input.id}` : ""})`,
    );
  }

  const def = SUBGENRE_BY_NAME.get(genre);
  if (def?.kind === "country") {
    const canonical = def.parentA;
    const c = input.country?.trim();
    if (c && c !== canonical) {
      throw new Error(
        `Printed set id: country stripe "${genre}" expects territory "${canonical}", got "${input.country}" (${input.title ?? "?"} ${input.id ?? ""})`,
      );
    }
  }

  const anchor = printedTypeAnchorForSongStripe(genre);
  return lookupPrintedCode(anchor, codeByAnchorName);
}

/** Transition pillar row matches wheel root — lookup `Genre.printedTypeCode` by name. */
export function printedTypeCodeForTransitionGenre(
  rootGenreLabel: string,
  codeByAnchorName: ReadonlyMap<string, string>,
): string {
  if (!rootGenreLabel?.trim())
    throw new Error("Printed set id: transition genre required");
  if (!isGenreName(rootGenreLabel)) {
    throw new Error(
      `Printed set id: unknown transition pillar genre "${rootGenreLabel}"`,
    );
  }
  return lookupPrintedCode(rootGenreLabel, codeByAnchorName);
}

/** Leading TYPE letters/digits before first hyphen (e.g. `FR` from `FR-S1-007`). */
export function printedSetIdTypeSegment(printedSetId: string): string {
  const trimmed = printedSetId.trim();
  const dash = trimmed.indexOf("-");
  if (dash < 2) {
    throw new Error(
      `printedSetId must start with a TYPE segment of exactly two letters followed by a hyphen`,
    );
  }
  const seg = trimmed.slice(0, dash).toUpperCase();
  if (!/^[A-Z]{2}$/.test(seg)) {
    throw new Error(
      `printedSetId TYPE segment must be two ASCII letters, got "${trimmed.slice(0, dash)}"`,
    );
  }
  return seg;
}

export function formatPrintedSetId(
  typeCode: string,
  seasonCode: string,
  sequenceWithinSeason: number,
  variantSuffix?: string | null,
): string {
  if (sequenceWithinSeason < 1 || sequenceWithinSeason > 180) {
    throw new Error(
      `Printed sequence must be 1–180 inclusive, got ${sequenceWithinSeason}`,
    );
  }
  const padded = String(sequenceWithinSeason).padStart(3, "0");
  return `${typeCode}-${seasonCode}-${padded}${variantSuffix ?? ""}`;
}
