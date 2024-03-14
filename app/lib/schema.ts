import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: text("userId").notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  likes: integer("likes").default(0).notNull(),
});

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey(),
  content: text("content").notNull(),
  userId: text("userId").notNull(),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const likes = sqliteTable("likes", {
  userId: text("userId").notNull(),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type InsertPost = typeof posts.$inferInsert;
export type SelectPost = typeof posts.$inferSelect;

export type InsertLike = typeof likes.$inferInsert;
export type SelectLike = typeof likes.$inferSelect;

export type InsertComment = typeof comments.$inferInsert;
export type SelectComment = typeof comments.$inferSelect;
