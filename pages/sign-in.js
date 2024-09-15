import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="flex justify-center items-center min-h-screen bg-background">
    <SignIn />
  </div>
);

export default SignInPage;