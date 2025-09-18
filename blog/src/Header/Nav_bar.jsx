import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, DropdownHeader, Navbar, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import Navbarlinks from "./Navbarlinks";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { getCurrentUserDetail, isLoggedIn } from "../Auth";

function Nav_bar() {
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, [login]);

  return (
    <div className="!bg-white z-50 sticky top-0 shadow-sm">
      <nav className="!bg-white relative border-b px-4 sm:px-6 lg:px-8 lg:h-16 h-14 flex items-center justify-between">
    
        <Link to="/" className="text-sm sm:text-xl font-semibold dark:text-white">
          <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-lg">
            Blogify
          </span>
        </Link>

        <div className="hidden lg:flex items-center">
          <form className="relative w-56">
            <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </form>
        </div>

 
        <Button className="w-10 h-10 lg:hidden" color="gray" pill>
          <AiOutlineSearch className="text-lg" />
        </Button>

     
        <div className="hidden md:flex space-x-6 text-lg text-gray-700">
          <Navbarlinks />
        </div>

        <div className="flex items-center gap-3">
          <Button className="h-10 rounded-full hidden sm:inline" color="gray" pill>
            <FaMoon />
          </Button>

          {login ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="user" img={user?.imageUrl} rounded />}
            >
              <DropdownHeader className="!bg-white">
                <div className="flex flex-col p-3 text-left gap-2">
                  <span className="block text-base font-semibold text-gray-900">
                    {user?.name}
                  </span>
                  <span className="block text-sm font-semibold text-gray-900 truncate">
                    @{user?.email}
                  </span>
                </div>
              </DropdownHeader>
              <Link to={"/user/user-dashboard"}>
                <Dropdown.Item className="!bg-white block text-base font-semibold text-gray-900">
                  Profile
                </Dropdown.Item>
              </Link>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:scale-105 transition">
                Sign In
              </Button>
            </Link>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden md:hidden ml-2"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden flex flex-col items-center gap-4 py-4 bg-white shadow-md rounded-b-lg"
        >
          <Navbarlinks />
        </motion.div>
      )}
    </div>
  );
}

export default Nav_bar;



