import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/AuthenticationPage.css";
import loginImage from "../assets/images/login.png"; // Renamed for clarity
import { useNavigation } from "./NavigationContext";

const AuthenticationPage = () => {
  const { login } = useNavigation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  // Update form data state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Form validation and submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    // Password validation
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Confirm password check (if signing up)
    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); // Clear error if validation passes
    login(); // Navigate to chat after login/signup
  };

  return (
    <div className="auth-container">
      <motion.div
        className="background-animation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      ></motion.div>
      <div className="form-layout">
        {/* Form Container */}
        <motion.div
          className="form-container"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 25 }}
        >
          <motion.h1
            className="auth-heading"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {isSignUp ? "Create Your Account" : "Login to Your Account"}
          </motion.h1>

          {/* Error Message */}
          {error && (
            <motion.p
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          )}

          {/* Authentication Form */}
          <motion.form
            className="auth-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Email Input */}
            <motion.input
              type="email"
              name="email"
              placeholder="Email"
              className="auth-input"
              value={formData.email}
              onChange={handleInputChange}
              whileFocus={{ scale: 1.05, borderColor: "#4facfe" }}
            />
            {/* Password Input */}
            <motion.input
              type="password"
              name="password"
              placeholder="Password"
              className="auth-input"
              value={formData.password}
              onChange={handleInputChange}
              whileFocus={{ scale: 1.05, borderColor: "#4facfe" }}
            />
            {/* Confirm Password Input (Sign-Up Only) */}
            {isSignUp && (
              <motion.input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="auth-input"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                whileFocus={{ scale: 1.05, borderColor: "#4facfe" }}
              />
            )}
            {/* Submit Button */}
            <motion.button
              type="submit"
              className="auth-button"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {isSignUp ? "Sign Up" : "Login"}
            </motion.button>
          </motion.form>

          {/* Toggle Login/Sign-Up */}
          <motion.p
            className="toggle-form"
            onClick={() => setIsSignUp((prev) => !prev)}
            whileHover={{ scale: 1.05, color: "#fa709a" }}
            transition={{ duration: 0.2 }}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </motion.p>
        </motion.div>

        {/* Illustration Section */}
        <motion.div
          className="auth-image"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 25 }}
        >
          <motion.img
            src={loginImage}
            alt="Authentication Illustration"
            className="auth-illustration"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
