import { Link, Outlet, redirect } from "@remix-run/react";

export default function Posts() {
  return (
    <main className="container flex h-full min-h-[400px] px-0 pb-12 md:px-8">
      <div className="grid w-full grid-cols-4 bg-muted pl-2 md:container md:rounded-3xl md:pr-0 gap-4 mt-2">
        <div className="relative col-span-1  md:rounded-l-3xl md:flex md:flex-col bg-base-200 p-2 rounded-2xl">
          <h1 className="text-3xl font-bold text-pretty">Posts</h1>
          <Link
            to="/posts/new"
            className="btn absolute top-2 right-2 bg-accent text-white p-2 "
          >
            New Post
          </Link>
        </div>

        <div className="relative col-span-3 bg-base-100 md:rounded-r-3xl p-2">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
