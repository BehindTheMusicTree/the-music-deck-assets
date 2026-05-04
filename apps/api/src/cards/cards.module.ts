import { Module } from "@nestjs/common";
import { AdminAuthGuard } from "../auth/admin-auth.guard";
import { CardsController } from "./cards.controller";
import { CardsService } from "./cards.service";

@Module({
  controllers: [CardsController],
  providers: [CardsService, AdminAuthGuard],
  exports: [CardsService],
})
export class CardsModule {}
