import React from "react";
import { Link } from "react-router-dom";
import mindconnect from "../components/assests/mindconnect_logo.png";
import img1 from "../components/assests/brain img 1.png"; // Hero background


export default function Homepage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-200 via-blue-100 to-sky-300 text-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-300 px-8 py-4">
        <div className="flex items-center justify-between">
          <img src={mindconnect} alt="MindConnect Logo" className="w-44" />
          <div className="flex items-center gap-10">
            <Link to={"/about"}>
              <span className="relative text-lg font-medium group cursor-pointer">
                About Us
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
            <Link to={"/login"}>
              <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 text-white">
                Log In
              </button>
            </Link>
            <Link to={"/registration"}>
              <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 transition-all duration-300 text-white">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section (Full Page Height, With Padding) */}
      <div className="relative w-full h-screen p-6">
        <img
          src={img1}
          alt="MindConnect Hero"
          className="w-full h-full object-cover rounded-2xl"
        />
        {/* MindConnect text positioned top-left */}
        <div className="absolute top-6 left-6 pl-16 pt-2">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            MindConnect
          </h1>
        </div>
        {/* Bottom-right video */}
        
      </div>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-sky-100 to-sky-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-white/70 hover:scale-105 transition-transform border border-gray-200">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-2xl font-bold mb-3">Share Your Feelings</h3>
            <p className="text-gray-700 mb-6">
              Post your thoughts anonymously and receive support from
              professionals and others.
            </p>
            <Link to={"/login"}>
              <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-cyan-500 hover:to-blue-500 transition">
                Start Talking
              </button>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-white/70 hover:scale-105 transition-transform border border-gray-200">
            <div className="text-5xl mb-4">🧑‍⚕️</div>
            <h3 className="text-2xl font-bold mb-3">Find a Therapist</h3>
            <p className="text-gray-700 mb-6">
              Browse verified counselors and doctors. Book sessions online
              easily.
            </p>
            <Link to={"/login"}>
              <button className="w-full py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-emerald-500 hover:to-green-500 transition">
                Explore Now
              </button>
            </Link>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-white/70 hover:scale-105 transition-transform border border-gray-200">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-2xl font-bold mb-3">Learn About Mental Health</h3>
            <p className="text-gray-700 mb-6">
              Discover expert articles about anxiety, stress, depression, and
              more.
            </p>
            <Link to={"/login"}>
              <button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transition">
                Read Articles
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-gray-300 text-gray-600 text-sm bg-sky-100">
        &copy; {new Date().getFullYear()} MindConnect. All rights reserved.
      </footer>
    </div>
  );
}
