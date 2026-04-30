import type { CardData } from "@/components/Card";
import { deriveCatalogSeriesLabel } from "../_card-helpers";
import { ALGERIA_CARDS } from "./algeria";
import { BRETAGNE_CARDS } from "./bretagne";
import { FRANCE_CARDS } from "./france";
import { GERMANY_CARDS } from "./germany";
import { ITALY_CARDS } from "./italy";
import { JAPAN_CARDS } from "./japan";
import { MEXICO_CARDS } from "./mexico";
import { NETHERLANDS_CARDS } from "./netherlands";
import { PUERTO_RICO_CARDS } from "./puerto-rico";
import { RUSSIA_CARDS } from "./russia";
import { SPAIN_CARDS } from "./spain";
import { SWITZERLAND_CARDS } from "./switzerland";
import { USA_CARDS } from "./usa";

const ALL_WORLD_CARDS: CardData[] = [
  ...USA_CARDS,
  ...FRANCE_CARDS,
  ...BRETAGNE_CARDS,
  ...SPAIN_CARDS,
  ...MEXICO_CARDS,
  ...ALGERIA_CARDS,
  ...PUERTO_RICO_CARDS,
  ...ITALY_CARDS,
  ...NETHERLANDS_CARDS,
  ...GERMANY_CARDS,
  ...JAPAN_CARDS,
  ...SWITZERLAND_CARDS,
  ...RUSSIA_CARDS,
];

export const WORLD_FLAG_CARDS: CardData[] = ALL_WORLD_CARDS.filter(
  (c) => deriveCatalogSeriesLabel(c) === c.country,
);

export const WORLD_MIXED_CARDS: CardData[] = ALL_WORLD_CARDS.filter(
  (c) => deriveCatalogSeriesLabel(c) !== c.country,
);
