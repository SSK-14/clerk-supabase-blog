import { useState } from "react";
import PostList from "./PostList";
import AddPostPopup from "../Popup/AddPostPopup";
import { useUser } from "@clerk/nextjs";
import Loader from "../Loader";
import { PostType } from "../../types/post";

export function Home() {
  const { user, isLoaded } = useUser();

  const [posts, setPosts] = useState<PostType[]>([]);
  const [addPostPopup, setAddPostPopup] = useState(false);

  if (!isLoaded || !user) {
    return (
      <div className='h-full justify-center flex items-center'>
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
          className='py-2 px-8 absolute bottom-10 sm:static rounded-full bg-indigo-600 text-xl font-semibold hover:bg-indigo-700 hover:scale-105'
          onClick={() => setAddPostPopup(true)}
        >
          Add Post
        </button>
      </div>
      <PostList posts={posts} setPosts={setPosts} />
      {addPostPopup && (
        <AddPostPopup
          closePopup={() => setAddPostPopup(false)}
          addNewPost={(post: any) => setPosts([...posts, post])}
        />
      )}
    </div>
  );
}
