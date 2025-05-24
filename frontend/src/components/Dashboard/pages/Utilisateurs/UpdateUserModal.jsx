import React, { useState, useEffect } from "react";

const UpdateUserModal = ({ user, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    numeroTel: "",
    username: "",
    email: "",
    role: "",
    cin: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        numeroTel: user.numeroTel || "",
        username: user.username || "",
        email: user.email || "",
        role: user.role || "",
        cin: user.cin || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user.id, formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* First Name (Unmodifiable) */}
            <input
              type="text"
              name="firstName"
              value={formData.firstname}
              disabled
              placeholder="First Name"
              className="w-full border px-3 py-2 rounded-md bg-gray-100 text-gray-500"
            />

            {/* Last Name (Unmodifiable) */}
            <input
              type="text"
              name="lastName"
              value={formData.lastname}
              disabled
              placeholder="Last Name"
              className="w-full border px-3 py-2 rounded-md bg-gray-100 text-gray-500"
            />

            {/* Phone Number */}
            <input
              type="text"
              name="numeroTel"
              value={formData.numeroTel}
              disabled
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border px-3 py-2 rounded-md text-gray-500"
            />

            {/* Username */}
            <input
              type="text"
              name="username"
              value={formData.username}
              disabled
              onChange={handleChange}
              placeholder="Username"
              className="w-full border px-3 py-2 rounded-md text-gray-500"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              onChange={handleChange}
              placeholder="Email"
              className="w-full border px-3 py-2 rounded-md text-gray-500"
            />

            {/* Role (Dropdown) */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md bg-white"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
              <option value="TECH">TECHNICIEN</option>
            </select>

            {/* CIN */}
            <input
              type="text"
              name="cin"
              value={formData.cin}
              onChange={handleChange}
              disabled
              placeholder="CIN"
              className="w-full border px-3 py-2 rounded-md text-gray-500"
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
