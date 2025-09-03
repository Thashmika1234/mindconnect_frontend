import React, { useEffect, useState } from "react";
import mindconnect from "../components/assests/mindconnect_logo.png";
import person_avater from "../components/assests/user_avater.png";
import appointment_icon from "../components/assests/appointment_icon.png";
import message_icon from "../components/assests/message_icon.png";
import settings_icon from "../components/assests/settings_icon.png";
import { Link, useNavigate } from "react-router-dom";
import UserPosts from "../components/posts/UserPosts"; // ✅ Import

const RegularUserAccount = () => {
  const [userInfo, setUserInfo] = useState({ name: "", role: "" });
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userIdStored = localStorage.getItem("user_id");

    if (userIdStored) {
      const parsedId = parseInt(userIdStored, 10);
      setUserId(parsedId);

      fetch("http://localhost/mindConnect/api/RegularUserAccount.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: parsedId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setUserInfo({ name: data.name, role: data.role });
          } else {
            console.error("Backend error:", data.message);
          }
        })
        .catch((error) => console.error("Fetch error:", error));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const toposting = () => {
    navigate("/posting");
  };

  const toRegularUserAccount = () => {
    navigate("/regularUserAccount");
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-50 to-white shadow-lg border border-gray-300 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-12">
            <Link to={"/login"}>
              <img src={mindconnect} alt="MindConnect Logo" className="w-60" />
            </Link>
          </div>

          <div className="flex gap-8">
            <div className="flex items-center gap-12 ml-auto text-blue-400 sm:text-base">
              <div className="hover:text-blue-700 cursor-pointer text-xl">
                Home
              </div>
              <div className="hover:text-blue-700 cursor-pointer text-xl">
                About Us
              </div>
              <div
                className="hover:text-blue-700 cursor-pointer text-xl"
                onClick={() => navigate("/NotificationPage")}
              >
                Notifications
              </div>
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
              src={person_avater}
              alt="Regular user"
              className="w-24 h-24 rounded-full"
            />
          </button>
        </div>

        <div className="ml-6">
          <h1 className="text-white text-2xl font-semibold pb-4">
            {userInfo.name || "Loading..."}
          </h1>
          <p className="text-white text-sm font-semibold bg-green-500 rounded-full px-3 py-1 inline-block shadow-md">
            {userInfo.role || "Regular user"}
          </p>
        </div>

        <div className="absolute top-3 right-3 flex gap-9">
          <button>
            <img src={appointment_icon} alt="Appointment Icon" className="w-9" />
          </button>
          <button>
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

      {/* ✅ User Posts Component */}
      {userId ? (
        <UserPosts userId={userId} />
      ) : (
        <p className="text-center text-gray-500">Loading your posts...</p>
      )}
    </div>
  );
};

export default RegularUserAccount;
