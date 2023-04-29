import { SignIn } from "@clerk/nextjs";
import AuthLayout from "../../components/Layout/AuthLayout";

const SignInPage = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-4xl mb-6 font-bold text-zinc-100">Sign In | Clerk</h2>
        <SignIn signUpUrl="/sign-up" />
      </div>
    </AuthLayout>
  );
};

export default SignInPage;