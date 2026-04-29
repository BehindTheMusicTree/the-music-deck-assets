import type { CardData } from "@/components/Card";
import type { AppGenreName } from "@/lib/genres";
import { CLASSICAL_CARDS } from "./classical";
import { DISCO_FUNK_CARDS } from "./disco-funk";
import { ELECTRONIC_CARDS } from "./electronic";
import { HIP_HOP_CARDS } from "./hip-hop";
import { MAINSTREAM_CARDS } from "./mainstream";
import { REGGAE_DUB_CARDS } from "./reggae-dub";
import { ROCK_CARDS } from "./rock";
import { VINTAGE_CARDS } from "./vintage";

const _allGenreCards: CardData[] = [
  ...ROCK_CARDS,
  ...ELECTRONIC_CARDS,
  ...HIP_HOP_CARDS,
  ...DISCO_FUNK_CARDS,
  ...VINTAGE_CARDS,
  ...CLASSICAL_CARDS,
  ...REGGAE_DUB_CARDS,
  ...MAINSTREAM_CARDS,
];

const _byId = new Map(_allGenreCards.map((c) => [c.id, c]));

export const MOCK_CARDS: Record<AppGenreName, CardData> = {
  Rock: _byId.get(1)!,
  Mainstream: _byId.get(2)!,
  Electronic: _byId.get(3)!,
  "Reggae/Dub": _byId.get(4)!,
  "Hip-Hop": _byId.get(5)!,
  "Disco/Funk": _byId.get(6)!,
  Classical: _byId.get(7)!,
  Vintage: _byId.get(8)!,
};

const _mockIds = new Set(Object.values(MOCK_CARDS).map((c) => c.id));

/** All genre cards except the 8 MOCK_CARDS representatives (those are handled separately in catalog.ts via rawGenreRows). */
export const DECK_SPOTLIGHT_CARDS: CardData[] = _allGenreCards.filter(
  (c) => !_mockIds.has(c.id),
);
