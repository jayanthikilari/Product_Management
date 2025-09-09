import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '80px',
        backgroundColor: '#F7DFC2',
        minHeight: '100vh',
        padding: '50px 20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1> Welcome to Product Management App</h1>
      <p>Manage your products easily with our app.</p>
      <Link to="/signup">
        <button style={{
          padding: "12px 20px",
          background: "blue",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "20px"
        }}>
          Go to Signup
        </button>
      </Link>
    </div>
  );
}

export default Home;
