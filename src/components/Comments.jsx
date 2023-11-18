import React, {   useEffect, useState } from 'react'
import { supabase } from '../utils/supaBaseClient';
import { useAuth } from '../utils/AuthContext';

const Comments = (props) => {
    const [comment, setComment] = useState("");
    const [event, setEvent] = useState("");
    const [event_comments, setEventComments] = useState([]);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [error_message, setErrorMessage] = useState("");

let readableDate = (e) => {
  let date = new Date(e);
  return `${date.toDateString()} ${date.toLocaleTimeString()}`;
};
    const { user } = useAuth();
    const handleComment = async (e) => {

        e.preventDefault();
        try {
          let { data } = await supabase

          .from("event_comments")
          .insert([
            {
              event_id: event,
              text: comment,
              created_by: user.id,
            },
          ]).select()
       
        if (data) {
          setComment("");
          getEventComments();
          setSuccess(true);
          setTimeout(() => {
            setSuccess(null);
          }, 3000);
        }} catch (e) {
          console.log(e.message);
          setError(true);
          setErrorMessage(error.message);
          setTimeout(() => {
            setError(null);
          }, 3000);
        }
        
       
      }

   
useEffect(() => {
  setEvent(props.event_id);
}, [props.event_id]);
    
 const getEventComments = async () => {
   if (event) {
     console.log("event_id", event);
     let { data } = await supabase
       .from("event_comments")
       .select("*, user_profiles(username,avatar_url)")
       .eq("event_id", event)
       .order("created_at", { ascending: false });
    //  console.log(data)
     if (data) {
       setEventComments(data);
     }
    //  console.log(event_comments);
     // if (error) {
     //   console.log(error.message);
     // } else if (data) {
     //   setEventComments(data);
     // }
   }
 };
              useEffect(() => {
                if (event) {
                  getEventComments(event);
                }
              }, [event]);

              // useEffect(() => {
              //   console.log(event_comments);
              // }, [event_comments]);

  return (
    <div className="w-full h-auto rounded-lg p-3">
      <h3 className="font-bold">Comments</h3>

      <form onSubmit={handleComment}>
        <div className="flex flex-col overflow-y-scroll h-[150px]">
          {event_comments.length > 0 ? (
            event_comments.map((comment, key) => {
              return (
                <div className="border rounded-md p-3 my-3" key={key}>
                  <div className="flex gap-3 items-center">
                    <img
                      src={comment.user_profiles.avatar_url}
                      alt="avatar"
                      className="object-cover w-8 h-8 rounded-full 
                            border-2 border-emerald-400  shadow-emerald-400
                            "
                    />

                    <h3 className="font-bold text-lg">
                      {comment.user_profiles.username}
                      {"  "}
                      
                    </h3>
                    <span className=" text-xs text-gray-500">
                      {readableDate(comment.created_at)}
                      </span>
                  </div>

                  <p className="text-gray-600 mt-2">{comment.text}</p>
                </div>
              );
            })
          ) : (
            <div className="border rounded-md p-3 my-3">
              <p className="text-gray-600">
                No comments! Be the first to comment.{" "}
              </p>
            </div>
          )}
        </div>

        <div className="w-full flex flex-row mt-4 mb-2">
          <input
            className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full  py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
            name="body"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Type Your Comment"
            required
          />
          <input
            type="submit"
            className="px-2.5 py-1.5 rounded-md text-white text-sm bg-over-yonder-default hover:bg-over-yonder-dark"
            value="Post Comment"
          />
        </div>

        {/* <div className="w-full flex justify-end px-3">
                      </div> */}
      </form>
      <div
        class={`mb-4 ${
          success == null && success !== false ? "hidden" : "block"
        } rounded-lg bg-green-300 px-6 py-5 text-base text-success-700`}
        role="alert"
      >
        <strong class="font-bold">Success!</strong>
        <span class="block sm:inline"> Your comment has been posted.</span>
      </div>
      <div
        class={`mb-4 ${
          !error ? "hidden" : "block"
        } rounded-lg bg-red-300 px-6 py-5 text-base text-success-700`}
        role="alert"
      >
        <strong class="font-bold">Failed!</strong>
        <span class="block sm:inline"> Your comment hasn't been posted.</span>
        <span class="block sm:inline"> {error_message}.</span>
        <span class="block sm:inline">
          {" "}
          Please try again after some time.
          {error}
        </span>
      </div>
    </div>
  );
}

export default  Comments;