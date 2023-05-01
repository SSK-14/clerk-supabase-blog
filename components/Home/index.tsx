import { useEffect, useState } from "react";
import PostList from "./PostList";
import AddPostPopup from "../Popup/AddPostPopup";
import AddIcon from "../../assets/images/add.svg";
import supabaseClient from "../../lib/supabaseClient";
import { useSession, useUser } from "@clerk/nextjs";
import Loader from "../Loader";
import { PostType } from "../../types/post";
import Image from "next/image";

export function Home() {
  const { session } = useSession();
  const { user, isLoaded } = useUser();

  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [addPostPopup, setAddPostPopup] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const supabaseAccessToken = await session?.getToken({
          template: "supabase-clerk",
        });
        const supabase = await supabaseClient(supabaseAccessToken);
        const { data: posts }: any = await supabase
          .from("posts")
          .select("*")
          .order("id", { ascending: false });
        setPosts(posts);
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  if (!isLoaded || !user || loading) {
    return (
      <div className='h-screen justify-center flex items-center'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='h-full'>
      <div className='w-full px-4 flex flex-col sm:flex-row justify-center pt-20 sm:justify-between items-center'>
        <h1 className='flex items-center text-4xl my-8 font-extrabold leading-none tracking-tight'>
          Welcome{" "}
          <mark className='px-2 font-mono py-1 text-2xl mx-2 text-zinc-900 bg-gradient-to-r to-emerald-300 from-green-500 rounded-lg'>
            @{user?.username}
          </mark>{" "}
          👋
        </h1>
        <button
          className='p-4 sm:py-2 flex items-center gap-2 absolute bottom-10 sm:static rounded-full bg-indigo-600 text-xl font-semibold hover:bg-indigo-700 hover:scale-105'
          onClick={() => setAddPostPopup(true)}
        >
          <Image src={AddIcon} alt='Add Post' />
          <p className="hidden font-mono sm:block">Add Post</p>
        </button>
      </div>
      <PostList posts={posts} setPosts={setPosts} user={user} />
      {addPostPopup && (
        <AddPostPopup
          closePopup={() => setAddPostPopup(false)}
          addNewPost={(post: any) => setPosts([...posts, post])}
        />
      )}
    </div>
  );
}
