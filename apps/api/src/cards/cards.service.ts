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
import {
  Card,
  CardRarity,
  CardStatus,
  SongCard,
  SongCardTrackTransition,
  Prisma,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { S3Service } from "../storage/s3.service";
import {
  CardListQuery,
  CardResponse,
  CardTrackIndexEntryDto,
  CreateCardDto,
  GenreTaxonomyKindValue,
  GenreTaxonomyEntryDto,
  GenreTaxonomyResponse,
  GenreThemeDto,
  UpdateCardDto,
} from "./cards.dto";

type SongCardFull = SongCard & {
  card: Card;
  tracksOut: SongCardTrackTransition[];
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
  artworkUrlFor(card: Pick<Card, "artworkKey">): string | undefined {
    if (!card.artworkKey) return undefined;
    const base = this.config.get<string>("S3_PUBLIC_BASE_URL");
    if (!base) return undefined;
    return `${base.replace(/\/+$/, "")}/${card.artworkKey}`;
  }

  toResponse(sc: SongCardFull): CardResponse {
    return {
      id: sc.card.id,
      rowKey: sc.card.rowKey,
      status: normalizeCardStatus(sc.card.status),
      title: sc.card.title,
      artist: sc.artist ?? undefined,
      year: sc.year,
      genre: sc.genre,
      genreId: sc.genreRef?.id ?? undefined,
      genreTheme: toGenreThemeDto(sc.genreRef?.theme ?? sc.genreRef?.parent?.theme),
      country: sc.country ?? undefined,
      ability: sc.card.ability,
      abilityDesc: sc.card.abilityDesc,
      pop: sc.card.pop,
      rarity: sc.card.rarity,
      catalogNumber: sc.catalogNumber ?? undefined,
      artworkUrl: this.artworkUrlFor(sc.card),
      artworkKey: sc.card.artworkKey ?? undefined,
      artworkContentType: sc.card.artworkContentType ?? undefined,
      artworkBytes: sc.card.artworkBytes ?? undefined,
      artworkChecksum: sc.card.artworkChecksum ?? undefined,
      artworkOffsetY: sc.card.artworkOffsetY ?? undefined,
      artworkOverBorder: sc.card.artworkOverBorder,
      artworkCreatedAt: sc.card.artworkCreatedAt
        ? sc.card.artworkCreatedAt.toISOString()
        : undefined,
      artworkPrompt: sc.card.artworkPrompt ?? undefined,
      wikipediaUrl: sc.card.wikipediaUrl ?? undefined,
      spotifyUrl: sc.card.spotifyUrl ?? undefined,
      appleMusicUrl: sc.card.appleMusicUrl ?? undefined,
      youtubeUrl: sc.card.youtubeUrl ?? undefined,
      bandcampUrl: sc.card.bandcampUrl ?? undefined,
      soundcloudUrl: sc.card.soundcloudUrl ?? undefined,
      tracksOut: sc.tracksOut.map((t) => t.toId),
    };
  }

  async list(query: CardListQuery): Promise<CardResponse[]> {
    const where: Prisma.SongCardWhereInput = {};
    const cardWhere: Prisma.CardWhereInput = {};
    if (query.status) {
      cardWhere.status =
        query.status === "Wishlist" ? CardStatus.Wishlist : CardStatus.Shipped;
    }
    if (query.status) where.card = cardWhere;
    if (query.genre) where.genre = query.genre;
    if (query.country) where.country = query.country;
    const songCards = await this.prisma.songCard.findMany({
      where,
      include: SONG_CARD_INCLUDE,
      orderBy: { id: "asc" },
    });
    return songCards.map((sc) => this.toResponse(sc));
  }

  async getById(id: number): Promise<CardResponse> {
    const sc = await this.prisma.songCard.findUnique({
      where: { id },
      include: SONG_CARD_INCLUDE,
    });
    if (!sc) throw new NotFoundException(`Card ${id} not found`);
    return this.toResponse(sc);
  }

  async getRaw(id: number): Promise<SongCardFull> {
    const sc = await this.prisma.songCard.findUnique({
      where: { id },
      include: SONG_CARD_INCLUDE,
    });
    if (!sc) throw new NotFoundException(`Card ${id} not found`);
    return sc;
  }

  async catalog(): Promise<CardResponse[]> {
    return this.list({ status: "Shipped" });
  }

  async wishlist(): Promise<CardResponse[]> {
    const songCards = await this.prisma.songCard.findMany({
      where: {
        card: { status: CardStatus.Wishlist },
      },
      include: SONG_CARD_INCLUDE,
      orderBy: { id: "asc" },
    });
    return songCards.map((sc) => this.toResponse(sc));
  }

  async trackIndex(): Promise<Record<number, CardTrackIndexEntryDto>> {
    const songCards = await this.prisma.songCard.findMany({
      where: { card: { status: CardStatus.Shipped } },
      include: SONG_CARD_INCLUDE,
      orderBy: { id: "asc" },
    });
    const index: Record<number, CardTrackIndexEntryDto> = {};
    for (const sc of songCards) {
      index[sc.id] = {
        id: sc.id,
        title: sc.card.title,
        artist: sc.artist ?? undefined,
        genre: sc.genre,
        artworkUrl: this.artworkUrlFor(sc.card),
        tracksOut: sc.tracksOut.map((t) => t.toId),
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
      (latest, row) => (!latest || row.updatedAt > latest ? row.updatedAt : latest),
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
        g.parentId ? byId.get(g.parentId)?.isCountry ?? false : false,
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
    const tracksOut = dto.tracksOut ?? [];
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.card.findUnique({ where: { id: dto.id } });
      if (existing)
        throw new ConflictException(`Card ${dto.id} already exists`);
      const conflict = await tx.card.findUnique({
        where: { rowKey: dto.rowKey },
      });
      if (conflict) {
        throw new ConflictException(
          `Card with rowKey "${dto.rowKey}" already exists`,
        );
      }
      await this.assertTracksReferentialIntegrity(tx, tracksOut, dto.id);
      const genreId = await this.resolveGenreId(tx, dto.genre);
      await tx.card.create({
        data: {
          id: dto.id,
          rowKey: dto.rowKey,
          status: dto.status === "Shipped" ? CardStatus.Shipped : CardStatus.Wishlist,
          title: dto.title,
          ability: dto.ability,
          abilityDesc: dto.abilityDesc,
          pop: dto.pop,
          rarity: dto.rarity as CardRarity,
          artworkOffsetY: dto.artworkOffsetY ?? null,
          artworkOverBorder: dto.artworkOverBorder ?? false,
          artworkPrompt: dto.artworkPrompt ?? null,
          wikipediaUrl: dto.wikipediaUrl ?? null,
          spotifyUrl: dto.spotifyUrl ?? null,
          appleMusicUrl: dto.appleMusicUrl ?? null,
          youtubeUrl: dto.youtubeUrl ?? null,
          bandcampUrl: dto.bandcampUrl ?? null,
          soundcloudUrl: dto.soundcloudUrl ?? null,
        },
      });
      await tx.songCard.create({
        data: {
          id: dto.id,
          artist: dto.artist ?? null,
          year: dto.year,
          genre: dto.genre,
          genreId,
          country: dto.country ?? null,
          catalogNumber: dto.catalogNumber ?? null,
        },
      });
      if (tracksOut.length > 0) {
        await tx.songCardTrackTransition.createMany({
          data: tracksOut.map((toId) => ({ fromId: dto.id, toId })),
          skipDuplicates: true,
        });
      }
      const refreshed = await tx.songCard.findUnique({
        where: { id: dto.id },
        include: SONG_CARD_INCLUDE,
      });
      if (!refreshed) throw new Error("Failed to load created card");
      return this.toResponse(refreshed);
    });
  }

  async update(id: number, dto: UpdateCardDto): Promise<CardResponse> {
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.card.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException(`Card ${id} not found`);
      if (dto.rowKey && dto.rowKey !== existing.rowKey) {
        const conflict = await tx.card.findUnique({
          where: { rowKey: dto.rowKey },
        });
        if (conflict && conflict.id !== id) {
          throw new ConflictException(
            `Card with rowKey "${dto.rowKey}" already exists`,
          );
        }
      }
      await tx.card.update({
        where: { id },
        data: {
          rowKey: dto.rowKey ?? undefined,
          status: dto.status
            ? dto.status === "Shipped"
              ? CardStatus.Shipped
              : CardStatus.Wishlist
            : undefined,
          title: dto.title ?? undefined,
          ability: dto.ability ?? undefined,
          abilityDesc: dto.abilityDesc ?? undefined,
          pop: dto.pop ?? undefined,
          rarity: dto.rarity ? (dto.rarity as CardRarity) : undefined,
          artworkOffsetY: dto.artworkOffsetY ?? undefined,
          artworkOverBorder: dto.artworkOverBorder ?? undefined,
          artworkPrompt: dto.artworkPrompt ?? undefined,
          wikipediaUrl: dto.wikipediaUrl ?? undefined,
          spotifyUrl: dto.spotifyUrl ?? undefined,
          appleMusicUrl: dto.appleMusicUrl ?? undefined,
          youtubeUrl: dto.youtubeUrl ?? undefined,
          bandcampUrl: dto.bandcampUrl ?? undefined,
          soundcloudUrl: dto.soundcloudUrl ?? undefined,
        },
      });
      if (
        dto.artist !== undefined ||
        dto.year !== undefined ||
        dto.genre !== undefined ||
        dto.country !== undefined ||
        dto.catalogNumber !== undefined
      ) {
        const genreId =
          dto.genre !== undefined
            ? await this.resolveGenreId(tx, dto.genre)
            : undefined;
        await tx.songCard.update({
          where: { id },
          data: {
            artist: dto.artist ?? undefined,
            year: dto.year ?? undefined,
            genre: dto.genre ?? undefined,
            genreId,
            country: dto.country ?? undefined,
            catalogNumber: dto.catalogNumber ?? undefined,
          },
        });
      }
      const refreshed = await tx.songCard.findUnique({
        where: { id },
        include: SONG_CARD_INCLUDE,
      });
      if (!refreshed) throw new NotFoundException(`Card ${id} not found`);
      return this.toResponse(refreshed);
    });
  }

  async remove(id: number): Promise<void> {
    const existing = await this.prisma.card.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Card ${id} not found`);
    await this.prisma.card.delete({ where: { id } });
  }

  async resolveArtworkRedirectUrl(id: number): Promise<string> {
    const sc = await this.prisma.songCard.findUnique({
      where: { id },
      include: { card: true, tracksOut: false },
    });
    if (!sc?.card.artworkKey) {
      throw new NotFoundException(`No artwork for card ${id}`);
    }
    const pub = this.s3.publicUrl(sc.card.artworkKey);
    if (pub) return pub;
    return this.s3.signedGetUrl(sc.card.artworkKey);
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
    const existing = await this.getRaw(id);
    if (
      existing.card.artworkChecksum === sha &&
      existing.card.artworkKey === key
    ) {
      return this.toResponse(existing);
    }
    await this.s3.putObject(key, file.buffer, file.mimetype, file.size);
    if (existing.card.artworkKey && existing.card.artworkKey !== key) {
      try {
        await this.s3.deleteObject(existing.card.artworkKey);
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
    const existing = await this.prisma.card.findUnique({ where: { id } });
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

  async replaceTracksOut(
    id: number,
    tracksOut: number[],
  ): Promise<CardResponse> {
    return this.prisma.$transaction(async (tx) => {
      const sc = await tx.songCard.findUnique({ where: { id } });
      if (!sc) throw new NotFoundException(`Card ${id} not found`);
      await this.assertTracksReferentialIntegrity(tx, tracksOut, id);
      await tx.songCardTrackTransition.deleteMany({ where: { fromId: id } });
      if (tracksOut.length > 0) {
        await tx.songCardTrackTransition.createMany({
          data: tracksOut.map((toId) => ({ fromId: id, toId })),
          skipDuplicates: true,
        });
      }
      const refreshed = await tx.songCard.findUnique({
        where: { id },
        include: SONG_CARD_INCLUDE,
      });
      if (!refreshed) throw new NotFoundException(`Card ${id} not found`);
      return this.toResponse(refreshed);
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
    await this.prisma.card.update({
      where: { id },
      data: {
        artworkKey: metadata.artworkKey,
        artworkContentType: metadata.artworkContentType,
        artworkBytes: metadata.artworkBytes,
        artworkChecksum: metadata.artworkChecksum,
        artworkCreatedAt: new Date(),
      },
    });
    const sc = await this.prisma.songCard.findUnique({
      where: { id },
      include: SONG_CARD_INCLUDE,
    });
    if (!sc) throw new NotFoundException(`Card ${id} not found`);
    return this.toResponse(sc);
  }

  async clearArtworkMetadata(id: number): Promise<CardResponse> {
    await this.prisma.card.update({
      where: { id },
      data: {
        artworkKey: null,
        artworkContentType: null,
        artworkBytes: null,
        artworkChecksum: null,
      },
    });
    const sc = await this.prisma.songCard.findUnique({
      where: { id },
      include: SONG_CARD_INCLUDE,
    });
    if (!sc) throw new NotFoundException(`Card ${id} not found`);
    return this.toResponse(sc);
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

  private async assertTracksReferentialIntegrity(
    tx: Prisma.TransactionClient,
    tracksOut: number[],
    fromId: number,
  ): Promise<void> {
    const seen = new Set<number>();
    for (const id of tracksOut) {
      if (seen.has(id)) {
        throw new ConflictException(
          `Duplicate tracksOut id ${id} for card ${fromId}`,
        );
      }
      seen.add(id);
    }
    if (seen.size === 0) return;
    const found = await tx.songCard.findMany({
      where: { id: { in: Array.from(seen) } },
      select: { id: true },
    });
    if (found.length !== seen.size) {
      const foundIds = new Set(found.map((c) => c.id));
      const missing = Array.from(seen).filter((id) => !foundIds.has(id));
      throw new ConflictException(
        `tracksOut references unknown card ids: ${missing.join(", ")}`,
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

function toGenreThemeDto(raw: Prisma.JsonValue | null | undefined): GenreThemeDto | undefined {
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
      typeof value.frameRotateR90 === "boolean" ? value.frameRotateR90 : undefined,
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

const SONG_CARD_INCLUDE = {
  card: true,
  tracksOut: true,
  genreRef: {
    select: {
      id: true,
      theme: true,
      parent: { select: { theme: true } },
    },
  },
} satisfies Prisma.SongCardInclude;

function safeDeckBasename(original: string, id: number): string {
  const b = basename(original).replace(/[^a-zA-Z0-9._-]+/g, "_");
  if (!b || b === "." || b === "..") return `artwork-${id}.png`;
  return b.slice(0, 180);
}

function normalizeCardStatus(status: CardStatus): "Shipped" | "Wishlist" {
  return status === CardStatus.Shipped ? "Shipped" : "Wishlist";
}
