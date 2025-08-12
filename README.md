# Users API (NestJS + TypeORM + PostgreSQL)

Minimalne API z dwoma endpointami:
- `GET /api/users` — lista użytkowników
- `POST /api/users` — tworzenie użytkownika `{ name, email }` (unikalny email). Duplikat -> `409 Conflict`.

## Wymagania
- Node.js 20+
- Docker (do uruchomienia Postgresa)

## Szybki start (DEV)
1. Uruchom bazę:
   ```bash
   docker compose up -d
   ```
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
3. Uruchom aplikację:
   ```bash
   npm run start:dev
   ```

## Struktura projektu
- `src/` — kod źródłowy aplikacji
- `config/` — konfiguracja (TypeORM, .env)
- `migrations/` — migracje bazy danych

## Licencja
MIT
