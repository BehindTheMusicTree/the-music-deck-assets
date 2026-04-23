# Contributing

This repository contains the design system and assets for The Music Deck. It is maintained by a solo developer. Contributions and suggestions are welcome.

## Table of Contents

- [Development Workflow](#development-workflow)
  - [Setup](#setup)
  - [Branching](#branching)
  - [Committing](#committing)
  - [Pull Requests](#pull-requests)
- [Changelog](#changelog)
- [Keeping in Sync with the Game Repo](#keeping-in-sync-with-the-game-repo)
- [License](#license)

## Development Workflow

### Setup

**Prerequisites:** Node.js 20+, npm, Git.

```bash
git clone https://github.com/mignot/the-music-deck-assets.git
cd the-music-deck-assets
npm install
npm run dev
```

Charter app runs at [http://localhost:3000](http://localhost:3000).

### Branching

We follow Git Flow:

| Branch | Purpose |
|---|---|
| `main` | Stable, published state |
| `develop` | Integration branch — all work merges here |
| `feature/<name>` | New charter sections, components, assets |
| `fix/<name>` | Corrections to colours, docs, or visuals |
| `chore/<name>` | Maintenance, dependencies, tooling |

No direct commits to `main` or `develop`.

```bash
git checkout develop
git pull origin develop
git checkout -b feature/add-card-anatomy-page
```

### Committing

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <summary>
```

| Type | Use for |
|---|---|
| `feat` | New charter section, component, or asset |
| `fix` | Correction to a colour, doc, or visual |
| `docs` | Documentation update |
| `chore` | Maintenance / dependencies |
| `style` | Formatting only |

**Examples:**
- `feat(genres): add subgenre colour blending section`
- `fix(palette): correct gold token hex value`
- `docs(genres): update Metal subgenre description`
- `chore: update Next.js to 16.x`

Rules: imperative mood, under 70 characters, lowercase type and scope.

### Pull Requests

1. Ensure your branch is up to date with `develop`
2. Run `npm run build` — must pass with no errors
3. Update `CHANGELOG.md` under `[Unreleased]`
4. Open a PR targeting `develop`
5. Use the same `type(scope): summary` format for the PR title

**Pre-PR checklist:**
- [ ] `npm run build` passes
- [ ] All text is in English
- [ ] `CHANGELOG.md` updated
- [ ] No accidental commits (`.env`, large binaries)

## Changelog

Update `CHANGELOG.md` with every PR. Add entries to the `[Unreleased]` section. See [CHANGELOG.md](CHANGELOG.md) for format examples.

## Keeping in Sync with the Game Repo

`app/globals.css` in `the-music-deck` (the game repo) is the **source of truth for genre colours**. When colours change there, update the charter here:

1. Update `GenreWheel.tsx` — the `GENRES` array and any subgenre hex values
2. Update `docs/genres.md` and `docs/charte-graphique.md`
3. Update the static HTML charter in `public/charte-graphique/` if it exists

Never define colours only in this repo and expect the game to follow — the sync direction is game → assets.

## License

All contributions are made under the project's license. You retain authorship of your code.
