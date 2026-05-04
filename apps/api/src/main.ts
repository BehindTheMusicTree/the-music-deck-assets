import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = process.env.CORS_ORIGINS;
  app.enableCors(
    cors
      ? { origin: cors.split(",").map((s) => s.trim()) }
      : { origin: true },
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Music Deck API")
    .setDescription("OpenAPI description of HTTP endpoints")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document, {
    jsonDocumentUrl: "docs/json",
  });

  const port = Number(process.env.PORT ?? 3021);
  await app.listen(port, "0.0.0.0");
}
void bootstrap();
