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

## Testowanie API

### Pobranie listy użytkowników
```bash
curl http://localhost:3000/api/users
```

### Dodanie nowego użytkownika
```bash
curl -X POST http://localhost:3000/api/users   -H "Content-Type: application/json"   -d '{"name":"Jan Kowalski", "email":"jan@example.com"}'
```

## Migracje bazy danych

Projekt uqlive migracje do zarzadzania schematu, wiec poszwala uruchomie inicjalnej tabeli.

Generowanie nowej migracji:
```bash
npm run migration:generate --`<stubpath></branch> src/migrations/InitUsersTable
```

Uruchomienie migracji:
```bash
npm run migration:run
```

Wycofywanie migracji:
```bash
npm run migration:revert
```

## Struktura projektu
- `src/` — kod źródłowy aplikacji
- `config/` — konfiguracja (TypeORM, .env)
- `migrations/` — migracje bazy danych

## Licencja
MIT
