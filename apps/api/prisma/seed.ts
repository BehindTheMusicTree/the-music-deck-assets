/** Catalog seed — `rowKey` = slugified `title-year`; see ./README.md */
import { basename } from "node:path";
import { PrismaClient } from "@prisma/client";
import {
  APP_GENRE_NAMES,
  assignCatalogRowKeys,
  type CardData,
  type WishlistCardDef,
} from "@repo/cards-domain";
import { seedGenres } from "./seed-data/genre-taxonomy";
import { ALL_GENRE_CARDS } from "./seed-data/genre";
import { WORLD_FLAG_CARDS, WORLD_MIXED_CARDS } from "./seed-data/world";
import { LA_MACARENA_CARD } from "./seed-data/la-macarena";
import { WISHLIST_CARD_DEFS } from "./seed-data/catalog-wishlist-defs";
import { WIKIPEDIA_URLS } from "./seed-data/wikipedia-urls";
import { STREAMING_URLS } from "./seed-data/streaming-urls";

const prisma = new PrismaClient();

type ShippedRow = { card: CardData; rowKey: string };
type WishlistRow = { def: WishlistCardDef; rowKey: string };
type TransitionRow = {
  id: number;
  rowKey: string;
  title: string;
  genre: string | null;
};

function shippedCards(): CardData[] {
  return [
    ...ALL_GENRE_CARDS,
    ...WORLD_FLAG_CARDS,
    ...WORLD_MIXED_CARDS,
    LA_MACARENA_CARD,
  ];
}

function maxShippedDeckId(cards: CardData[]): number {
  return cards.reduce((max, c) => (c.id < 1000 ? Math.max(max, c.id) : max), 0);
}

function compactWishlistDefs(
  defs: WishlistCardDef[],
  cards: CardData[],
): WishlistCardDef[] {
  let nextId = maxShippedDeckId(cards) + 1;
  const used = new Set(cards.map((c) => c.id));
  return defs.map((def) => {
    while (used.has(nextId)) nextId += 1;
    const id = nextId;
    nextId += 1;
    used.add(id);
    return { ...def, id };
  });
}

function collectRows(): { shipped: ShippedRow[]; wishlist: WishlistRow[] } {
  const shipped = shippedCards();
  const compactWishlist = compactWishlistDefs(WISHLIST_CARD_DEFS, shipped);
  const all = [
    ...shipped.map((c) => ({ id: c.id, title: c.title, year: c.year })),
    ...compactWishlist.map((d) => ({ id: d.id, title: d.title, year: d.year })),
  ];
  const rowKeyMap = assignCatalogRowKeys(all);

  return {
    shipped: shipped.map((card) => ({ card, rowKey: rowKeyMap.get(card.id)! })),
    wishlist: compactWishlist.map((def) => ({
      def,
      rowKey: rowKeyMap.get(def.id)!,
    })),
  };
}

function collectTransitionRows(shipped: ShippedRow[], wishlist: WishlistRow[]): TransitionRow[] {
  let nextId =
    Math.max(
      0,
      ...shipped.map((r) => r.card.id),
      ...wishlist.map((r) => r.def.id),
    ) + 1;

  return APP_GENRE_NAMES.map((genre) => {
    const id = nextId;
    nextId += 1;
    return {
      id,
      rowKey: `transition-${genre.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      title: `${genre} Transition`,
      genre,
    };
  });
}

function artworkKeyFromCard(card: CardData): string | null {
  if (!card.artwork) return null;
  return `deck/${basename(card.artwork)}`;
}

function dateFromArtworkCreatedAt(value: string | undefined): Date | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

async function upsertShipped(row: ShippedRow): Promise<void> {
  const { card, rowKey } = row;
  const genreRow = card.genre
    ? await prisma.genre.findUnique({
        where: { name: card.genre },
        select: { id: true },
      })
    : null;

  await prisma.song.upsert({
    where: { id: card.id },
    create: {
      id: card.id,
      rowKey,
      title: card.title,
      artist: card.artist ?? null,
      year: card.year,
      genre: card.genre,
      genreId: genreRow?.id ?? null,
      country: card.country ?? null,
      ability: card.ability,
      abilityDesc: card.abilityDesc,
      pop: card.pop,
      rarity: card.rarity,
      catalogNumber: card.catalogNumber ?? null,
      artworkKey: artworkKeyFromCard(card),
      artworkContentType: card.artwork ? "image/png" : null,
      artworkOffsetY: card.artworkOffsetY ?? null,
      artworkOverBorder: card.artworkOverBorder ?? false,
      artworkCreatedAt: dateFromArtworkCreatedAt(card.artworkCreatedAt),
      artworkPrompt: card.artworkPrompt ?? null,
      wikipediaUrl: WIKIPEDIA_URLS[card.id] ?? null,
      spotifyUrl: STREAMING_URLS[card.id]?.spotifyUrl ?? null,
      appleMusicUrl: STREAMING_URLS[card.id]?.appleMusicUrl ?? null,
      youtubeUrl: STREAMING_URLS[card.id]?.youtubeUrl ?? null,
      bandcampUrl: STREAMING_URLS[card.id]?.bandcampUrl ?? null,
      soundcloudUrl: STREAMING_URLS[card.id]?.soundcloudUrl ?? null,
    },
    update: {
      rowKey,
      title: card.title,
      artist: card.artist ?? null,
      year: card.year,
      genre: card.genre,
      genreId: genreRow?.id ?? null,
      country: card.country ?? null,
      ability: card.ability,
      abilityDesc: card.abilityDesc,
      pop: card.pop,
      rarity: card.rarity,
      catalogNumber: card.catalogNumber ?? null,
      artworkKey: artworkKeyFromCard(card),
      artworkContentType: card.artwork ? "image/png" : null,
      artworkOffsetY: card.artworkOffsetY ?? null,
      artworkOverBorder: card.artworkOverBorder ?? false,
      artworkCreatedAt: dateFromArtworkCreatedAt(card.artworkCreatedAt),
      artworkPrompt: card.artworkPrompt ?? null,
      wikipediaUrl: WIKIPEDIA_URLS[card.id] ?? null,
      spotifyUrl: STREAMING_URLS[card.id]?.spotifyUrl ?? null,
      appleMusicUrl: STREAMING_URLS[card.id]?.appleMusicUrl ?? null,
      youtubeUrl: STREAMING_URLS[card.id]?.youtubeUrl ?? null,
      bandcampUrl: STREAMING_URLS[card.id]?.bandcampUrl ?? null,
      soundcloudUrl: STREAMING_URLS[card.id]?.soundcloudUrl ?? null,
    },
  });
}

async function upsertWishlist(row: WishlistRow): Promise<void> {
  const { def, rowKey } = row;
  await prisma.wishlistSong.upsert({
    where: { id: def.id },
    create: {
      id: def.id,
      rowKey,
      title: def.title,
      artist: def.artist ?? null,
      year: def.year ?? null,
      genre: def.genre ?? null,
      country: def.country ?? null,
      ability: def.ability ?? null,
      abilityDesc: def.abilityDesc ?? null,
      pop: def.pop ?? null,
      rarity: def.rarity ?? null,
      artworkPrompt: def.artworkPrompt ?? null,
      wikipediaUrl: WIKIPEDIA_URLS[def.id] ?? null,
      spotifyUrl: STREAMING_URLS[def.id]?.spotifyUrl ?? null,
      appleMusicUrl: STREAMING_URLS[def.id]?.appleMusicUrl ?? null,
      youtubeUrl: STREAMING_URLS[def.id]?.youtubeUrl ?? null,
      bandcampUrl: STREAMING_URLS[def.id]?.bandcampUrl ?? null,
      soundcloudUrl: STREAMING_URLS[def.id]?.soundcloudUrl ?? null,
    },
    update: {
      rowKey,
      title: def.title,
      artist: def.artist ?? null,
      year: def.year ?? null,
      genre: def.genre ?? null,
      country: def.country ?? null,
      ability: def.ability ?? null,
      abilityDesc: def.abilityDesc ?? null,
      pop: def.pop ?? null,
      rarity: def.rarity ?? null,
      artworkPrompt: def.artworkPrompt ?? null,
      wikipediaUrl: WIKIPEDIA_URLS[def.id] ?? null,
      spotifyUrl: STREAMING_URLS[def.id]?.spotifyUrl ?? null,
      appleMusicUrl: STREAMING_URLS[def.id]?.appleMusicUrl ?? null,
      youtubeUrl: STREAMING_URLS[def.id]?.youtubeUrl ?? null,
      bandcampUrl: STREAMING_URLS[def.id]?.bandcampUrl ?? null,
      soundcloudUrl: STREAMING_URLS[def.id]?.soundcloudUrl ?? null,
    },
  });
}

async function upsertTransition(row: TransitionRow): Promise<void> {
  const genreRow = row.genre
    ? await prisma.genre.findUnique({
        where: { name: row.genre },
        select: { id: true },
      })
    : null;

  await prisma.transitionCard.upsert({
    where: { id: row.id },
    create: {
      id: row.id,
      rowKey: row.rowKey,
      title: row.title,
      genre: row.genre,
      genreId: genreRow?.id ?? null,
    },
    update: {
      rowKey: row.rowKey,
      title: row.title,
      genre: row.genre,
      genreId: genreRow?.id ?? null,
    },
  });
}

async function replaceSongs(
  card: CardData,
  validIds: Set<number>,
): Promise<void> {
  const desired = (card.songsOut ?? []).filter((id) => {
    if (!validIds.has(id)) {
      throw new Error(
        `Card "${card.title}" (${card.id}) songsOut references unknown id ${id}`,
      );
    }
    return true;
  });
  await prisma.songSongTransition.deleteMany({ where: { fromId: card.id } });
  if (desired.length === 0) return;
  await prisma.songSongTransition.createMany({
    data: desired.map((toId) => ({ fromId: card.id, toId })),
    skipDuplicates: true,
  });
}

async function main(): Promise<void> {
  await seedGenres(prisma);
  const { shipped, wishlist } = collectRows();
  const transitions = collectTransitionRows(shipped, wishlist);
  const validSongIds = new Set(shipped.map((r) => r.card.id));

  for (const row of shipped) await upsertShipped(row);
  for (const row of shipped) await replaceSongs(row.card, validSongIds);
  for (const row of wishlist) await upsertWishlist(row);
  for (const row of transitions) await upsertTransition(row);

  await prisma.song.deleteMany({
    where: { id: { notIn: Array.from(validSongIds) } },
  });
  await prisma.wishlistSong.deleteMany({
    where: { id: { notIn: wishlist.map((w) => w.def.id) } },
  });
  await prisma.transitionCard.deleteMany({
    where: { id: { notIn: transitions.map((t) => t.id) } },
  });

  console.log(
    `Seed: ${shipped.length} songs, ${wishlist.length} wishlist songs, and ${transitions.length} transition cards upserted.`,
  );
}

main()
  .catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
