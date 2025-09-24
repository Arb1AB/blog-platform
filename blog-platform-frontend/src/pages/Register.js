import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api"; // ✅ import the API function
import Notification from "../components/Notification"; // ✅ added notification

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [notif, setNotif] = useState(""); // ✅ local notification
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form); // ✅ use imported function
      setNotif("✅ Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setNotif("❌ Registration failed. Try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {/* ✅ Show feedback */}
      {notif && <Notification message={notif} />}

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button className="btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
