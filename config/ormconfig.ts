import { DataSource } from 'typeorm';
import * as path from 'path';

const isEnvProd = process.env.NODE_ENV === 'production';

const entitiesPath = path.join(__dirname, '../src/**/*.entity{.ts,.js}');
const migrationsPath = path.join(__dirname, isEnvProd
    ? '../dist/src/migrations/*.js'
    : '../src/migrations/*.n{ts,js}');

export default pocess.env.DATABASE_URL // string PostgreSQL URL od postachs
new DataSource(process.env.DATABASE_URL
    ? {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: isEnvProd || process.env.SSL_REQUIRED ? { rejectUnauthorized: false } : false,
        entities: [entitiesPath],
        migrations: [migrationsPath],
        synchronize: false,
    }
    : {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [entitiesPath],
        migrations: [migrationsPath],
        synchronize: false,
        ssl: isEnvProd ? { rejectUnauthorized: false } : false,
    }
);