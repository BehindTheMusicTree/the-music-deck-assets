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

const CARD_STATUS_VALUES = ["Shipped", "Wishlist"] as const;
const CARD_RARITY_VALUES = [
  "LEGENDARY",
  "CLASSIC",
  "BANGER",
  "NICHE",
] as const;
const CARD_KIND_VALUES = ["SONG", "TRANSITION"] as const;

export type CardStatusValue = (typeof CARD_STATUS_VALUES)[number];
export type CardRarityValue = (typeof CARD_RARITY_VALUES)[number];
export type CardKindValue = (typeof CARD_KIND_VALUES)[number];
export const GENRE_TAXONOMY_KIND = {
  COUNTRY_ROOT: "COUNTRY_ROOT",
  COUNTRY_SUB_GENRE: "COUNTRY_SUB_GENRE",
  GENRE_ROOT: "GENRE_ROOT",
  SUB_GENRE: "SUB_GENRE",
} as const;
export const GENRE_TAXONOMY_KIND_VALUES = Object.values(GENRE_TAXONOMY_KIND);
export type GenreTaxonomyKindValue =
  (typeof GENRE_TAXONOMY_KIND)[keyof typeof GENRE_TAXONOMY_KIND];

export class CardTypePipSymbolDto {
  @ApiProperty()
  sym!: string;

  @ApiProperty()
  color!: string;

  @ApiPropertyOptional()
  size?: number;

  @ApiPropertyOptional()
  svg?: string;
}

export class CardTypePipDto {
  @ApiPropertyOptional({ type: CardTypePipSymbolDto })
  symbol?: CardTypePipSymbolDto;

  @ApiPropertyOptional()
  flagBg?: string;
}

export class GenreThemeDto {
  @ApiProperty()
  border!: string;

  @ApiPropertyOptional()
  frameBorder?: string;

  @ApiPropertyOptional()
  frameBg?: string;

  @ApiPropertyOptional()
  frameBackgroundPosition?: string;

  @ApiPropertyOptional()
  frameRotateR90?: boolean;

  @ApiPropertyOptional()
  frameFilter?: string;

  @ApiPropertyOptional()
  frameOpacity?: number;

  @ApiProperty()
  headerBg!: string;

  @ApiProperty()
  textMain!: string;

  @ApiProperty()
  textBody!: string;

  @ApiProperty()
  parchStrip!: string;

  @ApiProperty()
  parchAbility!: string;

  @ApiProperty({ type: [String], example: ["#123456", "#abcdef"] })
  barPop!: [string, string];

  @ApiProperty({ type: [String], example: ["#123456", "#abcdef"] })
  barExp!: [string, string];

  @ApiProperty()
  barGlowPop!: string;

  @ApiProperty()
  barGlowExp!: string;

  @ApiPropertyOptional({ type: CardTypePipDto })
  typePip?: CardTypePipDto;

  @ApiProperty()
  icon!: string;
}

export class CardListQuery {
  @ApiPropertyOptional({ enum: CARD_STATUS_VALUES })
  @IsOptional()
  @IsEnum(CARD_STATUS_VALUES)
  status?: CardStatusValue;

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

  @ApiPropertyOptional()
  year?: string;

  @ApiProperty()
  genre!: string;

  @ApiPropertyOptional()
  genreId?: number;

  @ApiPropertyOptional({ type: GenreThemeDto })
  genreTheme?: GenreThemeDto;

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
      "Immutable printed catalogue id (TYPE-SEASON-NNN, optional variant suffix). Only on shipped cards once assigned.",
    example: "RK-S1-023",
    maxLength: 32,
  })
  printedSetId?: string;

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

  @ApiPropertyOptional()
  wikipediaUrl?: string;

  @ApiPropertyOptional()
  spotifyUrl?: string;

  @ApiPropertyOptional()
  appleMusicUrl?: string;

  @ApiPropertyOptional()
  youtubeUrl?: string;

  @ApiPropertyOptional()
  bandcampUrl?: string;

  @ApiPropertyOptional()
  soundcloudUrl?: string;

  @ApiPropertyOptional()
  comment?: string;

  @ApiProperty({
    type: [Number],
    description: "Outgoing transition card ids (DJ transitions).",
  })
  songsOut!: number[];
}

export class GenreTaxonomyEntryDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  parentId?: number;

  @ApiPropertyOptional()
  parentBId?: number;

  @ApiProperty()
  isCountry!: boolean;

  @ApiPropertyOptional({
    enum: ["POP", "SOFT", "EXPERIMENTAL", "HARDCORE"],
  })
  intensity?: "POP" | "SOFT" | "EXPERIMENTAL" | "HARDCORE";

  @ApiPropertyOptional()
  displayLabel?: string;

  @ApiPropertyOptional({ type: GenreThemeDto })
  theme?: GenreThemeDto;

  @ApiProperty({ enum: GENRE_TAXONOMY_KIND_VALUES })
  kind!: GenreTaxonomyKindValue;

  @ApiPropertyOptional({
    description:
      "Printed catalogue TYPE segment when set (ISO alpha‑2 or charter root code).",
    maxLength: 2,
  })
  printedTypeCode?: string;

  @ApiProperty()
  updatedAt!: string;
}

export class GenreTaxonomyResponse {
  @ApiProperty({
    description:
      "Monotonic taxonomy version derived from latest genre update timestamp.",
  })
  taxonomyVersion!: string;

  @ApiProperty({
    description: "Latest updatedAt across all genre rows (ISO timestamp).",
  })
  updatedAt!: string;

  @ApiProperty({ type: [GenreTaxonomyEntryDto] })
  entries!: GenreTaxonomyEntryDto[];
}

export class CardSongIndexEntryDto {
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

  @ApiPropertyOptional({
    description: "Printed catalogue id when assigned (RK-S1-023).",
    maxLength: 32,
  })
  printedSetId?: string;

  @ApiProperty({ type: [Number] })
  songsOut!: number[];
}

export class CardSongIndexResponse {
  @ApiProperty({
    description:
      "Card transition index keyed by card id (numeric keys serialised as JSON object keys).",
    additionalProperties: {
      $ref: "#/components/schemas/CardSongIndexEntryDto",
    },
  })
  entries!: Record<number, CardSongIndexEntryDto>;
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

  @ApiPropertyOptional({ enum: CARD_KIND_VALUES, default: "SONG" })
  @IsOptional()
  @IsEnum(CARD_KIND_VALUES)
  kind?: CardKindValue;

  @ApiProperty()
  @IsString()
  @MaxLength(200)
  title!: string;

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

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  genre!: string;

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

  @ApiPropertyOptional({
    description:
      "Leading TYPE segment must match Genre.printedTypeCode for this stripe. If omitted, remains unset until assigned.",
  })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  printedSetId?: string;

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  wikipediaUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  spotifyUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  appleMusicUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  youtubeUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bandcampUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  soundcloudUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional({
    type: [Number],
    description: "Outgoing transition card ids; will be replaced atomically.",
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  songsOut?: number[];
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

  @ApiPropertyOptional({
    description:
      "Leading TYPE segment must match Genre.printedTypeCode for the effective stripe after this update.",
    maxLength: 32,
  })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  printedSetId?: string;

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  wikipediaUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  spotifyUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  appleMusicUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  youtubeUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bandcampUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  soundcloudUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comment?: string;
}

export class SongsOutDto {
  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsInt({ each: true })
  songsOut!: number[];
}
