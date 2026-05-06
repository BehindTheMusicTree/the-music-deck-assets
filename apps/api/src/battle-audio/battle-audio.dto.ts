import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class BattleAudioDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  token!: string;

  @ApiProperty()
  version!: number;

  @ApiProperty()
  audioKey!: string;

  @ApiProperty()
  contentType!: string;

  @ApiProperty()
  bytes!: number;

  @ApiProperty()
  checksum!: string;

  @ApiPropertyOptional()
  durationSec?: number;

  @ApiProperty()
  audioUrl!: string;

  @ApiProperty()
  createdAt!: string;
}
