import type { CardData } from "@/components/Card";

export type TrackGraph = {
  byId: Record<
    number,
    Pick<CardData, "id" | "title" | "artist" | "genre" | "artwork">
  >;
  tracksOutById: Record<number, number[]>;
  tracksInById: Record<number, number[]>;
};

/**
 * Build strict directed track graph from card `tracksOut`.
 *
 * Rules:
 * - Unknown ids referenced in `tracksOut` throw errors.
 * - Duplicate ids in a single `tracksOut` list throw errors.
 * - Cycles are allowed (A->B and B->A, larger loops, etc.).
 */
export function buildTrackGraph(cards: CardData[]): TrackGraph {
  /* Plain `{}` (not `Object.create(null)`) so the graph is RSC-serializable when
   * passed to Client Components (React rejects null-prototype objects). */
  const byId: TrackGraph["byId"] = {};
  const tracksOutById: TrackGraph["tracksOutById"] = {};
  const tracksInById: TrackGraph["tracksInById"] = {};

  for (const card of cards) {
    byId[card.id] = {
      id: card.id,
      title: card.title,
      artist: card.artist,
      genre: card.genre,
      artwork: card.artwork,
    };
    tracksOutById[card.id] = [];
    tracksInById[card.id] = [];
  }

  for (const card of cards) {
    const seen = new Set<number>();
    for (const outId of card.tracksOut ?? []) {
      if (seen.has(outId)) {
        throw new Error(
          `Duplicate tracksOut id "${outId}" in card "${card.title}" (${card.id})`,
        );
      }
      seen.add(outId);
      if (!(outId in byId)) {
        throw new Error(
          `Unknown tracksOut id "${outId}" referenced by "${card.title}" (${card.id})`,
        );
      }
      tracksOutById[card.id].push(outId);
      tracksInById[outId].push(card.id);
    }
  }

  return { byId, tracksOutById, tracksInById };
}

/** One lookup per id: display fields + incoming/outgoing link ids (for `Card` transition strips). */
export type CardTrackIndexEntry = Pick<
  CardData,
  "id" | "title" | "artist" | "genre" | "artwork"
> & {
  tracksIn: number[];
  tracksOut: number[];
};

export type CardTrackIndex = Record<number, CardTrackIndexEntry>;

/**
 * Merges `buildTrackGraph` into a single index so consumers pass only
 * `cardTrackIndex` to `Card` (no separate `trackGraph`).
 * @param prebuilt - If already computed (e.g. catalogue), avoids a second `buildTrackGraph` pass.
 */
export function buildCardTrackIndex(
  cards: CardData[],
  prebuilt?: TrackGraph,
): CardTrackIndex {
  const g = prebuilt ?? buildTrackGraph(cards);
  const index: CardTrackIndex = {};
  for (const key of Object.keys(g.byId)) {
    const id = Number(key);
    const base = g.byId[id];
    index[id] = {
      ...base,
      tracksIn: g.tracksInById[id] ?? [],
      tracksOut: g.tracksOutById[id] ?? [],
    };
  }
  return index;
}

