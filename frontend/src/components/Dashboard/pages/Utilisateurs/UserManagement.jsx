import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserFilter from './UserFilter';
import UserTable from './UserTable';
import UpdateUserModal from './UpdateUserModal';
import api from '../../../../api';

const UserManagement = () => {
  const [filters, setFilters] = useState({ email: '', username: '' });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/user/');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleFilterChange = (filterKey, value) => {
    setFilters({ ...filters, [filterKey]: value });
  };

  const filteredUsers = users.filter(user =>
    (user.email || '').toLowerCase().includes(filters.email.toLowerCase()) &&
    (user.username || '').toLowerCase().includes(filters.username.toLowerCase())
  );

  const handleUpdate = (id) => {
    const user = users.find(user => user.id === id);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  

  const handleSave = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/user/update/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Update the token in local storage
      localStorage.setItem("token", response.data.token);
  
      // Update the users state
      setUsers(users.map(user =>
        user.id === id ? { ...user, ...updatedData } : user
      ));
  
      // Close the modal and reset selected user
      setIsModalOpen(false);
      setSelectedUser(null);
  
      console.log("User updated successfully");
    } catch (error) {
      console.error("Failed to update user data:", error);
    }
  };
  

  return (
    <div className="flex flex-col w-full max-w-full text-black my-20 mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">User Management</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading users...</div>
      ) : (
        <>
          <div className="mb-6">
            <UserFilter filters={filters} onFilterChange={handleFilterChange} />
          </div>
          <div className="overflow-x-auto">
            <UserTable users={filteredUsers} onUpdate={handleUpdate} onDelete={handleDelete} />
          </div>
        </>
      )}
      <UpdateUserModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default UserManagement;
