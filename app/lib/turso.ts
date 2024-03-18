import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { eq, sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { posts } from "./schema";
export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso);

export const insertPost = async (
  title: string,
  content: string,
  userId: string
) => {
  const results = await db
    .insert(posts)
    .values({ title, content, userId })
    .execute();
  console.log(results, "results");
  return results;
};

export const getPosts = async () => {
  const results = await db.select().from(posts).all();
  return results;
};

export const getPost = async (id: number) => {
  const results = await db.selectDistinct().from(posts).where(eq(posts.id, id));

  return results[0];
};

export const addLike = async (id: number) => {
  const post = await getPost(id);

  const results = await db
    .update(posts)
    .set({ likes: post.likes + 1 })
    .where(eq(posts.id, id))
    .execute();

  return results;
};
