import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Simple client-side validation
    if (!email || !username || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        email,
        username,
        password,
      });

      // Check if registration is successful and has a verification code
      if (response.data && response.data.verificationCode) {
        console.log("User registered, verification code sent:", response.data.verificationCode);
        
        // Redirect to the verification page, passing the email for verification
        navigate('/verify', { state: { email } });
      } else {
        setError("Failed to register. Please try again.");
      }
    } catch (err) {
      setError("There was an error with the registration. Please try again.");
      console.error("Signup Error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full"
        onSubmit={handleSignup}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          className="w-full p-3 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-black"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium">Username</label>
        <input
          type="text"
          className="w-full p-3 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-black"
          placeholder="Enter your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium">Password</label>
        <input
          type="password"
          className="w-full p-3 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-black"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-3/4 p-2 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90"
          >
            Sign Up
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
