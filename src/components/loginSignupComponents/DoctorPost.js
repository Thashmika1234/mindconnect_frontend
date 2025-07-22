// DoctorPost.jsx
import React, { useState } from "react";

const DoctorPost = ({ name, date, avatar, text, image }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex justify-center w-full my-6 pb-48">
      <div className="relative bg-blue-50 min-h-[900px] rounded-2xl shadow-lg flex flex-col items-center justify-start text-black text-xl font-semibold border border-gray-300 w-full md:w-5/12">
        
        {/* Avatar, Name & Date */}
        <div className="absolute top-3 left-3 flex items-center space-x-3">
          <div className="shadow-lg rounded-full bg-white border border-gray-300 w-16 h-16 p-1 flex items-center justify-center">
            <img src={avatar} alt="Doctor Avatar" className="w-14 h-14 rounded-full" />
          </div>
          <div className="text-base font-semibold text-gray-700 flex flex-col">
            <h1>{name}</h1>
            <h1 className="text-sm font-normal text-gray-500">{date}</h1>
          </div>
        </div>

        {/* Description with See More */}
        <div className="p-4 w-full mt-24 text-left">
          <p className={`text-gray-700 text-base ${!expanded ? "line-clamp-2" : ""}`}>
            {text}
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-blue-600 mt-2 focus:outline-none"
          >
            {expanded ? "See Less" : "See More"}
          </button>
        </div>

        {/* Image Section */}
        <div className="mt-6 px-4 w-full">
          <img src={image} alt="Post Visual" className="rounded-xl w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default DoctorPost;
