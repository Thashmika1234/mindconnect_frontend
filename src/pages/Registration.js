import React, { useState } from "react";
import InputComponent from "../components/loginSignupComponents/InputComponent";
import user_icon from '../components/assests/person-295.png';
import email_icon from '../components/assests/mail-5924.png';
import password_icon from '../components/assests/login-password-11924.png';
import option_icon from '../components/assests/option.png';
import axios from "axios";

const Registration = () => {
    const [username,setusername] = useState("");
    const [email,setemail] = useState("");
    const [usertype, setusertype] = useState("");
    const [password,setpassword] = useState("");
    const [confirmpassword,setconfirmpassword] = useState("");



    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(email);
        console.log(username);


        var formData = new FormData();

        formData.append("username",username);
        formData.append("email",email);
        formData.append("usertype",usertype);
        formData.append("password",password);
        formData.append("confirmpassword",confirmpassword);

        axios.post('http://localhost/backend/login.php',formData)
        //thashmika
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-white to-blue-500">
            <div className="w-full mx-5 sm:w-2/3 md:w-1/2 lg:w-1/3 md:mx-auto shadow-lg p-4 sm:p-6 md:p-8 rounded-xl bg-white border-gray-300">
                <div className="header">
                    <div className="text-center font-bold text-3xl sm:text-3xl text-blue-800">
                        Register
                    </div>
                    <hr className="my-4 border-gray-200" />
                </div>

                
                <form className="flex flex-col gap-4 sm:gap-6" onSubmit={handleSubmit}>
                    <InputComponent icon={user_icon} placeholder="Username" inputtype="text" value={username} onChange = {setusername}/>
                    <InputComponent icon={email_icon} placeholder="Email" inputtype="email" value={email} onChange = {setemail}/>

                    {/* Dropdown */}
                    <div className="relative text-gray-400">
                        <img
                            src={option_icon}
                            alt="User Type Icon"
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 pointer-events-none"
                        />
                        <select
                            value={usertype}
                            //onChange={handleUserTypeChange}
                            onChange = {(e) => setusertype(e.target.value)}
                            className="w-full py-5 pl-14 pr-4 rounded-lg bg-blue-50 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="" disabled>Select User Type</option>
                            <option value="patient">Regular user</option>
                            <option value="doctor">Doctor</option>
                            <option value="counsellor">Counsellor</option>
                        </select>
                    </div>

                    <InputComponent icon={password_icon} placeholder="Password" inputtype="password" value={password} onChange = {setpassword}/>
                    <InputComponent icon={password_icon} placeholder="Confirm Password" inputtype="password" value={confirmpassword} onChange = {setconfirmpassword}/>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full py-2 px-6 rounded-lg bg-gradient-to-r from-blue-700 to-blue-300 text-white text-base sm:text-lg font-semibold hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-400 transition duration-300"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    );
};

export default Registration;
