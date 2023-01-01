import { SignedIn, UserButton } from "@clerk/nextjs";

const Header = () => {

  return (
    <header className="z-50 backdrop-blur-lg w-full fixed top-0">
      <div className="container mx-auto  h-20 flex justify-between items-center">
        <div>
          <h3 className="bold text-2xl">Clerk</h3>
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
