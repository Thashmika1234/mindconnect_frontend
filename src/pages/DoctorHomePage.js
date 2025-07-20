import React from "react";
import option_icon from "../components/assests/option.png";
import mindconnect from "../components/assests/mindconnect_logo.png";
import doctor_avatar from "../components/assests/doctor_avatar.jpg";
import appointment_icon from "../components/assests/appointment_icon.png";
import settings_icon from "../components/assests/settings_icon.png";
import message_icon from "../components/assests/message_icon.png";
import post_1_image from "../components/assests/post1img.webp";
import { Link, useNavigate } from "react-router-dom";

const DoctorHomePage = () => {
  const navigate = useNavigate();

  const todoctoraccount = () => {
    navigate("/doctoraccount");
  };

  const tosetting = () => {
    navigate("/SettingPage");
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-50 to-white shadow-lg border border-gray-300 px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section: Logo */}
          <div className="flex gap-12">
            <Link to={"/login"}>
              <img src={mindconnect} alt="MindConnect Logo" className="w-60" />
            </Link>
          </div>

          {/* Right Section: Links and Logout */}
          <div className="flex gap-8">
            <div className="flex items-center gap-12 ml-auto text-blue-400 sm:text-base">
              <div className="hover:text-blue-700 cursor-pointer text-xl">Home</div>
              <div className="hover:text-blue-700 cursor-pointer text-xl">About Us</div>
              <div className="hover:text-blue-700 cursor-pointer text-xl">Notifications</div>
            </div>

            <div>
              <Link to={"/homepage"}>
                <button className="py-2 px-6 rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white text-base sm:text-lg font-semibold hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-400 transition duration-300">
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-300 relative flex items-center p-3 shadow-xl mx-3 my-4">
        <div className="shadow-lg bg-white border border-gray-300 w-28 h-28 p-2 flex items-center justify-center">
          <button onClick={todoctoraccount}>
            <img src={doctor_avatar} alt="Doctor" className="w-24 h-24 rounded-full" />
          </button>
        </div>

        <div className="ml-6">
          <h1 className="text-white text-2xl font-semibold">Dr. Saman</h1>
          <p className="text-blue-100 text-sm py-2">MBBS, License #12345678</p>
          <p className="text-white text-sm font-semibold bg-green-500 px-3 py-1 inline-block shadow-md">
            Doctor
          </p>
        </div>

        <div className="absolute top-3 right-3 flex gap-9">
          <button>
            <img src={appointment_icon} alt="Appointment Icon" className="w-9" />
          </button>
          <button>
            <img src={message_icon} alt="Message Icon" className="w-9" />
          </button>
          <button onClick={tosetting}>
            <img src={settings_icon} alt="Settings Icon" className="w-9" />
          </button>
        </div>
      </div>

      {/* New Post Button */}
      <Link to={"/posting"}>
        <div className="flex items-center justify-center p-3 shadow-xl bg-white mx-3 my-4">
          <button className="w-1/4 text-white bg-gradient-to-r from-blue-500 to-blue-700 font-semibold py-3 px-4 rounded-lg mx-1 mb-2 hover:from-blue-300 hover:to-blue-500 shadow-md transition-all sm:text-base md:text-lg">
            New Post
          </button>
        </div>
      </Link>

      {/* Post Content Section */}
      <div
        className="flex flex-col md:flex-row gap-6 items-center justify-start p-6 shadow-xl bg-white mx-3 my-4"
        id="posting-div"
      >
        {/* Image */}
        <img
          src="https://via.placeholder.com/150" // Replace this with your asset
          alt="Post Visual"
          className="w-48 h-48 object-cover rounded-lg shadow-md"
        />

        {/* Text Content */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Which Symptom is Not Associated with Major Depressive Disorder?
          </h2>
          <p className="text-gray-600 text-base">
            While Major Depressive Disorder (MDD) is characterized by a range of symptoms, there is one symptom that is not typically associated with this condition: mania. Mania is a symptom of bipolar disorder, a separate mood disorder characterized by both manic and depressive episodes. In contrast, MDD is typically characterized by persistent sadness, hopelessness, and a loss of interest in activities. Other common symptoms of MDD include changes in appetite or weight, changes in sleep patterns, fatigue, feelings of worthlessness or guilt, difficulty concentrating, and thoughts of death or suicide. If you are experiencing symptoms of mania or MDD, it’s important to seek help from a healthcare provider.
          </p>
        </div>
      </div>

       <div
        className="flex flex-col md:flex-row gap-6 items-center justify-start p-6 shadow-xl bg-white mx-3 my-4"
        id="posting-div"
      >
        {/* Image */}
        <img
          src= {post_1_image}
          alt="Post Visual"
          className="w-48 h-48 object-cover rounded-lg shadow-md"
        />

        {/* Text Content */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Depression & Recovery
          </h2>
          <p className="text-gray-600 text-base">
            Some of the common signs of the major depressive disorder include a persistent sad or empty mood, feelings of worthlessness or guilt, fatigue, decreased energy, difficulty concentrating, and sleep disturbances. Individuals with major depressive disorder may also experience a significant change in appetite or weight and physical symptoms such as headaches and stomach problems.

It is important to note that symptoms of major depressive disorder can vary from person to person, and not everyone will experience the same symptoms. If you or someone you know is experiencing any of these symptoms, it is important to seek the help of a mental health professional who can provide an accurate diagnosis and appropriate treatment. With proper care and treatment, individuals with major depressive disorder can manage their symptoms and lead fulfilling lives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorHomePage;
