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

- **Publish**: `publish.yml` builds the Nest API image on `main` and version tags using the shared redeploy/tag workflows.
```

On release, maintainers move **`[Unreleased]`** content into a dated **`## [0.x.y]`** section.

## [Unreleased]

### Added

- **API**: Jest + Supertest e2e coverage for `GET /health` (`apps/api`).

### Changed

- **CI — publish**: GitHub Environment names aligned to lowercase **`staging`** / **`prod`** (matches **`call-redeployment-webhook`** protect rules). Preflight step requires **`REDEPLOYMENT_HOOK_ID_BASE`**. **`set-image-tag-on-server`** and **`call-redeployment-webhook`** pinned to **`@v0.1.6`**; **`images: "{}"`** passed explicitly. Bump both pins together when upgrading [**github-workflows**](https://github.com/BehindTheMusicTree/github-workflows); webhook body must start with **`Redeployment accepted`** (matches infra **`hooks.json`** **`response-message`** defaults).

### Documentation

- **README**: Updated for the pnpm/Turborepo layout (`apps/web`, `apps/api`), root scripts, and Docker build entrypoint.
- **CONTRIBUTING**: Publish/env vars table for **`REDEPLOYMENT_ROOT`**, webhook secrets, **`the-music-deck-admin`** infra paths.

## [0.1.0] - 2026-05-01

### Added

- **Monorepo**: [pnpm](https://pnpm.io/) workspace with [Turborepo](https://turbo.build/) — `apps/web` (Next.js charter/admin UI), `apps/api` (NestJS starter with `/health`), shared tooling from repository root.
- **Root `VERSION`**: Single source for semver used when publishing **`staging`** images from `main` (suffix `{VERSION}-staging` as container metadata).

### CI

- **Continuous integration**: [`.github/workflows/ci.yml`](.github/workflows/ci.yml) — install frozen lockfile, `pnpm lint`, `pnpm test`, `pnpm build` across workspace packages.

### Changed

- **Publish pipeline**: Mirrors [hear-the-music-tree-api](https://github.com/BehindTheMusicTree/hear-the-music-tree-api) — [`publish.yml`](.github/workflows/publish.yml) resolves environment from `main` vs `v*` tags (prerelease hyphen → staging, stable tag → prod), calls reusable [`build-and-push.yml`](.github/workflows/build-and-push.yml) (Docker Hub), then [`BehindTheMusicTree/github-workflows`](https://github.com/BehindTheMusicTree/github-workflows) **`set-image-tag-on-server`** and **`call-redeployment-webhook`** (same pattern as the API repo).

### Documentation

- **Contributing**: Added [`CONTRIBUTING.md`](CONTRIBUTING.md) for setup, branching, and releases.
