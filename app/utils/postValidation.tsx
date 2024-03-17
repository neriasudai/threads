import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(1).max(1000),
  userId: z.string().min(1).max(100),
  id: z.number(),
});

type Post = z.infer<typeof postSchema>;

export { postSchema, type Post };
