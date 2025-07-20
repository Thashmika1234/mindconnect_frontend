import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const fonts = [
  "Arial", "Verdana", "Tahoma", "Georgia", "Times New Roman",
  "Courier New", "Lucida Console", "Trebuchet MS", "Impact", "Comic Sans MS"
];

const colors = [
  "#FFB6C1", "#ADD8E6", "#90EE90", "#FFFACD", "#FFA07A",
  "#E6E6FA", "#D3D3D3", "#F08080", "#AFEEEE", "#E0FFFF"
];

const Posting = () => {
  const [post, setPost] = useState("");
  const [font, setFont] = useState(fonts[0]);
  const [bgColor, setBgColor] = useState(colors[0]);
  const [fontSize, setFontSize] = useState(30);
  const navigate = useNavigate();

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 4, 72));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 4, 16));

  const handlePostSubmit = () => {
    if (post.trim()) {
      const newPost = {
        id: Date.now(),
        content: post,
        font,
        bgColor,
        fontSize,
      };
      const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      const updatedPosts = [newPost, ...savedPosts];
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      setPost("");

      // Navigate to homepage after successful post
      navigate("/regularUserHomePage"); // Replace "/" with your homepage route if different
    } else {
      alert("Please write something before posting.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-white flex flex-col items-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Express Your Thoughts</h2>

        <textarea
          className="w-full h-72 border border-gray-300 rounded-lg p-4 mb-6 resize-none"
          style={{ fontFamily: font, backgroundColor: bgColor, fontSize: `${fontSize}px` }}
          placeholder="Write your thoughts here..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />

        <div className="flex flex-wrap gap-6 mb-6 items-center justify-between">
          <div>
            <p className="mb-1 font-medium">Font</p>
            <select
              className="border p-2 rounded-lg"
              value={font}
              onChange={(e) => setFont(e.target.value)}
            >
              {fonts.map((f) => (
                <option key={f} value={f} style={{ fontFamily: f }}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-1 font-medium">Font Size</p>
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseFontSize}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xl font-bold"
              >
                -
              </button>
              <span className="text-lg font-semibold">{fontSize}px</span>
              <button
                onClick={increaseFontSize}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xl font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <p className="mb-1 font-medium">Background</p>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => setBgColor(color)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-2"
                  style={{
                    backgroundColor: color,
                    borderColor: bgColor === color ? "#000" : "transparent",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handlePostSubmit}
          className="w-full py-3 bg-blue-600 text-white rounded-lg text-xl font-semibold hover:bg-blue-700 transition"
        >
          Post Anonymously
        </button>
      </div>
    </div>
  );
};

export default Posting;
