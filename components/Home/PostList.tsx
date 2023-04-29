import { useState, useEffect } from "react";
import { useSession } from "@clerk/nextjs";
import supabaseClient from "../../lib/supabaseClient";
import Loader from "../Loader";

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
    return <div className=""><Loader /></div>;
  }

  return (
    <>
      {posts?.length > 0 ? (
        <ol className="h-[80%] overflow-y-auto px-4">
          {posts.map((post: any) => (
            <li className="min-w-[300px] p-4 my-4 rounded-lg border-2 border-zinc-700 bg-zinc-800" key={post.id}>
              <p className="text-xl mb-2 font-extrabold text-blue-300">{post.title}</p>
              <p>{post.content}</p>
              <p className="text-xs mt-2 text-zinc-400">{post.inserted_at}</p>
            </li>
          ))}
        </ol>
      ) : (
        <div className="">You don&apos;t have any posts!</div>
      )}
    </>
  );
};

export default PostList;