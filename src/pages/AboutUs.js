import React from 'react';
import { Link } from "react-router-dom";
import mindconnect from "../components/assests/mindconnect_logo.png";
import img1 from "../components/assests/image1.png";
import img2 from "../components/assests/image2.webp";
import img3 from "../components/assests/image3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Header = () => {
    return (
        <nav className="bg-gradient-to-r from-blue-50 to-white shadow-md border-b border-gray-300 px-6 py-3">
            <div className="flex items-center justify-between">
                <Link to="/login">
                    <img src={mindconnect} alt="MindConnect Logo" className="w-52" />
                </Link>
                <div className="flex gap-10 items-center">
                    <div className="flex gap-8 text-blue-400 font-medium">
                        <Link to="/" className="hover:text-blue-700 text-lg transition">Home</Link>
                        <Link to="/about" className="hover:text-blue-700 text-lg transition">About Us</Link>
                        <Link to="/notifications" className="hover:text-blue-700 text-lg transition">Notifications</Link>
                    </div>
                    <Link to="/homepage">
                        <button className="py-2 px-5 rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white font-semibold hover:from-blue-800 hover:to-blue-500 transition">
                            Logout
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-12 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 rounded-2xl overflow-hidden shadow-xl border border-blue-200 animate-fade-in">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{ delay: 6000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop={true}
                        className="w-full h-[600px]"
                    >
                        {[img1, img2, img3].map((img, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative h-[600px]">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                                    <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6">
                                        <h1 className="text-5xl font-extrabold text-blue-400 mb-6 drop-shadow-lg">
                                            Welcome to <span className="text-blue-500">mindConnect</span>
                                        </h1>
                                        <p className="text-lg text-gray-100 max-w-4xl mb-4 drop-shadow">
                                            <strong className="text-indigo-200">mindConnect</strong> is a digital platform built to empower mental well-being by offering users a safe space to connect with peers, counselors, and certified doctors.
                                        </p>
                                        <p className="text-lg text-gray-100 max-w-4xl drop-shadow">
                                            Developed by students at Uva Wellassa University, we bridge the gap between emotional support and expert help.
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="mb-12 p-8 bg-yellow-50 rounded-2xl shadow-md border border-blue-200 animate-slide-in-up">
                    <h2 className="text-3xl font-bold text-blue-500 mb-4 border-b-2 border-blue-200 pb-2">What We Offer</h2>
                    <ul className="text-gray-800 text-lg space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 text-xl">✔</span> Anonymous peer-to-peer support via community forums
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 text-xl">✔</span> Verified doctors and counselors for virtual consultations
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 text-xl">✔</span> Appointment scheduling with automated reminders
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 text-xl">✔</span> Expert-written articles and mental wellness resources
                        </li>
                    </ul>
                </div>

                <div className="mb-8 p-8 bg-yellow-50 rounded-2xl shadow-md border border-blue-200 animate-slide-in-up">
                    <h2 className="text-3xl font-bold text-blue-500 mb-4 border-b-2 border-blue-200 pb-2">Our Mission</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        To build a connected and compassionate digital space where everyone can access mental health support without fear or limitations. Our goal is to reduce stigma, promote awareness, and deliver professional help through a modern and scalable platform.
                    </p>
                    <div className="text-center bg-blue-300 rounded-xl py-6 shadow-inner border border-blue-200">
                        <p className="text-2xl text-blue-900 italic font-semibold">"Because your mind matters."</p>
                    </div>
                </div>
            </div>
        </div>
    );
};









const Footer = () => {
    return (
        <footer className="bg-white text-black pt-10 pb-6 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-center md:text-left">
                    {/* Brand + Tagline */}
                    <div className="flex flex-col items-center md:items-start">
                        <h2 className="text-2xl font-bold text-black mb-2">mindConnect</h2>
                        <p className="text-gray-600 max-w-sm">
                            Empowering mental wellness with a safe, inclusive, and professional online space.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-blue-600 transition">Home</Link></li>
                            <li><Link to="/about" className="hover:text-blue-600 transition">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-600 transition">Contact</Link></li>
                            <li><Link to="/privacy" className="hover:text-blue-600 transition">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Services</h3>
                        <ul className="space-y-2">
                            <li>🧠 Mental Health Forums</li>
                            <li>👩‍⚕️ Certified Counselors</li>
                            <li>📅 Appointments</li>
                            <li>📚 Wellness Resources</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} mindConnect. All rights reserved.
                </div>
            </div>
        </footer>
    );
};












const App = () => {
    return (
        <div className="App">
            <Header />
            <AboutUs />
            <Footer />
        </div>
    );
};

export default App;

