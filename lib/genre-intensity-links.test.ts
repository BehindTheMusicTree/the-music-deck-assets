import { describe, expect, it } from "vitest";
import { GENRE_NAMES } from "./genre-names";
import { genreIntensityIn, genreIntensityOut } from "./genres";

describe("genre intensity links", () => {
  it("Mainstream out points to all pop-intensity genres", () => {
    const out = genreIntensityOut({ genre: "Mainstream", intensity: "pop" });
    expect(out).toHaveLength(GENRE_NAMES.length);
    expect(out.every((n) => n.intensity === "pop")).toBe(true);
  });

  it("non-mainstream out follows next intensity + next genre", () => {
    const out = genreIntensityOut({ genre: "Rock", intensity: "soft" });
    expect(out).toEqual([
      { genre: "Rock", intensity: "experimental" },
      { genre: "Classical", intensity: "soft" },
      { genre: "Hip-Hop", intensity: "soft" },
      { genre: "Classical", intensity: "pop" },
      { genre: "Hip-Hop", intensity: "pop" },
    ]);
  });

  it("hardcore has no +1 intensity branch", () => {
    const out = genreIntensityOut({ genre: "Vintage", intensity: "hardcore" });
    expect(out).toEqual([
      { genre: "Reggae/Dub", intensity: "hardcore" },
      { genre: "Classical", intensity: "hardcore" },
      { genre: "Reggae/Dub", intensity: "experimental" },
      { genre: "Classical", intensity: "experimental" },
    ]);
  });

  it("in-links are exact inverse of out-links", () => {
    const incoming = genreIntensityIn({ genre: "Rock", intensity: "pop" });
    expect(incoming).toContainEqual({ genre: "Mainstream", intensity: "pop" });
    expect(incoming).toContainEqual({ genre: "Hip-Hop", intensity: "pop" });
  });
});
