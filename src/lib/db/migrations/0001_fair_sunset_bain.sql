ALTER TABLE "icons" ADD COLUMN "userId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "icons" ADD CONSTRAINT "icons_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
