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

- **API release**: [`api-release.yml`](.github/workflows/api-release.yml) builds the Nest API image on `main` and version tags using the shared redeploy/tag workflows.
```

On release, maintainers move **`[Unreleased]`** content into a dated **`## [0.x.y]`** section.

## [Unreleased]

### Added

- **API**: Jest + Supertest e2e coverage for `GET /health` (`apps/api`).

### Changed

- **API release**: **`develop`** pushes deploy **staging** (GHCR tag **`staging`**); **`main`** pushes deploy **prod** (GHCR tag **`prod`**). **`v*`** tags unchanged (prerelease → staging, stable → prod).
- **CI — API release**: Aligned with [hear-the-music-tree-api](https://github.com/BehindTheMusicTree/hear-the-music-tree-api): GitHub Environments **`STAGING`** / **`PROD`**; **`set-image-tag-on-server.yml@main`**; **`call-redeployment-webhook.yml@v0.3.0`** with **`hook_id_base`**. API image pushes to **GHCR** (`ghcr.io/<GHCR_IMAGE_NAMESPACE>/<TMD_ADMIN_API_APP_NAME>:<tag>`) with **`GITHUB_TOKEN`** and **`packages: write`**; Docker Hub removed. Preflight **`deploy-preflight`** (deploy vars only; no DB/AFP pins). **`call-redeployment-webhook`** uses **`TMD_ADMIN_WEBHOOK_SECRET_*`** when **`hook_id_base`** matches **`vars.TMD_ADMIN_REDEPLOYMENT_HOOK_ID_BASE`** — workflow requires that variable and passes it as **`hook_id_base`** (not **`REDEPLOYMENT_HOOK_ID_BASE`** alone).
- **CI**: Renamed workflows for clarity — [`turbo-ci.yml`](.github/workflows/turbo-ci.yml) (workspace lint/test/build), [`api-release.yml`](.github/workflows/api-release.yml) (image + tags + redeploy), [`api-image-ghcr.yml`](.github/workflows/api-image-ghcr.yml) (reusable Docker build); removed **`ci.yml`**, **`publish.yml`**, **`build-and-push.yml`**.

### Documentation

- **README**: Updated for the pnpm/Turborepo layout (`apps/web`, `apps/api`), root scripts, and Docker build entrypoint.
- **CONTRIBUTING**: Publish/env vars table for **`REDEPLOYMENT_ROOT`**, webhook secrets, **`the-music-deck-admin`** infra paths.

## [0.1.0] - 2026-05-01

### Added

- **Monorepo**: [pnpm](https://pnpm.io/) workspace with [Turborepo](https://turbo.build/) — `apps/web` (Next.js charter/admin UI), `apps/api` (NestJS starter with `/health`), shared tooling from repository root.
- **Root `VERSION`**: Single source for semver used for container **`app_version`** metadata on branch and tag builds (later: **`develop`** → staging, **`main`** → prod).

### CI

- **Continuous integration**: [`.github/workflows/turbo-ci.yml`](.github/workflows/turbo-ci.yml) — install frozen lockfile, `pnpm lint`, `pnpm test`, `pnpm build` across workspace packages.

### Changed

- **API release pipeline**: [`api-release.yml`](.github/workflows/api-release.yml) calls [`api-image-ghcr.yml`](.github/workflows/api-image-ghcr.yml) (GHCR), then [`BehindTheMusicTree/github-workflows`](https://github.com/BehindTheMusicTree/github-workflows) **`set-image-tag-on-server`** and **`call-redeployment-webhook`**. (Branch mapping was later updated: **`develop`** → staging, **`main`** → prod; **`v*`** tags keep prerelease vs stable.)

### Documentation

- **Contributing**: Added [`CONTRIBUTING.md`](CONTRIBUTING.md) for setup, branching, and releases.
