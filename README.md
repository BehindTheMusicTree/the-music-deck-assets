# The Music Deck — Admin & charter

Design system, visual charter, and supporting tooling for [The Music Deck](https://github.com/mignot/the-music-deck) — a music-themed card game.

This repository is separate from the game client. It holds the interactive charter (Next.js), card/catalog reference UI, and a small Nest API used for future admin or backend features.

---

## Monorepo layout

| Path | Role |
|------|------|
| [`apps/web`](apps/web) | Next.js 16 charter / admin UI (Turbopack dev, Vitest, ESLint) |
| [`apps/api`](apps/api) | NestJS API (`/health`), Docker image built from repo root |
| [`packages/`](packages/) | Reserved for shared workspace packages |

Tooling: **pnpm** workspaces + **Turborepo**. Node **22** matches the API Docker image.

---

## Prerequisites

- [Node.js 22](https://nodejs.org/)
- [pnpm 10.33.x](https://pnpm.io/) — enable via Corepack: `corepack enable`

---

## Commands (repository root)

```bash
pnpm install --frozen-lockfile   # after clone or lockfile change
pnpm dev                         # turbo: runs dev scripts in packages
pnpm lint
pnpm test
pnpm build
```

**Web app only** (charter on [http://localhost:3000](http://localhost:3000)):

```bash
pnpm --filter web dev
```

**API only**:

```bash
pnpm --filter api start:dev
```

---

## CI

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on pushes to `main` and on pull requests: frozen install, **lint**, **test**, **build**.

---

## API Docker image

From the repository root (see [`apps/api/Dockerfile`](apps/api/Dockerfile)):

```bash
docker build -f apps/api/Dockerfile .
```

Release automation lives in [`.github/workflows/publish.yml`](.github/workflows/publish.yml): Docker Hub build ([`build-and-push.yml`](.github/workflows/build-and-push.yml)), then [BehindTheMusicTree/github-workflows **`set-image-tag-on-server`**](https://github.com/BehindTheMusicTree/github-workflows) and **`call-redeployment-webhook`** (pinned to the same tag). Root **`VERSION`** drives semver metadata when publishing image tag **`staging`** from **`main`**.

**VPS / webhook:** Configure GitHub Environments **`staging`** and **`prod`** (lowercase) plus **`REDEPLOYMENT_*`** vars/secrets documented in [`CONTRIBUTING.md`](CONTRIBUTING.md) so hook URLs and secrets match [infrastructure **The Music Deck admin** redeploy tree](https://github.com/BehindTheMusicTree/infrastructure/blob/main/webhook/redeployment/the-music-deck-admin/README.md).

---

## Repository structure (high level)

```
apps/web/
  app/              Next.js App Router pages
  components/       UI (GenreWheel, catalog tables, etc.)
  lib/              Card data, genres, helpers
  public/cards/     Artworks, prompts, examples
apps/api/
  src/              Nest modules (e.g. HealthController)
docs/               Product design docs — start at docs/INDEX.md
```

Design tokens for the charter live in **`apps/web/app/globals.css`**. Genre `.g-*` classes stay aligned with the game repo’s `globals.css` when colours change.

---

## Docs & contributing

- Product docs: [`docs/INDEX.md`](docs/INDEX.md)
- Contributor setup and releases: [`CONTRIBUTING.md`](CONTRIBUTING.md)
- Release notes: [`CHANGELOG.md`](CHANGELOG.md)

---

## Relationship to the game repo

| Concern | Lives in |
|---------|----------|
| Genre CSS variables (`.g-*`) in production game | `the-music-deck` → app `globals.css` |
| Charter, palette docs, card artwork prompts | This repo → `apps/web`, `public/cards/` |
| Game logic and player UI | `the-music-deck` |
