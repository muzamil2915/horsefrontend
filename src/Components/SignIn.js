import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const SignIn = () => {
  const apiUrl = 'https://horsejockey.onrender.com/signIn';
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = { email, password };

    try {
      const response = await axios.post(apiUrl, requestBody, {
        headers: { 'Content-Type': 'application/json' }
      });
      dispatch(signIn(email));
      // localStorage.setItem("email", email); 
      navigate('/class', { replace: true }); 
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage, { theme: 'colored' });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.formWrapper}>
          <div style={styles.formContent}>
            <h2 style={styles.title}>Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.inputGroup}>
                <input
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter your email"
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <input
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Enter Your Password"
                  style={styles.input}
                />
              </div>
              <div style={styles.buttonContainer}>
                <input
                  type="submit"
                  style={styles.submitButton}
                  value="Sign in"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '0 20px',
  },
  formContainer: {
    width: '100%',
    maxWidth: '500px',
  },
  formWrapper: {
    borderRadius: '15px',
    border: '1px solid #ccc',
    background: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  formContent: {
    padding: '20px',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  buttonContainer: {
    textAlign: 'center',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    background: '#025962',
    color: '#fff',
    cursor: 'pointer',
  },
  // Media Queries
  '@media (max-width: 768px)': {
    container: {
      padding: '0 10px',
    },
    formContainer: {
      maxWidth: '400px',
    },
    title: {
      fontSize: '1.25rem',
    },
  },
  '@media (max-width: 576px)': {
    formWrapper: {
      padding: '15px',
    },
    input: {
      padding: '8px',
    },
    submitButton: {
      padding: '8px',
    },
  },
};

export default SignIn;
