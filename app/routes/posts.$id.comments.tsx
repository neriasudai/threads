import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPosts, getPostComments } from "~/lib/turso";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const postId = params.id;

  const comments = await getPostComments(postId as string);
  return { comments };
};

export default function Comments() {
  const { comments } = useLoaderData<typeof loader>();
  console.log("comments", comments);
  return (
    <div className="container p-2 border-red-300 border-2 mt-4">
      <h1 className="text-3xl font-bold text-primary"> Comments</h1>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="border-2 border-gray-300 p-2 mt-2">
            <h2 className="text-[1.5vw] font-bold ">{comment.title}</h2>
            <p className="text-[1vw]">{comment.content}</p>
            <p>{comment.createdAt}</p>
          </div>
        ))
      ) : (
        <p>No comments yet be the first one to comment</p>
      )}
    </div>
  );
}
