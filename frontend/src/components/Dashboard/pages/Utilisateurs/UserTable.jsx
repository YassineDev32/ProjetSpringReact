import React from 'react';

const UserTable = ({ users, onUpdate, onDelete }) => {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="p-3 border">First Name</th>
          <th className="p-3 border">Last Name</th>
          <th className="p-3 border">Phone</th>
          <th className="p-3 border">Username</th>
          <th className="p-3 border">Email</th>
          <th className="p-3 border">Role</th>
          <th className="p-3 border">CIN</th>
          <th className="p-3 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className="hover:bg-gray-100">
            <td className="p-3 border">{user.firstname}</td>
            <td className="p-3 border">{user.lastname}</td>
            <td className="p-3 border">{user.numeroTel}</td>
            <td className="p-3 border">{user.username}</td>
            <td className="p-3 border">{user.email}</td>
            <td className="p-3 border">{user.role}</td>
            <td className="p-3 border">{user.cin}</td>
            <td className="p-3 border space-x-2">
              <button
                onClick={() => onUpdate(user.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Update
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
