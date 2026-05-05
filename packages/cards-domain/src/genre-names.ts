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

export type RootGenreName = GenreName;

export const APP_GENRE_NAMES: RootGenreName[] = [
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
