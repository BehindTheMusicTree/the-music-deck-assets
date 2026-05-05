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

export type NonMainstreamGenreName = Exclude<GenreName, "Mainstream">;
