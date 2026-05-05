import { describe, expect, it } from "vitest";
import {
  appGenreIntensity,
  matchupIncomingFrom,
  matchupTargetsForRootGenre,
} from "../model";

describe("genre mashup matchup rules", () => {
  it("Mainstream has no advantage and no weakness", () => {
    expect(matchupTargetsForRootGenre("Mainstream")).toEqual({
      advantageVs: [],
      weakVs: [],
    });
    expect(matchupIncomingFrom("Mainstream")).toEqual([]);
  });

  it("Rock follows circular +2/-3 advantage and -2/+3 weakness", () => {
    expect(matchupTargetsForRootGenre("Rock")).toEqual({
      advantageVs: ["Vintage", "Electronic"],
      weakVs: ["Disco/Funk", "Reggae/Dub"],
    });
  });

  it("genre matchup does not inherit subgenre influences", () => {
    expect(matchupTargetsForRootGenre("Hip-Hop")).toEqual({
      advantageVs: ["Classical", "Reggae/Dub"],
      weakVs: ["Electronic", "Vintage"],
    });
    // Even with influenced subgenres, base wheel rule applies unchanged at genre level.
    expect(matchupTargetsForRootGenre("Disco/Funk")).toEqual({
      advantageVs: ["Rock", "Vintage"],
      weakVs: ["Reggae/Dub", "Classical"],
    });
  });

  it("incoming is computed from all outgoing advantages", () => {
    // Rock is targeted by Reggae/Dub and Disco/Funk from +2/-3 rule.
    expect(matchupIncomingFrom("Rock")).toEqual(["Reggae/Dub", "Disco/Funk"]);
  });

  it("Mainstream app intensity is pop for transition graph lookups", () => {
    expect(appGenreIntensity("Mainstream")).toBe("POP");
  });
});
