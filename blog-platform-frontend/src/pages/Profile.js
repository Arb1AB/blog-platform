import React, { useEffect, useState } from "react";
import API from "../api";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ bio: "", avatar: null });

  useEffect(() => {
    API.get("accounts/profile/")
      .then((res) => {
        setProfile(res.data);
        setForm({ bio: res.data.bio || "", avatar: null });
      })
      .catch(() => setProfile(null));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setForm({ ...form, avatar: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", form.bio);
    if (form.avatar) formData.append("avatar", form.avatar);

    await API.put("accounts/profile/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    window.location.reload();
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
