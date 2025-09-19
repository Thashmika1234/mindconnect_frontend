import React, { useEffect, useState } from "react";
import mindconnect from "../components/assests/mindconnect_logo.png";
import person_avater from "../components/assests/user_avater.png";
import message_icon from "../components/assests/message_icon.png";
import settings_icon from "../components/assests/settings_icon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DoctorPostCard from "../components/loginSignupComponents/doctor_post";

const RegularUserAccount = () => {
  const [displayName, setDisplayName] = useState("");
  const [profilePic, setProfilePic] = useState(person_avater);
  const [userType, setUserType] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

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
          if (res.data.success) {
            setDisplayName(res.data.username);
            setProfilePic(res.data.profile_pic_url || person_avater);
          }
        })
        .catch((err) => console.error("Profile fetch error:", err));

      // Fetch user posts
      const postsData = new FormData();
      postsData.append("user_id", user_id);

      axios
        .post("http://localhost/mindConnect/api/get_user_posts.php", postsData)
        .then((res) => {
          if (res.data.success) {
            setUserPosts(res.data.posts);
          }
        })
        .catch((err) => console.error("Posts fetch error:", err));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const toposting = () => navigate("/posting");
  const toRegularUserAccount = () => navigate("/regularUserAccount");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Map API user_type to badge text
  const getRoleText = () => {
    switch (userType) {
      case "doctor":
        return "Doctor";
      case "counsellor":
        return "Counsellor";
      default:
        return "Regular User";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-50 to-white shadow-lg border border-gray-300 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-12">
            <Link to={"/regularUserHomePage"}>
              <img src={mindconnect} alt="MindConnect Logo" className="w-60" />
            </Link>
          </div>
          <div className="flex gap-8">
            <div className="flex items-center gap-12 ml-auto text-blue-400 sm:text-base">
              <div className="hover:text-blue-700 cursor-pointer text-xl" onClick={() => navigate("/regularUserHomePage")}>Home</div>
              <div className="hover:text-blue-700 cursor-pointer text-xl" onClick={() => navigate("/about")}>About Us</div>
              <div className="hover:text-blue-700 cursor-pointer text-xl" onClick={() => navigate("/usernotification")}>Notifications</div>
            </div>
            <div>
              <button
                className="py-2 px-6 rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white text-base sm:text-lg font-semibold hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-400 transition duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-300 relative flex items-center p-3 rounded-lg shadow-xl mx-3 my-4">
        <div className="shadow-lg rounded-full bg-white border border-gray-300 w-28 h-28 p-2 flex items-center justify-center">
          <button onClick={toRegularUserAccount}>
            <img
              src={profilePic}
              alt="Regular user"
              className="w-24 h-24 rounded-full object-cover"
            />
          </button>
        </div>

        <div className="ml-6">
          <h1 className="text-white text-2xl font-semibold pb-4">
            {displayName || "Loading..."}
          </h1>
          <p className="text-white text-sm font-semibold bg-green-500 rounded-full px-3 py-1 inline-block shadow-md">
            {getRoleText()}
          </p>
        </div>

        <div className="absolute top-3 right-3 flex gap-9">
          <button onClick={() => navigate("/usernotification")}>
            <img src={message_icon} alt="Message Icon" className="w-9" />
          </button>
          <button onClick={() => navigate("/SettingPage")}>
            <img src={settings_icon} alt="Settings Icon" className="w-9" />
          </button>
        </div>
      </div>

      {/* Posting Button */}
      <div className="flex items-center justify-center p-3 rounded-lg shadow-xl bg-white mx-3 my-4">
        <button
          className="w-1/4 text-white bg-gradient-to-r from-blue-500 to-blue-700 font-semibold py-3 px-4 rounded-lg mx-1 mb-2 hover:from-blue-300 hover:to-blue-500 shadow-md transition-all sm:text-base md:text-lg"
          onClick={toposting}
        >
          What's on Your Mind?
        </button>
      </div>

      {/* User Posts */}
<div className="w-full flex justify-center px-3">
  <div className="w-full md:w-9/12 lg:w-6/12 flex flex-col gap-4 pb-10">
    <h2 className="text-lg font-semibold text-blue-700 mb-3">Your Posts</h2>
    {userPosts.length > 0 ? (
      userPosts.map((post) => {
        // Anonymize all posts
        const displayName = "Anonymous User";
        const profilePicUrl =
          "https://mindconnectstorage.blob.core.windows.net/profilepicture/default-avatar-profile-icon-social-600nw-1677509740.webp";

        return (
          <DoctorPostCard
            key={post.post_id}
            post={post}
            profilePic={profilePicUrl}
            displayName={displayName}
          />
        );
      })
    ) : (
      <p className="text-gray-500">You haven't posted anything yet.</p>
    )}
  </div>
</div>

    </div>
  );
};

export default RegularUserAccount;
