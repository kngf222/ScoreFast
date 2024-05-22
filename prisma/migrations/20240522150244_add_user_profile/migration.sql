/*
  Warnings:

  - You are about to drop the column `player1` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `player2` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `score1` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `score2` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `score1` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `score2` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- DropForeignKey
ALTER TABLE "public"."History" DROP CONSTRAINT "History_matchId_fkey";

-- AlterTable
ALTER TABLE "public"."Match" DROP COLUMN "player1",
DROP COLUMN "player2",
DROP COLUMN "score1",
DROP COLUMN "score2",
ADD COLUMN     "team1Id" INTEGER,
ADD COLUMN     "team2Id" INTEGER,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Set" DROP COLUMN "score1",
DROP COLUMN "score2";

-- DropTable
DROP TABLE "public"."History";

-- CreateTable
CREATE TABLE "public"."Team" (
    "id" SERIAL NOT NULL,
    "player1" TEXT,
    "player2" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Score" (
    "id" SERIAL NOT NULL,
    "setId" INTEGER NOT NULL,
    "team1Score" INTEGER NOT NULL,
    "team2Score" INTEGER NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserProfile" (
    "id" TEXT NOT NULL,
    "displayName" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "public"."Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "public"."Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Score" ADD CONSTRAINT "Score_setId_fkey" FOREIGN KEY ("setId") REFERENCES "public"."Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
