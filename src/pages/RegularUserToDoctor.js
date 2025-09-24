import React, { useEffect, useState } from "react";
import mindconnect from "../components/assests/mindconnect_logo.png";
import DoctorPostCard from "../components/loginSignupComponents/doctor_post";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegularUserToDoctor = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [profilePic, setProfilePic] = useState("/default_avatar.png");
  const [userType, setUserType] = useState("");
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const type = localStorage.getItem("user_type");
    setUserType(type);

    if (user_id && type) {
      // Fetch profile info
      const profileData = new FormData();
      profileData.append("user_id", user_id);
      profileData.append("user_type", type);

      axios
        .post("http://localhost/mindConnect/api/get_user_profile.php", profileData)
        .then((res) => {
          if (res.data && res.data.success) {
            setDisplayName(res.data.username || "Unknown User");
            setProfilePic(res.data.profile_pic_url || "/default_avatar.png");
          }
        })
        .catch((err) => console.error("Profile fetch error:", err));

      // Fetch user posts
      const postsData = new FormData();
      postsData.append("user_id", user_id);

      axios
        .post("http://localhost/mindConnect/api/get_user_posts.php", postsData)
        .then((res) => {
          if (res.data && res.data.success && Array.isArray(res.data.posts)) {
            setUserPosts(res.data.posts);
          }
        })
        .catch((err) => console.error("Posts fetch error:", err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-50 to-white shadow-lg border border-gray-300 px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to={"/doctorhomepage"}>
            <img src={mindconnect} alt="MindConnect Logo" className="w-60" />
          </Link>
          <div className="flex gap-8">
            <div className="flex items-center gap-12 ml-auto text-blue-400 sm:text-base">
              <Link to={"/doctorhomepage"}>
                <div className="hover:text-blue-700 cursor-pointer text-2xl">Home</div>
              </Link>
              <Link to={"/about"}>
                <div className="hover:text-blue-700 cursor-pointer text-2xl">About Us</div>
              </Link>
              <Link to={"/doctornotification"}>
                <div className="hover:text-blue-700 cursor-pointer text-2xl">Notifications</div>
              </Link>
            </div>
            <button
              className="py-2 px-6 rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white text-lg sm:text-xl font-semibold hover:from-blue-800 hover:to-blue-400 transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-300 relative flex items-center p-3 shadow-xl mx-3 my-4 rounded-lg">
        <div className="shadow-lg bg-white border border-gray-300 w-28 h-28 p-2 flex items-center justify-center rounded-full">
          <Link to="/doctoraccount">
            <img
              src={profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </Link>
        </div>
        <div className="ml-6">
          <h1 className="text-white text-3xl font-semibold">{displayName || "Loading..."}</h1>
          <p className="text-white text-lg font-semibold bg-green-500 px-3 py-1 inline-block rounded-full shadow-md">
            {userType === "doctor"
              ? "Doctor"
              : userType === "counsellor"
              ? "Counsellor"
              : "User"}
          </p>
        </div>
      </div>

      {/* User Posts */}
      <div className="w-full flex justify-center px-3">
        <div className="w-full md:w-9/12 lg:w-6/12 flex flex-col gap-4 pb-10">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">Doctor's Posts</h2>
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <DoctorPostCard
                key={post.post_id}
                post={post}
                profilePic={profilePic}
                displayName={displayName}
              />
            ))
          ) : (
            <p className="text-gray-500">This doctor hasn't posted anything yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegularUserToDoctor;
