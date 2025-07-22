import React from 'react';
import mindconnect from "../components/assests/mindconnect_logo.png";
import doctor_avater from "../components/assests/doctor_avatar.jpg";
import appointment_icon from "../components/assests/appointment_icon.png";
import message_icon from "../components/assests/message_icon.png";
import settings_icon from "../components/assests/settings_icon.png";
import image3 from "../components/assests/image3.jpg";
import { Link } from "react-router-dom";


export default function DoctorAccount() {
  return (
    <div>
      <nav className="bg-gradient-to-r from-blue-50 to-white shadow-lg border border-gray-300 px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section: Icons */}
          <div className="flex gap-12">
            <Link to={"/login"}>
              <img src={mindconnect} alt="MindConnect Logo" className="w-60" />
            </Link>

          </div>

          <div className="flex gap-8">
            {/* Middle Section Links */}
            <div className="flex items-center gap-12 ml-auto text-blue-400 sm:text-base">
              <Link to={"/"}>
                <div className="hover:text-blue-700 cursor-pointer text-xl">Home</div>
              </Link>
              <div className="hover:text-blue-700 cursor-pointer text-xl">About Us</div>
              <div className="hover:text-blue-700 cursor-pointer text-xl">Notifications</div>
            </div>

            {/* Logout Button */}
            <div>
              <button
                className="py-2 px-6 rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white text-base sm:text-lg font-semibold hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-400 transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-gradient-to-r from-blue-700 to-blue-300 relative flex items-center p-3 rounded-lg shadow-xl mx-3 my-4">
        {/* Circle Div */}
        <div className="shadow-lg rounded-full bg-white border border-gray-300 w-28 h-28 p-2 flex items-center justify-center">
          <button>
            <img src={doctor_avater} alt="Doctor" className="w-24 h-24 rounded-full" />
          </button>
        </div>

        {/* Content Section */}
        <div className="ml-6">
          <h1 className="text-white text-2xl font-semibold">Dr. Saman</h1>
          <p className="text-blue-100 text-sm py-2">MBBS, License #12345678</p>
          <p className="text-white text-sm font-semibold bg-green-500 rounded-full px-3 py-1 inline-block shadow-md">
            Doctor
          </p>
        </div>

        {/* Icon Div */}
        <div className="absolute top-3 right-3 flex gap-9">
          <button>
            <img src={appointment_icon} alt="Appointment Icon" className="w-9" />
          </button>
          <button>
            <img src={message_icon} alt="Message Icon" className="w-9" />
          </button>
          <button>
            <img src={settings_icon} alt="Settings Icon" className="w-9" />
          </button>
        </div>
      </div>











<div className="flex justify-center w-full my-6 pb-48">
  <div className="relative bg-blue-50 rounded-2xl shadow-lg flex flex-col items-center justify-start text-black text-xl font-semibold border border-gray-300 w-full md:w-5/12">
    
    {/* Avatar + Name */}
    <div>
      <div className="absolute top-3 left-3 flex items-center space-x-3">
        <div className="shadow-lg rounded-full bg-white border border-gray-300 w-16 h-16 p-1 flex items-center justify-center">
          <button>
            <img src={doctor_avater} alt="Doctor" className="w-14 h-14 rounded-full" />
          </button>
        </div>
        <div className="text-base font-semibold text-gray-700 flex flex-col">
          <h1>Dr. Saman</h1>
          <h1 id="datediv" className="text-sm font-normal text-gray-500">23 July 2025</h1>
        </div>
      </div>

      {/* Long Text Content */}
      <div className="p-4 w-full mt-24 text-left">
  <p className="text-gray-800 text-sm font-normal leading-relaxed">
    Mental illness is a general term for a group of illnesses that may include symptoms that can affect a person’s thinking, perceptions, mood or behaviour. Mental illness can make it difficult for someone to cope with work, relationships and other demands.
    <br /><br />
    The relationship between stress and mental illness is complex, but it is known that stress can worsen an episode of mental illness. Most people can manage their mental illness with medication, counselling or both. This page lists some of the more common mental health issues and mental illnesses.
  </p>
</div>

    </div>

    {/* Image */}
    <div className="mt-6 px-4 w-full">
      <img src={image3} alt="Content" className="rounded-xl w-full h-auto" />

      {/* Like & Comment Count */}
      <div className="flex justify-between space-x-6 mt-3 px-2 text-base text-gray-600 font-medium">
        <div>12 Likes</div>
        <div>4 Comments</div>
      </div>

      <hr className="border-t border-gray-300 mt-4" />
    </div>

    {/* Like & Comment Buttons */}
    <div className="flex justify-between px-6 py-3 w-full">
      <button className="bg-white border border-gray-300 rounded-lg px-6 py-2 text-sm text-blue-600 hover:bg-blue-100">
        👍 Like
      </button>
      <button className="bg-white border border-gray-300 rounded-lg px-6 py-2 text-sm text-blue-600 hover:bg-blue-100">
        💬 Comment
      </button>
    </div>
  </div>
</div>




       
     
      
    









    </div>
  )
}
