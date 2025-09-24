import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post, onUpvote, onDelete }) {
  return (
    <div style={{ borderBottom: "1px solid #660099", padding: "10px" }}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p>By {post.author} | {new Date(post.created_at).toLocaleString()}</p>
      <p>Upvotes: {post.upvotes} | Views: {post.views}</p>
      <div>
        {post.tags.map((tag) => (
          <span key={tag.id} style={{ marginRight: "5px", color: "#a64dff" }}>
            #{tag.name}
          </span>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        {/* ✅ Upvote button works globally */}
        {onUpvote && (
          <button className="btn" onClick={onUpvote} style={{ marginRight: "10px" }}>
            ⬆ Upvote
          </button>
        )}

        {/* ✅ Delete button works globally */}
        {onDelete && (
          <button className="btn" onClick={onDelete} style={{ background: "red", color: "white" }}>
            🗑 Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default PostCard;
