import React, { createContext, useContext, useState } from "react";

// Create a context for the chat
const ChatContext = createContext();

// Custom hook to use the ChatContext
export const useChat = () => useContext(ChatContext);

// ChatProvider component
export const ChatProvider = ({ children }) => {
  // State to hold all messages
  const [messages, setMessages] = useState([]);

  // State to track the user who is typing
  const [typingUser, setTypingUser] = useState(null);

  // Function to send a new message
  const sendMessage = (sender, text) => {
    const newMessage = {
      id: Date.now(), // unique ID based on timestamp
      sender,
      text,
      timestamp: Date.now(),
      seenBy: [], // Track users who have seen this message
    };

    // Add the new message to the messages array
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  // Function to mark a message as seen by a specific user
  const markMessageAsSeen = (messageId, user) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === messageId
          ? { ...message, seenBy: [...message.seenBy, user] }
          : message
      )
    );
  };

  // Function to update the typing status of a user
  const updateTypingStatus = (user) => {
    setTypingUser(user); // Set the typing user, or null if no one is typing
  };

  // Return the provider with context values
  return (
    <ChatContext.Provider
      value={{
        messages, // All messages in the chat
        typingUser, // The user who is typing (if any)
        sendMessage, // Function to send a message
        markMessageAsSeen, // Function to mark a message as seen
        updateTypingStatus, // Function to update typing status
      }}
    >
      {children} {/* Render the child components */}
    </ChatContext.Provider>
  );
};
