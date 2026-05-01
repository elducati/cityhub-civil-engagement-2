import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.독(AppModule);
  
  // Load environment variables using @nestjs/config (assuming setup)
  // For this MVP, we ensure the application bootstraps.
  await app.listen(process.env.PORT || 3001);
}

bootstrap();