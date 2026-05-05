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
    youtubeUrl: "https://music.youtube.com/watch?v=FTQbiNvZqaY",
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
  92: {
    spotifyUrl: "https://open.spotify.com/track/7yO4IdJjCEPz7YgZMe25iS",
    youtubeUrl: "https://music.youtube.com/watch?v=0CFuCYNx-1g",
    appleMusicUrl: "https://music.apple.com/us/song/superstition/1440833143",
  },

  // ── Wishlist ──────────────────────────────────────────────────────────────
  12131: {
    spotifyUrl: "https://open.spotify.com/track/1lRtH4FszTrwwlK5gTSbXO",
    youtubeUrl: "https://music.youtube.com/watch?v=jRx5PrAlUdY",
  },
  12132: {
    spotifyUrl: "https://open.spotify.com/track/2X485T9Z5Ly0xyaghN73ed",
    youtubeUrl: "https://music.youtube.com/watch?v=LKYPYj2XX80",
  },
  12133: {
    youtubeUrl: "https://music.youtube.com/watch?v=0dFz10R529g",
  },
  12134: {
    spotifyUrl: "https://open.spotify.com/track/2sQ1dI4q2Ykq5eKxO6jZ0d",
    youtubeUrl: "https://music.youtube.com/watch?v=FxzBvqYk0qY",
  },
  12135: {
    spotifyUrl: "https://open.spotify.com/track/2Foc5Q5nqNiosCNqttzHof",
    youtubeUrl: "https://music.youtube.com/watch?v=5NV6Rdv1a3I",
  },
  12136: {
    youtubeUrl: "https://music.youtube.com/watch?v=Ndzln1UEyfM",
  },
  12137: {
    youtubeUrl: "https://music.youtube.com/watch?v=a5uQMwRMHcs",
  },
  12138: {
    spotifyUrl: "https://open.spotify.com/track/4bJ0bX6YfQp0Yv7FpC18mA",
    youtubeUrl: "https://music.youtube.com/watch?v=m4cgLL8JaVI",
  },
  12139: {
    youtubeUrl: "https://music.youtube.com/watch?v=Hj8v0M1Jk2g",
  },
  12140: {
    youtubeUrl: "https://music.youtube.com/watch?v=K2V0a4E3S2E",
  },
  12141: {
    youtubeUrl: "https://music.youtube.com/watch?v=VJ1dSgk7YjE",
  },
  12142: {
    youtubeUrl: "https://music.youtube.com/watch?v=JZ8eA5i5m0g",
  },
  12143: {
    youtubeUrl: "https://music.youtube.com/watch?v=L93-7vRfxNs",
  },
  12144: {
    spotifyUrl: "https://open.spotify.com/track/0DiWol3AO6WpXZgp0goxAV",
  },
  12127: {
    spotifyUrl: "https://open.spotify.com/track/4Yf5bVxZ1Y5PjaVXrDMAYA",
  },
  12128: {
    spotifyUrl: "https://open.spotify.com/track/3hRV0jL3vUpRrcy398teAU",
    youtubeUrl: "https://music.youtube.com/watch?v=16y1AkoZkmQ",
  },
  12129: {
    youtubeUrl: "https://music.youtube.com/watch?v=FYGTT7pN3xE",
  },
  12130: {
    spotifyUrl: "https://open.spotify.com/track/4fW0M2VhJ1pV6QFQj4iR8A",
  },
  12119: {
    youtubeUrl: "https://music.youtube.com/watch?v=r2S1I_ien6A",
  },
  12120: {
    spotifyUrl: "https://open.spotify.com/track/2PzU4IB8Dr6mxV3lHuaG34",
    youtubeUrl: "https://music.youtube.com/watch?v=_CI-0E_jses",
  },
  12121: {
    spotifyUrl: "https://open.spotify.com/track/2WfaOiMkCvy7F5fcp2zZ8L",
    youtubeUrl: "https://music.youtube.com/watch?v=djV11Xbc914",
  },
  12122: {
    spotifyUrl: "https://open.spotify.com/track/2grjqo0Frpf2okIBiifQKs",
    youtubeUrl: "https://music.youtube.com/watch?v=Gs069dndIYk",
  },
  12123: {
    spotifyUrl: "https://open.spotify.com/track/5Z01UMMf7V1o0MzF86s6WJ",
    youtubeUrl: "https://music.youtube.com/watch?v=fNFzfwLM72c",
  },
  12124: {
    spotifyUrl: "https://open.spotify.com/track/1k8WbqGZtHd6Z0vK1jQ2XH",
    youtubeUrl: "https://music.youtube.com/watch?v=god7hAPv8f0",
  },
  12125: {
    spotifyUrl: "https://open.spotify.com/track/0dOg1ySSI7NkpAe89Zo0b9",
    youtubeUrl: "https://music.youtube.com/watch?v=gYkACVDFmeg",
  },
  12126: {
    spotifyUrl: "https://open.spotify.com/track/3tdui6f1bQ1cGukdxbYF9b",
    youtubeUrl: "https://music.youtube.com/watch?v=CS9OO0S5w2k",
  },
  12047: {
    spotifyUrl: "https://open.spotify.com/track/1YQWosTIljIvxAgHWTp7KP",
    youtubeUrl: "https://music.youtube.com/watch?v=vmDDOFXSgAs",
  },
  12048: {
    spotifyUrl: "https://open.spotify.com/track/6oJ6le65k4h5A3NnYzKpWz",
    youtubeUrl: "https://music.youtube.com/watch?v=XAYhNHhxN0A",
  },
  12062: {
    youtubeUrl: "https://music.youtube.com/watch?v=fPmruHc4S9Q",
  },
  12063: {
    youtubeUrl: "https://music.youtube.com/watch?v=pMAtL7n_-rc",
  },
  12064: {
    spotifyUrl: "https://open.spotify.com/track/1eT2xUv1n2fQKpV5Y4Gf2X",
    youtubeUrl: "https://music.youtube.com/watch?v=CvFH_6DNRCY",
  },
  12065: {
    youtubeUrl: "https://music.youtube.com/watch?v=S-Xm7s9eGxU",
  },
  12020: {
    spotifyUrl: "https://open.spotify.com/track/7yO4IdJjCEPz7YgZMe25iS",
    youtubeUrl: "https://music.youtube.com/watch?v=0CFuCYNx-1g",
    appleMusicUrl: "https://music.apple.com/us/song/superstition/1440833143",
  },
  12031: {
    spotifyUrl: "https://open.spotify.com/track/6zM9KqSdz8CA0nVddOZXSy",
    youtubeUrl: "https://music.youtube.com/watch?v=9o5Iu6AVm7g",
    appleMusicUrl: "https://music.apple.com/us/song/my-way/1440833108",
  },
  12032: {
    spotifyUrl: "https://open.spotify.com/track/4XG2aQwDFx1Cdm42Hcps7y",
    youtubeUrl: "https://music.youtube.com/watch?v=fd_nopTFuZA",
    appleMusicUrl: "https://music.apple.com/fr/song/la-mer/1443076281",
  },
  12033: {
    spotifyUrl: "https://open.spotify.com/track/4cS2HQ6jK80vqdY9ofpztx",
    youtubeUrl: "https://music.youtube.com/watch?v=m8OlDPqYBLw",
    appleMusicUrl: "https://music.apple.com/us/song/beyond-the-sea/1440833082",
  },
  12034: {
    spotifyUrl: "https://open.spotify.com/track/2iXdwVdzA0KrI2Q0WQ9f3j",
    youtubeUrl: "https://music.youtube.com/watch?v=YrLk4vdY28Q",
    appleMusicUrl: "https://music.apple.com/us/song/hallelujah/1440833085",
  },
  12028: {
    spotifyUrl: "https://open.spotify.com/track/6m1ZVbWcv16O3MHuvb6jzr",
    youtubeUrl: "https://music.youtube.com/watch?v=G7xO3O6jwxw",
    appleMusicUrl: "https://music.apple.com/fr/album/triangle-des-bermudes/1574693459?i=1574693460",
  },
  12030: {
    spotifyUrl: "https://open.spotify.com/track/4e5ayHsOLJNLTGfjau2mEw",
    youtubeUrl: "https://music.youtube.com/watch?v=Q2c6c2vI2a0",
    appleMusicUrl: "https://music.apple.com/us/song/my-way/1440833089",
  },
  12025: {
    spotifyUrl: "https://open.spotify.com/track/7x8dCjCr0x6x2lXKujYD34",
    youtubeUrl: "https://music.youtube.com/watch?v=SBjQ9tuuTJQ",
    appleMusicUrl: "https://music.apple.com/us/song/the-pretender/258450953",
  },
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

  8: {
    spotifyUrl: "https://open.spotify.com/track/0aF8c6v0N3xZ9dZrj5Xk2B",
    youtubeUrl: "https://music.youtube.com/watch?v=zqNTltOGh5c",
    appleMusicUrl: "https://music.apple.com/us/song/so-what/1440833080",
  },
  2: {
    spotifyUrl: "https://open.spotify.com/track/5ChkMS8OtdzJeqyybCc9R5",
    youtubeUrl: "https://music.youtube.com/watch?v=Zi_XLOBDo_Y",
    appleMusicUrl: "https://music.apple.com/us/song/billie-jean/269572838",
  },
  5: {
    spotifyUrl: "https://open.spotify.com/track/7KXjTSCq5nL1LoYtL7XAwS",
    youtubeUrl: "https://music.youtube.com/watch?v=tvTRZJ-4EyI",
    appleMusicUrl: "https://music.apple.com/us/song/humble/1223592280",
  },
  61: {
    spotifyUrl: "https://open.spotify.com/track/5o4YwzPZ8K1wZ2tYkJXW2t",
    youtubeUrl: "https://music.youtube.com/watch?v=SbyAZQ45uww",
    appleMusicUrl: "https://music.apple.com/us/song/these-boots-are-made-for-walkin/1440833086",
  },
  6: {
    spotifyUrl: "https://open.spotify.com/track/0lXn69o5Z0BGXr3xK1pY1t",
    youtubeUrl: "https://music.youtube.com/watch?v=-ihs-vT9T3Q",
    appleMusicUrl: "https://music.apple.com/us/song/night-fever/1440833086",
  },
  40: {
    spotifyUrl: "https://open.spotify.com/track/0hKRSZhUGEhKU6aNSPBACZ",
    youtubeUrl: "https://music.youtube.com/watch?v=ZVB5K5E1rsU",
    appleMusicUrl: "https://music.apple.com/fr/album/au-dd/1455657037?i=1455657040",
  },
  41: {
    spotifyUrl: "https://open.spotify.com/track/1qE2UTp4mB1jxk6kU9Yy5v",
    youtubeUrl: "https://music.youtube.com/watch?v=nPLV7lGbmT4",
    appleMusicUrl: "https://music.apple.com/us/song/maria-maria/1440833094",
  },
  44: {
    spotifyUrl: "https://open.spotify.com/track/1uQWmt1OhuHGRKmZ2ZcL6p",
    youtubeUrl: "https://music.youtube.com/watch?v=_Yhyp-_hX2s",
    appleMusicUrl: "https://music.apple.com/us/song/lose-yourself/1440908823",
  },
  47: {
    spotifyUrl: "https://open.spotify.com/track/2LlQb7Uoj1kKyGhlkBf9aC",
    youtubeUrl: "https://music.youtube.com/watch?v=sOnqjkJTMaA",
    appleMusicUrl: "https://music.apple.com/us/song/thriller/269572838",
  },
  48: {
    spotifyUrl: "https://open.spotify.com/track/2xLMifQCjDGFmkHkpNLD9h",
    youtubeUrl: "https://music.youtube.com/watch?v=6ONRf7h3Mdk",
    appleMusicUrl: "https://music.apple.com/us/song/sicko-mode/1421241217",
  },
  67: {
    spotifyUrl: "https://open.spotify.com/track/7Lf7oSEVdzZqTA0kEDSlS5",
    youtubeUrl: "https://music.youtube.com/watch?v=DksSPZTZES0",
    appleMusicUrl: "https://music.apple.com/us/song/cry-me-a-river/1440833087",
  },
  70: {
    spotifyUrl: "https://open.spotify.com/track/4xkOaSrkexMciUUogZKVTS",
    youtubeUrl: "https://music.youtube.com/watch?v=YVkUvmDQ3HY",
    appleMusicUrl: "https://music.apple.com/us/song/without-me/1440908828",
  },
  79: {
    spotifyUrl: "https://open.spotify.com/track/5mAPk4qeNqVLtNyAQbFmOm",
    youtubeUrl: "https://music.youtube.com/watch?v=5wBTdfAkqGU",
    appleMusicUrl: "https://music.apple.com/us/song/california-love/1440833101",
  },

  81: {
    spotifyUrl: "https://open.spotify.com/track/1jzDzZWeSDBg5fhNc3tczV",
    youtubeUrl: "https://music.youtube.com/watch?v=6G9Ck5v5cEo",
    appleMusicUrl: "https://music.apple.com/us/song/theme-from-shaft/1440833106",
  },
  88: {
    spotifyUrl: "https://open.spotify.com/track/2qOm7ukLyHUXWyR4ZWLwxA",
    youtubeUrl: "https://music.youtube.com/watch?v=QZXc39hT8t4",
    appleMusicUrl: "https://music.apple.com/us/song/the-next-episode/1440833097",
  },
  113: {
    spotifyUrl: "https://open.spotify.com/track/4fzsfWzRhPawzqhX8Qt9F3",
    youtubeUrl: "https://music.youtube.com/watch?v=PsO6ZnUZI0g",
    appleMusicUrl: "https://music.apple.com/us/song/stronger/1440650367",
  },
  115: {
    spotifyUrl: "https://open.spotify.com/track/3q7HBObVc0L8jNeTe5Gofh",
    youtubeUrl: "https://music.youtube.com/watch?v=TMZi25Pq3T8",
    appleMusicUrl: "https://music.apple.com/us/song/straight-outta-compton/1440833103",
  },
  112: {
    spotifyUrl: "https://open.spotify.com/track/0x2drXrDoIjuo1leonX2ND",
    youtubeUrl: "https://music.youtube.com/watch?v=8Z9Ismh1V8M",
    appleMusicUrl: "https://music.apple.com/us/song/cola-bottle-baby/1440833090",
  },
  114: {
    spotifyUrl: "https://open.spotify.com/track/1zEoZ1JpN96e0pQfM9vDOM",
    youtubeUrl: "https://music.youtube.com/watch?v=GxZuq57_bYM",
    appleMusicUrl: "https://music.apple.com/us/song/amen-brother/1440833081",
  },
  116: {
    spotifyUrl: "https://open.spotify.com/track/3pRaLNL3b8x5uBOcsgvdqM",
    youtubeUrl: "https://music.youtube.com/watch?v=4NjssV8UuVA",
    appleMusicUrl: "https://music.apple.com/us/song/a-fifth-of-beethoven/1440833083",
  },

  69: {
    spotifyUrl: "https://open.spotify.com/track/3Qm86XLflmIXVm1wcwkgDK",
    youtubeUrl: "https://music.youtube.com/watch?v=68ugkg9RePc",
  },
  94: {
    spotifyUrl: "https://open.spotify.com/track/0q6LuUqGLUiCPP1cbdwFs3",
    youtubeUrl: "https://music.youtube.com/watch?v=G3qG5x7V4HE",
  },
  95: {
    spotifyUrl: "https://open.spotify.com/track/0pWvWckHQwZ0pniS3pSkeq",
    youtubeUrl: "https://music.youtube.com/watch?v=4xQwZJgYJqE",
    appleMusicUrl: "https://music.apple.com/de/album/ich-geh-heut-nicht-mehr-tanzen/1440649914",
  },
  96: {
    spotifyUrl: "https://open.spotify.com/track/4iJyoBOLtHqaGxP12qzhQI",
    youtubeUrl: "https://music.youtube.com/watch?v=iuJDhFRDx9M",
    appleMusicUrl: "https://music.apple.com/us/song/tokyo-drift-fast-furious/1440833084",
  },

  // ── Shipped: World ────────────────────────────────────────────────────────
  100: {
    spotifyUrl: "https://open.spotify.com/track/0ZqhrTXYPA9DZR527ZnFdO",
    youtubeUrl: "https://music.youtube.com/watch?v=UVKsd8z6scw",
    appleMusicUrl: "https://music.apple.com/us/song/the-great-pretender/1440833080",
  },
  82: {
    bandcampUrl:
      "https://elmir-records.bandcamp.com/album/after-ra-party-1992-2008",
  },
};
