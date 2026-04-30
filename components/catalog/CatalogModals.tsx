"use client";

import CatalogCard from "@/components/catalog/CatalogCard";
import {
  type CatalogEntry,
  CATALOG_CARD_TRACK_INDEX,
  deriveTracksInFromTrackIndex,
  formatCatalogIntensity,
} from "@/lib/cards";

const CATALOG_CARD_NATIVE_W = 272;
const CATALOG_CARD_NATIVE_H = 400;
const CATALOG_DETAIL_CARD_SCALE = 2;
const CATALOG_DETAIL_CARD_BOX_W =
  CATALOG_CARD_NATIVE_W * CATALOG_DETAIL_CARD_SCALE;
const CATALOG_DETAIL_CARD_BOX_H =
  CATALOG_CARD_NATIVE_H * CATALOG_DETAIL_CARD_SCALE;

function artworkBasename(artworkUrl: string | undefined): string {
  if (!artworkUrl) return "";
  const parts = artworkUrl.split("/");
  return parts[parts.length - 1] ?? artworkUrl;
}

function formatArtworkCreatedAtDisplay(raw: string): string {
  const s = raw.trim();
  const dt = s.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (dt) {
    const [, year, month, day, hour, minute, second] = dt;
    return `${day}/${month}/${year} ${hour}:${minute}:${second ?? "00"}`;
  }
  const d = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (d) {
    const [, year, month, day] = d;
    return `${day}/${month}/${year}`;
  }
  return s;
}

function trackRefsLabel(
  ids: number[] | undefined,
  byId: Record<number, { title: string; artist?: string }>,
): string {
  if (!ids || ids.length === 0) return "—";
  return ids
    .map((id) => {
      const t = byId[id];
      if (!t) return String(id);
      const artist = t.artist?.trim();
      return `${id} · ${t.title}${artist ? ` — ${artist}` : ""}`;
    })
    .join(" | ");
}

export function CatalogEntryDetailModal({
  entry,
  onClose,
  onOpenArtworkPrompt,
  effectiveArtworkPrompt,
}: {
  entry: CatalogEntry | null;
  onClose: () => void;
  onOpenArtworkPrompt: (text: string) => void;
  effectiveArtworkPrompt: (card: CatalogEntry["card"]) => string;
}) {
  if (entry === null) return null;

  const c = entry.card;
  const detailLine = (label: string, value: string) => (
    <div className="grid grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] gap-x-3 gap-y-1 text-[13px] sm:text-[14px]">
      <dt className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.12em] text-muted uppercase shrink-0 pt-0.5">
        {label}
      </dt>
      <dd className="font-garamond text-white/90 min-w-0 wrap-break-word m-0">
        {value}
      </dd>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center sm:items-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalog-entry-detail-title"
      onClick={onClose}
    >
      <div
        className="max-w-5xl w-full my-4 sm:my-8 rounded-lg border border-ui-border bg-[#12121a] p-5 sm:p-6 shadow-xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div
            className="shrink-0 mx-auto lg:mx-0 bg-[#0a0a0e]"
            style={{
              width: CATALOG_DETAIL_CARD_BOX_W,
              height: CATALOG_DETAIL_CARD_BOX_H,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                width: CATALOG_CARD_NATIVE_W,
                height: CATALOG_CARD_NATIVE_H,
                transform: "translateX(-50%) scale(2)",
                transformOrigin: "top center",
              }}
            >
              <CatalogCard
                card={c}
                theme={entry.theme}
                enableZoom={false}
                hoverLift={false}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0 w-full">
            <h2
              id="catalog-entry-detail-title"
              className="font-cinzel text-sm sm:text-base tracking-[0.14em] text-gold mb-1"
            >
              {c.title}
            </h2>
            <p className="font-garamond text-muted text-[15px] mb-5">
              {c.artist ?? "—"} · {c.year}
            </p>
            <dl className="flex flex-col gap-2.5 mb-6">
              {detailLine("Catalogue №", String(entry.catalogNumber))}
              {detailLine("Card ID", String(c.id))}
              {detailLine("Era", entry.catalogEra)}
              {detailLine("Series", entry.catalogSeriesLabel)}
              {detailLine(
                "Series bucket",
                entry.catalogSeriesType === "country"
                  ? "By country / region"
                  : "By genre",
              )}
              {detailLine("Type", entry.kind)}
              {detailLine("App genre", entry.catalogGenreLabel)}
              {detailLine("Genre line", c.genre ?? "—")}
              {detailLine("Country / region", c.country ?? "—")}
              {detailLine(
                "Tracks in",
                trackRefsLabel(
                  deriveTracksInFromTrackIndex(CATALOG_CARD_TRACK_INDEX, c.id),
                  CATALOG_CARD_TRACK_INDEX,
                ),
              )}
              {detailLine(
                "Tracks out",
                trackRefsLabel(
                  CATALOG_CARD_TRACK_INDEX[c.id]?.tracksOut,
                  CATALOG_CARD_TRACK_INDEX,
                ),
              )}
              {detailLine("Intensity", formatCatalogIntensity(entry.catalogIntensity))}
              {detailLine("Popularity", String(c.pop))}
              {detailLine("Rarity", c.rarity)}
              {detailLine(
                "Artwork file",
                c.artwork ? artworkBasename(c.artwork) : "—",
              )}
              {detailLine(
                "Art created",
                c.artworkCreatedAt?.trim()
                  ? formatArtworkCreatedAtDisplay(c.artworkCreatedAt.trim())
                  : "—",
              )}
            </dl>
            <div className="rounded-md border border-ui-border/80 bg-[#0f0f14]/40 px-3 py-3">
              <div className="font-cinzel text-[10px] tracking-[0.14em] text-gold mb-1">
                Ability
              </div>
              <p className="font-garamond text-white/95 text-[15px] m-0">
                {c.ability}
              </p>
              <p className="font-garamond text-muted text-[13px] leading-relaxed mt-2 m-0">
                {c.abilityDesc}
              </p>
            </div>
            {effectiveArtworkPrompt(c) ? (
              <button
                type="button"
                className="mt-4 font-garamond text-left text-[13px] text-gold/95 hover:underline underline-offset-2"
                onClick={() => onOpenArtworkPrompt(effectiveArtworkPrompt(c))}
              >
                View full artwork prompt
              </button>
            ) : null}
          </div>
        </div>
        <button
          type="button"
          className="mt-8 font-mono text-[12px] tracking-wide text-gold border border-ui-border rounded px-4 py-2 hover:bg-white/5 w-full sm:w-auto"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export function CatalogArtworkPromptModal({
  text,
  onClose,
}: {
  text: string | null;
  onClose: () => void;
}) {
  if (text === null) return null;
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalog-artwork-prompt-title"
      onClick={onClose}
    >
      <div
        className="max-w-2xl w-full max-h-[min(85vh,800px)] overflow-y-auto rounded-lg border border-ui-border bg-[#12121a] p-5 sm:p-6 shadow-xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="catalog-artwork-prompt-title"
          className="font-cinzel text-xs sm:text-sm tracking-[0.18em] text-gold mb-4"
        >
          Artwork prompt
        </h2>
        <div className="font-garamond sm:text-[15px] text-white/90 whitespace-pre-wrap wrap-break-word leading-relaxed">
          {text}
        </div>
        <button
          type="button"
          className="mt-6 font-mono tracking-wide text-gold border border-ui-border rounded px-4 py-2 hover:bg-white/5"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
