import React from 'react';

const UserFilter = ({ filters, onFilterChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input
        type="text"
        value={filters.email}
        onChange={e => onFilterChange('email', e.target.value)}
        placeholder="Filter by Email"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        value={filters.username}
        onChange={e => onFilterChange('username', e.target.value)}
        placeholder="Filter by Username"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default UserFilter;
