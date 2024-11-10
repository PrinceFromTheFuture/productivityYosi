ALTER TABLE "halfHourSesstionsTable" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "halfHourSesstionsTable" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "halfHourSesstionsTable" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "usersTable" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "usersTable" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "usersTable" ALTER COLUMN "id" SET NOT NULL;