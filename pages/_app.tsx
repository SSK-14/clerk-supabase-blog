import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/router";
import SignUpPage from "./sign-up/[[...index]]";
import SignInPage from "./sign-in/[[...index]]";

const theme = {
  general: {
    fontFamily: '"PT Sans"',
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ClerkProvider theme={theme} {...pageProps}>
      <main>
        <SignedIn>
          <Component {...pageProps} />
        </SignedIn>
        <SignedOut>
          {router.pathname.match("/sign-up") ? <SignUpPage /> : <SignInPage />}
        </SignedOut>
      </main>
    </ClerkProvider>
  );
}
export default MyApp;