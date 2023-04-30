import { useState } from "react";
import PostList from "./PostList";
import AddPostPopup from "../Popup/AddPostPopup";
import { useUser } from "@clerk/nextjs";
import Loader from "../Loader";

type PostType = {
  id: number;
  username: string;
  avatar_url: string;
  title: string;
  content: string;
  user_id: string;
  inserted_at: string;
};

export function Home() {
  const { user, isLoaded } = useUser();

  const [posts, setPosts] = useState<PostType[]>([]);
  const [addPostPopup, setAddPostPopup] = useState(false);

  console.log(user?.username);
  console.log(user?.profileImageUrl);

  if (!isLoaded && !user) {
    return (
      <div className='h-full'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='h-full'>
      <div className='w-full flex justify-between items-center'>
        <h1 className='flex items-center text-4xl font-extrabold leading-none tracking-tight'>
          Welcome{" "}
          <mark className='px-2 py-1 text-2xl mx-2 text-white bg-gradient-to-r to-indigo-700 from-indigo-500 rounded-lg'>
            @{user?.username}
          </mark>{" "}
          👋 
        </h1>
        <button
          className='py-2 px-8 my-8 rounded-full bg-indigo-600 text-xl font-semibold hover:bg-indigo-700 hover:scale-105'
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
