import React from "react";
import { motion } from "framer-motion";
import chat from "../assets/images/chat.png";
import { useNavigate } from "react-router-dom";
import "../styles/WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="background-animation"></div>
      <motion.div
        className="logo"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, duration: 1 }}
      >
        <img src={chat} alt="ChatBox Logo" />
      </motion.div>
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Welcome to ChatBox
      </motion.h1>
      <motion.p
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        Connecting People Effortlessly
      </motion.p>
      <motion.button
        className="get-started-button"
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.8)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/auth")}
        aria-label="Get Started"
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default WelcomePage;
