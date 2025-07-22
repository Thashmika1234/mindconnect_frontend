import React from "react";
import doctor_avater from "../assests/doctor_avatar.jpg";
import image3 from "../assests/image3.jpg";
import { Link } from "react-router-dom";

const DoctorPostCard = () => {
  return (
    <div className="flex justify-center w-full pb-4">
      <div className="relative bg-blue-50 rounded-2xl shadow-lg flex flex-col items-center justify-start text-black text-xl font-semibold border border-gray-300 w-full md:max-w-2xl">

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
          <Link to={"/Commentpage"}>
          <button className="bg-white border border-gray-300 rounded-lg px-6 py-2 text-sm text-blue-600 hover:bg-blue-100">
            💬 Comment
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorPostCard;
