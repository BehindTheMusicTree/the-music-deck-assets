"use client";

import { useState } from "react";
import {
  APP_GENRE_THEMES,
  GENRE_NAMES,
  GENRE_THEMES,
  SUBGENRES,
  WORLD_THEMES,
  resolveThemeSelection,
  subgenreTheme,
} from "@/lib/genres";
import type { GenreName } from "@/lib/genres";
import Card, { type CardData, type GenreTheme } from "@/components/Card";

const BASE_CARD: CardData = {
  id: 9000,
  title: "Preview Track",
  artist: "Artist",
  year: 2024,
  subgenre: "Disco Pop",
  ability: "Preview",
  abilityDesc: "Live preview of the selected genre or subgenre theme.",
  power: 80,
  pop: 75,
  exp: 60,
  rarity: "Epic",
  artwork: "/cards/artworks/examples/artwork.example-bohemian-rhapsody-v2.png",
};

function isVeryLight(hex: string) {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (r * 299 + g * 587 + b * 114) / 1000;
  return luminance > 205;
}

export default function GenreThemePreview() {
  const [card, setCard] = useState<CardData>({ ...BASE_CARD });
  const [theme, setTheme] = useState<GenreTheme>(GENRE_THEMES.Mainstream);
  const [selectedGenreLabel, setSelectedGenreLabel] = useState<string>("Mainstream");
  const [selectedRightLabel, setSelectedRightLabel] = useState<string>("Disco Pop");
  const [selectedGenreForCard, setSelectedGenreForCard] = useState<string | undefined>(
    undefined,
  );
  const [selectedGenreOnly, setSelectedGenreOnly] = useState<GenreName | undefined>(
    "Mainstream",
  );
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined,
  );
  const [selectedSubgenre, setSelectedSubgenre] = useState<string | undefined>(
    undefined,
  );
  const orderedGenres: GenreName[] = [
    "Mainstream",
    ...GENRE_NAMES.filter((name) => name !== "Mainstream"),
  ];
  const worldCountries = Object.keys(WORLD_THEMES);

  const applyRulePreview = ({
    subgenre,
    country,
    genre,
  }: {
    subgenre?: string;
    country?: string;
    genre?: GenreName;
  }) => {
    const resolved = resolveThemeSelection({ genre, subgenre, country });
    setTheme(resolved.theme);
    setSelectedGenreLabel(resolved.leftLabel);
    setSelectedRightLabel(resolved.rightLabel);
    setSelectedGenreForCard(resolved.resolvedGenre);
    setCard({
      ...BASE_CARD,
      country: resolved.resolvedCountry,
      subgenre: resolved.resolvedSubgenre,
      flagStyle: resolved.flagStyle,
      fadeColor: resolved.fadeColor,
      typeStripPrimaryBorder: resolved.typeStripPrimaryBorder,
      typeStripSubBorder: resolved.typeStripSubBorder,
    });
  };

  return (
    <div className="w-full overflow-x-auto md:overflow-visible pb-2">
      <div className="flex gap-8 items-start min-w-[980px] md:min-w-0">
        {/* Sticky card preview */}
        <div className="shrink-0 flex flex-col items-center gap-2 self-start md:sticky md:top-[104px]">
          <div className="sm:hidden">
            <Card card={card} theme={theme} small genreName={selectedGenreForCard} />
          </div>
          <div className="hidden sm:block">
            <Card card={card} theme={theme} genreName={selectedGenreForCard} />
          </div>
          <div className="font-mono text-[10px] tracking-[1px] text-muted">
            {`${selectedGenreLabel} · ${selectedRightLabel}`}
          </div>
        </div>

        {/* Genre themes table */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          {orderedGenres.map((name) => {
            const t = GENRE_THEMES[name];
            const subs = SUBGENRES.filter(
              (s) => s.parentA === name || s.parentB === name,
            );

            return (
              <div key={name} className="border border-ui-border rounded-[6px] overflow-hidden">
                {/* Genre header — clickable */}
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-opacity hover:opacity-80"
                  style={{ borderLeft: `4px solid ${t.border}`, background: "#ede4cc" }}
                  onClick={() => {
                    setSelectedGenreOnly(name);
                    setSelectedCountry(undefined);
                    const firstSubgenre = subs[0]?.n;
                    if (!firstSubgenre) return;
                    setSelectedSubgenre(firstSubgenre);
                    applyRulePreview({ subgenre: firstSubgenre });
                  }}
                >
                  <span
                    className="shrink-0"
                    dangerouslySetInnerHTML={{ __html: t.icon.replace(/currentColor/g, t.border) }}
                  />
                  <span className="font-cinzel text-sm tracking-[2px]" style={{ color: "#2e2010" }}>{name}</span>
                  <div className="flex items-center gap-2 ml-auto">
                    {([["border", t.border], ["header", t.headerBg], ["text", t.textMain], ["muted", t.textBody]] as [string, string][]).map(([lbl, val]) => (
                      <div key={lbl} className="flex items-center gap-1" title={`${lbl}: ${val}`}>
                        <div className="w-3 h-3 rounded-[2px] border border-black/10 shrink-0" style={{ background: val }} />
                        <span className="font-mono text-[10px] hidden lg:inline" style={{ color: "#8a7050" }}>{val}</span>
                      </div>
                    ))}
                    <div className="w-14 h-3 rounded-[2px] shrink-0" style={{ background: `linear-gradient(to right, ${t.barPop[0]}, ${t.barPop[1]})` }} title="barPop" />
                    <div className="w-14 h-3 rounded-[2px] shrink-0" style={{ background: `linear-gradient(to right, ${t.barExp[0]}, ${t.barExp[1]})` }} title="barExp" />
                  </div>
                </button>

                {/* Subgenre rows — clickable */}
                {subs.length > 0 && (
                  <div className="divide-y divide-[#d8cca8] border-t border-[#d8cca8]">
                    {subs.map((s) => {
                      const d = subgenreTheme(s.color, t);
                      const parentLabel = s.parentB
                        ? `${s.parentA} + ${s.parentB}`
                        : s.parentA;
                      return (
                        <button
                          key={s.n}
                          className="w-full flex items-center gap-3 pl-9 pr-4 py-2 text-left transition-opacity hover:opacity-80"
                          style={{ background: "#f4edd8" }}
                          onClick={() => {
                            setSelectedGenreOnly(undefined);
                            setSelectedSubgenre(s.n);
                            applyRulePreview({ subgenre: s.n, country: selectedCountry });
                          }}
                        >
                          <div
                            className="w-3 h-3 shrink-0 rotate-45 rounded-[1px] box-border"
                            style={{
                              background: s.color,
                              border: isVeryLight(s.color)
                                ? "1px solid rgba(20, 16, 10, 0.45)"
                                : "none",
                            }}
                          />
                          <span className="font-garamond text-sm flex-1" style={{ color: "#5a4a30" }}>{s.n}</span>
                          <span className="font-mono text-[10px] tracking-wide uppercase" style={{ color: "#8a7050" }}>
                            {parentLabel}
                          </span>
                          <span className="font-mono text-[10px] tracking-wide uppercase" style={{ color: "#a89060" }}>{s.intensity}</span>
                          <span className="font-mono text-xs" style={{ color: "#8a7050" }}>{s.color}</span>
                          <div className="flex items-center gap-1 ml-2 shrink-0">
                            {[d.headerBg, d.textMain, d.textBody].map((c, i) => (
                              <div key={i} className="w-3 h-3 rounded-[2px] border border-black/10" style={{ background: c }} />
                            ))}
                            <div className="w-10 h-3 rounded-[2px]" style={{ background: `linear-gradient(to right, ${d.barPop[0]}, ${d.barPop[1]})` }} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="font-mono text-[11px] tracking-[2px] text-muted uppercase mt-2 mb-1 opacity-70">
            World Themes
          </div>
          {Object.entries(WORLD_THEMES).map(([country, t]) => (
            <div
              key={country}
              className="border border-ui-border rounded-[6px] overflow-hidden"
            >
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-opacity hover:opacity-80"
                style={{ borderLeft: `4px solid ${t.border}`, background: "#ede4cc" }}
                onClick={() => {
                  setSelectedCountry(country);
                  if (selectedSubgenre) {
                    applyRulePreview({ subgenre: selectedSubgenre, country });
                    return;
                  }
                  if (selectedGenreOnly) {
                    applyRulePreview({ genre: selectedGenreOnly, country });
                    return;
                  }
                  const firstCountrySubgenre = SUBGENRES.find(
                    (s) => s.kind === "country" && s.parentA === country,
                  )?.n;
                  if (!firstCountrySubgenre) return;
                  setSelectedSubgenre(firstCountrySubgenre);
                  applyRulePreview({ subgenre: firstCountrySubgenre, country });
                }}
              >
                <span
                  className="shrink-0"
                  dangerouslySetInnerHTML={{
                    __html: t.icon.replace(/currentColor/g, t.border),
                  }}
                />
                <span
                  className="font-cinzel text-sm tracking-[2px]"
                  style={{ color: "#2e2010" }}
                >
                  {country}
                </span>
                <span
                  className="font-mono text-[10px] tracking-wide uppercase ml-auto"
                  style={{ color: "#8a7050" }}
                >
                  Country / Region
                </span>
                <div className="w-3 h-3 rounded-[2px] border border-black/10 shrink-0" style={{ background: t.border }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
