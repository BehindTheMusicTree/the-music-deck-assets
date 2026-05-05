import type { CardData } from "./card-data";

export type SongGraph = {
  byId: Record<
    number,
    Pick<
      CardData,
      "id" | "title" | "artist" | "genre" | "artwork" | "artworkUrl"
    >
  >;
  songsOutById: Record<number, number[]>;
  songsInById: Record<number, number[]>;
};

/**
 * Build strict directed track graph from card `songsOut`.
 *
 * Rules:
 * - Unknown ids referenced in `songsOut` throw errors.
 * - Duplicate ids in a single `songsOut` list throw errors.
 * - Cycles are allowed (A->B and B->A, larger loops, etc.).
 */
export function buildSongGraph(cards: CardData[]): SongGraph {
  /* Plain `{}` (not `Object.create(null)`) so the graph is RSC-serializable when
   * passed to Client Components (React rejects null-prototype objects). */
  const byId: SongGraph["byId"] = {};
  const songsOutById: SongGraph["songsOutById"] = {};
  const songsInById: SongGraph["songsInById"] = {};

  for (const card of cards) {
    byId[card.id] = {
      id: card.id,
      title: card.title,
      artist: card.artist,
      genre: card.genre,
      artwork: card.artwork,
      artworkUrl: card.artworkUrl,
    };
    songsOutById[card.id] = [];
    songsInById[card.id] = [];
  }

  for (const card of cards) {
    const seen = new Set<number>();
    for (const outId of card.songsOut ?? []) {
      if (seen.has(outId)) {
        throw new Error(
          `Duplicate songsOut id "${outId}" in card "${card.title}" (${card.id})`,
        );
      }
      seen.add(outId);
      if (!(outId in byId)) {
        throw new Error(
          `Unknown songsOut id "${outId}" referenced by "${card.title}" (${card.id})`,
        );
      }
      songsOutById[card.id].push(outId);
      songsInById[outId].push(card.id);
    }
  }

  return { byId, songsOutById, songsInById };
}

/** One lookup per id: display fields + outgoing link ids (for `Card` transition strips). */
export type CardSongIndexEntry = Pick<
  CardData,
  "id" | "title" | "artist" | "genre" | "artwork" | "artworkUrl"
> & {
  songsOut: number[];
};

export type CardSongIndex = Record<number, CardSongIndexEntry>;

/**
 * Merges `buildSongGraph` into a single index so consumers pass only
 * `cardSongIndex` to `Card` (no separate `trackGraph`).
 * @param prebuilt - If already computed (e.g. catalogue), avoids a second `buildSongGraph` pass.
 */
export function buildCardSongIndex(
  cards: CardData[],
  prebuilt?: SongGraph,
): CardSongIndex {
  const g = prebuilt ?? buildSongGraph(cards);
  const index: CardSongIndex = {};
  for (const key of Object.keys(g.byId)) {
    const id = Number(key);
    const base = g.byId[id];
    index[id] = {
      ...base,
      songsOut: g.songsOutById[id] ?? [],
    };
  }
  return index;
}

/**
 * UI helper: derive incoming transition ids for one card from other cards'
 * `songsOut`, keeping `songsOut` as the single source of truth.
 */
export function deriveSongsInFromSongIndex(
  cardSongIndex: CardSongIndex,
  targetId: number,
): number[] {
  const incoming: number[] = [];
  for (const key of Object.keys(cardSongIndex)) {
    const sourceId = Number(key);
    if (cardSongIndex[sourceId]?.songsOut.includes(targetId)) {
      incoming.push(sourceId);
    }
  }
  return incoming;
}
