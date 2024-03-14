import React from "react";
import { Input } from "~/components/Input";

export default function NewPosts() {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-primary">New Post</h1>

      <form
        action="/posts"
        method="post"
        className="w-3/5 border-2 rounded-md flex flex-col gap-4 p-4 bg-card"
      >
        <Input type="text" name="title" placeholder="Title" />
        <Input type="text" name="body" placeholder="Body" />
        <button type="submit" className="btn btn-info">
          Submit
        </button>
      </form>
    </div>
  );
}
