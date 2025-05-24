import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

const RapportTable = ({ rapports, onDelete }) => {
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

  const sortedRapports = React.useMemo(() => {
    if (!sortColumn) return rapports;
    return [...rapports].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rapports, sortColumn, sortDirection]);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
            {['ID Rapport', 'Période', 'Total Voitures Louées', 'Revenus Totals', 'Actions'].map((header, index) => (
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
          {sortedRapports.map((rapport, index) => (
            <motion.tr
              key={rapport.id}
              className="border-b border-gray-200 hover:bg-gray-100"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">{rapport.id}</td>
              <td className="py-3 px-6 text-left">{`${rapport.startDate} - ${rapport.endDate}`}</td>
              <td className="py-3 px-6 text-left">{rapport.totalCarsRented}</td>
              <td className="py-3 px-6 text-left">{rapport.totalEarnings.toFixed(2)} MAD</td>
              <td className="py-3 px-6 text-center">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <button
                    onClick={() => onDelete(rapport.id)}
                    className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center transition-colors duration-300 ease-in-out hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RapportTable;

