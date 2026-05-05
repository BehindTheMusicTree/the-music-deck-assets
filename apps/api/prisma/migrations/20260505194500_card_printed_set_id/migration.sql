-- Visible stable printed identity: [TYPE]-[SEASON]-[NNN] (optionally suffixed server-side via full string).

ALTER TABLE "Card" ADD COLUMN "printedSetId" TEXT;

CREATE UNIQUE INDEX "Card_printedSetId_key" ON "Card"("printedSetId");
