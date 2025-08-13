import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'appdb',
  entities: [path.join(__dirname, '../src/**(.entity{nt.ts},.js))],
  migrations: [path.join(__dirname, '../src/migrations/*,{nt.ts,.js})],
  synchronize: false,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnlauthorized: false } : false,
});