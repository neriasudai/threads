import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
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

export const getUsers = async () => {
  const results = await db.select().from(users).all();
  return results;
};
export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const result = await db
    .insert(users)
    .values({ name, email, password })
    .execute();
  return result;
};

export const createUserTable = async () => {
  //  create user table if it doesn't exist using turso
  await turso.execute(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  avatar TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
  )`);
};
