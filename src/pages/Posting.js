import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const fonts = [
  "Arial","Verdana","Tahoma","Georgia","Times New Roman",
  "Courier New","Lucida Console","Trebuchet MS","Impact","Comic Sans MS"
];

const colors = [
  "#FFB6C1","#ADD8E6","#90EE90","#FFFACD","#FFA07A",
  "#E6E6FA","#D3D3D3","#F08080","#AFEEEE","#E0FFFF"
];

const Posting = () => {
  const [post, setPost] = useState("");
  const [font, setFont] = useState(fonts[0]);
  const [bgColor, setBgColor] = useState(colors[0]);
  const [fontSize, setFontSize] = useState(30);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const increaseFontSize = () => setFontSize((p) => Math.min(p + 4, 72));
  const decreaseFontSize = () => setFontSize((p) => Math.max(p - 4, 16));

  const handlePostSubmit = async () => {
    const uid = localStorage.getItem("user_id"); // set during login
    if (!uid || Number(uid) <= 0) {
      alert("You must be logged in. Missing user_id.");
      return;
    }
    if (!post.trim()) {
      alert("Please write something before posting.");
      return;
    }

    const newPost = {
      user_id: Number(uid),
      title: "Untitled",
      content: post,
      category: "General",
    };

    setSubmitting(true);
    try {
      const resp = await fetch("http://localhost/mindConnect/services/create_post.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      const text = await resp.text(); // read raw text first
      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        console.error("Server did not return JSON. Raw response:", text);
        alert("Server returned an invalid response. Check console for details.");
        return;
      }

      if (resp.ok && result?.status === "success") {
        setPost("");
        navigate("/regularUserAccount");
      } else {
        alert(result?.message || "Failed to create post.");
      }
    } catch (err) {
      console.error("Network/Fetch error:", err);
      alert("Something went wrong. Check your backend URL/CORS.");
    } finally {
      setSubmitting(false);
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
            <select className="border p-2 rounded-lg" value={font} onChange={(e) => setFont(e.target.value)}>
              {fonts.map((f) => (
                <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-1 font-medium">Font Size</p>
            <div className="flex items-center gap-2">
              <button onClick={decreaseFontSize} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xl font-bold">-</button>
              <span className="text-lg font-semibold">{fontSize}px</span>
              <button onClick={increaseFontSize} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xl font-bold">+</button>
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
                  style={{ backgroundColor: color, borderColor: bgColor === color ? "#000" : "transparent" }}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handlePostSubmit}
          disabled={submitting}
          className={`w-full py-3 rounded-lg text-xl font-semibold transition ${
            submitting ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {submitting ? "Posting..." : "Post Anonymously"}
        </button>
      </div>
    </div>
  );
};

export default Posting;
