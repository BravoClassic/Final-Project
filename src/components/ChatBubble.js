import React from 'react'
import { useAuth } from '../utils/AuthContext';
import moment from 'moment';


function ChatBubble({children, sender, receiver, created_at}) {
  const { user } = useAuth();
  return (
    <div className={`w-full flex flex-col flex-wrap ${user.id === sender && "content-end items-end"} `}>
    <div className={`bg-over-yonder rounded-md ml-2 ${user.id === sender && "mr-2"} p-2 flex flex-wrap w-fit max-w-[300px] my-2 h-auto`} >
        <p className='text-white p-2 w-fit'>{children}</p>
    </div>
    <div className={`text-sm ${user.id === sender && "text-right pr-2"} ${user.id === receiver && "text-left ml-2"} -mt-2  text-gray-500`}>{moment(created_at).format('MMMM Do YYYY, h:mm:ss a')}</div>
    </div>
  )
}

export default ChatBubble