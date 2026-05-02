import CardsPageShell from "@/components/cards/CardsPageShell";
import { CardsSongsContent } from "@/app/cards/songs-content";
import { CardsRemixesContent } from "@/app/cards/remixes-content";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Cards" };


export default function CardsPage() {
  return (
    <CardsPageShell
      songs={<CardsSongsContent />}
      remixes={<CardsRemixesContent />}
    />
  );
}
