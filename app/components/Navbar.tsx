import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/remix";

export const Navbar = () => {
  return (
    <div className="w-screen max-h-[10vh] p-2 flex items-center bg-blue-300">
      Navbar
      <SignedIn>
        <div className="w-screen  bg-blue-300 flex justify-end ">
          {" "}
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl={"/sign-in"} />
      </SignedOut>
    </div>
  );
};
