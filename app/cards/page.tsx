import CardsPageShell from "@/components/CardsPageShell";
import { CardsSongsContent } from "@/app/cards/songs-content";
import { CardsRemixesContent } from "@/app/cards/remixes-content";

export default function CardsPage() {
  return (
    <CardsPageShell
      songs={<CardsSongsContent />}
      remixes={<CardsRemixesContent />}
    />
  );
}
