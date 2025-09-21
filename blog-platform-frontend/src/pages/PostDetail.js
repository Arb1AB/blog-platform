import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CommentThread from "../components/CommentThread";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    API.get(`posts/${id}/`)
      .then((res) => setPost(res.data))
      .catch(() => setPost(null));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>By {post.author} | {new Date(post.created_at).toLocaleString()}</p>
      <ReactMarkdown
        children={post.content}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>{children}</code>
            );
          }
        }}
      />
      <h3>Comments</h3>
      <CommentThread postId={post.id} />
    </div>
  );
}

export default PostDetail;
