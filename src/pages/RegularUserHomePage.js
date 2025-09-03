import React, { useEffect, useState } from "react";
import mindconnect from "../components/assests/mindconnect_logo.png";
import person_avater from "../components/assests/user_avater.png";
import appointment_icon from "../components/assests/appointment_icon.png";
import message_icon from "../components/assests/message_icon.png";
import settings_icon from "../components/assests/settings_icon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegularUserHomePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [randomPosts, setRandomPosts] = useState([]); // new state for others' posts

  useEffect(() => {
    const userId = localStorage.getItem("user_id"); // must be stored after login

    if (!userId) {
      navigate("/login");
      return;
    }

    axios
      .post("https://.php", {
        user_id: userId,
      })
      .then((response) => {
        if (response.data.success) {
          setUserData(response.data.user);
          setUserPosts(response.data.own_posts); // updated key
          setRandomPosts(response.data.random_posts); // new posts from others
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching user homepage data:", error);
      });
  }, [navigate]);

  return (
    <div>
      <nav className="bg-gradient-to-r from-blue-50 to-white shadow-lg border border-gray-300 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-12">
            <Link to={"/login"}>
              <img src={mindconnect} alt="MindConnect Logo" className="w-60" />
            </Link>
          </div>

          <div className="flex gap-8">
            <div className="flex items-center gap-12 ml-auto text-blue-400 sm:text-base">
              <Link to={"/regularUserHomePage"}>
                <div className="hover:text-blue-700 cursor-pointer text-xl">Home</div>
              </Link>
              <div className="hover:text-blue-700 cursor-pointer text-xl">About Us</div>
              <div className="hover:text-blue-700 cursor-pointer text-xl">Notifications</div>
            </div>

            <Link to={"/HomePage"}>
              <div>
                <button className="py-2 px-6 rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white text-base sm:text-lg font-semibold hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-400 transition duration-300">
                  Logout
                </button>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <div className="bg-gradient-to-r from-blue-700 to-blue-300 relative flex items-center p-3 rounded-lg shadow-xl mx-3 my-4">
        <div className="shadow-lg rounded-full bg-white border border-gray-300 w-28 h-28 p-2 flex items-center justify-center">
          <Link to={"/regularUserAccount"}>
            <button>
              <img
                src={userData?.profile_pic || person_avater}
                alt="Regular user"
                className="w-24 h-24 rounded-full"
              />
            </button>
          </Link>
        </div>

        <div className="ml-6">
          <h1 className="text-white text-2xl font-semibold pb-4">
            {userData ? userData.name : "Loading..."}
          </h1>
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

      <Link to={"/posting"}>
        <div className="flex items-center justify-center p-3 rounded-lg shadow-xl bg-white mx-3 my-4">
          <button className="w-1/4 text-white bg-gradient-to-r from-blue-500 to-blue-700 font-semibold py-3 px-4 rounded-lg mx-1 mb-2 hover:from-blue-300 hover:to-blue-500 shadow-md transition-all sm:text-base md:text-lg">
            What's on Your Mind?
          </button>
        </div>
      </Link>

      {/* Your Posts */}
      <div className="mx-4 mt-4">
        <h2 className="text-lg font-semibold text-blue-700 mb-3">Your Posts</h2>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post.post_id} className="bg-white shadow-md p-4 rounded-lg mb-4">
              <p className="text-gray-800">{post.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Posted on {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You haven't posted anything yet.</p>
        )}
      </div>

      {/* Other Users' Posts */}
      <div className="mx-4 mt-8">
        <h2 className="text-lg font-semibold text-blue-700 mb-3">Latest from Others</h2>
        {randomPosts.length > 0 ? (
          randomPosts.map((post) => (
            <div key={post.post_id} className="bg-white shadow-md p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-blue-600">{post.title}</h3>
              <p className="text-gray-800 mt-2">{post.content}</p>
              <p className="text-sm text-gray-500 mt-1">
                By {post.author_name} | Category: {post.category} |{" "}
                {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No posts from others available.</p>
        )}
      </div>
    </div>
  );
}
