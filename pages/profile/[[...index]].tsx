import { UserProfile } from "@clerk/nextjs";
import type { NextPage } from "next";
import Layout from "../../components/Layout";

const UserProfilePage: NextPage = () => {
  return (
    <Layout>
      <div className="flex justify-center py-8 h-[90vh]">
        <UserProfile routing="path" path="/profile" />
      </div>
    </Layout>
  );
};
export default UserProfilePage;