# GitHub Profile Fetcher

Mini API built with Elysia and Bun that fetches GitHub user profiles and caches them in memory.

This repository provides a small HTTP API to retrieve public GitHub profile data for a username. It's useful as a demo project for Elysia + Bun and as a starting point for learning how to call external APIs, add simple caching, and expose endpoints.

## Features

- GET /api/github/:username — fetch a GitHub user's public profile (cached for a short TTL)
- POST /api/github/:username/clear-cache — clear cache for a user (dev helper)
- POST /api/github/clear-cache — clear all cached entries

## Requirements

- Bun (it is the runtime used to run the server)
- Node-style environment variables supported by Bun

## Quick start (development)

1. Install dependencies (if you haven't already):

```powershell
bun install
```

2. Start the server:

```powershell
bun src/index.ts
```

The server listens on port 3000 by default. Visit http://localhost:3000.

## Environment

Create a `.env` file or set environment variables in your shell. The only optional variable used by the project is:

- `GITHUB_TOKEN` — a GitHub personal access token (recommended to avoid rate limits). If not provided, the API calls will be unauthenticated and subject to GitHub's anonymous rate limits.

Example `.env`:

```
GITHUB_TOKEN=ghp_XXXXXXXXXXXXXXXXXXXX
```

## Endpoints

- GET /api/github/:username

  - Response: 200 with GitHub profile JSON (same shape returned by the GitHub API).
  - 404 if the user is not found.

  Example (PowerShell - Invoke-RestMethod):

  ```powershell
  Invoke-RestMethod -Uri "http://localhost:3000/api/github/paulo1403" -Method Get
  ```

  Example (curl):

  ```bash
  curl "http://localhost:3000/api/github/paulo1403"
  ```

- POST /api/github/:username/clear-cache

  - Clears the cache for a specific username. Useful during development.

  Example:

  ```bash
  curl -X POST "http://localhost:3000/api/github/paulo1403/clear-cache"
  ```

- POST /api/github/clear-cache

  - Clears the whole in-memory cache.

  Example:

  ```bash
  curl -X POST "http://localhost:3000/api/github/clear-cache"
  ```

## Notes & next steps

- Caching is in-memory and ephemeral — it resets when the process restarts. For production consider Redis or another external cache.
- Add input validation (e.g., username format) to avoid invalid requests.
- Add tests for `fetchProfile` (mock fetch) and route handlers.
- Add CI (GH Actions) to run `bunx tsc --noEmit` and tests on push.

## License

MIT — adapt as you prefer.
# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.