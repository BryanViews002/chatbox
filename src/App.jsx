import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import WelcomePage from "./components/WelcomePage";
import AuthenticationPage from "./components/AuthenticationPage";
import { NavigationProvider } from "./components/NavigationContext"; // Import the NavigationProvider
import { ChatProvider } from "./components/ChatBox"; // Assuming ChatContext is needed

function App() {
  return (
    <NavigationProvider>
      {" "}
      {/* Wrap everything with NavigationProvider */}
      <ChatProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/auth" element={<AuthenticationPage />} />
            <Route path="/chat" element={<ChatBox />} />
          </Routes>
        </Router>
      </ChatProvider>
    </NavigationProvider>
  );
}

export default App;
