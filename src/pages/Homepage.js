import React from "react";
import { Link } from "react-router-dom";
import mindconnect from "../components/assests/mindconnect_logo.png";
import img1 from "../components/assests/istockphoto-1369683259-612x612.jpg";
import img2 from "../components/assests/successful-psychologist-talking-to-her-patient-SBI-324310484-scaled.jpg";
import img3 from "../components/assests/img1.jpg";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Homepage() {
    return (
        <div>
            {/* Navigation */}
            <nav className="bg-gradient-to-r from-blue-50 to-white shadow-lg border border-gray-300 px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex gap-12">
                        <img src={mindconnect} alt="MindConnect Logo" className="w-60" />
                    </div>
                    <div className="flex gap-8">
                        <div className="flex items-center gap-12 ml-auto text-blue-400 sm:text-base">
                            <div className="hover:text-blue-700 cursor-pointer text-xl">About Us</div>
                            <div className="hover:text-blue-700 cursor-pointer text-xl">Notifications</div>
                        </div>
                        <div>
                            <Link to={"/login"}>
                                <button className="py-2 px-6 rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white text-base sm:text-lg font-semibold hover:from-blue-800 hover:to-blue-400 transition duration-300">
                                    Sign In
                                </button>
                            </Link>
                        </div>
                        <div>
                            <Link to={"/registration"}>
                                <button className="py-2 px-6 rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white text-base sm:text-lg font-semibold hover:from-blue-800 hover:to-blue-400 transition duration-300">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Slideshow with fixed text */}
            <div className="relative px-6 py-8">
                {/* Fixed Text aligned to right */}
                <div className="absolute inset-0 z-10 flex items-center justify-end pr-12 pointer-events-none">
                    <h2 className="text-white text-8xl font-bold drop-shadow-lg">Mind Connect</h2>
                </div>

                {/* Swiper Slideshow */}
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 6000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop={true}
                    className="w-full h-[700px] rounded-xl overflow-hidden shadow-md"
                >
                    {[img1, img2, img3].map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-[700px]">
                                <img
                                    src={img}
                                    alt={`Therapist Session ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* 3 Cards Section with increased height */}
            <div className="py-12 px-6 bg-gray-50 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div
                        className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
                        style={{ minHeight: "300px" }}
                    >
                        <div className="text-4xl text-blue-600 mb-4">💬</div>
                        <h3 className="text-xl font-bold mb-2">Share Your Feelings</h3>
                        <p className="text-gray-600 mb-4">
                            Post your thoughts anonymously and get responses from professionals and others.
                        </p>
                        <button className="mt-auto py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Start Talking
                        </button>
                    </div>

                    {/* Card 2 */}
                    <div
                        className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
                        style={{ minHeight: "300px" }}
                    >
                        <div className="text-4xl text-green-600 mb-4">🧑‍⚕️</div>
                        <h3 className="text-xl font-bold mb-2">Find a Therapist</h3>
                        <p className="text-gray-600 mb-4">
                            Browse verified counselors and doctors. Book sessions online at your convenience.
                        </p>
                        <button className="mt-auto py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600">
                            Explore Now
                        </button>
                    </div>

                    {/* Card 3 */}
                    <div
                        className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
                        style={{ minHeight: "300px" }}
                    >
                        <div className="text-4xl text-purple-600 mb-4">📚</div>
                        <h3 className="text-xl font-bold mb-2">Learn About Mental Health</h3>
                        <p className="text-gray-600 mb-4">
                            Read posts and guides from experts about anxiety, depression, stress, and more.
                        </p>
                        <button className="mt-auto py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-600">
                            Read Articles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
