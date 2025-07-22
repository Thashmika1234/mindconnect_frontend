import React from 'react';
import mindconnect from "../components/assests/mindconnect_logo.png";
import doctor_avater from "../components/assests/doctor_avatar.jpg";
import appointment_icon from "../components/assests/appointment_icon.png";
import message_icon from "../components/assests/message_icon.png";
import settings_icon from "../components/assests/settings_icon.png";
import Doctor_post from "../components/loginSignupComponents/doctor_post";
import { Link } from "react-router-dom";

export default function DoctorAccount() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-50 to-white shadow-lg border border-gray-300 px-4 md:px-6 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Logo */}
          <Link to={"/login"}>
            <img src={mindconnect} alt="MindConnect Logo" className="w-48 md:w-60 mb-2 md:mb-0" />
          </Link>

          {/* Center Nav Links */}
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

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-300 relative flex flex-col sm:flex-row items-center sm:items-start p-4 sm:p-6 rounded-lg shadow-xl mx-3 my-4 gap-4">
        {/* Avatar */}
        <div className="shadow-lg rounded-full bg-white border border-gray-300 w-24 h-24 sm:w-28 sm:h-28 p-2 flex items-center justify-center">
          <img src={doctor_avater} alt="Doctor" className="w-full h-full rounded-full object-cover" />
        </div>

        {/* Info */}
        <div className="sm:ml-6 text-center sm:text-left">
          <h1 className="text-white text-2xl font-semibold">Dr. Saman</h1>
          <p className="text-blue-100 text-sm py-2">MBBS, License #12345678</p>
          <p className="text-white text-sm font-semibold bg-green-500 rounded-full px-3 py-1 inline-block shadow-md">
            Doctor
          </p>
        </div>

        {/* Icons */}
        <div className="absolute top-3 right-3 flex gap-4 sm:gap-6">
          <button><img src={appointment_icon} alt="Appointment" className="w-7 sm:w-9" /></button>
          <button><img src={message_icon} alt="Message" className="w-7 sm:w-9" /></button>
          <button><img src={settings_icon} alt="Settings" className="w-7 sm:w-9" /></button>
        </div>
      </div>

      {/* Posts Section */}
      <div className="w-full flex justify-center px-3">
        <div className="w-full md:w-9/12 lg:w-6/12 flex flex-col gap-4 pb-10">
          <Doctor_post />
          <Doctor_post />
        </div>
      </div>
    </div>
  );
}
