/*
  Warnings:

  - A unique constraint covering the columns `[challengeId,language]` on the table `LanguageVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LanguageVariant_challengeId_language_key" ON "LanguageVariant"("challengeId", "language");
