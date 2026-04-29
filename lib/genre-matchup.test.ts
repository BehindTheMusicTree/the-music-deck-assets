import { describe, expect, it } from "vitest";
import { matchupIncomingFrom, matchupTargetsForAppGenre } from "./genres";

describe("genre mashup matchup rules", () => {
  it("Mainstream has no advantage and no weakness", () => {
    expect(matchupTargetsForAppGenre("Mainstream")).toEqual({
      advantageVs: [],
      weakVs: [],
    });
    expect(matchupIncomingFrom("Mainstream")).toEqual([]);
  });

  it("Rock follows circular +2/-3 advantage and -2/+3 weakness", () => {
    expect(matchupTargetsForAppGenre("Rock")).toEqual({
      advantageVs: ["Vintage", "Electronic"],
      weakVs: ["Disco/Funk"],
    });
  });

  it("influence removes weakness when target matches influence genre", () => {
    // Hip-Hop has Hip-House (influence Electronic) and R&B (influence Vintage),
    // so both weak targets are removed.
    expect(matchupTargetsForAppGenre("Hip-Hop")).toEqual({
      advantageVs: ["Classical", "Reggae/Dub"],
      weakVs: [],
    });
    // Disco/Funk has Early Funk (influence Vintage), but Vintage is not in weakVs here.
    expect(matchupTargetsForAppGenre("Disco/Funk")).toEqual({
      advantageVs: ["Rock", "Vintage"],
      weakVs: ["Reggae/Dub", "Classical"],
    });
  });

  it("incoming is computed from all outgoing advantages", () => {
    // Rock is targeted by Reggae/Dub and Disco/Funk from +2/-3 rule.
    expect(matchupIncomingFrom("Rock")).toEqual(["Reggae/Dub", "Disco/Funk"]);
  });
});
