import { redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useUser } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    return redirect("/sign-in");
  }
  return null;
};
export default function Index() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return <div>welcome to the index page</div>;
}
