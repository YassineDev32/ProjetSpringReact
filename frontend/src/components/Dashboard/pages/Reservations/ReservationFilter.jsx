import React from 'react';

const ReservationFilter = ({ filters, onFilterChange }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <input
        type="text"
        name="status"
        value={filters.status}
        onChange={handleInputChange}
        placeholder="Filtrer par statut (e.g., CONFIRMED)"
        className="border px-4 py-2 rounded-md w-full"
      />
      <select
        name="dateOrder"
        value={filters.dateOrder}
        onChange={handleInputChange}
        className="border px-4 py-2 rounded-md w-full"
      >
        <option value="">Trier par date</option>
        <option value="newest">Plus récent</option>
        <option value="oldest">Plus ancien</option>
      </select>
    </div>
  );
};

export default ReservationFilter;
