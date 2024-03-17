import { Link, Outlet, redirect, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/lib/turso";

export const loader = async () => {
  const posts = await getPosts();

  return posts;
};

export default function Posts() {
  const posts = useLoaderData<typeof loader>();

  return (
    <main className="container flex h-full min-h-[400px] px-0 pb-12 md:px-8">
      <div className="grid w-full grid-cols-4 bg-muted pl-2 md:container md:rounded-3xl md:pr-0 gap-4 mt-2">
        <div className="relative col-span-1  md:rounded-l-3xl  bg-base-200 p-4 rounded-2xl">
          <h1 className="text-3xl font-bold text-pretty">Posts</h1>
          <Link
            to="/posts/new"
            className="btn absolute top-2 right-2 bg-accent text-white p-2 "
          >
            New Post
          </Link>

          <div className=" col-span-3 bg-base-100 md:rounded-3xl p-2 mt-6 ">
            <ul>
              {posts.map((post) => (
                <li key={post.id} className="p-2 text-ellipsis text-[1vw]">
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative col-span-3 bg-base-100 md:rounded-r-3xl p-2">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
