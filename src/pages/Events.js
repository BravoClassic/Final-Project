import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../utils/supaBaseClient";
import { ArrowUpIcon, CalendarIcon, MapPinIcon, ShareIcon } from "@heroicons/react/24/solid";
import Comments from "../components/Comments";
import { Link } from "react-router-dom";
function Events({ user }) {
  // console.log(user);
  const [loading, setLoading] = useState(true);
  const [overyonder, setOveryonder] = useState({});
  const [upvote, setUpvote] = useState(0);
  const [categories, setCategories] = useState({});
  
  const [selectedTab, setSelectedTab] = useState("All Posts");
  const calendarContainer = useRef({});
  const calendarElement = useRef({});

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const deleteEvent = async (event_id) => {
    try {
      await supabase
        .from("user_event")
        .delete()
        .match({ user_id: user.id, event_id: event_id });
    } catch (error) {
      console.log(error.message);
    }
    console.log("Event deleted successfully!");
  };
  const attend = async (id, event_id) => {
    const { data, error } = await supabase
      .from("user_event")
      .insert({ user_id: user.id, event_id: event_id });
    if (error) {
      console.log(error.message);
    }
  };

  const toggleStyleEvent = async (id) => {
    calendarContainer.current[id].classList.toggle("bg-over-yonder-default");
    calendarElement.current[id].classList.toggle("text-white");
    calendarElement.current[id].classList.toggle("text-over-yonder-default");
  };

  const attendEvent = async (id, event_id) => {
    toggleStyleEvent(id);

    if (
      calendarContainer.current[id].classList.contains("bg-over-yonder-default")
    ) {
      await attend(id, event_id);
    } else {
      await deleteEvent(event_id);
    }
  };

  async function getCategories() {
    let { data, error } = await supabase
      .from("interest_categories")
      .select("*");
    if (error) {
      console.log(error.message);
    } else if (data) {
      setCategories(data);
      console.log(data);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    async function getEvents() {
      setLoading(true);

      let { data: event_post, error } = await supabase
        .from("event_post")
        .select(
          "* , user_profiles(id, full_name, first_name, last_name, avatar_url), schools(college_name), interest_categories(title), event_interest_tags(tag_id, event_id), user_event(user_id, event_id), event_comments(created_by, event_id,text)"
        )
        .order("created_at", { ascending: false });
      if (error) {
        console.log(error.message);
      } else if (event_post) {
        if (selectedTab === "All Posts") {
          setOveryonder(event_post);
        } else {
          const filteredEvents = event_post.filter(
            (event) => event.interest_categories.title === selectedTab
          );
          setOveryonder(filteredEvents);
        }
        setLoading(false);
      }
    }
    getEvents();
    // getCategories();
    // console.log(overyonder);
  }, [user, selectedTab]);

  return (
    <div className=" row-span-4 h-full relative">
      <ul className="flex flex-row flex-nowrap content-around justify-around sticky top-[65px] bg-white shadow-md overflow-x-scroll">
        {/* {categories.map((category,key) => (
          <li key={key} className={`p-2 text-center hover:bg-over-yonder-default hover:text-white w-1/4 cursor-pointer ${
            selectedTab === category.title
              ? "bg-over-yonder-default text-white"
              : ""
          }`}
          onClick={() => handleTabChange(category.title)}
          >
            {category.title}
          </li>  
        ))
        } */}
        <li
          className={`p-2 text-center hover:bg-over-yonder-default hover:text-white w-1/4 cursor-pointer ${
            selectedTab === "All Posts"
              ? "bg-over-yonder-default text-white"
              : ""
          }`}
          onClick={() => handleTabChange("All Posts")}
        >
          All Posts 📺
        </li>
        <li
          className={`p-2 text-center hover:bg-over-yonder-default hover:text-white w-1/4 cursor-pointer ${
            selectedTab === "Athletics"
              ? "bg-over-yonder-default text-white"
              : ""
          }`}
          onClick={() => handleTabChange("Athletics")}
        >
          Athletics ⚽️
        </li>
        <li
          className={`p-2 text-center hover:bg-over-yonder-default hover:text-white w-1/4 cursor-pointer ${
            selectedTab === "Campus Events"
              ? "bg-over-yonder-default text-white"
              : ""
          }`}
          onClick={() => handleTabChange("Campus Events")}
        >
          Campus Events
        </li>
        <li
          className={`p-2 text-center hover:bg-over-yonder-default hover:text-white w-1/4 cursor-pointer ${
            selectedTab === "Good Eats"
              ? "bg-over-yonder-default text-white"
              : ""
          }`}
          onClick={() => handleTabChange("Good Eats")}
        >
          Good Eats 🥖
        </li>
        <li
          className={`p-2 text-center hover:bg-over-yonder-default hover:text-white w-1/4 cursor-pointer ${
            selectedTab === "Politics"
              ? "bg-over-yonder-default text-white"
              : ""
          }`}
          onClick={() => handleTabChange("Politics")}
        >
          Politics 🗳
        </li>
        <li
          className={`p-2 text-center hover:bg-over-yonder-default hover:text-white w-1/4 cursor-pointer ${
            selectedTab === "Night Life"
              ? "bg-over-yonder-default text-white"
              : ""
          }`}
          onClick={() => handleTabChange("Night Life")}
        >
          Night Life 🍻
        </li>
        <li
          className={`p-2 text-center hover:bg-over-yonder-default hover:text-white w-1/4 cursor-pointer ${
            selectedTab === "Greek Life"
              ? "bg-over-yonder-default text-white"
              : ""
          }`}
          onClick={() => handleTabChange("Greek Life")}
        >
          Greek Life 🏛
        </li>
      </ul>
      <div className="h flex flex-col content-around flex-nowrap justify-around items-center h-auto">
        {loading ? (
          <svg
            className="w-3/4 flex flex-row h-[500px] mt-24 mb-10 shadow-md animate-pulse"
            // width="100%"
            // height="100%"
            viewBox="0 0 800 500"
          >
            {/* Placeholder Rectangle */}
            <rect x="0" y="0" width="400" height="500" fill="#f2f2f2" />

            {/* Avatar Placeholder Circle */}
            <circle cx="760" cy="40" r="20" fill="#e0e0e0" />

            {/* User Name Placeholder */}
            <rect
              x="500"
              y="25"
              width="200"
              height="20"
              rx="5"
              fill="#e0e0e0"
            />

            {/* Event Title Placeholder */}
            <rect
              x="410"
              y="80"
              width="380"
              height="40"
              rx="5"
              fill="#e0e0e0"
            />

            {/* Event Description Placeholder */}
            <rect
              x="410"
              y="140"
              width="380"
              height="30"
              rx="5"
              fill="#e0e0e0"
            />

            {/* College Name Placeholder */}
            <rect
              x="410"
              y="180"
              width="380"
              height="30"
              rx="5"
              fill="#e0e0e0"
            />

            {/* Start Date Placeholder */}
            <rect
              x="410"
              y="220"
              width="380"
              height="30"
              rx="5"
              fill="#e0e0e0"
            />

            {/* End Date Placeholder */}
            <rect
              x="410"
              y="260"
              width="380"
              height="30"
              rx="5"
              fill="#e0e0e0"
            />
          </svg>
        ) : (
          <>
            {overyonder && overyonder.map((event_post, key) => {
              // console.log(event_post.event_comments);
              let url = `http://maps.apple.com/?q=${encodeURIComponent(event_post.title).trim()}&ll=${event_post.latitude},${event_post.longitude}`;
              let urlGoogle = ` https://www.google.com/maps/search/?api=1&query=${event_post.latitude},${event_post.longitude}`;
              console.log(urlGoogle);
              return (
                // < to={`/event/${event_post.id}`}>
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
                    <Link to={`/user/${event_post.user_profiles.id}`}>
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
                    </Link>
                    <div className="px-2 flex flex-col lg:overflow-y-scroll">
                      <h1 className="mt-2 mb-4 text-2xl font-bold text-right">
                        {event_post.title}
                      </h1>
                      <p className=" text-sm text-right ">
                        {event_post?.description ? event_post?.description.slice(0, 50):""}...
                      <br/>
                        <Link to={`/event/${event_post.id}`}>Read more</Link>
                      </p>
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
                        <div className="py-2 flex flex-row items-center justify-end">
                          {upvote}
                          <button
                            onClick={() => setUpvote(upvote + 1)}
                            className="p-2 w-fit mx-1 h-fit border rounded-lg flex flex-wrap justify-center items-center "
                          >
                            <ArrowUpIcon className="h-6 w-6 text-over-yonder-default" />
                          </button>
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
                          <Link
                            params={{
                              t: event_post.title,
                              ll: `${event_post.latitude},${event_post.longitude}`,
                            }}
                            target="_blank"
                            to={`http://maps.apple.com/?q=${encodeURIComponent(
                              event_post.title
                            ).trim()}&ll=${event_post.latitude},${
                              event_post.longitude
                            }`}
                          >
                            <button
                              className={`p-2 w-fit mx-1 h-fit border rounded-lg flex flex-wrap justify-center items-center 
                            `}
                            >
                              <MapPinIcon
                                className={`h-6 w-6  text-over-yonder-default
                             `}
                              />
                            </button>
                          </Link>
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
                    <Comments event_id={event_post.id} />
                  </div>
                </div>
              );})}
          </>
        )}
      </div>
    </div>
  );
}

export default Events;
