/** Catalog seed — `rowKey` = slugified `title-year`; see ./README.md */
import { basename } from "node:path";
import { CardKind, CardStatus, PrismaClient } from "@prisma/client";
import {
  assignCatalogRowKeys,
  type CardData,
  type WishlistCardDef,
} from "@repo/cards-domain";
import { ALL_GENRE_CARDS } from "./seed-data/genre";
import { WORLD_FLAG_CARDS, WORLD_MIXED_CARDS } from "./seed-data/world";
import { LA_MACARENA_CARD } from "./seed-data/la-macarena";
import { WISHLIST_CARD_DEFS } from "./seed-data/catalog-wishlist-defs";
import { WIKIPEDIA_URLS } from "./seed-data/wikipedia-urls";

const prisma = new PrismaClient();

type RawSeedRow = {
  card: CardData;
  status: CardStatus;
  kind: CardKind;
};

type SeedRow = RawSeedRow & { rowKey: string };

function rawRowsForGenreCards(): RawSeedRow[] {
  return ALL_GENRE_CARDS.map((card) => ({
    status: CardStatus.Shipped,
    kind: CardKind.Card,
    card,
  }));
}

function rawRowsForWorldFlagCards(): RawSeedRow[] {
  return WORLD_FLAG_CARDS.map((card) => ({
    status: CardStatus.Shipped,
    kind: CardKind.Card,
    card,
  }));
}

function rawRowsForWorldMixedCards(): RawSeedRow[] {
  return WORLD_MIXED_CARDS.map((card) => ({
    status: CardStatus.Shipped,
    kind: CardKind.Card,
    card,
  }));
}

function rawRowForLaMacarena(): RawSeedRow {
  return {
    status: CardStatus.Shipped,
    kind: CardKind.Card,
    card: LA_MACARENA_CARD,
  };
}

function rawRowForWishlistDef(def: WishlistCardDef): RawSeedRow {
  const kind = def.kind === "Planned" ? CardKind.Planned : CardKind.Card;
  const status =
    def.kind === "Planned" ? CardStatus.Planned : CardStatus.Wishlist;
  const card: CardData = {
    id: def.id,
    title: def.title,
    artist: def.artist,
    year: def.year,
    genre: def.genre,
    country: def.country,
    ability: def.ability,
    abilityDesc: def.abilityDesc,
    pop: def.pop ?? 0,
    rarity: def.rarity,
    artworkPrompt: def.artworkPrompt,
  };
  return { status, kind, card };
}

function collectAllSeedRows(): SeedRow[] {
  const rawRows: RawSeedRow[] = [
    ...rawRowsForGenreCards(),
    ...rawRowsForWorldFlagCards(),
    ...rawRowsForWorldMixedCards(),
    rawRowForLaMacarena(),
    ...WISHLIST_CARD_DEFS.map(rawRowForWishlistDef),
  ];

  const rowKeyMap = assignCatalogRowKeys(
    rawRows.map((r) => ({
      id: r.card.id,
      title: r.card.title,
      year: r.card.year,
    })),
  );

  const rows: SeedRow[] = rawRows.map((r) => ({
    ...r,
    rowKey: rowKeyMap.get(r.card.id)!,
  }));

  const seenRowKeys = new Map<string, number>();
  const seenIds = new Map<number, string>();
  for (const row of rows) {
    const dupKey = seenRowKeys.get(row.rowKey);
    const dupId = seenIds.get(row.card.id);
    if (dupKey !== undefined)
      throw new Error(
        `Duplicate rowKey "${row.rowKey}": ids ${dupKey} and ${row.card.id}`,
      );
    if (dupId !== undefined)
      throw new Error(
        `Duplicate id ${row.card.id}: rowKeys "${dupId}" and "${row.rowKey}"`,
      );
    seenRowKeys.set(row.rowKey, row.card.id);
    seenIds.set(row.card.id, row.rowKey);
  }
  return rows;
}

function artworkKeyFromCard(card: CardData): string | null {
  if (!card.artwork) return null;
  return `deck/${basename(card.artwork)}`;
}

function dateFromArtworkCreatedAt(value: string | undefined): Date | null {
  if (!value) return null;
  /* Bundled values are local timestamps without TZ — preserve as-is.
   * `new Date("2024-01-01T12:34:56")` returns a Date in the runtime tz. */
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

async function upsertCard(row: SeedRow): Promise<void> {
  const { card } = row;
  const artworkKey = artworkKeyFromCard(card);
  const artworkContentType = artworkKey ? "image/png" : null;
  const artworkCreatedAt = dateFromArtworkCreatedAt(card.artworkCreatedAt);
  const wikipediaUrl = WIKIPEDIA_URLS[card.id];
  if (!wikipediaUrl)
    throw new Error(
      `Missing Wikipedia URL for card id ${card.id} ("${card.title}")`,
    );

  const data = {
    rowKey: row.rowKey,
    status: row.status,
    kind: row.kind,
    title: card.title,
    artist: card.artist ?? null,
    year: card.year,
    genre: card.genre ?? null,
    country: card.country ?? null,
    ability: card.ability,
    abilityDesc: card.abilityDesc,
    pop: card.pop,
    rarity: card.rarity,
    catalogNumber: card.catalogNumber ?? null,
    artworkKey,
    artworkContentType,
    artworkOffsetY: card.artworkOffsetY ?? null,
    artworkOverBorder: card.artworkOverBorder ?? false,
    artworkCreatedAt,
    artworkPrompt: card.artworkPrompt ?? null,
    wikipediaUrl,
  };

  await prisma.card.upsert({
    where: { id: card.id },
    create: { id: card.id, ...data },
    update: data,
  });
}

async function replaceTracksForCard(
  card: CardData,
  validIds: Set<number>,
): Promise<void> {
  const desired = (card.tracksOut ?? []).filter((id) => {
    if (!validIds.has(id)) {
      throw new Error(
        `Card "${card.title}" (${card.id}) tracksOut references unknown id ${id}`,
      );
    }
    return true;
  });
  await prisma.cardTrackTransition.deleteMany({ where: { fromId: card.id } });
  if (desired.length === 0) return;
  await prisma.cardTrackTransition.createMany({
    data: desired.map((toId) => ({ fromId: card.id, toId })),
    skipDuplicates: true,
  });
}

async function main(): Promise<void> {
  const rows = collectAllSeedRows();
  const validIds = new Set(rows.map((r) => r.card.id));

  /* Idempotent: every row is upserted by primary key. */
  for (const row of rows) {
    await upsertCard(row);
  }
  for (const row of rows) {
    await replaceTracksForCard(row.card, validIds);
  }

  /* Drop any DB rows that are no longer in the snapshot (e.g. removed wishlist).
   * Wrapped in a single statement so partial seeds never leave orphans. */
  await prisma.card.deleteMany({
    where: { id: { notIn: Array.from(validIds) } },
  });

  console.log(
    `Seed: ${rows.length} cards upserted (${rows.filter((r) => r.status === "Shipped").length} shipped, ${rows.filter((r) => r.status === "Wishlist").length} wishlist, ${rows.filter((r) => r.status === "Planned").length} planned).`,
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
