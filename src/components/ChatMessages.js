import React, { useEffect, useRef } from "react";
import ChatBubble from "../components/ChatBubble";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../utils/supaBaseClient";
import { useAuth } from "../utils/AuthContext";

function ChatMessages({ messages, friend, setChat, setCheck }) {
  const { user } = useAuth();
  const messagelist = useRef(null);
  const messageBox = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    messagelist.current.scrollIntoView({
      behavior: "instant",
      block: "end",
      inline: "end",
    });
    console.log("ChatMessages: message list: id: ", id);
  }, [messages]);

  useEffect(() => {
    console.log("ChatMessages: useEffect: id: ", id);
    setTimeout(() => {
    messagelist.current.scrollIntoView({
      behavior: "instant",
      block: "end",
      inline: "end",
    });
    console.log("ChatMessages: useEffect: id: ", id);
  }, 500);
    if (id) messageBox.current.focus() 
    if (id)  messageBox.current.value = "";
    console.log(id)
  }, [id]);

  const handleNewMessage = async (e) => {
    console.log("ChatMessages: handleNewMessage: id: ", id);
   
    e.preventDefault();
    if (!messageBox.current.value) return;
    if (!friend) return;
    if (!id) return;
    const newChat = {
        sender: user.id,
        receiver: friend.id,
        body: messageBox.current.value,
        created_at: new Date().toISOString(),
      }

      await supabase
        .from("chat_messages")
        .insert(newChat);
        id ? messageBox.current.value = "" :  console.log("No id");
        setChat((prev) => [...prev, newChat]);
        setCheck((prev) => !prev);
        
  };
  return (
    <>
      <div className="w-full relative hidden lg:w-2/3 border-l border-gray lg:block h-[calc(100vh-65px)] overflow-y-scroll bg-gray-100">
        <div className="flex flex-row justify-between items-center bg-white p-2 sticky top-0">
          <div className="flex flex-row justify-between w-full items-center px-2">
            <Link to={`/user/${friend?.id}`}>
              <div className="flex flex-row items-center">
                {friend && (
                  <img
                    src={friend?.avatar_url}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <h1 className="text-xl font-bold ml-2">{friend?.full_name}</h1>
                <span className="text-xs ml-2 text-gray-500">
                  {friend && "Online"}
                </span>
              </div>
            </Link>
            <span className="text-xs ml-2 text-gray-500">
              <EllipsisVerticalIcon
                className={`cursor-pointer`}
                onClick={() => alert(friend?.id)}
                width={20}
                height={20}
              />{" "}
            </span>
          </div>
        </div>
        <div className="w-full h-auto items-center">
          <div className="h-auto pb-20" ref={messagelist}>
            {messages &&
              messages.map((message, key) => {
                return (
                  <ChatBubble
                    key={key}
                    sender={message.sender}
                    receiver={message.receiver}
                    created_at={message.created_at}
                  >
                    {message.body}
                  </ChatBubble>
                );
              })}
          </div>

          <div className="h-auto fixed bottom-0 flex flex-row w-[-webkit-fill-available]">
            <form
              className="items-center w-[-webkit-fill-available] flex justify-between bg-white p-2"
              onSubmit={handleNewMessage}
            >
              <input
                type="text"
                ref={messageBox}
                className="form__input w-4/5"
                placeholder="Type a message"
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatMessages;
