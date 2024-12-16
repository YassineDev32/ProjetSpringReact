import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      const token = response.data.token;
      if (!token) {
        setError("Authentication failed: No token received.");
        return;
      }
      if (token) {
        localStorage.setItem("token", token);
        setIsLoggedIn(true); // Mise à jour de l'état global
        navigate("/"); // Redirection vers la page d'accueil
      }
      // Decode the token
      const decodedToken = jwtDecode(token);
      // Extract the role
      const userRole = decodedToken.roles[0];
      // Navigate based on role
      if (userRole === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else if (userRole === "ROLE_USER") {
        navigate("/user/me");
      } else {
        setError("Unauthorized role.");
      }
    } catch (err) {
      setError("Invalid credentials or server error.");
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          className="w-full p-3 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-black"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-3 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary text-black"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="text-black" />
            ) : (
              <FaEye className="text-black" />
            )}
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-3/4 p-2 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90"
          >
            Login
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
