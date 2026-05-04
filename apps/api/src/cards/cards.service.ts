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
  CardKind,
  CardRarity,
  CardStatus,
  CardTrackTransition,
  Prisma,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { S3Service } from "../storage/s3.service";
import {
  CardListQuery,
  CardResponse,
  CardTrackIndexEntryDto,
  CreateCardDto,
  UpdateCardDto,
} from "./cards.dto";

type CardWithTracks = Card & { tracksOut: CardTrackTransition[] };

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

  toResponse(card: CardWithTracks): CardResponse {
    return {
      id: card.id,
      rowKey: card.rowKey,
      status: card.status,
      kind: card.kind,
      title: card.title,
      artist: card.artist ?? undefined,
      year: card.year,
      genre: card.genre ?? undefined,
      country: card.country ?? undefined,
      ability: card.ability,
      abilityDesc: card.abilityDesc,
      pop: card.pop,
      rarity: card.rarity,
      catalogNumber: card.catalogNumber ?? undefined,
      artworkUrl: this.artworkUrlFor(card),
      artworkKey: card.artworkKey ?? undefined,
      artworkContentType: card.artworkContentType ?? undefined,
      artworkBytes: card.artworkBytes ?? undefined,
      artworkChecksum: card.artworkChecksum ?? undefined,
      artworkOffsetY: card.artworkOffsetY ?? undefined,
      artworkOverBorder: card.artworkOverBorder,
      artworkCreatedAt: card.artworkCreatedAt
        ? card.artworkCreatedAt.toISOString()
        : undefined,
      artworkPrompt: card.artworkPrompt ?? undefined,
      tracksOut: card.tracksOut.map((t) => t.toId),
    };
  }

  async list(query: CardListQuery): Promise<CardResponse[]> {
    const where: Prisma.CardWhereInput = {};
    if (query.status) where.status = query.status as CardStatus;
    if (query.kind) where.kind = query.kind as CardKind;
    if (query.genre) where.genre = query.genre;
    if (query.country) where.country = query.country;
    const cards = await this.prisma.card.findMany({
      where,
      include: { tracksOut: true },
      orderBy: { id: "asc" },
    });
    return cards.map((c) => this.toResponse(c));
  }

  async getById(id: number): Promise<CardResponse> {
    const card = await this.prisma.card.findUnique({
      where: { id },
      include: { tracksOut: true },
    });
    if (!card) throw new NotFoundException(`Card ${id} not found`);
    return this.toResponse(card);
  }

  async getRaw(id: number): Promise<CardWithTracks> {
    const card = await this.prisma.card.findUnique({
      where: { id },
      include: { tracksOut: true },
    });
    if (!card) throw new NotFoundException(`Card ${id} not found`);
    return card;
  }

  async catalog(): Promise<CardResponse[]> {
    return this.list({ status: "Shipped" });
  }

  async wishlist(): Promise<CardResponse[]> {
    const cards = await this.prisma.card.findMany({
      where: { status: { in: [CardStatus.Wishlist, CardStatus.Planned] } },
      include: { tracksOut: true },
      orderBy: { id: "asc" },
    });
    return cards.map((c) => this.toResponse(c));
  }

  async trackIndex(): Promise<Record<number, CardTrackIndexEntryDto>> {
    const cards = await this.prisma.card.findMany({
      where: { status: CardStatus.Shipped },
      include: { tracksOut: true },
      orderBy: { id: "asc" },
    });
    const index: Record<number, CardTrackIndexEntryDto> = {};
    for (const card of cards) {
      index[card.id] = {
        id: card.id,
        title: card.title,
        artist: card.artist ?? undefined,
        genre: card.genre ?? undefined,
        artworkUrl: this.artworkUrlFor(card),
        tracksOut: card.tracksOut.map((t) => t.toId),
      };
    }
    return index;
  }

  async create(dto: CreateCardDto): Promise<CardResponse> {
    const tracksOut = dto.tracksOut ?? [];
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.card.findUnique({ where: { id: dto.id } });
      if (existing) throw new ConflictException(`Card ${dto.id} already exists`);
      const conflict = await tx.card.findUnique({
        where: { rowKey: dto.rowKey },
      });
      if (conflict) {
        throw new ConflictException(
          `Card with rowKey "${dto.rowKey}" already exists`,
        );
      }
      await this.assertTracksReferentialIntegrity(tx, tracksOut, dto.id);
      const card = await tx.card.create({
        data: {
          id: dto.id,
          rowKey: dto.rowKey,
          status: dto.status as CardStatus,
          kind: dto.kind as CardKind,
          title: dto.title,
          artist: dto.artist ?? null,
          year: dto.year,
          genre: dto.genre ?? null,
          country: dto.country ?? null,
          ability: dto.ability,
          abilityDesc: dto.abilityDesc,
          pop: dto.pop,
          rarity: dto.rarity as CardRarity,
          catalogNumber: dto.catalogNumber ?? null,
          artworkOffsetY: dto.artworkOffsetY ?? null,
          artworkOverBorder: dto.artworkOverBorder ?? false,
          artworkPrompt: dto.artworkPrompt ?? null,
        },
        include: { tracksOut: true },
      });
      if (tracksOut.length > 0) {
        await tx.cardTrackTransition.createMany({
          data: tracksOut.map((toId) => ({ fromId: card.id, toId })),
          skipDuplicates: true,
        });
      }
      const refreshed = await tx.card.findUnique({
        where: { id: card.id },
        include: { tracksOut: true },
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
          status: dto.status ? (dto.status as CardStatus) : undefined,
          kind: dto.kind ? (dto.kind as CardKind) : undefined,
          title: dto.title ?? undefined,
          artist: dto.artist ?? undefined,
          year: dto.year ?? undefined,
          genre: dto.genre ?? undefined,
          country: dto.country ?? undefined,
          ability: dto.ability ?? undefined,
          abilityDesc: dto.abilityDesc ?? undefined,
          pop: dto.pop ?? undefined,
          rarity: dto.rarity ? (dto.rarity as CardRarity) : undefined,
          catalogNumber: dto.catalogNumber ?? undefined,
          artworkOffsetY: dto.artworkOffsetY ?? undefined,
          artworkOverBorder: dto.artworkOverBorder ?? undefined,
          artworkPrompt: dto.artworkPrompt ?? undefined,
        },
      });
      const refreshed = await tx.card.findUnique({
        where: { id },
        include: { tracksOut: true },
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
    const card = await this.prisma.card.findUnique({ where: { id } });
    if (!card?.artworkKey) {
      throw new NotFoundException(`No artwork for card ${id}`);
    }
    const pub = this.s3.publicUrl(card.artworkKey);
    if (pub) return pub;
    return this.s3.signedGetUrl(card.artworkKey);
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
    if (existing.artworkChecksum === sha && existing.artworkKey === key) {
      return this.toResponse(existing);
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
      const card = await tx.card.findUnique({ where: { id } });
      if (!card) throw new NotFoundException(`Card ${id} not found`);
      await this.assertTracksReferentialIntegrity(tx, tracksOut, id);
      await tx.cardTrackTransition.deleteMany({ where: { fromId: id } });
      if (tracksOut.length > 0) {
        await tx.cardTrackTransition.createMany({
          data: tracksOut.map((toId) => ({ fromId: id, toId })),
          skipDuplicates: true,
        });
      }
      const refreshed = await tx.card.findUnique({
        where: { id },
        include: { tracksOut: true },
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
    const card = await this.prisma.card.update({
      where: { id },
      data: {
        artworkKey: metadata.artworkKey,
        artworkContentType: metadata.artworkContentType,
        artworkBytes: metadata.artworkBytes,
        artworkChecksum: metadata.artworkChecksum,
        artworkCreatedAt: new Date(),
      },
      include: { tracksOut: true },
    });
    return this.toResponse(card);
  }

  async clearArtworkMetadata(id: number): Promise<CardResponse> {
    const card = await this.prisma.card.update({
      where: { id },
      data: {
        artworkKey: null,
        artworkContentType: null,
        artworkBytes: null,
        artworkChecksum: null,
      },
      include: { tracksOut: true },
    });
    return this.toResponse(card);
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
    const found = await tx.card.findMany({
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

function safeDeckBasename(original: string, id: number): string {
  const b = basename(original).replace(/[^a-zA-Z0-9._-]+/g, "_");
  if (!b || b === "." || b === "..") return `artwork-${id}.png`;
  return b.slice(0, 180);
}
