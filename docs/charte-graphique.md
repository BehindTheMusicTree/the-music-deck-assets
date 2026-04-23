# Design Charter — The Music Deck

Visual identity reference for UI, card frames, and genre theming.

---

## Base Palette

Global interface colours (CSS `:root` variables).

| Token        | Hex       | Usage                               |
| ------------ | --------- | ----------------------------------- |
| `--bg`       | `#09080d` | Main background (near-black violet) |
| `--surface`  | `#100f18` | Secondary surfaces                  |
| `--card`     | `#16141f` | Card background                     |
| `--border`   | `#1e1c2c` | Generic UI borders                  |
| `--gold`     | `#a87c28` | Primary accent, buttons, labels     |
| `--gold-hi`  | `#c8a040` | Gold highlight                      |
| `--rust`     | `#7a3020` | Warm secondary accent               |
| `--white`    | `#d8d4f0` | Main text                           |
| `--muted`    | `#6a6480` | Secondary text, placeholders        |
| `--dim`      | `#28263a` | Separators, inactive zones          |

---

## Typography

| Family               | Usage                                        |
| -------------------- | -------------------------------------------- |
| `Cinzel`             | Titles, genre labels, navigation, buttons    |
| `Cormorant Garamond` | Body text, card descriptions                 |
| `Space Mono`         | Numeric data, codes, technical tags          |

---

## Genre Colour System

Each genre defines a set of CSS variables applied to the `.g-<genre>` class. These variables colour borders, card backgrounds, text, and stat bars.

### Variables per genre

| Genre       | Class       | Dominant colour            | Border hex  |
| ----------- | ----------- | -------------------------- | ----------- |
| Rock        | `.g-rock`   | Bright red                 | `#d01828`   |
| Metal       | `.g-metal`  | Dark red (Rock subgenre)   | `#7a0810`   |
| Reggae/Dub  | `.g-reggae` | Lawn green                 | `#3a9030`   |
| Vintage     | `.g-vintage`| Grey                       | `#787878`   |
| World       | `.g-world`  | Red                        | `#a01818`   |
| Classical   | `.g-classic`| Wood brown                 | `#5c2a0a`   |
| Electronic  | `.g-electro`| Royal blue                 | `#2850c8`   |
| Country     | `.g-country`| Sienna brown               | `#7a4e20`   |
| Disco/Funk  | `.g-funk`   | Hot pink                   | `#c0387a`   |
| Hip-hop     | `.g-hiphop` | Antique gold               | `#c8960a`   |
| Pop         | `.g-pop`    | Off-white                  | `#c0b8d0`   |

### CSS variables per genre theme

Each `.g-*` class exposes:

| Variable          | Role                           |
| ----------------- | ------------------------------ |
| `--border-color`  | Card border and accent         |
| `--card-bg`       | Dark card background           |
| `--header-bg`     | Card header background         |
| `--text-main`     | Main text                      |
| `--text-body`     | Secondary text                 |
| `--bar-pop`       | Popularity bar gradient        |
| `--bar-exp`       | Experience bar gradient        |
| `--bar-glow-pop`  | Popularity bar glow            |
| `--bar-glow-exp`  | Experience bar glow            |

---

## Subgenre Colour System

Subgenres inherit the colour of their parent genre. When a subgenre sits at the intersection of two genres, its colour blends the two hues proportionally to its thematic distance.

**Principle:** `subgenre colour = dominant parent + (secondary genre influence)`

### Defined examples

| Subgenre           | Parents           | Resulting colour                                         |
| ------------------ | ----------------- | -------------------------------------------------------- |
| Metal              | Rock              | Navy blue (`#1a2e6a`) — dark variation of rock red       |
| Dub (subgenres)    | Reggae + Electro  | Turquoise (`~#20a898`) — lawn green + electric royal blue|
| Reggae (subgenres) | Reggae            | Apple green (`~#78d828`) — brighter lawn green           |
| Funk Metal         | Rock + Funk       | Indigo (`~#8020a0`) — rock red pulling towards funk pink |
| Pop Rap            | Hip-hop + Pop     | Very pale yellow (`~#f0e890`) — hip-hop gold in pastel   |

> This table grows as subgenres are defined.

---

## Rarities

Rarities use fixed accent colours, independent of genre.

| Rarity    | Text colour | Hex      |
| --------- | ----------- | -------- |
| Legendary | Gold        | `#c8a040`|
| Epic      | Purple      | `#a070e0`|
| Rare      | Sky blue    | `#6090e0`|
| Common    | Grey        | `#8888a0`|

---

## See Also

- [Genres](./genres.md)
- [Card System](./card-system.md)
- [Documentation Index](./INDEX.md)
