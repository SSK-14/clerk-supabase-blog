import { useState } from "react";
import PostList from "./PostList";
import AddPostPopup from "../Popup/AddPostPopup";

type PostType = {
  id: number;
  title: string;
  content: string;
  user_id: string;
  inserted_at: string;
}

export function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [addPostPopup, setAddPostPopup] = useState(false);

  console.log(posts);
  

  return (
    <div className="h-full">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-3xl font-bold">Welcome To Clerk!</h2>
        <button
          className='py-2 px-8 my-8 rounded-full bg-blue-600 text-xl font-semibold hover:bg-blue-700 hover:scale-105'
          onClick={() => setAddPostPopup(true)}
        >
          Add Post
        </button>
      </div>
      <PostList posts={posts} setPosts={setPosts} />
      {addPostPopup && (
        <AddPostPopup closePopup={() => setAddPostPopup(false)} addNewPost={(post: any) => setPosts([...posts, post])} />
      )}
    </div>
  );
}
