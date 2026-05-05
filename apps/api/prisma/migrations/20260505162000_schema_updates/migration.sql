ALTER TABLE "Genre"
ADD COLUMN "isCountry" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "Card" ADD COLUMN "soundcloudUrl" TEXT;

UPDATE "Card"
SET "status" = 'Wishlist'::"CardStatus"
WHERE "status" = 'Planned'::"CardStatus";

ALTER TABLE "Card"
DROP COLUMN "kind";

DROP TYPE "CardKind";
