import { useAuth } from "@clerk/remix";
import { Link, Outlet, useFetcher, useLoaderData } from "@remix-run/react";
import { getPost, addLikeToPost } from "~/lib/turso";
import { clsx, type ClassValue } from "clsx";

export const loader = async ({ params }: { params: { id: number } }) => {
  try {
    const { id } = params;
    const post = await getPost(id);
    return post;
  } catch (error) {
    console.error(error);
  }
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const id = Number(formData.get("id"));
  const userId = formData.get("userId");

  await addLikeToPost(userId as string, id);
  return null;
};
export default function Post() {
  const post = useLoaderData<typeof loader>();
  const { isSignedIn, userId } = useAuth();
  const fetcher = useFetcher();

  const checkLike = (userId: string) => {
    const userIds = JSON.parse(post.userIdsLiked);
    const user = userIds.find((user: string) => user === userId);
    if (user) {
      return true;
    }
    return false;
  };

  return (
    <div className="container p-2">
      <h1 className="text-3xl font-bold text-primary">{post.title}</h1>
      <p>{post.content}</p>
      <p>
        <div className="flex justify-between items-center">
          <strong>created At :</strong> {post.createdAt}
          {/* create heart icons  */}
          {isSignedIn && (
            <fetcher.Form method="post">
              <button className="btn 0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 "
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18.5l-1.45-1.32C4.4 13.35 1 10.11 1 6.5 1 3.42 3.42 1 6.5 1c1.74 0 3.41.85 4.5 2.1C11.09 1.85 12.76 1 14.5 1 17.58 1 20 3.42 20 6.5c0 3.61-3.4 6.85-7.55 10.68L10 18.5z"
                    clipRule="evenodd"
                    className={clsx(
                      checkLike(userId) ? "text-red-500" : "text-gray-500"
                    )}
                  />
                </svg>
                <input type="hidden" name="id" value={post.id} />
                <input type="hidden" name="userId" value={userId} />
              </button>
            </fetcher.Form>
          )}
          <Link to={`/posts/${post.id}/comment`} className="btn">
            Add Comment
          </Link>
        </div>
        {/* {isSignedIn && post.userId === userId && (
          <button className="btn">Edit</button>
        )} */}
      </p>
      <Link to={"comments"} className="btn">
        comments
      </Link>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
