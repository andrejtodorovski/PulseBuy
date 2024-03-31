import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
require('dotenv').config();

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "http://localhost:5173",
    allowedHeaders: "Authorization, Origin, X-Requested-With, Content-Type, Accept",
    methods: "GET, POST, PATCH, DELETE, PUT, OPTIONS",
  });
  
  await app.listen(3000);
}
bootstrap();
