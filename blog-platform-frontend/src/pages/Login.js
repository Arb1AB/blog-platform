import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import { loginUser } from "../api";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [notif, setNotif] = useState(""); // ✅ local notification state
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form); // ✅ use the API function

      // ✅ store tokens consistently
      localStorage.setItem("token", res.access);
      localStorage.setItem("refresh", res.refresh);

      setNotif("✅ Login successful!");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      setNotif("❌ Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {/* ✅ Notification appears here */}
      {notif && <Notification message={notif} />}

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
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
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
