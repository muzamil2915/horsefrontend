import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const apiUrl = 'https://horsejockey.onrender.com/updatedPassword';
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !oldPassword || !newPassword) {
      toast.error('Please fill in all fields.', { theme: 'colored' });
      return;
    }

    const requestBody = { email, oldPassword, newPassword };

    try {
      const response = await axios.put(apiUrl, requestBody, {
        headers: { 'Content-Type': 'application/json' }
      });

      toast.success('Password updated successfully', { theme: 'colored' });
      setIsSuccess(true);

      // Optionally, navigate to sign-in page after a brief moment
      setTimeout(() => {
        navigate('/signIn', { replace: true });
      }, 2000); // Wait for 2 seconds before redirecting
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password update failed. Please try again.';
      toast.error(errorMessage, { theme: 'colored' });
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-content">
          <h2 className="form-title">Change Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="input-group">
              <input
                name="oldPassword"
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
                type="password"
                placeholder="Enter your old password"
                required
              />
            </div>
            <div className="input-group">
              <input
                name="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type="password"
                placeholder="Enter your new password"
                required
              />
            </div>
            <div className="submit-group">
              <input
                type="submit"
                value="Change Password"
              />
            </div>
          </form>
          {isSuccess && (
            <div className="success-message">
              <p>Password updated successfully!</p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
      <style>
        {`
          .container {
            display: flex;
            justify-content: center; /* Center the form horizontally */
            align-items: flex-start; /* Aligns the form to the top */
            min-height: 100vh;
            padding: 10px;
          }
          .form-container {
            width: 100%;
            max-width: 500px;
            padding: 20px;
            margin: 0 auto; /* Center the form horizontally */
          }
          .form-content {
            border-radius: 15px;
            border: 1px solid #ccc;
            background: #fff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          .form-title {
            font-size: 1.5rem;
            margin-bottom: 20px;
            text-align: center;
          }
          .input-group {
            margin-bottom: 20px;
          }
          .input-group input {
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
          }
          .submit-group {
            text-align: center;
          }
          .submit-group input {
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            border: none;
            background: #025962;
            color: #fff;
            cursor: pointer;
          }
          .success-message {
            margin-top: 20px;
            text-align: center;
          }
          .success-message p {
            color: #28a745;
            font-weight: bold;
          }
          @media (max-width: 768px) {
            .form-title {
              font-size: 1.25rem;
            }
            .input-group input {
              padding: 8px;
            }
            .submit-group input {
              padding: 8px;
            }
          }
          @media (max-width: 480px) {
            .form-title {
              font-size: 1rem;
            }
            .input-group input {
              padding: 6px;
            }
            .submit-group input {
              padding: 6px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ChangePassword;
