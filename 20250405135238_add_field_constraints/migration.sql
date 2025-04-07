-- This is an empty migration.

ALTER TABLE "users" ADD CHECK ("rank" BETWEEN 0 AND 100);
ALTER TABLE "travel_plans" ADD CHECK ("end_date" >= "start_date");
ALTER TABLE "travel_plan_journals" ADD CHECK ("rating" BETWEEN 0 AND 10);
