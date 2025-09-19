// src/pages/Settings.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Settings() {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [userType, setUserType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const type = localStorage.getItem("user_type");
    const storedUsername = localStorage.getItem("username") || "";
    const storedDisplayName = localStorage.getItem("display_name") || "";
    setUserType(type || "");
    setUsername(storedUsername);
    setDisplayName(storedDisplayName);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const user_id = localStorage.getItem("user_id");
    const user_type = localStorage.getItem("user_type");

    if (!user_id) {
      alert("You must be logged in.");
      return;
    }

    if (!username.trim()) {
      alert("Username cannot be empty.");
      return;
    }

    const form = new FormData();
    form.append("user_id", user_id);
    form.append("user_type", user_type || "");
    form.append("username", username.trim());
    // only include display_name for doctor/counsellor
    if (user_type === "doctor" || user_type === "counsellor") {
      form.append("display_name", displayName.trim());
    }
    if (profilePic) {
      form.append("profile_pic", profilePic);
    }

    setSubmitting(true);
    try {
      const { data } = await axios.post(
        "http://localhost/mindConnect/api/update_profile.php",
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data.success) {
        // Optionally update localStorage fields
        if (data.username) localStorage.setItem("username", data.username);
        if (data.profile_pic_url) localStorage.setItem("profile_pic_url", data.profile_pic_url);
        if (data.display_name) localStorage.setItem("display_name", data.display_name);

        // redirect by user type
        const ut = user_type;
        if (ut === "normal" || ut === "regular") navigate("/regularUserHomePage");
        else if (ut === "doctor") navigate("/doctorhomepage");
        else if (ut === "counsellor") navigate("/doctorhomepage");
        else if (ut === "admin") navigate("/Adminpannel");
        else navigate("/"); // fallback
      } else {
        alert(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Update profile error:", err);
      alert("An error occurred while updating profile. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Settings</h2>

        {/* Username Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-semibold">Update Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Display Name Field for Doctors & Counsellors */}
        {(userType === "doctor" || userType === "counsellor") && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-semibold">Update Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        {/* Profile Picture Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-semibold">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg file:bg-blue-100 file:text-blue-700 file:border-none file:px-4 file:py-2 file:rounded-lg hover:file:bg-blue-200 cursor-pointer"
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="mb-4 flex flex-col items-center">
            <p className="text-gray-600 mb-2">Preview:</p>
            <img src={preview} alt="Profile Preview" className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow" />
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={submitting}
          className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 ${
            submitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default Settings;
