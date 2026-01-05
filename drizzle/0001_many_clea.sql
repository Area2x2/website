ALTER TABLE "deposit" ALTER COLUMN "amount" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "name" text NOT NULL;