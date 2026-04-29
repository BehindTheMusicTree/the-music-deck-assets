import Link from "next/link";
import CatalogDeckTable from "@/components/CatalogDeckTable";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Catalog" };


export default function CatalogPage() {
  return (
    <div className="px-6 py-10 flex flex-col items-center min-h-screen w-full max-w-none">
      <div className="page-index mb-2">05</div>
      <div className="page-eyebrow mb-4">Available cards</div>
      <h2 className="font-cinzel text-3xl tracking-[4px] text-white mb-2">
        CATA<em className="text-gold not-italic">LOG</em>
      </h2>
      <p className="font-garamond italic text-muted max-w-[600px] text-center mb-4">
        The shipped deck lists every card with bundled artwork (catalogue
        numbers are per genre, or per country/region when the subgenre is
        country-native). Use the Shipped deck / Wishlist tabs: the wishlist tab
        lists planned rows without bundled deck PNGs yet. Under Shipped deck,
        use the Table / Grid toggle — in table view, filter and sort from the
        headers, then click a row for full details and a 2× card; in grid view,
        click a card for the same.
      </p>
      <p className="font-garamond text-muted text-center text-sm mb-10 max-w-[520px]">
        Frame rules and anatomy:{" "}
        <Link
          href="/cards#anatomy"
          className="text-gold underline-offset-2 hover:underline"
        >
          Cards — Anatomy
        </Link>
        .
      </p>

      <div
        id="catalog"
        className="w-full min-w-0 self-stretch mb-10 scroll-mt-24 max-w-none"
      >
        <CatalogDeckTable className="w-full min-w-0" />
      </div>
    </div>
  );
}
