import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import HeaderApp from '../components/HeaderApp'

function Layout({children}) {
  const [SidebarOpen, setSidebarOpen] = useState(false)
  const [SearchBarOpen, setSearchBarOpen] = useState(false)
  // const regex = "/(\/chat(\/)?[a-z0-9_.\/]*)/gi"
  // let path = window.location.pathname
  // useEffect(() => {
  //   if (path === "/chat" || path === "/chat/" || path.match(regex)) {
  //     console.log("match")
  //     setSidebarOpen(!SidebarOpen)
  //   }
  // }, [path])



  return (
    // <div className='grid grid-cols-1 md:grid-cols-[200px_auto_200px]  grid-rows-[auto_1fr]	'>
    //     <HeaderApp />
    //     <Sidebar />
    //     {children}
    //     <SearchBar />

    // </div>
    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] grid-rows-[auto_1fr]">

  <HeaderApp toggleSidebar={()=> {setSidebarOpen(!SidebarOpen); if (SearchBarOpen) {setSearchBarOpen(!SearchBarOpen)}} } toggleSearchbar={ () => {setSearchBarOpen(!SearchBarOpen); if (SidebarOpen){setSidebarOpen(!SidebarOpen)}}} />

  <Sidebar 
    SidebarOpen={SidebarOpen}
  />
  
  {children}

  {/* <SearchBar
    SearchBarOpen={SearchBarOpen}
  /> */}
  
</div>
  )
}

export default Layout