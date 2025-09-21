import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function NewPost() {
  const [form, setForm] = useState({ title: "", content: "", tags: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = form.tags.split(",").map((t) => ({ name: t.trim() }));
      await API.post("posts/", { ...form, tags: tagsArray });
      navigate("/posts");
    } catch {
      alert("Failed to create post");
    }
  };

  return (
    <div>
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <textarea name="content" placeholder="Write in Markdown..." rows="10" onChange={handleChange} />
        <input name="tags" placeholder="Tags (comma separated)" onChange={handleChange} />
        <button className="btn" type="submit">Publish</button>
      </form>
      <h3>Preview</h3>
      <ReactMarkdown>{form.content}</ReactMarkdown>
    </div>
  );
}

export default NewPost;
