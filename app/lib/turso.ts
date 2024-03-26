import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { eq, sql } from "drizzle-orm";
import * as schema from "./schema";
export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso, {
  schema: { schema },
});

export const insertPost = async (
  title: string,
  content: string,
  userId: string
) => {
  const results = await db
    .insert(schema.posts)
    .values({ title, content, userId })
    .execute();

  return results;
};

export const getPosts = async () => {
  const results = await db.select().from(schema.posts).all();
  return results;
};

export const getPost = async (id: number) => {
  const results = await db
    .selectDistinct()
    .from(schema.posts)
    .where(eq(schema.posts.id, id));

  return results[0];
};

export const addLikeToPost = async (userId: string, id: number) => {
  // check if userId is in the  userIdsLiked  array
  const post = await getPost(id);
  const userIdsLiked = JSON.parse(post.userIdsLiked);
  const user = userIdsLiked.find((user: string) => user === userId);
  if (user) {
    console.log("remove user like", user);
    removeLikeFromPost(userId, id);
  } else {
    console.log("user not liked", user);
    userIdsLiked.push(userId);
    await db
      .update(schema.posts)
      .set({ userIdsLiked: JSON.stringify(userIdsLiked) })
      .where(eq(schema.posts.id, id));
  }
  console.log({
    userIdsLiked,
    post,
    user,
  });
};

export const removeLikeFromPost = async (userId: string, id: number) => {
  // check if userId is in the  userIdsLiked  array
  const post = await getPost(id);
  const userIdsLiked = JSON.parse(post.userIdsLiked);
  const user = userIdsLiked.find((user: string) => user === userId);
  if (user) {
    console.log("user already liked", user);
    const index = userIdsLiked.indexOf(user);
    userIdsLiked.splice(index, 1);
    await db
      .update(schema.posts)
      .set({ userIdsLiked: JSON.stringify(userIdsLiked) })
      .where(eq(schema.posts.id, id));
  } else {
    console.log("user not liked", user);
  }
  console.log({
    userIdsLiked,
    post,
    user,
  });
};

export const addCommentToPost = async (
  title: string,
  content: string,

  userId: string,
  postId: string
) => {
  const results = await db
    .insert(schema.comments)
    .values({ title, content, userId, postId })
    .execute();

  return results;
};

export const getPostComments = async (postId: string) => {
  const results = await db
    .select()
    .from(schema.comments)
    .where(eq(schema.comments.postId, postId))
    .all();

  return results;
};
