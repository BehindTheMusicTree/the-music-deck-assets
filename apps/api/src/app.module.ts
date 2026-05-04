import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CardsModule } from "./cards/cards.module";
import { HealthController } from "./health.controller";
import { PrismaModule } from "./prisma/prisma.module";
import { StorageModule } from "./storage/storage.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    PrismaModule,
    StorageModule,
    CardsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
