import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { Analytics } from '@vercel/analytics/react';
import { useRouter } from "next/router";
import { dark } from '@clerk/themes';
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
    <ClerkProvider appearance={{
      baseTheme: dark
    }} theme={theme} {...pageProps}>
      <main>
        <SignedIn>
          <Component {...pageProps} />
        </SignedIn>
        <SignedOut>
          {router.pathname.match("/sign-up") ? <SignUpPage /> : <SignInPage />}
        </SignedOut>
      </main>
      <Analytics />
    </ClerkProvider>
  );
}
export default MyApp;