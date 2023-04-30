import { useState } from "react";
import Popup from ".";
import supabaseClient from "../../lib/supabaseClient";
import { useAuth, useUser } from "@clerk/nextjs";
import Loader from "../Loader";

function AddPostPopup(props: any) {
  const { closePopup, addNewPost } = props;
  const { getToken, userId } = useAuth();
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: any) => {
    e.preventDefault();
    if (title === "" || content === "") {
      return;
    }
    setLoading(true);
    const supabaseAccessToken = await getToken({
      template: "supabase-clerk",
    });
    const supabase = await supabaseClient(supabaseAccessToken);
    const { data } = await supabase
      .from("posts")
      .insert({
        title: title,
        user_id: userId,
        content: content,
        avatar_url: user?.profileImageUrl,
        username: user?.username,
        likes: [],
      })
      .select();

    console.log({ data });

    addNewPost(data && data[0]);
    setLoading(false);
    closePopup();
  };

  const handleReset = () => {
    closePopup();
  };

  return (
    <Popup title='Add Post' onClose={closePopup}>
      <form className='w-full sm:w-[28rem]' onSubmit={handleSave}>
        <div className='mb-4'>
          <input
            id='title'
            type='text'
            value={title}
            required
            className='w-full px-4 py-2 border border-zinc-800 rounded-lg bg-zinc-700'
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter the title...'
          />
        </div>
        <div className='mb-4'>
          <textarea
            id='content'
            value={content}
            required
            className='w-full px-4 py-4 border border-zinc-800 rounded-lg bg-zinc-700'
            onChange={(e) => setContent(e.target.value)}
            placeholder='Your content goes here...'
          />
        </div>
        <div className='flex text-lg font-semibold'>
          <button
            className='w-full mx-2 px-2 sm:px-4 h-8 sm:h-12 bg-red-500 text-slate-100 rounded-lg hover:bg-red-600'
            disabled={loading}
            onClick={handleReset}
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={loading}
            className='w-full mx-2 px-4 h-8 sm:h-12 bg-indigo-500 text-slate-100 rounded-lg hover:bg-indigo-600'
          >
            {loading ? <Loader small /> : "Submit"}
          </button>
        </div>
      </form>
    </Popup>
  );
}

export default AddPostPopup;
