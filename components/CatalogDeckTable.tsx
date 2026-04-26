"use client";

import { useMemo, useState } from "react";
import Card from "@/components/Card";
import {
  type CatalogEntry,
  CATALOG_ENTRIES,
  CARD_RARITY_ORDER,
  CATALOG_KINDS,
  formatCatalogIntensity,
} from "@/lib/cards";
import type { Intensity } from "@/lib/genres";
import { intensityLevelIndex } from "@/lib/genres";

type SortKey =
  | "id"
  | "title"
  | "year"
  | "pop"
  | "genre"
  | "artist"
  | "kind"
  | "country"
  | "rarity"
  | "catalogNo"
  | "series"
  | "lineGenre"
  | "intensity"
  | "era";

const thWrap =
  "align-top font-normal font-cinzel text-[10px] sm:text-[11px] tracking-[0.1em] text-gold/95 py-2 px-2";
const selectBase =
  "w-full max-w-[140px] mt-1 text-[10px] leading-tight bg-[#12121a] border border-ui-border rounded px-1 py-1 text-white/90";
const sortBtnBase =
  "shrink-0 inline-flex items-center justify-center min-w-[22px] h-[22px] rounded border border-ui-border bg-[#1a1a22] text-[10px] text-muted hover:text-gold hover:border-gold/40 transition-colors";
const sortBtnActive = "border-gold/50 text-gold";

const INTENSITY_VALUES: readonly Intensity[] = [
  "pop",
  "soft",
  "experimental",
  "hardcore",
];

function compareRows(a: CatalogEntry, b: CatalogEntry, key: SortKey, asc: boolean): number {
  const dir = asc ? 1 : -1;
  const cmp = (x: number, y: number) => (x < y ? -1 : x > y ? 1 : 0) * dir;
  switch (key) {
    case "id":
      return cmp(a.card.id, b.card.id);
    case "year":
      return cmp(a.card.year, b.card.year);
    case "pop":
      return cmp(a.card.pop, b.card.pop);
    case "title":
      return a.card.title.localeCompare(b.card.title, undefined, { sensitivity: "base" }) * dir;
    case "artist":
      return (a.card.artist ?? "").localeCompare(b.card.artist ?? "", undefined, {
        sensitivity: "base",
      }) * dir;
    case "kind":
      return a.kind.localeCompare(b.kind) * dir;
    case "country":
      return (a.card.country ?? "").localeCompare(b.card.country ?? "", undefined, {
        sensitivity: "base",
      }) * dir;
    case "rarity": {
      const ia = CARD_RARITY_ORDER.indexOf(a.card.rarity);
      const ib = CARD_RARITY_ORDER.indexOf(b.card.rarity);
      return cmp(ia === -1 ? 99 : ia, ib === -1 ? 99 : ib);
    }
    case "genre":
      return (
        a.catalogGenreLabel.localeCompare(b.catalogGenreLabel, undefined, {
          sensitivity: "base",
        }) * dir
      );
    case "lineGenre":
      return (a.card.genre ?? "").localeCompare(b.card.genre ?? "", undefined, {
        sensitivity: "base",
      }) * dir;
    case "intensity":
      return cmp(
        intensityLevelIndex(a.catalogIntensity),
        intensityLevelIndex(b.catalogIntensity),
      );
    case "era":
      return a.catalogEra.localeCompare(b.catalogEra, undefined, {
        sensitivity: "base",
      }) * dir;
    case "series": {
      const s =
        a.catalogSeriesType.localeCompare(b.catalogSeriesType) * dir ||
        a.catalogSeriesLabel.localeCompare(b.catalogSeriesLabel, undefined, {
          sensitivity: "base",
        }) * dir ||
        cmp(a.catalogNumber, b.catalogNumber);
      return s;
    }
    case "catalogNo": {
      const s =
        a.catalogSeriesType.localeCompare(b.catalogSeriesType) * dir ||
        a.catalogSeriesLabel.localeCompare(b.catalogSeriesLabel, undefined, {
          sensitivity: "base",
        }) * dir ||
        cmp(a.catalogNumber, b.catalogNumber);
      return s;
    }
    default:
      return 0;
  }
}

function SortToggle({
  label,
  sortKey,
  activeKey,
  asc,
  onActivate,
}: {
  label: string;
  sortKey: SortKey;
  activeKey: SortKey;
  asc: boolean;
  onActivate: (key: SortKey) => void;
}) {
  const active = activeKey === sortKey;
  return (
    <div className="flex items-start justify-between gap-1">
      <span className="leading-snug pt-0.5">{label}</span>
      <button
        type="button"
        className={[sortBtnBase, active ? sortBtnActive : ""].join(" ")}
        aria-label={
          active
            ? `${label}: sorted ${asc ? "ascending" : "descending"}, click to reverse`
            : `Sort by ${label}`
        }
        aria-pressed={active}
        onClick={() => onActivate(sortKey)}
      >
        {active ? (asc ? "\u25B2" : "\u25BC") : "\u21C5"}
      </button>
    </div>
  );
}

export default function CatalogDeckTable({
  className = "",
}: {
  className?: string;
}) {
  const [filterKind, setFilterKind] = useState<string>("all");
  const [filterSeries, setFilterSeries] = useState<string>("all");
  const [filterGenre, setFilterGenre] = useState<string>("all");
  const [filterLineGenre, setFilterLineGenre] = useState<string>("all");
  const [filterCountry, setFilterCountry] = useState<string>("all");
  const [filterRarity, setFilterRarity] = useState<string>("all");
  const [filterIntensity, setFilterIntensity] = useState<string>("all");
  const [filterEra, setFilterEra] = useState<string>("all");
  const [titleQuery, setTitleQuery] = useState("");
  const [artistQuery, setArtistQuery] = useState("");
  const [abilityQuery, setAbilityQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortAsc, setSortAsc] = useState(true);

  const onActivateSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((a) => !a);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const clearAllFilters = () => {
    setFilterKind("all");
    setFilterSeries("all");
    setFilterGenre("all");
    setFilterLineGenre("all");
    setFilterCountry("all");
    setFilterRarity("all");
    setFilterIntensity("all");
    setFilterEra("all");
    setTitleQuery("");
    setArtistQuery("");
    setAbilityQuery("");
    setSortKey("id");
    setSortAsc(true);
  };

  const seriesOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const e of CATALOG_ENTRIES) {
      const value = `${e.catalogSeriesType}\t${e.catalogSeriesLabel}`;
      const label =
        e.catalogSeriesType === "country"
          ? `${e.catalogSeriesLabel} (country / region)`
          : `${e.catalogSeriesLabel} (genre)`;
      seen.set(value, label);
    }
    return [...seen.entries()]
      .sort(([, la], [, lb]) => la.localeCompare(lb, undefined, { sensitivity: "base" }))
      .map(([value, label]) => ({ value, label }));
  }, []);

  const eraFilterOptions = useMemo(() => {
    const s = new Set<string>();
    for (const e of CATALOG_ENTRIES) s.add(e.catalogEra);
    return [...s].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  }, []);

  const genreFilterOptions = useMemo(() => {
    const s = new Set<string>();
    for (const e of CATALOG_ENTRIES) s.add(e.catalogGenreLabel);
    return [...s].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  }, []);

  const lineGenreFilterOptions = useMemo(() => {
    const s = new Set<string>();
    for (const e of CATALOG_ENTRIES) {
      s.add(e.card.genre ?? "__empty__");
    }
    return [...s].sort((a, b) => {
      if (a === "__empty__") return -1;
      if (b === "__empty__") return 1;
      return a.localeCompare(b, undefined, { sensitivity: "base" });
    });
  }, []);

  const countryFilterOptions = useMemo(() => {
    const s = new Set<string>();
    for (const e of CATALOG_ENTRIES) {
      s.add(e.card.country ?? "__empty__");
    }
    return [...s].sort((a, b) => {
      if (a === "__empty__") return 1;
      if (b === "__empty__") return -1;
      return a.localeCompare(b, undefined, { sensitivity: "base" });
    });
  }, []);

  const visibleRows = useMemo(() => {
    let rows = CATALOG_ENTRIES;
    if (filterKind !== "all") rows = rows.filter((r) => r.kind === filterKind);
    if (filterSeries !== "all") {
      const [t, lab] = filterSeries.split("\t");
      rows = rows.filter(
        (r) => r.catalogSeriesType === t && r.catalogSeriesLabel === lab,
      );
    }
    if (filterGenre !== "all") {
      rows = rows.filter((r) => r.catalogGenreLabel === filterGenre);
    }
    if (filterLineGenre !== "all") {
      rows = rows.filter((r) =>
        filterLineGenre === "__empty__"
          ? !r.card.genre
          : r.card.genre === filterLineGenre,
      );
    }
    if (filterCountry !== "all") {
      rows = rows.filter((r) =>
        filterCountry === "__empty__"
          ? !r.card.country
          : r.card.country === filterCountry,
      );
    }
    if (filterRarity !== "all") {
      rows = rows.filter((r) => r.card.rarity === filterRarity);
    }
    if (filterIntensity !== "all") {
      rows = rows.filter((r) => r.catalogIntensity === filterIntensity);
    }
    if (filterEra !== "all") {
      rows = rows.filter((r) => r.catalogEra === filterEra);
    }
    const tq = titleQuery.trim().toLowerCase();
    if (tq) {
      rows = rows.filter((r) => r.card.title.toLowerCase().includes(tq));
    }
    const aq = artistQuery.trim().toLowerCase();
    if (aq) {
      rows = rows.filter((r) => (r.card.artist ?? "").toLowerCase().includes(aq));
    }
    const ab = abilityQuery.trim().toLowerCase();
    if (ab) {
      rows = rows.filter(
        (r) =>
          r.card.ability.toLowerCase().includes(ab) ||
          r.card.abilityDesc.toLowerCase().includes(ab),
      );
    }
    return [...rows].sort((a, b) => compareRows(a, b, sortKey, sortAsc));
  }, [
    filterKind,
    filterSeries,
    filterGenre,
    filterLineGenre,
    filterCountry,
    filterRarity,
    filterIntensity,
    filterEra,
    titleQuery,
    artistQuery,
    abilityQuery,
    sortKey,
    sortAsc,
  ]);

  return (
    <div className={className}>
      <div className="rounded-[6px] border border-ui-border bg-[#0f0f14]/35 overflow-x-auto">
        <table className="w-full min-w-[1280px] border-collapse text-left">
          <thead>
            <tr className="border-b border-ui-border">
              <th className={`${thWrap} w-[120px] pl-3`}>
                <div className="flex flex-col gap-1.5">
                  <span className="leading-snug">Preview</span>
                  <button
                    type="button"
                    className="text-[9px] font-mono tracking-wide text-muted hover:text-gold underline-offset-2 hover:underline text-left"
                    onClick={clearAllFilters}
                  >
                    Reset filters and sort
                  </button>
                </div>
              </th>
              <th className={`${thWrap} min-w-[104px]`}>
                <div className="flex flex-col gap-1">
                  <SortToggle
                    label="Country / region"
                    sortKey="country"
                    activeKey={sortKey}
                    asc={sortAsc}
                    onActivate={onActivateSort}
                  />
                  <select
                    className={selectBase}
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                    aria-label="Filter by country or region"
                  >
                    <option value="all">All countries</option>
                    {countryFilterOptions.map((c) => (
                      <option key={c} value={c}>
                        {c === "__empty__" ? "— (none)" : c}
                      </option>
                    ))}
                  </select>
                </div>
              </th>
              <th className={`${thWrap} min-w-[96px]`}>
                <div className="flex flex-col gap-1">
                  <SortToggle
                    label="App genre"
                    sortKey="genre"
                    activeKey={sortKey}
                    asc={sortAsc}
                    onActivate={onActivateSort}
                  />
                  <select
                    className={selectBase}
                    value={filterGenre}
                    onChange={(e) => setFilterGenre(e.target.value)}
                    aria-label="Filter by app / table genre"
                  >
                    <option value="all">All app genres</option>
                    {genreFilterOptions.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </th>
              <th className={`${thWrap} min-w-[100px]`}>
                <div className="flex flex-col gap-1">
                  <SortToggle
                    label="Genre"
                    sortKey="lineGenre"
                    activeKey={sortKey}
                    asc={sortAsc}
                    onActivate={onActivateSort}
                  />
                  <select
                    className={selectBase}
                    value={filterLineGenre}
                    onChange={(e) => setFilterLineGenre(e.target.value)}
                    aria-label="Filter by card genre line (subgenre or app genre)"
                  >
                    <option value="all">All</option>
                    {lineGenreFilterOptions.map((sg) => (
                      <option key={sg} value={sg}>
                        {sg === "__empty__" ? "— (none)" : sg}
                      </option>
                    ))}
                  </select>
                </div>
              </th>
              <th className={`${thWrap} min-w-[88px]`}>
                <div className="flex flex-col gap-1">
                  <SortToggle
                    label="Era"
                    sortKey="era"
                    activeKey={sortKey}
                    asc={sortAsc}
                    onActivate={onActivateSort}
                  />
                  <select
                    className={selectBase}
                    value={filterEra}
                    onChange={(e) => setFilterEra(e.target.value)}
                    aria-label="Filter by card era (season)"
                  >
                    <option value="all">All eras</option>
                    {eraFilterOptions.map((era) => (
                      <option key={era} value={era}>
                        {era}
                      </option>
                    ))}
                  </select>
                  <span className="text-[9px] text-muted/75 leading-tight mt-0.5">
                    Card season
                  </span>
                </div>
              </th>
              <th className={`${thWrap} w-[56px]`}>
                <SortToggle
                  label="№"
                  sortKey="catalogNo"
                  activeKey={sortKey}
                  asc={sortAsc}
                  onActivate={onActivateSort}
                />
              </th>
              <th className={`${thWrap} w-[56px]`}>
                <SortToggle
                  label="ID"
                  sortKey="id"
                  activeKey={sortKey}
                  asc={sortAsc}
                  onActivate={onActivateSort}
                />
              </th>
              <th className={`${thWrap} min-w-[108px]`}>
                <div className="flex flex-col gap-1">
                  <SortToggle
                    label="Series"
                    sortKey="series"
                    activeKey={sortKey}
                    asc={sortAsc}
                    onActivate={onActivateSort}
                  />
                  <select
                    className={selectBase}
                    value={filterSeries}
                    onChange={(e) => setFilterSeries(e.target.value)}
                    aria-label="Filter by series"
                  >
                    <option value="all">All series</option>
                    {seriesOptions.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </th>
              <th className={`${thWrap} min-w-[88px]`}>
                <div className="flex flex-col gap-1">
                  <SortToggle
                    label="Type"
                    sortKey="kind"
                    activeKey={sortKey}
                    asc={sortAsc}
                    onActivate={onActivateSort}
                  />
                  <select
                    className={selectBase}
                    value={filterKind}
                    onChange={(e) => setFilterKind(e.target.value)}
                    aria-label="Filter by card type"
                  >
                    <option value="all">All types</option>
                    {CATALOG_KINDS.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>
              </th>
              <th className={`${thWrap} min-w-[100px]`}>
                <div className="flex flex-col gap-1">
                  <SortToggle
                    label="Title"
                    sortKey="title"
                    activeKey={sortKey}
                    asc={sortAsc}
                    onActivate={onActivateSort}
                  />
                  <input
                    type="search"
                    placeholder="Contains…"
                    className={`${selectBase} placeholder:text-muted/70`}
                    value={titleQuery}
                    onChange={(e) => setTitleQuery(e.target.value)}
                    aria-label="Filter by title"
                  />
                </div>
              </th>
              <th className={`${thWrap} min-w-[100px]`}>
                <div className="flex flex-col gap-1">
                  <SortToggle
                    label="Artist"
                    sortKey="artist"
                    activeKey={sortKey}
                    asc={sortAsc}
                    onActivate={onActivateSort}
                  />
                  <input
                    type="search"
                    placeholder="Contains…"
                    className={`${selectBase} placeholder:text-muted/70`}
                    value={artistQuery}
                    onChange={(e) => setArtistQuery(e.target.value)}
                    aria-label="Filter artist name"
                  />
                </div>
              </th>
              <th className={`${thWrap} w-[64px]`}>
                <SortToggle
                  label="Year"
                  sortKey="year"
                  activeKey={sortKey}
                  asc={sortAsc}
                  onActivate={onActivateSort}
                />
              </th>
              <th className={`${thWrap} min-w-[96px]`}>
                <div className="flex flex-col gap-1">
                  <SortToggle
                    label="Intensity"
                    sortKey="intensity"
                    activeKey={sortKey}
                    asc={sortAsc}
                    onActivate={onActivateSort}
                  />
                  <select
                    className={selectBase}
                    value={filterIntensity}
                    onChange={(e) => setFilterIntensity(e.target.value)}
                    aria-label="Filter by intensity"
                  >
                    <option value="all">All levels</option>
                    {INTENSITY_VALUES.map((v) => (
                      <option key={v} value={v}>
                        {formatCatalogIntensity(v)}
                      </option>
                    ))}
                  </select>
                </div>
              </th>
              <th className={`${thWrap} w-[56px]`}>
                <SortToggle
                  label="Pop"
                  sortKey="pop"
                  activeKey={sortKey}
                  asc={sortAsc}
                  onActivate={onActivateSort}
                />
              </th>
              <th className={`${thWrap} min-w-[88px]`}>
                <div className="flex flex-col gap-1">
                  <SortToggle
                    label="Rarity"
                    sortKey="rarity"
                    activeKey={sortKey}
                    asc={sortAsc}
                    onActivate={onActivateSort}
                  />
                  <select
                    className={selectBase}
                    value={filterRarity}
                    onChange={(e) => setFilterRarity(e.target.value)}
                    aria-label="Filter by rarity"
                  >
                    <option value="all">All rarities</option>
                    {CARD_RARITY_ORDER.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </th>
              <th className={`${thWrap} min-w-[120px] pr-3`}>
                <div className="flex flex-col gap-1">
                  <span className="leading-snug">Ability</span>
                  <input
                    type="search"
                    placeholder="Contains…"
                    className={`${selectBase} max-w-none`}
                    value={abilityQuery}
                    onChange={(e) => setAbilityQuery(e.target.value)}
                    aria-label="Filter ability name or description"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="font-garamond text-[15px] text-white/95">
            {visibleRows.map(
              ({
                rowKey,
                kind,
                card,
                theme,
                catalogNumber,
                catalogSeriesType,
                catalogSeriesLabel,
                catalogGenreLabel,
                catalogIntensity,
                catalogEra,
              }) => (
                <tr
                  key={rowKey}
                  className="border-b border-ui-border/60 last:border-0 align-top"
                >
                  <td className="py-2 pl-2 pr-1">
                    {card.artwork ? (
                      <div
                        className="mx-auto flex justify-center"
                        style={{
                          width: 102,
                          height: 150,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            transform: "scale(0.58)",
                            transformOrigin: "top center",
                          }}
                        >
                          <Card
                            card={card}
                            theme={theme}
                            small
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="mx-auto flex justify-center items-center rounded border border-dashed border-ui-border/80 bg-[#12121a]/60 text-center px-1"
                        style={{ width: 102, height: 150 }}
                      >
                        <span className="font-garamond text-[11px] leading-snug text-muted">
                          No artwork
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="py-2.5 px-2 text-muted max-w-[120px] align-middle">
                    {card.country ?? "—"}
                  </td>
                  <td className="py-2.5 px-2 text-white/90 align-middle whitespace-nowrap">
                    {catalogGenreLabel}
                  </td>
                  <td className="py-2.5 px-2 text-muted max-w-[140px] align-middle">
                    {card.genre ?? "—"}
                  </td>
                  <td className="py-2.5 px-2 text-white/90 align-middle whitespace-nowrap font-mono text-[13px] tracking-wide">
                    {catalogEra}
                  </td>
                  <td className="py-2.5 px-2 font-mono text-[13px] text-gold tabular-nums align-middle">
                    {catalogNumber}
                  </td>
                  <td className="py-2.5 px-2 font-mono text-[13px] text-muted tabular-nums align-middle">
                    {card.id}
                  </td>
                  <td className="py-2.5 px-2 text-muted align-middle">
                    <div className="text-white/90">{catalogSeriesLabel}</div>
                    <div className="text-[11px] mt-0.5 opacity-80">
                      {catalogSeriesType === "country"
                        ? "by country / region"
                        : "by genre"}
                    </div>
                  </td>
                  <td className="py-2.5 px-2 text-muted whitespace-nowrap align-middle">
                    {kind}
                  </td>
                  <td className="py-2.5 px-2 align-middle">{card.title}</td>
                  <td className="py-2.5 px-2 text-muted align-middle">
                    {card.artist ?? "—"}
                  </td>
                  <td className="py-2.5 px-2 text-muted tabular-nums align-middle">
                    {card.year}
                  </td>
                  <td className="py-2.5 px-2 text-muted align-middle whitespace-nowrap">
                    {formatCatalogIntensity(catalogIntensity)}
                  </td>
                  <td className="py-2.5 px-2 text-muted tabular-nums align-middle">
                    {card.pop}
                  </td>
                  <td className="py-2.5 px-2 text-muted whitespace-nowrap align-middle">
                    {card.rarity}
                  </td>
                  <td className="py-2.5 pr-3 pl-2 text-muted max-w-[200px] align-middle">
                    {card.ability}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
      {visibleRows.length === 0 ? (
        <p className="font-garamond text-muted text-center mt-4 text-sm">
          No cards match the current filters.
        </p>
      ) : null}
    </div>
  );
}
