import React from "react";
import option_icon from "../components/assests/option.png";
import mindconnect from "../components/assests/mindconnect_logo.png";
import doctor_avater from "../components/assests/doctor_avatar.jpg";
import appointment_icon from "../components/assests/appointment_icon.png";
import settings_icon from "../components/assests/settings_icon.png";
import message_icon from "../components/assests/message_icon.png";
import post_1_image from "../components/assests/post1img.webp";
import post_2_image from "../components/assests/posting2img.jpg";
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
          <div className="flex gap-12">
            <Link to={"/login"}>
              <img src={mindconnect} alt="MindConnect Logo" className="w-60" />
            </Link>
          </div>

          <div className="flex gap-8">
            <div className="flex items-center gap-12 ml-auto text-blue-400 sm:text-base">
              <Link to={"/homepage"}><div className="hover:text-blue-700 cursor-pointer text-2xl">Home</div></Link>
              <Link to={"/about"}><div className="hover:text-blue-700 cursor-pointer text-2xl">About Us</div></Link>
              <div className="hover:text-blue-700 cursor-pointer text-2xl">Notifications</div>
            </div>

            <div>
              <Link to={"/homepage"}>
                <button className="py-2 px-6 rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white text-lg sm:text-xl font-semibold hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-400 transition duration-300">
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-300 relative flex items-center p-3 shadow-xl mx-3 my-4">
        <div className="shadow-lg bg-white border border-gray-300 w-28 h-28 p-2 flex items-center justify-center rounded-full">
          <button onClick={todoctoraccount}>
            <img src={doctor_avater} alt="Doctor" className="w-24 h-24 rounded-full object-cover" />
          </button>
        </div>

        <div className="ml-6">
          <h1 className="text-white text-3xl font-semibold">Dr.P Saman Wimalasooriya</h1>
          <p className="text-blue-100 text-lg py-2">MBBS, License #12345678</p>
          <p className="text-white text-lg font-semibold bg-green-500 px-3 py-1 inline-block rounded-full shadow-md">
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
          <button className="w-1/4 text-white bg-gradient-to-r from-blue-500 to-blue-700 font-semibold py-3 px-4 rounded-lg mx-1 mb-2 hover:from-blue-300 hover:to-blue-500 shadow-md transition-all text-lg md:text-xl">
            New Post
          </button>
        </div>
      </Link>

      {/* Post 1 */}
      <div className="p-4 shadow-lg bg-white mx-3 my-3 text-center w-full rounded-md" id="posting-div">
        <img
          src={post_2_image}
          alt="Post Visual"
          className="mx-auto w-1/2 h-auto shadow-md rounded-md"
        />
        <h2 className="text-xl font-semibold text-gray-800 mt-3 mb-1">
          Which Symptom is Not Associated with Major Depressive Disorder?
        </h2>
        <p className="text-gray-700 text-base text-left leading-relaxed px-4 md:px-0 max-w-4xl mx-auto">
          While Major Depressive Disorder (MDD) is characterized by a range of symptoms, there is one symptom that is not typically associated with this condition: mania. Mania is a symptom of bipolar disorder, a separate mood disorder characterized by both manic and depressive episodes. In contrast, MDD is typically characterized by persistent sadness, hopelessness, and a loss of interest in activities. Other common symptoms of MDD include changes in appetite or weight, changes in sleep patterns, fatigue, feelings of worthlessness or guilt, difficulty concentrating, and thoughts of death or suicide. If you are experiencing symptoms of mania or MDD, it’s important to seek help from a healthcare provider.
        </p>
        {/* Like & Comment Buttons */}
        <div className="flex justify-center gap-5 mt-3">
          <button className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 transition text-sm md:text-base">
            👍 Like
          </button>
          <button className="flex items-center gap-2 bg-gray-300 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-400 transition text-sm md:text-base">
            💬 Comment
          </button>
        </div>
      </div>

      {/* Post 2 */}
      <div className="p-4 shadow-lg bg-white mx-3 my-3 text-center w-full rounded-md" id="posting-div">
        <img
          src={post_1_image}
          alt="Post Visual"
          className="mx-auto w-1/2 h-auto shadow-md rounded-md"
        />
        <h2 className="text-xl font-semibold text-gray-800 mt-3 mb-1">
          Depression & Recovery
        </h2>
        <p className="text-gray-700 text-base text-left leading-relaxed px-4 md:px-0 max-w-4xl mx-auto">
          Some of the common signs of the major depressive disorder include a persistent sad or empty mood, feelings of worthlessness or guilt, fatigue, decreased energy, difficulty concentrating, and sleep disturbances. Individuals with major depressive disorder may also experience a significant change in appetite or weight and physical symptoms such as headaches and stomach problems. It is important to note that symptoms of major depressive disorder can vary from person to person, and not everyone will experience the same symptoms. If you or someone you know is experiencing any of these symptoms, it is important to seek the help of a mental health professional who can provide an accurate diagnosis and appropriate treatment. With proper care and treatment, individuals with major depressive disorder can manage their symptoms and lead fulfilling lives.
        </p>
        {/* Like & Comment Buttons */}
        <div className="flex justify-center gap-5 mt-3">
          <button className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 transition text-sm md:text-base">
            👍 Like
          </button>
          <button className="flex items-center gap-2 bg-gray-300 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-400 transition text-sm md:text-base">
            💬 Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorHomePage;
