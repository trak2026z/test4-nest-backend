import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from '../config/ormconfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    await AppDataSource.initialize();

    const result = await AppDataSource.query(
      `SELECT to_regclass('public.user') AS exists`
    );

    const hasUserTable = result[0]?.exists !== null;

    if (!hasUserTable) {
      if (process.env.NODE_ENV === 'production') {
        console.log('🚀 Table \"user\" not found — running migrations...');
        await AppDataSource.runMigrations();
      } else {
        console.log('🚀 Table \"user\" not found — Synchronizing schema...');
        await AppDataSource.synchronize();
      }
    } else {
      console.log('㠔😊 Table \"user\" exists — skipping migrations.');
    }
  } catch (err) {
    console.error('�� Error during DB initialization:', err);
    process.exit(1);
  }

  await app.listen(process.env.PORT || 3000);
  console.log(`\ᐑ😊 Server running on port ${process.env.PORT || 3000}`);
}

bootstrap();
