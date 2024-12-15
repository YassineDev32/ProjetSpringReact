import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import api from "../api";

const ProfileSettings = ({ user = {}, onUpdate }) => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate to navigate

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/user/me");
        setUserData(response.data);
        setFormData({
          username: response.data.username || "",
          email: response.data.email || "",
          password: "",
        });
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    try {
      await api.post("/auth/request-password-reset", { email: formData.email });
      navigate("/password-reset-sent"); // Navigate to the new route using useNavigate
    } catch (err) {
      console.error("Password reset failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="bg-white w-full px-6 py-8 mt-20 max-w-2xl mx-auto rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaUser className="mr-2" /> Profile Settings
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-indigo-900"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-indigo-900"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handlePasswordReset}
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
            disabled={loading}
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
