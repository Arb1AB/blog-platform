import React, { useEffect, useState } from "react";
import API from "../api";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("posts/analytics/overview/")
      .then((res) => setStats(res.data))
      .catch(() => setStats(null));
  }, []);

  if (!stats) return <p>Loading...</p>;

  const data = {
    labels: stats.top_users.map((u) => u.username),
    datasets: [
      {
        label: "Reputation",
        data: stats.top_users.map((u) => u.reputation),
        backgroundColor: "#a64dff",
      },
    ],
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Posts: {stats.total_posts}</p>
      <p>Total Comments: {stats.total_comments}</p>
      <p>Total Views: {stats.total_views}</p>

      <h3>Top Users</h3>
      <Bar data={data} />
    </div>
  );
}

export default AdminDashboard;
