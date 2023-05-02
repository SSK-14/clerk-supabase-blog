import { useState } from "react";
import Popup from ".";
import supabaseClient from "../../lib/supabaseClient";
import { useAuth } from "@clerk/nextjs";
import Loader from "../Loader";

function EditPostPopup(props: any) {
  const { closePopup, updatePosts, post } = props;
  const { getToken } = useAuth();

  const [title, setTitle] = useState(post.title || "");
  const [content, setContent] = useState(post.content || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: any) => {
    e.preventDefault();
    if (title === "" || content === "") {
      return;
    }
    setLoading(true);
    const supabase = await supabaseClient(getToken);
    const { data } = await supabase
      .from("posts")
      .update({ title: title, content: content })
      .eq('id', post.id);

    updatePosts({ ...post, title: title, content: content });
    setLoading(false);
    closePopup();
  };

  const handleReset = () => {
    closePopup();
  };

  return (
    <Popup title='Edit Post' onClose={closePopup}>
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

export default EditPostPopup;
