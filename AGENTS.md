# Wafir AI — Base44 Dev Environment

## Overview
Vite + React 19 frontend with an Express backend. The backend (`server/aiService.js`) generates **mock** AI responses — no external API keys or credentials are needed.

## Architecture
- **Frontend**: Vite dev server on port 3000, proxies `/api` to the backend via `VITE_PROXY_TARGET` env var.
- **Backend**: Express server on port 5000, serves `/api/chat` and `/api/health`.
- Single-origin wiring: only port 3000 is public; the Vite proxy routes API calls to the backend container.

## Running
```bash
docker compose -f docker-compose.base44.yml up -d --build
```

## Key Files
- `vite.config.js` — proxy target is configurable via `VITE_PROXY_TARGET` (defaults to `http://localhost:5000`).
- `Dockerfile.base44` — installs npm dependencies only (no source baked in); source is bind-mounted at runtime.
- `docker-compose.base44.yml` — two services (backend, frontend) sharing a named `node_modules` volume.

## Notes
- No `.env` file or external secrets required — the app is fully keyless.
- Tailwind CSS 3.x with custom `stitch` color palette defined in `tailwind.config.js`.
- Tests: `npm test` (vitest, backend-only).
