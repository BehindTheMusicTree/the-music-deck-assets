/** Six canonical dimensions per battle audio element (genre-intensity or country layer). */
export type BattleAudioSixLines = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
];

export type BattleAudioPromptBlock = {
  title: string;
  lines: BattleAudioSixLines;
};

/** Selectable element shapes used by the generator and library (minimal fields). */
export type BattleAudioSelectable =
  | { kind: "genreIntensity"; genre: string; intensity: string }
  | { kind: "country"; country: string };

// ---------------------------------------------------------------------------
// Authored genre · intensity prompts (add rows here as they are validated)
// ---------------------------------------------------------------------------

export const ROCK_POP_PROMPT_LINES: BattleAudioSixLines = [
  "Genre + sub-genre: Pop Rock with influences from 80s/90s radio rock and modern chart-friendly pop. Emphasis on catchy hooks, upbeat energy, and accessible arrangements.",
  "Tempo + groove: 120 BPM, lively and steady. Groove: bright 4/4 with a strong backbeat, syncopated guitar or keyboard accents, and occasional handclaps or tambourine. Feels energetic, fun, and danceable.",
  "Instruments + textures: Clean or lightly overdriven electric guitars, acoustic strums, punchy bass, crisp drums, bright synths or piano, and layered backing vocals. Polished production, with occasional breaks for dynamic contrast.",
  "Mood: Uplifting, confident, and approachable. A sense of youthful optimism, playful attitude, and crowd-pleasing fun. Never too heavy or dark.",
  "Structure + dynamics: Immediate, hooky intro, verse-chorus alternation, energetic bridge, and a big, loop-friendly chorus or outro. Clear dynamic lifts for chorus and bridge.",
  "Non-copyright references: General language of mainstream pop rock, power pop, and radio-friendly rock. No imitation of specific artists or lyrics. Captures the vibe of a festival-ready, all-ages set.",
];

export const ROCK_SOFT_PROMPT_LINES: BattleAudioSixLines = [
  "Genre + sub-genre: Soft Rock with influences from 70s/80s adult contemporary and modern mellow pop-rock. Emphasis on melodic clarity, smooth textures, and approachable songwriting.",
  "Tempo + groove: 92 BPM, relaxed and steady. Groove: gentle 4/4 with light syncopation, subtle backbeat, and occasional brushed or rimshot snare. Feels laid-back, warm, and inviting.",
  "Instruments + textures: Clean electric and acoustic guitars with chorus or light reverb, mellow electric piano or synth pads, rounded bass, soft acoustic drums, and tasteful percussion. Optional gentle vocal harmonies or wordless oohs/ahs. Minimal distortion, no aggressive elements.",
  "Mood: Comforting, nostalgic, and emotionally open. A sense of easy confidence, heartfelt sincerity, and relaxed optimism. Never tense or dark.",
  "Structure + dynamics: Simple intro, verse-like build with melodic guitar or keys, soft chorus/plateau, and a gentle, loop-friendly outro. Dynamics remain controlled and never harsh.",
  "Non-copyright references: General language of classic soft rock, adult contemporary, and mellow pop-rock. No imitation of specific artists or lyrics. Captures the vibe of a cozy, radio-friendly set.",
];

export const ROCK_EXPERIMENTAL_PROMPT_LINES: BattleAudioSixLines = [
  "Genre + sub-genre: experimental alternative rock with art-rock edges (2000s/2010s underground spirit).",
  "Tempo + groove: 124 BPM, tight binary pulse with unstable syncopated accents and occasional metric tension.",
  "Instruments + textures: fuzz electric guitars, gritty bass, punchy acoustic drums, saturated analogue synth layers, noisy transitions, fragmented FX tails.",
  "Mood: dark, introspective, and volatile, with controlled chaos and nervous forward motion.",
  "Structure + dynamics: sparse intro -> progressive tension build -> disruptive impact section -> unstable plateau -> sharp but loop-safe release.",
  "Non-copyright references: post-2000s alternative/art-rock scene language, experimental indie club energy, no direct song or artist imitation.",
];

export const ROCK_HARDCORE_PROMPT_LINES: BattleAudioSixLines = [
  "Genre + sub-genre: Straight Hard Rock with touches of garage rock and post‑2000s alternative rock. Focus on riff energy, tight grooves, and amplified attitude, without drifting into metal or extreme heaviness.",
  "Tempo + groove: 142 BPM, steady and muscular. Groove: driving 4/4, mid‑tempo push, syncopated guitar stabs, and occasional half‑time drops for emphasis. Feels energetic, confident, and stage‑ready.",
  "Instruments + textures: Crunchy electric guitars with classic hard‑rock distortion, palm‑muted accents, and open‑chord bursts. Warm, gritty bass glued to the kick drum. Punchy acoustic drums: big snare, roomy toms, bright cymbals. Sparse vocal shouts: Occasional callouts like “Hardcore!” or “Rock!” used as percussive hits, not melodic lines. No verses, no sung lyrics. Light amp noise, pick scrapes, and feedback tails for transitions.",
  "Mood: Bold, energetic, and attitude‑forward. A sense of raw confidence, sweaty rehearsal‑room power, and unpolished authenticity. Not violent — just loud, gritty, and proudly rock‑centric.",
  "Structure + dynamics: Riff‑first intro, immediate and catchy. Groove‑driven build, guitars locking with drums. Impact section with a heavier riff and a few shouted cues (“Hardcore!”, “Rock!”). Plateau with alternating tight riffs and open‑chord hits. Clean, loop‑friendly ending, either a final unison hit or a short feedback fade.",
  "Non-copyright references: General language of 2000s/2010s hard rock revival, garage‑rock energy, and alt‑rock grit. No imitation of specific bands or vocal melodies. Captures the vibe of a small club hard‑rock set.",
];

const GENRE_INTENSITY_REGISTRY: Record<string, BattleAudioSixLines> = {
  "Rock|experimental": ROCK_EXPERIMENTAL_PROMPT_LINES,
  "Rock|hardcore": ROCK_HARDCORE_PROMPT_LINES,
  "Rock|soft": ROCK_SOFT_PROMPT_LINES,
  "Rock|pop": ROCK_POP_PROMPT_LINES,
};

export const ROCK_EXPERIMENTAL_PROMPT_TEXT =
  ROCK_EXPERIMENTAL_PROMPT_LINES.join("\n");

/** Plain text for library rows — empty until authored in this file. */
export function genreIntensityPromptTextOrEmpty(
  genre: string,
  intensity: string,
): string {
  const lines = GENRE_INTENSITY_REGISTRY[`${genre}|${intensity}`];
  return lines ? [...lines].join("\n") : "";
}

function fallbackGenreIntensityBlock(
  genre: string,
  intensity: string,
): BattleAudioPromptBlock {
  const lines: BattleAudioSixLines = [
    `Genre + sub-genre: ${genre} / ${intensity} (to be authored).`,
    "Tempo + groove: to be authored.",
    "Instruments + textures: to be authored.",
    "Mood: to be authored.",
    "Structure + dynamics: to be authored.",
    "Non-copyright references: to be authored.",
  ];
  return { title: `${genre} · ${intensity}`, lines };
}

function countryLayerBlock(country: string): BattleAudioPromptBlock {
  const lines: BattleAudioSixLines = [
    `Genre + sub-genre: battle-ready hybrid layer inspired by ${country} regional identity.`,
    "Tempo + groove: inherit tempo from pair context; lock to competitive, readable rhythmic grid.",
    `Instruments + textures: regional tonal cues inspired by ${country}, modernised for game mix clarity.`,
    "Mood: identity-forward, cinematic, and cohesive with battle intensity.",
    "Structure + dynamics: supportive phrasing blocks that can blend and loop cleanly in crossfades.",
    "Non-copyright references: regional scene/era colour only, no direct melody quotation or artist imitation.",
  ];
  return { title: `${country} · country layer`, lines };
}

export function battleAudioElementPromptBlock(
  sel: BattleAudioSelectable,
): BattleAudioPromptBlock {
  if (sel.kind === "country") {
    return countryLayerBlock(sel.country);
  }
  const authored = GENRE_INTENSITY_REGISTRY[`${sel.genre}|${sel.intensity}`];
  if (authored) {
    return { title: `${sel.genre} · ${sel.intensity}`, lines: authored };
  }
  return fallbackGenreIntensityBlock(sel.genre, String(sel.intensity));
}
