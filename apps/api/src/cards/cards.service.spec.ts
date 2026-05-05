import { classifyGenreKind } from "./cards.service";

describe("classifyGenreKind", () => {
  it("returns COUNTRY_ROOT for country rows", () => {
    expect(classifyGenreKind(true, false, null)).toBe("COUNTRY_ROOT");
  });

  it("returns COUNTRY_SUB_GENRE when parent is country", () => {
    expect(classifyGenreKind(false, true, 42)).toBe("COUNTRY_SUB_GENRE");
  });

  it("returns GENRE_ROOT when no parent and not country", () => {
    expect(classifyGenreKind(false, false, null)).toBe("GENRE_ROOT");
  });

  it("returns SUB_GENRE for non-country child with non-country parent", () => {
    expect(classifyGenreKind(false, false, 42)).toBe("SUB_GENRE");
  });
});
