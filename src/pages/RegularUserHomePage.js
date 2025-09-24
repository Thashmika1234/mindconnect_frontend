import React, { useEffect, useState } from "react";
import mindconnect from "../components/assests/mindconnect_logo.png";
import person_avater from "../components/assests/user_avater.png";
import message_icon from "../components/assests/message_icon.png";
import settings_icon from "../components/assests/settings_icon.png";
import appointment_icon from "../components/assests/appointment_icon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DoctorPostCard from "../components/loginSignupComponents/doctor_post";

export default function RegularUserHomePage() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [profilePic, setProfilePic] = useState(person_avater);
  const [professionalPosts, setProfessionalPosts] = useState([]);

  // Doctor & Counsellor search
  const [searchQuery, setSearchQuery] = useState("");
  const [doctorResults, setDoctorResults] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const user_type = localStorage.getItem("user_type");

    if (!user_id || !user_type) {
      navigate("/");
      return;
    }

    // Fetch user profile
    const profileData = new FormData();
    profileData.append("user_id", user_id);
    profileData.append("user_type", user_type);

    axios
      .post("http://localhost/mindConnect/api/get_user_profile.php", profileData)
      .then((res) => {
        if (res.data.success) {
          setDisplayName(res.data.username);
          setProfilePic(res.data.profile_pic_url || person_avater);
        }
      })
      .catch((err) => console.error("Profile fetch error:", err));

    // Fetch all posts
    axios
      .get("http://localhost/mindConnect/api/get_all_posts.php")
      .then((res) => {
        if (res.data.success) {
          setProfessionalPosts(res.data.posts || []);
        }
      })
      .catch((err) => console.error("Posts fetch error:", err));
  }, [navigate]);

  // Live search with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!searchQuery.trim()) {
        setDoctorResults([]);
        return;
      }

      axios
        .get(`http://localhost/mindConnect/api/search_doctors.php?query=${encodeURIComponent(searchQuery)}`)
        .then((res) => {
          if (res.data.success) {
            setDoctorResults(res.data.results || []);
          } else {
            setDoctorResults([]);
          }
        })
        .catch((err) => console.error("Doctor search error:", err));
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-50 to-white shadow-lg border border-gray-300 px-6 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <Link to={"/regularUserHomePage"}>
            <img src={mindconnect} alt="MindConnect Logo" className="w-60" />
          </Link>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-12 text-blue-400 sm:text-base">
              <Link to={"/regularUserHomePage"}><div className="hover:text-blue-700 cursor-pointer text-xl">Home</div></Link>
              <Link to={"/about"}><div className="hover:text-blue-700 cursor-pointer text-xl">About Us</div></Link>
              <Link to={"/usernotification"}><div className="hover:text-blue-700 cursor-pointer text-xl">Notifications</div></Link>
            </div>
            <button
              onClick={handleLogout}
              className="py-2 px-6 rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white text-base sm:text-lg font-semibold hover:from-blue-800 hover:to-blue-400 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-300 relative flex items-center p-3 rounded-lg shadow-xl mx-3 my-4">
        <div className="shadow-lg rounded-full bg-white border border-gray-300 w-28 h-28 p-2 flex items-center justify-center">
          <Link to={"/regularUserAccount"}>
            <img src={profilePic} alt="User" className="w-24 h-24 rounded-full object-cover" />
          </Link>
        </div>
        <div className="ml-6">
          <h1 className="text-white text-2xl font-semibold pb-2">{displayName || "Loading..."}</h1>
          <p className="text-white text-sm font-semibold bg-green-500 rounded-full px-3 py-1 inline-block shadow-md">Regular User</p>
        </div>
        <div className="absolute top-3 right-3 flex gap-9">
          <button onClick={() => navigate("")}><img src={appointment_icon} alt="Appointment Icon" className="w-9" /></button>
          <button onClick={() => navigate("/usernotification")}><img src={message_icon} alt="Message Icon" className="w-9" /></button>
          <button onClick={() => navigate("/SettingPage")}><img src={settings_icon} alt="Settings Icon" className="w-9" /></button>
        </div>
      </div>

      {/* Posting Button */}
      <Link to={"/posting"}>
        <div className="flex items-center justify-center p-3 rounded-lg shadow-xl bg-white mx-3 my-4">
          <button className="w-1/4 text-white bg-gradient-to-r from-blue-500 to-blue-700 font-semibold py-3 px-4 rounded-lg mx-1 mb-2 hover:from-blue-300 hover:to-blue-500 shadow-md transition-all sm:text-base md:text-lg">
            What's on Your Mind?
          </button>
        </div>
      </Link>

      {/* Two-column layout */}
      <div className="mx-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side: Posts */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold text-blue-700 mb-3 pl-40">Latest Posts</h2>
          {professionalPosts && professionalPosts.length > 0 ? (
            professionalPosts.map((post) => {
              const isRegular = post.user_type === "normal";
              const displayName = isRegular ? "Anonymous User" : post.author_name;
              const profilePicUrl = isRegular
                ? "https://mindconnectstorage.blob.core.windows.net/profilepicture/default-avatar-profile-icon-social-600nw-1677509740.webp"
                : post.author_profile_pic || person_avater;

              return <DoctorPostCard key={post.post_id} post={post} profilePic={profilePicUrl} displayName={displayName} />;
            })
          ) : (
            <p className="text-gray-500">No posts available.</p>
          )}
        </div>

        {/* Right side: Doctor & Counsellor Search */}
        <div className="bg-white p-4 rounded-lg shadow-md h-fit sticky top-32 self-start mt-10">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">Find a Doctor or Counsellor</h2>
          <div className="flex mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or username..."
              className="w-full border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => setSearchQuery(searchQuery)}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>

          {doctorResults && doctorResults.length > 0 ? (
            <ul className="space-y-3 max-h-[60vh] overflow-y-auto">
              {doctorResults.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center gap-3 border-b pb-2 cursor-pointer hover:bg-blue-50 p-2 rounded"
                  onClick={() => navigate(`/doctorprofile/${doc.id}`)}
                >
                  <img
                    src={doc.profile_pic_url || person_avater}
                    alt="Professional"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className="text-gray-800 font-medium">{doc.display_name || doc.username}</span>
                  <span className="text-xs text-gray-500 ml-auto">{doc.role}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No professionals found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
