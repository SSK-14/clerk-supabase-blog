import { SignedIn, UserButton } from "@clerk/nextjs";

const Header = () => {

  return (
    <header className="z-50 backdrop-blur-lg bg-[#1c1c1c] w-full fixed top-0">
      <div className="container mx-auto  h-20 flex justify-between items-center">
        <div className="font-bold text-3xl">
          <h3 className=" text-zinc-100">Clerk | Supabase</h3>
        </div>
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
