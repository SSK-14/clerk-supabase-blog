import { useState } from "react";
import PostList from "./PostList";


export function Home() {
  const [posts, setPosts] = useState([]);

  return (
    <div>
      <h1>Home</h1>
      <PostList posts={posts} setPosts={setPosts} />
    </div>
  );
}