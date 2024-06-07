import React from "react";
import { useNavigate } from "react-router-dom";

const SignOut = ({ onSignOut }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage if needed
    // localStorage.clear();
    onSignOut();
    navigate("/signIn");
  };

  const styles = {
    container: {
      textAlign: "center",
      margin: "20px auto",
      width: "80%",
      maxWidth: "600px",
      padding: "20px",
      boxSizing: "border-box",
    },
    heading: {
      fontSize: "2rem",
      marginBottom: "20px",
    },
    paragraph: {
      fontSize: "1.2rem",
      marginBottom: "20px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      cursor: "pointer",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#007bff",
      color: "#fff",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    // Responsive media queries
    '@media (max-width: 768px)': {
      container: {
        width: "90%",
        padding: "15px",
      },
      heading: {
        fontSize: "1.5rem",
      },
      paragraph: {
        fontSize: "1rem",
      },
      button: {
        padding: "8px 16px",
        fontSize: "0.9rem",
      },
    },
    '@media (max-width: 576px)': {
      container: {
        width: "95%",
        padding: "10px",
      },
      heading: {
        fontSize: "1.25rem",
      },
      paragraph: {
        fontSize: "0.9rem",
      },
      button: {
        padding: "6px 12px",
        fontSize: "0.8rem",
      },
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Logout Page</h1>
      <p style={styles.paragraph}>Are you sure you want to logout?</p>
      <button
        style={styles.button}
        onClick={handleLogout}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Logout
      </button>
    </div>
  );
};

export default SignOut;
