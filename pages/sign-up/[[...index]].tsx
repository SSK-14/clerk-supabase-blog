import { SignUp } from "@clerk/nextjs";
import AuthLayout from "../../components/Layout/AuthLayout";

const SignUpPage = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center min-h-min justify-center">
        <SignUp signInUrl="/sign-in" />
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;