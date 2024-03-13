import { SignIn } from "@clerk/remix";

export default function SignInPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-3">
      <h1>Sign In route</h1>
      <SignIn />
    </div>
  );
}
