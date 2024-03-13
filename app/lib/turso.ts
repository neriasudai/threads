import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso);

const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  avatar: text("avatar"),
  name: text("name").notNull(),
  email: text("email").notNull(),
});
export const getUsers = async () => {
  const results = await db.select().from(users).all();
  return results;
};
