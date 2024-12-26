import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import api from "../../../api";

const Settings = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    numeroTel: "",
    cin: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/user/me");
        setUserData(response.data);
        setFormData({
          firstname: response.data.firstname || "",
          lastname: response.data.lastname || "",
          numeroTel: response.data.numeroTel || "",
          cin: response.data.cin || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        "/user/update",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("token", response.data.token);

      navigate("/");
    } catch (err) {
      console.error("Failed to update user data", err);
    }
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    try {
      await api.post("/auth/request-password-reset", { email: formData.email });
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Password reset failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="mt-16 text-black px-10 pb-14">
      <div className="p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-6 flex items-center dark:text-black">
          <FaUser className="mr-2" /> Profile Settings
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm text-gray-700 mb-1"
              >
                Firstname
              </label>
              <input
                type="text"
                id="firstname"
                placeholder="Enter your first name"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 text-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm text-gray-700 mb-1"
              >
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                placeholder="Enter your last name"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 text-gray-700"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="numeroTel"
                className="block text-sm text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="numeroTel"
                placeholder="Enter your phone number"
                value={formData.numeroTel}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 text-gray-700"
              />
            </div>
            <div>
              <label htmlFor="cin" className="block text-sm text-gray-700 mb-1">
                CIN
              </label>
              <input
                type="text"
                id="cin"
                placeholder="Enter your CIN"
                value={formData.cin}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 text-gray-700"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 text-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 text-gray-700"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handlePasswordReset}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
              disabled={loading}
            >
              {loading ? "Sending..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
