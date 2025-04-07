/*
  Warnings:

  - You are about to drop the column `user_id` on the `travel_plans` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `travel_plans` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "travel_plans" DROP CONSTRAINT "travel_plans_user_id_fkey";

-- AlterTable
ALTER TABLE "travel_plans" DROP COLUMN "user_id",
ADD COLUMN     "author_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "travel_plans" ADD CONSTRAINT "travel_plans_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
