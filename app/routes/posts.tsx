import { Outlet } from "@remix-run/react";
import React from "react";

export default function Posts() {
  return (
    <main className="container flex h-full min-h-[400px] px-0 pb-12 md:px-8">
      <div className="grid w-full grid-cols-4 bg-muted pl-2 md:container md:rounded-3xl md:pr-0">
        <div className="relative col-span-1">
          <div className="relative col-span-1 bg-accent md:rounded-l-3xl">
            <h1 className="text-3xl font-bold text-primary">Posts</h1>
          </div>
        </div>
        <div className="relative col-span-3 bg-accent md:rounded-r-3xl">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
