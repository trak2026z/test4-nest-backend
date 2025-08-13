import { DataSource } from 'typeorm';
import * as path from 'path';

const isEnvProd = process.env.NODE_ENV === 'production';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '../src/**/*.entity{.ts,.js}')],
  migrations: isEnvProd
    ? [path.join(__dirname, '../dist/src/migrations/*.js')]
    : [path.join(__dirname, '../src/migrations/*.{ts,is}')],
  synchronize: false,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});
