/*
  Warnings:

  - You are about to drop the `travel_plans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "travel_plans" DROP CONSTRAINT "travel_plans_user_id_fkey";

-- DropTable
DROP TABLE "travel_plans";

-- CreateTable
CREATE TABLE "TravelPlan" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "destination" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "itinerary" JSONB,
    "visibility" TEXT NOT NULL DEFAULT 'private',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TravelPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TravelPlan" ADD CONSTRAINT "TravelPlan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
