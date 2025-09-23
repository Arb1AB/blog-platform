import React, { useEffect, useState } from "react";
import { fetchComments, addComment, upvoteComment } from "../api";

function CommentThread({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const loadComments = () => {
    fetchComments(postId)
      .then((data) => setComments(data))
      .catch(() => setComments([]));
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to comment.");
        return;
      }

      await addComment(postId, token, { content: newComment });
      setNewComment("");
      loadComments();
    } catch {
      alert("Failed to add comment");
    }
  };

  const handleUpvote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to upvote.");
        return;
      }

      await upvoteComment(id, token);
      loadComments();
    } catch {
      alert("Failed to upvote comment");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button className="btn" type="submit">
          Comment
        </button>
      </form>

      <div>
        {comments.map((c) => (
          <div key={c.id} style={{ marginLeft: c.parent ? "20px" : "0px" }}>
            <p>
              <b>{c.author}</b>: {c.content}
            </p>
            <small>{new Date(c.created_at).toLocaleString()}</small>
            <button className="btn" onClick={() => handleUpvote(c.id)}>
              ⬆ ({c.upvotes})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentThread;
