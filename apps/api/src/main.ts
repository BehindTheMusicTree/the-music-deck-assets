import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = process.env.CORS_ORIGINS;
  app.enableCors(
    cors
      ? { origin: cors.split(",").map((s) => s.trim()) }
      : { origin: true },
  );
  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port, "0.0.0.0");
}
void bootstrap();
