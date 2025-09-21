import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import PostCard from "../components/PostCard";

const handleUpvote = async (id) => {
  await API.post(`posts/${id}/upvote/`);
  window.location.reload();
};

// Inside PostCard component
<button className="btn" onClick={() => handleUpvote(post.id)}>
  ⬆ Upvote ({post.upvotes})
</button>

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("posts/")
      .then((res) => setPosts(res.data))
      .catch(() => setPosts([]));
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      <Link to="/posts/new" className="btn">New Post</Link>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </div>
  );
}

export default Posts;
