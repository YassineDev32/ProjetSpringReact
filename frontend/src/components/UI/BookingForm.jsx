import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const BookingForm = ({
  isLoggedIn,
  userData,
  carId,
  pickupDate,
  dropoffDate,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    startDate: pickupDate || "", // Prepopulate start date with pickupDate
    endDate: dropoffDate || "", // Prepopulate end date with dropoffDate
  });
  const [editableUserData, setEditableUserData] = useState({
    username: userData.username || "",
    firstname: userData.firstname || "",
    lastname: userData.lastname || "",
    email: userData.email || "",
    numeroTel: userData.numeroTel || "",
    cin: userData.cin || "", // Adding CIN
  });

  const handleUserDataChange = (e) => {
    setEditableUserData({
      ...editableUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put("/user/update", editableUserData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
    } catch (err) {
      console.error("Failed to update user data", err);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      try {
        await updateUserData();

        const response = await api.post("/api/reservations/create", {
          userId: userData.id,
          carId: carId,
          startDate: formData.startDate,
          endDate: formData.endDate,
          phone: editableUserData.numeroTel,
          address: formData.address,
        });

        if (response.status === 200) {
          navigate("/mybooking");
        } else {
          console.error("Failed to create reservation");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="space-y-6 text-black bg-white p-6 rounded-lg"
    >
      {/* First Name and Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          type="text"
          name="firstname"
          value={editableUserData.firstname}
          placeholder="First Name"
          onChange={handleUserDataChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="lastname"
          value={editableUserData.lastname}
          placeholder="Last Name"
          onChange={handleUserDataChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Email and Phone Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          type="email"
          name="email"
          value={editableUserData.email}
          placeholder="Email"
          onChange={handleUserDataChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="numeroTel"
          value={editableUserData.numeroTel}
          placeholder="Phone Number"
          onChange={handleUserDataChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* CIN */}
      <div>
        <input
          type="text"
          name="cin"
          value={editableUserData.cin}
          placeholder="CIN"
          onChange={handleUserDataChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Address */}
      <div>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleFormChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Start Date and End Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleFormChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleFormChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="flex justify-center items-center gap-2 mx-auto text-lg bg-blue-500 text-white font-medium rounded-lg px-5 py-3 shadow-md transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        Reserve Now
      </button>
    </form>
  );
};

export default BookingForm;
