# Prisma — catalog seed and `rowKey`

## `rowKey` vs `id`

- **`id`** (integer): primary key and catalog graph identity. The seed **upserts** with `where: { id: card.id }`.
- **`rowKey`** (string): stable business identifier, **`@unique`** on `Card`. The API rejects create/update if another row already uses the same `rowKey` (`apps/api/src/cards/cards.service.ts`).

## `rowKey` format

Every catalogue card (shipped, wishlist, planned) uses the same rule: **`title-year`** slug — `assignCatalogRowKeys()` from **`@repo/cards-domain`** computes keys for the entire collection at once. Diacritics are stripped, non-alphanumeric characters are collapsed to `-`. If two cards share the same title+year, numeric suffixes are appended (`-0`, `-1`, …) ordered by ascending `id`. Wishlist definitions in `seed-data/catalog-wishlist-defs.ts` carry no `rowKey` field; the seed derives it globally via `assignCatalogRowKeys`.

**Breaking change:** databases seeded before this convention still hold old prefixed keys. Re-seed (`pnpm --filter api db:seed`) or run **`db:reset`** locally so `rowKey` matches the API and web catalog.

## Commands (from repo root)

```bash
pnpm --filter api exec prisma migrate deploy   # or migrate dev
pnpm --filter api db:seed
pnpm --filter api artworks:migrate             # PNGs → S3; needs DATABASE_URL + S3_*
pnpm --filter api db:reset                     # migrate reset + seed + artworks:migrate
```

See `apps/api/.env.example` for local Postgres + MinIO.
