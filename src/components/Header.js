import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function Header() {

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
    <header className="flex flex-col md:flex-row md:justify-between bg-over-yonder-default">
      <div className="flex justify-between p-4 mb-4 md:mb-0">
        <Link to="/">
          <h1 className="text-2xl text-white font-black">OverYonder</h1> 
        </Link>

        <div className="block w-8 h-8 md:hidden">
          <Bars3Icon onClick={toggleMenu} className="text-3xl text-white cursor-pointer" />
        </div>
      </div>

      <nav 
        className={`${showMenu ? 'flex': 'hidden'} flex-col absolute top-16 left-0 bg-over-yonder-default w-full justify-center p-4 md:static md:bg-transparent md:w-auto  md:flex z-10`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-6">
          <li className=" md:border-0">
            <Link className="block md:inline text-center py-2 rounded-full md:px-6 hover:border-white hover:border hover:text-white" to="/about">About</Link>
          </li>
          <li className=" md:border-0">
            <Link className="block md:inline text-center py-2 rounded-full md:px-6 hover:border-white hover:border hover:text-white" to="/ads">Ads</Link>
          </li>
          <li className=" text-center md:border-0">
            <Link className="block md:inline py-2 rounded-full md:px-6 hover:border-white hover:border hover:text-white" to="/support">Support</Link>
          </li>
          <li>
            <HashLink smooth className="block md:inline text-center bg-white shadow-sm rounded-full py-2 md:px-6 text-gray-700 hover:bg-over-yonder-default hover:text-white" to="/#download">Download</HashLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}