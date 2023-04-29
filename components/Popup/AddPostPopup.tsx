import { useState } from "react";
import Popup from ".";
import supabaseClient from "../../lib/supabaseClient";
import { useAuth } from "@clerk/nextjs";
import Loader from "../Loader";

function AddPostPopup(props: any) {
  const { closePopup, addNewPost } = props;
  const { getToken, userId } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

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
      .insert({ title: title, user_id: userId, content: content })
      .select()

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
      <form className='w-[32rem]' onSubmit={handleSave}>
        <div className='flex items-stretch w-full bg-zinc-700 rounded-lg mb-4'>
          <label
            className='w-28 flex p-4 border border-zinc-800 rounded-l-lg'
            htmlFor='title'
          >
            <p className='ml-2 font-semibold'>Title</p>
          </label>
          <input
            id="title"
            type='text'
            value={title}
            required
            className='w-full px-4 py-4 border border-zinc-800 rounded-r-lg bg-zinc-700'
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter the title...'
          />
        </div>
        <div className='flex items-stretch w-full bg-zinc-700 rounded-lg mb-4'>
          <label
            className='w-28 flex p-4 border border-zinc-800 rounded-l-lg'
            htmlFor='content'
          >
            <p className='ml-2 font-semibold'>Content</p>
          </label>
          <input
            id="content"
            type='text'
            value={content}
            required
            className='w-full px-4 py-4 border border-zinc-800 rounded-r-lg bg-zinc-700'
            onChange={(e) => setContent(e.target.value)}
            placeholder='Enter the content...'
          />
        </div>
        <div className='flex mt-8 text-lg font-semibold'>
          <button
            className='w-full mx-2 px-4 h-12 bg-red-500 text-slate-100 rounded-lg hover:bg-red-600'
            disabled={loading}
            onClick={handleReset}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className='w-full mx-2 px-4 h-12 bg-blue-500 text-slate-100 rounded-lg hover:bg-blue-600'
          >
            {loading ? <Loader small /> : "Submit"}
          </button>
        </div>
      </form>
    </Popup>
  );
}

export default AddPostPopup;
