import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({SidebarOpen}) {
  return (
    <div className={`${SidebarOpen ? "block" : "hidden"} lg:block bg-white z-50`}     >
        <nav className='custom-nav bg-white flex flex-col fixed top-[65px] left-0 w-[200px] justify-between row-span-4 shadow-md'>
            <ul className='h-3/6 flex flex-col content-around flex-wrap justify-around items-center	'>
                <li className='w-fit-content inline-flex	'><Link className='border border-over-yonder p-2.5 w-36 text-center hover:bg-over-yonder-default hover:text-white' to="/home">Home</Link></li>
                <li className='w-fit-content inline-flex	'><Link className='border border-over-yonder p-2.5 w-36 text-center hover:bg-over-yonder-default hover:text-white' to="/calendar">Calendar</Link></li>
                <li className='w-fit-content inline-flex	'><Link className='border border-over-yonder p-2.5 w-36 text-center hover:bg-over-yonder-default hover:text-white' to="/chat">Chat</Link></li>
                <li className='w-fit-content inline-flex	'><Link className='border border-over-yonder p-2.5 w-36 text-center hover:bg-over-yonder-default hover:text-white' to="/me">Account</Link></li>
            </ul>
            <div className='h-28 flex justify-center content-center flex-wrap'>
                <Link  className='border border-over-yonder p-2.5 w-36 text-center hover:bg-over-yonder-default hover:text-white' to="/create">New Event</Link>
            </div>
        </nav>

    </div>
  )
}

export default Sidebar