import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPost, upvotePost, deletePost } from "../api";
import CommentThread from "../components/CommentThread";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  const loadPost = async () => {
    try {
      const data = await fetchPost(id);
      setPost(data);
    } catch {
      setPost(null);
    }
  };

  useEffect(() => {
    loadPost();
  }, [id]);

  const handleUpvote = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to upvote.");
      return;
    }
    try {
      await upvotePost(id, token);
      await loadPost();
    } catch {
      alert("Failed to upvote post.");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete.");
      return;
    }
    try {
      await deletePost(id, token);
      navigate("/posts"); // ✅ go back to posts list after deletion
    } catch {
      alert("Failed to delete post.");
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>By {post.author} | {new Date(post.created_at).toLocaleString()}</p>
      <p>{post.content}</p>
      <p>Upvotes: {post.upvotes} | Views: {post.views}</p>

      <div style={{ marginTop: "10px" }}>
        <button className="btn" onClick={handleUpvote} style={{ marginRight: "10px" }}>
          ⬆ Upvote
        </button>
        <button className="btn" onClick={handleDelete} style={{ background: "red", color: "white" }}>
          🗑 Delete
        </button>
      </div>

      <h3>Comments</h3>
      <CommentThread postId={id} />
    </div>
  );
}

export default PostDetail;
