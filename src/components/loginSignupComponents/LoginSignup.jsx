import React, { useState } from 'react';
import axios from 'axios';
import user_icon from '../assests/person-295.png';
import password_icon from '../assests/login-password-11924.png';
import { useNavigate } from 'react-router-dom';
import InputComponent from './InputComponent';

export const LoginSignup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', username);
      formData.append('password', password);

      const response = await axios.post(
        'http://localhost/mindConnect/api/login.php',
        formData
      );

      if (response.data.success) {
        setError('');
        localStorage.setItem('user_id',response.data.user_id);
        navigate('/regularUserAccount');
      } else {
        setError(response.data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Login failed. Server error.');
      console.error('Login Error:', err);
    }
  };

  const toregistration = () => {
    navigate('/Registration');
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-white to-blue-500">
      <div className="w-full mx-5 sm:w-2/3 md:w-1/2 lg:w-1/3 md:mx-auto shadow-lg p-4 sm:p-6 md:p-8 rounded-2xl bg-white border-gray-300">
        <div className="header">
          <div className="text-center font-bold text-3xl text-blue-800">Sign In</div>
          <hr className="my-4 border-gray-200" />
        </div>
        <div className="flex flex-col gap-4">
          <InputComponent
            icon={user_icon}
            placeholder="Email"
            inputtype="text"
            value={username}
            onChange={setUsername}
          />
          <InputComponent
            icon={password_icon}
            placeholder="Password"
            inputtype="password"
            value={password}
            onChange={setPassword}
          />
          <div className="text-right mt-1 text-sm">
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate('/ForgotPassword')}
            >
              Forgot Password?
            </span>
          </div>
        </div>
        {error && <div className="text-red-600 text-sm mt-3 text-center">{error}</div>}
        <div className="mt-5 text-gray-600 text-center">
          Don't have an Account?{' '}
          <span className="text-blue-600 font-medium cursor-pointer" onClick={toregistration}>
            Register Here!
          </span>
        </div>
        <div className="mt-8">
          <button
            onClick={handleLogin}
            className="w-full py-2 px-6 rounded-lg bg-gradient-to-r from-blue-700 to-blue-300 text-white text-base font-semibold hover:from-blue-800 hover:to-blue-400 transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
