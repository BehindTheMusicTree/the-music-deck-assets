import CatalogDeckTable from "@/components/catalog/CatalogDeckTable";
import {
  getCatalogSongIndex,
  getShippedCatalogCards,
  getWishlistCards,
} from "@/lib/cards-api";
import {
  buildCatalogEntriesFromShippedApi,
  buildWishlistEntriesFromApi,
} from "@/lib/deck-from-api";

export default async function CatalogDeck() {
  const [shipped, wishlist, cardSongIndex] = await Promise.all([
    getShippedCatalogCards(),
    getWishlistCards(),
    getCatalogSongIndex(),
  ]);
  const catalogEntries = buildCatalogEntriesFromShippedApi(shipped);
  const wishlistEntries = buildWishlistEntriesFromApi(wishlist, catalogEntries);
  return (
    <CatalogDeckTable
      className="w-full min-w-0"
      catalogEntries={catalogEntries}
      wishlistEntries={wishlistEntries}
      cardSongIndex={cardSongIndex}
    />
  );
}
