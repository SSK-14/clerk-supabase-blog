// imports to add:
import { useState, useEffect } from "react";
import { useSession } from "@clerk/nextjs";
import supabaseClient from "../../lib/supabaseClient";

const PostList = ({ posts, setPosts }: any) => {
  const { session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const supabaseAccessToken = await session?.getToken({
          template: "supabase-clerk",
        });
        const supabase = await supabaseClient(supabaseAccessToken);
        const { data: posts } = await supabase.from("posts").select("*");
        setPosts(posts);
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  if (loading) {
    return <div className="">Loading...</div>;
  }

  // display all the todos
  return (
    <>
      {posts?.length > 0 ? (
        <div className="">
          <ol>
            {posts.map((post: any) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="">You don&apos;t have any posts!</div>
      )}
    </>
  );
};

export default PostList;