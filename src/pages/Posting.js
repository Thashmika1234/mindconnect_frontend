import React, { useState } from "react";

const Posting = () => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = () => {
    if (post.trim()) {
      const newPost = {
        id: Date.now(),
        content: post,
      };
      setPosts([newPost, ...posts]);
      setPost("");
    } else {
      alert("Please enter your problem before posting.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-white">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Share Your problem Anonymously
        </h2>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          rows="5"
          placeholder="Write your problem here..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
        ></textarea>
        <button
          onClick={handlePostSubmit}
          className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Post Anonymously
        </button>
      </div>
      <div className="w-full max-w-lg mt-6">
        <h3 className="text-xl font-medium text-gray-800 mb-4">Posts</h3>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Share your first concern!</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((p) => (
              <li
                key={p.id}
                className="p-4 bg-gray-100 rounded-lg shadow-md text-gray-800"
              >
                {p.content}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Posting;
