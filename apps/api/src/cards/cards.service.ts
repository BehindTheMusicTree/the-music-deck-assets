import { createHash } from "node:crypto";
import { basename } from "node:path";
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CardRarity, Prisma, Song, WishlistSong } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { S3Service } from "../storage/s3.service";
import {
  CardListQuery,
  CardResponse,
  CardSongIndexEntryDto,
  CreateCardDto,
  GenreTaxonomyEntryDto,
  GenreTaxonomyKindValue,
  GenreTaxonomyResponse,
  GenreThemeDto,
  UpdateCardDto,
} from "./cards.dto";

type SongFull = Song & {
  songsOut: { fromId: number; toId: number }[];
  genreRef: {
    id: number;
    theme: Prisma.JsonValue | null;
    parent: { theme: Prisma.JsonValue | null } | null;
  } | null;
};

@Injectable()
export class CardsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(ConfigService) private readonly config: ConfigService,
    private readonly s3: S3Service,
  ) {}

  /**
   * Compose the public artwork URL from the bucket key.
   * Falls back to undefined when no key (placeholder cards) or no bucket configured.
   */
  artworkUrlFor(card: Pick<Song, "artworkKey">): string | undefined {
    if (!card.artworkKey) return undefined;
    const base = this.config.get<string>("S3_PUBLIC_BASE_URL");
    if (!base) return undefined;
    return `${base.replace(/\/+$/, "")}/${card.artworkKey}`;
  }

  private songToResponse(song: SongFull): CardResponse {
    const genreRef = song.genreRef;
    return {
      id: song.id,
      rowKey: song.rowKey,
      status: "Shipped",
      kind: "Song",
      title: song.title,
      artist: song.artist ?? undefined,
      year: song.year ?? undefined,
      genre: song.genre ?? "",
      genreId: genreRef?.id,
      genreTheme: toGenreThemeDto(genreRef?.theme ?? genreRef?.parent?.theme),
      country: song.country ?? undefined,
      ability: song.ability,
      abilityDesc: song.abilityDesc,
      pop: song.pop,
      rarity: song.rarity,
      catalogNumber: song.catalogNumber ?? undefined,
      artworkUrl: this.artworkUrlFor(song),
      artworkKey: song.artworkKey ?? undefined,
      artworkContentType: song.artworkContentType ?? undefined,
      artworkBytes: song.artworkBytes ?? undefined,
      artworkChecksum: song.artworkChecksum ?? undefined,
      artworkOffsetY: song.artworkOffsetY ?? undefined,
      artworkOverBorder: song.artworkOverBorder,
      artworkCreatedAt: song.artworkCreatedAt
        ? song.artworkCreatedAt.toISOString()
        : undefined,
      artworkPrompt: song.artworkPrompt ?? undefined,
      wikipediaUrl: song.wikipediaUrl ?? undefined,
      spotifyUrl: song.spotifyUrl ?? undefined,
      appleMusicUrl: song.appleMusicUrl ?? undefined,
      youtubeUrl: song.youtubeUrl ?? undefined,
      bandcampUrl: song.bandcampUrl ?? undefined,
      soundcloudUrl: song.soundcloudUrl ?? undefined,
      songsOut: song.songsOut.map((t) => t.toId),
    };
  }

  private wishlistToResponse(row: WishlistSong): CardResponse {
    return {
      id: row.id,
      rowKey: row.rowKey,
      status: "Wishlist",
      kind: "Song",
      title: row.title,
      artist: row.artist ?? undefined,
      year: row.year ?? undefined,
      genre: row.genre ?? "",
      country: row.country ?? undefined,
      ability: row.ability ?? "",
      abilityDesc: row.abilityDesc ?? "",
      pop: row.pop ?? 0,
      rarity: row.rarity ?? "Niche",
      artworkPrompt: row.artworkPrompt ?? undefined,
      wikipediaUrl: row.wikipediaUrl ?? undefined,
      spotifyUrl: row.spotifyUrl ?? undefined,
      appleMusicUrl: row.appleMusicUrl ?? undefined,
      youtubeUrl: row.youtubeUrl ?? undefined,
      bandcampUrl: row.bandcampUrl ?? undefined,
      soundcloudUrl: row.soundcloudUrl ?? undefined,
      comment: row.comment ?? undefined,
      songsOut: [],
    };
  }

  async list(query: CardListQuery): Promise<CardResponse[]> {
    if (query.status === "Wishlist") return this.wishlist();
    if (query.status === "Shipped") return this.catalog();

    const [songs, wishlist] = await Promise.all([
      this.catalog(),
      this.wishlist(),
    ]);
    let rows = [...songs, ...wishlist];
    if (query.genre) rows = rows.filter((r) => r.genre === query.genre);
    if (query.country) rows = rows.filter((r) => r.country === query.country);
    return rows.sort((a, b) => a.id - b.id);
  }

  async getById(id: number): Promise<CardResponse> {
    const song = await this.prisma.song.findUnique({
      where: { id },
      include: SONG_INCLUDE,
    });
    if (song) return this.songToResponse(song);
    const wishlist = await this.prisma.wishlistSong.findUnique({
      where: { id },
    });
    if (wishlist) return this.wishlistToResponse(wishlist);
    throw new NotFoundException(`Card ${id} not found`);
  }

  async catalog(): Promise<CardResponse[]> {
    const where: Prisma.SongWhereInput = {};
    const songs = await this.prisma.song.findMany({
      where,
      include: SONG_INCLUDE,
      orderBy: { id: "asc" },
    });
    return songs.map((s) => this.songToResponse(s));
  }

  async wishlist(): Promise<CardResponse[]> {
    const rows = await this.prisma.wishlistSong.findMany({
      orderBy: { id: "asc" },
    });
    return rows.map((r) => this.wishlistToResponse(r));
  }

  async trackIndex(): Promise<Record<number, CardSongIndexEntryDto>> {
    const songs = await this.prisma.song.findMany({
      include: SONG_INCLUDE,
      orderBy: { id: "asc" },
    });
    const index: Record<number, CardSongIndexEntryDto> = {};
    for (const s of songs) {
      index[s.id] = {
        id: s.id,
        title: s.title,
        artist: s.artist ?? undefined,
        genre: s.genre,
        artworkUrl: this.artworkUrlFor(s),
        songsOut: s.songsOut.map((t) => t.toId),
      };
    }
    return index;
  }

  async genreTaxonomy(): Promise<GenreTaxonomyResponse> {
    const genres = await this.prisma.genre.findMany({
      select: {
        id: true,
        name: true,
        parentId: true,
        parentBId: true,
        isCountry: true,
        intensity: true,
        displayLabel: true,
        theme: true,
        updatedAt: true,
      },
      orderBy: { id: "asc" },
    });
    const latestUpdatedAt = genres.reduce<Date | null>(
      (latest, row) =>
        !latest || row.updatedAt > latest ? row.updatedAt : latest,
      null,
    );
    const updatedAt = (latestUpdatedAt ?? new Date(0)).toISOString();
    const byId = new Map(genres.map((g) => [g.id, g]));
    const entries: GenreTaxonomyEntryDto[] = genres.map((g) => ({
      id: g.id,
      name: g.name,
      parentId: g.parentId ?? undefined,
      parentBId: g.parentBId ?? undefined,
      isCountry: g.isCountry,
      intensity: g.intensity,
      displayLabel: g.displayLabel ?? undefined,
      theme: toGenreThemeDto(g.theme),
      kind: classifyGenreKind(
        g.isCountry,
        g.parentId ? (byId.get(g.parentId)?.isCountry ?? false) : false,
        g.parentId ?? null,
      ),
      updatedAt: g.updatedAt.toISOString(),
    }));
    return {
      taxonomyVersion: updatedAt,
      updatedAt,
      entries,
    };
  }

  async create(dto: CreateCardDto): Promise<CardResponse> {
    const songsOut = dto.songsOut ?? [];
    return this.prisma.$transaction(async (tx) => {
      const existingSong = await tx.song.findUnique({ where: { id: dto.id } });
      const existingWishlist = await tx.wishlistSong.findUnique({
        where: { id: dto.id },
      });
      const existing = existingSong ?? existingWishlist;
      if (existing)
        throw new ConflictException(`Card ${dto.id} already exists`);
      const conflictSong = await tx.song.findUnique({
        where: { rowKey: dto.rowKey },
      });
      const conflictWishlist = await tx.wishlistSong.findUnique({
        where: { rowKey: dto.rowKey },
      });
      if (conflictSong || conflictWishlist) {
        throw new ConflictException(
          `Card with rowKey "${dto.rowKey}" already exists`,
        );
      }
      if (dto.status === "Shipped") {
        if (!dto.genre)
          throw new BadRequestException("genre is required for shipped songs");
        if (!dto.ability)
          throw new BadRequestException(
            "ability is required for shipped songs",
          );
        if (!dto.abilityDesc)
          throw new BadRequestException(
            "abilityDesc is required for shipped songs",
          );
        if (dto.pop === undefined)
          throw new BadRequestException("pop is required for shipped songs");
        if (!dto.rarity)
          throw new BadRequestException("rarity is required for shipped songs");
        await this.assertSongsReferentialIntegrity(tx, songsOut, dto.id);
        const genreId = await this.resolveGenreId(tx, dto.genre);
        await tx.song.create({
          data: {
            id: dto.id,
            rowKey: dto.rowKey,
            title: dto.title,
            artist: dto.artist ?? null,
            year: dto.year,
            genre: dto.genre,
            genreId,
            country: dto.country ?? null,
            ability: dto.ability,
            abilityDesc: dto.abilityDesc,
            pop: dto.pop,
            rarity: dto.rarity as CardRarity,
            catalogNumber: dto.catalogNumber ?? null,
            wikipediaUrl: dto.wikipediaUrl ?? null,
            spotifyUrl: dto.spotifyUrl ?? null,
            appleMusicUrl: dto.appleMusicUrl ?? null,
            youtubeUrl: dto.youtubeUrl ?? null,
            bandcampUrl: dto.bandcampUrl ?? null,
            soundcloudUrl: dto.soundcloudUrl ?? null,
            artworkOffsetY: dto.artworkOffsetY ?? null,
            artworkOverBorder: dto.artworkOverBorder ?? false,
            artworkPrompt: dto.artworkPrompt ?? null,
          },
        });
        if (songsOut.length > 0) {
          await tx.songSongTransition.createMany({
            data: songsOut.map((toId) => ({ fromId: dto.id, toId })),
            skipDuplicates: true,
          });
        }
      } else {
        await tx.wishlistSong.create({
          data: {
            id: dto.id,
            rowKey: dto.rowKey,
            title: dto.title,
            artist: dto.artist ?? null,
            year: dto.year ?? null,
            genre: dto.genre ?? null,
            country: dto.country ?? null,
            ability: dto.ability ?? null,
            abilityDesc: dto.abilityDesc ?? null,
            pop: dto.pop ?? null,
            rarity: (dto.rarity as CardRarity) ?? null,
            artworkPrompt: dto.artworkPrompt ?? null,
            wikipediaUrl: dto.wikipediaUrl ?? null,
            spotifyUrl: dto.spotifyUrl ?? null,
            appleMusicUrl: dto.appleMusicUrl ?? null,
            youtubeUrl: dto.youtubeUrl ?? null,
            bandcampUrl: dto.bandcampUrl ?? null,
            soundcloudUrl: dto.soundcloudUrl ?? null,
            comment: dto.comment ?? null,
          },
        });
      }
      return this.getById(dto.id);
    });
  }

  async update(id: number, dto: UpdateCardDto): Promise<CardResponse> {
    return this.prisma.$transaction(async (tx) => {
      const existingSong = await tx.song.findUnique({ where: { id } });
      const existingWishlist = await tx.wishlistSong.findUnique({
        where: { id },
      });
      if (!existingSong && !existingWishlist)
        throw new NotFoundException(`Card ${id} not found`);
      const existing = existingSong ?? existingWishlist!;
      if (dto.rowKey && dto.rowKey !== existing.rowKey) {
        const conflictSong = await tx.song.findUnique({
          where: { rowKey: dto.rowKey },
        });
        const conflictWishlist = await tx.wishlistSong.findUnique({
          where: { rowKey: dto.rowKey },
        });
        const conflict = conflictSong ?? conflictWishlist;
        if (conflict && conflict.id !== id) {
          throw new ConflictException(
            `Card with rowKey "${dto.rowKey}" already exists`,
          );
        }
      }
      if (existingSong) {
        const genreId = dto.genre
          ? await this.resolveGenreId(tx, dto.genre)
          : undefined;
        await tx.song.update({
          where: { id },
          data: {
            rowKey: dto.rowKey ?? undefined,
            title: dto.title ?? undefined,
            artist: dto.artist ?? undefined,
            year: dto.year ?? undefined,
            genre: dto.genre ?? undefined,
            genreId,
            country: dto.country ?? undefined,
            ability: dto.ability ?? undefined,
            abilityDesc: dto.abilityDesc ?? undefined,
            pop: dto.pop ?? undefined,
            rarity: dto.rarity ? (dto.rarity as CardRarity) : undefined,
            catalogNumber: dto.catalogNumber ?? undefined,
            wikipediaUrl: dto.wikipediaUrl ?? undefined,
            spotifyUrl: dto.spotifyUrl ?? undefined,
            appleMusicUrl: dto.appleMusicUrl ?? undefined,
            youtubeUrl: dto.youtubeUrl ?? undefined,
            bandcampUrl: dto.bandcampUrl ?? undefined,
            soundcloudUrl: dto.soundcloudUrl ?? undefined,
            artworkOffsetY: dto.artworkOffsetY ?? undefined,
            artworkOverBorder: dto.artworkOverBorder ?? undefined,
            artworkPrompt: dto.artworkPrompt ?? undefined,
          },
        });
      } else {
        await tx.wishlistSong.update({
          where: { id },
          data: {
            rowKey: dto.rowKey ?? undefined,
            title: dto.title ?? undefined,
            artist: dto.artist ?? undefined,
            year: dto.year ?? undefined,
            genre: dto.genre ?? undefined,
            country: dto.country ?? undefined,
            ability: dto.ability ?? undefined,
            abilityDesc: dto.abilityDesc ?? undefined,
            pop: dto.pop ?? undefined,
            rarity: dto.rarity ? (dto.rarity as CardRarity) : undefined,
            wikipediaUrl: dto.wikipediaUrl ?? undefined,
            spotifyUrl: dto.spotifyUrl ?? undefined,
            appleMusicUrl: dto.appleMusicUrl ?? undefined,
            youtubeUrl: dto.youtubeUrl ?? undefined,
            bandcampUrl: dto.bandcampUrl ?? undefined,
            soundcloudUrl: dto.soundcloudUrl ?? undefined,
            artworkPrompt: dto.artworkPrompt ?? undefined,
            comment: dto.comment ?? undefined,
          },
        });
      }
      return this.getById(id);
    });
  }

  async remove(id: number): Promise<void> {
    const song = await this.prisma.song.findUnique({ where: { id } });
    if (song) {
      await this.prisma.song.delete({ where: { id } });
      return;
    }
    const wishlist = await this.prisma.wishlistSong.findUnique({
      where: { id },
    });
    if (!wishlist) throw new NotFoundException(`Card ${id} not found`);
    await this.prisma.wishlistSong.delete({ where: { id } });
  }

  async resolveArtworkRedirectUrl(id: number): Promise<string> {
    const c = await this.prisma.song.findUnique({
      where: { id },
      select: { artworkKey: true },
    });
    if (!c?.artworkKey) {
      throw new NotFoundException(`No artwork for card ${id}`);
    }
    const pub = this.s3.publicUrl(c.artworkKey);
    if (pub) return pub;
    return this.s3.signedGetUrl(c.artworkKey);
  }

  async uploadArtworkFile(
    id: number,
    file: Express.Multer.File,
  ): Promise<CardResponse> {
    if (!file?.buffer?.length) {
      throw new BadRequestException("Empty file");
    }
    if (!/^image\//.test(file.mimetype)) {
      throw new BadRequestException("Only image uploads are allowed");
    }
    const deckBasename = safeDeckBasename(file.originalname ?? "", id);
    const key = `deck/${deckBasename}`;
    const sha = createHash("sha256").update(file.buffer).digest("hex");
    const existing = await this.prisma.song.findUnique({
      where: { id },
      include: SONG_INCLUDE,
    });
    if (!existing) throw new NotFoundException(`Card ${id} not found`);
    if (existing.artworkChecksum === sha && existing.artworkKey === key) {
      return this.songToResponse(existing);
    }
    await this.s3.putObject(key, file.buffer, file.mimetype, file.size);
    if (existing.artworkKey && existing.artworkKey !== key) {
      try {
        await this.s3.deleteObject(existing.artworkKey);
      } catch {
        /* best-effort cleanup */
      }
    }
    return this.setArtworkMetadata(id, {
      artworkKey: key,
      artworkContentType: file.mimetype,
      artworkBytes: file.size,
      artworkChecksum: sha,
    });
  }

  async deleteArtworkFromBucket(id: number): Promise<CardResponse> {
    const existing = await this.prisma.song.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Card ${id} not found`);
    if (existing.artworkKey) {
      try {
        await this.s3.deleteObject(existing.artworkKey);
      } catch {
        /* ignore missing object */
      }
    }
    return this.clearArtworkMetadata(id);
  }

  async replaceSongsOut(id: number, songsOut: number[]): Promise<CardResponse> {
    return this.prisma.$transaction(async (tx) => {
      const sc = await tx.song.findUnique({ where: { id } });
      if (!sc) throw new NotFoundException(`Card ${id} not found`);
      await this.assertSongsReferentialIntegrity(tx, songsOut, id);
      await tx.songSongTransition.deleteMany({ where: { fromId: id } });
      if (songsOut.length > 0) {
        await tx.songSongTransition.createMany({
          data: songsOut.map((toId) => ({ fromId: id, toId })),
          skipDuplicates: true,
        });
      }
      const refreshed = await tx.song.findUnique({
        where: { id },
        include: SONG_INCLUDE,
      });
      if (!refreshed) throw new NotFoundException(`Card ${id} not found`);
      return this.songToResponse(refreshed);
    });
  }

  async setArtworkMetadata(
    id: number,
    metadata: {
      artworkKey: string;
      artworkContentType: string;
      artworkBytes: number;
      artworkChecksum: string;
    },
  ): Promise<CardResponse> {
    await this.prisma.song.update({
      where: { id },
      data: {
        artworkKey: metadata.artworkKey,
        artworkContentType: metadata.artworkContentType,
        artworkBytes: metadata.artworkBytes,
        artworkChecksum: metadata.artworkChecksum,
        artworkCreatedAt: new Date(),
      },
    });
    const sc = await this.prisma.song.findUnique({
      where: { id },
      include: SONG_INCLUDE,
    });
    if (!sc) throw new NotFoundException(`Card ${id} not found`);
    return this.songToResponse(sc);
  }

  async clearArtworkMetadata(id: number): Promise<CardResponse> {
    await this.prisma.song.update({
      where: { id },
      data: {
        artworkKey: null,
        artworkContentType: null,
        artworkBytes: null,
        artworkChecksum: null,
      },
    });
    const sc = await this.prisma.song.findUnique({
      where: { id },
      include: SONG_INCLUDE,
    });
    if (!sc) throw new NotFoundException(`Card ${id} not found`);
    return this.songToResponse(sc);
  }

  private async resolveGenreId(
    tx: Prisma.TransactionClient,
    genre: string,
  ): Promise<number> {
    const g = await tx.genre.findUnique({
      where: { name: genre },
      select: { id: true },
    });
    if (!g) throw new BadRequestException(`Unknown genre "${genre}"`);
    return g.id;
  }

  private async assertSongsReferentialIntegrity(
    tx: Prisma.TransactionClient,
    songsOut: number[],
    fromId: number,
  ): Promise<void> {
    const seen = new Set<number>();
    for (const id of songsOut) {
      if (seen.has(id)) {
        throw new ConflictException(
          `Duplicate songsOut id ${id} for card ${fromId}`,
        );
      }
      seen.add(id);
    }
    if (seen.size === 0) return;
    const found = await tx.song.findMany({
      where: { id: { in: Array.from(seen) } },
      select: { id: true },
    });
    if (found.length !== seen.size) {
      const foundIds = new Set(found.map((c) => c.id));
      const missing = Array.from(seen).filter((id) => !foundIds.has(id));
      throw new ConflictException(
        `songsOut references unknown card ids: ${missing.join(", ")}`,
      );
    }
  }
}

export function classifyGenreKind(
  isCountry: boolean,
  parentIsCountry: boolean,
  parentId: number | null,
): GenreTaxonomyKindValue {
  if (isCountry) return "COUNTRY_ROOT";
  if (parentIsCountry) return "COUNTRY_SUB_GENRE";
  if (!parentId) return "GENRE_ROOT";
  return "SUB_GENRE";
}

function toGenreThemeDto(
  raw: Prisma.JsonValue | null | undefined,
): GenreThemeDto | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const value = raw as Record<string, unknown>;
  if (
    typeof value.border !== "string" ||
    typeof value.headerBg !== "string" ||
    typeof value.textMain !== "string" ||
    typeof value.textBody !== "string" ||
    typeof value.parchStrip !== "string" ||
    typeof value.parchAbility !== "string" ||
    typeof value.barGlowPop !== "string" ||
    typeof value.barGlowExp !== "string" ||
    typeof value.icon !== "string" ||
    !isColorPair(value.barPop) ||
    !isColorPair(value.barExp)
  ) {
    return undefined;
  }
  return {
    border: value.border,
    frameBorder:
      typeof value.frameBorder === "string" ? value.frameBorder : undefined,
    frameBg: typeof value.frameBg === "string" ? value.frameBg : undefined,
    frameBackgroundPosition:
      typeof value.frameBackgroundPosition === "string"
        ? value.frameBackgroundPosition
        : undefined,
    frameRotateR90:
      typeof value.frameRotateR90 === "boolean"
        ? value.frameRotateR90
        : undefined,
    frameFilter:
      typeof value.frameFilter === "string" ? value.frameFilter : undefined,
    frameOpacity:
      typeof value.frameOpacity === "number" ? value.frameOpacity : undefined,
    headerBg: value.headerBg,
    textMain: value.textMain,
    textBody: value.textBody,
    parchStrip: value.parchStrip,
    parchAbility: value.parchAbility,
    barPop: value.barPop,
    barExp: value.barExp,
    barGlowPop: value.barGlowPop,
    barGlowExp: value.barGlowExp,
    typePip: toCardTypePip(value.typePip),
    icon: value.icon,
  };
}

function toCardTypePip(raw: unknown): GenreThemeDto["typePip"] {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const value = raw as Record<string, unknown>;
  return {
    symbol: toCardTypePipSymbol(value.symbol),
    flagBg: typeof value.flagBg === "string" ? value.flagBg : undefined,
  };
}

function toCardTypePipSymbol(
  raw: unknown,
): { sym: string; color: string; size?: number; svg?: string } | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const value = raw as Record<string, unknown>;
  if (typeof value.sym !== "string" || typeof value.color !== "string") {
    return undefined;
  }
  return {
    sym: value.sym,
    color: value.color,
    size: typeof value.size === "number" ? value.size : undefined,
    svg: typeof value.svg === "string" ? value.svg : undefined,
  };
}

function isColorPair(raw: unknown): raw is [string, string] {
  return (
    Array.isArray(raw) &&
    raw.length === 2 &&
    typeof raw[0] === "string" &&
    typeof raw[1] === "string"
  );
}

const SONG_INCLUDE = {
  songsOut: true,
  genreRef: {
    select: {
      id: true,
      theme: true,
      parent: { select: { theme: true } },
    },
  },
} satisfies Prisma.SongInclude;

function safeDeckBasename(original: string, id: number): string {
  const b = basename(original).replace(/[^a-zA-Z0-9._-]+/g, "_");
  if (!b || b === "." || b === "..") return `artwork-${id}.png`;
  return b.slice(0, 180);
}
