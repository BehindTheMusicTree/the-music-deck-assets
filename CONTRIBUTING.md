# Contributing guidelines

Thanks for your interest in improving **the-music-deck-admin**.

This repo holds the charter / admin Next.js app, supporting libraries, and a small Nest API. Day-to-day development matches patterns used in sibling repos such as [hear-the-music-tree-api](https://github.com/BehindTheMusicTree/hear-the-music-tree-api): semantic versioning via **`VERSION`**, **`CHANGELOG.md`**, Git Flow–friendly branching, and a **`publish`** workflow that pushes Docker images and triggers infrastructure redeploys.

## Table of contents

- [Contributors and maintainers](#contributors-and-maintainers)
- [Development workflow](#development-workflow)
  - [Prerequisites](#prerequisites)
  - [Install and run](#install-and-run)
  - [Branching](#branching)
  - [Testing and lint](#testing-and-lint)
  - [Commits](#commits)
  - [Pull requests](#pull-requests)
- [GitHub Actions](#github-actions)
- [Releasing (maintainers)](#releasing-maintainers)

## Contributors and maintainers

**Contributors** open issues, propose PRs, improve docs, and help validate behavior.

**Maintainers** review merges, cut releases, keep **`VERSION`** / changelog aligned, and manage CI secrets (GitHub Packages / GHCR, server SSH, redeploy webhook).

Even maintainers should land changes through PRs when multiple people touch the repo; protect **`main`** in GitHub if that matches your team rules.

## Development workflow

### Prerequisites

- **Node.js 22** (aligned with Docker images for `apps/api`)
- **pnpm 10.33.x** — enforced via [`package.json`](package.json) `packageManager`; enable via [Corepack](https://nodejs.org/api/corepack.html): `corepack enable`

### Install and run

From the repository root:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Turbo runs **`dev`** in all workspace packages that define it (typically `apps/web` and optionally `apps/api`).

**Web app only:**

```bash
pnpm --filter web dev
```

**API only:**

```bash
pnpm --filter api start:dev
```

Use **`pnpm lint`**, **`pnpm test`**, and **`pnpm build`** from the root before pushing substantive changes.

### Branching

This repo does not ship the full Git Flow automation described in hear-the-music-tree-api (no local **`branch-protection`** workflow yet). Recommended conventions stay compatible if you add protection later:

| Branch                                  | Role                                                   |
| --------------------------------------- | ------------------------------------------------------ |
| **`main`**                              | Integrated, deployable default                         |
| **`develop`**                           | Optional integration branch if your team uses Git Flow |
| **`feature/<name>`**                    | Features                                               |
| **`chore/<name>`**                      | Tooling, CI, deps                                      |
| **`fix/<name>`** or **`hotfix/<name>`** | Bugfixes                                               |

Prefer **`feature/…`** and **`chore/…`** prefixes so policies can match sibling repos later.

### Testing and lint

```bash
pnpm lint
pnpm test
pnpm build
```

- **`apps/web`**: ESLint, Vitest, Next.js production build.
- **`apps/api`**: ESLint; **Jest** + **Supertest** for HTTP-level checks (e.g. `GET /health`).

### Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

`<type>(<optional-scope>): <imperative summary>`

Examples: `feat(catalog): add deck export`, `fix(wishlist): pass through card year`, `ci: pin pnpm in Dockerfile`.

### Pull requests

Before opening a PR:

1. **Lint / test / build** pass locally.
2. **`CHANGELOG.md`**: add bullets under **`[Unreleased]`** (see changelog guidelines at the top of that file).
3. Describe intent, link issues (**Fixes #nnn**), and call out breaking changes.
4. Use PR titles in conventional style (same shape as commits).

## GitHub Actions

| Workflow                                                     | Role                                                                                                                                                                                                                                         |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`ci.yml`](.github/workflows/ci.yml)                         | On **`push`** to **`main`** and **pull_request**: frozen install, lint, test, build.                                                                                                                                                         |
| [`publish.yml`](.github/workflows/publish.yml)               | On **`workflow_dispatch`**, **`workflow_call`**, **`push`** to **`main`**, or tags **`v*`**: resolves staging vs prod, builds API image, sets remote tag files, calls redeploy webhook (same reusable workflows as hear-the-music-tree-api). |
| [`build-and-push.yml`](.github/workflows/build-and-push.yml) | Reusable **GHCR** build for **`apps/api`** (same pattern as hear-the-music-tree-api: `GITHUB_TOKEN` + **`packages: write`**). |

**GitHub Environments** (repository **Settings → Environments**): create **`STAGING`** and **`PROD`** (uppercase), same as [hear-the-music-tree-api](https://github.com/BehindTheMusicTree/hear-the-music-tree-api). [`publish.yml`](.github/workflows/publish.yml) maps `main` / prerelease tags → **`STAGING`**, stable release tags → **`PROD`**, while the slug passed to org workflows remains **`staging`** / **`prod`**.

**Variables / secrets per environment** (same shapes as [github-workflows README](https://github.com/BehindTheMusicTree/github-workflows/blob/main/README.md#webhook-call-redeployment-webhook), plus GHCR + tag vars — mirror [hear-the-music-tree-api](https://github.com/BehindTheMusicTree/hear-the-music-tree-api) **`GHCR_IMAGE_NAMESPACE`**):

| Kind     | Name                                                                              | Purpose |
| -------- | --------------------------------------------------------------------------------- | ------- |
| Variable | **`GHCR_IMAGE_NAMESPACE`**                                                        | Lowercase owner for **`ghcr.io/<namespace>/<image>:<tag>`** (org or user, e.g. **`behindthemusictree`**). |
| Variable | **`TMD_ADMIN_API_APP_NAME`**                                                      | Image name under that namespace and **remote tag file** basename: `{REDEPLOYMENT_ROOT}-{env}/scripts/<TMD_ADMIN_API_APP_NAME>-tag`. On the server, set compose **`TMD_ADMIN_API_IMAGE`** to **`ghcr.io/<GHCR_IMAGE_NAMESPACE>/<TMD_ADMIN_API_APP_NAME>`** in **`scripts/.env`** — not a GitHub variable. |
| Variable | **`REDEPLOYMENT_ROOT`**                                                           | e.g. **`/var/webhook/redeployment-the-music-deck-admin`** — must match infra **`TMD_ADMIN_REDEPLOYMENT_ROOT`** ([Music Deck admin README](https://github.com/BehindTheMusicTree/infrastructure/blob/main/webhook/redeployment/the-music-deck-admin/README.md)). |
| Variable | **`REDEPLOYMENT_HOOK_ID_BASE`**                                                   | Same string as infra **`TMD_ADMIN_REDEPLOYMENT_HOOK_ID_BASE`**. |
| Variable | **`SERVER_HOST`**                                                                 | VPS host for webhook + SSH (see github-workflows README). |
| Secret   | **`REDEPLOYMENT_WEBHOOK_PORT`**                                                   | Webhook daemon port. |
| Secret   | **`REDEPLOYMENT_WEBHOOK_SECRET_STAGING`**, **`REDEPLOYMENT_WEBHOOK_SECRET_PROD`** | Same values as infra **`TMD_ADMIN_WEBHOOK_SECRET_*`**. |

**GHCR push** uses the workflow’s **`GITHUB_TOKEN`** (no Docker Hub token). The repository needs **Packages** write access for workflows (see **`permissions`** in [`publish.yml`](.github/workflows/publish.yml) / [`build-and-push.yml`](.github/workflows/build-and-push.yml)); the package must allow **`GITHUB_TOKEN`** or the org’s default **Actions** access to **GitHub Packages**.

[`publish.yml`](.github/workflows/publish.yml) follows [hear-the-music-tree-api](https://github.com/BehindTheMusicTree/hear-the-music-tree-api): **`set-image-tag-on-server.yml@main`** and **`call-redeployment-webhook.yml@v0.2.0`** (bump the webhook ref when adopting a newer [**github-workflows**](https://github.com/BehindTheMusicTree/github-workflows) release). Webhook success bodies must start with **`Redeployment accepted`** once infrastructure **`generate-hooks-json.sh`** is deployed (see github-workflows **Expected Webhook Response**).

## Releasing (maintainers)

1. Merge everything intended for the release into **`main`**.
2. Update **`CHANGELOG.md`**: move **`[Unreleased]`** notes into **`## [x.y.z] - YYYY-MM-DD`**.
3. Set **`VERSION`** at the repo root to **`x.y.z`** (no `v` prefix in the file).
4. Tag **`vx.y.z`** on **`main`** and push tags:

   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```

   **Prerelease example:** **`v0.2.0-rc.1`** (hyphen in the tag body → GitHub Environment **`STAGING`**). **Stable:** **`v0.2.0`** → **`PROD`**.

5. **`publish`** runs from the tag (and already ran from **`main`** with image tag **`staging`**).

There is no **`bump-my-version`** wiring here yet; bump **`VERSION`** and changelog manually or add tooling in a follow-up PR.

---

Questions or infra tweaks are best tracked as GitHub issues with enough context to reproduce or validate.
