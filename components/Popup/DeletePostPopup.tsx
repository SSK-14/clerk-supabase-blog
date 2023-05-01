import { useState } from "react";
import Popup from ".";
import supabaseClient from "../../lib/supabaseClient";
import { useAuth } from "@clerk/nextjs";
import Loader from "../Loader";

function DeletePostPopup(props: any) {
  const { closePopup, postId, deletePosts } = props;
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const supabaseAccessToken = await getToken({
      template: "supabase-clerk",
    });
    const supabase = await supabaseClient(supabaseAccessToken);
    await supabase.from("posts").delete().eq("id", postId);

    setLoading(false);
    deletePosts(postId);
    closePopup();
  };

  const handleReset = () => {
    closePopup();
  };

  return (
    <Popup title='Delete Post' onClose={closePopup}>
      <form className='w-full sm:w-[28rem]' onSubmit={handleSave}>
        <div className='mb-4'>
          <p className="text-xl text-center">Are you sure you want to delete this post?</p>
        </div>
        <div className='flex text-lg font-semibold'>
          <button
            className='w-full mx-2 px-2 sm:px-4 h-8 sm:h-12 bg-indigo-500 text-slate-100 rounded-lg hover:bg-indigo-600'
            disabled={loading}
            onClick={handleReset}
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={loading}
            className='w-full mx-2 px-4 h-8 sm:h-12 bg-red-500 text-slate-100 rounded-lg hover:bg-red-600'
          >
            {loading ? <Loader small /> : "Delete"}
          </button>
        </div>
      </form>
    </Popup>
  );
}

export default DeletePostPopup;
