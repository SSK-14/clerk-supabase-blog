import { useState } from "react";
import NoPostImage from "../../assets/images/stars.svg";
import DeleteIcon from "../../assets/images/delete.svg";
import EditIcon from "../../assets/images/edit.svg";
import HeartIcon from "../../assets/images/heart.svg";
import Image from "next/image";
import DeletePostPopup from "../Popup/DeletePostPopup";
import EditPostPopup from "../Popup/EditPostPopup";
import { PostType } from "../../types/post";
import supabaseClient from "../../lib/supabaseClient";
import { useAuth } from "@clerk/nextjs";

const PostList = ({ posts, setPosts, user }: any) => {
  const { getToken } = useAuth();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostType>();

  const handlePostLike = async (selectedPost: any) => {
    const supabaseAccessToken = await getToken({
      template: "supabase-clerk",
    });
    const supabase = await supabaseClient(supabaseAccessToken);
    console.log(selectedPost);

    const index = likeIndex(selectedPost);
    let updatedLikes: any = selectedPost?.likes || [];

    if (index > -1) {
      updatedLikes.splice(index, 1);
    } else {
      updatedLikes.push(user?.id);
    }

    const { data } = await supabase
      .from("posts")
      .update({ likes: updatedLikes })
      .eq("id", selectedPost?.id);

    setPosts((prev: any) =>
      prev.map((post: any) => {
        if (post.id === selectedPost?.id) {
          return { ...post, likes: updatedLikes };
        }
        return post;
      })
    );
  };

  const likeIndex = (post: any) => {
    return post.likes?.indexOf(user?.id);
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
                <p className='text-3xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-emerald-300 from-green-500'>
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
                {post.user_id === user?.id && (
                  <div className='flex items-center gap-4'>
                    <p className='text-xl text-indigo-100'>
                      {post.likes.length}
                    </p>
                    <button
                      onClick={() => {
                        handlePostLike(post);
                      }}
                      className={`p-3 rounded-full border-2 ${likeIndex(post) > -1 && "bg-indigo-600"
                        } border-indigo-500 hover:bg-indigo-600 hover:scale-110 hover:bg-opacity-80`}
                    >
                      <Image
                        src={HeartIcon}
                        alt='like'
                        width={20}
                        height={20}
                      />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPost(post);
                        setShowEditPopup(true);
                      }}
                      className='p-3 rounded-full bg-amber-500 hover:scale-110 hover:bg-opacity-80'
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
                        setSelectedPost(post);
                        setShowDeletePopup(true);
                      }}
                      className='p-3 rounded-full bg-red-500 hover:scale-110 hover:bg-opacity-80'
                    >
                      <Image
                        src={DeleteIcon}
                        alt='delete'
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                )}
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
        <div className='flex flex-col items-center px-4'>
          <Image src={NoPostImage} className='p-4 ' alt='no post' />
          <p className='text-xl sm:text-3xl mt-10 font-semibold text-zinc-500'>
            You don&apos;t have any posts!
          </p>
        </div>
      )}
    </>
  );
};

export default PostList;
