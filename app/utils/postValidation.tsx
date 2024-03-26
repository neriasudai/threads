import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(1).max(1000),
  userId: z.string().min(1).max(100),
  id: z.number().optional(),
});

type Post = z.infer<typeof postSchema>;

const commentSchema = z.object({
  title: z.string().min(5).max(30),
  content: z.string().min(1).max(1000),
  userId: z.string().min(1).max(100),
  postId: z.string().min(1).max(100),
});

type Comment = z.infer<typeof commentSchema>;

export { postSchema, commentSchema, type Post, type Comment };
