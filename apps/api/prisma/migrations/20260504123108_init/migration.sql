-- CreateEnum
CREATE TYPE "CardKind" AS ENUM ('Card', 'Planned');

-- CreateEnum
CREATE TYPE "CardStatus" AS ENUM ('Shipped', 'Wishlist', 'Planned');

-- CreateEnum
CREATE TYPE "CardRarity" AS ENUM ('Legendary', 'Classic', 'Banger', 'Niche');

-- CreateTable
CREATE TABLE "Card" (
    "id" INTEGER NOT NULL,
    "rowKey" TEXT NOT NULL,
    "status" "CardStatus" NOT NULL,
    "kind" "CardKind" NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT,
    "year" TEXT NOT NULL,
    "genre" TEXT,
    "country" TEXT,
    "ability" TEXT NOT NULL,
    "abilityDesc" TEXT NOT NULL,
    "pop" INTEGER NOT NULL,
    "rarity" "CardRarity" NOT NULL,
    "catalogNumber" INTEGER,
    "artworkKey" TEXT,
    "artworkContentType" TEXT,
    "artworkBytes" INTEGER,
    "artworkChecksum" TEXT,
    "artworkOffsetY" INTEGER,
    "artworkOverBorder" BOOLEAN NOT NULL DEFAULT false,
    "artworkCreatedAt" TIMESTAMP(3),
    "artworkPrompt" TEXT,
    "wikipediaUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardTrackTransition" (
    "fromId" INTEGER NOT NULL,
    "toId" INTEGER NOT NULL,

    CONSTRAINT "CardTrackTransition_pkey" PRIMARY KEY ("fromId","toId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_rowKey_key" ON "Card"("rowKey");

-- CreateIndex
CREATE INDEX "CardTrackTransition_toId_idx" ON "CardTrackTransition"("toId");

-- AddForeignKey
ALTER TABLE "CardTrackTransition" ADD CONSTRAINT "CardTrackTransition_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardTrackTransition" ADD CONSTRAINT "CardTrackTransition_toId_fkey" FOREIGN KEY ("toId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
