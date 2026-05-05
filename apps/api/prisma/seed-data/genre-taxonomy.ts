import {
  APP_GENRE_NAMES,
  APP_GENRE_THEMES,
  SUBGENRES,
} from "@repo/cards-domain";
import { Intensity, Prisma, type PrismaClient } from "@prisma/client";

const WHEEL_ORDER = [
  "Reggae/Dub",
  "Electronic",
  "Disco/Funk",
  "Hip-Hop",
  "Rock",
  "Classical",
  "Vintage",
] as const;

export async function seedGenres(prisma: PrismaClient): Promise<void> {
  // Pass 1: 8 AppGenre rows (no parentId)
  for (const name of APP_GENRE_NAMES) {
    const wheelIdx = WHEEL_ORDER.indexOf(name as (typeof WHEEL_ORDER)[number]);
    await prisma.genre.upsert({
      where: { name },
      create: {
        name,
        intensity: name === "Mainstream" ? Intensity.pop : Intensity.soft,
        displayLabel: name === "Mainstream" ? "Pop" : null,
        wheelOrder: wheelIdx >= 0 ? wheelIdx + 1 : null,
        isCountry: false,
        theme:
          (
            APP_GENRE_THEMES as unknown as Record<string, Prisma.InputJsonValue>
          )[name] ?? Prisma.DbNull,
      },
      update: {
        isCountry: false,
        theme:
          (
            APP_GENRE_THEMES as unknown as Record<string, Prisma.InputJsonValue>
          )[name] ?? Prisma.DbNull,
      },
    });
  }

  // Pass 2: one row per distinct country referenced by country subgenres
  const countryNames = [
    ...new Set(
      SUBGENRES.filter((s) => s.kind === "country").map((s) => s.parentA),
    ),
  ];
  for (const name of countryNames) {
    await prisma.genre.upsert({
      where: { name },
      create: { name, intensity: Intensity.soft, isCountry: true },
      update: { isCountry: true },
    });
  }

  // Pass 3: ~80 subgenre rows
  for (const sub of SUBGENRES) {
    const parentId = (
      await prisma.genre.findUniqueOrThrow({ where: { name: sub.parentA } })
    ).id;

    const parentBId =
      sub.kind === "genre" && sub.parentB
        ? (
            await prisma.genre.findUniqueOrThrow({
              where: { name: sub.parentB },
            })
          ).id
        : null;

    const influenceId = sub.influence
      ? (
          await prisma.genre.findUniqueOrThrow({
            where: { name: sub.influence.genre },
          })
        ).id
      : null;

    await prisma.genre.upsert({
      where: { name: sub.n },
      create: {
        name: sub.n,
        parentId,
        parentBId,
        blendFactor: "t" in sub ? (sub.t ?? null) : null,
        intensity: sub.intensity as Intensity,
        colorOverride: sub.color ?? null,
        isCountry: false,
        influenceId,
        influenceIntensity: sub.influence
          ? (sub.influence.intensity as Intensity)
          : null,
      },
      update: { isCountry: false },
    });
  }
}

export async function backfillCardGenreIds(
  prisma: PrismaClient,
): Promise<void> {
  const genres = await prisma.genre.findMany({
    select: { id: true, name: true },
  });
  const byName = new Map(genres.map((g) => [g.name, g.id]));
  const songCards = await prisma.songCard.findMany({
    where: { genreId: null },
    select: { id: true, genre: true },
  });
  let filled = 0;
  for (const sc of songCards) {
    const genreId = sc.genre ? byName.get(sc.genre) : undefined;
    if (genreId) {
      await prisma.songCard.update({ where: { id: sc.id }, data: { genreId } });
      filled++;
    }
  }
  console.log(
    `Seed: backfilled genreId on ${filled}/${songCards.length} song cards.`,
  );
}
