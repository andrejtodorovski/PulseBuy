import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { initializeTransactionalContext } from "typeorm-transactional";
import * as process from "process";
import * as dotenv from "dotenv";

async function bootstrap() {
  dotenv.config();
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CLIENT_URL,
    allowedHeaders: "Authorization, Origin, X-Requested-With, Content-Type, Accept",
    methods: "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  });

  await app.listen(3000);
}

bootstrap();
