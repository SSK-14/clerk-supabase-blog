import ClerkLogo from "../../assets/images/clerk.svg";
import SupabaseLogo from "../../assets/images/supabase.svg";
import Image from "next/image";

type Props = {
  children: JSX.Element,
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="container h-screen mx-auto flex flex-col justify-center">
      <div className="flex gap-4 mb-4 justify-center items-center">
        <Image src={ClerkLogo} alt="logo" height={50} />
        <Image src={SupabaseLogo} alt="logo" height={50} />
        <p className="hidden sm:block text-3xl font-mono font-bold">{"INSTAPOST"}</p>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
