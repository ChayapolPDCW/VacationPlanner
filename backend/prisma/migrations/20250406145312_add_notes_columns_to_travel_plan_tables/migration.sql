/*
  Warnings:

  - You are about to drop the column `mood` on the `travel_plan_journals` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `travel_plan_journals` table. All the data in the column will be lost.
  - Added the required column `fav_notes` to the `travel_plan_journals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `future_tip` to the `travel_plan_journals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city_title` to the `travel_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `travel_plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "travel_plan_journals" DROP COLUMN "mood",
DROP COLUMN "title",
ADD COLUMN     "fav_notes" TEXT NOT NULL,
ADD COLUMN     "future_tip" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "travel_plans" ADD COLUMN     "city_title" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT NOT NULL;
