/** Streaming URLs for cards, keyed by card id. All fields optional. */
export type StreamingUrls = {
  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeUrl?: string;
  bandcampUrl?: string;
  soundcloudUrl?: string;
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
  3: {
    spotifyUrl: "https://open.spotify.com/track/7fBv7CLKzipRk6EC6TWHOB",
    youtubeUrl: "https://music.youtube.com/watch?v=FGBhQbmPwH8",
    appleMusicUrl: "https://music.apple.com/us/song/one-more-time/1440833139",
  },
  37: {
    spotifyUrl: "https://open.spotify.com/track/0HEmnAUT8PHznIAAmVXqFJ",
    youtubeUrl: "https://music.youtube.com/watch?v=UqZ2xHjCqjY",
    appleMusicUrl: "https://music.apple.com/us/song/sky-and-sand/1440650364",
  },
  42: {
    spotifyUrl: "https://open.spotify.com/track/0KKkJNfGyhkQ5aFogxQAPU",
    youtubeUrl: "https://music.youtube.com/watch?v=_ovdm2yX4MA",
    appleMusicUrl: "https://music.apple.com/us/album/levels-ep/480593303",
  },
  45: {
    spotifyUrl: "https://open.spotify.com/track/03UrZgTINDqvnUMbbIMhql",
    youtubeUrl: "https://music.youtube.com/watch?v=9bZkp7q19f0",
    appleMusicUrl: "https://music.apple.com/us/album/gangnam-style-single/1445285687",
  },
  46: {
    spotifyUrl: "https://open.spotify.com/track/1a6OTy97kk0mMdm78rHsm8",
    youtubeUrl: "https://music.youtube.com/watch?v=bESGLojNYSo",
    appleMusicUrl: "https://music.apple.com/us/song/poker-face/1440819538",
  },
  111: {
    spotifyUrl: "https://open.spotify.com/track/5W3cjX2J3tjhG8zb6u0qHn",
    youtubeUrl: "https://music.youtube.com/watch?v=gAjR4_CbPpQ",
    appleMusicUrl: "https://music.apple.com/us/song/harder-better-faster-stronger/1440833142",
  },
  58: {
    spotifyUrl: "https://open.spotify.com/track/5xTtaWoae3wi06K5WfVUUH",
    youtubeUrl: "https://music.youtube.com/watch?v=nfWlot6h_JM",
    appleMusicUrl: "https://music.apple.com/us/song/shake-it-off/1440936016",
  },
  59: {
    spotifyUrl: "https://open.spotify.com/track/0U0ldCRmgCqhVvD6ksG63j",
    youtubeUrl: "https://music.youtube.com/watch?v=y6120QOlsfU",
    appleMusicUrl: "https://music.apple.com/us/song/sandstorm/1440833097",
    bandcampUrl: "https://armadamusic.bandcamp.com/track/sandstorm",
  },
  54: {
    youtubeUrl: "https://music.youtube.com/watch?v=6LAPFM3dgag",
  },
  109: {
    spotifyUrl: "https://open.spotify.com/track/3YuaBvuZqcwN3CEAyyoaei",
    youtubeUrl: "https://music.youtube.com/watch?v=u1ZvPSpLxCg",
  },

  83: {
    spotifyUrl: "https://open.spotify.com/track/0uQ0C5EvhczHxVh9Yx8uWJ",
  },
  87: {
    spotifyUrl: "https://open.spotify.com/track/2374M0fQpWi3dLnB54qaLX",
  },
  102: {
    spotifyUrl: "https://open.spotify.com/track/60a0Rd6pjrkxjPbaKzXjfq",
  },

  84: {
    appleMusicUrl: "https://music.apple.com/us/album/opus/1075639038",
  },

  91: {
    spotifyUrl: "https://open.spotify.com/track/7yO4IdJjCEPz7YgZMe25iS",
    youtubeUrl: "https://music.youtube.com/watch?v=0CFuCYNx-1g",
    appleMusicUrl: "https://music.apple.com/us/song/superstition/1440833143",
  },

  // ── Planned / Wishlist ────────────────────────────────────────────────────
  12013: {
    spotifyUrl: "https://open.spotify.com/track/57bgtoPSgt236HzfBOd8kj",
    youtubeUrl: "https://music.youtube.com/watch?v=v2AC41dglnM",
    appleMusicUrl: "https://music.apple.com/us/song/thunderstruck/574050954",
  },
  12014: {
    spotifyUrl: "https://open.spotify.com/track/6B8Be6ljOzmkOmFslEb23P",
    youtubeUrl: "https://music.youtube.com/watch?v=etAIpkdhU9Q",
    appleMusicUrl: "https://music.apple.com/us/song/hells-bells/574050940",
  },
  12016: {
    spotifyUrl: "https://open.spotify.com/track/3ZFTkvIE7kyPt6Nu3PEa7V",
    youtubeUrl: "https://music.youtube.com/watch?v=OV5_LQArLa0",
    appleMusicUrl: "https://music.apple.com/us/song/youll-never-walk-alone/1441164520",
  },
  12017: {
    spotifyUrl: "https://open.spotify.com/track/62AuGbAkt8Ox2IrFFb8GKV",
    youtubeUrl: "https://music.youtube.com/watch?v=HG52G7oYk3A",
    appleMusicUrl: "https://music.apple.com/us/song/sweet-caroline/1440833084",
  },
  12018: {
    spotifyUrl: "https://open.spotify.com/track/0bYg9bo50gSsH3LtXe2SQn",
    youtubeUrl: "https://music.youtube.com/watch?v=XqZsoesa55w",
    appleMusicUrl: "https://music.apple.com/us/song/baby-shark/1445883967",
  },
  12019: {
    spotifyUrl: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b",
    youtubeUrl: "https://music.youtube.com/watch?v=4NRXx6U8ABQ",
    appleMusicUrl: "https://music.apple.com/us/song/blinding-lights/1488408565",
  },
  12021: {
    spotifyUrl: "https://open.spotify.com/track/2aBxt229cbLDOvtL7Xbb9x",
    youtubeUrl: "https://music.youtube.com/watch?v=bKttENbsoyk",
    appleMusicUrl: "https://music.apple.com/us/song/walk-this-way/1440837447",
  },
  12022: {
    spotifyUrl: "https://open.spotify.com/track/2cYqizR4lgvp4Qu6IQ3qGN",
    youtubeUrl: "https://music.youtube.com/watch?v=4B_UYYPb-Gk",
    appleMusicUrl: "https://music.apple.com/us/song/walk-this-way/1440837448",
  },

  // ── Shipped: World ────────────────────────────────────────────────────────
  82: {
    bandcampUrl:
      "https://elmir-records.bandcamp.com/album/after-ra-party-1992-2008",
  },
};
