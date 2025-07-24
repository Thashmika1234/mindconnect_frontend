import React, { useEffect, useState } from "react";
import mindconnect from "../components/assests/mindconnect_logo.png";
import person_avater from "../components/assests/user_avater.png";
import appointment_icon from "../components/assests/appointment_icon.png";
import message_icon from "../components/assests/message_icon.png";
import settings_icon from "../components/assests/settings_icon.png";
import { Link, useNavigate } from "react-router-dom";

const RegularUserAccount = () => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const storedLikes = JSON.parse(localStorage.getItem("postLikes")) || {};
    setPosts(storedPosts);
    setLikes(storedLikes);
  }, []);

  const toposting = () => {
    navigate("/posting");
  };

  const toRegularUserAccount = () => {
    navigate("/regularUserAccount");
  };

  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    const updatedLikes = { ...likes };
    delete updatedLikes[id];

    setPosts(updatedPosts);
    setLikes(updatedLikes);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    localStorage.setItem("postLikes", JSON.stringify(updatedLikes));
  };

  const toggleLike = (postId) => {
    const updatedLikes = {
      ...likes,
      [postId]: !likes[postId]
    };
    setLikes(updatedLikes);
    localStorage.setItem("postLikes", JSON.stringify(updatedLikes));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-50 to-white shadow-lg border border-gray-300 px-6 py-3">

        <div className="flex items-center justify-between">
          <div className="flex gap-12">
            <Link to={"/login"}>
              <img src={mindconnect} alt="MindConnect Logo" className="w-60" />
            </Link>
          </div>

          <div className="flex gap-8">
            <div className="flex items-center gap-12 ml-auto text-blue-400 sm:text-base">
              <div className="hover:text-blue-700 cursor-pointer text-xl">Home</div>
              <div className="hover:text-blue-700 cursor-pointer text-xl">About Us</div>
              <div className="hover:text-blue-700 cursor-pointer text-xl">Notifications</div>
            </div>

            <div>
              <button className="py-2 px-6 rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white text-base sm:text-lg font-semibold hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-400 transition duration-300">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-gradient-to-r from-blue-700 to-blue-300 relative flex items-center p-3 rounded-lg shadow-xl mx-3 my-4">
        <div className="shadow-lg rounded-full bg-white border border-gray-300 w-28 h-28 p-2 flex items-center justify-center">
          <button onClick={toRegularUserAccount}>
            <img src={person_avater} alt="Regular user" className="w-24 h-24 rounded-full" />
          </button>
        </div>

        <div className="ml-6">
          <h1 className="text-white text-2xl font-semibold pb-4">Mr.Akila Sudeepa</h1>
          <p className="text-white text-sm font-semibold bg-green-500 rounded-full px-3 py-1 inline-block shadow-md">
            Regular user
          </p>
        </div>

        <div className="absolute top-3 right-3 flex gap-9">
          <button>
            <img src={appointment_icon} alt="Appointment Icon" className="w-9" />
          </button>
          <button>
            <img src={message_icon} alt="Message Icon" className="w-9" />
          </button>
          <button>
            <img src={settings_icon} alt="Settings Icon" className="w-9" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center p-3 rounded-lg shadow-xl bg-white mx-3 my-4">
        <button
          className="w-1/4 text-white bg-gradient-to-r from-blue-500 to-blue-700 font-semibold py-3 px-4 rounded-lg mx-1 mb-2 hover:from-blue-300 hover:to-blue-500 shadow-md transition-all sm:text-base md:text-lg"
          onClick={toposting}
        >
          What's on Your Mind?
        </button>
      </div>

      <div className="flex flex-col items-center gap-10 px-4 pb-20">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-xl">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="w-[60%] flex flex-col items-center">
              <div
                className="relative rounded-2xl shadow-xl px-10 py-10"
                style={{
                  backgroundColor: post.bgColor,
                  fontFamily: post.font,
                  fontSize: `${post.fontSize}px`,
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "360px",
                }}
              >
                <span>{post.content}</span>
                <button
                  className="absolute top-2 right-4 text-red-600 text-3xl font-bold hover:text-red-800"
                  onClick={() => handleDelete(post.id)}
                  title="Delete post"
                >
                  ×
                </button>
              </div>

              {/* Like/Comment/Share buttons below post */}
              <div className="w-full border-t border-gray-300 mt-3 pt-2 px-4">
                <div className="flex justify-around text-gray-700 text-sm font-semibold">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1 ${
                      likes[post.id] ? "text-blue-600" : "hover:text-blue-600"
                    }`}
                  >
                    👍 Like
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    💬 Comment
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    📤 Send
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    ↗️ Share
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RegularUserAccount;
