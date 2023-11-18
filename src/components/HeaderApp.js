import React, { useEffect, useState } from "react";
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { supabase } from "../utils/supaBaseClient";

function HeaderApp({ toggleSidebar, toggleSearchbar}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    async function getProfile() {
      try {
        let { data, error } = await supabase
          .from("user_profiles")
          .select(`username, first_name, avatar_url`)
          .eq("id", user.id)
          .single();
          setUsername(data.username);
          setFirstName(data.first_name);
          setAvatarUrl(data.avatar_url);
      } catch (error) {
        navigate("/");
      }
      
        
    
}

getProfile();
}, [user]);
  return (
    <header className={`App-header z-[99] flex justify-between content-center col-span-3 row-span-1 sticky top-0 bg-white `}>
      <div className="brand">
      <div className="block lg:hidden text-over-yonder-default" onClick={toggleSidebar}>
      <Bars3Icon className='block w-8 h-8 lg:hidden' />
      </div>
      {" "}
        <Link to={user ? "/home" : "/"}>
          <h1 className="logo text-over-yonder-default">OverYonder</h1>
        </Link>
      </div>
      <div className="flex flex-wrap flex-row justify-center items-center">
       
        <div className="block lg:hidden mr-4 p-4 rounded-full text-white bg-over-yonder-default" onClick={toggleSearchbar}>
        <MagnifyingGlassIcon className=' w-8 h-8'  />
        </div>
        <Link to="/me" className="flex flex-wrap flex-row justify-between content-center items-center">
          <img className="h-[60px] w-[60px] rounded-[50%] avatar border cursor-pointer border-over-yonder" src={avatar_url} alt="avatar" /> 
          &nbsp;
          <span className="hidden md:inline" >{username || first_name}</span>
        </Link>
      </div>
    </header>
  );
}

export default HeaderApp;
