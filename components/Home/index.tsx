import { useEffect, useState } from "react";
import PostList from "../Post/PostList";
import AddPostPopup from "../PostPopup/AddPostPopup";
import AddIcon from "../../assets/images/add.svg";
import supabaseClient from "../../lib/supabaseClient";
import { useAuth, useUser } from "@clerk/nextjs";
import Loader from "../Loader";
import { PostType } from "../../types/post";
import Image from "next/image";

export function Home() {
  const { getToken } = useAuth();
  const { user } = useUser();

  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [addPostPopup, setAddPostPopup] = useState(false);
  const [toggleAllPosts, setToggleAllPosts] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const supabase = await supabaseClient(getToken);
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

    if (toggleAllPosts) {
      loadPosts();
    } else {
      setPosts(posts.filter((post: any) => post.user_id === user?.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleAllPosts]);

  return (
    <div className='h-full'>
      <div className='w-full px-4 flex flex-col sm:flex-row justify-center pt-20 sm:justify-between items-center'>
        <h1 className='font-mono hidden lg:flex items-center text-4xl my-8 font-extrabold leading-none tracking-tight'>
          Welcome{" "}
          <mark className='px-2 py-1 text-lg sm:text-2xl mx-2 text-zinc-900 bg-gradient-to-r to-emerald-300 from-green-500 rounded-lg'>
            @{user?.username}
          </mark>{" "}
          👋
        </h1>
        <div className='flex gap-2 my-6 font-mono text-sm sm:text-base'>
          <button
            className={`py-2 px-4 ${toggleAllPosts && "ring-2 ring-indigo-500 font-semibold"
              } rounded-full`}
            onClick={() => setToggleAllPosts(true)}
          >
            All Posts
          </button>
          <button
            className={`py-2 px-4 ${!toggleAllPosts && "ring-2 ring-indigo-500 font-semibold"
              } rounded-full`}
            onClick={() => setToggleAllPosts(false)}
          >
            My Posts
          </button>
        </div>
        <button
          className='p-3 sm:py-2 sm:px-4 flex items-center gap-2 absolute bottom-6 sm:static rounded-full bg-indigo-600 text-xl font-semibold hover:bg-indigo-700 hover:scale-105'
          onClick={() => setAddPostPopup(true)}
        >
          <Image src={AddIcon} alt='Add Post' height={30} />
          <p className='hidden font-mono sm:block'>Add Post</p>
        </button>
      </div>
      {loading ? (
        <div className='h-[70vh] justify-center flex items-center'>
          <Loader />
        </div>
      ) : (
        <PostList posts={posts} setPosts={setPosts} user={user} />
      )}
      {addPostPopup && (
        <AddPostPopup
          closePopup={() => setAddPostPopup(false)}
          addNewPost={(post: any) => setPosts([...posts, post])}
        />
      )}
    </div>
  );
}
