import { SignUp } from "@clerk/remix";

export default function SignUpPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-3">
      <h1>Sign Up route</h1>
      <SignUp />
    </div>
  );
}
