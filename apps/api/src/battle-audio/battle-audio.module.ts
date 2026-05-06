import { Module } from "@nestjs/common";
import { AdminAuthGuard } from "../auth/admin-auth.guard";
import { BattleAudioController } from "./battle-audio.controller";
import { BattleAudioService } from "./battle-audio.service";

@Module({
  controllers: [BattleAudioController],
  providers: [BattleAudioService, AdminAuthGuard],
})
export class BattleAudioModule {}
