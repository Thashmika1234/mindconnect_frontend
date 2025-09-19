import React from "react";
import mindconnect from "../assests/mindconnect_logo.png";
import { Link, useNavigate } from "react-router-dom";

const Navbarcomponent = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("user_type");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleHomeClick = () => {
    if (userType === "normal") navigate("/regularUserHomePage");
    else if (userType === "doctor") navigate("/doctorhomepage");
    else if (userType === "counsellor") navigate("/doctorhomepage");
    else if (userType === "admin") navigate("/Adminpannel");
    else navigate("/"); // fallback
  };

  const handleNotificationsClick = () => {
    if (userType === "normal") navigate("/usernotification");
    else if (userType === "doctor") navigate("/doctornotification");
    else if (userType === "counsellor") navigate("/doctornotification");
    else navigate("/"); // fallback
  };

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-white shadow-lg border border-gray-300 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-12">
          {/* Logo always navigates to correct homepage */}
          <button onClick={handleHomeClick}>
            <img src={mindconnect} alt="MindConnect Logo" className="w-60" />
          </button>
        </div>

        <div className="flex gap-8">
          <div className="flex items-center gap-12 ml-auto text-blue-400 sm:text-base">
            <button
              onClick={handleHomeClick}
              className="hover:text-blue-700 cursor-pointer text-2xl"
            >
              Home
            </button>

            <Link to="/about">
              <div className="hover:text-blue-700 cursor-pointer text-2xl">
                About Us
              </div>
            </Link>

            <button
              onClick={handleNotificationsClick}
              className="hover:text-blue-700 cursor-pointer text-2xl"
            >
              Notifications
            </button>
          </div>

          <div>
            <button
              className="py-2 px-6 rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white text-lg sm:text-xl font-semibold hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-400 transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbarcomponent;
