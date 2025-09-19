import React, { useEffect, useState } from "react";
import mindconnect from "../components/assests/mindconnect_logo.png";
import appointment_icon from "../components/assests/appointment_icon.png";
import settings_icon from "../components/assests/settings_icon.png";
import message_icon from "../components/assests/message_icon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import person_avater from "../components/assests/user_avater.png";
import DoctorPostCard from "../components/loginSignupComponents/doctor_post";

const DoctorHomePage = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userType, setUserType] = useState("");
  const [allPosts, setAllPosts] = useState([]);

  const ANONYMOUS_NAME = "Anonymous User";
  const ANONYMOUS_PIC =
    "https://mindconnectstorage.blob.core.windows.net/profilepicture/default-avatar-profile-icon-social-600nw-1677509740.webp";

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const type = localStorage.getItem("user_type");
    setUserType(type);

    if (!user_id || !type) {
      navigate("/");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("user_type", type);

    // Fetch profile info
    axios
      .post("http://localhost/mindConnect/api/get_user_profile.php", formData)
      .then((res) => {
        if (res.data.success) {
          setDisplayName(res.data.username);
          setProfilePic(res.data.profile_pic_url || "/default_avatar.png");
        }
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });

    // Fetch all posts
    axios
      .get("http://localhost/mindConnect/api/get_all_posts.php")
      .then((res) => {
        if (res.data.success) {
          setAllPosts(res.data.posts);
        }
      })
      .catch((err) => console.error("Posts fetch error:", err));
  }, [navigate]);

  const todoctoraccount = () => navigate("/doctoraccount");
  const tosetting = () => navigate("/SettingPage");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-50 to-white shadow-lg border border-gray-300 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-12">
            <Link to={"/doctorhomepage"}>
              <img src={mindconnect} alt="MindConnect Logo" className="w-60" />
            </Link>
          </div>
          <div className="flex gap-8">
            <div className="flex items-center gap-12 ml-auto text-blue-400 sm:text-base">
              <Link to={"/doctorhomepage"}>
                <div className="hover:text-blue-700 cursor-pointer text-2xl">
                  Home
                </div>
              </Link>
              <Link to={"/about"}>
                <div className="hover:text-blue-700 cursor-pointer text-2xl">
                  About Us
                </div>
              </Link>
              <Link to={"/doctornotification"}>
                <div className="hover:text-blue-700 cursor-pointer text-2xl">
                  Notifications
                </div>
              </Link>
            </div>
            <div>
              <button
                className="py-2 px-6 rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white text-lg sm:text-xl font-semibold hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-400 transition duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-300 relative flex items-center p-3 shadow-xl mx-3 my-4 rounded-lg">
        <div className="shadow-lg bg-white border border-gray-300 w-28 h-28 p-2 flex items-center justify-center rounded-full">
          <button onClick={todoctoraccount}>
            <img
              src={profilePic || "/default_avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </button>
        </div>

        <div className="ml-6">
          <h1 className="text-white text-3xl font-semibold">
            {displayName || "Loading..."}
          </h1>
          <p className="text-white text-lg font-semibold bg-green-500 px-3 py-1 inline-block rounded-full shadow-md">
            {userType === "doctor" ? "Doctor" : "Counsellor"}
          </p>
        </div>

        <div className="absolute top-3 right-3 flex gap-9">
          <button onClick={() => navigate("/doctoravailabilityupdate")}>
            <img src={appointment_icon} alt="Appointment Icon" className="w-9" />
          </button>
          <button onClick={() => navigate("/doctornotification")}>
            <img src={message_icon} alt="Message Icon" className="w-9" />
          </button>
          <button onClick={tosetting}>
            <img src={settings_icon} alt="Settings Icon" className="w-9" />
          </button>
        </div>
      </div>

      {/* New Post Button */}
      <Link to={"/posting"}>
        <div className="flex items-center justify-center p-3 shadow-xl bg-white mx-3 my-4">
          <button className="w-1/4 text-white bg-gradient-to-r from-blue-500 to-blue-700 font-semibold py-3 px-4 rounded-lg mx-1 mb-2 hover:from-blue-300 hover:to-blue-500 shadow-md transition-all text-lg md:text-xl">
            New Post
          </button>
        </div>
      </Link>

      {/* Posts Section */}
      <div className="mx-4 mt-8">
        <h2 className="text-lg font-semibold text-blue-700 mb-3">Latest Posts</h2>
        {allPosts.length > 0 ? (
          allPosts.map((post) => {
            // Anonymize regular users
            const isRegular = post.user_type === "normal";
            const postName = isRegular ? ANONYMOUS_NAME : post.author_name;
            const postPic = isRegular
              ? ANONYMOUS_PIC
              : post.author_profile_pic || person_avater;

            return (
              <DoctorPostCard
                key={post.post_id}
                post={post}
                profilePic={postPic}
                displayName={postName}
              />
            );
          })
        ) : (
          <p className="text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorHomePage;
