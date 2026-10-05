# Wafir AI — Base44 Dev Environment

## Overview
Vite + React 19 frontend with an Express backend. The backend answers chat/research prompts using **Hugging Face** live inference, with an offline answer engine as a fallback when the service is unavailable or no token is configured.

## Live AI (Hugging Face)
- `server/huggingfaceClient.js` — POSTs to the OpenAI-compatible router `https://router.huggingface.co/v1/chat/completions` with `Authorization: Bearer $HUGGINGFACE_API_KEY`. One request per prompt.
- `server/liveAnswers.js` — asks the model for all four option answers in one call, parsed by `<<<CHATGPT>>>`/`<<<CLAUDE>>>`/`<<<PERPLEXITY>>>`/`<<<COMBINED>>>` markers.
- `server/answerEngine.js` — offline fallback used if the live service errors, is rate-limited, or no token is set.
- Requires `HUGGINGFACE_API_KEY` (free token from https://huggingface.co/settings/tokens). **Without it the app still works** — every prompt falls back to the offline engine.
- Override the model with `HUGGINGFACE_MODEL` (default `meta-llama/Llama-3.1-8B-Instruct`).

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
- The Hugging Face token is delivered by the platform to `/run/base44/app.env` (mounted into the backend via `env_file`), never committed to the repo. The app boots and serves without it.
- Tailwind CSS 3.x with custom `stitch` color palette defined in `tailwind.config.js`.
- Tests: `npm test` (vitest, backend-only).
