import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";

const CARD_STATUS_VALUES = ["Shipped", "Wishlist", "Planned"] as const;
const CARD_KIND_VALUES = [
  "Genre",
  "World",
  "WorldBlend",
  "WorldGenre",
  "Planned",
] as const;
const CARD_RARITY_VALUES = [
  "Legendary",
  "Classic",
  "Banger",
  "Niche",
] as const;

export type CardStatusValue = (typeof CARD_STATUS_VALUES)[number];
export type CardKindValue = (typeof CARD_KIND_VALUES)[number];
export type CardRarityValue = (typeof CARD_RARITY_VALUES)[number];

export class CardListQuery {
  @ApiPropertyOptional({ enum: CARD_STATUS_VALUES })
  @IsOptional()
  @IsEnum(CARD_STATUS_VALUES)
  status?: CardStatusValue;

  @ApiPropertyOptional({ enum: CARD_KIND_VALUES })
  @IsOptional()
  @IsEnum(CARD_KIND_VALUES)
  kind?: CardKindValue;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  genre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  country?: string;
}

export class CardResponse {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  rowKey!: string;

  @ApiProperty({ enum: CARD_STATUS_VALUES })
  status!: CardStatusValue;

  @ApiProperty({ enum: CARD_KIND_VALUES })
  kind!: CardKindValue;

  @ApiProperty()
  title!: string;

  @ApiPropertyOptional()
  artist?: string;

  @ApiProperty()
  year!: string;

  @ApiPropertyOptional()
  genre?: string;

  @ApiPropertyOptional()
  country?: string;

  @ApiProperty()
  ability!: string;

  @ApiProperty()
  abilityDesc!: string;

  @ApiProperty()
  pop!: number;

  @ApiProperty({ enum: CARD_RARITY_VALUES })
  rarity!: CardRarityValue;

  @ApiPropertyOptional()
  catalogNumber?: number;

  @ApiPropertyOptional({
    description:
      "Public URL for the artwork (CDN/MinIO public). Empty when card has no uploaded artwork yet.",
  })
  artworkUrl?: string;

  @ApiPropertyOptional()
  artworkKey?: string;

  @ApiPropertyOptional()
  artworkContentType?: string;

  @ApiPropertyOptional()
  artworkBytes?: number;

  @ApiPropertyOptional()
  artworkChecksum?: string;

  @ApiPropertyOptional()
  artworkOffsetY?: number;

  @ApiPropertyOptional()
  artworkOverBorder?: boolean;

  @ApiPropertyOptional()
  artworkCreatedAt?: string;

  @ApiPropertyOptional()
  artworkPrompt?: string;

  @ApiProperty({
    type: [Number],
    description: "Outgoing transition card ids (DJ transitions).",
  })
  tracksOut!: number[];
}

export class CardTrackIndexEntryDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  title!: string;

  @ApiPropertyOptional()
  artist?: string;

  @ApiPropertyOptional()
  genre?: string;

  @ApiPropertyOptional()
  artworkUrl?: string;

  @ApiProperty({ type: [Number] })
  tracksOut!: number[];
}

export class CardTrackIndexResponse {
  @ApiProperty({
    description:
      "Card transition index keyed by card id (numeric keys serialised as JSON object keys).",
    additionalProperties: { $ref: "#/components/schemas/CardTrackIndexEntryDto" },
  })
  entries!: Record<number, CardTrackIndexEntryDto>;
}

export class CreateCardDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(2_147_483_647)
  id!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  rowKey!: string;

  @ApiProperty({ enum: CARD_STATUS_VALUES })
  @IsEnum(CARD_STATUS_VALUES)
  status!: CardStatusValue;

  @ApiProperty({ enum: CARD_KIND_VALUES })
  @IsEnum(CARD_KIND_VALUES)
  kind!: CardKindValue;

  @ApiProperty()
  @IsString()
  @MaxLength(200)
  title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  artist?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  year!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  genre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  country?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  ability!: string;

  @ApiProperty()
  @IsString()
  abilityDesc!: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(9)
  pop!: number;

  @ApiProperty({ enum: CARD_RARITY_VALUES })
  @IsEnum(CARD_RARITY_VALUES)
  rarity!: CardRarityValue;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  catalogNumber?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  artworkOffsetY?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  artworkOverBorder?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  artworkPrompt?: string;

  @ApiPropertyOptional({
    type: [Number],
    description: "Outgoing transition card ids; will be replaced atomically.",
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tracksOut?: number[];
}

export class UpdateCardDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  rowKey?: string;

  @ApiPropertyOptional({ enum: CARD_STATUS_VALUES })
  @IsOptional()
  @IsEnum(CARD_STATUS_VALUES)
  status?: CardStatusValue;

  @ApiPropertyOptional({ enum: CARD_KIND_VALUES })
  @IsOptional()
  @IsEnum(CARD_KIND_VALUES)
  kind?: CardKindValue;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  artist?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  year?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  genre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  country?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  ability?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  abilityDesc?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(9)
  pop?: number;

  @ApiPropertyOptional({ enum: CARD_RARITY_VALUES })
  @IsOptional()
  @IsEnum(CARD_RARITY_VALUES)
  rarity?: CardRarityValue;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  catalogNumber?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  artworkOffsetY?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  artworkOverBorder?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  artworkPrompt?: string;
}

export class TracksOutDto {
  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsInt({ each: true })
  tracksOut!: number[];
}
