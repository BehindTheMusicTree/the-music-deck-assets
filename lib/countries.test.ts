import { describe, expect, it } from "vitest";
import { countryFlagForShell, countryPreferredCardShell } from "./countries";
import { resolveThemeSelection } from "./genres/colors";

function includesHexColor(css: string, hex: string): boolean {
  const upper = hex.toUpperCase();
  const plain = upper;
  const encoded = `%23${upper.slice(1)}`;
  const short =
    upper.length === 7 &&
    upper[1] === upper[2] &&
    upper[3] === upper[4] &&
    upper[5] === upper[6]
      ? `#${upper[1]}${upper[3]}${upper[5]}`
      : null;
  const encodedShort = short ? `%23${short.slice(1)}` : null;
  const hay = css.toUpperCase();
  return (
    hay.includes(plain) ||
    hay.includes(encoded) ||
    (short !== null && hay.includes(short)) ||
    (encodedShort !== null && hay.includes(encodedShort))
  );
}

function resolvedCardBorderFromCountry(country: string): string {
  const resolved = resolveThemeSelection({ genre: "Mainstream", country });
  const shell = countryPreferredCardShell(resolved.resolvedCountry);
  const variant = countryFlagForShell(resolved.resolvedCountry, shell);
  return (
    variant.border ?? resolved.frameBorder ?? resolved.theme.frameBorder ?? ""
  );
}

describe("country border colors for cards", () => {
  it("maps expected country palette colors into resolved border", () => {
    const expected: Record<string, string[]> = {
      England: ["#C8102E", "#FFFFFF"],
      Germany: ["#000000", "#DD0000", "#FFCE00"],
      Spain: ["#AA151B", "#F1BF00"],
      Netherlands: ["#AE1C28", "#FFFFFF", "#21468B"],
      Russia: ["#FFFFFF", "#0039A6", "#D52B1E"],
      France: ["#0055A4", "#FFFFFF", "#EF4135"],
      Italy: ["#009246", "#FFFFFF", "#CE2B37"],
      Mexico: ["#006847", "#FFFFFF", "#CE1126"],
      Peru: ["#D91023", "#FFFFFF"],
      Algeria: ["#006233", "#FFFFFF"],
      Switzerland: ["#DA0208", "#FFFFFF"],
      Japan: ["#BC002D", "#FFFFFF"],
      Bretagne: ["#000000", "#FFFFFF"],
    };

    for (const [country, palette] of Object.entries(expected)) {
      const border = resolvedCardBorderFromCountry(country);
      expect(border.length).toBeGreaterThan(0);
      for (const color of palette) {
        if (!includesHexColor(border, color)) {
          throw new Error(`Missing ${color} in ${country} border: ${border}`);
        }
      }
    }
  });

  it("returns flat for unknown preferred shell lookup", () => {
    expect(countryPreferredCardShell(undefined)).toBe("flat");
    expect(countryPreferredCardShell("Unknown")).toBe("flat");
  });
});
