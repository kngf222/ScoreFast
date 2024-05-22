/*
  Warnings:

  - You are about to drop the column `user_id` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the `UserProfile` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `team1Id` on table `Match` required. This step will fail if there are existing NULL values in that column.
  - Made the column `team2Id` on table `Match` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Match" DROP CONSTRAINT "Match_team1Id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Match" DROP CONSTRAINT "Match_team2Id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Match" DROP CONSTRAINT "Match_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."Match" DROP COLUMN "user_id",
ALTER COLUMN "team1Id" SET NOT NULL,
ALTER COLUMN "team2Id" SET NOT NULL;

-- DropTable
DROP TABLE "public"."UserProfile";

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
