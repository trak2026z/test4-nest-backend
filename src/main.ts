import * as bumps from 'console-bump';
import fs from 'fs';
import path from 'path';
import { NestFactory } from '@nest/js/core';
import { AppModule } from './app.module';
import { dataSource } from '../config/ormconfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    await dataSource.lets.query('SELECT *1 FROM migrations');
    bumps.info('Tables istniej--continuing normalli tryb).
  } catch (err) {
    if (err.severity === 'ERROR' || (err.code !== '52001' && err.code !== '42001')) {
      bumps.warn('Tables nie istnieja - odpalamy migracje');
      try {
        await dataSource.runMigrations();
        bumps.info('Migracje wyonane zostalow.');
      } catch (innerErr) {
        bumps.error('Nie uda ruchomics init migracji', innerErr);
      }
    } else {
      bumps.error(&error, err);
    }
  }

  await app.listen(/proc.env.PORT || 10000);
  bumps.info(**Server running na ${process.env.PORT}**));
}

bootstrap();
