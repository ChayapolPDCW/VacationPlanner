/*
  Warnings:

  - You are about to drop the column `ProfilePicture` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `current_rank` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `total_like_received` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `total_plan_created` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('public', 'private');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ProfilePicture",
DROP COLUMN "current_rank",
DROP COLUMN "total_like_received",
DROP COLUMN "total_plan_created",
ADD COLUMN     "avatarUrl" TEXT NOT NULL DEFAULT 'public/images/avatar.png',
ADD COLUMN     "experinceLevel" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "TravelPlan" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "visibility" "Visibility" NOT NULL DEFAULT 'private',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TravelPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TravelPlanDestination" (
    "id" SERIAL NOT NULL,
    "travelPlanId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "photoUrl" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "dailyVisitOrder" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TravelPlanDestination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TravelPlanDestinationAttachment" (
    "travelPlanDestinationId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TravelPlanDestinationAttachment_pkey" PRIMARY KEY ("travelPlanDestinationId")
);

-- CreateTable
CREATE TABLE "TravelPlanIdBookmark" (
    "travelPlanId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TravelPlanIdBookmark_pkey" PRIMARY KEY ("travelPlanId","userId")
);

-- CreateTable
CREATE TABLE "TravelPlanLike" (
    "travelPlanId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TravelPlanLike_pkey" PRIMARY KEY ("travelPlanId","userId")
);

-- CreateTable
CREATE TABLE "TravelPlanJournal" (
    "id" SERIAL NOT NULL,
    "travelPlanId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "visibility" "Visibility" NOT NULL DEFAULT 'private',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TravelPlanJournal_pkey" PRIMARY KEY ("id")
);
