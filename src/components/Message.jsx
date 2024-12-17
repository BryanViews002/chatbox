import React from "react";
import "../styles/Message.css"; // Updated styles for messages

const Message = ({ text, sender, isCurrentUser, timestamp, status }) => {
  const time = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getStatusIcon = () => {
    if (status === "read") return <span className="status read">✔✔</span>; // Replace with a blue check
    if (status === "delivered")
      return <span className="status delivered">✔✔</span>;
    return <span className="status sent">✔</span>;
  };

  return (
    <div className={`message ${isCurrentUser ? "sent" : "received"}`}>
      <div
        className={`message-bubble ${
          isCurrentUser ? "sent-bubble" : "received-bubble"
        }`}
      >
        <p>{text}</p>
        <small>
          {time}
          {isCurrentUser && getStatusIcon()}
        </small>
      </div>
    </div>
  );
};

export default Message;
