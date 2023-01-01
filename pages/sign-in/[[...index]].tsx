import { SignIn } from "@clerk/nextjs";
import AuthLayout from "../../components/Layout/AuthLayout";

const SignInPage = () => {
  return (
    <AuthLayout>
      <SignIn signUpUrl="/sign-up" />
    </AuthLayout>
  );
};

export default SignInPage;