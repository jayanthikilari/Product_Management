import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      setMessage(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px",backgroundColor: "#F7DFC2", minHeight: "100vh"  }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }}/>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }}/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }}/>
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", background: "blue", color: "white", border: "none", borderRadius: "5px" }}>
          Signup
        </button>
      </form>
      {message && <p style={{ marginTop: "15px", color: "green" }}>{message}</p>}
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "transparent",
            border: "none",
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;
