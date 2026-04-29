import CardsArtworksSection from "@/components/CardsArtworksSection";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Artworks" };


export default function CharterArtworksPage() {
  return (
    <div className="px-6 py-10 flex flex-col items-center min-h-screen">
      <div className="page-index mb-2">03</div>
      <div className="page-eyebrow mb-4">Visual generation charter</div>
      <h2 className="font-cinzel text-3xl tracking-[4px] text-white mb-2">
        ARTWORK <em className="text-gold not-italic">GUIDELINES</em>
      </h2>
      <p className="font-garamond italic text-muted max-w-[760px] text-center mb-10">
        Canonical guidance for card artwork format, dominant colours, genre
        styles, mixed influences, and prompt examples.
      </p>

      <div className="w-full max-w-[1100px]">
        <CardsArtworksSection />
      </div>
    </div>
  );
}
