CREATE TABLE "deposit" (
	"guest_id" text PRIMARY KEY NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"payment_method" text,
	"event_id" text PRIMARY KEY NOT NULL,
	"worker_id" text NOT NULL,
	CONSTRAINT "deposit_guest_id_event_id_pk" PRIMARY KEY("guest_id","event_id")
);
--> statement-breakpoint
CREATE TABLE "event" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"location" text,
	"time" time with time zone,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_guest_item" (
	"guest_id" text,
	"event_id" text,
	"code" text NOT NULL,
	CONSTRAINT "event_guest_item_guest_id_event_id_pk" PRIMARY KEY("guest_id","event_id")
);
--> statement-breakpoint
CREATE TABLE "guest" (
	"user_id" text PRIMARY KEY NOT NULL,
	"age" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_purchase" (
	"id" text PRIMARY KEY NOT NULL,
	"state" text,
	"payment_method" text,
	"buyer" text
);
--> statement-breakpoint
CREATE TABLE "service_purchase" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"price" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shop" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shop_item" (
	"shop_id" text PRIMARY KEY NOT NULL,
	"subproduct_id" text NOT NULL,
	"price" numeric
);
--> statement-breakpoint
CREATE TABLE "subproduct" (
	"id" text PRIMARY KEY NOT NULL,
	"parent_id" text NOT NULL,
	"volume" numeric NOT NULL,
	"amount" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"nickname" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "worker" (
	"user_id" text PRIMARY KEY NOT NULL,
	"role" text NOT NULL,
	"wallet" numeric NOT NULL,
	"code" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "deposit" ADD CONSTRAINT "deposit_guest_id_user_id_fk" FOREIGN KEY ("guest_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deposit" ADD CONSTRAINT "deposit_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deposit" ADD CONSTRAINT "deposit_worker_id_user_id_fk" FOREIGN KEY ("worker_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_guest_item" ADD CONSTRAINT "event_guest_item_guest_id_user_id_fk" FOREIGN KEY ("guest_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_guest_item" ADD CONSTRAINT "event_guest_item_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guest" ADD CONSTRAINT "guest_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shop_item" ADD CONSTRAINT "shop_item_shop_id_shop_id_fk" FOREIGN KEY ("shop_id") REFERENCES "public"."shop"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shop_item" ADD CONSTRAINT "shop_item_subproduct_id_subproduct_id_fk" FOREIGN KEY ("subproduct_id") REFERENCES "public"."subproduct"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subproduct" ADD CONSTRAINT "subproduct_parent_id_product_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "worker" ADD CONSTRAINT "worker_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;