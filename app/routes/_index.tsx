import { redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/remix";

import { getAuth } from "@clerk/remix/ssr.server";
import { db, getUsers, type users, createUserTable, turso } from "~/lib/turso";

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/sign-in");
  }
  return {};
};
export default function Index() {
  return (
    <div>
      <SignedIn>
        <div className="flex flex-col ">
          <div className="w-screen max-h-[10vh] bg-blue-300 flex justify-end ">
            {" "}
            <UserButton />
          </div>
        </div>
        <div className="flex  justify-center items-center flex-col">
          <h1>Index route</h1>
          <p>You are signed in!</p>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
