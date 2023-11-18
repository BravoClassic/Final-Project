import React from 'react'
import { Link } from 'react-router-dom'
import { now } from "@internationalized/date";

function Footer() {
  return (
    <footer className="h-auto flex flex-wrap flex-col md:flex-row bg-white justify-around items-center p-4">
        <div className="w-[50%] h-auto flex flex-wrap justify-center items-center md:border-l-over-yonder-default">
          <ul className="w-3/4 h-full mb-10 md:mb-0">
            <Link to={"/about"} className="p-3 block text-center hover:bg-over-yonder-default hover:text-white rounded-md" href="#">
              <li>About</li>
            </Link>
            <Link to="/ads" className="p-3 block text-center hover:bg-over-yonder-default hover:text-white rounded-md" href="#">
              <li>Ads</li>
            </Link>
            <Link to="/support" className="p-3 block text-center hover:bg-over-yonder-default hover:text-white rounded-md" href="#">
              <li>Support</li>
            </Link>
            <Link to="/privacy" className="p-3 block text-center hover:bg-over-yonder-default hover:text-white rounded-md" href="#">
              <li>Privacy Policy</li>
            </Link>
            <Link to="/terms" className="p-3 block text-center hover:bg-over-yonder-default hover:text-white rounded-md" href="#">
              <li>Terms</li>
            </Link>
          </ul>
        </div>
        <div className=" w-1/2 h-fit">
          <h1 className="text-center">Developed By <Link to="#">Gerald</Link> and <Link to="#">Keion</Link></h1>
          <p className="text-center">&copy; OverYonder {now().year}</p>
        </div>
      </footer>
  )
}

export default Footer