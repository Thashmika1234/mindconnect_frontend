import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const sendOtp = async () => {
    if (!email) {
      setError('Please enter your email.');
      return;
    }

    try {
      const response = await axios.post('http://localhost/mindConnect/api/send_otp.php', { email });
      if (response.data.success) {
        setOtpSent(true);
        setMessage('OTP has been sent to your email.');
        setError('');
      } else {
        setOtpSent(false);
        setError(response.data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setError('Server error. Try again later.');
      console.error(err);
    }
  };

  const submitOtp = async () => {
    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }

    try {
      const response = await axios.post('http://localhost/mindConnect/api/verify_otp.php', { email, otp });
      if (response.data.success) {
        setOtpVerified(true);
        setMessage('OTP verified. Please enter your new password.');
        setError('');
      } else {
        setError(response.data.message || 'Invalid OTP.');
      }
    } catch (err) {
      setError('Server error. Try again later.');
      console.error(err);
    }
  };

  const resetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError('Please fill in both password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost/mindConnect/api/reset_password.php', {
        email,
        password: newPassword,
      });

      if (response.data.success) {
        setMessage('Password reset successful. You can now login.');
        setError('');
        setOtpVerified(false);
        setOtpSent(false);
        setEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(response.data.message || 'Failed to reset password.');
      }
    } catch (err) {
      setError('Server error. Try again later.');
      console.error(err);
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.card}>
        <h2 style={styles.title}>Hi there! Forgot something? 🤔</h2>
        <p style={styles.subtitle}>
          No worries. Let’s reset your password and get you back in 💙
        </p>

        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        {!otpSent && (
          <p onClick={sendOtp} style={styles.sendOtp}>
            Send OTP
          </p>
        )}

        {otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
            />
            <button onClick={submitOtp} style={styles.button}>
              Submit OTP
            </button>
          </>
        )}

        {otpVerified && (
          <>
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Re-enter New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
            <button onClick={resetPassword} style={styles.button}>
              Reset Password
            </button>
          </>
        )}

        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  background: {
    height: '100vh',
    background: 'linear-gradient(to bottom right, #3b82f6, #f0f9ff)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#ffffff',
    padding: '40px 30px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#475569',
    marginBottom: '22px',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '15px',
  },
  sendOtp: {
    color: '#2563eb',
    cursor: 'pointer',
    fontWeight: '500',
    marginTop: '6px',
    textDecoration: 'underline',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '12px',
    marginTop: '10px',
    background: 'linear-gradient(to right, #2563eb, #60a5fa)',
    color: '#fff',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: '0.3s ease',
  },
  success: {
    color: 'green',
    fontSize: '14px',
    marginTop: '15px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '15px',
  },
};

export default ForgotPassword;
