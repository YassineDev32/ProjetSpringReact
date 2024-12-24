import React from 'react';

const RapportTable = ({ rapports, onDelete }) => {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="border px-4 py-2 text-left">ID Rapport</th>
          <th className="border px-4 py-2 text-left">Période</th>
          <th className="border px-4 py-2 text-left">Total Voitures Louées</th>
          <th className="border px-4 py-2 text-left">Revenus Totals</th>
          <th className="border px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {rapports.map((rapport) => (
          <tr key={rapport.id}>
            <td className="border px-4 py-2">{rapport.id}</td>
            <td className="border px-4 py-2">{`${rapport.startDate} - ${rapport.endDate}`}</td>
            <td className="border px-4 py-2">{rapport.totalCarsRented}</td>
            <td className="border px-4 py-2">{rapport.totalEarnings.toFixed(2)} MAD</td>
            <td className="border px-4 py-2 text-center">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                onClick={() => onDelete(rapport.id)}
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RapportTable;
