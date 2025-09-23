const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

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

export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/accounts/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
}

export async function fetchProfile(token) {
  const response = await fetch(`${API_BASE_URL}/accounts/profile/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}
