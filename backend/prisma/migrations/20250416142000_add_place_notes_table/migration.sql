-- CreateTable
CREATE TABLE "place_notes" (
    "id" SERIAL NOT NULL,
    "travel_plan_id" INTEGER NOT NULL,
    "place_id" VARCHAR(255) NOT NULL,
    "notes" TEXT NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "place_notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "place_notes" ADD CONSTRAINT "place_notes_travel_plan_id_fkey" FOREIGN KEY ("travel_plan_id") REFERENCES "travel_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
