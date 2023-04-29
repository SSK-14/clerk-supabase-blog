import { SignUp } from "@clerk/nextjs";
import AuthLayout from "../../components/Layout/AuthLayout";

const SignUpPage = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-4xl mb-6 font-bold text-zinc-100">Sign up | Clerk</h2>
        <SignUp signInUrl="/sign-in" />
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;