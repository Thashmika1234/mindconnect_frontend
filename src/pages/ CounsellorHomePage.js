import React from "react";
import option_icon from "../components/assests/option.png";
import mindconnect from "../components/assests/mindconnect_logo.png";
import counsellor_avatar from "../components/assests/counsellor_avater.avif";
import appointment_icon from "../components/assests/appointment_icon.png";
import settings_icon from "../components/assests/settings_icon.png";
import message_icon from "../components/assests/message_icon.png";
import { Link, useNavigate } from "react-router-dom";

const CounsellorHomePage = () => {
    const navigate = useNavigate();

    const tocounselloraccount = () => {
        navigate("/counselloraccount");
    };




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
                            <div className="hover:text-blue-700 cursor-pointer text-xl">Home</div>
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
                    <button onClick={tocounselloraccount}>
                        <img src={counsellor_avatar} alt="Counsellor" className="w-24 h-24 rounded-full" />
                    </button>
                </div>

                {/* Content Section */}
                <div className="ml-6">
                    <h1 className="text-white text-2xl font-semibold">Dr. Saman</h1>
                    <p className="text-blue-100 text-sm py-2">MBBS, License #12345678</p>
                    <p className="text-white text-sm font-semibold bg-green-500 rounded-full px-3 py-1 inline-block shadow-md">
                        Counsellor
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

            {/* Button Section */}
            <div className="flex items-center justify-center p-3 rounded-lg shadow-xl bg-white mx-3 my-4">
                <button className="w-1/4 text-white bg-gradient-to-r from-blue-500 to-blue-700 font-semibold py-3 px-4 rounded-lg mx-1 mb-2 hover:from-blue-300 hover:to-blue-500 shadow-md transition-all sm:text-base md:text-lg">
                    New Post
                </button>
            </div>

        </div>
    );
};

export default CounsellorHomePage;
