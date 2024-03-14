import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { posts } from "./schema";
export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso);

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  avatar: text("avatar"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
});

export type User = {
  id: number;
  avatar: string;
  name: string;
  email: string;
  password: string;
};

// export const getUsers = async () => {
//   const results = await db.select().from(users).all();
//   return results;
// }

export const insertPost = async (
  title: string,
  content: string,
  userId: string
) => {
  const results = await db
    .insert(posts)
    .values({ title, content, userId })
    .execute();
  return results;
};
