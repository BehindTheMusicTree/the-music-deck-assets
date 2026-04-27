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
  const byId: TrackGraph["byId"] = Object.create(null) as TrackGraph["byId"];
  const tracksOutById: TrackGraph["tracksOutById"] = Object.create(
    null,
  ) as TrackGraph["tracksOutById"];
  const tracksInById: TrackGraph["tracksInById"] = Object.create(
    null,
  ) as TrackGraph["tracksInById"];

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

