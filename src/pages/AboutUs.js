import React from 'react';
import { Link } from "react-router-dom";
import mindconnect from "../components/assests/mindconnect_logo.png";
import img1 from "../components/assests/image1.png";
import img2 from "../components/assests/image2.webp";
import img3 from "../components/assests/image3.jpg";


// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Header Component (unchanged)
const Header = () => {
    return (
        <nav className="bg-gradient-to-r from-blue-50 to-white shadow-lg border border-gray-300 px-6 py-3">
            <div className="flex items-center justify-between">
                {/* Left Section: Icons */}
                <div className="flex gap-12">
                    <Link to={"/login"}>
                        <img src={mindconnect} alt="MindConnect Logo" className="w-60" />
                    </Link>

                </div>

                <div className="flex gap-8">

                    <div className="flex items-center gap-12 ml-auto text-blue-400 sm:text-base">
                        <div className="hover:text-blue-700 cursor-pointer text-xl">Home</div>
                        <div className="hover:text-blue-700 cursor-pointer text-xl">About Us</div>
                        <div className="hover:text-blue-700 cursor-pointer text-xl">Notifications</div>
                    </div>

                    {/* Logout Button */}
                    <div>
                        <Link to={"/homepage"}>
                            <button
                                className="py-2 px-6 rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white text-base sm:text-lg font-semibold hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-400 transition duration-300"
                            >
                                Logout
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

// AboutUs Component (updated with distinct sections and increased widths)
const AboutUs = () => {


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-12 font-sans">
            <div className="max-w-7xl mx-auto"> {/* Changed max-w-6xl to max-w-7xl */}

                {/* Welcome to mindConnect Section */}
                <div className="mb-12 rounded-2xl overflow-hidden shadow-inner border border-blue-200">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{ delay: 6000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop={true}
                        className="w-full h-[700px]"
                    >
                        {[img1, img2, img3].map((img, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative w-full h-[700px]">
                                    {/* Background Image */}
                                    <img
                                        src={img}
                                        alt={`Therapist Session ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Dark Overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

                                    {/* Text Content */}
                                    <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6">
                                        <h1 className="text-5xl font-extrabold text-blue-500 mb-6 tracking-tight drop-shadow-lg">
                                            Welcome to <span className="text-blue-500">mindConnect</span>
                                        </h1>
                                        <p className="text-lg text-gray-100 max-w-5xl leading-relaxed mb-4 drop-shadow">
                                            <strong className="text-indigo-200">mindConnect</strong> is a digital platform built to empower mental well-being by offering users a safe space to connect with peers, counselors, and certified doctors. We believe mental health support should be accessible, private, and stigma-free.
                                        </p>
                                        <p className="text-lg text-gray-100 max-w-5xl leading-relaxed drop-shadow">
                                            Our platform was developed by a passionate student team from Uva Wellassa University to bridge the gap between emotional support and expert help. We combine community discussions, online consultations, and educational resources into one easy-to-use platform.
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>


                {/* What We Offer Section */}
                <div className="mb-12 p-6 bg-green-50 rounded-2xl shadow-inner border border-blue-200">
                    <h2 className="text-3xl font-bold text-blue-500 mb-4 border-b-2 border-blue-200 pb-2">
                        What We Offer
                    </h2>
                    <ul className="list-none text-gray-800 text-lg space-y-3 pl-0">
                        <li className="flex items-start">
                            <span className="text-green-500 mr-3 text-2xl">
                                <svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                            </span>
                            Anonymous peer-to-peer support via community forums
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-3 text-2xl">
                                <svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332.477-4.5 1.253"></path></svg>
                            </span>
                            Verified doctors and counselors for virtual consultations
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-3 text-2xl">
                                <svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </span>
                            Appointment scheduling with automated reminders
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-3 text-2xl">
                                <svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332.477-4.5 1.253"></path></svg>
                            </span>
                            Expert-written articles and mental wellness resources
                        </li>
                    </ul>
                </div>


                {/* Our Mission Section */}
                <div className="mb-8 p-6 bg-yellow-50 rounded-2xl shadow-inner border border-blue-200">
                    <h2 className="text-3xl font-bold text-blue-500 mb-4 border-b-2 border-blue-200 pb-2">
                        Our Mission
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        To build a connected and compassionate digital space where everyone
                        can access mental health support without fear or limitations. Our
                        goal is to reduce stigma, promote awareness, and deliver professional
                        help through a modern and scalable platform.
                    </p>
                    <div className="text-center p-6 bg-blue-300 rounded-xl shadow-inner border border-blue-200">
                        <p className="text-2xl text-blue-900 italic font-semibold">
                            "Because your mind matters."
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

// Main App Component
const App = () => {
    return (
        <div className="App">
            <Header />
            <AboutUs />
        </div>
    );
};

export default App;
