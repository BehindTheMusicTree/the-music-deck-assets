import { basename } from "node:path";
import { CardKind, CardStatus, PrismaClient } from "@prisma/client";
import type {
  CardData,
  CardKind as DomainCardKind,
  WishlistCardDef,
  WishlistKindLabel,
} from "@repo/cards-domain";
import { COUNTRY_NATIVE_SUBGENRES } from "./seed-data/country-native-subgenres";
import { ALL_GENRE_CARDS } from "./seed-data/genre";
import { WORLD_FLAG_CARDS, WORLD_MIXED_CARDS } from "./seed-data/world";
import { LA_MACARENA_CARD } from "./seed-data/la-macarena";
import { WISHLIST_CARD_DEFS } from "./seed-data/catalog-wishlist-defs";

const prisma = new PrismaClient();

type SeedRow = {
  rowKey: string;
  status: CardStatus;
  kind: CardKind;
  card: CardData;
};

const GENRE_REPRESENTATIVE_IDS = new Set([1, 2, 3, 4, 5, 6, 7, 8]);

function classifySpotlightKind(card: CardData): DomainCardKind {
  const g = card.genre;
  if (!g) {
    throw new Error(
      `Spotlight card "${card.title}" (${card.id}) must set genre`,
    );
  }
  if (COUNTRY_NATIVE_SUBGENRES.has(g)) return "World";
  if (card.country) {
    /* Heuristic mirroring spotlightMetaForCard():
     * any subgenre that's not country-native is treated as a genre subgenre, so
     * a card with country + non-country-native genre lands in "WorldBlend";
     * cards with country + parent app genre name fall through to "WorldGenre". */
    return "WorldBlend";
  }
  return "Genre";
}

function rowsForGenreCards(): SeedRow[] {
  return ALL_GENRE_CARDS.map((card) => {
    if (GENRE_REPRESENTATIVE_IDS.has(card.id)) {
      return {
        rowKey: `genre-${card.id}`,
        status: CardStatus.Shipped,
        kind: CardKind.Genre,
        card,
      };
    }
    const inferred = classifySpotlightKind(card);
    return {
      rowKey: `spotlight-${card.id}`,
      status: CardStatus.Shipped,
      kind: inferred as CardKind,
      card,
    };
  });
}

function rowsForWorldFlagCards(): SeedRow[] {
  return WORLD_FLAG_CARDS.map((card) => ({
    rowKey: `world-${card.id}`,
    status: CardStatus.Shipped,
    kind: CardKind.World,
    card,
  }));
}

function rowsForWorldMixedCards(): SeedRow[] {
  return WORLD_MIXED_CARDS.map((card) => ({
    rowKey: `blend-${card.id}`,
    status: CardStatus.Shipped,
    kind: CardKind.WorldBlend,
    card,
  }));
}

function rowForLaMacarena(): SeedRow {
  return {
    rowKey: "world-genre-9101",
    status: CardStatus.Shipped,
    kind: CardKind.WorldGenre,
    card: LA_MACARENA_CARD,
  };
}

function wishlistKindToCardKind(kind: WishlistKindLabel): CardKind {
  switch (kind) {
    case "Genre":
      return CardKind.Genre;
    case "World":
      return CardKind.World;
    case "World blend":
      return CardKind.WorldBlend;
    case "World + genre":
      return CardKind.WorldGenre;
    case "Planned":
      return CardKind.Planned;
  }
}

function rowForWishlistDef(def: WishlistCardDef): SeedRow {
  const kind = wishlistKindToCardKind(def.kind);
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
  return { rowKey: def.rowKey, status, kind, card };
}

function collectAllSeedRows(): SeedRow[] {
  return [
    ...rowsForGenreCards(),
    ...rowsForWorldFlagCards(),
    ...rowsForWorldMixedCards(),
    rowForLaMacarena(),
    ...WISHLIST_CARD_DEFS.map(rowForWishlistDef),
  ];
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
