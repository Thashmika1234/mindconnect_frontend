import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import mindconnect from "../components/assests/mindconnect_logo.png";
import img1 from "../components/assests/image1.png";
import img2 from "../components/assests/image2.webp";
import img3 from "../components/assests/image3.jpg";
import mission from "../components/assests/mission.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-3 transition-all duration-300 backdrop-blur-md ${scrolled ? 'shadow-lg bg-white/80 border-b border-gray-300' : 'bg-transparent'}`}>
            <div className="flex items-center justify-between">
                <Link to="/login">
                    <img src={mindconnect} alt="MindConnect Logo" className="w-52" />
                </Link>
                <div className="flex gap-10 items-center">
                    <div className="flex gap-8 text-blue-400 font-medium">
                        <Link to="/" className="hover:text-blue-700 text-lg transition-colors">Home</Link>
                        <Link to="/about" className="hover:text-blue-700 text-lg transition-colors">About Us</Link>
                       
                    </div>
                    <Link to="/homepage">
                        <button className="py-2 px-5 rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white font-semibold hover:from-blue-800 hover:to-blue-500 transition-colors">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-12 font-sans transition-colors duration-700 ease-in-out">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 rounded-2xl overflow-hidden shadow-xl border border-blue-200 animate-fade-in transition-transform duration-700 hover:scale-[1.01]">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{ delay: 6000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop={true}
                        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]"
                    >
                        {[img1, img2, img3].map((img, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative h-full group transition-transform duration-700 ease-in-out">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 z-10 transition-colors duration-500 group-hover:bg-opacity-60" />
                                    <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6 transform transition-all duration-700 group-hover:scale-[1.02]">
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

                {/* What We Offer */}
                <div className="mb-12 p-8 bg-white rounded-2xl shadow-md border border-blue-200 animate-slide-in-up transform transition-transform duration-500 hover:scale-[1.01] hover:shadow-lg">
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

                {/* Our Mission with background image and transition */}
                <div
                    className="mb-8 p-8 rounded-2xl shadow-md border border-blue-200 relative overflow-hidden animate-fade-in transition-all duration-700 hover:scale-[1.01] hover:shadow-xl"
                    style={{
                        backgroundImage: `url(${mission})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-40 z-0 transition-opacity duration-700" />
                    <div className="relative z-10 transition-all duration-700">
                        <h2 className="text-3xl font-bold text-white mb-4 border-b-2 border-white pb-2">Our Mission</h2>
                        <p className="text-lg text-white leading-relaxed mb-8">
                            To build a connected and compassionate digital space where everyone can access mental health support without fear or limitations. Our goal is to reduce stigma, promote awareness, and deliver professional help through a modern and scalable platform.
                        </p>
                        <div className="text-center bg-blue-50/80 rounded-xl py-6 shadow-inner border border-white backdrop-blur-sm">
                            <p className="text-2xl text-blue-900 italic font-semibold">"Because your mind matters."</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="bg-blue-600 text-white pt-12 pb-8 border-t border-gray-200">
            <div className="max-w-5xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-center md:text-left">
                    <div>
                        <h2 className="text-2xl font-extrabold text-white mb-3">mindConnect</h2>
                        <p className="text-white leading-relaxed">
                            Empowering mental wellness with a safe, inclusive, and professional online space.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:underline hover:text-blue-300 transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:underline hover:text-blue-300 transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:underline hover:text-blue-300 transition-colors">Contact</Link></li>
                            <li><Link to="/privacy" className="hover:underline hover:text-blue-300 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-white">Services</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2"><span>🧠</span> Mental Health Forums</li>
                            <li className="flex items-center gap-2"><span>👩‍⚕️</span> Certified Counselors</li>
                            <li className="flex items-center gap-2"><span>📅</span> Appointments</li>
                            <li className="flex items-center gap-2"><span>📚</span> Wellness Resources</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 border-t border-gray-300 pt-4 text-center text-sm text-white">
                    © {new Date().getFullYear()} <span className="font-semibold text-white">mindConnect</span>. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

const App = () => {
    return (
        <div className="App pt-24">
            <Header />
            <AboutUs />
            <Footer />
        </div>
    );
};

export default App;
