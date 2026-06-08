-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "Lobby" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name ""_Lobby_id_seq"" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1),
	"name" varchar(20) NOT NULL,
	"url" text NOT NULL,
	"password" varchar(255) NOT NULL,
	"mode" varchar(50) NOT NULL,
	"players" integer NOT NULL,
	"players_max" integer NOT NULL
);

*/