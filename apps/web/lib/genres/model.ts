import {
  GENRE_NAMES,
  type AppGenreName,
  type GenreName,
  type NonMainstreamGenreName,
} from "./names";
import {
  SUBGENRES,
  type GenreSubgenre,
  type Intensity,
  type Subgenre,
} from "./subgenres-data";

export type { AppGenreName, GenreName, NonMainstreamGenreName } from "./names";
export { APP_GENRE_NAMES, GENRE_NAMES } from "./names";

export type {
  CountrySubgenre,
  GenreSubgenre,
  Intensity,
  Subgenre,
} from "./subgenres-data";
export { intensityLevelIndex, SUBGENRES } from "./subgenres-data";

const NON_MAINSTREAM_WHEEL_ORDER: NonMainstreamGenreName[] = [
  "Reggae/Dub",
  "Electronic",
  "Disco/Funk",
  "Hip-Hop",
  "Rock",
  "Classical",
  "Vintage",
];

export const GENRE_NEXT: Record<
  NonMainstreamGenreName,
  NonMainstreamGenreName
> = (() => {
  const out = {} as Record<NonMainstreamGenreName, NonMainstreamGenreName>;
  for (let i = 0; i < NON_MAINSTREAM_WHEEL_ORDER.length; i += 1) {
    const current = NON_MAINSTREAM_WHEEL_ORDER[i];
    const next =
      NON_MAINSTREAM_WHEEL_ORDER[(i + 1) % NON_MAINSTREAM_WHEEL_ORDER.length];
    out[current] = next;
  }
  return out;
})();

export const GENRE_PREVIOUS: Record<
  NonMainstreamGenreName,
  NonMainstreamGenreName
> = (() => {
  const out = {} as Record<NonMainstreamGenreName, NonMainstreamGenreName>;
  for (const current of Object.keys(GENRE_NEXT) as NonMainstreamGenreName[]) {
    const next = GENRE_NEXT[current];
    out[next] = current;
  }
  return out;
})();

export type GenreIntensityNode = {
  genre: GenreName;
  intensity: Intensity;
};

export type GenreIntensityDirection = "out" | "in";
export type TransitionNodeDirection = "out" | "in";
export type TransitionGenreIntensityNode = {
  kind: "genreIntensity";
  genre: GenreName;
  intensity: Intensity;
};
export type TransitionSubgenreNode = {
  kind: "subgenre";
  subgenre: string;
  genre: NonMainstreamGenreName;
  intensity: Intensity;
};
export type TransitionNode =
  | TransitionGenreIntensityNode
  | TransitionSubgenreNode;

const INTENSITY_ORDER: Intensity[] = [
  "pop",
  "soft",
  "experimental",
  "hardcore",
];

function nextIntensity(i: Intensity): Intensity | undefined {
  const idx = INTENSITY_ORDER.indexOf(i);
  if (idx < 0 || idx === INTENSITY_ORDER.length - 1) return undefined;
  return INTENSITY_ORDER[idx + 1];
}

function previousIntensity(i: Intensity): Intensity | undefined {
  const idx = INTENSITY_ORDER.indexOf(i);
  if (idx <= 0) return undefined;
  return INTENSITY_ORDER[idx - 1];
}

function genreIntensityKey(n: GenreIntensityNode): string {
  return `${n.genre}|${n.intensity}`;
}

function transitionNodeKey(n: TransitionNode): string {
  if (n.kind === "genreIntensity") return `g|${n.genre}|${n.intensity}`;
  return `s|${n.subgenre}`;
}

function uniqueGenreIntensity(
  nodes: GenreIntensityNode[],
): GenreIntensityNode[] {
  const seen = new Set<string>();
  const out: GenreIntensityNode[] = [];
  for (const n of nodes) {
    const k = genreIntensityKey(n);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(n);
  }
  return out;
}

function uniqueTransitionNodes(nodes: TransitionNode[]): TransitionNode[] {
  const seen = new Set<string>();
  const out: TransitionNode[] = [];
  for (const n of nodes) {
    const k = transitionNodeKey(n);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(n);
  }
  return out;
}

export function allGenreIntensityNodes(): GenreIntensityNode[] {
  const out: GenreIntensityNode[] = [];
  for (const genre of GENRE_NAMES) {
    const levels: Intensity[] =
      genre === "Mainstream" ? ["pop"] : [...INTENSITY_ORDER];
    for (const intensity of levels) {
      out.push({ genre, intensity });
    }
  }
  return out;
}

const GENRE_SUBGENRES = SUBGENRES.filter(
  (sub): sub is GenreSubgenre => sub.kind === "genre",
);
const GENRE_SUBGENRE_BY_NAME = Object.fromEntries(
  GENRE_SUBGENRES.map((sub) => [sub.n, sub]),
) as Record<string, GenreSubgenre>;
const SUBGENRE_BY_NAME: Record<string, Subgenre> = Object.fromEntries(
  SUBGENRES.map((s) => [s.n, s]),
);
const SUBGENRE_PARENT_A: Record<string, string> = Object.fromEntries(
  SUBGENRES.map((s) => [s.n, s.parentA]),
);

const INFLUENCE_MATCHING_SUBGENRES_BY_NODE: Record<string, string[]> = (() => {
  const map = new Map<string, string[]>();
  for (const sub of GENRE_SUBGENRES) {
    if (!sub.influence) continue;
    const key = genreIntensityKey({
      genre: sub.influence.genre,
      intensity: sub.influence.intensity,
    });
    const current = map.get(key) ?? [];
    current.push(sub.n);
    map.set(key, current);
  }
  return Object.fromEntries(map.entries());
})();

function toTransitionGenreIntensityNode(
  node: GenreIntensityNode,
): TransitionGenreIntensityNode {
  return {
    kind: "genreIntensity",
    genre: node.genre,
    intensity: node.intensity,
  };
}

export function getSubgenreDefinition(subgenre: string): Subgenre | undefined {
  return SUBGENRE_BY_NAME[subgenre];
}

function toTransitionSubgenreNode(subgenre: string): TransitionSubgenreNode {
  const sub = GENRE_SUBGENRE_BY_NAME[subgenre];
  if (!sub) {
    throw new Error(`Unknown genre subgenre "${subgenre}"`);
  }
  return {
    kind: "subgenre",
    subgenre,
    genre: sub.parentA,
    intensity: sub.intensity,
  };
}

function baseGenreIntensityOut(node: GenreIntensityNode): GenreIntensityNode[] {
  if (node.genre === "Mainstream") {
    return uniqueGenreIntensity([
      { genre: "Mainstream", intensity: "pop" },
      ...NON_MAINSTREAM_WHEEL_ORDER.map((genre) => ({
        genre,
        intensity: "pop" as Intensity,
      })),
    ]);
  }
  const out: GenreIntensityNode[] = [
    { genre: node.genre, intensity: node.intensity },
  ];
  const up = nextIntensity(node.intensity);
  const down = previousIntensity(node.intensity);
  if (up) out.push({ genre: node.genre, intensity: up });
  if (down) out.push({ genre: node.genre, intensity: down });
  const nextGenre = GENRE_NEXT[node.genre];
  const previousGenre = GENRE_PREVIOUS[node.genre];
  out.push({ genre: nextGenre, intensity: node.intensity });
  out.push({ genre: previousGenre, intensity: node.intensity });
  if (down) {
    out.push({ genre: nextGenre, intensity: down });
    out.push({ genre: previousGenre, intensity: down });
  }
  if (node.intensity === "pop") {
    out.push({ genre: "Mainstream", intensity: "pop" });
  }
  return uniqueGenreIntensity(out);
}

function transitionOutFromGenreIntensity(
  node: GenreIntensityNode,
): TransitionNode[] {
  const out: TransitionNode[] = baseGenreIntensityOut(node).map(
    toTransitionGenreIntensityNode,
  );
  const influencedSubgenres =
    INFLUENCE_MATCHING_SUBGENRES_BY_NODE[genreIntensityKey(node)] ?? [];
  out.push(...influencedSubgenres.map(toTransitionSubgenreNode));
  return uniqueTransitionNodes(out);
}

function transitionOutFromSubgenre(subgenre: string): TransitionNode[] {
  const sub = GENRE_SUBGENRE_BY_NAME[subgenre];
  if (!sub) {
    throw new Error(`Unknown genre subgenre "${subgenre}"`);
  }
  const parentNode: GenreIntensityNode = {
    genre: sub.parentA,
    intensity: sub.intensity,
  };
  const out: TransitionNode[] = [
    ...transitionOutFromGenreIntensity(parentNode),
  ];
  if (sub.influence) {
    out.push(
      toTransitionGenreIntensityNode({
        genre: sub.influence.genre,
        intensity: sub.influence.intensity,
      }),
    );
  }
  return uniqueTransitionNodes(out);
}

function allTransitionNodes(): TransitionNode[] {
  return [
    ...allGenreIntensityNodes().map(toTransitionGenreIntensityNode),
    ...GENRE_SUBGENRES.map((sub) => toTransitionSubgenreNode(sub.n)),
  ];
}

export function transitionOut(node: TransitionNode): TransitionNode[] {
  if (node.kind === "genreIntensity") {
    return transitionOutFromGenreIntensity({
      genre: node.genre,
      intensity: node.intensity,
    });
  }
  return transitionOutFromSubgenre(node.subgenre);
}

export function transitionIn(node: TransitionNode): TransitionNode[] {
  return allTransitionNodes().filter((candidate) =>
    transitionOut(candidate).some(
      (outNode) => transitionNodeKey(outNode) === transitionNodeKey(node),
    ),
  );
}

export function transitionLinks(
  node: TransitionNode,
  direction: TransitionNodeDirection = "out",
): TransitionNode[] {
  return direction === "out" ? transitionOut(node) : transitionIn(node);
}

export function subgenreTransitionOut(subgenre: string): TransitionNode[] {
  return transitionOut(toTransitionSubgenreNode(subgenre));
}

export function subgenreTransitionIn(subgenre: string): TransitionNode[] {
  return transitionIn(toTransitionSubgenreNode(subgenre));
}

export function genreIntensityOut(
  node: GenreIntensityNode,
): GenreIntensityNode[] {
  return transitionOut({
    kind: "genreIntensity",
    genre: node.genre,
    intensity: node.intensity,
  })
    .filter(
      (n): n is TransitionGenreIntensityNode => n.kind === "genreIntensity",
    )
    .map((n) => ({ genre: n.genre, intensity: n.intensity }));
}

export function genreIntensityIn(
  node: GenreIntensityNode,
): GenreIntensityNode[] {
  return transitionIn({
    kind: "genreIntensity",
    genre: node.genre,
    intensity: node.intensity,
  })
    .filter(
      (n): n is TransitionGenreIntensityNode => n.kind === "genreIntensity",
    )
    .map((n) => ({ genre: n.genre, intensity: n.intensity }));
}

export function genreIntensityLinks(
  node: GenreIntensityNode,
  direction: GenreIntensityDirection = "out",
): GenreIntensityNode[] {
  return direction === "out" ? genreIntensityOut(node) : genreIntensityIn(node);
}

function assertGenreIntensityNodeKnownForStripDisplay(
  n: GenreIntensityNode,
): void {
  if (GENRE_NAMES.indexOf(n.genre) === -1) {
    throw new Error(
      `sortGenreIntensityNodesForStripDisplay: unknown genre ${JSON.stringify(n.genre)}`,
    );
  }
  if (INTENSITY_ORDER.indexOf(n.intensity) === -1) {
    throw new Error(
      `sortGenreIntensityNodesForStripDisplay: unknown intensity ${JSON.stringify(n.intensity)}`,
    );
  }
}

function compareGenreIntensityNodesForStripDisplay(
  a: GenreIntensityNode,
  b: GenreIntensityNode,
): number {
  const ga = GENRE_NAMES.indexOf(a.genre);
  const gb = GENRE_NAMES.indexOf(b.genre);
  const byGenre = ga - gb;
  if (byGenre !== 0) return byGenre;
  const ia = INTENSITY_ORDER.indexOf(a.intensity);
  const ib = INTENSITY_ORDER.indexOf(b.intensity);
  return ib - ia;
}

export function sortGenreIntensityNodesForStripDisplay(
  nodes: GenreIntensityNode[],
): GenreIntensityNode[] {
  for (const n of nodes) {
    assertGenreIntensityNodeKnownForStripDisplay(n);
  }
  return [...nodes].sort(compareGenreIntensityNodesForStripDisplay);
}

export const GENRE_BATTLE_MATCHUP: Record<
  GenreName,
  {
    readonly advantageVs: readonly string[];
    readonly weakVs: readonly string[];
  }
> = (() => {
  const wheelGenres = [...NON_MAINSTREAM_WHEEL_ORDER];
  const byGenre = new Map<NonMainstreamGenreName, number>(
    wheelGenres.map((g, i) => [g, i]),
  );
  const atOffset = (
    genre: NonMainstreamGenreName,
    offset: number,
  ): NonMainstreamGenreName => {
    const start = byGenre.get(genre);
    if (start === undefined) {
      throw new Error(`Unknown wheel genre "${genre}"`);
    }
    const raw = (start + offset) % wheelGenres.length;
    const idx = raw < 0 ? raw + wheelGenres.length : raw;
    return wheelGenres[idx];
  };
  const out = {} as Record<
    GenreName,
    {
      advantageVs: readonly string[];
      weakVs: readonly string[];
    }
  >;
  out.Mainstream = { advantageVs: [], weakVs: [] };
  for (const genre of wheelGenres) {
    const advantageVs: NonMainstreamGenreName[] = [
      atOffset(genre, +2),
      atOffset(genre, -3),
    ];
    const weakVsBase: NonMainstreamGenreName[] = [
      atOffset(genre, -2),
      atOffset(genre, +3),
    ];
    out[genre] = { advantageVs, weakVs: weakVsBase };
  }
  return out;
})();

export function matchupTargetsForAppGenre(genre: AppGenreName | undefined): {
  advantageVs: string[];
  weakVs: string[];
} {
  if (!genre) return { advantageVs: [], weakVs: [] };
  const row = GENRE_BATTLE_MATCHUP[genre as GenreName];
  if (!row) return { advantageVs: [], weakVs: [] };
  return {
    advantageVs: [...row.advantageVs],
    weakVs: [...row.weakVs],
  };
}

export function matchupIncomingFrom(genre: AppGenreName | undefined): string[] {
  if (!genre) return [];
  const target = genre as GenreName;
  return (Object.keys(GENRE_BATTLE_MATCHUP) as GenreName[]).filter(
    (candidate) => GENRE_BATTLE_MATCHUP[candidate].advantageVs.includes(target),
  );
}

export function subgenreParentA(subgenre: string): string | undefined {
  return SUBGENRE_PARENT_A[subgenre];
}

export function isWorldNativeSubgenre(subgenre: string): boolean {
  const def = SUBGENRE_BY_NAME[subgenre];
  return def?.kind === "country";
}

export function isCountrySubgenre(subgenre: string): boolean {
  return SUBGENRE_BY_NAME[subgenre]?.kind === "country";
}

export function isGenreSubgenre(subgenre: string): boolean {
  return SUBGENRE_BY_NAME[subgenre]?.kind === "genre";
}

export function subgenreIntensity(subgenre: string): Intensity {
  const sub = SUBGENRE_BY_NAME[subgenre];
  if (!sub) {
    throw new Error(`Unknown canonical subgenre "${subgenre}"`);
  }
  return sub.intensity;
}

export function appGenreIntensity(genre: AppGenreName): Intensity {
  if (GENRE_NAMES.indexOf(genre as GenreName) === -1) {
    throw new Error(`Unknown app genre "${genre}"`);
  }
  return genre === "Mainstream" ? "pop" : "soft";
}

export function canonicalCountryFromSubgenre(subgenre: string): string {
  const sub = SUBGENRE_BY_NAME[subgenre];
  if (!sub) {
    throw new Error(`Unknown canonical subgenre "${subgenre}"`);
  }
  if (sub.kind !== "country") {
    throw new Error(`Subgenre "${subgenre}" is not a country-native subgenre`);
  }
  return sub.parentA;
}

export function canonicalGenreFromSubgenre(subgenre: string): GenreName {
  const sub = SUBGENRE_BY_NAME[subgenre];
  if (!sub) {
    throw new Error(`Unknown canonical subgenre "${subgenre}"`);
  }
  if (sub.kind !== "genre") {
    throw new Error(
      `Subgenre "${subgenre}" is country-native and has no global canonical genre parent`,
    );
  }
  return sub.parentA;
}

export function appGenreFromSubgenre(subgenre: string): AppGenreName {
  const canonical = canonicalGenreFromSubgenre(subgenre);
  return canonical as AppGenreName;
}

export function isGenreName(genre: string): genre is GenreName {
  return GENRE_NAMES.indexOf(genre as GenreName) !== -1;
}

export function displayGenreLabel(genre: AppGenreName): string {
  return genre === "Mainstream" ? "Pop" : genre;
}

export function matchupGenreDisplayLabel(name: string): string {
  if (name === "Mainstream") return "Pop";
  return name;
}
