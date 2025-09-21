import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div style={{ borderBottom: "1px solid #660099", padding: "10px" }}>
      <h3><Link to={`/posts/${post.id}`}>{post.title}</Link></h3>
      <p>By {post.author} | {new Date(post.created_at).toLocaleString()}</p>
      <p>Upvotes: {post.upvotes} | Views: {post.views}</p>
      <div>
        {post.tags.map((tag) => (
          <span key={tag.id} style={{ marginRight: "5px", color: "#a64dff" }}>
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PostCard;
