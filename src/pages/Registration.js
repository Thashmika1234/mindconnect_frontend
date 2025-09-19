import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputComponent from "../components/loginSignupComponents/InputComponent";
import email_icon from '../components/assests/mail-5924.png';
import password_icon from '../components/assests/login-password-11924.png';
import option_icon from '../components/assests/option.png';

import axios from "axios";

const Registration = () => {
    const [username, setUsername] = useState("");
    const [displayname, setDisplayname] = useState(""); // NEW state
    const [email, setEmail] = useState("");
    const [usertype, setUsertype] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [error, setError] = useState("");
    const [document, setDocument] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!username || !email || !usertype || !password || !confirmpassword) {
            setError("Please fill in all required fields.");
            return;
        }

        if (password !== confirmpassword) {
            setError("Passwords do not match.");
            return;
        }

        if ((usertype === "doctor" || usertype === "counsellor") && (!document || !displayname)) {
            setError("Please upload a verification document and enter your display name.");
            return;
        }

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("usertype", usertype);
        formData.append("password", password);
        formData.append("confirmpassword", confirmpassword);

        if (displayname) {
            formData.append("displayname", displayname); // ✅ Send displayname
        }

        if (document) {
            formData.append("verification_document", document);
        }

        try {
            const response = await axios.post("http://localhost/mindConnect/api/registration.php", formData);

            if (response.data.success) {
                navigate("/RegularUserHomepage");
            } else {
                setError(response.data.message || "Registration failed.");
            }
        } catch (err) {
            setError("An error occurred while registering.");
            console.error("Registration Error:", err);
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-white to-blue-500">
            <div className="w-full mx-5 sm:w-2/3 md:w-1/2 lg:w-1/3 md:mx-auto shadow-lg p-4 sm:p-6 md:p-8 rounded-xl bg-white border-gray-300">
                <div className="text-center font-bold text-3xl text-blue-800 mb-4">Register</div>

                {error && (
                    <div className="text-red-600 text-center font-semibold mb-4">
                        {error}
                    </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full py-3 px-4 rounded-lg border bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <InputComponent
                        icon={email_icon}
                        placeholder="Email"
                        inputtype="email"
                        value={email}
                        onChange={setEmail}
                        required
                    />

                    <div className="relative text-gray-400">
                        <img
                            src={option_icon}
                            alt="User Type Icon"
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 pointer-events-none"
                        />
                        <select
                            value={usertype}
                            onChange={(e) => setUsertype(e.target.value)}
                            required
                            className="w-full py-5 pl-14 pr-4 rounded-lg bg-blue-50 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="" disabled>Select User Type</option>
                            <option value="normal">Regular user</option>
                            <option value="doctor">Doctor</option>
                            <option value="counsellor">Counsellor</option>
                        </select>
                    </div>

                    {/* ✅ Show Displayname if doctor/counsellor */}
                    {(usertype === "doctor" || usertype === "counsellor") && (
                        <input
                            type="text"
                            placeholder="Display Name"
                            className="w-full py-3 px-4 rounded-lg border bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={displayname}
                            onChange={(e) => setDisplayname(e.target.value)}
                            required
                        />
                    )}

                    {/* ✅ Show document upload if doctor/counsellor */}
                    {(usertype === "doctor" || usertype === "counsellor") && (
                        <div className="border-2 border-dashed border-blue-400 rounded-lg p-4 bg-blue-50 text-center">
                            <label htmlFor="document" className="block text-blue-700 font-semibold mb-2">
                                Upload NIC and Proof Document (PDF)
                            </label>
                            <input
                                type="file"
                                id="document"
                                accept="application/pdf"
                                onChange={(e) => setDocument(e.target.files[0])}
                                className="w-full text-sm text-gray-700"
                            />
                            {document && (
                                <p className="mt-2 text-green-600">Selected: {document.name}</p>
                            )}
                        </div>
                    )}

                    <InputComponent
                        icon={password_icon}
                        placeholder="Password"
                        inputtype="password"
                        value={password}
                        onChange={setPassword}
                        required
                    />
                    <InputComponent
                        icon={password_icon}
                        placeholder="Confirm Password"
                        inputtype="password"
                        value={confirmpassword}
                        onChange={setConfirmpassword}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full py-2 px-6 rounded-lg bg-gradient-to-r from-blue-700 to-blue-300 text-white text-lg font-semibold hover:from-blue-800 hover:to-blue-500 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
