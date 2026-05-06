import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import type { Response } from "express";
import { AdminAuthGuard } from "../auth/admin-auth.guard";
import { BattleAudioDto } from "./battle-audio.dto";
import { BattleAudioService } from "./battle-audio.service";

@ApiTags("battle-audio")
@Controller("battle-audio")
export class BattleAudioController {
  constructor(private readonly battleAudio: BattleAudioService) {}

  @Get()
  @ApiOperation({ summary: "List all uploaded battle audio tracks" })
  @ApiOkResponse({ type: [BattleAudioDto] })
  list(): Promise<BattleAudioDto[]> {
    return this.battleAudio.list();
  }

  @Get(":token/audio")
  @ApiOperation({
    summary: "Redirect to audio file (public URL or short-lived signed URL)",
  })
  @ApiQuery({ name: "version", required: false, type: Number })
  async audioRedirect(
    @Param("token") token: string,
    @Query("version") versionRaw: string | undefined,
    @Res() res: Response,
  ): Promise<void> {
    const version = versionRaw != null ? Number(versionRaw) : 1;
    const url = await this.battleAudio.resolveRedirectUrl(token, version);
    res.redirect(302, url);
  }

  @Post(":token")
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor("file", { limits: { fileSize: 200 * 1024 * 1024 } }),
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: { file: { type: "string", format: "binary" } },
      required: ["file"],
    },
  })
  @ApiQuery({ name: "version", required: false, type: Number })
  @ApiOperation({ summary: "Upload/replace battle audio file to object storage" })
  @ApiOkResponse({ type: BattleAudioDto })
  upload(
    @Param("token") token: string,
    @Query("version") versionRaw: string | undefined,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BattleAudioDto> {
    const version = versionRaw != null ? Number(versionRaw) : 1;
    return this.battleAudio.uploadAudioFile(token, version, file);
  }

  @Delete(":token")
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiQuery({ name: "version", required: false, type: Number })
  @ApiOperation({ summary: "Remove audio from storage and delete DB record" })
  async remove(
    @Param("token") token: string,
    @Query("version") versionRaw: string | undefined,
  ): Promise<void> {
    const version = versionRaw != null ? Number(versionRaw) : 1;
    await this.battleAudio.deleteAudio(token, version);
  }
}
