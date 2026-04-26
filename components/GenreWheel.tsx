"use client";

import { useEffect, useRef } from "react";
import {
  GENRE_THEMES,
  GENRE_THEME_NAV_EVENT,
  genreThemeSectionDomId,
  WHEEL_GENRES,
  SUBGENRES,
  WORLD_THEMES,
} from "@/lib/genres";
import type { GenreName, GenreThemeNavigateDetail } from "@/lib/genres";

const CX = 620,
  CY = 620,
  R_POP_SUBGENRES = 200,
  R_POP_SOFT_LINE = R_POP_SUBGENRES + 100,
  R_SOFT_SUBGENRES = R_POP_SOFT_LINE + 100,
  R_SOFT_EXPERIMENTAL_LINE = R_SOFT_SUBGENRES + 100,
  R_EXPERIMENTAL_SUBGENRES = R_SOFT_EXPERIMENTAL_LINE + 100,
  R_EXPERIMENTAL_HARDCORE_LINE = R_EXPERIMENTAL_SUBGENRES + 100,
  R_HARDCORE_SUBGENRES = R_EXPERIMENTAL_HARDCORE_LINE + 100;

const WHEEL_TILE_SINGLE_CLICK_MS = 300;

function repeat(str: string, times: number) {
  return Array(times).fill(str).join(" · ") + " ·";
}

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const x = cx + Math.cos(rad) * r;
  const y = cy + Math.sin(rad) * r;
  return {
    x: Number(x.toFixed(4)),
    y: Number(y.toFixed(4)),
  };
}

function Rect({
  x,
  y,
  label,
  hex,
  small,
  navSectionGenre,
  navDetail,
}: {
  x: number;
  y: number;
  label: string;
  hex: string;
  small?: boolean;
  navSectionGenre: GenreName;
  navDetail: GenreThemeNavigateDetail;
}) {
  const w = small ? 120 : 160;
  const h = small ? 64 : 92;
  const fs = small ? 10.5 : 14;
  const fsh = small ? 8.5 : 11;
  const isDark = isLight(hex);
  const tc = isDark ? "rgba(10,10,10,.85)" : "rgba(255,255,255,.92)";
  const hc = isDark ? "rgba(10,10,10,.5)" : "rgba(255,255,255,.55)";
  const navTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (navTimer.current != null) clearTimeout(navTimer.current);
    },
    [],
  );

  const runNavigate = () => {
    const id = genreThemeSectionDomId(navSectionGenre);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.dispatchEvent(
      new CustomEvent<GenreThemeNavigateDetail>(GENRE_THEME_NAV_EVENT, {
        detail: navDetail,
      }),
    );
  };

  return (
    <g
      transform={`translate(${x},${y})`}
      style={{ cursor: "pointer" }}
      onClick={(e) => {
        if (e.detail !== 1) {
          if (navTimer.current != null) {
            clearTimeout(navTimer.current);
            navTimer.current = null;
          }
          return;
        }
        if (navTimer.current != null) clearTimeout(navTimer.current);
        navTimer.current = setTimeout(() => {
          navTimer.current = null;
          runNavigate();
        }, WHEEL_TILE_SINGLE_CLICK_MS);
      }}
      onDoubleClick={(e) => {
        e.preventDefault();
        if (navTimer.current != null) {
          clearTimeout(navTimer.current);
          navTimer.current = null;
        }
        void navigator.clipboard.writeText(hex);
      }}
    >
      <title>
        Click to jump to this theme in the list and update the preview. Double-click
        to copy the hex colour.
      </title>
      <rect
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        rx={4}
        fill={hex}
        filter={`drop-shadow(0 2px 8px ${hex}88)`}
      />
      <text
        x={0}
        y={-8}
        textAnchor="middle"
        fontFamily="Cinzel, serif"
        fontWeight={700}
        fontSize={fs}
        letterSpacing={1}
        fill={tc}
      >
        {label}
      </text>
      <text
        x={0}
        y={10}
        textAnchor="middle"
        fontFamily="Space Mono, monospace"
        fontSize={fsh}
        fill={hc}
      >
        {hex}
      </text>
    </g>
  );
}

function isLight(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

function genreAngle(genre?: string) {
  if (genre === "Mainstream") return -90;
  const idx = WHEEL_GENRES.findIndex((g) => g.n === genre);
  return (idx / WHEEL_GENRES.length) * 360 - 90;
}

export default function GenreWheel() {
  const popText = repeat("POP", 20);
  const softText1 = repeat("SOFT", 23);
  const softText2 = repeat("SOFT", 40);
  const expText = repeat("EXPERIMENTAL", 19);
  const exp2Text = repeat("EXPERIMENTAL", 26);
  const hardText = repeat("HARDCORE", 36);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 48,
        marginTop: 240,
        marginBottom: 240,
      }}
    >
      <svg
        width={1240}
        height={1240}
        viewBox="0 0 1240 1240"
        style={{ overflow: "visible", maxWidth: "100%" }}
      >
        <defs>
          <path
            id="arc-pop-soft-inner"
            d={`M ${CX},${CY - (R_POP_SOFT_LINE - 30)} A ${R_POP_SOFT_LINE - 30},${R_POP_SOFT_LINE - 30} 0 1,1 ${CX - 0.1},${CY - (R_POP_SOFT_LINE - 30)}`}
          />
          <path
            id="arc-pop-soft-outer"
            d={`M ${CX},${CY - (R_POP_SOFT_LINE + 20)} A ${R_POP_SOFT_LINE + 20},${R_POP_SOFT_LINE + 20} 0 1,1 ${CX - 0.1},${CY - (R_POP_SOFT_LINE + 20)}`}
          />
          <path
            id="arc-soft-experimental-inner"
            d={`M ${CX},${CY - (R_SOFT_EXPERIMENTAL_LINE - 30)} A ${R_SOFT_EXPERIMENTAL_LINE - 30},${R_SOFT_EXPERIMENTAL_LINE - 30} 0 1,1 ${CX - 0.1},${CY - (R_SOFT_EXPERIMENTAL_LINE - 30)}`}
          />
          <path
            id="arc-soft-experimental-outer"
            d={`M ${CX},${CY - (R_SOFT_EXPERIMENTAL_LINE + 20)} A ${R_SOFT_EXPERIMENTAL_LINE + 20},${R_SOFT_EXPERIMENTAL_LINE + 20} 0 1,1 ${CX - 0.1},${CY - (R_SOFT_EXPERIMENTAL_LINE + 20)}`}
          />
          <path
            id="arc-experimental-hardcore-inner"
            d={`M ${CX},${CY - (R_EXPERIMENTAL_HARDCORE_LINE - 30)} A ${R_EXPERIMENTAL_HARDCORE_LINE - 30},${R_EXPERIMENTAL_HARDCORE_LINE - 30} 0 1,1 ${CX - 0.1},${CY - (R_EXPERIMENTAL_HARDCORE_LINE - 30)}`}
          />
          <path
            id="arc-experimental-hardcore-outer"
            d={`M ${CX},${CY - (R_EXPERIMENTAL_HARDCORE_LINE + 30)} A ${R_EXPERIMENTAL_HARDCORE_LINE + 30},${R_EXPERIMENTAL_HARDCORE_LINE + 30} 0 1,1 ${CX - 0.1},${CY - (R_EXPERIMENTAL_HARDCORE_LINE + 30)}`}
          />
        </defs>

        {/* Mainstream text */}
        <circle
          cx={CX}
          cy={CY}
          r={R_SOFT_EXPERIMENTAL_LINE}
          fill="none"
          stroke="rgba(255,255,255,.14)"
          strokeWidth={1.5}
          strokeDasharray="4 6"
        />
        <text
          fontFamily="Cinzel, serif"
          fontSize={11}
          fill="rgba(255,255,255,.85)"
          letterSpacing={8}
        >
          <textPath href="#arc-pop-soft-inner" startOffset="0%" dy={16}>
            {popText}
          </textPath>
        </text>

        {/* Soft text — inner */}
        <circle
          cx={CX}
          cy={CY}
          r={R_POP_SOFT_LINE}
          fill="none"
          stroke="rgba(255,255,255,.14)"
          strokeWidth={1.5}
          strokeDasharray="4 6"
        />
        <text
          fontFamily="Cinzel, serif"
          fontSize={11}
          fill="rgba(255,255,255,.85)"
          letterSpacing={8}
        >
          <textPath href="#arc-pop-soft-outer" startOffset="0%" dy={16}>
            {softText1}
          </textPath>
        </text>

        {/* Soft text — outer */}
        <circle
          cx={CX}
          cy={CY}
          r={R_SOFT_EXPERIMENTAL_LINE}
          fill="none"
          stroke="rgba(255,255,255,.14)"
          strokeWidth={1.5}
          strokeDasharray="4 6"
        />
        <text
          fontFamily="Cinzel, serif"
          fontSize={11}
          fill="rgba(255,255,255,.85)"
          letterSpacing={8}
        >
          <textPath
            href="#arc-soft-experimental-inner"
            startOffset="0%"
            dy={16}
          >
            {softText2}
          </textPath>
        </text>

        {/* Experimental text — just outside inner circle */}
        <text
          fontFamily="Cinzel, serif"
          fontSize={10}
          fill="rgba(255, 255, 255, 0.69)"
          letterSpacing={5}
        >
          <textPath
            href="#arc-soft-experimental-outer"
            startOffset="0%"
            dy={16}
          >
            {expText}
          </textPath>
        </text>
        {/* Experimental text — just inside outer circle */}
        <text
          fontFamily="Cinzel, serif"
          fontSize={10}
          fill="rgba(255, 255, 255, 0.48)"
          letterSpacing={5}
        >
          <textPath
            href="#arc-experimental-hardcore-inner"
            startOffset="0%"
            dy={-8}
          >
            {exp2Text}
          </textPath>
        </text>

        {/* Hardcore circle + text — outside outer circle */}
        <circle
          cx={CX}
          cy={CY}
          r={R_EXPERIMENTAL_HARDCORE_LINE}
          fill="none"
          stroke="rgba(255, 255, 255, 0.37)"
          strokeWidth={1.5}
          strokeDasharray="4 6"
        />
        <text
          fontFamily="Cinzel, serif"
          fontSize={10}
          fill="rgba(255, 255, 255, 0.28)"
          letterSpacing={5}
        >
          <textPath
            href="#arc-experimental-hardcore-outer"
            startOffset="0%"
            dy={16}
          >
            {hardText}
          </textPath>
        </text>

        {/* Radial dividers between genre zones */}
        {WHEEL_GENRES.map((_, i) => {
          const angle = ((i + 0.5) / WHEEL_GENRES.length) * 360 - 90;
          const inner = polarToXY(CX, CY, 0, angle);
          const outer = polarToXY(
            CX,
            CY,
            R_EXPERIMENTAL_HARDCORE_LINE + 160,
            angle,
          );
          return (
            <line
              key={i}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="rgba(255, 255, 255, 0.26)"
              strokeWidth={1}
            />
          );
        })}

        {/* Base genres on pop/experimental line */}
        {WHEEL_GENRES.map((g, i) => {
          const angle = (i / WHEEL_GENRES.length) * 360 - 90;
          const { x, y } = polarToXY(CX, CY, R_SOFT_EXPERIMENTAL_LINE, angle);
          return (
            <Rect
              key={g.n}
              x={x}
              y={y}
              label={g.n}
              hex={g.color}
              navSectionGenre={g.n}
              navDetail={{ kind: "genre", genre: g.n }}
            />
          );
        })}
        <Rect
          x={CX}
          y={CY}
          label="Mainstream"
          hex={GENRE_THEMES.Mainstream.border}
          navSectionGenre="Mainstream"
          navDetail={{ kind: "genre", genre: "Mainstream" }}
        />

        {/* Subgenres by intensity: pop / soft / experimental / hardcore */}
        {SUBGENRES.map((s) => {
          if (s.parentA in WORLD_THEMES) return null;
          if (s.parentB && s.parentB in WORLD_THEMES) return null;
          if (!(s.parentA in GENRE_THEMES)) {
            throw new Error(
              `Subgenre "${s.n}" has non-global parentA "${s.parentA}" in GenreWheel`,
            );
          }
          if (s.parentB && !(s.parentB in GENRE_THEMES)) {
            throw new Error(
              `Subgenre "${s.n}" has non-global parentB "${s.parentB}" in GenreWheel`,
            );
          }
          let angle: number;
          if (s.angleDelta !== undefined) {
            angle = genreAngle(s.parentA) + s.angleDelta;
          } else if (s.parentA && s.parentB) {
            const aA = genreAngle(s.parentA);
            const aB = genreAngle(s.parentB);
            angle = aA + (aB - aA) * (s.t ?? 0.5);
          } else {
            angle = genreAngle(s.parentA);
          }
          const r =
            s.intensity === "pop"
              ? R_POP_SUBGENRES
              : s.intensity === "soft"
                ? R_SOFT_SUBGENRES
                : s.intensity === "hardcore"
                  ? R_HARDCORE_SUBGENRES
                  : R_EXPERIMENTAL_SUBGENRES;
          const { x, y } = polarToXY(CX, CY, r, angle);
          return (
            <Rect
              key={s.n}
              x={x}
              y={y}
              label={s.n}
              hex={s.color}
              small
              navSectionGenre={s.parentA as GenreName}
              navDetail={{ kind: "subgenre", subgenre: s.n }}
            />
          );
        })}
      </svg>
    </div>
  );
}
