"use client";

import { useEffect, useState } from "react";
import { scrollToCardsSection } from "@/lib/cards-nav-scroll";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "genre-wheel", label: "Wheel" },
  { id: "genre-transitions", label: "Transitions" },
  { id: "genre-mashup", label: "Mashup" },
  { id: "world-genres", label: "World" },
  { id: "genre-intensity", label: "Intensity" },
  { id: "genre-themes", label: "Themes" },
  { id: "associations", label: "Associations" },
] as const;

export default function GenreSubTabs() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-20% 0px -70% 0px" },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <nav className="sticky top-[56px] z-40 bg-bg/90 backdrop-blur-sm border-b border-ui-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-0 -mx-1 overflow-x-auto [&::-webkit-scrollbar]:h-0">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(id);
                const nav = (e.currentTarget as HTMLElement).closest("nav");
                if (!el) return;
                scrollToCardsSection(el, nav);
              }}
              className={[
                "tab-font-13 whitespace-nowrap font-mono tracking-[0.12em] px-2.5 sm:px-3 py-2 no-underline border-b-2 -mb-px transition-colors",
                active === id
                  ? "text-gold border-gold"
                  : "text-muted border-transparent hover:text-white hover:border-ui-border",
              ].join(" ")}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
