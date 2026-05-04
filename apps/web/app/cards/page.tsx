import CardsPageShell from "@/components/cards/CardsPageShell";
import { CardsSongsContent } from "@/app/cards/songs-content";
import { CardsRemixesContent } from "@/app/cards/remixes-content";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Cards" };

export default function CardsPage() {
  return (
    <CardsPageShell
      songs={
        <Suspense
          fallback={
            <p className="font-garamond text-muted text-center py-12 px-6">
              Loading cards…
            </p>
          }
        >
          <CardsSongsContent />
        </Suspense>
      }
      remixes={<CardsRemixesContent />}
    />
  );
}
