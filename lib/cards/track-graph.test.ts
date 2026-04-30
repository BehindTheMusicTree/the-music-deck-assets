import { describe, expect, it } from "vitest";
import type { CardData } from "@/components/Card";
import {
  buildCardTrackIndex,
  deriveTracksInFromTrackIndex,
} from "./track-graph";

const cards: CardData[] = [
  {
    id: 1,
    title: "A",
    year: "2000,
    ability: "Reserve",
    abilityDesc: "Test",
    pop: 5,
    rarity: "Classic",
    tracksOut: [2, 3],
  },
  {
    id: 2,
    title: "B",
    year: "2001,
    ability: "Reserve",
    abilityDesc: "Test",
    pop: 5,
    rarity: "Classic",
    tracksOut: [3],
  },
  {
    id: 3,
    title: "C",
    year: "2002,
    ability: "Reserve",
    abilityDesc: "Test",
    pop: 5,
    rarity: "Classic",
  },
];

describe("deriveTracksInFromTrackIndex", () => {
  it("derives incoming ids only from other cards tracksOut", () => {
    const index = buildCardTrackIndex(cards);

    expect(deriveTracksInFromTrackIndex(index, 1)).toEqual([]);
    expect(deriveTracksInFromTrackIndex(index, 2)).toEqual([1]);
    expect(deriveTracksInFromTrackIndex(index, 3)).toEqual([1, 2]);
  });
});
