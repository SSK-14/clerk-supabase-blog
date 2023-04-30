import { SignedIn, UserButton } from "@clerk/nextjs";
import ClerkLogo from "../../assets/images/clerk.svg";
import SupabaseLogo from "../../assets/images/supabase.svg";
import Image from "next/image";

const Header = () => {

  return (
    <header className="z-50 backdrop-blur-lg bg-[#1c1c1c] w-full fixed top-0">
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        <a className="flex text-2xl font-mono font-bold items-center gap-4" href="">
          <Image src={ClerkLogo} alt="logo" height={30} />
          <Image src={SupabaseLogo} alt="logo" height={30} />
          <p className="hidden sm:block">{"INSTAPOST"}</p>
        </a>
        <div>
          <SignedIn>
            <UserButton userProfileMode="navigation" userProfileUrl='/profile'
              appearance={{
                elements: {
                  userButtonAvatarBox: 'h-12 w-12'
                }
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
