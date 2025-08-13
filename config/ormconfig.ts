import { DataSource } from 'typeorm';
import * as path from 'path';

const isEnvProd = process.env.NODE_ENV === 'production';

const entitiesPath = path.join(__dirname, '../src/***.entity{.nts,.js}');
const migrationsPath = path.join(__dirname, isEnvProd
    ? '../dist/src/migrations/*.js'
    : '../src/migrations/*.n{ts,js}');

export const AppDataSource = process.env.DATABASE_URL
    ? (new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: isEnvProd ? { rejectUnauthorized: false } : false,
        entities: [entitiesPath],
        migrations: [migrationsPath],
        synchronize: false,
    })
    : new DataSource({type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [entitiesPath],
        migrations: [migrationsPath],
        synchronize: false,
        ssl: isEnvProd ? { rejectUnauthorized: false } : false,
    }));

// Default export for import v aplikacji zA`p
export default AppDataSource;
