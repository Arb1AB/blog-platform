const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

// 🔹 Posts
export async function fetchPosts() {
  const response = await fetch(`${API_BASE_URL}/posts/`);
  return response.json();
}

export async function fetchPost(slug) {
  const response = await fetch(`${API_BASE_URL}/posts/${slug}/`);
  return response.json();
}

export async function createPost(token, postData) {
  const response = await fetch(`${API_BASE_URL}/posts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });
  return response.json();
}

export async function upvotePost(id, token) {
  const response = await fetch(`${API_BASE_URL}/posts/${id}/upvote/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

export async function fetchAnalytics() {
  const response = await fetch(`${API_BASE_URL}/posts/analytics/overview/`);
  return response.json();
}

// 🔹 Auth
export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/accounts/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/accounts/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

// 🔹 Profile
export async function fetchProfile(token) {
  const response = await fetch(`${API_BASE_URL}/accounts/profile/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

export async function updateProfile(token, formData) {
  const response = await fetch(`${API_BASE_URL}/accounts/profile/`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return response.json();
}

// 🔹 Comments
export async function fetchComments(postId) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments/`);
  return response.json();
}

export async function addComment(postId, token, commentData) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(commentData),
  });
  return response.json();
}

export async function upvoteComment(commentId, token) {
  const response = await fetch(`${API_BASE_URL}/posts/comments/${commentId}/upvote/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}
