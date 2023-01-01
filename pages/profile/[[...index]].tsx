import { UserProfile } from "@clerk/nextjs";
import type { NextPage } from "next";

const UserProfilePage: NextPage = () => {
  return (
    <UserProfile routing="path" path="/profile" />
  );
};
export default UserProfilePage;