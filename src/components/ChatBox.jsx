import React from "react";
import ChatInterface from "./ChatInterface";
import "../styles/ChatBox.css";

const ChatBox = () => {
  return (
    <div className="chatbox-wrapper">
      <ChatInterface user="User 1" />
      <ChatInterface user="User 2" />
    </div>
  );
};

export default ChatBox;
