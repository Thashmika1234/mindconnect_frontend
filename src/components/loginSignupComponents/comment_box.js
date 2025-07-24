import React from "react";
import { Link } from "react-router-dom";

const Commentbox = () => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
      {/* Heading */}
      <h2 className="text-xl font-semibold text-gray-800 mb-5 border-b border-gray-200 pb-2">
        💬 Leave a Comment
      </h2>

      {/* Textarea */}
      <textarea
        placeholder="Share your thoughts..."
        className="w-full h-28 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-gray-700 placeholder-gray-400"
      ></textarea>

      {/* Post Button */}
      <div className="flex justify-end mt-4">
        <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md">
          Post Comment
        </button>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200" />

      {/* Comments Section */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-3">Recent Comments</h3>

        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-sm text-gray-800 shadow-sm">
            <span className="font-medium text-blue-600">User1:</span> Great post, doctor!
          </div>
          <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-sm text-gray-800 shadow-sm">
            <span className="font-medium text-blue-600">User2:</span> Thank you for the advice.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commentbox;
