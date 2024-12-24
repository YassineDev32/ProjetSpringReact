import React from 'react';

const ReservationTable = ({ reservations, onDelete, onChangeStatus }) => {
  const handleStatusChange = (id, newStatus) => {
    if (window.confirm(`Voulez-vous vraiment changer le statut en "${newStatus}" ?`)) {
      onChangeStatus(id, newStatus);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-sm';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm';
      case 'CONFIRMED':
        return 'bg-green-300 text-green-900 px-2 py-1 rounded-full text-sm';
      default:
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm';
    }
  };

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="border px-4 py-2 text-left">ID Réservation</th>
          <th className="border px-4 py-2 text-left">Voiture</th>
          <th className="border px-4 py-2 text-left">Date Début</th>
          <th className="border px-4 py-2 text-left">Date Fin</th>
          <th className="border px-4 py-2 text-left">Statut</th>
          <th className="border px-4 py-2 text-left">Réservé par</th>
          <th className="border px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <tr key={reservation.id}>
            <td className="border px-4 py-2">{reservation.id}</td>
            <td className="border px-4 py-2">{reservation.car?.model?.name || 'N/A'}</td>
            <td className="border px-4 py-2">{reservation.startDate}</td>
            <td className="border px-4 py-2">{reservation.endDate}</td>
            <td className="border px-4 py-2">
              <span className={getStatusStyle(reservation.status)}>
                {reservation.status}
              </span>
            </td>
            <td className="border px-4 py-2">
              {reservation.user
                ? `${reservation.user.firstname} ${reservation.user.lastname}`
                : 'N/A'}
            </td>
            <td className="border px-4 py-2 text-center">
              <div className="flex justify-center items-center space-x-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                  onClick={() => onDelete(reservation.id)}
                >
                  Supprimer
                </button>
                <select
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={reservation.status}
                  onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                >
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReservationTable;
