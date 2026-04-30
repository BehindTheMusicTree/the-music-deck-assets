import { describe, expect, it } from "vitest";
import type { GenreName } from "./genre-names";
import type { Intensity } from "./genre-subgenres-data";
import {
  allGenreIntensityNodes,
  genreIntensityIn,
  genreIntensityOut,
  transitionIn,
  transitionOut,
  type TransitionGenreIntensityNode,
  type TransitionNode,
} from "./genre-model";
import { GENRE_NAMES } from "./genre-names";
import {
  MAINSTREAM_POP_TRANSITION_IN,
  MAINSTREAM_POP_TRANSITION_OUT,
  ROCK_EXPERIMENTAL_TRANSITION_IN,
  ROCK_EXPERIMENTAL_TRANSITION_OUT,
  ROCK_HARDCORE_TRANSITION_IN,
  ROCK_HARDCORE_TRANSITION_OUT,
  ROCK_POP_TRANSITION_IN,
  ROCK_POP_TRANSITION_OUT,
  ROCK_SOFT_TRANSITION_IN,
  ROCK_SOFT_TRANSITION_OUT,
} from "./genre-transition-representatives.fixtures";

function genreIntensityKey(n: { genre: string; intensity: string }): string {
  return `${n.genre}|${n.intensity}`;
}

function transitionGiNode(
  genre: GenreName,
  intensity: Intensity,
): TransitionGenreIntensityNode {
  return { kind: "genreIntensity", genre, intensity };
}

/** Stable sort for exhaustive transition assertions (GI keys sort before subgenre keys). */
function transitionNodesSortedKey(n: TransitionNode): string {
  if (n.kind === "genreIntensity") return `g|${n.genre}|${n.intensity}`;
  return `s|${n.subgenre}`;
}

function sortedTransitionNodes(nodes: TransitionNode[]): TransitionNode[] {
  return [...nodes].sort((a, b) =>
    transitionNodesSortedKey(a).localeCompare(transitionNodesSortedKey(b)),
  );
}

describe("genre transitions", () => {
  it("Mainstream out includes self (hub loop) and every genre at pop", () => {
    const out = genreIntensityOut({ genre: "Mainstream", intensity: "pop" });
    expect(out).toHaveLength(GENRE_NAMES.length);
    expect(out.some((n) => n.genre === "Mainstream")).toBe(true);
    expect(out.every((n) => n.intensity === "pop")).toBe(true);
  });

  describe("genreIntensityOut — same genre across intensities (Rock)", () => {
    it("pop ring: self, +1 intensity, wheel neighbours at pop, hub", () => {
      const out = genreIntensityOut({ genre: "Rock", intensity: "pop" });
      expect(out).toEqual([
        { genre: "Rock", intensity: "pop" },
        { genre: "Rock", intensity: "soft" },
        { genre: "Classical", intensity: "pop" },
        { genre: "Hip-Hop", intensity: "pop" },
        { genre: "Mainstream", intensity: "pop" },
      ]);
    });

    it("soft: self, ±1 intensity, neighbours at soft and at neighbour-down (pop)", () => {
      const out = genreIntensityOut({ genre: "Rock", intensity: "soft" });
      expect(out).toEqual([
        { genre: "Rock", intensity: "soft" },
        { genre: "Rock", intensity: "experimental" },
        { genre: "Rock", intensity: "pop" },
        { genre: "Classical", intensity: "soft" },
        { genre: "Hip-Hop", intensity: "soft" },
        { genre: "Classical", intensity: "pop" },
        { genre: "Hip-Hop", intensity: "pop" },
      ]);
    });

    it("experimental: self, ±1 intensity, neighbours at experimental and at neighbour-down (soft)", () => {
      const out = genreIntensityOut({ genre: "Rock", intensity: "experimental" });
      expect(out).toEqual([
        { genre: "Rock", intensity: "experimental" },
        { genre: "Rock", intensity: "hardcore" },
        { genre: "Rock", intensity: "soft" },
        { genre: "Classical", intensity: "experimental" },
        { genre: "Hip-Hop", intensity: "experimental" },
        { genre: "Classical", intensity: "soft" },
        { genre: "Hip-Hop", intensity: "soft" },
      ]);
    });

    it("hardcore: no +1 branch; includes experimental via −1 and neighbours at hardcore / experimental", () => {
      const out = genreIntensityOut({ genre: "Rock", intensity: "hardcore" });
      expect(out).toEqual([
        { genre: "Rock", intensity: "hardcore" },
        { genre: "Rock", intensity: "experimental" },
        { genre: "Classical", intensity: "hardcore" },
        { genre: "Hip-Hop", intensity: "hardcore" },
        { genre: "Classical", intensity: "experimental" },
        { genre: "Hip-Hop", intensity: "experimental" },
      ]);
    });
  });

  it("hardcore (Vintage): pattern holds with different wheel neighbours", () => {
    const out = genreIntensityOut({ genre: "Vintage", intensity: "hardcore" });
    expect(out).toEqual([
      { genre: "Vintage", intensity: "hardcore" },
      { genre: "Vintage", intensity: "experimental" },
      { genre: "Reggae/Dub", intensity: "hardcore" },
      { genre: "Classical", intensity: "hardcore" },
      { genre: "Reggae/Dub", intensity: "experimental" },
      { genre: "Classical", intensity: "experimental" },
    ]);
  });

  describe("transitionIn / transitionOut — exhaustive fixtures (Mainstream + Rock × intensities)", () => {
    it("Mainstream | pop — outs", () => {
      expect(
        sortedTransitionNodes(transitionOut(transitionGiNode("Mainstream", "pop"))),
      ).toEqual(MAINSTREAM_POP_TRANSITION_OUT);
    });
    it("Mainstream | pop — ins", () => {
      expect(
        sortedTransitionNodes(transitionIn(transitionGiNode("Mainstream", "pop"))),
      ).toEqual(MAINSTREAM_POP_TRANSITION_IN);
    });
    it("Rock | pop — outs", () => {
      expect(sortedTransitionNodes(transitionOut(transitionGiNode("Rock", "pop")))).toEqual(
        ROCK_POP_TRANSITION_OUT,
      );
    });
    it("Rock | pop — ins", () => {
      expect(sortedTransitionNodes(transitionIn(transitionGiNode("Rock", "pop")))).toEqual(
        ROCK_POP_TRANSITION_IN,
      );
    });
    it("Rock | soft — outs", () => {
      expect(sortedTransitionNodes(transitionOut(transitionGiNode("Rock", "soft")))).toEqual(
        ROCK_SOFT_TRANSITION_OUT,
      );
    });
    it("Rock | soft — ins", () => {
      expect(sortedTransitionNodes(transitionIn(transitionGiNode("Rock", "soft")))).toEqual(
        ROCK_SOFT_TRANSITION_IN,
      );
    });
    it("Rock | experimental — outs", () => {
      expect(
        sortedTransitionNodes(transitionOut(transitionGiNode("Rock", "experimental"))),
      ).toEqual(ROCK_EXPERIMENTAL_TRANSITION_OUT);
    });
    it("Rock | experimental — ins", () => {
      expect(
        sortedTransitionNodes(transitionIn(transitionGiNode("Rock", "experimental"))),
      ).toEqual(ROCK_EXPERIMENTAL_TRANSITION_IN);
    });
    it("Rock | hardcore — outs", () => {
      expect(
        sortedTransitionNodes(transitionOut(transitionGiNode("Rock", "hardcore"))),
      ).toEqual(ROCK_HARDCORE_TRANSITION_OUT);
    });
    it("Rock | hardcore — ins", () => {
      expect(
        sortedTransitionNodes(transitionIn(transitionGiNode("Rock", "hardcore"))),
      ).toEqual(ROCK_HARDCORE_TRANSITION_IN);
    });
  });

  describe("genreIntensityIn ↔ genreIntensityOut (undirected inverse on GI subgraph)", () => {
    it("every out-edge is reversed by genreIntensityIn", () => {
      for (const from of allGenreIntensityNodes()) {
        for (const to of genreIntensityOut(from)) {
          expect(
            genreIntensityIn(to).some((p) => genreIntensityKey(p) === genreIntensityKey(from)),
            `missing reverse: ${genreIntensityKey(from)} → ${genreIntensityKey(to)}`,
          ).toBe(true);
        }
      }
    });

    it("every genre-intensity predecessor implies an out-edge", () => {
      for (const to of allGenreIntensityNodes()) {
        for (const from of genreIntensityIn(to)) {
          expect(
            genreIntensityOut(from).some((n) => genreIntensityKey(n) === genreIntensityKey(to)),
            `missing forward: ${genreIntensityKey(from)} should reach ${genreIntensityKey(to)}`,
          ).toBe(true);
        }
      }
    });
  });

  it("mixed graph: genre-intensity out includes influenced subgenres", () => {
    const hipHopExperimentalOut = transitionOut({
      kind: "genreIntensity",
      genre: "Hip-Hop",
      intensity: "experimental",
    });
    expect(hipHopExperimentalOut).toContainEqual({
      kind: "subgenre",
      subgenre: "Turntablism",
      genre: "Electronic",
      intensity: "experimental",
    });
    expect(hipHopExperimentalOut).not.toContainEqual({
      kind: "genreIntensity",
      genre: "Electronic",
      intensity: "experimental",
    });
  });

  it("mixed graph: subgenre out adds its own influence target", () => {
    const turntablismOut = transitionOut({
      kind: "subgenre",
      subgenre: "Turntablism",
      genre: "Electronic",
      intensity: "experimental",
    });
    expect(turntablismOut).toContainEqual({
      kind: "genreIntensity",
      genre: "Hip-Hop",
      intensity: "experimental",
    });
  });

  it("mixed graph: subgenre in contains genre-intensity and subgenre sources", () => {
    const turntablismIn = transitionIn({
      kind: "subgenre",
      subgenre: "Turntablism",
      genre: "Electronic",
      intensity: "experimental",
    });
    expect(turntablismIn).toContainEqual({
      kind: "genreIntensity",
      genre: "Hip-Hop",
      intensity: "experimental",
    });
  });
});
