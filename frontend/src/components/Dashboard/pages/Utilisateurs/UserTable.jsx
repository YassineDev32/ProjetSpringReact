import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Edit, Trash2 } from 'lucide-react';

const UserTable = ({ users, onUpdate, onDelete }) => {
  const [sortColumn, setSortColumn] = React.useState(null);
  const [sortDirection, setSortDirection] = React.useState('asc');

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedUsers = React.useMemo(() => {
    if (!sortColumn) return users;
    return [...users].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [users, sortColumn, sortDirection]);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
            {['First Name', 'Last Name', 'Phone', 'Username', 'Email', 'Role', 'CIN', 'Actions'].map((header, index) => (
              <th key={index} className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort(header.toLowerCase())}>
                <div className="flex items-center justify-between">
                  {header}
                  {sortColumn === header.toLowerCase() && (
                    sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {sortedUsers.map((user, index) => (
            <motion.tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-100"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">{user.firstname}</td>
              <td className="py-3 px-6 text-left">{user.lastname}</td>
              <td className="py-3 px-6 text-left">{user.numeroTel}</td>
              <td className="py-3 px-6 text-left">{user.username}</td>
              <td className="py-3 px-6 text-left">{user.email}</td>
              <td className="py-3 px-6 text-left">{user.role}</td>
              <td className="py-3 px-6 text-left">{user.cin}</td>
              <td className="py-3 px-6 text-left">
                <div className="flex item-center justify-center">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <button
                      onClick={() => onUpdate(user.id)}
                      className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2 transition-colors duration-300 ease-in-out hover:bg-blue-600"
                    >
                      <Edit size={16} />
                    </button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center transition-colors duration-300 ease-in-out hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

