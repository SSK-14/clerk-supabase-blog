import { useState } from "react";
import NoPostImage from "../../assets/images/stars.svg";
import DeleteIcon from "../../assets/images/delete.svg";
import EditIcon from "../../assets/images/edit.svg";
import HeartIcon from "../../assets/images/heart.svg";
import HeartFilledIcon from "../../assets/images/heart-filled.svg";
import Image from "next/image";
import DeletePostPopup from "../PostPopup/DeletePostPopup";
import EditPostPopup from "../PostPopup/EditPostPopup";
import { PostType } from "../../types/post";
import supabaseClient from "../../lib/supabaseClient";
import { useAuth } from "@clerk/nextjs";

const PostList = ({ posts, setPosts, user }: any) => {
  const { getToken } = useAuth();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostType>();

  const handlePostLike = async (selectedPost: any) => {
    const supabase = await supabaseClient(getToken);

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

  const formatDate = (dateTimeString: string): string => {
    const currentDate = new Date();
    const date = new Date(dateTimeString);
    const timeDiffInSeconds = (currentDate.getTime() - date.getTime()) / 1000;

    if (timeDiffInSeconds < 60) {
      return `${Math.floor(timeDiffInSeconds)}s ago`;
    } else if (timeDiffInSeconds < 3600) {
      return `${Math.floor(timeDiffInSeconds / 60)}mins ago`;
    } else if (timeDiffInSeconds < 86400) {
      return `${Math.floor(timeDiffInSeconds / 3600)}hrs ago`;
    } else if (timeDiffInSeconds < 172800) {
      return 'yesterday';
    } else {
      const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  };

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
                <p className='text-2xl sm:text-3xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-emerald-300 from-green-500'>
                  {post.title}
                </p>
                <p className='text-sm sm:text-base text-zinc-400'>
                  {formatDate(post.inserted_at)}
                </p>
              </div>
              <p className='my-4 text-sm sm:text-base max-h-[300px] overflow-y-auto'>{post.content}</p>
              <div className='flex items-center justify-between'>
                <button
                  onClick={() => {
                    handlePostLike(post);
                  }}
                  className={`py-0 sm:py-1 px-3 flex gap-2 justify-center items-center min-w-18 rounded-full border-2 ${likeIndex(post) > -1 && "bg-indigo-600"
                    } border-indigo-500 hover:bg-indigo-600 hover:scale-110 hover:bg-opacity-80`}
                >
                  <p className='text-xl font-mono font-semibold text-indigo-100'>
                    {post.likes.length}
                  </p>
                  <Image
                    src={likeIndex(post) > -1 ? HeartFilledIcon : HeartIcon}
                    alt='like'
                    width={20}
                    height={20}
                  />
                </button>
                {post.user_id === user?.id ? (
                  <div className='flex items-center gap-4'>
                    <button
                      onClick={() => {
                        setSelectedPost(post);
                        setShowEditPopup(true);
                      }}
                      className='p-1 sm:p-2 rounded-full border-2 border-amber-400 bg-amber-500 hover:scale-110 hover:bg-opacity-80'
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
                      className='p-1 sm:p-2 rounded-full border-2 border-red-400 bg-red-500 hover:scale-110 hover:bg-opacity-80'
                    >
                      <Image
                        src={DeleteIcon}
                        alt='delete'
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                ) : (
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
