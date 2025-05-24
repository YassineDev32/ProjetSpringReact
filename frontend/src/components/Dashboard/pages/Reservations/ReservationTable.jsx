import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Eye, X, Check } from 'lucide-react';

const ReservationTable = ({ reservations, onCancel, onConfirm }) => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleViewDetails = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleCloseModal = () => {
    setSelectedReservation(null);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedReservations = useMemo(() => {
    if (!sortColumn) return reservations;
    return [...reservations].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [reservations, sortColumn, sortDirection]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "CONFIRMED":
        return "bg-green-300 text-green-900";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
              {['ID Réservation', 'Voiture', 'Date Début', 'Date Fin', 'Statut', 'Réservé par', 'Actions'].map((header, index) => (
                <th 
                  key={index} 
                  className="py-3 px-6 text-left cursor-pointer"
                  onClick={() => handleSort(header.toLowerCase())}
                >
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
            {sortedReservations.map((reservation, index) => (
              <motion.tr 
                key={reservation.id}
                className="border-b border-gray-200 hover:bg-gray-100"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">{reservation.id}</td>
                <td className="py-3 px-6 text-left">{reservation.car?.model?.name || "N/A"}</td>
                <td className="py-3 px-6 text-left">{reservation.startDate}</td>
                <td className="py-3 px-6 text-left">{reservation.endDate}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(reservation.status)}`}>
                    {reservation.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">
                  {reservation.user
                    ? `${reservation.user.firstname} ${reservation.user.lastname}`
                    : "N/A"}
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <button
                        onClick={() => handleViewDetails(reservation)}
                        className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2 transition-colors duration-300 ease-in-out hover:bg-blue-600"
                      >
                        <Eye size={16} />
                      </button>
                    </motion.div>
                    {reservation.status === 'PENDING' && (
                      <>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <button
                            onClick={() => onConfirm(reservation.id)}
                            className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-2 transition-colors duration-300 ease-in-out hover:bg-green-600"
                          >
                            <Check size={16} />
                          </button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <button
                            onClick={() => onCancel(reservation.id)}
                            className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center transition-colors duration-300 ease-in-out hover:bg-red-600"
                          >
                            <X size={16} />
                          </button>
                        </motion.div>
                      </>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedReservation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Détails de la Réservation</h2>
              <div className="space-y-4">
                <p><strong>ID:</strong> {selectedReservation.id}</p>
                <p><strong>Voiture:</strong> {selectedReservation.car?.model?.name || "N/A"}</p>
                <p><strong>Date Début:</strong> {selectedReservation.startDate}</p>
                <p><strong>Date Fin:</strong> {selectedReservation.endDate}</p>
                <p><strong>Statut:</strong> {selectedReservation.status}</p>
                <p><strong>Réservé par:</strong> {selectedReservation.user
                  ? `${selectedReservation.user.firstname} ${selectedReservation.user.lastname}`
                  : "N/A"}
                </p>
                <p><strong>Email:</strong> {selectedReservation.user.email}</p>
                <p><strong>CIN:</strong> {selectedReservation.user.cin}</p>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                {selectedReservation.status === 'PENDING' && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors duration-300"
                      onClick={() => {
                        onCancel(selectedReservation.id);
                        handleCloseModal();
                      }}
                    >
                      Annuler
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors duration-300"
                      onClick={() => {
                        onConfirm(selectedReservation.id);
                        handleCloseModal();
                      }}
                    >
                      Confirmer
                    </motion.button>
                  </>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition-colors duration-300"
                  onClick={handleCloseModal}
                >
                  Fermer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReservationTable;

