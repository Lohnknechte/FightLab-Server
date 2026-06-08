import { pgTable, integer, varchar, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const lobby = pgTable("Lobby", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "_Lobby_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647 }),
	name: varchar({ length: 20 }).notNull(),
	url: text().notNull(),
	password: varchar({ length: 255 }).notNull(),
	mode: varchar({ length: 50 }).notNull(),
	players: integer().notNull(),
	playersMax: integer("players_max").notNull(),
});
