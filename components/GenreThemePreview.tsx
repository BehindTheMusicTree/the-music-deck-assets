"use client";

import { useState } from "react";
import { GENRE_NAMES, GENRE_THEMES, SUBGENRES, subgenreTheme } from "@/lib/genres";
import Card, { type CardData, type GenreTheme } from "@/components/Card";

const BASE_CARD: CardData = {
  id: 9000,
  title: "Preview Track",
  artist: "Artist",
  year: 2024,
  genre: "Rock",
  subgenre: "",
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
  const [theme, setTheme] = useState<GenreTheme>(GENRE_THEMES.Rock);

  return (
    <div className="flex gap-8 items-start w-full">
      {/* Sticky card preview */}
      <div className="sticky top-[104px] shrink-0 flex flex-col items-center gap-2">
        <Card card={card} theme={theme} />
        <div className="font-mono text-[10px] tracking-[1px] text-muted">
          {card.genre}{card.subgenre ? ` · ${card.subgenre}` : ""}
        </div>
      </div>

      {/* Genre themes table */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {GENRE_NAMES.map((name) => {
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
                  setTheme(t);
                  setCard({ ...BASE_CARD, genre: name, subgenre: "" });
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
                          setTheme(t);
                          setCard({ ...BASE_CARD, genre: name, subgenre: s.n });
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
      </div>
    </div>
  );
}
