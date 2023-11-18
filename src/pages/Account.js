import { useState, useEffect } from "react";
import { supabase } from "../utils/supaBaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { PencilIcon } from "@heroicons/react/24/solid";
import { toCapitalCase } from "../utils/Helper";

export default function Account() {
  const { user, logoutUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("No bio yet.");
  const [avatar_url, setAvatarUrl] = useState(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  

  useEffect(() => {
    async function getProfile() {
      setLoading(true);

      let { data, error } = await supabase
        .from("user_profiles")
        .select(`username,first_name, last_name, website, avatar_url, bio`)
        .eq("id", user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setAvatarUrl(data.avatar_url);
        data.bio && setBio(data.bio);
      }

      setLoading(false);
    }

    getProfile();
  }, [user]);

  async function updateProfile(event) {
    event.preventDefault();

    setLoading(true);


    const updates = {
      username:username,
      website:website,
      bio:bio,
      first_name:first_name,
      last_name:last_name,
      updated_at: new Date(),
    };

    
const { data, error } = await supabase
  .from('user_profiles')
  .update(updates)
  .eq('id', user.id)
  .select()

  console.log(data, error)
    if (error) {
      alert(error.message);
    }


    setLoading(false);
    setShow(false);
  }
  async function handleLogOut() {
    try {
      logoutUser();
      navigate("/");
    } catch (error) {
      alert(error.error_description || error.message);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row justify-evenly items-center mb-6">
        <div className="relative">
          <div className="w-40 h-40 overflow-hidden rounded-full border">
            <img
              src={avatar_url}
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          {/* <div className="absolute bottom-5 right-0 p-1 bg-white rounded-full">
            <PencilIcon
              className="h-6 w-6 text-purple-600 cursor-pointer"
              onClick={() => setShow(!show)} // Replace this with your edit photo logic
            />
          </div> */}
        </div>
        {/* <div> */}
        <div className="ml-4 ">
          <h2 className="text-xl font-semibold">{`${toCapitalCase(
            first_name
          )} ${toCapitalCase(last_name)}`}</h2>
          <p className="text-gray-500">@{username}</p>
          <p className="w-full text-sm text-gray-400">{bio}</p>
        </div>
        <div className="flex flex-col  md:justify-start ml-4 justify-center">
        <button onClick={()=>setShow(!show)} style={{ backgroundColor: "#745296" }} className="inline button px-6 py-3 mb-2 rounded-lg text-white">
            Edit{" "}
            <PencilIcon className=" inline h-4 w-4 text-white-600 leading-7 cursor-pointer" />
          </button>
            <button
              className="button px-6 py-3 rounded-lg bg-blue-500 text-white"
              type="button"
              onClick={handleLogOut}
              style={{ backgroundColor: "#745296" }} // Using your color for the secondary button
            >
              Sign Out
            </button>
          </div>
        {/* </div> */}
        
      </div>

      <div className="w-full justify-center my-10">
        <div className="flex flex-row justify-evenly">
          <div className=" flex justify-center flex-col">
            <span className="font-semibold text-center">0</span> Yonder
          </div>
          <div className="flex justify-center flex-col">
            <span className="font-semibold text-center">0</span> Yondered
          </div>
          <div className="flex justify-center flex-col">
            <span className="font-semibold text-center">0</span> Friends
          </div>
          <div className="flex justify-center flex-col">
            <span className="font-semibold text-center">0</span> Liked
          </div>
        </div>
      </div>
      {show && (
        <form onSubmit={updateProfile} className="space-y-4">
          <button onClick={()=>setShow(!show)} style={{ backgroundColor: "#745296" }} className="ml-auto inline button px-6 py-3 rounded-lg text-white">Close</button>
          <div>
            <label htmlFor="firstname" className="text-lg font-semibold">
              First Name
            </label>{" "}
            <input
              id="firstname"
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-box"
            />
          </div>
          <div>
            <label htmlFor="lastname" className="text-lg font-semibold">
              Last Name
            </label>{" "}
            <input
              id="lastname"
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              className="input-box"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-lg font-semibold">
              Email
            </label>{" "}
            <input
              id="email"
              type="text"
              value={user.email}
              disabled
              className="input-box"
            />
          </div>
          <div>
            <label htmlFor="username" className="text-lg font-semibold">
              Username
            </label>{" "}
            <input
              id="username"
              type="text"
              required
              className="input-box"
              placeholder="Your Name"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="website" className="text-lg font-semibold">
              Website
            </label>{" "}
            <input
              id="website"
              type="url"
              className="input-box"
              placeholder="Your Website URL"
              value={website || ""}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="avatar" className="text-lg font-semibold">
              Bio
            </label>{" "}
            <textarea
              id="bio"
              className="input-box w-full"
              placeholder="Your Bio"
              value={bio || ""}
              onChange={(e) => setBio(e.target.value)}
            >
            </textarea>
          </div>
          <div className="flex justify-center">
            <button
              className="button primary px-6 py-3 rounded-lg"
              type="submit"
              disabled={loading}
              onClick={updateProfile}
              style={{ backgroundColor: "#745296" }} // Using your color for the primary button
            >
              {loading ? "Loading ..." : "Update"}
            </button>
          </div>

        </form>
      )}
        
    </div>
  );
}
