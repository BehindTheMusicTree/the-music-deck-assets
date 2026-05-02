// ---------------------------------------------------------------------------
// Canonical genre names (shared by genres, subgenre data, wheel)
// ---------------------------------------------------------------------------
export type GenreName =
  | "Rock"
  | "Mainstream"
  | "Electronic"
  | "Hip-Hop"
  | "Disco/Funk"
  | "Reggae/Dub"
  | "Classical"
  | "Vintage";

export const GENRE_NAMES: GenreName[] = [
  "Mainstream",
  "Rock",
  "Electronic",
  "Hip-Hop",
  "Disco/Funk",
  "Reggae/Dub",
  "Classical",
  "Vintage",
];

/** Resolved parent genre for themes, wheel, and catalog — same set as `GenreName` today. */
export type AppGenreName = GenreName;

export const APP_GENRE_NAMES: AppGenreName[] = [
  "Rock",
  "Mainstream",
  "Electronic",
  "Hip-Hop",
  "Disco/Funk",
  "Reggae/Dub",
  "Classical",
  "Vintage",
];

/** Wheel / theme parent for genre subgenres — never Mainstream (hub centre only). */
export type NonMainstreamGenreName = Exclude<GenreName, "Mainstream">;
