import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { supabase } from "../utils/supaBaseClient";
import { Link, useParams } from "react-router-dom";

function ChatItem({ friends, setChat, setFriend, setCheck }) {
  let [userProfiles, setUserProfiles] = useState([]);
  let { id } = useParams();
  const { user } = useAuth();

  const loadFriends = async () => {
    let other_id = "";
    try {
      let { data: friend } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("username", id);
      other_id = friend[0].id;
    } catch (error) {
      console.log(error);
    }
    setFriend({
      first_name: userProfiles?.find((profile) => profile?.id === other_id)
        ?.first_name,
      avatar_url: userProfiles?.find((profile) => profile?.id === other_id)
        ?.avatar_url,
      full_name: userProfiles?.find((profile) => profile?.id === other_id)
        ?.full_name,
      id: other_id,
    });
  };

  const subscribeChatMessages = (other) => {
    console.log("ChatMessages: subscribeChatMessages: id: ", id);
    try {
      const channel = supabase
        .channel("custom-insert-channel")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "chat_messages" },
          (payload) => {
            if (
              payload.new.sender === other &&
              payload.new.receiver === user.id
            ) {
              setChat((prev) => [...prev, payload.new]);
              setCheck((prev) => !prev);
            }
          }
        )
        .subscribe();
      return () => {
        channel.unsubscribe();
      };
    } catch (error) {
      console.error("Error With realtime:", error);
    }
  };

  const showMessages = async (other) => {
    // console.log(other);
    let other_id = "";
    try {
      let { data: friend } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("username", other);
      other_id = friend[0].id;
    } catch (error) {
      console.log(error);
    }
    try {
      let { data: messages } = await supabase
        .from("chat_messages")
        .select("*")
        .in("sender", [user.id, other_id])
        .in(`receiver`, [other_id, user.id])
        .order("created_at", { ascending: true });
      setChat(messages);
      subscribeChatMessages(other_id);
      // setCheck((prev) => !prev);
      // getFriends(user);
      // console.log(messages);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserProfiles = async (other) => {
    try {
      let { data: user } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", other);
      setUserProfiles((prevState) => {
        return [...prevState, ...user];
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    friends.forEach((friend) => {
      if (friend?.sender === user.id) {
        getUserProfiles(friend?.receiver);
      } else {
        getUserProfiles(friend.sender);
      }
    });
    // console.log(userProfiles);

    id && showMessages(id);
    id && loadFriends();
    //  console.log("ChatItem: useEffect: id and friends: ", id);
  }, [friends, id]);
  return (
    <>
      {friends.map((friend, key) => {
        // console.log(friend);
        return (
          <Link
            key={key}
            className="flex flex-row justify-between items-center bg-white p-2 mb-1 hover:bg-over-yonder cursor-pointer"
            to={`/chat/${
              userProfiles?.find(
                (profile) =>
                  profile?.id === friend?.sender ||
                  profile?.id === friend?.receiver
              )?.username
            }`}
            onClick={() => {
              id && loadFriends();
            }}
          >
            {/* <span>{`${friend?.first_name}`}</span> */}
            <div className="flex flex-col justify-center w-full items-start">
              <div className="flex flex-row items-center justify-center ">
                <img
                  src={
                    userProfiles?.find(
                      (profile) =>
                        profile?.id === friend?.sender ||
                        profile?.id === friend?.receiver
                    )?.avatar_url
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <h1 className="text-xl align-middle  w-fit h-fit font-bold ml-2">
                  {userProfiles?.find(
                    (profile) =>
                      profile?.id === friend?.sender ||
                      profile?.id === friend?.receiver
                  )?.first_name ||
                    userProfiles?.find(
                      (profile) =>
                        profile?.id === friend?.sender ||
                        profile?.id === friend?.receiver
                    )?.username}
                </h1>
              </div>
              <div className="flex flex-col">
                <p className="text-xs ml-12 -mt-2 text-gray-500">{`${friend?.body.slice(
                  0,
                  10
                )}${friend?.body.length > 10 ? "..." : ""}`}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default ChatItem;
