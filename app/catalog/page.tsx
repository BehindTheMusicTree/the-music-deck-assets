import Link from "next/link";
import CatalogDeckTable from "@/components/CatalogDeckTable";

export default function CatalogPage() {
  return (
    <div className="px-6 py-10 flex flex-col items-center min-h-screen">
      <div className="page-index mb-2">05</div>
      <div className="page-eyebrow mb-4">Available cards</div>
      <h2 className="font-cinzel text-3xl tracking-[4px] text-white mb-2">
        CATA<em className="text-gold not-italic">LOG</em>
      </h2>
      <p className="font-garamond italic text-muted max-w-[600px] text-center mb-4">
        The full set of cards with bundled artwork. Previews match the charter;
        click a row preview to zoom.
      </p>
      <p className="font-garamond text-muted text-center text-sm mb-10 max-w-[520px]">
        Frame rules and anatomy:{" "}
        <Link
          href="/cards#catalog"
          className="text-gold underline-offset-2 hover:underline"
        >
          Cards — Catalog
        </Link>
        .
      </p>

      <div id="catalog" className="w-full max-w-[1200px] mb-10 scroll-mt-24">
        <CatalogDeckTable />
      </div>
    </div>
  );
}
