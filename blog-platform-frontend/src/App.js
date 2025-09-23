import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import NewPost from "./pages/NewPost";
import AdminDashboard from "./pages/AdminDashboard";
import MatrixBackground from "./components/MatrixBackground";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <MatrixBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/new" element={<NewPost />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/posts/new" element={<PrivateRoute><NewPost /></PrivateRoute>} />
<Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
