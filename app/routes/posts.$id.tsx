import { useAuth } from "@clerk/remix";
import { useLoaderData, useParams } from "@remix-run/react";
import React from "react";
import { getPost } from "~/lib/turso";

export const loader = async ({ params }: { params: { id: number } }) => {
  try {
    const { id } = params;
    const post = await getPost(id);
    return post;
  } catch (error) {
    console.error(error);
  }
};

export default function Post() {
  const post = useLoaderData<typeof loader>();
  const { isSignedIn, userId } = useAuth();
  console.log(post);
  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-primary">{post.title}</h1>
      <p>{post.content}</p>
      <p>
        <strong>created At :</strong> {post.createdAt}
      </p>
    </div>
  );
}
