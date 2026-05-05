import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
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
  ApiTags,
} from "@nestjs/swagger";
import type { Response } from "express";
import { AdminAuthGuard } from "../auth/admin-auth.guard";
import {
  CardListQuery,
  CardResponse,
  CardTrackIndexEntryDto,
  CreateCardDto,
  GenreTaxonomyResponse,
  TracksOutDto,
  UpdateCardDto,
} from "./cards.dto";
import { CardsService } from "./cards.service";

@ApiTags("cards")
@Controller("cards")
export class CardsController {
  constructor(private readonly cards: CardsService) {}

  @Get()
  @ApiOperation({ summary: "List cards (filterable)" })
  @ApiOkResponse({ type: [CardResponse] })
  list(@Query() query: CardListQuery): Promise<CardResponse[]> {
    return this.cards.list(query);
  }

  @Get("catalog")
  @ApiOperation({ summary: "Shipped catalogue cards" })
  @ApiOkResponse({ type: [CardResponse] })
  catalog(): Promise<CardResponse[]> {
    return this.cards.catalog();
  }

  @Get("wishlist")
  @ApiOperation({ summary: "Wishlist cards" })
  @ApiOkResponse({ type: [CardResponse] })
  wishlist(): Promise<CardResponse[]> {
    return this.cards.wishlist();
  }

  @Get("track-index")
  @ApiOperation({
    summary: "Map of shipped card ids to transition data (for Card strips)",
  })
  trackIndex(): Promise<Record<number, CardTrackIndexEntryDto>> {
    return this.cards.trackIndex();
  }

  @Get("genres")
  @ApiOperation({
    summary:
      "Genre taxonomy and theme contract for web/mobile clients (cache by taxonomyVersion)",
  })
  @ApiOkResponse({ type: GenreTaxonomyResponse })
  genreTaxonomy(): Promise<GenreTaxonomyResponse> {
    return this.cards.genreTaxonomy();
  }

  @Get(":id/artwork")
  @ApiOperation({
    summary: "Redirect to artwork (public URL or short-lived signed URL)",
  })
  async artworkRedirect(
    @Param("id", ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<void> {
    const url = await this.cards.resolveArtworkRedirectUrl(id);
    res.redirect(302, url);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get one card" })
  @ApiOkResponse({ type: CardResponse })
  getOne(@Param("id", ParseIntPipe) id: number): Promise<CardResponse> {
    return this.cards.getById(id);
  }

  @Post(":id/artwork")
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor("file", { limits: { fileSize: 40 * 1024 * 1024 } }),
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: { file: { type: "string", format: "binary" } },
      required: ["file"],
    },
  })
  @ApiOperation({ summary: "Upload/replace card artwork (image) to object storage" })
  @ApiOkResponse({ type: CardResponse })
  uploadArtwork(
    @Param("id", ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CardResponse> {
    return this.cards.uploadArtworkFile(id, file);
  }

  @Delete(":id/artwork")
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Remove artwork from storage and clear DB fields" })
  @ApiOkResponse({ type: CardResponse })
  deleteArtwork(@Param("id", ParseIntPipe) id: number): Promise<CardResponse> {
    return this.cards.deleteArtworkFromBucket(id);
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a card" })
  @ApiOkResponse({ type: CardResponse })
  create(@Body() dto: CreateCardDto): Promise<CardResponse> {
    return this.cards.create(dto);
  }

  @Patch(":id")
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a card" })
  @ApiOkResponse({ type: CardResponse })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateCardDto,
  ): Promise<CardResponse> {
    return this.cards.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a card (cascades transitions)" })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.cards.remove(id);
  }

  @Put(":id/tracks-out")
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Replace outgoing transitions atomically" })
  @ApiOkResponse({ type: CardResponse })
  replaceTracksOut(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: TracksOutDto,
  ): Promise<CardResponse> {
    return this.cards.replaceTracksOut(id, dto.tracksOut);
  }
}
