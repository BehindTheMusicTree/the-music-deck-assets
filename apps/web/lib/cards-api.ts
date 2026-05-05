import { cacheLife, cacheTag } from "next/cache";
import type { CardSongIndex } from "@/lib/cards/song-graph";
import type { ApiCardJson } from "@/lib/deck-from-api";
import type { GenreTheme } from "@/lib/card-theme-types";

type SongIndexApiRow = {
  id: number;
  title: string;
  artist?: string;
  genre?: string;
  artworkUrl?: string;
  printedSetId?: string;
  songsOut: number[];
};

export type GenreTaxonomyEntry = {
  id: number;
  name: string;
  parentId?: number;
  parentBId?: number;
  isCountry: boolean;
  kind: "COUNTRY_ROOT" | "COUNTRY_SUB_GENRE" | "GENRE_ROOT" | "SUB_GENRE";
  intensity?: "POP" | "SOFT" | "EXPERIMENTAL" | "HARDCORE";
  printedTypeCode?: string;
  displayLabel?: string;
  theme?: GenreTheme;
  updatedAt: string;
};

export type GenreTaxonomyResponse = {
  taxonomyVersion: string;
  updatedAt: string;
  entries: GenreTaxonomyEntry[];
};

function apiOrigin(): string {
  const base = process.env.BACKEND_URL;
  if (!base?.trim()) {
    throw new Error("BACKEND_URL is not set");
  }
  return base.replace(/\/+$/, "");
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${apiOrigin()}${path}`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function getShippedCatalogCards(): Promise<ApiCardJson[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("cards", "cards:catalog");
  return fetchJson<ApiCardJson[]>("/cards/catalog");
}

export async function getWishlistCards(): Promise<ApiCardJson[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("cards", "cards:wishlist");
  return fetchJson<ApiCardJson[]>("/cards/wishlist");
}

export async function getCatalogSongIndex(): Promise<CardSongIndex> {
  "use cache";
  cacheLife("hours");
  cacheTag("cards", "cards:track-index");
  const raw =
    await fetchJson<Record<string, SongIndexApiRow>>("/cards/track-index");
  const out: CardSongIndex = {};
  for (const [key, row] of Object.entries(raw)) {
    const id = Number(key);
    out[id] = {
      id: row.id,
      title: row.title,
      artist: row.artist,
      genre: row.genre ?? "",
      artwork: row.artworkUrl,
      artworkUrl: row.artworkUrl,
      printedSetId: row.printedSetId,
      songsOut: row.songsOut ?? [],
    };
  }
  return out;
}

export async function listCards(
  query?: Record<string, string>,
): Promise<ApiCardJson[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("cards", "cards:list");
  const qs = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";
  return fetchJson<ApiCardJson[]>(`/cards${qs}`);
}

export async function getGenreTaxonomy(): Promise<GenreTaxonomyResponse> {
  "use cache";
  cacheLife("hours");
  cacheTag("cards", "cards:genres");
  return fetchJson<GenreTaxonomyResponse>("/cards/genres");
}
