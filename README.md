# The Music Deck — Assets & Design Charter

Design system, visual charter, and creative assets for [The Music Deck](https://github.com/mignot/the-music-deck) — a music-themed card game.

This repository is independent from the game codebase. It serves as the single source of truth for visual identity, genre colour palette, card artwork prompts, and UI references.

---

## Charter App

An interactive Next.js app documenting the full design system.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Route | Content |
|---|---|
| `/` | Index — all sections |
| `/palette` | Base design tokens and UI colours |
| `/genres` | Genre colour wheel with subgenres |
| `/typography` | Cinzel, Cormorant Garamond, Space Mono |
| `/rarities` | Legendary, Epic, Rare, Common |

---

## Structure

```
app/                   Next.js charter pages
components/            Shared UI components (GenreWheel, etc.)
docs/                  Product design documentation
public/
  charte-graphique/    Static HTML charter (reference)
  cards/               Card artworks, examples, AI prompts
  ui/                  Card back, booster pack visuals
```

---

## Docs

All product design documentation lives in `docs/`. Start with [`docs/INDEX.md`](docs/INDEX.md).

Key documents:
- [`genres.md`](docs/genres.md) — genre archetypes, colours, strengths & weaknesses
- [`charte-graphique.md`](docs/charte-graphique.md) — full visual charter reference
- [`card-system.md`](docs/card-system.md) — card anatomy and stats
- [`battle-system.md`](docs/battle-system.md) — combat rules

---

## Colour System

`app/globals.css` is the source of truth for design tokens in this repo. Genre colours are defined per `.g-*` class in the game repo's `globals.css` and documented here in the charter app.

When colours change in the game repo, update the charter here to stay in sync.

---

## Relationship to the Game Repo

| Concern | Lives in |
|---|---|
| Genre CSS variables (`.g-*`) | `the-music-deck` → `app/globals.css` |
| Colour documentation & charter | `the-music-deck-assets` (this repo) |
| Card artwork & AI prompts | `the-music-deck-assets` → `public/cards/` |
| Game logic, screens, components | `the-music-deck` |
