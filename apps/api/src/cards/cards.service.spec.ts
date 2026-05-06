import { classifyGenreKind } from "./cards.service";

describe("classifyGenreKind", () => {
  it("returns COUNTRY_SUB_GENRE when parentTerritoryId is set", () => {
    expect(classifyGenreKind(7, null)).toBe("COUNTRY_SUB_GENRE");
    expect(classifyGenreKind(7, 42)).toBe("COUNTRY_SUB_GENRE");
  });

  it("returns GENRE_ROOT when no parent and no territory", () => {
    expect(classifyGenreKind(null, null)).toBe("GENRE_ROOT");
  });

  it("returns SUB_GENRE for genre-linked subgenre", () => {
    expect(classifyGenreKind(null, 42)).toBe("SUB_GENRE");
  });
});
