
import { useState } from "react";

function Settings() {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert(`Username: ${username}\nProfile Picture: ${profilePic?.name || "Not Changed"}`);
    // Add backend save logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Settings
        </h2>

        {/* Username Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-semibold">Update username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

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
            <img
              src={preview}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow"
            />
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Settings;
