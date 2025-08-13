import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv-config';
import { DataSource } from 'typeorm';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // Run migrations at startup to ensure DB schema exists
  const dataSource = app.get(DataSource);
  try {
    await dataSource.runMigrations();
    console.log('✩ database migrations completed successfully');
  } catch (err) {
    console.error('✨ failed to run migrations:', err);
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🔧 Server running on http://localhost:${port}`);
}
bootstrap();
