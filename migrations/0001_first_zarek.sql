CREATE TABLE "book_metadata" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" text NOT NULL,
	"field_name" text NOT NULL,
	"content" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
