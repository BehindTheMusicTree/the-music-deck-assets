/**
 * One-off: run with `npx tsx scripts/dump-shipped-catalog-meta.mts`
 * to print JSON lines of current card-level catalogue meta.
 */
import { CATALOG_ENTRIES } from "../lib/cards/catalog";

for (const e of CATALOG_ENTRIES) {
  console.log(
    JSON.stringify({
      id: e.card.id,
      catalogNumber: e.catalogNumber,
      catalogSeriesType: e.catalogSeriesType,
      catalogSeriesLabel: e.catalogSeriesLabel,
    }),
  );
}
