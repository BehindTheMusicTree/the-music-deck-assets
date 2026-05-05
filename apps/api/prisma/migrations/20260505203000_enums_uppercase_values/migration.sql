-- Normalize Postgres enum labels to uppercase (matches Prisma schema).

ALTER TYPE "CardRarity" RENAME VALUE 'Legendary' TO 'LEGENDARY';
ALTER TYPE "CardRarity" RENAME VALUE 'Classic' TO 'CLASSIC';
ALTER TYPE "CardRarity" RENAME VALUE 'Banger' TO 'BANGER';
ALTER TYPE "CardRarity" RENAME VALUE 'Niche' TO 'NICHE';

ALTER TYPE "CardKind" RENAME VALUE 'Song' TO 'SONG';
ALTER TYPE "CardKind" RENAME VALUE 'Transition' TO 'TRANSITION';

ALTER TYPE "Intensity" RENAME VALUE 'pop' TO 'POP';
ALTER TYPE "Intensity" RENAME VALUE 'soft' TO 'SOFT';
ALTER TYPE "Intensity" RENAME VALUE 'experimental' TO 'EXPERIMENTAL';
ALTER TYPE "Intensity" RENAME VALUE 'hardcore' TO 'HARDCORE';
