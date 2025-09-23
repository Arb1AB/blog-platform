import React, { useState } from "react";
import App from "../App";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import { loginUser } from "../api";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [notif, setNotif] = useState("");   // ✅ local notification state
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);  // ✅ use the API function
      localStorage.setItem("access", res.access);
      localStorage.setItem("refresh", res.refresh);

      setNotif("✅ Login successful!");   // ✅ show notification
      setTimeout(() => navigate("/profile"), 1500); // small delay before redirect
    } catch (err) {
      setNotif("❌ Login failed. Please check your credentials."); // ✅ show error notification
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {/* ✅ Notification appears here */}
      {notif && <Notification message={notif} />}

      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
