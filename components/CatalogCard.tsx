"use client";

import type { ComponentProps } from "react";
import Card from "@/components/Card";
import { CATALOG_CARD_TRANSITION_PROPS } from "@/lib/cards";

/**
 * `Card` with `cardTrackIndex` from the catalogue always wired. Use for any
 * shipped catalogue card so transition strips do not need separate graph props.
 */
export default function CatalogCard(props: ComponentProps<typeof Card>) {
  return <Card {...props} {...CATALOG_CARD_TRANSITION_PROPS} />;
}
