CREATE TABLE "admin_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "analytics_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" varchar(255) NOT NULL,
	"event_type" varchar(50) NOT NULL,
	"page" varchar(500),
	"button_name" varchar(255),
	"form_name" varchar(255),
	"details" text,
	"duration" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"excerpt" text NOT NULL,
	"content" text NOT NULL,
	"author" varchar(255) NOT NULL,
	"date" varchar(50) NOT NULL,
	"category" varchar(100) NOT NULL,
	"read_time" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "glossary_terms" (
	"id" serial PRIMARY KEY NOT NULL,
	"term" varchar(255) NOT NULL,
	"definition" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "modules" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"member_count" integer NOT NULL,
	"trades_called" integer NOT NULL,
	"total_profit" real DEFAULT 0 NOT NULL,
	"avg_profit" integer NOT NULL,
	"win_rate" integer NOT NULL,
	"success_rate" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stocks" (
	"id" serial PRIMARY KEY NOT NULL,
	"symbol" varchar(10) NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" real NOT NULL,
	"change" real NOT NULL,
	"change_percent" real NOT NULL,
	"logo" varchar(500),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"testimonial" text NOT NULL,
	"profit" varchar(100) NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"date" varchar(20) DEFAULT '2024-01-01' NOT NULL,
	"photo" varchar(500),
	"profit_image" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_lessons" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"duration" varchar(50) NOT NULL,
	"category" varchar(100) NOT NULL,
	"thumbnail" varchar(500),
	"video_url" varchar(500),
	"youtube_id" varchar(100),
	"locked" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "visitors" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" varchar(255) NOT NULL,
	"ip_address" varchar(100),
	"user_agent" varchar(500),
	"referrer" varchar(500),
	"landing_page" varchar(500) NOT NULL,
	"is_tiktok" boolean DEFAULT false NOT NULL,
	"first_visit" timestamp DEFAULT now() NOT NULL,
	"last_activity" timestamp DEFAULT now() NOT NULL,
	"total_duration" integer DEFAULT 0 NOT NULL,
	"page_views" integer DEFAULT 1 NOT NULL,
	"converted_to_telegram" boolean DEFAULT false NOT NULL,
	CONSTRAINT "visitors_session_id_unique" UNIQUE("session_id")
);
