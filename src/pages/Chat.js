import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supaBaseClient";
import { useAuth } from "../utils/AuthContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import ChatItem from "../components/ChatItem";
import ChatMessages from "../components/ChatMessages";
import { useNavigate, useParams } from "react-router-dom";

function Chat() {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [friend, setFriend] = useState();
  const [check, setCheck] = useState(false); // This is a hack to force a rerender when the user changes
  let {id } = useParams();

  const nagivate = useNavigate();
  const getFriends = async (user) => {
    const { data: friendIds,error } = await supabase
    .from("recent_chat_messages")
    .select("receiver, sender,body")
    .or(`receiver.eq.${user.id}, sender.eq.${user.id}`)
    if(error && id) {
      nagivate("/")
    }else if(!friendIds){
      nagivate("/404")
    }else{
      setFriends(friendIds)
      console.log(friendIds)

    }
  };
  
  useEffect( () => {
    getFriends(user);
    // console.log(id);
    // console.log(friend);
    console.log("Getting friends")
  }, [user,id,check]);
  return (
    <div className=" w-full flex flex-row">
      <div className="w-full lg:w-1/3 overflow-y-scroll bg-gray-100 h-[calc(100vh-65px)] border-r-over-yonder">
        <form className="flex flex-row justify-between items-center bg-white p-2 sticky top-0">
          <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-row items-center">
              <input type="text" className="form__input" placeholder="Search" />
            </div>
            <span className="text-md p-2 text-gray-500">
              
              <MagnifyingGlassIcon className={`cursor-pointer`} onClick={() => alert("Boom!")} width={27} height={27} />{" "}
            </span>
          </div>
        </form>

        <ChatItem friends={friends} setCheck={setCheck} messages={messages} setChat={setMessages} setFriend={setFriend} />
      </div>
     <ChatMessages setCheck={setCheck} messages={messages} setChat={setMessages} friend={friend} />
    </div>
  );
}

export default Chat;
