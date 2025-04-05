-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "avatar_url" VARCHAR(255),
    "rank" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travel_plans" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "visibility" "Visibility" NOT NULL DEFAULT 'PRIVATE',
    "updated_at" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "travel_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travel_plan_journals" (
    "id" SERIAL NOT NULL,
    "travel_plan_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "notes" TEXT NOT NULL,
    "mood" VARCHAR(50) NOT NULL,
    "rating" INTEGER NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "travel_plan_journals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travel_plan_destinations" (
    "id" SERIAL NOT NULL,
    "travel_plan_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "photo_url" VARCHAR(255),
    "google_place_id" VARCHAR(255) NOT NULL,
    "start_date" DATE NOT NULL,
    "daily_visit_order" INTEGER NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "travel_plan_destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travel_plan_destination_attachments" (
    "travel_plan_destination_id" INTEGER NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "order" INTEGER NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "travel_plan_destination_attachments_pkey" PRIMARY KEY ("travel_plan_destination_id")
);

-- CreateTable
CREATE TABLE "travel_plan_bookmarks" (
    "travel_plan_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "travel_plan_bookmarks_pkey" PRIMARY KEY ("travel_plan_id","user_id")
);

-- CreateTable
CREATE TABLE "travel_plan_likes" (
    "travel_plan_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "travel_plan_likes_pkey" PRIMARY KEY ("travel_plan_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "travel_plan_journals_travel_plan_id_key" ON "travel_plan_journals"("travel_plan_id");

-- AddForeignKey
ALTER TABLE "travel_plans" ADD CONSTRAINT "travel_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_plan_journals" ADD CONSTRAINT "travel_plan_journals_travel_plan_id_fkey" FOREIGN KEY ("travel_plan_id") REFERENCES "travel_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_plan_destinations" ADD CONSTRAINT "travel_plan_destinations_travel_plan_id_fkey" FOREIGN KEY ("travel_plan_id") REFERENCES "travel_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_plan_destination_attachments" ADD CONSTRAINT "travel_plan_destination_attachments_travel_plan_destinatio_fkey" FOREIGN KEY ("travel_plan_destination_id") REFERENCES "travel_plan_destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_plan_bookmarks" ADD CONSTRAINT "travel_plan_bookmarks_travel_plan_id_fkey" FOREIGN KEY ("travel_plan_id") REFERENCES "travel_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_plan_bookmarks" ADD CONSTRAINT "travel_plan_bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_plan_likes" ADD CONSTRAINT "travel_plan_likes_travel_plan_id_fkey" FOREIGN KEY ("travel_plan_id") REFERENCES "travel_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_plan_likes" ADD CONSTRAINT "travel_plan_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
