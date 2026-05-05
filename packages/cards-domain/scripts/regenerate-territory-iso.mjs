/**
 * Regenerates `src/iso-alpha2-by-territory-name.ts` from restcountries.com.
 * Run from repo root: node packages/cards-domain/scripts/regenerate-territory-iso.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "src", "iso-alpha2-by-territory-name.ts");

async function main() {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,cca2",
  );
  if (!res.ok) throw new Error(`restcountries: HTTP ${res.status}`);
  const data = await res.json();
  /** @type {Record<string, string>} */
  const byName = {};
  for (const c of data) {
    const code = c.cca2;
    if (!code || typeof code !== "string" || code.length !== 2) continue;
    const common = c.name?.common;
    const official = c.name?.official;
    if (common) byName[common] = code;
    if (official && official !== common) byName[official] = code;
  }
  /** App + shorthand aliases (common ISO ambiguity fixes). */
  const aliases = {
    USA: "US",
    UK: "GB",
    Britain: "GB",
    England: "GB",
    Scotland: "GB",
    Wales: "GB",
    "Northern Ireland": "GB",
    "Great Britain": "GB",
    Bretagne: "FR",
    Russia: "RU",
    "Russian Federation": "RU",
    Korea: "KR",
    "South Korea": "KR",
    "North Korea": "KP",
    "Democratic Republic of the Congo": "CD",
    Congo: "CG",
    Swaziland: "SZ",
    "East Timor": "TL",
    Timor: "TL",
    Burma: "MM",
    Ivory: "CI",
    Palestine: "PS",
    Vatican: "VA",
    Taiwan: "TW",
    Czechia: "CZ",
    Macedonia: "MK",
    Türkiye: "TR",
    Turkey: "TR",
  };
  const merged = { ...byName, ...aliases };
  const keys = Object.keys(merged).sort((a, b) => a.localeCompare(b));

  function escapeKey(k) {
    return k.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  }

  const lines = keys.map((k) => `  '${escapeKey(k)}': '${merged[k]}',`);
  const out =
    "// Generated — restcountries.com v3.1 (common + official English names + aliases).\n" +
    "// Regenerate: node packages/cards-domain/scripts/regenerate-territory-iso.mjs\n\n" +
    "export const ISO_ALPHA2_BY_TERRITORY_NAME: Record<string, string> = {\n" +
    `${lines.join("\n")}\n` +
    "};\n";
  fs.writeFileSync(outPath, out);
  console.error(`Wrote ${keys.length} entries → ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
