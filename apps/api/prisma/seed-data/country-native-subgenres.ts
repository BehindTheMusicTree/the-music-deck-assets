/**
 * Country-native subgenre names (matches `kind: "country"` rows in
 * `apps/web/lib/genres/subgenres-data.ts`). Used by the seed-data world filter
 * so the snapshot doesn't depend on the genres model.
 */
export const COUNTRY_NATIVE_SUBGENRES: ReadonlySet<string> = new Set([
  "Country",
  "American Folk",
  "Spiritual",
  "Gospel",
  "French Variety",
  "French Folk",
  "Folk Breton",
  "Flamenco",
  "Neapolitan Song",
  "Italian Folk",
  "Japanese Folk",
  "English Folk",
  "Raï",
  "Reggaeton",
  "Mexican Folk",
  "Yodel",
  "Peruvian Cumbia",
  "Russian Folk",
]);
