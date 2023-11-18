import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../utils/supaBaseClient';
import { useAuth } from '../utils/AuthContext';
const User = () => {
    const {id} = useParams();
    const {user} = useAuth();
    const navigate = useNavigate();
    const [other, setUser] = useState({});
    const {avatar_url, first_name,full_name, last_name, username, bio} = other;

    const getUser = async () => {
        let {data,error} = await supabase
        .from('user_profiles')
        .select("*")
        .eq('id', id)
        if (error || data.length === 0) {
            navigate('/404')
        }else{
            setUser(data[0])
        }
    }
    useEffect(() => {
        if (user.id === id) {
            navigate('/me')
        }
    }, [user, id, navigate])

    useEffect(() => {
        getUser()
    }, [])

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
            { first_name && last_name ? (
          <h2 className="text-xl font-semibold">{`${
            (first_name
           + " "+last_name) }`}</h2>
            ) : (
                <h2 className="text-xl font-semibold">{full_name}</h2>
            )}

          <p className="text-gray-500">@{username}</p>
          <p className="w-full text-sm text-gray-400">{bio}</p>
        </div>
        <div className="flex flex-col  md:justify-start ml-4 justify-center">
         
          
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
      
    </div>
  );
}

export default User