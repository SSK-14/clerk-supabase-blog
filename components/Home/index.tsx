import styles from "./Home.module.css";
import { SignedIn, UserButton } from "@clerk/clerk-react";

export function Home() {
  return (
    <>
      <span className={styles.heading}>Home</span>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}