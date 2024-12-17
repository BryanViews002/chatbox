import React, { useState, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import Message from "./Message";
import ChatInput from "./ChatInput";
import "../styles/ChatInterface.css";

const ChatInterface = ({ user }) => {
  const { messages, typingUser, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMessages, setFilteredMessages] = useState(messages);

  useEffect(() => {
    const messageContainer = document.querySelector(".messages-container");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredMessages(
        messages.filter((message) =>
          message.text.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredMessages(messages);
    }
  }, [searchQuery, messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(user, input);
      setInput("");
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>{user}</h2>
        <input
          type="text"
          className="search-bar"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="messages-container">
        {filteredMessages.map((message) => (
          <Message
            key={message.id}
            {...message}
            isCurrentUser={message.sender === user}
          />
        ))}
        {typingUser && typingUser !== user && (
          <div className="typing-indicator">{typingUser} is typing...</div>
        )}
      </div>
      <ChatInput input={input} setInput={setInput} handleSend={handleSend} />
    </div>
  );
};

export default ChatInterface;
