import React, { useEffect, useState } from "react";
import API from "../api";

function CommentThread({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = () => {
    API.get(`posts/${postId}/comments/`)
      .then((res) => setComments(res.data))
      .catch(() => setComments([]));
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`posts/${postId}/comments/`, { content: newComment });
      setNewComment("");
      fetchComments();
    } catch {
      alert("Failed to add comment");
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
        <button className="btn" type="submit">Comment</button>
      </form>

      <div>
        {comments.map((c) => (
          <div key={c.id} style={{ marginLeft: c.parent ? "20px" : "0px" }}>
            <p><b>{c.author}</b>: {c.content}</p>
            <small>{new Date(c.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

const handleUpvote = async (id) => {
  await API.post(`posts/comments/${id}/upvote/`);
  fetchComments();
};

// Inside map of comments
<button className="btn" onClick={() => handleUpvote(c.id)}>
  ⬆ ({c.upvotes})
</button>

export default CommentThread;
