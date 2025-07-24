import React from "react";
import mindconnect from "../assests/mindconnect_logo.png";
import { Link } from "react-router-dom";

const Navbarcomponent = () => {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-50 to-white shadow-lg border border-gray-300 px-4 md:px-6 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <Link to={"/login"}>
            <img
              src={mindconnect}
              alt="MindConnect Logo"
              className="w-48 md:w-60 mb-2 md:mb-0"
            />
          </Link>

          {/* Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-12 text-blue-400 text-lg font-medium">
            <Link to={"/"} className="hover:text-blue-700 cursor-pointer">Home</Link>
            <div className="hover:text-blue-700 cursor-pointer">About Us</div>
            <div className="hover:text-blue-700 cursor-pointer">Notifications</div>
          </div>

          {/* Logout Button */}
          <button className="mt-3 md:mt-0 py-2 px-6 rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white font-semibold hover:from-blue-800 hover:to-blue-400 transition duration-300">
            Logout
          </button>
        </div>
      </nav>

  
    </>
  );
};

export default Navbarcomponent;
