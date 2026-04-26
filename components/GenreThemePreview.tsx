"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import {
  appGenreIntensity,
  GENRE_NAMES,
  GENRE_THEMES,
  GENRE_THEME_NAV_EVENT,
  genreThemeSectionDomId,
  SUBGENRES,
  WORLD_THEMES,
  isCountrySubgenre,
  resolveThemeSelection,
  subgenreTheme,
} from "@/lib/genres";
import type { GenreName, GenreThemeNavigateDetail } from "@/lib/genres";
import Card, { type CardData, type GenreTheme } from "@/components/Card";
import IntensityGauge from "@/components/IntensityGauge";
import { DEFAULT_PREVIEW_CARD } from "@/lib/cards";

function isVeryLight(hex: string) {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (r * 299 + g * 587 + b * 114) / 1000;
  return luminance > 205;
}

/** World card flag frame — row strip or modal hero (no country text). */
function CountryFlagSwatch({
  theme,
  size,
}: {
  theme: GenreTheme;
  size: "row" | "panel";
}) {
  const flagLayer = theme.frameBorder;
  const flagBg = theme.frameBg;
  const rot = Boolean(theme.frameRotateR90 && (flagLayer || flagBg));

  if (rot && (flagBg ?? flagLayer)) {
    const src = (flagBg ?? flagLayer) as string;
    const outerW = size === "row" ? 52 : 220;
    const outerH = size === "row" ? 34 : 132;
    const innerW = size === "row" ? 120 : 280;
    const innerH = size === "row" ? 72 : 176;
    return (
      <div
        className="relative shrink-0 overflow-hidden rounded-[5px] border border-black/15 bg-[rgba(4,6,9,0.92)]"
        style={{ width: outerW, height: outerH }}
        aria-hidden
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: innerW,
            height: innerH,
            transform: "translate(-50%,-50%) rotate(-90deg)",
            backgroundImage: `linear-gradient(transparent,transparent), ${src}`,
            backgroundSize: "100% 100%, cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    );
  }

  if (!flagLayer) return null;

  const bw = size === "row" ? 5 : 14;
  const ow = size === "row" ? 48 : 200;
  const oh = size === "row" ? 28 : 112;
  return (
    <div
      className="shrink-0 rounded-[5px] border border-black/15 shadow-sm"
      style={{
        width: ow,
        height: oh,
        background: `linear-gradient(transparent, transparent) padding-box, ${flagLayer} border-box`,
        border: `${bw}px solid transparent`,
        backgroundClip: "padding-box, border-box",
        backgroundOrigin: "padding-box, border-box",
      }}
      aria-hidden
    />
  );
}

export default function GenreThemePreview() {
  const [card, setCard] = useState<CardData>({ ...DEFAULT_PREVIEW_CARD });
  const [theme, setTheme] = useState<GenreTheme>(GENRE_THEMES.Mainstream);
  const [selectedGenreLabel, setSelectedGenreLabel] =
    useState<string>("Mainstream");
  const [selectedRightLabel, setSelectedRightLabel] =
    useState<string>("Disco Pop");
  const [selectedGenreOnly, setSelectedGenreOnly] = useState<
    GenreName | undefined
  >("Mainstream");
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined,
  );
  const [selectedSubgenre, setSelectedSubgenre] = useState<string | undefined>(
    undefined,
  );
  const [worldModalCountry, setWorldModalCountry] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!worldModalCountry) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setWorldModalCountry(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [worldModalCountry]);

  const orderedGenres: GenreName[] = [
    "Mainstream",
    ...GENRE_NAMES.filter((name) => name !== "Mainstream"),
  ];
  /** `genre` is a canonical subgenre name or an app-level genre (e.g. World+genre). */
  const applyRulePreview = ({
    genre,
    country,
  }: {
    genre: string;
    country?: string;
  }) => {
    const resolved = resolveThemeSelection({ genre, country });
    setTheme(resolved.theme);
    setSelectedGenreLabel(resolved.leftLabel);
    setSelectedRightLabel(resolved.rightLabel);
    setCard({
      ...DEFAULT_PREVIEW_CARD,
      country: resolved.resolvedCountry,
      genre,
    });
  };

  const applyRulePreviewRef = useRef(applyRulePreview);
  useEffect(() => {
    applyRulePreviewRef.current = applyRulePreview;
  });

  useEffect(() => {
    const onWheelNavigate = (e: Event) => {
      const detail = (e as CustomEvent<GenreThemeNavigateDetail>).detail;
      if (!detail) return;
      const apply = applyRulePreviewRef.current;
      if (detail.kind === "genre") {
        const name = detail.genre;
        const subs = SUBGENRES.filter(
          (s) => s.parentA === name || s.parentB === name,
        );
        setSelectedCountry(undefined);
        setSelectedGenreOnly(name);
        const firstSubgenre = subs[0]?.n;
        if (!firstSubgenre) {
          setSelectedSubgenre(undefined);
          apply({ genre: name });
          return;
        }
        setSelectedSubgenre(firstSubgenre);
        apply({ genre: firstSubgenre });
        return;
      }
      const sub = SUBGENRES.find((s) => s.n === detail.subgenre);
      if (!sub) return;
      setSelectedCountry(undefined);
      setSelectedGenreOnly(undefined);
      setSelectedSubgenre(sub.n);
      apply({ genre: sub.n });
    };
    window.addEventListener(GENRE_THEME_NAV_EVENT, onWheelNavigate);
    return () =>
      window.removeEventListener(GENRE_THEME_NAV_EVENT, onWheelNavigate);
  }, []);

  return (
    <div className="w-full overflow-x-auto md:overflow-visible pb-2">
      <div className="flex gap-8 items-start min-w-[980px] md:min-w-0">
        {/* Sticky card preview */}
        <div className="shrink-0 flex flex-col items-center gap-2 self-start md:sticky md:top-[104px]">
          <div className="sm:hidden">
            <Card
              card={card}
              theme={theme}
              small
            />
          </div>
          <div className="hidden sm:block">
            <Card card={card} theme={theme} />
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
              <div
                key={name}
                id={genreThemeSectionDomId(name)}
                className="border border-ui-border rounded-[6px] overflow-hidden scroll-mt-28"
              >
                {/* Genre header — clickable */}
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-opacity hover:opacity-80"
                  style={{
                    borderLeft: `4px solid ${t.border}`,
                    background: "#ede4cc",
                  }}
                  onClick={() => {
                    const inThisGenre =
                      selectedGenreOnly === name ||
                      Boolean(
                        selectedSubgenre &&
                        subs.some((x) => x.n === selectedSubgenre),
                      );
                    if (selectedCountry && inThisGenre) {
                      setSelectedCountry(undefined);
                      setSelectedGenreOnly(name);
                      const sg =
                        selectedSubgenre &&
                        subs.some((x) => x.n === selectedSubgenre)
                          ? selectedSubgenre
                          : subs[0]?.n;
                      if (!sg) return;
                      setSelectedSubgenre(sg);
                      applyRulePreview({ genre: sg });
                      return;
                    }
                    setSelectedGenreOnly(name);
                    setSelectedCountry(undefined);
                    const firstSubgenre = subs[0]?.n;
                    if (!firstSubgenre) return;
                    setSelectedSubgenre(firstSubgenre);
                    applyRulePreview({ genre: firstSubgenre });
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
                    {name === "Mainstream" ? "Pop" : name}
                  </span>
                  <div className="flex items-center gap-2 ml-auto">
                    {(
                      [
                        ["border", t.border],
                        ["header", t.headerBg],
                        ["text", t.textMain],
                        ["muted", t.textBody],
                      ] as [string, string][]
                    ).map(([lbl, val]) => (
                      <div
                        key={lbl}
                        className="flex items-center gap-1"
                        title={`${lbl}: ${val}`}
                      >
                        <div
                          className="w-3 h-3 rounded-[2px] border border-black/10 shrink-0"
                          style={{ background: val }}
                        />
                        <span
                          className="font-mono text-[10px] hidden lg:inline"
                          style={{ color: "#8a7050" }}
                        >
                          {val}
                        </span>
                      </div>
                    ))}
                    <div
                      className="w-14 h-3 rounded-[2px] shrink-0"
                      style={{
                        background: `linear-gradient(to right, ${t.barPop[0]}, ${t.barPop[1]})`,
                      }}
                      title="barPop"
                    />
                    <div
                      className="w-14 h-3 rounded-[2px] shrink-0"
                      style={{
                        background: `linear-gradient(to right, ${t.barExp[0]}, ${t.barExp[1]})`,
                      }}
                      title="barExp"
                    />
                  </div>
                  <div className="w-[118px] shrink-0">
                    <IntensityGauge small intensity={appGenreIntensity(name)} />
                  </div>
                </button>

                {/* Subgenre rows — clickable */}
                {subs.length > 0 && (
                  <div className="divide-y divide-[#d8cca8] border-t border-[#d8cca8]">
                    {subs.map((s) => {
                      const d = subgenreTheme(s.color, t);
                      const parentLabel = s.parentB
                        ? `${s.parentA} + ${s.parentB}`
                        : s.intensity === "pop"
                          ? "Pop"
                          : s.parentA;
                      return (
                        <button
                          key={s.n}
                          className="w-full flex items-center gap-3 pl-9 pr-4 py-2 text-left transition-opacity hover:opacity-80"
                          style={{ background: "#f4edd8" }}
                          onClick={() => {
                            if (
                              selectedSubgenre === s.n &&
                              selectedCountry &&
                              !isCountrySubgenre(s.n)
                            ) {
                              setSelectedCountry(undefined);
                              setSelectedGenreOnly(undefined);
                              setSelectedSubgenre(s.n);
                              applyRulePreview({ genre: s.n });
                              return;
                            }
                            setSelectedGenreOnly(undefined);
                            setSelectedSubgenre(s.n);
                            applyRulePreview({ genre: s.n,
                              country: selectedCountry,
                            });
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
                          <span
                            className="font-garamond text-sm flex-1"
                            style={{ color: "#5a4a30" }}
                          >
                            {s.n}
                          </span>
                          <span
                            className="font-mono text-[10px] tracking-wide uppercase"
                            style={{ color: "#8a7050" }}
                          >
                            {parentLabel}
                          </span>
                          <span
                            className="font-mono text-xs"
                            style={{ color: "#8a7050" }}
                          >
                            {s.color}
                          </span>
                          <div className="flex items-center gap-1 ml-2 shrink-0">
                            {[d.headerBg, d.textMain, d.textBody].map(
                              (c, i) => (
                                <div
                                  key={i}
                                  className="w-3 h-3 rounded-[2px] border border-black/10"
                                  style={{ background: c }}
                                />
                              ),
                            )}
                            <div
                              className="w-10 h-3 rounded-[2px]"
                              style={{
                                background: `linear-gradient(to right, ${d.barPop[0]}, ${d.barPop[1]})`,
                              }}
                            />
                          </div>
                          <div className="w-[112px] shrink-0">
                            <IntensityGauge small intensity={s.intensity} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="section-title-sub mt-2 mb-1">World Themes</div>
          {Object.entries(WORLD_THEMES).map(([country, t]) => (
            <div
              key={country}
              className="border border-ui-border rounded-[6px] overflow-hidden"
            >
              <button
                type="button"
                className="w-full flex items-center justify-center gap-4 px-4 py-3 transition-opacity hover:opacity-80"
                style={{
                  borderLeft: `4px solid ${t.border}`,
                  background: "#ede4cc",
                }}
                aria-label={`Open ${country} — country subgenres and flag`}
                title={country}
                onClick={() => setWorldModalCountry(country)}
              >
                <span
                  className="shrink-0"
                  dangerouslySetInnerHTML={{
                    __html: t.icon.replace(/currentColor/g, t.border),
                  }}
                />
                <CountryFlagSwatch theme={t} size="row" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {worldModalCountry && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-200 flex items-center justify-center bg-black/55 p-4"
              role="presentation"
              onClick={() => setWorldModalCountry(null)}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="world-theme-modal-title"
                className="relative max-h-[min(90vh,640px)] w-full max-w-md overflow-y-auto rounded-lg border border-ui-border bg-surface p-5 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="absolute right-3 top-3 font-mono text-lg leading-none text-muted hover:text-white"
                  aria-label="Close"
                  onClick={() => setWorldModalCountry(null)}
                >
                  ×
                </button>
                <h2
                  id="world-theme-modal-title"
                  className="font-cinzel text-xl tracking-[3px] text-white pr-8 mb-4"
                >
                  {worldModalCountry}
                </h2>
                <div className="mb-6 flex justify-center">
                  <CountryFlagSwatch
                    theme={WORLD_THEMES[worldModalCountry]!}
                    size="panel"
                  />
                </div>
                <div className="font-mono text-[10px] tracking-wide text-muted uppercase mb-2">
                  Country-native subgenres
                </div>
                {(() => {
                  const countrySubs = SUBGENRES.filter(
                    (s) =>
                      s.kind === "country" &&
                      s.parentA === worldModalCountry,
                  );
                  if (countrySubs.length === 0) {
                    return (
                      <p className="font-garamond italic text-muted text-sm m-0">
                        No country-native subgenres listed for this country.
                      </p>
                    );
                  }
                  return (
                    <ul className="m-0 list-none p-0 flex flex-col gap-1">
                      {countrySubs.map((s) => (
                        <li key={s.n}>
                          <button
                            type="button"
                            className="w-full flex items-center gap-3 rounded-md border border-ui-border/80 bg-card/80 px-3 py-2.5 text-left transition-opacity hover:opacity-90"
                            onClick={() => {
                              setSelectedCountry(worldModalCountry);
                              setSelectedGenreOnly(undefined);
                              setSelectedSubgenre(s.n);
                              applyRulePreview({
                                genre: s.n,
                                country: worldModalCountry,
                              });
                              setWorldModalCountry(null);
                            }}
                          >
                            <div
                              className="h-3 w-3 shrink-0 rotate-45 rounded-[1px] border border-black/20"
                              style={{ background: s.color }}
                            />
                            <span className="font-garamond text-sm text-white/90 flex-1 min-w-0">
                              {s.n}
                            </span>
                            <span className="font-mono text-[10px] uppercase text-muted shrink-0">
                              {s.intensity}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  );
                })()}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
