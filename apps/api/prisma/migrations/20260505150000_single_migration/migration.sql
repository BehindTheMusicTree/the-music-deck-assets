-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "CardKind" AS ENUM ('Card', 'Planned');

-- CreateEnum
CREATE TYPE "CardStatus" AS ENUM ('Shipped', 'Wishlist', 'Planned');

-- CreateEnum
CREATE TYPE "CardRarity" AS ENUM ('Legendary', 'Classic', 'Banger', 'Niche');

-- CreateEnum
CREATE TYPE "Intensity" AS ENUM ('pop', 'soft', 'experimental', 'hardcore');

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" INTEGER,
    "parentBId" INTEGER,
    "blendFactor" DOUBLE PRECISION,
    "intensity" "Intensity" NOT NULL,
    "colorOverride" TEXT,
    "influenceId" INTEGER,
    "influenceIntensity" "Intensity",
    "displayLabel" TEXT,
    "wheelOrder" INTEGER,
    "theme" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" INTEGER NOT NULL,
    "rowKey" TEXT NOT NULL,
    "status" "CardStatus" NOT NULL,
    "kind" "CardKind" NOT NULL,
    "title" TEXT NOT NULL,
    "pop" INTEGER NOT NULL,
    "rarity" "CardRarity" NOT NULL,
    "ability" TEXT NOT NULL,
    "abilityDesc" TEXT NOT NULL,
    "artworkKey" TEXT,
    "artworkContentType" TEXT,
    "artworkBytes" INTEGER,
    "artworkChecksum" TEXT,
    "artworkOffsetY" INTEGER,
    "artworkOverBorder" BOOLEAN NOT NULL DEFAULT false,
    "artworkCreatedAt" TIMESTAMP(3),
    "artworkPrompt" TEXT,
    "wikipediaUrl" TEXT,
    "spotifyUrl" TEXT,
    "appleMusicUrl" TEXT,
    "youtubeUrl" TEXT,
    "bandcampUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongCard" (
    "id" INTEGER NOT NULL,
    "artist" TEXT,
    "year" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "genreId" INTEGER,
    "country" TEXT,
    "catalogNumber" INTEGER,

    CONSTRAINT "SongCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongCardTrackTransition" (
    "fromId" INTEGER NOT NULL,
    "toId" INTEGER NOT NULL,

    CONSTRAINT "SongCardTrackTransition_pkey" PRIMARY KEY ("fromId","toId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Card_rowKey_key" ON "Card"("rowKey");

-- CreateIndex
CREATE INDEX "SongCardTrackTransition_toId_idx" ON "SongCardTrackTransition"("toId");

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Genre"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_parentBId_fkey" FOREIGN KEY ("parentBId") REFERENCES "Genre"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_influenceId_fkey" FOREIGN KEY ("influenceId") REFERENCES "Genre"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongCard" ADD CONSTRAINT "SongCard_id_fkey" FOREIGN KEY ("id") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongCard" ADD CONSTRAINT "SongCard_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongCardTrackTransition" ADD CONSTRAINT "SongCardTrackTransition_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "SongCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongCardTrackTransition" ADD CONSTRAINT "SongCardTrackTransition_toId_fkey" FOREIGN KEY ("toId") REFERENCES "SongCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

