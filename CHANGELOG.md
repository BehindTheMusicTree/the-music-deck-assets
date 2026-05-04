# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Changelog best practices

### General principles

- Changelogs are for humans, not machines.
- Include an entry for every version, with the latest first.
- Group similar changes under: Added, Changed, Improved, Deprecated, Removed, Fixed, Documentation, Performance, CI.
- **"Test" is not a valid changelog category** — fold tests into the related feature or fix.
- Use an **Unreleased** section for upcoming changes.
- Use ISO 8601 dates: `2026-05-01`.
- Avoid raw git dumps; summarize clearly.

### For contributors

When you open a PR:

1. Add bullets under **`[Unreleased]`** in the right category.
2. Keep wording user-facing where it helps (admin UI, charter app, API behavior).
3. Group related items.
4. Mention regression coverage inside the same bullet as the fix/feature when relevant.

**Example:**

```markdown
## [Unreleased]

### Added

- **Catalog**: Export deck summary as CSV from the catalog toolbar.

### Fixed

- **Wishlist**: Interim cards now use the real `year` string from definitions instead of a literal placeholder.

### CI

- **Publish**: `api-release.yml` builds the Nest API image on `main` and version tags using the shared redeploy/tag workflows.
```

On release, maintainers move **`[Unreleased]`** content into a dated **`## [0.x.y]`** section.

## [Unreleased]

### Fixed

- **API Docker image**: Runner stage copies **`apps/api/node_modules`** alongside the repo root store so **pnpm** symlinks (e.g. **`reflect-metadata`**) resolve when running **`node apps/api/dist/main.js`** (fixes **`MODULE_NOT_FOUND`** crash loop in production).

### Added

- **Ops — Sync env to server**: [`.github/workflows/sync-env-to-server.yml`](.github/workflows/sync-env-to-server.yml) (manual **workflow_dispatch**), same reusable workflow as [hear-the-music-tree-api](https://github.com/BehindTheMusicTree/hear-the-music-tree-api): builds API + Postgres fragments per **STAGING** / **PROD**, uploads **`/tmp/sync-env-<TMD_ADMIN_API_APP_NAME>-<env>.env`** and **`/tmp/sync-env-<TMD_ADMIN_API_APP_NAME><DB_APP_NAME_SUFFIX>-<env>.env`** (**`DB_APP_NAME_SUFFIX`** required GitHub Variable, same value as **BehindTheMusicTree/infrastructure**). Requires **`REDEPLOYMENT_ROOT`** = Music Deck admin redeploy tree (e.g. **`/var/webhook/redeployment-the-music-deck-admin`**). See **CONTRIBUTING**.

- **API**: Jest + Supertest e2e coverage for `GET /health` (`apps/api`).

### Changed

- **Ops — Sync env to server**: Postgres fragment **`app_name`** uses **`TMD_ADMIN_API_APP_NAME` + `DB_APP_NAME_SUFFIX`** (no hardcoded **`_db`**). **`build-api-fragment`** and **`build-db-fragment`** require **`DB_APP_NAME_SUFFIX`** so the workflow fails fast when it is missing or empty.

- **Ops — Sync env**: API fragment no longer includes **`PORT`**. Nest listen port is **`TMD_ADMIN_API_LISTEN_PORT`** in **infrastructure** only (Ansible **`scripts/.env`**; optional GitHub Variable, default **3000**); **`apply-tmd-admin-env-from-sync.sh`** sets **`compose/<API>.env` `PORT`** on redeploy.

- **CI — publish**: Aligned with [hear-the-music-tree-api](https://github.com/BehindTheMusicTree/hear-the-music-tree-api): GitHub Environments **`STAGING`** / **`PROD`**; **`set-image-tag-on-server.yml@main`**; **`call-redeployment-webhook.yml@v0.3.0`** with **`hook_id_base`**. API image pushes to **GHCR** (`ghcr.io/<GHCR_IMAGE_NAMESPACE>/<TMD_ADMIN_API_APP_NAME>:<tag>`) with **`GITHUB_TOKEN`** and **`packages: write`**; Docker Hub removed. Preflight **`check-pinned-tags`** (deploy vars only; no DB/AFP pins). **`call-redeployment-webhook`** uses **`TMD_ADMIN_WEBHOOK_SECRET_*`** when **`hook_id_base`** matches **`vars.TMD_ADMIN_REDEPLOYMENT_HOOK_ID_BASE`** — publish now requires that variable and passes it as **`hook_id_base`** (not **`REDEPLOYMENT_HOOK_ID_BASE`** alone).

### Documentation

- **README**: Updated for the pnpm/Turborepo layout (`apps/web`, `apps/api`), root scripts, and Docker build entrypoint; **Sync env** pointer and corrected workflow filenames (**`api-release.yml`**, **`api-image-ghcr.yml`**, **`turbo-ci.yml`**).
- **CONTRIBUTING**: Publish/env vars table for **`REDEPLOYMENT_ROOT`**, webhook secrets, **`the-music-deck-admin`** infra paths; **Sync env** secrets/vars (**`TMD_ADMIN_DATABASE_URL`**, **`TMD_ADMIN_POSTGRES_PASSWORD`**, **`SERVER_DEPLOY_*`**, **`DB_APP_NAME_SUFFIX`**, optional Postgres user+db / **`TMD_ADMIN_NODE_ENV`** / CORS); **`PORT`** documented as infrastructure-only (**`TMD_ADMIN_API_LISTEN_PORT`**); workflow table aligned with repo filenames.

## [0.1.0] - 2026-05-01

### Added

- **Monorepo**: [pnpm](https://pnpm.io/) workspace with [Turborepo](https://turbo.build/) — `apps/web` (Next.js charter/admin UI), `apps/api` (NestJS starter with `/health`), shared tooling from repository root.
- **Root `VERSION`**: Single source for semver used when publishing **`staging`** images from `main` (suffix `{VERSION}-staging` as container metadata).

### CI

- **Continuous integration**: [`.github/workflows/ci.yml`](.github/workflows/ci.yml) — install frozen lockfile, `pnpm lint`, `pnpm test`, `pnpm build` across workspace packages.

### Changed

- **Publish pipeline**: Mirrors [hear-the-music-tree-api](https://github.com/BehindTheMusicTree/hear-the-music-tree-api) — [`publish.yml`](.github/workflows/publish.yml) resolves environment from `main` vs `v*` tags (prerelease hyphen → staging, stable tag → prod), calls reusable [`build-and-push.yml`](.github/workflows/build-and-push.yml) (GHCR), then [`BehindTheMusicTree/github-workflows`](https://github.com/BehindTheMusicTree/github-workflows) **`set-image-tag-on-server`** and **`call-redeployment-webhook`** (same pattern as the API repo).

### Documentation

- **Contributing**: Added [`CONTRIBUTING.md`](CONTRIBUTING.md) for setup, branching, and releases.
