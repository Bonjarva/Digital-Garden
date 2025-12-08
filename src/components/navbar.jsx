import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-700 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="font-bold text-xl">Digital Garden</h1>
        <div className="space-x-4">
          <NavLink to="/" className="hover:text-gray-300" end>
            Home
          </NavLink>
          <NavLink to="/seeds" className="hover:text-gray-300">
            Seeds
          </NavLink>
          <NavLink to="/plots" className="hover:text-gray-300">
            Plots
          </NavLink>
          <NavLink to="/about" className="hover:text-gray-300">
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
