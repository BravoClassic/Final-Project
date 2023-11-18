import React from 'react'

function SearchBar({SearchBarOpen}) {
  
  return (
    <div className={`h-full ${SearchBarOpen ? "block" :"hidden" } lg:block  grid-rows-1 fixed top-[65px] w-[200px] row-span-4 bg-white right-0 shadow-md`}>
       <div className='flex flex-col justify-center content-center items-center'>
          <input className='border border-over-yonder p-2.5 w-36 text-center hover:bg-over-yonder-default hover:text-white' type="text" placeholder="Search" />

          </div>
    </div>
  )
}

export default SearchBar