import { useState, useEffect } from "react";
import { useSession } from "@clerk/nextjs";
import NoPostImage from "../../assets/images/stars.svg";
import supabaseClient from "../../lib/supabaseClient";
import Loader from "../Loader";
import Image from "next/image";

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
    return (
      <div className=''>
        <Loader />
      </div>
    );
  }

  return (
    <>
      {posts?.length > 0 ? (
        <ol className='h-[80%] overflow-y-auto px-4'>
          {posts.map((post: any) => (
            <li
              className='min-w-[300px] p-4 my-4 rounded-lg border-2 border-zinc-700 bg-zinc-800'
              key={post.id}
            >
              <div className='flex justify-between items-center'>
                <p className='text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-indigo-300 from-indigo-400'>
                  {post.title}
                </p>
                <div className='flex items-center p-1 rounded-full border-2 border-slate-600'>
                  <Image
                    className='rounded-full'
                    src={post.avatar_url}
                    alt={post.username}
                    width={30}
                    height={30}
                  />
                  <p className='mx-1'>{post.username}</p>
                </div>
              </div>
              <p className='my-4'>{post.content}</p>
              <p className='text-xs mt-2 text-zinc-400'>
                {post.inserted_at}
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <div className='flex flex-col items-center'>
          <Image src={NoPostImage} className='p-4 ' alt='no post' />
          <p className='text-4xl mt-10 font-semibold text-zinc-500'>
            You don&apos;t have any posts!
          </p>
        </div>
      )}
    </>
  );
};

export default PostList;
