import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";
export const usersTable = pgTable("usersTable", {
    name: text("name").notNull(),
    id: uuid("id").notNull().primaryKey().defaultRandom(),
});
export const halfHourSesstionsTable = pgTable("halfHourSesstionsTable", {
    userId: uuid("userId").references(() => usersTable.id),
    date: timestamp("date", {
        withTimezone: true,
    }).notNull(),
    id: uuid("id").notNull().primaryKey().defaultRandom(),
});
