ALTER TABLE "book_metadata" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "book_metadata" DROP COLUMN "field_name";--> statement-breakpoint
ALTER TABLE "book_metadata" DROP COLUMN "content";--> statement-breakpoint
ALTER TABLE "book_metadata" ADD PRIMARY KEY ("book_id");--> statement-breakpoint
ALTER TABLE "book_metadata" ADD COLUMN "book_metadata" json NOT NULL;--> statement-breakpoint
ALTER TABLE "book_metadata" ADD CONSTRAINT "book_metadata_book_id_unique" UNIQUE("book_id");