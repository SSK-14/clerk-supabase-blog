import { SignIn } from "@clerk/nextjs";
import AuthLayout from "../../components/Layout/AuthLayout";

const SignInPage = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center">
        <SignIn signUpUrl="/sign-up" />
      </div>
    </AuthLayout>
  );
};

export default SignInPage;