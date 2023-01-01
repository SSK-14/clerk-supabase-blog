import { SignUp } from "@clerk/nextjs";
import AuthLayout from "../../components/Layout/AuthLayout";

const SignUpPage = () => {
  return (
    <AuthLayout>
      <SignUp signInUrl="/sign-in" />
    </AuthLayout>
  );
};

export default SignUpPage;