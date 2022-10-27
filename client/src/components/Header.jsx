import React from "react";
import { NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className="header-2">
        <nav className="bg-white py-2 md:py-4">
          <div className="container px-4 mx-auto md:flex md:items-center">

            <div className="flex justify-between items-center">
              <NavLink exact to="/"  className="font-bold text-xl text-indigo-600">Kisan Network </NavLink>
            </div>
            <div className="flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
              <NavLink exact to="/"  className=" cursor-pointer  p-2 lg:px-4 md:mx-2 text-black rounded " activeClassName="bg-green-500 text-white">Home</NavLink>
              <NavLink to="/contact"  className=" cursor-pointer  p-2 lg:px-4 md:mx-2 text-black rounded " activeClassName="bg-green-500 text-white">Contacts</NavLink>
              <NavLink to="/create"  className=" cursor-pointer  p-2 lg:px-4 md:mx-2 text-black rounded " activeClassName="bg-green-500 text-white">Create Contact</NavLink>
              <NavLink to="/history"  className=" cursor-pointer  p-2 lg:px-4 md:mx-2 text-black rounded " activeClassName="bg-green-500 text-white">Message History</NavLink>
            </div>
          </div>
          </nav>
      </div>
    )
}

export default Header;