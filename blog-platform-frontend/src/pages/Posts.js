import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { fetchPosts, upvotePost, deletePost } from "../api";

function Posts() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch {
      setPosts([]);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleUpvote = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to upvote.");
      return;
    }
    try {
      await upvotePost(id, token);
      await loadPosts();
    } catch {
      alert("Failed to upvote post.");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete a post.");
      return;
    }
    try {
      await deletePost(id, token);
      await loadPosts();
    } catch {
      alert("Failed to delete post.");
    }
  };

  return (
    <div>
      <h2>All Posts</h2>
      <Link to="/posts/new" className="btn">New Post</Link>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onUpvote={() => handleUpvote(post.id)}
              onDelete={() => handleDelete(post.id)}
            />
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </div>
  );
}

export default Posts;
