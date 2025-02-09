CREATE TABLE "history" (
	"user_id" text NOT NULL,
	"book_id" text NOT NULL,
	"book_name" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "history_book_id_user_id_created_at_pk" PRIMARY KEY("book_id","user_id","created_at")
);
