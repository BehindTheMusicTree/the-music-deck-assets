"use client";

import { useMemo } from "react";
import type { CatalogEntry } from "@/lib/cards";

export default function CatalogSeriesSummaryTable({
  entries,
}: {
  entries: CatalogEntry[];
}) {
  const catalogSeriesSummary = useMemo(() => {
    const grouped = new Map<
      string,
      {
        seriesType: CatalogEntry["catalogSeriesType"];
        seriesLabel: string;
        count: number;
        firstCatalogNo: number;
        lastCatalogNo: number;
      }
    >();
    for (const entry of entries) {
      const key = `${entry.catalogSeriesType}\t${entry.catalogSeriesLabel}`;
      const current = grouped.get(key);
      if (!current) {
        grouped.set(key, {
          seriesType: entry.catalogSeriesType,
          seriesLabel: entry.catalogSeriesLabel,
          count: 1,
          firstCatalogNo: entry.catalogNumber,
          lastCatalogNo: entry.catalogNumber,
        });
        continue;
      }
      current.count += 1;
      current.firstCatalogNo = Math.min(current.firstCatalogNo, entry.catalogNumber);
      current.lastCatalogNo = Math.max(current.lastCatalogNo, entry.catalogNumber);
    }
    return [...grouped.values()].sort((a, b) =>
      a.seriesLabel.localeCompare(b.seriesLabel, undefined, {
        sensitivity: "base",
      }),
    );
  }, [entries]);

  return (
    <div className="mb-4 w-full max-w-[560px] rounded-[6px] border border-ui-border bg-[#0f0f14]/35 overflow-hidden">
      <div className="px-3 py-2 border-b border-ui-border/70 font-cinzel text-[10px] tracking-[0.12em] text-gold">
        Series summary (shipped deck)
      </div>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-ui-border/60">
            <th className="px-3 py-2 font-cinzel text-[10px] tracking-[0.1em] text-gold/95">
              Series
            </th>
            <th className="px-3 py-2 font-cinzel text-[10px] tracking-[0.1em] text-gold/95">
              Bucket
            </th>
            <th className="px-3 py-2 font-cinzel text-[10px] tracking-[0.1em] text-gold/95 text-right">
              Cards
            </th>
            <th className="px-3 py-2 font-cinzel text-[10px] tracking-[0.1em] text-gold/95 text-right">
              № range
            </th>
          </tr>
        </thead>
        <tbody className="font-garamond text-[14px] text-white/92">
          {catalogSeriesSummary.map((row) => (
            <tr
              key={`${row.seriesType}\t${row.seriesLabel}`}
              className="border-b border-ui-border/45 last:border-0"
            >
              <td className="px-3 py-2">{row.seriesLabel}</td>
              <td className="px-3 py-2 text-muted">
                {row.seriesType === "country" ? "Country / region" : "Genre"}
              </td>
              <td className="px-3 py-2 text-right font-mono tabular-nums text-muted">
                {row.count}
              </td>
              <td className="px-3 py-2 text-right font-mono tabular-nums text-muted">
                {row.firstCatalogNo === row.lastCatalogNo
                  ? String(row.firstCatalogNo)
                  : `${row.firstCatalogNo}–${row.lastCatalogNo}`}
              </td>
            </tr>
          ))}
          <tr className="bg-white/[0.03]">
            <td className="px-3 py-2 font-cinzel text-[10px] tracking-[0.1em] text-gold">
              TOTAL
            </td>
            <td className="px-3 py-2 text-muted font-mono text-[12px]">
              {catalogSeriesSummary.length} series
            </td>
            <td className="px-3 py-2 text-right font-mono tabular-nums text-gold">
              {entries.length}
            </td>
            <td className="px-3 py-2 text-right text-muted">—</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
