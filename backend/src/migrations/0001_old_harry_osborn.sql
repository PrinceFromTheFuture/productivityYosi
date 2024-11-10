CREATE TABLE IF NOT EXISTS "halfHourSesstionsTable" (
	"userId" uuid,
	"date" timestamp with time zone NOT NULL,
	"id" uuid
);
--> statement-breakpoint
ALTER TABLE "usersTable" RENAME COLUMN "userId" TO "id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "halfHourSesstionsTable" ADD CONSTRAINT "halfHourSesstionsTable_userId_usersTable_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."usersTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
