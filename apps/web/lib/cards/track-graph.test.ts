import { describe, expect, it } from "vitest";
import type { CardData } from "@/components/Card";
import { buildCardSongIndex, deriveSongsInFromSongIndex } from "./track-graph";

const cards: CardData[] = [
  {
    id: 1,
    title: "A",
    year: "2000",
    ability: "Reserve",
    abilityDesc: "Test",
    pop: 5,
    rarity: "Classic",
    songsOut: [2, 3],
  },
  {
    id: 2,
    title: "B",
    year: "2001",
    ability: "Reserve",
    abilityDesc: "Test",
    pop: 5,
    rarity: "Classic",
    songsOut: [3],
  },
  {
    id: 3,
    title: "C",
    year: "2002",
    ability: "Reserve",
    abilityDesc: "Test",
    pop: 5,
    rarity: "Classic",
  },
];

describe("deriveSongsInFromSongIndex", () => {
  it("derives incoming ids only from other cards songsOut", () => {
    const index = buildCardSongIndex(cards);

    expect(deriveSongsInFromSongIndex(index, 1)).toEqual([]);
    expect(deriveSongsInFromSongIndex(index, 2)).toEqual([1]);
    expect(deriveSongsInFromSongIndex(index, 3)).toEqual([1, 2]);
  });
});
