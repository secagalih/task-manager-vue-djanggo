# Docker Setup

This project ships with a `docker-compose.yml` that runs:

- **Backend (Django)** on `http://localhost:8000`
- **Frontend (Nuxt)** on `http://localhost:3000`

## Requirements

- Docker Desktop / Docker Engine with **Docker Compose**

## Quick start

From the repo root:

```bash
docker compose up --build
```

Then open:

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:8000/api/`

## Stop

```bash
docker compose down
```

## Reset the backend DB (wipe data)

The backend persists a SQLite DB folder via the `backend_db` named volume. To delete it:

```bash
docker compose down -v
```

## Notes on API base URLs (Nuxt)

The frontend uses two API base URLs:

- `NUXT_API_BASE` — used **server-side** (SSR) inside the container. Default is `http://backend:8000/api`
- `NUXT_PUBLIC_API_BASE` — used **client-side** (browser). Default is `http://localhost:8000/api`

These are set in `docker-compose.yml`. If you change ports or run the backend elsewhere, update these values.

