/**
 * Writes lib/cards/shipped-catalog-meta-by-id.ts from each card’s catalogue fields on
 * `CATALOG_ENTRIES` (same values as on each merged card; use to normalize or bootstrap the file).
 * Run: npx tsx scripts/generate-shipped-catalog-meta.mts
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { CATALOG_ENTRIES } from "../lib/cards/catalog";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "../lib/cards/shipped-catalog-meta-by-id.ts");

const lines: string[] = [
  `import type { CatalogSeriesType } from "@/lib/card-theme-types";`,
  ``,
  `/**`,
  ` * Shipped-deck catalogue № and series bucket per card id.`,
  ` * Source of truth for numbering; {@link lib/cards/catalog.ts} reads these only.`,
  ` * Regenerate with: npx tsx scripts/generate-shipped-catalog-meta.mts`,
  ` */`,
  `export const SHIPPED_CATALOG_META_BY_ID: Record<`,
  `  number,`,
  `  {`,
  `    catalogNumber: number;`,
  `    catalogSeriesType: CatalogSeriesType;`,
  `    catalogSeriesLabel: string;`,
  `  }`,
  `> = {`,
];

for (const e of CATALOG_ENTRIES) {
  const c = e.card;
  lines.push(
    `  ${c.id}: { catalogNumber: ${e.catalogNumber}, catalogSeriesType: ${JSON.stringify(e.catalogSeriesType)}, catalogSeriesLabel: ${JSON.stringify(e.catalogSeriesLabel)} },`,
  );
}

lines.push(`};`, ``);

writeFileSync(out, lines.join("\n"), "utf8");
console.log(`Wrote ${out}`);
