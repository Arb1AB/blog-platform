import React, { useEffect, useState } from "react";

function Notification({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]); // ✅ restart timer when message changes

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#1a001f",
        color: "#a64dff",
        border: "1px solid #660099",
        padding: "10px 15px",
        borderRadius: "6px",
        fontFamily: "monospace",
        boxShadow: "0 0 10px #a64dff",
        zIndex: 1000,
        whiteSpace: "pre-line",
      }}
    >
      {">"} {message}
    </div>
  );
}

export default Notification;
