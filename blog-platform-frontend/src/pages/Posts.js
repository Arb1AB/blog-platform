import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import App from "../App";
import PostCard from "../components/PostCard";
import { fetchPosts, upvotePost } from "../api";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then((data) => setPosts(data))
      .catch(() => setPosts([]));
  }, []);

  const handleUpvote = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to upvote.");
      return;
    }
    try {
      await upvotePost(id, token);
      // refresh posts after upvote
      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);
    } catch {
      alert("Failed to upvote post.");
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
              onUpvote={() => handleUpvote(post.id)} // pass handler to PostCard
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
