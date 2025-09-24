import React, { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "../api"; // import needed functions
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ bio: "", avatar: null });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile(token)
        .then((data) => {
          setProfile(data);
          setForm({ bio: data.bio || "", avatar: null });
        })
        .catch(() => {
          setProfile(null);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setForm({ ...form, avatar: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("bio", form.bio);
    if (form.avatar) formData.append("avatar", form.avatar);

    try {
      await updateProfile(token, formData);
      window.location.reload();
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <img
        src={profile.avatar ? profile.avatar : "https://via.placeholder.com/100"}
        alt="avatar"
        width="100"
      />
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Reputation: {profile.reputation}</p>

      <form onSubmit={handleSubmit}>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Bio"
        />
        <input type="file" name="avatar" onChange={handleChange} />
        <button className="btn" type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
