import { describe, expect, it } from "vitest";
import { COUNTRY_DATA, countryFlagForShell, countryPreferredCardShell } from "./countries";
import { resolveThemeSelection } from "./genres/colors";

function resolvedCardBorderFromCountry(country: string): string {
  const resolved = resolveThemeSelection({ genre: "Mainstream", country });
  const shell = countryPreferredCardShell(resolved.resolvedCountry);
  const variant = countryFlagForShell(resolved.resolvedCountry, shell);
  return (
    variant.border ?? resolved.frameBorder ?? resolved.theme.frameBorder ?? ""
  );
}

describe("country border colors for cards", () => {
  it("each defined country resolves a non-empty card border with colour data", () => {
    for (const country of Object.keys(COUNTRY_DATA)) {
      const border = resolvedCardBorderFromCountry(country);
      expect(border.length, country).toBeGreaterThan(8);
      const inlineHex = border.match(/#[0-9a-fA-F]{6}/gi) ?? [];
      const encodedHex = border.match(/%23[0-9a-fA-F]{6}/gi) ?? [];
      const shortHex = border.match(/#[0-9a-fA-F]{3}\b/gi) ?? [];
      const hasColourData =
        inlineHex.length + encodedHex.length + shortHex.length > 0 ||
        /\burl\s*\(/i.test(border);
      expect(hasColourData, country).toBe(true);
    }
  });

  it("returns flat for unknown preferred shell lookup", () => {
    expect(countryPreferredCardShell(undefined)).toBe("flat");
    expect(countryPreferredCardShell("Unknown")).toBe("flat");
  });
});
