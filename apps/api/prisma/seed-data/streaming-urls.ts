/** Streaming URLs for cards, keyed by card id. All fields optional. */
export type StreamingUrls = {
  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeUrl?: string;
  bandcampUrl?: string;
};

export const STREAMING_URLS: Record<number, StreamingUrls> = {
  // ── Shipped: Genre ────────────────────────────────────────────────────────
  1: {
    spotifyUrl: "https://open.spotify.com/track/7tFiyTwD0nx5a1eklYtX2J",
    youtubeUrl: "https://music.youtube.com/watch?v=fJ9rUzIMcZQ",
    appleMusicUrl: "https://music.apple.com/us/song/bohemian-rhapsody/1440833064",
  },
  28: {
    spotifyUrl: "https://open.spotify.com/track/4gvea7UlDkAvsJBPZAd4oB",
    youtubeUrl: "https://music.youtube.com/watch?v=dsxtImDVMig",
    appleMusicUrl: "https://music.apple.com/us/song/all-you-need-is-love/1441164426",
  },
  29: {
    spotifyUrl: "https://open.spotify.com/track/5HNCy40Ni5BZJFw1TKzRsC",
    youtubeUrl: "https://music.youtube.com/watch?v=02D2T3wGCYg",
    appleMusicUrl: "https://music.apple.com/us/song/god-save-the-queen/1440837390",
  },
  51: {
    spotifyUrl: "https://open.spotify.com/track/5CQ30WqJwcep0pYcV4AMNc",
    youtubeUrl: "https://music.youtube.com/watch?v=QkF3oxziUI4",
    appleMusicUrl: "https://music.apple.com/us/song/stairway-to-heaven/580708053",
  },
  63: {
    spotifyUrl: "https://open.spotify.com/track/0Xc6g0BzYw8r1Qn2ATmN2g",
    youtubeUrl: "https://music.youtube.com/watch?v=JnfyjwChuNU",
    appleMusicUrl: "https://music.apple.com/us/song/suck-my-kiss/1440833059",
  },
  68: {
    spotifyUrl: "https://open.spotify.com/track/3d9DChrdc6BOeFsbrZ3Is0",
    youtubeUrl: "https://music.youtube.com/watch?v=0J2QdDbelmY",
    appleMusicUrl: "https://music.apple.com/us/song/seven-nation-army/1440833067",
  },
  71: {
    spotifyUrl: "https://open.spotify.com/track/5sICkBXVmaCQk5aISGR3x1",
    youtubeUrl: "https://music.youtube.com/watch?v=CD-E-LDc384",
    appleMusicUrl: "https://music.apple.com/us/song/enter-sandman/1440908847",
  },
  74: {
    spotifyUrl: "https://open.spotify.com/track/5ghIJDpPoe3CfHMGu71E6T",
    youtubeUrl: "https://music.youtube.com/watch?v=hTWKbfoikeg",
    appleMusicUrl: "https://music.apple.com/us/song/smells-like-teen-spirit/1440783617",
  },
  75: {
    spotifyUrl: "https://open.spotify.com/track/3TO7bbrUKrOSPGRTB5MeCz",
    youtubeUrl: "https://music.youtube.com/watch?v=-0kcet4aPpQ",
    appleMusicUrl: "https://music.apple.com/us/song/money/1440833081",
  },
  80: {
    spotifyUrl: "https://open.spotify.com/track/6xQxZbUQKQ2WQfO5j3N6zP",
    youtubeUrl: "https://music.youtube.com/watch?v=H0kJLW2EwMg",
    appleMusicUrl: "https://music.apple.com/us/song/guerrilla-radio/1440833100",
  },

  // ── Shipped: World ────────────────────────────────────────────────────────
  82: {
    bandcampUrl:
      "https://elmir-records.bandcamp.com/album/after-ra-party-1992-2008",
  },
};
