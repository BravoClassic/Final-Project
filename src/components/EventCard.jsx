// EventCard.jsx
import React, { useEffect, useState } from "react";
import { CalendarIcon, MapPinIcon, ShareIcon } from "@heroicons/react/24/solid";
import Comments from "./Comments"; // Adjust the import path as needed

const EventCard = ({
  event_post,
  user,
  attendEvent,
  key,
  calendarContainer,
  calendarElement,
}) => {
    const [event_id, setEventId] = useState("");
    useEffect(() => {
        setEventId(event_post.id);
        console.log(event_id);
      }
    , [event_id, event_post.id]);
  return (
    <div
      className=" w-full md:w-1/2  lg:w-3/4 flex flex-col lg:flex-row h-auto lg:h-[500px] mt-14 mb-10 shadow-md"
      key={event_post.id}
    >
      <div
        className={`w-initial h-initial  lg:opacity-100  lg:w-[400px] lg:h-[500px] bg-cover bg-center`}
        style={{ backgroundImage: `url(${event_post.image})` }}
      >
        <img
          src={`${event_post.image}`}
          alt="Post Imagess"
          className="w-initial lg:hidden h-100"
        />
      </div>
      <div className="w-full lg:w-[calc(100%-400px)] justify-between flex flex-col h-auto">
        <div className="w-[100%] flex flex-row-reverse flex-wrap items-center py-2 lg:py-0 px-2 ">
          <img
            className="h-[40px] w-[40px] rounded-[50%] avatar border cursor-pointer border-over-yonder"
            src={event_post.user_profiles.avatar_url}
            alt="avatar"
            title={
              event_post.user_profiles.full_name ||
              `${event_post.user_profiles.first_name} ${event_post.user_profiles.last_name}`
            }
          />
          <p className="mx-2">
            {event_post.user_profiles.full_name ||
              `${event_post.user_profiles.first_name} ${event_post.user_profiles.last_name}`}
          </p>
        </div>
        <div className="px-2 flex flex-col lg:overflow-y-scroll">
          <h1 className="mt-2 mb-4 text-2xl font-bold text-right">
            {event_post.title}
          </h1>
          <p className=" text-sm text-right ">{event_post?.description}</p>
          {/* <p className=" text-2xl text-right">
                      {event_post?.schools?.college_name}
                    </p> */}
          {/* <p className=" text-sm text-right">
                      Starts - {readableDate(event_post.start_date)}
                    </p>
                    <p className=" text-sm text-right">
                      Ends - {readableDate(event_post.end_date)}
                    </p> */}
          <div>
            <div className="py-2 flex flex-row justify-end">
              <button
                className={`p-2 mx-1 w-fit h-fit border rounded-lg flex flex-wrap justify-center items-center ${
                  event_post.user_event.filter(
                    (event) =>
                      event.user_id === user.id &&
                      event.event_id === event_post.id
                  ).length
                    ? "bg-over-yonder-default text-white"
                    : ""
                }`}
                ref={(el) => (calendarContainer.current[key] = el)}
              >
                <CalendarIcon
                  onClick={() => attendEvent(key, event_post.id)}
                  ref={(el) => (calendarElement.current[key] = el)}
                  className={`h-6 w-6 ${
                    event_post.user_event.filter(
                      (event) =>
                        event.user_id === user.id &&
                        event.event_id === event_post.id
                    ).length
                      ? "text-white"
                      : "text-over-yonder-default"
                  } `}
                />
              </button>
              <button
                className={`p-2 w-fit mx-1 h-fit border rounded-lg flex flex-wrap justify-center items-center 
                            `}
              >
                <MapPinIcon
                  className={`h-6 w-6  text-over-yonder-default
                             `}
                />
              </button>
              <button
                className={`p-2 w-fit mx-1 h-fit border rounded-lg flex flex-wrap justify-center items-center 
                            `}
              >
                <ShareIcon
                  className={`h-6 w-6  text-over-yonder-default
                             `}
                />
              </button>
              {``}
              {/* {`${user_event.filter(user => user.event_id === event_post.id).length}`} */}
              {/* {user_event.find(user => user.user_id === user.id)  ? ("A") : ("B")} */}
            </div>
          </div>
        </div>
        {
           event_post.id


        }
        <Comments event_id={event_post.id} />
      </div>
    </div>
  );
};

export default EventCard;
