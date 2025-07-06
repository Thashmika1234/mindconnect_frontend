import React from 'react';
import user_icon from '../assests/person-295.png';
import password_icon from '../assests/login-password-11924.png';
import { useNavigate } from 'react-router-dom';
import InputComponent from './InputComponent';

export const LoginSignup = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };

  const toregisteration = () => {
    navigate("/Registration");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-white to-blue-500">
      <div className="w-full mx-5 sm:w-2/3 md:w-1/2 lg:w-1/3 md:mx-auto shadow-lg p-4 sm:p-6 md:p-8 rounded-2xl bg-white border-gray-300">
        <div className="header">
          <div className="text-center font-bold text-3xl sm:text-3xl text-blue-800">Sign In</div>
          <hr className="my-4 border-gray-200" />
        </div>
        <div className="flex flex-col gap-4 sm:gap-4">
          <InputComponent icon={user_icon} placeholder="Username" inputtype="text" />
          <InputComponent icon={password_icon} placeholder="Password" inputtype="password" />
        </div>
        <div className="mt-5 text-gray-600 text-center">
          Don't have an Account?{' '}
          <span className="text-blue-600 font-medium cursor-pointer" onClick={toregisteration}>Register Here!</span>
        </div>
        <div className="mt-8">
          <button
            onClick={handleLogin}
            className="w-full py-2 px-6 rounded-lg bg-gradient-to-r from-blue-700 to-blue-300 text-white text-base sm:text-lg font-semibold hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-400 transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};