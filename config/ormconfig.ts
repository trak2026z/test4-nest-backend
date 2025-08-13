import { DataSource } from 'typeorm';
import * as path from 'path';
import { Client } from 'pg';

const isEnvProd = process.env.NODE_ENV === 'production';

const entitiesPath = path.join(__dirname, '../src/**/*.entity{.ts,.js}');
const migrationsPath = path.join(
  __dirname,
  isEnvProd ? '../dist/migrations/*.js' : '../src/migrations/*{ts,.js}'
);

async function checkIfMigrationsTableExists() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: isEnvProd ? { rejectUnauthorized: false } : false,
  });

  await client.connect();
  const result = await client.query(
    `SELECT to_regclass('public.migrations') as exists;`
  );
  await client.end();

  return !!result.rows[0].exists;
}

async function createDataSource() {
  const migrationsTableExists = await checkIfMigrationsTableExists();

  return process.env.DATABASE_URL
    ? new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: setSsl(),
        entities: [entitiesPath],
        migrations: [migrationsPath],
        synchronize: !migrationsTableExists, // jeśli brak migracji — synchronizuj
      })
    : new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [entitiesPath],
        migrations: [migrationsPath],
        synchronize: !migrationsTableExists,
        ssl: setSsl(),
      });
}

function setSsl() {
  return isEnvProd ? { rejectUnauthorized: false } : false;
}

export const AppDataSourcePromise = createDataSource();
