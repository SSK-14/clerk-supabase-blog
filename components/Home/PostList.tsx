import { useState, useEffect } from "react";
import { useSession } from "@clerk/nextjs";
import NoPostImage from "../../assets/images/stars.svg";
import DeleteIcon from "../../assets/images/delete.svg";
import EditIcon from "../../assets/images/edit.svg";
import supabaseClient from "../../lib/supabaseClient";
import Loader from "../Loader";
import Image from "next/image";
import DeletePostPopup from "../Popup/DeletePostPopup";
import EditPostPopup from "../Popup/EditPostPopup";
import { PostType } from "../../types/post";

const PostList = ({ posts, setPosts }: any) => {
  const { session } = useSession();
  const [loading, setLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostType>();

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
      <div className='h-[70vh] flex justify-center items-center'>
        <Loader />
      </div>
    );
  }

  return (
    <>
      {posts?.length > 0 ? (
        <ol className='h-[70vh] overflow-y-auto px-4'>
          {posts.map((post: any) => (
            <li
              className='min-w-[300px] p-4 my-4 rounded-lg border-2 border-zinc-700 bg-zinc-800'
              key={post.id}
            >
              <div className='flex flex-wrap justify-between items-center'>
                <p className='text-3xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-indigo-300 from-indigo-400'>
                  {post.title}
                </p>
                <div className='flex items-center p-1 my-2 rounded-full border-2 border-slate-600'>
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
              <div className='flex items-center justify-between'>
                <p className='text-xs mt-2 text-zinc-400'>
                  {post.inserted_at}
                </p>
                <div className='flex gap-4'>
                  <button
                    onClick={() => {
                      setShowEditPopup(true);
                      setSelectedPost(post);
                    }}
                    className='p-2 rounded-full bg-amber-500 hover:scale-110 hover:bg-opacity-80'
                  >
                    <Image
                      src={EditIcon}
                      alt='edit'
                      width={20}
                      height={20}
                    />
                  </button>
                  <button
                    onClick={() => {
                      setShowDeletePopup(true);
                      setSelectedPost(post);
                    }}
                    className='p-2 rounded-full bg-red-500 hover:scale-110 hover:bg-opacity-80'
                  >
                    <Image
                      src={DeleteIcon}
                      alt='delete'
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>
              {showDeletePopup && (
                <DeletePostPopup
                  closePopup={() => setShowDeletePopup(false)}
                  postId={selectedPost?.id}
                  deletePosts={(id: any) =>
                    setPosts(posts.filter((post: any) => post.id !== id))
                  }
                />
              )}
              {showEditPopup && (
                <EditPostPopup
                  closePopup={() => setShowEditPopup(false)}
                  updatePosts={(updatedPost: any) =>
                    setPosts(
                      posts.map((post: any) =>
                        post.id === updatedPost.id ? updatedPost : post
                      )
                    )
                  }
                  post={selectedPost}
                />
              )}
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
